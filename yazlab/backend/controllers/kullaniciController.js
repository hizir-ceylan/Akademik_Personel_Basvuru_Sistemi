const pool = require('../db');

exports.getKullaniciById = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('SELECT ad_soyad FROM kullanicilar WHERE id = $1', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Kullanıcı bulunamadı' });
    }
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Kullanıcı bilgisi çekilemedi:', error);
    res.status(500).json({ error: 'Sunucu hatası' });
  }
};
