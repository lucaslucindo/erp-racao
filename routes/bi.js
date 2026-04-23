/**
 * @swagger
 * tags:
 *   name: BI
 *   description: Relatórios gerenciais e Business Intelligence
 */

/**
 * @swagger
 * /bi/sales/summary:
 *   get:
 *     summary: Resumo de vendas por período
 *     tags: [BI]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: start
 *         schema:
 *           type: string
 *           format: date
 *       - in: query
 *         name: end
 *         schema:
 *           type: string
 *           format: date
 *     responses:
 *       200:
 *         description: Resumo de vendas
 */

/**
 * @swagger
 * /bi/profit:
 *   get:
 *     summary: Relatório de lucro líquido
 *     tags: [BI]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lucro líquido consolidado
 */

/**
 * @swagger
 * /bi/kpis:
 *   get:
 *     summary: KPIs principais do dia
 *     tags: [BI]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Indicadores principais (faturamento, ticket médio, top produtos)
 */

const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../middlewares/authMiddleware');
const biController = require('../controllers/biController');

router.get('/sales/summary', ensureAuthenticated, biController.salesSummary);
router.get('/profit', ensureAuthenticated, biController.profitReport);
router.get('/kpis', ensureAuthenticated, biController.kpis);

module.exports = router;