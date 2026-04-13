// controllers/clientController.js
const clientModel = require('../models/clientModel');

async function listClients(req, res) {
  try {
    const clients = await clientModel.getAll();
    res.json({ clients });
  } catch (err) {
    console.error('listClients error:', err);
    res.status(500).json({ error: 'Erro ao listar clientes' });
  }
}

async function getClient(req, res) {
  try {
    const id = req.params.id;
    const client = await clientModel.getById(id);
    if (!client) return res.status(404).json({ error: 'Cliente não encontrado' });
    res.json({ client });
  } catch (err) {
    console.error('getClient error:', err);
    res.status(500).json({ error: 'Erro ao buscar cliente' });
  }
}

async function createClient(req, res) {
  try {
    const { name, cpf_cnpj, phone, address } = req.body;
    if (!name) return res.status(400).json({ error: 'Campo name é obrigatório' });
    const result = await clientModel.create({ name, cpf_cnpj, phone, address });
    res.status(201).json({ id: result.insertId, message: 'Cliente criado com sucesso' });
  } catch (err) {
    console.error('createClient error:', err);
    res.status(500).json({ error: 'Erro ao criar cliente' });
  }
}

async function updateClient(req, res) {
  try {
    const id = req.params.id;
    const { name, cpf_cnpj, phone, address } = req.body;
    const result = await clientModel.update(id, { name, cpf_cnpj, phone, address });
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Cliente não encontrado' });
    res.json({ message: 'Cliente atualizado com sucesso' });
  } catch (err) {
    console.error('updateClient error:', err);
    res.status(500).json({ error: 'Erro ao atualizar cliente' });
  }
}

async function deleteClient(req, res) {
  try {
    const id = req.params.id;
    const result = await clientModel.remove(id);
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Cliente não encontrado' });
    res.json({ message: 'Cliente removido com sucesso' });
  } catch (err) {
    console.error('deleteClient error:', err);
    res.status(500).json({ error: 'Erro ao remover cliente' });
  }
}

module.exports = { listClients, getClient, createClient, updateClient, deleteClient };
