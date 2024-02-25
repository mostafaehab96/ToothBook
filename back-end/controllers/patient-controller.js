const Patient = require('../models/patient-model');
const httpStatusText = require('../utils/httpStatusText');

class PatientController {
  static async getAllPatients(req, res) {
    const { query } = req;
    const limit = query.limit || 15;
    const page = query.page || 1;
    const skip = (page - 1) * limit;

    const patients = await Patient.find({}, { __v: false })
      .limit(limit)
      .skip(skip);

    res.status(200).json({
      status: 'success',
      data: patients,
    });
  }

  static async postPatient(req, res) {
    const newPatient = new Patient(req.body);
    await newPatient.save();
    res.status(201).json({
      status: httpStatusText.SUCCESS,
      data: { patient: newPatient },
    });
  }

  static async getPatientById(req, res) {
    const patientId = req.params.id;
    const patient = await Patient.findById(patientId);

    if (!patient) {
      return res.status(404).json({
        status: httpStatusText.FAIL,
        message: 'Patient not found',
      });
    }

    return res.status(200).json({
      status: 'success',
      data: { patient },
    });
  }

  static async updatePatient(req, res) {
    const { patientId } = req.params;
    const updateResult = await Patient.updateOne(
      { _id: patientId },
      { $set: {...req.body} }
    );
    return res.status(200).json({
      status: httpStatusText.SUCCESS,
      data: { updateResult },
    });
  }

  static async deletePatient(req, res) {
    const { patientId } = req.params;
    await Patient.deleteOne({ _id: patientId });
    return res.status(200).json({ status: httpStatusText.SUCCESS, data: null });
  }
}
module.exports = PatientController;
