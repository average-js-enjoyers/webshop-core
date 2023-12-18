const express = require('express');
const router = express.Router();
const reviewController = require('../../controllers/admin/reviewController');

router.route('/').get(reviewController.getAll).post(reviewController.create);

router
  .route('/:id')
  .get(reviewController.get)
  .patch(reviewController.update)
  .delete(reviewController.delete);

module.exports = router;
