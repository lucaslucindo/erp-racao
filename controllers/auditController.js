const { pool } = require('../config/db');

async function listLogs(req, res) {
  const [rows] = await pool.query('SELECT * FROM audit_logs ORDER BY created_at DESC LIMIT 100');
  res.json({ logs: rows });
}

module.exports = { listLogs };