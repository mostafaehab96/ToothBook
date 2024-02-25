const express = require('express');
const PatientController = require('../controllers/PatientController');
const {validatePatient} = require('../middlewares/validationSchemas');

const patientRouter = express.Router();

patientRouter
  .route('/')
  .get(PatientController.getAllPatients)
  .post(validatePatient(), PatientController.postPatient);

patientRouter
  .route('/:id')
  .get(PatientController.getPatientById)
  .patch(PatientController.updatePatient)
  .delete(PatientController.deletePatient);

module.exports = patientRouter;
