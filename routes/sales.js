/**
 * @swagger
 * tags:
 *   name: Sales
 *   description: Pedidos de venda
 */

/**
 * @swagger
 * /sales/complete:
 *   post:
 *     summary: Registrar venda e atualizar estoque
 *     tags: [Sales]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               client_id:
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
 *                     unit_price:
 *                       type: number
 *     responses:
 *       201:
 *         description: Venda concluída e estoque atualizado
 *       400:
 *         description: Dados inválidos ou estoque insuficiente
 */

const express = require('express');
const router = express.Router();
const { completeSale } = require('../controllers/salesController');
const { ensureAuthenticated } = require('../middlewares/authMiddleware');

router.post('/complete', ensureAuthenticated, completeSale);

module.exports = router;
