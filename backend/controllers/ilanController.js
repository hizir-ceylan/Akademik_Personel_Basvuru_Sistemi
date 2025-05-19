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

exports.getAktifIlanlar = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT * FROM ilanlar
      WHERE bitis_tarihi >= CURRENT_DATE
      ORDER BY baslangic_tarihi DESC
    `);

    res.json(result.rows);
  } catch (error) {
    console.error('Aktif ilanlar çekilemedi:', error);
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

exports.getIlanById = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('SELECT * FROM ilanlar WHERE id = $1', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: "İlan bulunamadı." });
    }
    res.json(result.rows[0]);
  } catch (error) {
    console.error("İlan getirilemedi:", error);
    res.status(500).json({ message: "Sunucu hatası" });
  }
};