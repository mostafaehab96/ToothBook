const upload = require('../utils/mutler-config');

class FileController {

  static uploadPatientPhotos = upload.array('photos');

  static uploadUserPhoto = upload.single('photo');
}


module.exports = FileController;
