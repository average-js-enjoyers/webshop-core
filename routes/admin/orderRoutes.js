const express = require('express');
const router = express.Router();
const orderController = require('../../controllers/admin/orderController');

router.route('/').get(orderController.getAllOrders);

router
  .route('/:id')
  .get(orderController.getOrder)
  .patch(orderController.updateOrder)
  .delete(orderController.deleteOrder);

module.exports = router;
