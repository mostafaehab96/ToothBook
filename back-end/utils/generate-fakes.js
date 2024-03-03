const { faker } = require('@faker-js/faker');
const Patient  = require('../models/patient-model');
const mongoose = require('mongoose');
require('dotenv').config();
const url = process.env.MONGO_URL;
const { allDepartments } = require('./departments-medical');
const patientsImages = require('./temporary-images');
const clearFirst = process.argv[2] === 'clear';

const connect = async () => {
  await mongoose.connect(url);
};

const clearData = async () => {
  await Patient.deleteMany({});
};

const patientStatus = ['pending', 'contacted', 'treated', 'rejected'];
const generateFakePatients = async (numPatients, clearFirst) => {
  try {
    connect().then(() => console.log('successfully connected to mongodb'));
    if (clearFirst) {
      clearData().then(() => console.log('Data cleared successfully'));
    }
    for (const image of patientsImages) {
      const patient = new Patient({
        name: faker.person.fullName(),
        age: faker.number.int({min: 18, max: 30}),
        sex: faker.person.sex(),
        phoneNumber: faker.phone.number(),
        address: faker.location.city(),
        diagnosis: faker.lorem.sentence(),
        status: faker.helpers.arrayElement(patientStatus),
        lastInteractionDate: faker.date.past(),
        lastInteractionStatus: faker.helpers.arrayElement(patientStatus),
        isEmergency: faker.helpers.arrayElement([true, false]),
        medicalCompromised: faker.helpers.arrayElements(['Hypertensive', 'Cardiac', 'Disability', 'Diabetic'], {min: 0, max: 3}),
        createdAt: faker.date.past(),
        updatedAt: faker.date.recent(),
        departments: faker.helpers.arrayElements(allDepartments, {min: 1, max: 3}),
        photos: [image]
      });

      await patient.save();
    }
    console.log(`${numPatients} fake patients created successfully!`);
  } catch (error) {
    console.error('Error creating fake patients:', error);
  } finally {
    mongoose.disconnect(); // Disconnect from MongoDB
  }
};

generateFakePatients(20, clearFirst);
