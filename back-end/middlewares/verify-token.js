const createError = require('http-errors');
const jwt = require('jsonwebtoken');
const verifyToken = (req, res, next) => {
  const {authorization} = req.headers;

  if (!authorization) {
    const error = createError(401, 'Authorization is required');
    return next(error);
  }
  const token = authorization.split(' ')[1];
  try {
    req.currentUser = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch (err) {
    const error = createError(401, 'Invalid token');
    return next(error);
  }
};


module.exports = verifyToken;
