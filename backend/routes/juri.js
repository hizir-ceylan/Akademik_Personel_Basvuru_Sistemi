const express = require("express");
const router = express.Router();
const pool = require("../db");

router.get("/juri-ilanlari", async (req, res) => {
  const juriId = req.query.juri_id;

  try {
    const result = await pool.query(
      `SELECT DISTINCT i.id AS ilan_id, i.baslik
       FROM juri_atamalar j
       JOIN ilanlar i ON i.id = j.ilan_id
       WHERE j.juri_id = $1`,
      [juriId]
    );

    res.json(result.rows);
  } catch (err) {
    console.error("❌ Jüri ilanları hatası:", err);
    res.status(500).json({ error: "Sunucu hatası" });
  }
});

router.get("/ilan-basvurulari", async (req, res) => {
  const ilanId = req.query.ilan_id;

  if (!ilanId) {
    return res.status(400).json({ error: "İlan ID eksik" });
  }

  try {
    const result = await pool.query(
      `SELECT b.id AS basvuru_id, 
              COALESCE(k.ad || ' ' || k.soyad, 'Bilinmeyen Aday') AS aday_adi
       FROM basvurular b
       JOIN kullanicilar k ON k.id = b.aday_id
       WHERE b.ilan_id = $1`,
      [ilanId]
    );

    res.json(result.rows);
  } catch (err) {
    console.error("❌ Başvuru listesi hatası:", err);
    res.status(500).json({ error: "Sunucu hatası" });
  }
});

router.get("/juri-bilgisi", async (req, res) => {
  const juriId = req.query.juri_id;

  try {
    const result = await pool.query(
      `SELECT ad, soyad FROM kullanicilar WHERE id = $1 AND rol_id = 4`,
      [juriId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Jüri bulunamadı" });
    }

    const { ad, soyad } = result.rows[0];
    res.json({ ad_soyad: `${ad} ${soyad}` });
  } catch (err) {
    console.error("❌ Jüri bilgisi hatası:", err);
    res.status(500).json({ error: "Sunucu hatası" });
  }
});

module.exports = router;
