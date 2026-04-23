const { pool } = require('../config/db');

async function salesSummary(req, res) {
  const { start, end } = req.query;
  const [rows] = await pool.query(
    'SELECT DATE(created_at) as date, SUM(total) as total FROM pos_sales WHERE created_at BETWEEN ? AND ? GROUP BY DATE(created_at)',
    [start, end]
  );
  res.json({ summary: rows });
}

async function profitReport(req, res) {
  const [receivables] = await pool.query('SELECT SUM(amount) as total FROM accounts_receivable WHERE status="received"');
  const [payables] = await pool.query('SELECT SUM(amount) as total FROM accounts_payable WHERE status="paid"');
  const profit = (receivables[0].total || 0) - (payables[0].total || 0);
  res.json({ profit });
}

async function kpis(req, res) {
  const [sales] = await pool.query('SELECT SUM(total) as faturamento, AVG(total) as ticket_medio FROM pos_sales WHERE DATE(created_at)=CURDATE()');
  const [topProducts] = await pool.query(
    'SELECT p.name, SUM(i.quantity) as vendidos FROM pos_sale_items i JOIN products p ON i.product_id=p.id GROUP BY p.id ORDER BY vendidos DESC LIMIT 5'
  );
  res.json({ faturamento: sales[0].faturamento, ticket_medio: sales[0].ticket_medio, top_products: topProducts });
}

module.exports = { salesSummary, profitReport, kpis };