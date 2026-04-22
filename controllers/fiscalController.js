const { pool } = require('../config/db');

async function emitNfe(req, res) {
  const { sale_id } = req.body;
  // Aqui você integraria com SEFAZ e geraria XML
  const xml = `<NFe>...</NFe>`;
  const [result] = await pool.query(
    'INSERT INTO fiscal_nfe (sale_id, xml, status) VALUES (?, ?, ?)',
    [sale_id, xml, 'authorized']
  );
  res.status(201).json({ id: result.insertId, message: 'NF-e emitida', xml });
}

async function getNfe(req, res) {
  const { id } = req.params;
  const [rows] = await pool.query('SELECT * FROM fiscal_nfe WHERE id=?', [id]);
  if (rows.length === 0) return res.status(404).json({ error: 'NF-e não encontrada' });
  res.json(rows[0]);
}

module.exports = { emitNfe, getNfe };
