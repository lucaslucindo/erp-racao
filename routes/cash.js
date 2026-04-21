/**
 * @swagger
 * tags:
 *   name: Cash
 *   description: Controle de caixa
 */

/**
 * @swagger
 * /cash/open:
 *   post:
 *     summary: Abrir caixa
 *     tags: [Cash]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               initial_balance:
 *                 type: number
 *     responses:
 *       201:
 *         description: Caixa aberto
 */

const express = require('express');
const router = express.Router();
const { openCash, closeCash, addMovement } = require('../controllers/cashController');
const { ensureAuthenticated } = require('../middlewares/authMiddleware');

router.post('/open', ensureAuthenticated, openCash);
router.post('/:id/close', ensureAuthenticated, closeCash);
router.post('/movement', ensureAuthenticated, addMovement);

module.exports = router;