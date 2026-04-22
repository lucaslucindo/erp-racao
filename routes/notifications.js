/**
 * @swagger
 * tags:
 *   name: Notifications
 *   description: Automação de notificações
 */

/**
 * @swagger
 * /notifications:
 *   post:
 *     summary: Enviar notificação
 *     tags: [Notifications]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               type:
 *                 type: string
 *               message:
 *                 type: string
 *               sent_to:
 *                 type: string
 *     responses:
 *       201:
 *         description: Notificação registrada
 */

const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../middlewares/authMiddleware');
const notificationsController = require('../controllers/notificationsController');

router.post('/', ensureAuthenticated, notificationsController.sendNotification);

module.exports = router;