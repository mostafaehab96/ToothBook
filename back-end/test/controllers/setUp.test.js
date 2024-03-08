const User = require('../../models/user-model');
const Patient = require('../../models/patient-model');

//clean up the database before and after all tests
before(async () => {
  await Patient.deleteMany({});
  await User.deleteMany({});
  const testPatient = new Patient({
    name: 'test patient',
    age: '20',
    sex: 'male',
    phoneNumber: '0123456789',
    address: 'Zagazig City',
    diagnosis: 'Test Diagnosis',
    status: 'pending',
  });
  await testPatient.save();
});

after(async () => {
  await Patient.deleteMany({});
  await User.deleteMany({});
});
