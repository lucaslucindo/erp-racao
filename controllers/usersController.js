// controllers/usersController.js
const userModel = require('../models/userModel');

async function listUsers(req, res) {
  try {
    const users = await userModel.getAll();
    res.json({ users });
  } catch (err) {
    console.error('Erro listUsers:', err);
    res.status(500).json({ error: 'Erro ao listar usuários' });
  }
}

async function createUser(req, res) {
  // aqui só um esqueleto; validação e criptografia serão adicionadas na Etapa 6
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ error: 'name, email e password são obrigatórios' });
  }
  try {
    const result = await userModel.create({ name, email, password });
    res.status(201).json({ id: result.insertId, message: 'Usuário criado (senha ainda não criptografada neste esqueleto)' });
  } catch (err) {
    console.error('Erro createUser:', err);
    res.status(500).json({ error: 'Erro ao criar usuário' });
  }
}

module.exports = {
  listUsers,
  createUser
};
