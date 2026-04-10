/**
 * @swagger
 * tags:
 *   name: Users
 *   description: Rotas de usuários (protegidas)
 */

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Listar usuários
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de usuários
 *       401:
 *         description: Token ausente ou inválido
 */

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Criar usuário
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               role:
 *                 type: string
 *     responses:
 *       201:
 *         description: Usuário criado com sucesso
 *       400:
 *         description: Dados inválidos
 *       409:
 *         description: Email já cadastrado
 */

// routes/users.js
const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');

// GET /api/users  -> lista (exemplo)
router.get('/', usersController.listUsers);

// rota de exemplo para criar usuário (será implementada na fase de autenticação)
router.post('/', usersController.createUser);

module.exports = router;
