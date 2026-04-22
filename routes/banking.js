/**
 * @swagger
 * tags:
 *   name: Banking
 *   description: Integração bancária (boletos, PIX)
 */

/**
 * @swagger
 * /banking/boleto:
 *   post:
 *     summary: Gerar boleto bancário
 *     tags: [Banking]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               receivable_id:
 *                 type: integer
 *               due_date:
 *                 type: string
 *                 format: date
 *     responses:
 *       201:
 *         description: Boleto gerado
 */

/**
 * @swagger
 * /banking/pix:
 *   post:
 *     summary: Gerar QR Code PIX
 *     tags: [Banking]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               receivable_id:
 *                 type: integer
 *     responses:
 *       201:
 *         description: PIX gerado
 */

const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../middlewares/authMiddleware');
const bankingController = require('../controllers/bankingController');

router.post('/boleto', ensureAuthenticated, bankingController.generateBoleto);
router.post('/pix', ensureAuthenticated, bankingController.generatePix);

module.exports = router;