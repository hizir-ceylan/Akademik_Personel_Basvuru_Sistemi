const pool = require('../db');

exports.getKullaniciById = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query(
      'SELECT ad, soyad FROM kullanicilar WHERE id = $1',
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Kullanıcı bulunamadı' });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error('Kullanıcı bilgisi çekme hatası:', err);
    res.status(500).json({ message: 'Sunucu hatası' });
  }
};