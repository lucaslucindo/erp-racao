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