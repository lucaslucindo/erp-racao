// controllers/authController.js
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');
require('dotenv').config();

const SALT_ROUNDS = parseInt(process.env.BCRYPT_SALT_ROUNDS || '10', 10);
const JWT_SECRET = process.env.JWT_SECRET || 'change_this_secret';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '8h';

async function register(req, res) {
  try {
    const { name, email, password, role } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ error: 'name, email e password são obrigatórios' });
    }

    // Verifica se já existe usuário com o email
    const existing = await userModel.findByEmail(email);
    if (existing) {
      return res.status(409).json({ error: 'Email já cadastrado' });
    }

    // Criptografa a senha
    const hashed = await bcrypt.hash(password, SALT_ROUNDS);

    // Cria usuário no banco
    const result = await userModel.create({ name, email, password: hashed, role: role || 'user' });

    return res.status(201).json({ id: result.insertId, message: 'Usuário registrado com sucesso' });
  } catch (err) {
    console.error('register error:', err);
    return res.status(500).json({ error: 'Erro ao registrar usuário' });
  }
}

async function login(req, res) {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: 'email e password são obrigatórios' });
    }

    const user = await userModel.findByEmail(email);
    if (!user) {
      return res.status(401).json({ error: 'Credenciais inválidas' });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).json({ error: 'Credenciais inválidas' });
    }

    // Payload mínimo do token
    const payload = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role
    };

    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });

    return res.json({ message: 'Autenticado com sucesso', token, user: payload });
  } catch (err) {
    console.error('login error:', err);
    return res.status(500).json({ error: 'Erro ao autenticar' });
  }
}

module.exports = {
  register,
  login
};
