const express = require('express');
const userController = require('../controllers/UserController');
const router = express.Router();
const {validateUser} = require('../middlewares/validationSchemas');


router.route('/register')
  .post(validateUser(), userController.registerUser);

router.route('/login')
  .post(userController.loginUser);

module.exports = router;
