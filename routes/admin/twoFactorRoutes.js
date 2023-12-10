const express = require('express');
const twoFactorController = require('../../controllers/admin/twoFactorController');

const router = express.Router();

router.post('/verify', twoFactorController.verify2fa);
router.use(twoFactorController.protect2fa);
router.put('/set', twoFactorController.set2fa);
router.delete('/remove', twoFactorController.remove2fa);

module.exports = router;
