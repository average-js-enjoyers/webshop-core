const express = require('express');
const router = express.Router();
const productItemController = require('../../controllers/admin/productItemController');

router
  .route('/')
  .get(productItemController.getAll)
  .post(productItemController.create);

router
  .route('/:id')
  .get(productItemController.get)
  .patch(productItemController.update)
  .delete(productItemController.delete);

module.exports = router;
