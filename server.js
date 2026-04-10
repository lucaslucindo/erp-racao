/**
 * @swagger
 * tags:
 *   name: System
 *   description: Rotas de status e diagnóstico
 */

/**
 * @swagger
 * /status:
 *   get:
 *     summary: Verificar status do servidor
 *     tags: [System]
 *     responses:
 *       200:
 *         description: Servidor rodando com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Servidor rodando com sucesso!
 */

/**
 * @swagger
 * /db-test:
 *   get:
 *     summary: Testar conexão com banco de dados MySQL
 *     tags: [System]
 *     responses:
 *       200:
 *         description: Conexão bem-sucedida
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 db:
 *                   type: string
 *                   example: ok
 *                 message:
 *                   type: string
 *                   example: Conexão com MySQL bem-sucedida
 *       500:
 *         description: Falha na conexão com o banco
 */

// server.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');

const routes = require('./routes/index');
const { testConnection } = require('./config/db');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/api/status', (req, res) => {
  res.json({ message: 'Servidor rodando com sucesso!' });
});

app.get('/api/db-test', async (req, res) => {
  const ok = await testConnection();
  if (ok) return res.json({ db: 'ok', message: 'Conexão com MySQL bem-sucedida' });
  return res.status(500).json({ db: 'error', message: 'Falha ao conectar no MySQL' });
});

app.use('/api', routes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

const { swaggerUi, specs } = require('./config/swagger');

// rota da documentação
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));