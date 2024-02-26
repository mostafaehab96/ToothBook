const Patient = require('../models/patient-model');
const httpStatusText = require('../utils/httpStatusText');
const { validationResult } = require('express-validator');
const jSend = require('jsend');
const asyncWrapper = require('../middlewares/async-wrapper');


class PatientController {
  static getAllPatients = asyncWrapper(async (req, res) => {
    const { query } = req;
    const limit = query.limit || 15;
    const page = query.page || 1;
    const skip = (page - 1) * limit;

    const patients = await Patient.find({}, { __v: false })
      .limit(limit)
      .skip(skip);

    res.status(200).json({
      status: 'success',
      data: { patients },
    });
  });

  static postPatient = asyncWrapper(async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json(jSend.fail(errors));
    }
    const newPatient = new Patient(req.body);
    await newPatient.save();
    res.status(201).json({
      status: httpStatusText.SUCCESS,
      data: { patient: newPatient },
    });
  });

  static getPatientById = asyncWrapper(async (req, res) => {
    const { id } = req.params;
    const patient = await Patient.findById(id);

    if (!patient) {
      return res.status(404).json(jSend.error('Patient not found!'));
    }

    return res.status(200).json(jSend.success({ patient }));
  });

  static updatePatient = asyncWrapper(async (req, res) => {
    const { id } = req.params;
    const patient = await Patient.findOne({ _id: id });
    if (!patient) {
      return res.status(404).json(jSend.error('Patient not found!'));
    }
    const updateResult = await Patient.updateOne(
      { _id: id },
      { $set: { ...req.body } }
    );
    return res.status(200).json(jSend.success(updateResult));
  });

  static deletePatient = asyncWrapper(async (req, res) => {
    const { id } = req.params;
    await Patient.deleteOne({ _id: id });
    return res.status(200).json(jSend.success(null));
  });
}

module.exports = PatientController;
