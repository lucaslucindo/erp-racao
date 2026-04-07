// routes/users.js
const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');

// GET /api/users  -> lista (exemplo)
router.get('/', usersController.listUsers);

// rota de exemplo para criar usuário (será implementada na fase de autenticação)
router.post('/', usersController.createUser);

module.exports = router;
