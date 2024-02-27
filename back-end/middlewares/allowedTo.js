const createError = require('http-errors');

const allowedTo = (...roles) => {
  return (req, res, next) => {
    const userRole = req.currentUser.role;
    if (!roles.includes(userRole)) {
      const error = createError(401, 'Not allowed for this user role');
      next(error);
    }

    next();
  };
};

module.exports = allowedTo;

// TODO: Add this middleware after the verifyToken middleware
// for the role-based routes
