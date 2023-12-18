const express = require('express');
const router = express.Router();
const userController = require('../../controllers/admin/userController');

router.route('/').get(userController.getAll).post(userController.create);

router
  .route('/:id')
  .get(userController.get)
  .patch(userController.update)
  .delete(userController.delete);

module.exports = router;
