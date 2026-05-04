const db = require("../config/db");

// Controller para relatório consolidado de estoque
exports.getStockReport = async (req, res) => {
  try {
    // Produtos básicos
    const produtos = await db.query("SELECT * FROM products");

    // Inventário atual
    const inventario = await db.query(`
      SELECT produto_id, SUM(quantidade) as saldo
      FROM stock_inventory
      GROUP BY produto_id
    `);

    // Movimentações
    const movimentos = await db.query(`
      SELECT produto_id,
             SUM(CASE WHEN tipo = 'entrada' THEN quantidade ELSE 0 END) as entradas,
             SUM(CASE WHEN tipo = 'saida' THEN quantidade ELSE 0 END) as saidas,
             SUM(CASE WHEN tipo = 'ajuste' THEN quantidade ELSE 0 END) as ajustes
      FROM stock_movements
      GROUP BY produto_id
    `);

    // Consolidação
    const resultado = produtos.rows.map(p => {
      const inv = inventario.rows.find(i => i.produto_id === p.id) || {};
      const mov = movimentos.rows.find(m => m.produto_id === p.id) || {};
      return {
        id: p.id,
        name: p.name,
        category: p.category,
        price: p.price,
        cost: p.cost,
        stock: inv.saldo || p.stock,
        min_stock: p.min_stock,
        entradas: mov.entradas || 0,
        saidas: mov.saidas || 0,
        ajustes: mov.ajustes || 0
      };
    });

    res.json(resultado);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao gerar relatório de estoque" });
  }
};
