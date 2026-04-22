/**
 * @swagger
 * tags:
 *   name: Reports
 *   description: Relatórios básicos
 */

/**
 * @swagger
 * /reports/sales/daily:
 *   get:
 *     summary: Relatório de vendas do dia
 *     tags: [Reports]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de vendas do dia
 */

/**
 * @swagger
 * /reports/cash/movements:
 *   get:
 *     summary: Movimentações do caixa atual
 *     tags: [Reports]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de movimentações
 */

/**
 * @swagger
 * /reports/products/top:
 *   get:
 *     summary: Produtos mais vendidos
 *     tags: [Reports]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: days
 *         schema:
 *           type: integer
 *         description: Número de dias para analisar
 *     responses:
 *       200:
 *         description: Lista de produtos mais vendidos
 */

const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../middlewares/authMiddleware');
const reportsController = require('../controllers/reportsController');

router.get('/sales/daily', ensureAuthenticated, reportsController.salesDaily);
router.get('/cash/movements', ensureAuthenticated, reportsController.cashMovements);
router.get('/products/top', ensureAuthenticated, reportsController.topProducts);

module.exports = router;