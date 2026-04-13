// models/stockModel.js
const { pool } = require('../config/db');

async function createMovementAndUpdateStock({ product_id, type, quantity, reference_type = null, reference_id = null, partner_id = null, note = null }) {
  const conn = await pool.getConnection();
  try {
    await conn.beginTransaction();

    // verifica produto
    const [prodRows] = await conn.query('SELECT stock FROM products WHERE id = ? FOR UPDATE', [product_id]);
    if (prodRows.length === 0) {
      throw new Error('Produto não encontrado');
    }
    const currentStock = prodRows[0].stock;
    const newStock = type === 'entrada' ? currentStock + quantity : currentStock - quantity;

    if (newStock < 0) {
      throw new Error('Estoque insuficiente');
    }

    // atualiza stock
    await conn.query('UPDATE products SET stock = ? WHERE id = ?', [newStock, product_id]);

    // insere movimentação
    const [result] = await conn.query(
      `INSERT INTO stock_movements (product_id, type, quantity, reference_type, reference_id, partner_id, note)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [product_id, type, quantity, reference_type, reference_id, partner_id, note]
    );

    await conn.commit();
    return { movementId: result.insertId, newStock };
  } catch (err) {
    await conn.rollback();
    throw err;
  } finally {
    conn.release();
  }
}

async function listMovements({ product_id = null, limit = 100, offset = 0 } = {}) {
  let sql = 'SELECT * FROM stock_movements';
  const params = [];
  if (product_id) {
    sql += ' WHERE product_id = ?';
    params.push(product_id);
  }
  sql += ' ORDER BY created_at DESC LIMIT ? OFFSET ?';
  params.push(Number(limit), Number(offset));
  const [rows] = await pool.query(sql, params);
  return rows;
}

async function getInventory() {
  const [rows] = await pool.query('SELECT id, name, category, stock FROM products ORDER BY name');
  return rows;
}

module.exports = {
  createMovementAndUpdateStock,
  listMovements,
  getInventory
};
