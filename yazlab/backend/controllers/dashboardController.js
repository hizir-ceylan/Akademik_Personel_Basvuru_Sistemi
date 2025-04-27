const pool = require('../db');

exports.getDashboardStats = async (req, res) => {
  try {
    const aktifIlanlar = await pool.query(`
      SELECT COUNT(*) FROM ilanlar 
      WHERE baslangic_tarihi <= CURRENT_DATE AND bitis_tarihi >= CURRENT_DATE
    `);

    const bekleyenBasvurular = await pool.query(`
      SELECT COUNT(*) FROM basvurular 
      WHERE durum = 'Beklemede'
    `);

    const toplamJuriUyeleri = await pool.query(`
      SELECT COUNT(*) FROM kullanicilar 
      WHERE rol_id = 3 -- rol_id=3 jüri olarak varsayıyoruz
    `);

    const kapanmakUzereOlanIlanlar = await pool.query(`
      SELECT COUNT(*) FROM ilanlar 
      WHERE bitis_tarihi BETWEEN CURRENT_DATE AND CURRENT_DATE + INTERVAL '7 days'
    `);

    res.json({
      aktifIlanlar: aktifIlanlar.rows[0].count,
      bekleyenBasvurular: bekleyenBasvurular.rows[0].count,
      toplamJuriUyeleri: toplamJuriUyeleri.rows[0].count,
      kapanmakUzereOlanIlanlar: kapanmakUzereOlanIlanlar.rows[0].count,
    });
  } catch (error) {
    console.error('Dashboard verileri çekilemedi:', error);
    res.status(500).json({ error: 'Sunucu hatası' });
  }
};
