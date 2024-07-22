import express from 'express';

import logController from './../controllers/logController.js';
import authController from './../controllers/authController.js';

const router = express.Router();

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
router.use(authController.login);

/**
 * @swagger
 * /api/v1/logs:
 *   get:
 *     summary: Get all logs
 *     tags:
 *       - Logs
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: A list of all logs
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
 *                     logs:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: integer
 *                             example: 1
 *                           action:
 *                             type: string
 *                             example: "Create User"
 *                           message:
 *                             type: string
 *                             example: "User with ID 1 created"
 *                           createdAt:
 *                             type: string
 *                             format: date-time
 *                             example: "2023-07-01T12:34:56.000Z"
 *                           user:
 *                             type: object
 *                             properties:
 *                               id:
 *                                 type: integer
 *                                 example: 1
 *                               name:
 *                                 type: string
 *                                 example: "Alice"
 *                               email:
 *                                 type: string
 *                                 example: "alice@example.com"
 *       '403':
 *         description: Forbidden. User does not have permission
 *       '401':
 *         description: Unauthorized. User is not logged in
 */
router.get('/logs', authController.restrictTo('admin'), logController.getAllLogs);

/**
 * @swagger
 * /api/v1/logs/{userId}:
 *   get:
 *     summary: Get logs by user ID
 *     tags:
 *       - Logs
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the user
 *     responses:
 *       '200':
 *         description: A list of logs for the specified user
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
 *                     logs:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: integer
 *                             example: 1
 *                           action:
 *                             type: string
 *                             example: "Create User"
 *                           message:
 *                             type: string
 *                             example: "User with ID 1 created"
 *                           createdAt:
 *                             type: string
 *                             format: date-time
 *                             example: "2023-07-01T12:34:56.000Z"
 *                           user:
 *                             type: object
 *                             properties:
 *                               id:
 *                                 type: integer
 *                                 example: 1
 *                               name:
 *                                 type: string
 *                                 example: "Alice"
 *                               email:
 *                                 type: string
 *                                 example: "alice@example.com"
 *       '403':
 *         description: Forbidden. User does not have permission
 *       '401':
 *         description: Unauthorized. User is not logged in
 *       '404':
 *         description: No logs found for the specified user
 */
router.get('/logs/:userId', authController.restrictTo('admin'), logController.getLogsByUserId);

export default router;
