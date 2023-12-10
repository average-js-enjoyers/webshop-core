const express = require('express');
const authController = require('../../controllers/user/authController');
const authValidator = require('../../validators/user/authValidator');

const router = express.Router();

router.post('/signup', authValidator.signup, authController.signup);
router.post('/signin', authValidator.signin, authController.signin);
router.post(
  '/signin/email',
  authValidator.requestEmailSignin,
  authController.requestEmailSignin,
);
router.post(
  '/signin/google',
  authValidator.googleSignin,
  authController.googleSignin,
);
router.post(
  '/signin/facebook',
  authValidator.facebookSignin,
  authController.facebookSignin,
);
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
router.post('/info/email', authValidator.isExists, authController.isExists);
router.get('/info/type', authController.protect, authController.getAuthType);

module.exports = router;
