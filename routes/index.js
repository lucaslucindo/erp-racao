/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Registrar novo usuário
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: Usuário registrado com sucesso
 *       400:
 *         description: Dados inválidos
 */

// routes/index.js
const express = require('express');
const router = express.Router();

const usersRouter = require('./users');
const authRouter = require('./auth');
const productsRouter = require('./products');
const clientsRouter = require('./clients');
const suppliersRouter = require('./suppliers');
const stockRouter = require('./stock');
const purchasesRouter = require('./purchases');
const salesRouter = require('./sales');
const cashRouter = require('./cash'); 
const posRouter = require('./pos');
const reportsRouter = require('./reports');
const financeRouter = require('./finance');
const fiscalRouter = require('./fiscal');
const bankingRouter = require('./banking');
const notificationsRouter = require('./notifications');
const exportRouter = require('./export');
const auditRouter = require('./audit');
const biRouter = require('./bi');
const automationRouter = require('./automation');

// rotas agrupadas
router.use('/users', usersRouter);
router.use('/auth', authRouter);
router.use('/products', productsRouter);
router.use('/clients', clientsRouter);
router.use('/suppliers', suppliersRouter);
router.use('/stock', stockRouter);
router.use('/purchases', purchasesRouter);
router.use('/sales', salesRouter);
router.use('/cash', cashRouter);
router.use('/pos', posRouter);
router.use('/reports', reportsRouter);
router.use('/finance', financeRouter);
router.use('/fiscal', fiscalRouter);
router.use('/banking', bankingRouter);
router.use('/notifications', notificationsRouter);
router.use('/export', exportRouter);
router.use('/audit', auditRouter);
router.use('/bi', biRouter);
router.use('/automation', automationRouter);

// rota raiz da API (opcional)
router.get('/', (req, res) => {
  res.json({ api: 'ERP Ração - API', version: '1.0' });
});

module.exports = router;