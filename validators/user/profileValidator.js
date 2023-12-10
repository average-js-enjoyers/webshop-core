const { body } = require('express-validator');
const handleValidationError = require('../../services/handleValidationError');
const passwordRules = require('../../config/mongodb/passwordRules');

exports.onboard = [
  // Define validation rules using express-validator
  body('firstName')
    .isString()
    .withMessage('First name must contain only letters'),
  body('lastName')
    .isString()
    .withMessage('Last name must contain only letters'),
  body('phoneNumber')
    .isMobilePhone('any', { strictMode: false })
    .withMessage('Invalid phone number'),
  handleValidationError,
];

exports.updateMe = [
  // Define validation rules using express-validator
  body('firstName')
    .isString()
    .withMessage('First name must contain only letters'),
  body('lastName')
    .isString()
    .withMessage('Last name must contain only letters'),
  body('phoneNumber')
    .isMobilePhone('any', { strictMode: false })
    .withMessage('Invalid phone number'),
  handleValidationError,
];

exports.updatePassword = [
  body('passwordCurrent').notEmpty(),
  body('password').isStrongPassword(passwordRules),
  body('passwordConfirm').isStrongPassword(passwordRules),
  handleValidationError,
];

exports.createAddress = [
  body('city').notEmpty().isString(),
  body('region').notEmpty().isString(),
  body('vatID').notEmpty().isString(),
  body('type').notEmpty().isIn(['Both', 'Shipping', 'Billing']),
  body('isActive').notEmpty().isBoolean(),
  body('company').notEmpty().isString(),
  body('addressLine').notEmpty().isString(),
  body('zip').notEmpty().isString(),
  body('name').notEmpty().isString(),
  body('country').notEmpty().isString(),
  body('phoneNumber').notEmpty().isString(),
  handleValidationError,
];
