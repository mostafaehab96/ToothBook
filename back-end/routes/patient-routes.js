const express = require('express');
const PatientController = require('../controllers/PatientController');
const {validatePatient} = require('../middlewares/validationSchemas');
const verifyToken = require('../middlewares/verify-token');

const patientRouter = express.Router();

patientRouter
  .route('/')
  .get(PatientController.getAllPatients)
  .post(verifyToken, validatePatient(), PatientController.postPatient);

patientRouter
  .route('/:id')
  .get(PatientController.getPatientById)
  .patch(PatientController.updatePatient)
  .delete(PatientController.deletePatient);

module.exports = patientRouter;
