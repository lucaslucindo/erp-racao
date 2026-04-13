/**
 * @swagger
 * tags:
 *   name: Purchases
 *   description: Pedidos de compra
 */

/**
 * @swagger
 * /purchases/receive:
 *   post:
 *     summary: Registrar compra e atualizar estoque
 *     tags: [Purchases]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               supplier_id:
 *                 type: integer
 *               items:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     product_id:
 *                       type: integer
 *                     quantity:
 *                       type: integer
 *                     unit_cost:
 *                       type: number
 *     responses:
 *       201:
 *         description: Compra registrada
 */
const express = require('express');
const router = express.Router();
const { receivePurchase } = require('../controllers/purchaseController');
const { ensureAuthenticated } = require('../middlewares/authMiddleware');

router.post('/receive', ensureAuthenticated, receivePurchase);

module.exports = router;