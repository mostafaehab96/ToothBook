const bcrypt = require('bcryptjs');
const jSend = require('jsend');
const User = require('../models/user-model');
const {validationResult} = require('express-validator');
const asyncWrapper = require('../middlewares/async-wrapper');
const createError = require('http-errors');
class UserController {

  static async getAllUsers (req, res) {
    const users = await User.find({}, {__v: false, password: false});
    res.json(jSend.success({users}));
  }

  static getUser = asyncWrapper(async (req, res, next) => {
    const { id } = req.params;
    const user = await User.findById(id);

    if (!user) {
      const error = createError(404, 'User not found!');
      return next(error);
    }
    res.json(jSend.success({user}));
  });

  static registerUser = asyncWrapper( async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const errorsMessages = errors.errors.map((err) => err.msg);
      return next(createError(400, errorsMessages.toString()));
    }
    const {name, email, password, university} = req.body;
    const oldUser = await User.findOne({email: email});
    if (oldUser) {
      return next(createError(400, 'User already exists'));
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = User({name, email, password: hashedPassword, university});

    newUser.save();
    return res.json(jSend.success({user: newUser}));
  });

  static loginUser = asyncWrapper( async (req, res, next) =>  {
    const {email, password} = req.body;
    if (!email) return next(createError(400, 'Email is required!'));
    if (!password) return next(createError(400, 'Password is required'));
    const user = await User.findOne({email});
    if (!user) return next(createError(404, 'User not found!'));
    if (await bcrypt.compare(password, user.password)) {
      return res.json(jSend.success({user}));
    }

    return next(createError(401, 'Wrong password!'));
  });


}
module.exports = UserController;
