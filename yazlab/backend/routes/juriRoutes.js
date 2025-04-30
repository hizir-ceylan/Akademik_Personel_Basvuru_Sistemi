const express = require("express");
const router = express.Router();
const pool = require("../db");

// ✅ Jüriye atanan ilanları getir
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

// ✅ Belirli ilana yapılan başvuruları getir
router.get("/ilan-basvurulari", async (req, res) => {
  const ilanId = req.query.ilan_id;

  try {
    const result = await pool.query(
      `SELECT b.id AS basvuru_id, k.ad_soyad AS aday_adi
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

module.exports = router;
