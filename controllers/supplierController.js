// controllers/supplierController.js
const supplierModel = require('../models/supplierModel');

async function listSuppliers(req, res) {
  try {
    const suppliers = await supplierModel.getAll();
    res.json({ suppliers });
  } catch (err) {
    console.error('listSuppliers error:', err);
    res.status(500).json({ error: 'Erro ao listar fornecedores' });
  }
}

async function getSupplier(req, res) {
  try {
    const id = req.params.id;
    const supplier = await supplierModel.getById(id);
    if (!supplier) return res.status(404).json({ error: 'Fornecedor não encontrado' });
    res.json({ supplier });
  } catch (err) {
    console.error('getSupplier error:', err);
    res.status(500).json({ error: 'Erro ao buscar fornecedor' });
  }
}

async function createSupplier(req, res) {
  try {
    const { name, cnpj, phone, address } = req.body;
    if (!name) return res.status(400).json({ error: 'Campo name é obrigatório' });
    const result = await supplierModel.create({ name, cnpj, phone, address });
    res.status(201).json({ id: result.insertId, message: 'Fornecedor criado com sucesso' });
  } catch (err) {
    console.error('createSupplier error:', err);
    res.status(500).json({ error: 'Erro ao criar fornecedor' });
  }
}

async function updateSupplier(req, res) {
  try {
    const id = req.params.id;
    const { name, cnpj, phone, address } = req.body;
    const result = await supplierModel.update(id, { name, cnpj, phone, address });
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Fornecedor não encontrado' });
    res.json({ message: 'Fornecedor atualizado com sucesso' });
  } catch (err) {
    console.error('updateSupplier error:', err);
    res.status(500).json({ error: 'Erro ao atualizar fornecedor' });
  }
}

async function deleteSupplier(req, res) {
  try {
    const id = req.params.id;
    const result = await supplierModel.remove(id);
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Fornecedor não encontrado' });
    res.json({ message: 'Fornecedor removido com sucesso' });
  } catch (err) {
    console.error('deleteSupplier error:', err);
    res.status(500).json({ error: 'Erro ao remover fornecedor' });
  }
}

module.exports = { listSuppliers, getSupplier, createSupplier, updateSupplier, deleteSupplier };
