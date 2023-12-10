const express = require('express');
const authController = require('../../controllers/user/authController');
const profileRoutes = require('./profileRoutes');
const authRoutes = require('./authRoutes');

const router = express.Router();

router.use('/auth', authRoutes);

router.use(authController.protect);
router.use('/profile', profileRoutes);

module.exports = router;
