const express = require('express');
const router = express.Router();
const pool = require('../db');

// Tüm kullanıcıları getir
router.get('/', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT id, ad, soyad, email, rol_id FROM kullanicilar ORDER BY id
    `);
    res.json(result.rows);
  } catch (err) {
    console.error('Kullanıcı çekme hatası:', err.message);
    res.status(500).json({ message: 'Sunucu hatası' });
  }
});

// Kullanıcının rolünü güncelle
router.put('/:id/rol', async (req, res) => {
  const { id } = req.params;
  const { rol_id } = req.body;
  try {
    const result = await pool.query(
      'UPDATE kullanicilar SET rol_id = $1 WHERE id = $2 RETURNING *',
      [rol_id, id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Rol güncelleme hatası:', err.message);
    res.status(500).json({ message: 'Sunucu hatası' });
  }
});

// Kullanıcı sil
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
      await pool.query('DELETE FROM kullanicilar WHERE id = $1', [id]);
      res.status(200).json({ message: 'Kullanıcı silindi.' });
    } catch (err) {
      console.error('Kullanıcı silme hatası:', err.message); // Bu satır terminalde detay verir
      res.status(500).json({ message: 'Sunucu hatası' });
    }
  });  

module.exports = router;
