// controllers/authController.js

// NOTE: implementação completa com bcrypt e JWT será feita na Etapa 6.
// Aqui deixamos respostas de exemplo para testar rotas.

async function login(req, res) {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: 'email e password são obrigatórios' });
  }
  // placeholder: na Etapa 6 vamos validar senha e gerar token
  return res.json({ message: 'Rota de login (a implementar na Etapa 6)' });
}

async function register(req, res) {
  // placeholder para registro
  return res.json({ message: 'Rota de registro (a implementar na Etapa 6)' });
}

module.exports = {
  login,
  register
};
