const express = require('express');
const userController = require('../controllers/UserController');
const router = express.Router();
const {uploadUserPhoto} = require('../controllers/FileController');
const { validateUser } = require('../middlewares/validationSchemas');

router.route('/').get(userController.getAllUsers);
router.route('/register')
  .post(uploadUserPhoto, validateUser(), userController.registerUser);

router.route('/login')
  .post(userController.loginUser);

module.exports = router;
