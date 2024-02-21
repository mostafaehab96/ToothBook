const mongoose = require('mongoose');

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
  contactInformation: {
    type: String,
    required: true,
  },
  diagnosis: {
    type: String,
  },
  status: {
    type: String,
    enum: ['pending', 'contacted', 'treated', 'rejected'],
    required: true,
  },
  lastInteractionDate: {
    type: Date,
  },
  lastInteractionStatus: {
    type: String,
    enum: ['pending', 'contacted', 'treated', 'rejected'],
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
  },
  MedicalCompromised: {
    type: String,
    enum: ['Hypertensive', 'Cardiac', 'Disability', 'Diabetic'],
  },
  photos: [{ type: String, required: true }],
});

module.exports = mongoose.model('Patient', patientSchema);
