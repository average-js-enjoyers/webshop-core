const express = require('express');
const authController = require('../../controllers/admin/authController');
const authValidator = require('../../validators/admin/authValidator');

const router = express.Router();

router.post('/signin', authValidator.signin, authController.signin);
router.post(
  '/password/forgot',
  authValidator.forgotPassword,
  authController.forgotPassword,
);
router.patch(
  '/password/reset',
  authValidator.resetPassword,
  authController.resetPassword,
);

module.exports = router;
