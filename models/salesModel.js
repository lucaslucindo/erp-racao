const { pool } = require('../config/db');

async function createOrder(client_id) {
  const [result] = await pool.query('INSERT INTO sales_orders (client_id) VALUES (?)', [client_id]);
  return result.insertId;
}

async function addItem(orderId, { product_id, quantity, unit_price }) {
  await pool.query(
    'INSERT INTO sales_order_items (sales_order_id, product_id, quantity, unit_price) VALUES (?, ?, ?, ?)',
    [orderId, product_id, quantity, unit_price]
  );
}

async function finalizeOrder(orderId, total) {
  await pool.query('UPDATE sales_orders SET status = ?, total = ? WHERE id = ?', ['completed', total, orderId]);
}

module.exports = { createOrder, addItem, finalizeOrder };