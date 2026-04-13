const { pool } = require('../config/db');

async function getAll() {
  const [rows] = await pool.query('SELECT * FROM products ORDER BY id DESC');
  return rows;
}

async function create({ name, category, cost, price, stock }) {
  const [result] = await pool.query(
    'INSERT INTO products (name, category, cost, price, stock) VALUES (?, ?, ?, ?, ?)',
    [name, category, cost, price, stock]
  );
  return result;
}

module.exports = { getAll, create };
