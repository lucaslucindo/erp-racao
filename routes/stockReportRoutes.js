/**
 * @swagger
 * tags:
 *   name: Relatórios
 *   description: Rotas de relatórios consolidados de estoque
 */

/**
 * @swagger
 * /api/stock-report:
 *   get:
 *     summary: Relatório consolidado de estoque
 *     description: Retorna todos os produtos com dados de estoque atual, entradas, saídas e ajustes.
 *     tags: [Relatórios]
 *     responses:
 *       200:
 *         description: Lista de produtos com estoque e movimentações
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 1
 *                   name:
 *                     type: string
 *                     example: "Ração Premium"
 *                   category:
 *                     type: string
 *                     example: "Cachorro"
 *                   price:
 *                     type: number
 *                     example: 80.00
 *                   cost:
 *                     type: number
 *                     example: 50.00
 *                   stock:
 *                     type: integer
 *                     example: 200
 *                   min_stock:
 *                     type: integer
 *                     example: 5
 *                   entradas:
 *                     type: integer
 *                     example: 10
 *                   saidas:
 *                     type: integer
 *                     example: 4
 *                   ajustes:
 *                     type: integer
 *                     example: 1
 */

const express = require("express");
const router = express.Router();
const stockReportController = require("../controllers/stockReportController");

// Rota para relatório consolidado
router.get("/", stockReportController.getStockReport);

module.exports = router;