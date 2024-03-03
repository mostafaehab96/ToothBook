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

const validatePatient = () => {
  return [
    body('name')
      .notEmpty()
      .withMessage('Name is required'),
    body('age')
      .notEmpty()
      .isNumeric()
      .withMessage('Age is required'),
    body('sex')
      .notEmpty()
      .withMessage('Sex is required'),
    body('address')
      .notEmpty()
      .withMessage('Address is required'),
    body('phoneNumber')
      .notEmpty()
      .withMessage('Phone number is required'),
    body('diagnosis')
      .notEmpty()
      .withMessage('Diagnosis is required'),
    body('departments')
      .notEmpty()
  ];
};
module.exports = {validateUser, validatePatient};
