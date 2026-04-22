const { pool } = require('../config/db');

async function sendNotification(req, res) {
  const { type, message, sent_to } = req.body;
  const [result] = await pool.query(
    'INSERT INTO notifications_log (type, message, sent_to) VALUES (?, ?, ?)',
    [type, message, sent_to]
  );
  // Aqui você poderia integrar com e-mail/SMS/WhatsApp
  res.status(201).json({ id: result.insertId, message: 'Notificação registrada' });
}

module.exports = { sendNotification };
