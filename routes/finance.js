/**
 * @swagger
 * tags:
 *   name: Finance
 *   description: Módulo financeiro
 */

/**
 * @swagger
 * /finance/payables:
 *   get:
 *     summary: Listar contas a pagar
 *     tags: [Finance]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de contas a pagar
 */

/**
 * @swagger
 * /finance/receivables:
 *   get:
 *     summary: Listar contas a receber
 *     tags: [Finance]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de contas a receber
 */

/**
 * @swagger
 * /finance/cashflow:
 *   get:
 *     summary: Fluxo de caixa consolidado
 *     tags: [Finance]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Fluxo de caixa
 */

const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../middlewares/authMiddleware');
const financeController = require('../controllers/financeController');

router.get('/payables', ensureAuthenticated, financeController.listPayables);
router.get('/receivables', ensureAuthenticated, financeController.listReceivables);
router.get('/cashflow', ensureAuthenticated, financeController.cashFlow);

module.exports = router;
