// routes/index.js
const express = require('express');
const router = express.Router();

const usersRouter = require('./users');
const authRouter = require('./auth');

// rotas agrupadas
router.use('/users', usersRouter);
router.use('/auth', authRouter);

// rota raiz da API (opcional)
router.get('/', (req, res) => {
  res.json({ api: 'ERP Ração - API', version: '1.0' });
});

module.exports = router;