const express = require('express');
const router = express.Router();
const variationController = require('../../controllers/admin/variationController');

router
  .route('/')
  .get(variationController.getAll)
  .post(variationController.create);

router
  .route('/:id')
  .get(variationController.get)
  .patch(variationController.update)
  .delete(variationController.delete);

module.exports = router;
