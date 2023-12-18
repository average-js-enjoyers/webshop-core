const express = require('express');
const router = express.Router();
const categoryController = require('../../controllers/admin/categoryController');

router
  .route('/')
  .get(categoryController.getAll)
  .post(categoryController.create);

router
  .route('/:id')
  .get(categoryController.get)
  .patch(categoryController.update)
  .delete(categoryController.delete);

module.exports = router;
