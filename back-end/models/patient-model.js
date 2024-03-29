const mongoose = require('mongoose');
const patientStatus = require('../utils/patientStatus');
const { allDepartments, medicalStatus} = require('../utils/departments-medical');
const { Schema } = mongoose;

const patientSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  sex: {
    type: String,
    enum: ['male', 'female'],
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  diagnosis: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: [
      patientStatus.PENDING,
      patientStatus.CONTACTED,
      patientStatus.TREATED,
      patientStatus.REJECTED,
    ],
    required: true,
    default: patientStatus.PENDING,
  },
  lastInteractionDate: {
    type: Date,
  },
  lastInteractionStatus: {
    type: String,
    enum: [
      patientStatus.PENDING,
      patientStatus.CONTACTED,
      patientStatus.TREATED,
      patientStatus.REJECTED,
    ],
  },
  assignedTo: {
    type: Schema.Types.ObjectId,
    ref: 'Student',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  isEmergency: {
    type: Boolean,
    default: false,
  },
  medicalCompromised: [
    {
      type: String,
      enum: medicalStatus,
    },
  ],
  photos: [{ type: String, required: true }],
  departments: [{
    type: String,
    enum: allDepartments,
  }],
});

module.exports = mongoose.model('Patient', patientSchema);
