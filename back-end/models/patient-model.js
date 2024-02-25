const mongoose = require('mongoose');
const patientStatus = require('../utils/patientStatus');
const departments = require('../utils/departments');
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
  MedicalCompromised: [
    {
      type: String,
      enum: ['Hypertensive', 'Cardiac', 'Disability', 'Diabetic', 'Other'],
    },
  ],
  photos: [{ type: String, required: true }],
  department: {
    type: String,
    enum: departments,
  },
});

module.exports = mongoose.model('Patient', patientSchema);
