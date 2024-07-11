const express = require("express");

const router = express.Router();

const userController = require('./../controllers/userController');
const authController = require('./../controllers/authController');


// USER ROUTES
router.post('/user', userController.createUser);
router.get('/getMe', authController.login, authController.restrictTo('user'), userController.getMe);

// ADMIN ROUTES
router.get('/users', authController.login, authController.restrictTo('admin'), userController.getAllUsers);
router.get('/user/:userId', authController.login, authController.restrictTo('admin'), userController.getUserById);
router.patch('/user/:userId', userController.updateUserById);
router.delete('/user/:userId', authController.login, authController.restrictTo('admin'), userController.deleteUser);
router.route('/getNamesOfDesiredLength').post(userController.checkNameLength)

module.exports = router;