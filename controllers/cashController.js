const { pool } = require('../config/db');

async function openCash(req, res) {
  const { initial_balance } = req.body;
  const [result] = await pool.query(
    'INSERT INTO cash_registers (initial_balance) VALUES (?)',
    [initial_balance || 0]
  );
  res.status(201).json({ id: result.insertId, message: 'Caixa aberto' });
}

async function closeCash(req, res) {
  const { id } = req.params;
  const [rows] = await pool.query('SELECT initial_balance FROM cash_registers WHERE id = ? AND status = "open"', [id]);
  if (rows.length === 0) return res.status(404).json({ error: 'Caixa não encontrado ou já fechado' });

  const [movements] = await pool.query('SELECT SUM(CASE WHEN type="entrada" THEN amount ELSE -amount END) as saldo FROM cash_movements WHERE cash_register_id = ?', [id]);
  const saldo = movements[0].saldo || 0;
  const finalBalance = rows[0].initial_balance + saldo;

  await pool.query('UPDATE cash_registers SET status="closed", closed_at=NOW(), final_balance=? WHERE id=?', [finalBalance, id]);
  res.json({ message: 'Caixa fechado', finalBalance });
}

async function addMovement(req, res) {
  const { cash_register_id, type, amount, description } = req.body;
  await pool.query(
    'INSERT INTO cash_movements (cash_register_id, type, amount, description) VALUES (?, ?, ?, ?)',
    [cash_register_id, type, amount, description]
  );
  res.status(201).json({ message: 'Movimentação registrada' });
}

module.exports = { openCash, closeCash, addMovement };
