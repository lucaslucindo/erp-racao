const { pool } = require('../config/db');

async function generateBoleto(req, res) {
  const { receivable_id, due_date } = req.body;
  const barcode = '34191.79001...' // simulação
  const [result] = await pool.query(
    'INSERT INTO banking_boletos (receivable_id, barcode, due_date, status) VALUES (?, ?, ?, ?)',
    [receivable_id, barcode, due_date, 'pending']
  );
  res.status(201).json({ id: result.insertId, barcode });
}

async function generatePix(req, res) {
  const { receivable_id } = req.body;
  const qr_code = '0002012658...' // simulação
  const [result] = await pool.query(
    'INSERT INTO banking_pix (receivable_id, qr_code, status) VALUES (?, ?, ?)',
    [receivable_id, qr_code, 'pending']
  );
  res.status(201).json({ id: result.insertId, qr_code });
}

module.exports = { generateBoleto, generatePix };
