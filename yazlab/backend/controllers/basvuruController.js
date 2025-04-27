const pool = require('../db');

exports.getBasvurular = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT 
        basvurular.id,
        kullanicilar.ad_soyad,
        ilanlar.baslik,
        basvurular.basvuru_tarihi,
        basvurular.durum
      FROM basvurular
      JOIN kullanicilar ON basvurular.aday_id = kullanicilar.id
      JOIN ilanlar ON basvurular.ilan_id = ilanlar.id
      ORDER BY basvurular.basvuru_tarihi DESC
    `);
    res.json(result.rows);
  } catch (err) {
    console.error('Başvurular çekilemedi:', err);
    res.status(500).json({ error: 'Sunucu hatası' });
  }
};
exports.getBasvuruById = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(`
      SELECT 
        basvurular.id,
        kullanicilar.ad_soyad,
        ilanlar.baslik,
        basvurular.basvuru_tarihi,
        basvurular.durum
      FROM basvurular
      JOIN kullanicilar ON basvurular.aday_id = kullanicilar.id
      JOIN ilanlar ON basvurular.ilan_id = ilanlar.id
      WHERE basvurular.id = $1
    `, [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Başvuru bulunamadı' });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error('Başvuru çekilemedi:', err);
    res.status(500).json({ error: 'Sunucu hatası' });
  }
};
