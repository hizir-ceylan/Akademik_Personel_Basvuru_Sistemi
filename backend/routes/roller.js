const express = require('express');
const router = express.Router();
const pool = require('../db');

// GET: Tüm rolleri getir
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM roller ORDER BY id ASC');
    res.status(200).json(result.rows);
  } catch (err) {
    console.error('Rol çekme hatası:', err.message);
    res.status(500).json({ message: 'Sunucu hatası' });
  }
});

// POST: Yeni rol ekle
router.post('/', async (req, res) => {
  const { rol_adi } = req.body;

  if (!rol_adi || rol_adi.trim() === '') {
    return res.status(400).json({ message: 'Rol adı boş olamaz.' });
  }

  try {
    const result = await pool.query(
      'INSERT INTO roller (rol_adi) VALUES ($1) RETURNING *',
      [rol_adi.trim()]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Rol ekleme hatası:', err.message);
    res.status(500).json({ message: 'Sunucu hatası' });
  }
});

// PUT: Rol güncelle
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { rol_adi } = req.body;

  if (!rol_adi || rol_adi.trim() === '') {
    return res.status(400).json({ message: 'Rol adı boş olamaz.' });
  }

  try {
    const result = await pool.query(
      'UPDATE roller SET rol_adi = $1 WHERE id = $2 RETURNING *',
      [rol_adi.trim(), id]
    );
    res.status(200).json(result.rows[0]);
  } catch (err) {
    console.error('Rol güncelleme hatası:', err.message);
    res.status(500).json({ message: 'Sunucu hatası' });
  }
});

// DELETE: Rol sil
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    await pool.query('DELETE FROM roller WHERE id = $1', [id]);
    res.status(200).json({ message: 'Rol silindi' });
  } catch (err) {
    console.error('Rol silme hatası:', err.message);
    res.status(500).json({ message: 'Sunucu hatası' });
  }
});

module.exports = router;
