/**
 * @swagger
 * tags:
 *   name: Export
 *   description: Exportação contábil
 */

/**
 * @swagger
 * /export/finance/csv:
 *   get:
 *     summary: Exportar contas a pagar/receber em CSV
 *     tags: [Export]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Dados exportados
 */

/**
 * @swagger
 * /export/sales/xml:
 *   get:
 *     summary: Exportar vendas em XML
 *     tags: [Export]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: XML de vendas
 */

/**
 * @swagger
 * /export/inventory/json:
 *   get:
 *     summary: Exportar inventário em JSON
 *     tags: [Export]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Inventário exportado
 */

const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../middlewares/authMiddleware');
const exportController = require('../controllers/exportController');

router.get('/finance/csv', ensureAuthenticated, exportController.exportFinanceCsv);
router.get('/sales/xml', ensureAuthenticated, exportController.exportSalesXml);
router.get('/inventory/json', ensureAuthenticated, exportController.exportInventoryJson);

module.exports = router;