const { validationResult } = require('express-validator');
const { ValidationError } = require('../services/appError');

module.exports = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    throw new ValidationError(
      'One or more validation errors occurred.',
      400,
      errors.array(),
    );
  }

  next();
};
