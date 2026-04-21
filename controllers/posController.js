const { pool } = require('../config/db');

async function createSale(req, res) {
  const { client_id, items } = req.body;
  if (!items || items.length === 0) return res.status(400).json({ error: 'Itens obrigatórios' });

  const conn = await pool.getConnection();
  try {
    await conn.beginTransaction();
    let total = 0;
    const [saleRes] = await conn.query('INSERT INTO pos_sales (client_id, total) VALUES (?, ?)', [client_id || null, 0]);
    const saleId = saleRes.insertId;

    for (const it of items) {
      total += it.quantity * it.unit_price;
      await conn.query('INSERT INTO pos_sale_items (pos_sale_id, product_id, quantity, unit_price) VALUES (?, ?, ?, ?)', [saleId, it.product_id, it.quantity, it.unit_price]);

      // Atualiza estoque
      const [prod] = await conn.query('SELECT stock FROM products WHERE id = ? FOR UPDATE', [it.product_id]);
      if (prod[0].stock < it.quantity) throw new Error('Estoque insuficiente');
      const newStock = prod[0].stock - it.quantity;
      await conn.query('UPDATE products SET stock = ? WHERE id = ?', [newStock, it.product_id]);
      await conn.query('INSERT INTO stock_movements (product_id, type, quantity, reference_type, reference_id, partner_id, note) VALUES (?, ?, ?, ?, ?, ?, ?)', [it.product_id, 'saida', it.quantity, 'pos_sale', saleId, client_id || null, null]);
    }

    await conn.query('UPDATE pos_sales SET total = ? WHERE id = ?', [total, saleId]);
    await conn.commit();
    res.status(201).json({ id: saleId, total, message: 'Venda registrada' });
  } catch (err) {
    await conn.rollback();
    res.status(500).json({ error: err.message });
  } finally {
    conn.release();
  }
}

module.exports = { createSale };
