/**
 * @swagger
 * tags:
 *   name: AI
 *   description: Inteligência Artificial aplicada ao ERP
 */

/**
 * @swagger
 * /ai/forecast/sales:
 *   get:
 *     summary: Previsão de vendas futuras
 *     tags: [AI]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: days
 *         schema:
 *           type: integer
 *         description: Número de dias para previsão
 *     responses:
 *       200:
 *         description: Previsão de vendas
 */

/**
 * @swagger
 * /ai/churn:
 *   get:
 *     summary: Análise de clientes em risco (churn)
 *     tags: [AI]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de clientes em risco
 */

/**
 * @swagger
 * /ai/purchase/recommendation:
 *   get:
 *     summary: Recomendação de compras para reposição de estoque
 *     tags: [AI]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Produtos recomendados para reposição
 */

/**
 * @swagger
 * /ai/insights:
 *   get:
 *     summary: Insights automáticos gerados pela IA
 *     tags: [AI]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Insight estratégico
 */

const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../middlewares/authMiddleware');
const aiController = require('../controllers/aiController');

router.get('/forecast/sales', ensureAuthenticated, aiController.forecastSales);
router.get('/churn', ensureAuthenticated, aiController.churnAnalysis);
router.get('/purchase/recommendation', ensureAuthenticated, aiController.purchaseRecommendation);
router.get('/insights', ensureAuthenticated, aiController.aiInsights);

module.exports = router;