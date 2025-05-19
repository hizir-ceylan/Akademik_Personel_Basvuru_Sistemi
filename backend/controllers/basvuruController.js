const pool = require('../db');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const fs = require('fs');

exports.getBasvurular = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT 
        basvurular.id,
        kullanicilar.ad || ' ' || kullanicilar.soyad AS ad_soyad,
        ilanlar.baslik,
        basvurular.basvuru_tarihi,
        basvurular.durum
      FROM basvurular
      JOIN kullanicilar ON basvurular.aday_id = kullanicilar.id
      JOIN ilanlar ON basvurular.ilan_id = ilanlar.id
      ORDER BY basvurular.basvuru_tarihi DESC
    `);    
    res.json(result.rows);
  } catch (err) {
    console.error('Başvurular çekilemedi:', err);
    res.status(500).json({ error: 'Sunucu hatası' });
  }
};

exports.getBasvuruById = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(`
      SELECT 
        basvurular.id,
        kullanicilar.ad || ' ' || kullanicilar.soyad AS ad_soyad,
        ilanlar.baslik,
        basvurular.basvuru_tarihi,
        basvurular.durum
      FROM basvurular
      JOIN kullanicilar ON basvurular.aday_id = kullanicilar.id
      JOIN ilanlar ON basvurular.ilan_id = ilanlar.id
      WHERE basvurular.id = $1
    `, [id]);    

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Başvuru bulunamadı' });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error('Başvuru çekilemedi:', err);
    res.status(500).json({ error: 'Sunucu hatası' });
  }
};

exports.getBasvuruSayisiByAdayId = async (req, res) => {
  const { adayId } = req.params;

  try {
    const result = await pool.query(
      `SELECT COUNT(*) FROM basvurular WHERE aday_id = $1`,
      [adayId]
    );

    res.json({ basvuruSayisi: parseInt(result.rows[0].count) });
  } catch (error) {
    console.error("Aday başvuru sayısı çekilemedi:", error);
    res.status(500).json({ error: "Sunucu hatası" });
  }
};

exports.updateBasvuruSonucu = async (req, res) => {
  const { id } = req.params;
  const { durum, aciklama } = req.body;

  try {
    await pool.query(
      `UPDATE basvurular SET durum = $1, sonuc_aciklama = $2 WHERE id = $3`,
      [durum, aciklama || null, id]
    );

    await pool.query(`
      INSERT INTO bildirimler (kullanici_id, icerik, okundu)
      SELECT aday_id, $1, false FROM basvurular WHERE id = $2
    `, [
      `Başvurunuz ${durum === 'kabul' ? 'KABUL EDİLDİ' : 'REDDEDİLDİ'}.`,
      id
    ]);

    res.json({ message: 'Başvuru sonucu başarıyla güncellendi.' });
  } catch (error) {
    console.error('Başvuru sonucu güncelleme hatası:', error);
    res.status(500).json({ error: 'Sunucu hatası' });
  }
};

exports.getBasvuruDetay = async (req, res) => {
  const { id } = req.params;
  try {
    const basvuru = await pool.query(`
      SELECT b.*, k.ad, k.soyad, i.baslik
      FROM basvurular b
      JOIN kullanicilar k ON b.aday_id = k.id
      JOIN ilanlar i ON b.ilan_id = i.id
      WHERE b.id = $1
    `, [id]);

    const belgeler = await pool.query(`
      SELECT 
        bb.*, 
        ts.kategori, 
        ts.faaliyet_no, 
        ts.faaliyet_aciklama
      FROM basvuru_belgeleri bb
      JOIN tablo_satirlari ts ON bb.tablo_satiri_id = ts.id
      WHERE bb.basvuru_id = $1
    `, [id]);

    const raporlar = await pool.query(`
      SELECT jr.*, k.ad, k.soyad
      FROM juri_raporlari jr
      JOIN kullanicilar k ON jr.juri_id = k.id
      WHERE jr.basvuru_id = $1
    `, [id]);

    res.json({
      basvuru: basvuru.rows[0],
      belgeler: belgeler.rows,
      raporlar: raporlar.rows
    });
  } catch (err) {
    console.error('Detay çekilemedi:', err);
    res.status(500).json({ error: 'Sunucu hatası' });
  }
};

exports.createBasvuru = async (req, res) => {
  const { aday_id, ilan_id } = req.body;
  const files = req.files;

  try {
    const result = await pool.query(
      `INSERT INTO basvurular (aday_id, ilan_id) VALUES ($1, $2) RETURNING id`,
      [aday_id, ilan_id]
    );

    const basvuruId = result.rows[0].id;

    const {
      kriter_ids = [],
      aday_aciklamalar = [],
      yazar_sayilari = [],
      baslica_yazar_mi = [],
      sorumlu_yazar_mi = [],
      es_katki_var_mi = [],
      derleme_makale_mi = [],
      universite_isbirligi_var_mi = []
    } = req.body;

    for (let i = 0; i < files.length; i++) {
      await pool.query(`
        INSERT INTO basvuru_belgeleri (
          basvuru_id, tablo_satiri_id, belge_url, aday_aciklama,
          yazar_sayisi, baslica_yazar_mi, sorumlu_yazar_mi,
          es_katki_var_mi, derleme_makale_mi, universite_isbirligi_var_mi
        ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)
      `, [
        basvuruId,
        parseInt(kriter_ids[i]),
        `/uploads/${files[i].filename}`,
        aday_aciklamalar[i],
        parseInt(yazar_sayilari[i]),
        baslica_yazar_mi[i] === 'true',
        sorumlu_yazar_mi[i] === 'true',
        es_katki_var_mi[i] === 'true',
        derleme_makale_mi[i] === 'true',
        universite_isbirligi_var_mi[i] === 'true'
      ]);
    }

    res.status(201).json({ message: "Başvuru oluşturuldu." });
  } catch (err) {
    console.error("Başvuru oluşturulamadı:", err);
    res.status(500).json({ error: "Sunucu hatası" });
  }
};

exports.yeniBasvuru = async (req, res) => {
  try {
    const { aday_id, ilan_id } = req.body;
    const belgeler = req.files;
    const metaBilgiListesi = JSON.parse(req.body.metaBilgi);

    const basvuruSonucu = await pool.query(
      `INSERT INTO basvurular (aday_id, ilan_id, basvuru_tarihi, durum)
       VALUES ($1, $2, NOW(), 'beklemede') RETURNING id`,
      [aday_id, ilan_id]
    );
    const basvuru_id = basvuruSonucu.rows[0].id;

    for (let i = 0; i < belgeler.length; i++) {
      const dosya = belgeler[i];
      const meta = metaBilgiListesi[i];

      const dosyaYolu = dosya?.filename ? `/uploads/${dosya.filename}` : null;

      await pool.query(`
        INSERT INTO basvuru_belgeleri (
          basvuru_id, tablo_satiri_id, belge_url, aday_aciklama,
          yazar_sayisi, baslica_yazar_mi, sorumlu_yazar_mi, 
          es_katki_var_mi, derleme_makale_mi, universite_isbirligi_var_mi
        ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)
      `, [
        basvuru_id,
        meta.tablo_satiri_id,
        dosyaYolu,
        meta.aday_aciklama,
        meta.yazar_sayisi,
        meta.baslica_yazar_mi,
        meta.sorumlu_yazar_mi,
        meta.es_katki_var_mi,
        meta.derleme_makale_mi,
        meta.universite_isbirligi_var_mi
      ]);
    }

    res.status(201).json({ message: 'Başvuru başarıyla kaydedildi.' });
  } catch (error) {
    console.error("Başvuru kayıt hatası:", error);
    res.status(500).json({ error: "Sunucu hatası" });
  }
};
