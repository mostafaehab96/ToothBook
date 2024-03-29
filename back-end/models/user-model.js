const mongoose = require('mongoose');

const { Schema } = mongoose;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['Admin', 'User'],
    default: 'User',
  },
  university: {
    type: String,
    required: true,
  },
  grade: {
    type: String,
    enum: ['Fourth', 'Fifth', 'Graduated'],
  },
  casesPerSemester: {
    type: Number,
    default: 10
  },
  contactedPatients: {
    type: Number,
    default: 0
  },
  activePatients: [{
    type: Schema.Types.ObjectId,
    ref: 'Patient'
  }],
  treatedPatients: [{ type: Schema.Types.ObjectId, ref: 'Patient'}],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  photo: {
    type: String,
    default: null,
  },
});

module.exports = mongoose.model('User', userSchema);
