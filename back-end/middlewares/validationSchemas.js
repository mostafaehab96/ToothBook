const { body } = require('express-validator');

const validateUser = () =>  {
  return [
    body('name')
      .notEmpty()
      .withMessage('Name is required!'),
    body('email')
      .notEmpty()
      .withMessage('Email is required'),
    body('password')
      .notEmpty()
      .isLength({ min: 5 })
      .withMessage('Password is required and at least 5 characters'),
    body('university')
      .notEmpty()
      .withMessage('University is required')
  ];
};

module.exports = validateUser;
