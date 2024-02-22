const express = require('express');
const mongoose = require('mongoose');
const usersRouter = require('./routes/user-routes');
const patientRouter = require('./routes/patient-routes');
// eslint-disable-next-line import/no-extraneous-dependencies
require('dotenv').config();

const url = process.env.MONGO_URL;
const port = process.env.PORT;
const app = express();
app.use(express.json());
app.use('/api/users', usersRouter);
app.use('/api/patients', patientRouter);

mongoose.connect(url).then(() => {
  console.log('successfully connected to mongodb');
});

app.listen(port, () => {
  console.log(`Connected to port ${port}`);
});
