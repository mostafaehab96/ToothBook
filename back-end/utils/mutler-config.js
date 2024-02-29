const multer = require('multer');
const createError = require('http-errors');
const {validationResult} = require('express-validator');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    let dest;
    if (req.route.path === '/') {
      dest = 'uploads/patients/';
    } else if (req.route.path === '/register') {
      dest = 'uploads/users';
    }
    cb(null, dest);
  },
  filename: function (req, file, cb) {
    const ext = file.mimetype.split('/')[1];
    const fileName = `${req.currentUser?.id || 'user'}-${Date.now()}.${ext}`;
    cb(null, fileName);
  }
});

const fileFilter = (req, file, cb) => {
  const type = file.mimetype.split('/')[0];
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return cb(errors, false);
  }
  if (type === 'image') {
    return cb(null, true);
  }
  const error = createError(400, 'file must be an image');
  return cb(error, false);
};

const upload = multer({ storage, fileFilter});

module.exports = upload;
