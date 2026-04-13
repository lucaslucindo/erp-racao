// controllers/stockController.js
const stockModel = require('../models/stockModel');

async function createEntry(req, res) {
  try {
    const { product_id, quantity, reference_type, reference_id, partner_id, note } = req.body;
    if (!product_id || !quantity || quantity <= 0) {
      return res.status(400).json({ error: 'product_id e quantity (>0) são obrigatórios' });
    }
    const result = await stockModel.createMovementAndUpdateStock({
      product_id,
      type: 'entrada',
      quantity: Number(quantity),
      reference_type: reference_type || 'purchase',
      reference_id: reference_id || null,
      partner_id: partner_id || null,
      note: note || null
    });
    return res.status(201).json({ id: result.movementId, newStock: result.newStock, message: 'Entrada registrada' });
  } catch (err) {
    console.error('createEntry error:', err.message);
    return res.status(500).json({ error: err.message || 'Erro ao registrar entrada' });
  }
}

async function createExit(req, res) {
  try {
    const { product_id, quantity, reference_type, reference_id, partner_id, note } = req.body;
    if (!product_id || !quantity || quantity <= 0) {
      return res.status(400).json({ error: 'product_id e quantity (>0) são obrigatórios' });
    }
    const result = await stockModel.createMovementAndUpdateStock({
      product_id,
      type: 'saida',
      quantity: Number(quantity),
      reference_type: reference_type || 'sale',
      reference_id: reference_id || null,
      partner_id: partner_id || null,
      note: note || null
    });
    return res.status(201).json({ id: result.movementId, newStock: result.newStock, message: 'Saída registrada' });
  } catch (err) {
    console.error('createExit error:', err.message);
    if (err.message === 'Estoque insuficiente') {
      return res.status(400).json({ error: 'Estoque insuficiente' });
    }
    return res.status(500).json({ error: err.message || 'Erro ao registrar saída' });
  }
}

async function getMovements(req, res) {
  try {
    const { product_id, limit = 100, offset = 0 } = req.query;
    const rows = await stockModel.listMovements({ product_id: product_id ? Number(product_id) : null, limit, offset });
    return res.json({ movements: rows });
  } catch (err) {
    console.error('getMovements error:', err);
    return res.status(500).json({ error: 'Erro ao listar movimentações' });
  }
}

async function getInventory(req, res) {
  try {
    const inv = await stockModel.getInventory();
    return res.json({ inventory: inv });
  } catch (err) {
    console.error('getInventory error:', err);
    return res.status(500).json({ error: 'Erro ao obter inventário' });
  }
}

module.exports = {
  createEntry,
  createExit,
  getMovements,
  getInventory
};
