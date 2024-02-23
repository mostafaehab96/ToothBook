const express = require("express");
const PatientController = require("../controllers/patient-controller");

const patientRouter = express.Router();

patientRouter
  .route("/")
  .get(PatientController.getAllPatients)
  .post(PatientController.postPatient);

patientRouter
  .route("/:id")
  .get(PatientController.getPatientById)
  .patch(PatientController.updatePatient)
  .delete(PatientController.deletePatient);

module.exports = patientRouter;
