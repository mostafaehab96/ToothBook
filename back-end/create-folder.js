const fs = require('fs');
const path = require('path');

const createUploadsFolderIfNotExists = () => {
  const uploadsFolderPath = path.join(__dirname, 'uploads');
  const patientsFolderPath = path.join(uploadsFolderPath, 'patients');
  const usersFolderPath = path.join(uploadsFolderPath, 'users');

  if (!fs.existsSync(uploadsFolderPath)) {
    fs.mkdirSync(uploadsFolderPath);
  }
  if (!fs.existsSync(patientsFolderPath)) {
    fs.mkdirSync(patientsFolderPath);
  }
  if (!fs.existsSync(usersFolderPath)) {
    fs.mkdirSync(usersFolderPath);
  }
};

module.exports = createUploadsFolderIfNotExists;
