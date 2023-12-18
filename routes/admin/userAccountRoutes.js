const express = require('express');
const router = express.Router();
const userAccountController = require('../../controllers/admin/userAccountController');

router
  .route('/')
  .get(userAccountController.getAll)
  .post(userAccountController.create);

router
  .route('/:id')
  .get(userAccountController.get)
  .patch(userAccountController.update)
  .delete(userAccountController.delete);

module.exports = router;
