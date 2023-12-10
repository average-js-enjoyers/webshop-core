const express = require('express');
const profileController = require('../../controllers/user/profileController');
const profileValidator = require('../../validators/user/profileValidator');
const upload = require('../../services/upload');

const router = express.Router();

router.get('', profileController.getUser);
router.patch('/onboard', profileValidator.onboard, profileController.onboard);

router.use(profileController.checkOnboard);

router.patch('', profileValidator.updateMe, profileController.updateMe);
router.delete('', profileController.deleteMe);

router.post('/photo', upload.single('image'), profileController.uploadPhoto);
router.delete('/photo', profileController.deletePhoto);

router.patch(
  '/password',
  profileValidator.updatePassword,
  profileController.updatePassword,
);

router.get('/address', profileController.getAllAddress);
router.post(
  '/address',
  profileValidator.createAddress,
  profileController.createAddress,
);
router.patch('/address', profileController.updateAddress);
router.delete('/address', profileController.deleteAddress);

module.exports = router;
