/**
 * @swagger
 * tags:
 *   name: Automation
 *   description: Automação de processos internos
 */

/**
 * @swagger
 * /automation/report/schedule:
 *   post:
 *     summary: Agendar relatório automático
 *     tags: [Automation]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               type:
 *                 type: string
 *                 example: vendas
 *               frequency:
 *                 type: string
 *                 example: diário
 *     responses:
 *       201:
 *         description: Relatório agendado
 */

/**
 * @swagger
 * /automation/conciliation:
 *   post:
 *     summary: Executar conciliação automática
 *     tags: [Automation]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Conciliação realizada
 */

/**
 * @swagger
 * /automation/workflow:
 *   post:
 *     summary: Disparar workflow interno
 *     tags: [Automation]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               event:
 *                 type: string
 *                 example: estoque_baixo
 *     responses:
 *       200:
 *         description: Workflow disparado
 */

const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../middlewares/authMiddleware');
const automationController = require('../controllers/automationController');

router.post('/report/schedule', ensureAuthenticated, automationController.scheduleReport);
router.post('/conciliation', ensureAuthenticated, automationController.autoConciliation);
router.post('/workflow', ensureAuthenticated, automationController.workflowTrigger);

module.exports = router;