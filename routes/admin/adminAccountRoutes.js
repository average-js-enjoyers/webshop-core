const express = require('express');
const router = express.Router();
const adminAccountController = require('../../controllers/admin/adminAccountController');

router
  .route('/')
  .get(adminAccountController.getAll)
  .post(adminAccountController.create);

router
  .route('/:id')
  .get(adminAccountController.get)
  .patch(adminAccountController.update)
  .delete(adminAccountController.delete);

module.exports = router;
