const pool = require('../db');

exports.getKriterler = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT kd.*, ka.ad AS kadro_alani_ad
      FROM kriter_detaylari kd
      LEFT JOIN kadro_alanlari ka ON kd.kadro_alan_id = ka.id
      ORDER BY kadro_turu, sira_no
    `);
    res.json(result.rows);
  } catch (err) {
    console.error('Kriterler çekilemedi:', err);
    res.status(500).json({ error: 'Sunucu hatası' });
  }
};

exports.getKriterlerByKadroTuru = async (req, res) => {
  const { kadroTuru } = req.params;

  try {
    const result = await pool.query(
      `SELECT * FROM kriter_detaylari
       WHERE kadro_turu = $1 AND kriter_seti_id = 1 AND aktif_mi = true
       ORDER BY sıra_no ASC`,
      [decodeURIComponent(kadroTuru)]
    );

    res.json(result.rows);
  } catch (err) {
    console.error("Kriterler alınamadı:", err);
    res.status(500).json({ message: "Kriterler alınamadı." });
  }
};

exports.getKriterlerByIlanId = async (req, res) => {
  const { ilanId } = req.params;

  try {
    const ilanResult = await pool.query(
      `SELECT kadro_turu FROM ilanlar WHERE id = $1`,
      [ilanId]
    );

    if (ilanResult.rowCount === 0) {
      return res.status(404).json({ message: 'İlan bulunamadı' });
    }

    const kadroTuru = ilanResult.rows[0].kadro_turu;

    const kriterResult = await pool.query(
      `SELECT * FROM kriter_detaylari
       WHERE kadro_turu = $1 AND kriter_seti_id = 1 AND aktif_mi = true
       ORDER BY sira_no ASC`,
      [kadroTuru]
    );

    res.json(kriterResult.rows);
  } catch (err) {
    console.error("Kriterler alınamadı:", err);
    res.status(500).json({ message: "Kriterler alınamadı." });
  }
};

exports.createKriter = async (req, res) => {
  const {
    kriter_seti_id = 1,
    kadro_turu,
    faaliyet_referans,
    sart_tipi,
    deger,
    aciklama
  } = req.body;

  try {
    const result = await pool.query(`
      INSERT INTO kriter_detaylari (
        kriter_seti_id,
        kadro_turu,
        faaliyet_referans,
        sart_tipi,
        deger,
        aciklama
      ) VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *
    `, [
      kriter_seti_id,
      kadro_turu,
      faaliyet_referans,
      sart_tipi,
      deger === '' ? null : parseInt(deger),
      aciklama || null
    ]);

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error("Kriter ekleme hatası:", error);
    res.status(500).json({ error: "Sunucu hatası" });
  }
};


exports.deleteKriter = async (req, res) => {
  const { id } = req.params;

  try {
    await pool.query('DELETE FROM kriter_detaylari WHERE id = $1', [id]);
    res.json({ message: 'Kriter başarıyla silindi.' });
  } catch (error) {
    console.error('Kriter silme hatası:', error);
    res.status(500).json({ error: 'Sunucu hatası' });
  }
};

exports.updateKriter = async (req, res) => {
  const { id } = req.params;
  const {
    kadro_alan_id,
    kadro_turu,
    faaliyet_referans,
    sart_tipi,
    deger,
    aciklama,
    sira_no
  } = req.body;

  try {
    await pool.query(`
      UPDATE kriter_detaylari
      SET kadro_alan_id = $1, kadro_turu = $2, faaliyet_referans = $3,
          sart_tipi = $4, deger = $5, aciklama = $6, sira_no = $7
      WHERE id = $8
    `, [kadro_alan_id, kadro_turu, faaliyet_referans, sart_tipi, deger, aciklama, sira_no, id]);

    res.json({ message: 'Kriter güncellendi.' });
  } catch (err) {
    console.error('Kriter güncelleme hatası:', err);
    res.status(500).json({ error: 'Sunucu hatası' });
  }
};
