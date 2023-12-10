const { body, param, header } = require('express-validator');
const handleValidationError = require('../../services/handleValidationError');

const baseEmailChain = body('emailAddress')
  .isEmail()
  .withMessage('Invalid email address');

exports.signin = [
  baseEmailChain,
  body('password').notEmpty(),
  handleValidationError,
];

exports.forgotPassword = [
  baseEmailChain,
  header('Reset-URL').notEmpty(),
  handleValidationError,
];

exports.resetPassword = [body('token').notEmpty(), handleValidationError];
