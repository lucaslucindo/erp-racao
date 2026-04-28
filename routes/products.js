/**
 * @swagger
 * tags:
 *   name: Products
 *   description: Rotas de produtos
 */

/**
 * @swagger
 * /products:
 *   post:
 *     summary: Criar um novo produto
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - cost
 *               - price
 *             properties:
 *               name:
 *                 type: string
 *               category:
 *                 type: string
 *               cost:
 *                 type: number
 *                 format: float
 *               price:
 *                 type: number
 *                 format: float
 *               stock:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Produto criado com sucesso
 *       400:
 *         description: Dados inválidos
 *       401:
 *         description: Token ausente ou inválido
 */

/**
 * @swagger
 * /products:
 *   get:
 *     summary: Listar produtos com paginação
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Lista paginada de produtos
 */

// const express = require('express');
// const router = express.Router();
// const productController = require('../controllers/productController');
// const { ensureAuthenticated } = require('../middlewares/authMiddleware');

// router.get('/', ensureAuthenticated, productController.listProducts);
// router.post('/', ensureAuthenticated, productController.createProduct);

// module.exports = router;

const express = require('express');
const router = express.Router();
const { pool } = require('../config/db');

// Listar todos os produtos
router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM products');
    res.json({ products: rows });
  } catch (err) {
    res.status(500).json({ error: 'Erro ao buscar produtos' });
  }
});

// Criar produto
router.post('/', async (req, res) => {
  const { name, category, cost, price, stock, min_stock } = req.body;
  try {
    const [result] = await pool.query(
      'INSERT INTO products (name, category, cost, price, stock, min_stock, created_at) VALUES (?, ?, ?, ?, ?, ?, NOW())',
      [name, category, cost, price, stock, min_stock]
    );
    res.status(201).json({ id: result.insertId, message: 'Produto criado com sucesso' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao criar produto' });
  }
});

// Atualizar produto
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { name, price, stock } = req.body;
  try {
    await pool.query('UPDATE products SET name=?, price=?, stock=? WHERE id=?', [name, price, stock, id]);
    res.json({ message: 'Produto atualizado com sucesso' });
  } catch (err) {
    res.status(500).json({ error: 'Erro ao atualizar produto' });
  }
});

// Deletar produto
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query('DELETE FROM products WHERE id=?', [id]);
    res.json({ message: 'Produto deletado com sucesso' });
  } catch (err) {
    res.status(500).json({ error: 'Erro ao deletar produto' });
  }
});

module.exports = router;