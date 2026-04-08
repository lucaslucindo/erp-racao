// middlewares/authMiddleware.js
const jwt = require('jsonwebtoken');
require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET || 'change_this_secret';

function ensureAuthenticated(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Token ausente' });
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded; // id, name, email, role
    return next();
  } catch (err) {
    return res.status(401).json({ error: 'Token inválido ou expirado' });
  }
}

function ensureRole(role) {
  return (req, res, next) => {
    if (!req.user) return res.status(401).json({ error: 'Não autenticado' });
    if (req.user.role !== role) return res.status(403).json({ error: 'Acesso negado' });
    return next();
  };
}

module.exports = {
  ensureAuthenticated,
  ensureRole
};
