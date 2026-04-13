// models/clientModel.js
const { pool } = require('../config/db');

async function getAll() {
  const [rows] = await pool.query('SELECT * FROM clients ORDER BY id DESC');
  return rows;
}

async function getById(id) {
  const [rows] = await pool.query('SELECT * FROM clients WHERE id = ? LIMIT 1', [id]);
  return rows[0];
}

async function create({ name, cpf_cnpj, phone, address }) {
  const [result] = await pool.query(
    'INSERT INTO clients (name, cpf_cnpj, phone, address) VALUES (?, ?, ?, ?)',
    [name, cpf_cnpj, phone, address]
  );
  return result;
}

async function update(id, { name, cpf_cnpj, phone, address }) {
  const [result] = await pool.query(
    'UPDATE clients SET name = ?, cpf_cnpj = ?, phone = ?, address = ? WHERE id = ?',
    [name, cpf_cnpj, phone, address, id]
  );
  return result;
}

async function remove(id) {
  const [result] = await pool.query('DELETE FROM clients WHERE id = ?', [id]);
  return result;
}

module.exports = { getAll, getById, create, update, remove };
