const purchaseModel = require('../models/purchaseModel');
const { pool } = require('../config/db');

async function receivePurchase(req, res) {
  const { supplier_id, items } = req.body;
  if (!items || items.length === 0) return res.status(400).json({ error: 'Itens obrigatórios' });

  const conn = await pool.getConnection();
  try {
    await conn.beginTransaction();
    const orderId = await purchaseModel.createOrder(supplier_id);
    let total = 0;

    for (const it of items) {
      await purchaseModel.addItem(orderId, it);
      total += it.quantity * it.unit_cost;

      // Atualiza estoque
      const [prod] = await conn.query('SELECT stock FROM products WHERE id = ? FOR UPDATE', [it.product_id]);
      const newStock = prod[0].stock + it.quantity;
      await conn.query('UPDATE products SET stock = ? WHERE id = ?', [newStock, it.product_id]);
      await conn.query('INSERT INTO stock_movements (product_id, type, quantity, reference_type, reference_id, partner_id) VALUES (?, ?, ?, ?, ?, ?)', [it.product_id, 'entrada', it.quantity, 'purchase', orderId, supplier_id]);
    }

    await purchaseModel.finalizeOrder(orderId, total);
    await conn.commit();
    res.status(201).json({ id: orderId, message: 'Compra recebida e estoque atualizado' });
  } catch (err) {
    await conn.rollback();
    res.status(500).json({ error: err.message });
  } finally {
    conn.release();
  }
}

module.exports = { receivePurchase };