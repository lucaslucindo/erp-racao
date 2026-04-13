/**
 * @swagger
 * tags:
 *   name: Stock
 *   description: Controle de estoque (entradas, saídas, inventário)
 */

/**
 * @swagger
 * /stock/entries:
 *   post:
 *     summary: Registrar entrada de estoque (compra)
 *     tags: [Stock]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - product_id
 *               - quantity
 *             properties:
 *               product_id:
 *                 type: integer
 *               quantity:
 *                 type: integer
 *               reference_type:
 *                 type: string
 *               reference_id:
 *                 type: integer
 *               partner_id:
 *                 type: integer
 *               note:
 *                 type: string
 *     responses:
 *       201:
 *         description: Entrada registrada
 *       400:
 *         description: Dados inválidos ou estoque insuficiente
 */

/**
 * @swagger
 * /stock/exits:
 *   post:
 *     summary: Registrar saída de estoque (venda)
 *     tags: [Stock]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - product_id
 *               - quantity
 *             properties:
 *               product_id:
 *                 type: integer
 *               quantity:
 *                 type: integer
 *               reference_type:
 *                 type: string
 *               reference_id:
 *                 type: integer
 *               partner_id:
 *                 type: integer
 *               note:
 *                 type: string
 *     responses:
 *       201:
 *         description: Saída registrada
 *       400:
 *         description: Dados inválidos ou estoque insuficiente
 */

/**
 * @swagger
 * /stock/movements:
 *   get:
 *     summary: Listar movimentações de estoque
 *     tags: [Stock]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: product_id
 *         schema:
 *           type: integer
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *       - in: query
 *         name: offset
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Lista de movimentações
 */

/**
 * @swagger
 * /stock/inventory:
 *   get:
 *     summary: Obter inventário atual (saldo por produto)
 *     tags: [Stock]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Inventário
 */

const express = require('express');
const router = express.Router();
const stockController = require('../controllers/stockController');
const { ensureAuthenticated } = require('../middlewares/authMiddleware');

router.post('/entries', ensureAuthenticated, stockController.createEntry);
router.post('/exits', ensureAuthenticated, stockController.createExit);
router.get('/movements', ensureAuthenticated, stockController.getMovements);
router.get('/inventory', ensureAuthenticated, stockController.getInventory);

module.exports = router;
