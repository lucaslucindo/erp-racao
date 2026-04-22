/**
 * @swagger
 * tags:
 *   name: Fiscal
 *   description: Integração fiscal (NF-e/NFC-e)
 */

/**
 * @swagger
 * /fiscal/nfe/emit:
 *   post:
 *     summary: Emitir NF-e
 *     tags: [Fiscal]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               sale_id:
 *                 type: integer
 *     responses:
 *       201:
 *         description: NF-e emitida
 */

/**
 * @swagger
 * /fiscal/nfe/{id}:
 *   get:
 *     summary: Consultar NF-e emitida
 *     tags: [Fiscal]
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
 *         description: Dados da NF-e
 */

const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../middlewares/authMiddleware');
const fiscalController = require('../controllers/fiscalController');

router.post('/nfe/emit', ensureAuthenticated, fiscalController.emitNfe);
router.get('/nfe/:id', ensureAuthenticated, fiscalController.getNfe);

module.exports = router;