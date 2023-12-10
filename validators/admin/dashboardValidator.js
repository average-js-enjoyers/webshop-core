const handleValidationError = require('../../services/handleValidationError');
const { body, query, validationResult } = require('express-validator');
const { isDate, isAfter, isBefore } = require('validator');

// Function to calculate days between two dates
const daysBetweenDates = (date1, date2) => {
  const oneDay = 24 * 60 * 60 * 1000; // hours * minutes * seconds * milliseconds

  const firstDate = new Date(date1);
  const secondDate = new Date(date2);

  const diffDays = Math.round((firstDate - secondDate) / oneDay);

  return diffDays;
};

exports.aggregates = [
  body()
    .isArray({ min: 1 })
    .withMessage('Request must contain at least one range!'),

  body('**.startDate')
    .isDate({ format: 'YYYY-MM-DD' })
    .withMessage('Invalid start date format!'),

  body('**.endDate')
    .isDate({ format: 'YYYY-MM-DD' })
    .withMessage('Invalid end date format!'),

  body('*.range').custom((value) => {
    const startDate = new Date(value.startDate);
    const endDate = new Date(value.endDate);
    const currentDate = new Date();

    if (startDate > currentDate) {
      throw new Error('Start date cannot be later than the current date.');
    }

    if (endDate > currentDate) {
      throw new Error('End date cannot be later than the current date.');
    }

    // Check if start date is before end date
    if (startDate >= endDate) {
      throw new Error('Start date must be before end date.');
    }

    // Check if range is longer than 365 days
    const daysDiff = Math.floor((endDate - startDate) / (24 * 60 * 60 * 1000));
    if (daysDiff > 365) {
      throw new Error('Range cannot be longer than 365 days!');
    }

    return true;
  }),

  handleValidationError,
];

exports.openOrders = [
  query('page')
    .optional()
    .isInt({
      gt: 0,
    })
    .withMessage('Page must be greater than zero!'),
  query('limit')
    .optional()
    .isInt({
      gt: 0,
      lt: 11,
    })
    .withMessage('Page size must be greater than 1 and less or equal than 10!'),
  handleValidationError,
];
