const { pool } = require('../config/db');

async function exportFinanceCsv(req, res) {
  const [rows] = await pool.query('SELECT * FROM accounts_receivable UNION SELECT * FROM accounts_payable');
  res.json({ data: rows }); // aqui você poderia gerar CSV
}

async function exportSalesXml(req, res) {
  const [rows] = await pool.query('SELECT * FROM pos_sales');
  const xml = `<sales>${rows.map(r => `<sale id="${r.id}" total="${r.total}"/>`).join('')}</sales>`;
  res.type('application/xml').send(xml);
}

async function exportInventoryJson(req, res) {
  const [rows] = await pool.query('SELECT * FROM products');
  res.json({ inventory: rows });
}

module.exports = { exportFinanceCsv, exportSalesXml, exportInventoryJson };
