const pool = require('../db');

exports.getIlanlar = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM ilanlar ORDER BY baslangic_tarihi DESC');
    res.json(result.rows);
  } catch (error) {
    console.error('İlanlar çekilemedi:', error);
    res.status(500).json({ error: 'Sunucu hatası' });
  }
};

exports.createIlan = async (req, res) => {
  const { baslik, kadro_turu, fakulte, baslangic_tarihi, bitis_tarihi, created_by, kullanici_rol } = req.body;

  if (kullanici_rol !== 'admin') {
    return res.status(403).json({ error: 'Sadece admin kullanıcı ilan oluşturabilir.' });
  }

  try {
    await pool.query(`
      INSERT INTO ilanlar (baslik, kadro_turu, fakulte, baslangic_tarihi, bitis_tarihi, created_by)
      VALUES ($1, $2, $3, $4, $5, $6)
    `, [baslik, kadro_turu, fakulte, baslangic_tarihi, bitis_tarihi, created_by]);
    res.json({ message: 'İlan başarıyla oluşturuldu.' });
  } catch (error) {
    console.error('İlan oluşturulamadı:', error);
    res.status(500).json({ error: 'Sunucu hatası' });
  }
};
