const express = require('express');
const mongoose = require('mongoose');
const usersRouter = require('./routes/user-routes');
const patientRouter = require('./routes/patient-routes');
const jSend = require('jsend');
const createError = require('http-errors');
require('dotenv').config();

const url = process.env.MONGO_URL;
const port = process.env.PORT;
const app = express();
app.use(express.json());
app.use('/api/users', usersRouter);
app.use('/api/patients', patientRouter);

app.all('*', (req, res, next) => {
  const error = createError(404, 'Resource not found error');
  next(error);
});
app.use((err, req, res, next) => {
  if (err) {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal server error!';
    res.status(statusCode).json(jSend.error(message));
  }
});

mongoose.connect(url).then(() => {
  console.log('successfully connected to mongodb');
});

app.listen(port, () => {
  console.log(`Connected to port ${port}`);
});
