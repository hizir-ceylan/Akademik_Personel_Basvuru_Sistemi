const pool = require('../db');

exports.getIlanlar = async (req, res) => {
  try {
    const result = await pool.query('SELECT id, baslik FROM ilanlar ORDER BY baslik');
    res.json(result.rows);
  } catch (error) {
    console.error('İlanlar çekilemedi:', error);
    res.status(500).json({ error: 'Sunucu hatası' });
  }
};

exports.getJuriUyeleri = async (req, res) => {
  try {
    const result = await pool.query('SELECT id, ad_soyad FROM kullanicilar WHERE rol_id = 4 ORDER BY ad_soyad');
    res.json(result.rows);
  } catch (error) {
    console.error('Jüri üyeleri çekilemedi:', error);
    res.status(500).json({ error: 'Sunucu hatası' });
  }
};

exports.getAtananJuriler = async (req, res) => {
  const { ilanId } = req.params;
  try {
    const result = await pool.query(`
      SELECT k.id, k.ad_soyad
      FROM juri_atamalar ja
      JOIN kullanicilar k ON ja.juri_id = k.id
      WHERE ja.ilan_id = $1
    `, [ilanId]);
    res.json(result.rows);
  } catch (error) {
    console.error('Atanan jüri üyeleri çekilemedi:', error);
    res.status(500).json({ error: 'Sunucu hatası' });
  }
};

exports.ataJuri = async (req, res) => {
  const { ilanId, juriId } = req.body;
  try {
    const check = await pool.query('SELECT * FROM juri_atamalar WHERE ilan_id = $1 AND juri_id = $2', [ilanId, juriId]);
    if (check.rows.length > 0) {
      return res.status(400).json({ error: 'Bu jüri zaten bu ilana atanmış.' });
    }

    await pool.query('INSERT INTO juri_atamalar (ilan_id, juri_id) VALUES ($1, $2)', [ilanId, juriId]);
    res.json({ message: 'Jüri başarıyla atandı.' });
  } catch (error) {
    console.error('Jüri atama hatası:', error);
    res.status(500).json({ error: 'Sunucu hatası' });
  }
};

exports.silJuriAtama = async (req, res) => {
    const { ilanId, juriId } = req.params;
    try {
      await pool.query('DELETE FROM juri_atamalar WHERE ilan_id = $1 AND juri_id = $2', [ilanId, juriId]);
      res.json({ message: 'Jüri ataması silindi.' });
    } catch (error) {
      console.error('Jüri atama silme hatası:', error);
      res.status(500).json({ error: 'Sunucu hatası' });
    }
  };
  
