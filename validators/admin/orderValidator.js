const handleValidationError = require('../../services/handleValidationError');
const { body, query, validationResult } = require('express-validator');
const { isDate, isAfter, isBefore } = require('validator');

exports.validateOrder = [
  body('userID').isMongoId(),
  body('orderDate').matches(/^(?:\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2})$/),
  body('paymentMethod').notEmpty(),
  body('isPaid').isBoolean(),
  body('shippingAddressID').isMongoId(),
  body('billingAddressID').isMongoId(),
  body('shippingMethodID').isMongoId(),
  body('orderTotalNet').isNumeric(),
  body('orderTotalVat').isNumeric(),
  body('orderTotalGross').isNumeric(),
  body('orderStatus').notEmpty(),
  body('orderlines.*.product_item_id').isMongoId(),
  body('orderlines.*.qty').isNumeric(),
  body('orderlines.*.price_net').isNumeric(),
  body('orderlines.*.tax_percentage').isNumeric(),
  handleValidationError,
];
