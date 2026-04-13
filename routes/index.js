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

// rotas agrupadas
router.use('/users', usersRouter);
router.use('/auth', authRouter);
router.use('/products', productsRouter);
router.use('/clients', clientsRouter);
router.use('/suppliers', suppliersRouter);
router.use('/stock', stockRouter);
router.use('/purchases', purchasesRouter);
router.use('/sales', salesRouter);

// rota raiz da API (opcional)
router.get('/', (req, res) => {
  res.json({ api: 'ERP Ração - API', version: '1.0' });
});

module.exports = router;


