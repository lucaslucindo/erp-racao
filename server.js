// server.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');

const routes = require('./routes/index'); // novo

const { testConnection } = require('./config/db');

const app = express();

app.use(cors());
app.use(express.json());

// rota de status
app.get('/api/status', (req, res) => {
  res.json({ message: 'Servidor rodando com sucesso!' });
});

// rota para testar DB (Etapa 4)
app.get('/api/db-test', async (req, res) => {
  const ok = await testConnection();
  if (ok) return res.json({ db: 'ok', message: 'Conexão com MySQL bem-sucedida' });
  return res.status(500).json({ db: 'error', message: 'Falha ao conectar no MySQL' });
});

// montar rotas da API em /api
app.use('/api', routes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});