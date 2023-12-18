const express = require('express');
const router = express.Router();
const addressController = require('../../controllers/admin/addressController');

router.route('/').get(addressController.getAll).post(addressController.create);

router
  .route('/:id')
  .get(addressController.get)
  .patch(addressController.update)
  .delete(addressController.delete);

module.exports = router;
