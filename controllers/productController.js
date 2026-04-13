const productModel = require('../models/productModel');

async function listProducts(req, res) {
  try {
    const products = await productModel.getAll();
    res.json({ products });
  } catch (err) {
    res.status(500).json({ error: 'Erro ao listar produtos' });
  }
}

async function createProduct(req, res) {
  const { name, category, cost, price, stock } = req.body;
  if (!name || !cost || !price) {
    return res.status(400).json({ error: 'Campos obrigatórios: name, cost, price' });
  }
  try {
    const result = await productModel.create({ name, category, cost, price, stock: stock || 0 });
    res.status(201).json({ id: result.insertId, message: 'Produto criado com sucesso' });
  } catch (err) {
    res.status(500).json({ error: 'Erro ao criar produto' });
  }
}

module.exports = { listProducts, createProduct };
