const bcrypt = require('bcryptjs');
const jSend = require('jsend');
const User = require('../models/user-model');
const {validationResult} = require('express-validator');

const registerUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json(jSend.fail(errors));
  }
  const {name, email, password, university} = req.body;
  const oldUser = await User.findOne({email: email});
  if (oldUser) {
    return res.status(400).json(jSend.fail('User already exists'));
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = User({name, email, password: hashedPassword, university});

  newUser.save();
  return res.json(jSend.success({user: newUser}));
};

const loginUser = async (req, res) => {
  const {email, password} = req.body;
  if (!email) return res.status(401).json(jSend.error('Email is required'));
  if (!password) return res.status(401).json(jSend.error('Password is required'));
  const user = await User.findOne({email});
  if (!user) return res.status(404).json(jSend.fail({user: 'User not found!'}));
  if (await bcrypt.compare(password, user.password)) {
    return res.json(jSend.success({user}));
  }

  return res.status(401).json(jSend.error('Wrong password'));
};


module.exports = {registerUser, loginUser};
