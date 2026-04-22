const { pool } = require('../config/db');

async function salesDaily(req, res) {
  const [rows] = await pool.query(
    'SELECT id, total, created_at FROM pos_sales WHERE DATE(created_at) = CURDATE()'
  );
  const total = rows.reduce((sum, r) => sum + Number(r.total), 0);
  res.json({ total, sales: rows });
}

async function cashMovements(req, res) {
  const [openCash] = await pool.query('SELECT id FROM cash_registers WHERE status="open" ORDER BY opened_at DESC LIMIT 1');
  if (openCash.length === 0) return res.status(404).json({ error: 'Nenhum caixa aberto' });
  const cashId = openCash[0].id;
  const [rows] = await pool.query('SELECT * FROM cash_movements WHERE cash_register_id=?', [cashId]);
  res.json({ cash_register_id: cashId, movements: rows });
}

async function topProducts(req, res) {
  const days = req.query.days || 30;
  const [rows] = await pool.query(
    `SELECT p.id, p.name, SUM(i.quantity) as total_sold
     FROM pos_sale_items i
     JOIN products p ON i.product_id = p.id
     JOIN pos_sales s ON i.pos_sale_id = s.id
     WHERE s.created_at >= DATE_SUB(CURDATE(), INTERVAL ? DAY)
     GROUP BY p.id, p.name
     ORDER BY total_sold DESC
     LIMIT 10`,
    [days]
  );
  res.json({ top_products: rows });
}

module.exports = { salesDaily, cashMovements, topProducts };