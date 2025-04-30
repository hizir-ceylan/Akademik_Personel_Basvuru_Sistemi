const pool = require('../db');

const getAdaylar = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM adaylar');
    res.json(result.rows);
  } catch (error) {
    console.error('Adaylar alınırken hata oluştu:', error);
    res.status(500).json({ error: 'Sunucu hatası' });
  }
};

module.exports = { getAdaylar };
