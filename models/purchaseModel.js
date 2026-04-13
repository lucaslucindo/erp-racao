const { pool } = require('../config/db');

async function createOrder(supplier_id) {
  const [result] = await pool.query('INSERT INTO purchase_orders (supplier_id) VALUES (?)', [supplier_id]);
  return result.insertId;
}

async function addItem(orderId, { product_id, quantity, unit_cost }) {
  await pool.query(
    'INSERT INTO purchase_order_items (purchase_order_id, product_id, quantity, unit_cost) VALUES (?, ?, ?, ?)',
    [orderId, product_id, quantity, unit_cost]
  );
}

async function finalizeOrder(orderId, total) {
  await pool.query('UPDATE purchase_orders SET status = ?, total = ? WHERE id = ?', ['received', total, orderId]);
}

module.exports = { createOrder, addItem, finalizeOrder };
