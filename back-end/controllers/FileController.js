const upload = require('../utils/mutler-config');



const uploadPatientPhotos = upload.array('photos');

const uploadUserPhoto = upload.single('photo');



module.exports = {
  uploadUserPhoto,
  uploadPatientPhotos
};
