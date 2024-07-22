import express from "express";

const router = express.Router();

import userController from './../controllers/userController.js';
import authController from './../controllers/authController.js';

import { validate } from './../validations/userValidation.js';


// USER ROUTES
/**
 * @swagger
 * /api/v1/user:
 *   post:
 *     summary: Create a new user
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - phone
 *               - password
 *               - confirmPassword
 *             properties:
 *               name:
 *                 type: string
 *                 example: "yog"
 *               email:
 *                 type: string
 *                 example: "yog@gmail.com"
 *               phone:
 *                 type: string
 *                 example: "6204668260"
 *               password:
 *                 type: string
 *                 example: "test@123"
 *               confirmPassword:
 *                 type: string
 *                 example: "test@123"
 *     responses:
 *       '201':
 *         description: User created successfully
 *       '400':
 *         description: Bad request. Invalid input data
 */
router.post('/user', validate(['id', 'name', 'email', 'phone', 'password', 'confirmPassword']), authController.signup);

/**
 * @swagger
 * /api/v1/user/{userId}:
 *   patch:
 *     summary: Update user details by user ID
 *     tags:
 *       - Users
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the user to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "New Name"
 *               email:
 *                 type: string
 *                 example: "newemail@example.com"
 *               phone:
 *                 type: string
 *                 example: "6204668260"
 *     responses:
 *       '200':
 *         description: User details updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "success"
 *                 message:
 *                   type: string
 *                   example: "User details updated Successfully!!!"
 *       '400':
 *         description: Bad request. Invalid input data or user not updated
 *       '404':
 *         description: Not found. No user found with the specified ID
 */
router.patch('/user/:userId', userController.updateUserById); //validate(['id', 'name', 'email'])

/**
 * @swagger
 * /api/v1/getNamesOfDesiredLength:
 *   post:
 *     summary: Get users with names of a specified length
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               len:
 *                 type: integer
 *                 example: 5
 *                 description: The desired length of the user names
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "success"
 *                 users:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 1
 *                       name:
 *                         type: string
 *                         example: "Alice"
 *                       email:
 *                         type: string
 *                         example: "alice@example.com"
 *                       phone:
 *                         type: string
 *                         example: "1234567890"
 *       '400':
 *         description: Bad request. Invalid input data
 */
router.post('/getNamesOfDesiredLength', userController.checkNameLength)

/**
 * @swagger
 * /api/v1/login:
 *   post:
 *     summary: Log in a user
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: "shyam@gmail.com"
 *               password:
 *                 type: string
 *                 
 *     responses:
 *       '200':
 *         description: User logged in successfully
 *       '400':
 *         description: Bad request. Invalid input data
 *       '401':
 *         description: Unauthorized. Incorrect email or password
 */
router.use(validate(['email', 'password']), authController.login);

/**
 * @swagger
 * /api/v1/getMe:
 *   post:
 *     summary: Get the logged-in user's details
 *     tags:
 *       - Users
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "success"
 *                 data:
 *                   type: object
 *                   properties:
 *                     user:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: integer
 *                           example: 1
 *                         name:
 *                           type: string
 *                           example: "Shyam"
 *                         email:
 *                           type: string
 *                           example: "shyam@gmail.com"
 *                         phone:
 *                           type: string
 *                           example: "6204668260"
 *                         role:
 *                           type: string
 *                           example: "user"
 *       '403':
 *         description: Forbidden. You do not have permission to perform this action
 *       '404':
 *         description: Not Found. No user found with the specified ID
 */
router.post('/getMe', authController.restrictTo('user'), userController.getMe);

// ADMIN ROUTES

/**
 * @swagger
 * /api/v1/users:
 *   get:
 *     summary: Get all users
 *     tags:
 *       - Users
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: A list of all users
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "success"
 *                 data:
 *                   type: object
 *                   properties:
 *                     users:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: integer
 *                             example: 1
 *                           name:
 *                             type: string
 *                             example: "Alice"
 *                           email:
 *                             type: string
 *                             example: "alice@example.com"
 *                           phone:
 *                             type: string
 *                             example: "1234567890"
 *       '403':
 *         description: Forbidden. User does not have permission
 *       '401':
 *         description: Unauthorized. User is not logged in
 */
router.get('/users', authController.restrictTo('admin'), userController.getAllUsers);

/**
 * @swagger
 * /api/v1/user/{userId}:
 *   get:
 *     summary: Get user by ID
 *     tags:
 *       - Users
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the user to retrieve
 *     responses:
 *       '200':
 *         description: A single user
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "success"
 *                 data:
 *                   type: object
 *                   properties:
 *                     user:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: integer
 *                           example: 1
 *                         name:
 *                           type: string
 *                           example: "Alice"
 *                         email:
 *                           type: string
 *                           example: "alice@example.com"
 *                         phone:
 *                           type: string
 *                           example: "1234567890"
 *       '403':
 *         description: Forbidden. User does not have permission
 *       '401':
 *         description: Unauthorized. User is not logged in
 *       '404':
 *         description: User not found
 */
router.get('/user/:userId', validate(['id']), authController.restrictTo('admin'), userController.getUserById);

/**
 * @swagger
 * /api/v1/user/{userId}:
 *   delete:
 *     summary: Delete a user by ID
 *     tags:
 *       - Users
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the user to delete
 *     responses:
 *       '204':
 *         description: User deleted successfully
 *       '403':
 *         description: Forbidden. User does not have permission
 *       '401':
 *         description: Unauthorized. User is not logged in
 *       '404':
 *         description: User not found
 */
router.delete('/user/:userId', validate(['id']), authController.restrictTo('admin'), userController.deleteUser);

export default router;