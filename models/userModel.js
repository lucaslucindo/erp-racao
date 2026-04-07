// models/userModel.js
const { pool } = require('../config/db');

async function getAll() {
  const [rows] = await pool.query('SELECT id, name, email, role, created_at FROM users ORDER BY id DESC');
  return rows;
}

async function create({ name, email, password }) {
  const [result] = await pool.query(
    'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
    [name, email, password]
  );
  return result;
}

async function findByEmail(email) {
  const [rows] = await pool.query('SELECT * FROM users WHERE email = ? LIMIT 1', [email]);
  return rows[0];
}

module.exports = {
  getAll,
  create,
  findByEmail
};
