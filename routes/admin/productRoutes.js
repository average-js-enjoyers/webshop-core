const express = require('express');
const router = express.Router();
const productController = require('../../controllers/admin/productController');

router.route('/').get(productController.getAllProducts);

router
  .route('/:id')
  .get(productController.getProduct)
  .patch(productController.updateProduct)
  .delete(productController.deleteProduct);

module.exports = router;
