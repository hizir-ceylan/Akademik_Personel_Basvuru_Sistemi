const pool = require('../db');

exports.getKriterler = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM tablo_satirlari ORDER BY kategori, faaliyet_no');
    res.json(result.rows);
  } catch (error) {
    console.error('Kriterler çekilemedi:', error);
    res.status(500).json({ error: 'Sunucu hatası' });
  }
};

exports.updateKriterPuan = async (req, res) => {
  const { id } = req.params;
  const { puan } = req.body;

  try {
    const result = await pool.query('UPDATE tablo_satirlari SET puan = $1 WHERE id = $2 RETURNING *', [puan, id]);
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Kriter puanı güncellenemedi:', error);
    res.status(500).json({ error: 'Sunucu hatası' });
  }
};
