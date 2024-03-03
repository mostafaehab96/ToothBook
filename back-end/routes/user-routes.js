const express = require('express');
const { UserController } = require('../controllers/UserController');
const router = express.Router();
const { uploadUserPhoto } = require('../controllers/FileController');
const { validateUser } = require('../middlewares/validationSchemas');
const verifyToken = require('../middlewares/verify-token');

router.get('/', UserController.getAllUsers);
router.post('/exists', UserController.userExists);
router.post('/register', uploadUserPhoto, validateUser(), UserController.registerUser);
router.post('/login', UserController.loginUser);
router.route('/:id')
  .get(UserController.getUser)
  .delete(UserController.deleteUser);

router.post('/:id/contact', verifyToken, UserController.contactPatient);
router.post('/:id/treat', UserController.treatPatient);
router.delete('/:id/reject');
router.post('/:id/return', UserController.returnPatient);

module.exports = router;
