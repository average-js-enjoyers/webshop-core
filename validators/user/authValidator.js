const { body, param, header } = require('express-validator');
const handleValidationError = require('../../services/handleValidationError');

const baseEmailChain = body('emailAddress')
  .isEmail()
  .withMessage('Invalid email address');

exports.signup = [baseEmailChain, handleValidationError];

exports.signin = [
  baseEmailChain,
  body('password').notEmpty(),
  handleValidationError,
];

exports.requestEmailSignin = [
  baseEmailChain,
  header('Confirmation-URL').notEmpty(),
  handleValidationError,
];

exports.googleSignin = [body('token').notEmpty(), handleValidationError];

exports.facebookSignin = [body('token').notEmpty(), handleValidationError];

exports.forgotPassword = [
  baseEmailChain,
  header('Reset-URL').notEmpty(),
  handleValidationError,
];

exports.resetPassword = [body('token').notEmpty(), handleValidationError];

exports.isExists = [baseEmailChain, handleValidationError];
