const bcrypt = require('bcryptjs');
const jSend = require('jsend');
const User = require('../models/user-model');
const {validationResult} = require('express-validator');
const asyncWrapper = require('../middlewares/async-wrapper');
const createError = require('http-errors');
const generateJWT = require('../utils/generate-jwt');
const Patient = require('../models/patient-model');
const patientStatus = require('../utils/patientStatus');

const getAllUsers = asyncWrapper(async (req, res) => {
  const users = await User.find({}, { __v: false, password: false });
  res.json(jSend.success({ users }));
});

const getUser = asyncWrapper(async (req, res, next) => {
  const { id } = req.params;
  const user = await User.findById(id);

  if (!user) {
    const error = createError(404, 'User not found!');
    return next(error);
  }
  res.json(jSend.success({ user }));
});

const registerUser = asyncWrapper(async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errorsMessages = errors.errors.map((err) => err.msg);
    return next(createError(400, errorsMessages.toString()));
  }
  const { name, email, password, university } = req.body;
  const oldUser = await User.findOne({ email: email });
  if (oldUser) {
    return next(createError(400, 'User already exists'));
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = User({
    name,
    email,
    password: hashedPassword,
    university,
    photo: req.file?.filename || null
  });

  const token = await generateJWT({
    email: newUser.email,
    id: newUser._id,
    role: newUser.role,
  });
  await newUser.save();
  return res.json(jSend.success({ user: newUser, token }));
});

const loginUser = asyncWrapper(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email) return next(createError(400, 'Email is required!'));
  if (!password) return next(createError(400, 'Password is required'));
  const user = await User.findOne({ email });
  if (!user) return next(createError(404, 'User not found!'));
  if (await bcrypt.compare(password, user.password)) {
    const token = await generateJWT({
      email: user.email,
      id: user._id,
      role: user.role,
    });
    return res.json(jSend.success({ user, token }));
  }

  return next(createError(401, 'Wrong password!'));
});

const deleteUser = asyncWrapper(async (req, res) => {
  const { id } = req.params;
  await User.deleteOne({_id: id});
  return res.json(jSend.success(null));
});

const userExists = asyncWrapper(async (req, res, next) => {
  const { email } = req.body;
  if (!email) return next(createError(400, 'Email must exists'));
  const user = await User.findOne({ email });
  if (user) {
    return res.json(jSend.success({user}));
  }

  return res.json(jSend.success(null));
});


const contactPatient = asyncWrapper(async (req, res, next) => {
  const { patientId } = req.body;
  const user = await User.findById(req.params.id);
  if (!user) return next(createError(404, 'User not found!'));
  if (!patientId) return next(createError(400, 'Patient id must be sent'));
  const patient = await Patient.findById(patientId);
  if (!patient) return next(createError(404, 'Patient not found!'));

  if (user.activePatients.includes(patientId)) {
    return next(createError(401, 'Patient is already contacted by this user'));
  }
  user.activePatients.push(patientId);
  patient.status = patientStatus.CONTACTED;
  await user.save();
  await patient.save();

  res.json(jSend.success({activePatients: user.activePatients}));

});

const treatPatient = asyncWrapper(async (req, res, next) => {
  const { patientId } = req.body;
  const user = await User.findById(req.params.id);
  if (!user) return next(createError(404, 'User not found!'));
  if (!patientId) return next(createError(400, 'Patient id must be sent'));
  const patient = await Patient.findById(patientId);
  if (!patient) return next(createError(404, 'Patient not found!'));

  const patientIndex = user.activePatients.indexOf(patientId);
  if (patientIndex === -1) {
    return next(createError(401, 'Patient wasn\'t contacted by this user!'));
  }
  user.activePatients.splice(patientIndex, 1);
  user.treatedPatients.push(patientId);
  patient.status = patientStatus.TREATED;
  await user.save();
  await patient.save();

  res.json(jSend.success({treatedPatients: user.treatedPatients}));
});

const returnPatient = asyncWrapper(async (req, res, next) => {
  const { patientId } = req.body;
  const user = await User.findById(req.params.id);
  if (!user) return next(createError(404, 'User not found!'));
  if (!patientId) return next(createError(400, 'Patient id must be sent'));
  const patient = await Patient.findById(patientId);
  if (!patient) return next(createError(404, 'Patient not found!'));

  const patientIndex = user.activePatients.indexOf(patientId);
  if (patientIndex === -1) {
    return next(createError(401, 'Patient wasn\'t contacted by this user!'));
  }
  user.activePatients.splice(patientIndex, 1);
  patient.status = patientStatus.PENDING;
  await user.save();
  await patient.save();

  res.json(jSend.success({activePatients: user.activePatients}));
});

const rejectPatient = asyncWrapper(async (req, res, next) => {
  const { patientId } = req.body;
  const user = await User.findById(req.params.id);
  if (!user) return next(createError(404, 'User not found!'));
  if (!patientId) return next(createError(400, 'Patient id must be sent'));
  const patient = await Patient.findById(patientId);
  if (!patient) return next(createError(404, 'Patient not found!'));

  const patientIndex = user.activePatients.indexOf(patientId);
  if (patientIndex === -1) {
    return next(createError(401, 'Patient wasn\'t contacted by this user!'));
  }
  user.activePatients.splice(patientIndex, 1);
  patient.status = patientStatus.REJECTED;
  await user.save();
  await patient.save();

  res.json(jSend.success({activePatients: user.activePatients}));
});

const UserController = {
  getAllUsers,
  getUser,
  registerUser,
  loginUser,
  deleteUser,
  userExists,
  contactPatient,
  treatPatient,
  returnPatient,
  rejectPatient
};

module.exports = { UserController };
