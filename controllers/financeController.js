const { pool } = require('../config/db');

async function listPayables(req, res) {
  const [rows] = await pool.query('SELECT * FROM accounts_payable ORDER BY due_date');
  res.json({ payables: rows });
}

async function listReceivables(req, res) {
  const [rows] = await pool.query('SELECT * FROM accounts_receivable ORDER BY due_date');
  res.json({ receivables: rows });
}

async function cashFlow(req, res) {
  const [payables] = await pool.query('SELECT SUM(amount) as total FROM accounts_payable WHERE status="pending"');
  const [receivables] = await pool.query('SELECT SUM(amount) as total FROM accounts_receivable WHERE status="pending"');
  const inflow = receivables[0].total || 0;
  const outflow = payables[0].total || 0;
  const balance = inflow - outflow;
  res.json({ inflow, outflow, balance });
}

module.exports = { listPayables, listReceivables, cashFlow };
