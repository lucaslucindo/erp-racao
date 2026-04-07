// middlewares/authMiddleware.js

// Exemplo de middleware simples que pode ser usado depois
function ensureAuthenticated(req, res, next) {
  // Na Etapa 6 vamos verificar o token JWT aqui
  // Por enquanto, apenas segue adiante (não seguro)
  next();
}

module.exports = {
  ensureAuthenticated
};
