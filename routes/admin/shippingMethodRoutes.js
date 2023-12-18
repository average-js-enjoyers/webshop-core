const express = require('express');
const router = express.Router();
const shippingMethodController = require('../../controllers/admin/shippingMethodController');

router
  .route('/')
  .get(shippingMethodController.getAll)
  .post(shippingMethodController.create);

router
  .route('/:id')
  .get(shippingMethodController.get)
  .patch(shippingMethodController.update)
  .delete(shippingMethodController.delete);

module.exports = router;
