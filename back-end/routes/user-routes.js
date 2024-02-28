const express = require('express');
const userController = require('../controllers/UserController');
const router = express.Router();
const {validateUser} = require('../middlewares/validationSchemas');
const {uploadUserPhoto} = require('../controllers/FileController');

router.route('/')
  .get(userController.getAllUsers);

router.route('/:id')
  .get(userController.getUser);


router.route('/register')
  .post(uploadUserPhoto, validateUser(), userController.registerUser);

router.route('/login')
  .post(userController.loginUser);

module.exports = router;
