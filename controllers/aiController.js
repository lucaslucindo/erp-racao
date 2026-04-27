const { pool } = require('../config/db');

async function forecastSales(req, res) {
  const { days } = req.query;
  // Simulação de previsão com base em média
  const [rows] = await pool.query(
    'SELECT AVG(total) as avg_sales FROM pos_sales WHERE created_at >= DATE_SUB(CURDATE(), INTERVAL 90 DAY)'
  );
  const forecast = (rows[0].avg_sales || 0) * days;
  res.json({ forecast, days });
}

async function churnAnalysis(req, res) {
  // Simulação: clientes sem compras nos últimos 90 dias
  const [rows] = await pool.query(
    'SELECT c.id, c.name FROM clients c WHERE NOT EXISTS (SELECT 1 FROM pos_sales s WHERE s.client_id=c.id AND s.created_at >= DATE_SUB(CURDATE(), INTERVAL 90 DAY))'
  );
  res.json({ at_risk_clients: rows });
}

async function purchaseRecommendation(req, res) {
  // Simulação: produtos com estoque < 10
  const [rows] = await pool.query('SELECT id, name, stock FROM products WHERE stock < 10');
  res.json({ recommended_restock: rows });
}

async function aiInsights(req, res) {
  // Simulação de insight automático
  res.json({ insight: "Produto X terá alta demanda no próximo mês com base em histórico." });
}

module.exports = { forecastSales, churnAnalysis, purchaseRecommendation, aiInsights };