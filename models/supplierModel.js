// models/supplierModel.js
const { pool } = require('../config/db');

async function getAll() {
  const [rows] = await pool.query('SELECT * FROM suppliers ORDER BY id DESC');
  return rows;
}

async function getById(id) {
  const [rows] = await pool.query('SELECT * FROM suppliers WHERE id = ? LIMIT 1', [id]);
  return rows[0];
}

async function create({ name, cnpj, phone, address }) {
  const [result] = await pool.query(
    'INSERT INTO suppliers (name, cnpj, phone, address) VALUES (?, ?, ?, ?)',
    [name, cnpj, phone, address]
  );
  return result;
}

async function update(id, { name, cnpj, phone, address }) {
  const [result] = await pool.query(
    'UPDATE suppliers SET name = ?, cnpj = ?, phone = ?, address = ? WHERE id = ?',
    [name, cnpj, phone, address, id]
  );
  return result;
}

async function remove(id) {
  const [result] = await pool.query('DELETE FROM suppliers WHERE id = ?', [id]);
  return result;
}

module.exports = { getAll, getById, create, update, remove };
