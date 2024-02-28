const express = require('express');
const userController = require('../controllers/UserController');
const router = express.Router();
const { validateUser } = require('../middlewares/validationSchemas');
const multer = require('multer');

router.route('/').get(userController.getAllUsers);

router.route('/:id').get(userController.getUser);

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    console.log('file', file);
    cb(null, 'uploads');
  },
  filename: (req, file, cb) => {
    let photo = `user-${Date.now()}.${file.mimetype.split('/')[1]}`;
    cb(null, photo);
    req.photo = photo;
  },
});
const upload = multer({ storage });
router
  .route('/register')
  .post(upload.single('photo'), userController.registerUser);

router.route('/login').post(userController.loginUser);

module.exports = router;
