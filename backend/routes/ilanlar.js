const express = require('express');
const router = express.Router();
const pool = require('../db');

// GET: Tüm ilanları getir
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM ilanlar ORDER BY id DESC');
    res.status(200).json(result.rows);
  } catch (err) {
    console.error('İlan çekme hatası:', err.message);
    res.status(500).json({ message: 'Sunucu hatası' });
  }
});

// GET: Belirli bir ilana ait başvuruları getir
router.get('/:id/basvurular', async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query(`
      SELECT 
        b.aday_id, 
        k.ad, 
        k.soyad, 
        b.basvuru_tarihi 
      FROM basvurular b
      JOIN kullanicilar k ON b.aday_id = k.id
      WHERE b.ilan_id = $1
      ORDER BY b.basvuru_tarihi DESC
    `, [id]);

    res.status(200).json(result.rows);
  } catch (err) {
    console.error("Başvuru çekme hatası:", err.message);
    res.status(500).json({ message: "Sunucu hatası" });
  }
});

// POST: Yeni ilan ekle
router.post('/', async (req, res) => {
  try {
    const { baslik, kadro_turu, fakulte, baslangic_tarihi, bitis_tarihi, created_by } = req.body;

    const result = await pool.query(
      `INSERT INTO ilanlar 
       (baslik, kadro_turu, fakulte, baslangic_tarihi, bitis_tarihi, created_by) 
       VALUES ($1, $2, $3, $4, $5, $6) 
       RETURNING *`,
      [baslik, kadro_turu, fakulte, baslangic_tarihi, bitis_tarihi, created_by]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('İlan ekleme hatası:', err.message);
    res.status(500).json({ message: 'Sunucu hatası' });
  }
});

// DELETE: İlan sil
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    await pool.query('DELETE FROM ilanlar WHERE id = $1', [id]);
    res.status(200).json({ message: 'İlan silindi' });
  } catch (err) {
    console.error('İlan silme hatası:', err.message);
    res.status(500).json({ message: 'Sunucu hatası' });
  }
});

// PUT: İlan güncelle
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { baslik, kadro_turu, fakulte, baslangic_tarihi, bitis_tarihi } = req.body;

  try {
    const result = await pool.query(
      `UPDATE ilanlar 
       SET baslik = $1, kadro_turu = $2, fakulte = $3, baslangic_tarihi = $4, bitis_tarihi = $5 
       WHERE id = $6 
       RETURNING *`,
      [baslik, kadro_turu, fakulte, baslangic_tarihi, bitis_tarihi, id]
    );

    res.status(200).json(result.rows[0]);
  } catch (err) {
    console.error('İlan güncelleme hatası:', err.message);
    res.status(500).json({ message: 'Sunucu hatası' });
  }
});

module.exports = router;
