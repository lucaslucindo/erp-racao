/**
 * @swagger
 * tags:
 *   name: Suppliers
 *   description: Rotas de fornecedores
 */

/**
 * @swagger
 * /suppliers:
 *   get:
 *     summary: Listar fornecedores
 *     tags: [Suppliers]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de fornecedores
 *
 *   post:
 *     summary: Criar fornecedor
 *     tags: [Suppliers]
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
 *             properties:
 *               name:
 *                 type: string
 *               cnpj:
 *                 type: string
 *               phone:
 *                 type: string
 *               address:
 *                 type: string
 *     responses:
 *       201:
 *         description: Fornecedor criado
 */

/**
 * @swagger
 * /suppliers/{id}:
 *   get:
 *     summary: Obter fornecedor por id
 *     tags: [Suppliers]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Fornecedor encontrado
 *       404:
 *         description: Não encontrado
 *
 *   put:
 *     summary: Atualizar fornecedor
 *     tags: [Suppliers]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               cnpj:
 *                 type: string
 *               phone:
 *                 type: string
 *               address:
 *                 type: string
 *     responses:
 *       200:
 *         description: Atualizado
 *
 *   delete:
 *     summary: Remover fornecedor
 *     tags: [Suppliers]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Removido
 */

const express = require('express');
const router = express.Router();
const supplierController = require('../controllers/supplierController');
const { ensureAuthenticated } = require('../middlewares/authMiddleware');

router.get('/', ensureAuthenticated, supplierController.listSuppliers);
router.post('/', ensureAuthenticated, supplierController.createSupplier);
router.get('/:id', ensureAuthenticated, supplierController.getSupplier);
router.put('/:id', ensureAuthenticated, supplierController.updateSupplier);
router.delete('/:id', ensureAuthenticated, supplierController.deleteSupplier);

module.exports = router;
