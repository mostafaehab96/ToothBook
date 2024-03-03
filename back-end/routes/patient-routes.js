const express = require('express');
const { PatientController } = require('../controllers/PatientController');
const {validatePatient} = require('../middlewares/validationSchemas');
const verifyToken = require('../middlewares/verify-token');
const { uploadPatientPhotos } = require('../controllers/FileController');
const router = express.Router();

router.route('/')
  .get(PatientController.getAllPatients)
  .post(verifyToken, uploadPatientPhotos, validatePatient(), PatientController.postPatient);

router.route('/:id')
  .get(PatientController.getPatientById)
  .patch(PatientController.updatePatient)
  .delete(PatientController.deletePatient);


module.exports = router;
