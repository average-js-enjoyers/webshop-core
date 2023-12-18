const express = require('express');
const router = express.Router();
const propertyController = require('../../controllers/admin/propertyController');

router
  .route('/')
  .get(propertyController.getAll)
  .post(propertyController.create);

router
  .route('/:id')
  .get(propertyController.get)
  .patch(propertyController.update)
  .delete(propertyController.delete);

module.exports = router;
