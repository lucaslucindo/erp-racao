/**
 * @swagger
 * tags:
 *   name: POS
 *   description: Ponto de venda
 */

/**
 * @swagger
 * /pos/sale:
 *   post:
 *     summary: Registrar venda rápida (PDV)
 *     tags: [POS]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               client_id:
 *                 type: integer
 *               items:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     product_id:
 *                       type: integer
 *                     quantity:
 *                       type: integer
 *                     unit_price:
 *                       type: number
 *     responses:
 *       201:
 *         description: Venda registrada
 */

const express = require('express');
const router = express.Router();
const { createSale } = require('../controllers/posController');
const { ensureAuthenticated } = require('../middlewares/authMiddleware');

router.post('/sale', ensureAuthenticated, createSale);

module.exports = router;