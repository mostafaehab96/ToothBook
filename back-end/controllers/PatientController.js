const Patient = require('../models/patient-model');
const { validationResult } = require('express-validator');
const jSend = require('jsend');
const asyncWrapper = require('../middlewares/async-wrapper');
const createError = require('http-errors');


const getAllPatients = asyncWrapper(async (req, res) => {
  let { page, limit, ...filter } = req.query;
  limit = limit || 15;
  page = page || 1;
  const skip = (page - 1) * limit;
  const patients = await Patient.find(filter, { __v: false })
    .limit(limit)
    .skip(skip);

  const totalCount = await Patient.countDocuments(filter);

  res.json(jSend.success({patients, totalCount}));
});

const postPatient = asyncWrapper(async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const errorsMessages = errors.errors.map((err) => err.msg);
    return next(createError(400, errorsMessages.toString()));
  }
  let files = req.files.map((file) => `patients/${file.filename}`);
  const newPatient = new Patient({...req.body, photos: files});
  await newPatient.save();
  res.json(jSend.success({patient: newPatient}));
});

const getPatientById = asyncWrapper(async (req, res, next) => {
  const { id } = req.params;
  const patient = await Patient.findById(id);

  if (!patient) {
    return next(createError(404, 'Patient not found!'));
  }

  return res.json(jSend.success({ patient }));
});

const updatePatient = asyncWrapper(async (req, res, next) => {
  const { id } = req.params;
  const patient = await Patient.findOne({ _id: id });
  if (!patient) {
    return next(createError(404, 'Patient not found!'));
  }
  const updateResult = await Patient.updateOne(
    { _id: id },
    { $set: { ...req.body } }
  );
  return res.json(jSend.success(updateResult));
});

const deletePatient = asyncWrapper(async (req, res) => {
  const { id } = req.params;
  await Patient.deleteOne({ _id: id });
  return res.json(jSend.success(null));
});


const PatientController = {
  getAllPatients,
  getPatientById,
  postPatient,
  updatePatient,
  deletePatient
};

module.exports = { PatientController };
