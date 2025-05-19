const express = require('express');
const router = express.Router();
const pool = require('../db');

router.get('/istatistikler', async (req, res) => {
  try {
    const ilanlar = await pool.query('SELECT COUNT(*) FROM ilanlar');
    const basvurular = await pool.query('SELECT COUNT(*) FROM basvurular');
    const kullanicilar = await pool.query('SELECT COUNT(*) FROM kullanicilar');

    res.json({
      ilan_sayisi: parseInt(ilanlar.rows[0].count),
      basvuru_sayisi: parseInt(basvurular.rows[0].count),
      kullanici_sayisi: parseInt(kullanicilar.rows[0].count)
    });
  } catch (err) {
    console.error('İstatistik çekme hatası:', err.message);
    res.status(500).json({ message: 'Sunucu hatası' });
  }
});

module.exports = router;
