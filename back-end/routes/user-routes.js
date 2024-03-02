const express = require('express');
const { UserController } = require('../controllers/UserController');
const router = express.Router();
const { uploadUserPhoto } = require('../controllers/FileController');
const { validateUser } = require('../middlewares/validationSchemas');

router.route('/').get(UserController.getAllUsers);
router.route('/exists').post(UserController.userExists);
router.route('/register')
  .post(uploadUserPhoto, validateUser(), UserController.registerUser);
router.route('/:id').get(UserController.getUser);

router.route('/login')
  .post(UserController.loginUser);

module.exports = router;
