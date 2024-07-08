const express = require('express');

const logController = require('./../controllers/logController');
const authController = require('./../controllers/authController');

const router = express.Router();

router.get('/logs', authController.login, authController.restrictTo('admin'), logController.getAllLogs);
router.get('/logs/:userId', authController.login, authController.restrictTo('admin'), logController.getLogsByUserId);

module.exports = router;
