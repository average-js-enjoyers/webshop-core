const express = require('express');
const router = express.Router();
const orderController = require('../../controllers/admin/orderController');
const orderValidator = require('../../validators/admin/orderValidator');

router
  .route('/')
  .get(orderController.getAllOrders)
  .post(orderValidator.validateOrder, orderController.createOrder);

router
  .route('/:id')
  .get(orderController.getOrder)
  .patch(orderValidator.validateOrder, orderController.updateOrder)
  .delete(orderController.deleteOrder);

module.exports = router;
