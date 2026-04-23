/**
 * @swagger
 * tags:
 *   name: Audit
 *   description: Logs de auditoria
 */

/**
 * @swagger
 * /audit/logs:
 *   get:
 *     summary: Listar últimos logs de auditoria
 *     tags: [Audit]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de logs
 */

const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../middlewares/authMiddleware');
const { ensureRole } = require('../middlewares/roleMiddleware');
const auditController = require('../controllers/auditController');

router.get('/logs', ensureAuthenticated, ensureRole('admin'), auditController.listLogs);

module.exports = router;