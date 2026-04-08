// controllers/usersController.js
const bcrypt = require('bcrypt');
const userModel = require('../models/userModel');
require('dotenv').config();

const SALT_ROUNDS = parseInt(process.env.BCRYPT_SALT_ROUNDS || '10', 10);

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
  const { name, email, password, role } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ error: 'name, email e password são obrigatórios' });
  }
  try {
    const existing = await userModel.findByEmail(email);
    if (existing) return res.status(409).json({ error: 'Email já cadastrado' });

    const hashed = await bcrypt.hash(password, SALT_ROUNDS);
    const result = await userModel.create({ name, email, password: hashed, role: role || 'user' });
    res.status(201).json({ id: result.insertId, message: 'Usuário criado com sucesso' });
  } catch (err) {
    console.error('Erro createUser:', err);
    res.status(500).json({ error: 'Erro ao criar usuário' });
  }
}

module.exports = {
  listUsers,
  createUser
};
