const pool = require('../db');

exports.getTablo5 = async (req, res) => {
  const { adayId } = req.params;

  try {
    // 1. Aday bilgisi ve başvurduğu ilan başlığı
    const adayBilgisi = await pool.query(`
      SELECT k.ad, k.soyad, i.baslik
      FROM kullanicilar k
      JOIN basvurular b ON b.aday_id = k.id
      JOIN ilanlar i ON b.ilan_id = i.id
      WHERE k.id = $1
      LIMIT 1
    `, [adayId]);

    // 2. Tüm Tablo 5 satırlarını getir
    const allSatirlar = await pool.query(`
      SELECT id, kategori, faaliyet_no, faaliyet_aciklama, puan
      FROM tablo_satirlari
      WHERE aktif_mi = true
      ORDER BY id
    `);

    // 3. Adaya ait belgeleri getir
    const adayBelgeleri = await pool.query(`
      SELECT b.id as belge_id, b.tablo_satiri_id,
             b.yazar_sayisi, b.baslica_yazar_mi, b.sorumlu_yazar_mi,
             b.es_katki_var_mi, b.derleme_makale_mi, b.universite_isbirligi_var_mi,
             ts.puan as temel_puan
      FROM basvuru_belgeleri b
      JOIN basvurular basvuru ON b.basvuru_id = basvuru.id
      JOIN tablo_satirlari ts ON b.tablo_satiri_id = ts.id
      WHERE basvuru.aday_id = $1
    `, [adayId]);

    const belgeMap = {};

    adayBelgeleri.rows.forEach(belge => {
      let puan = belge.temel_puan;

      // k çarpanı
      let kCarpani = 1;
      if (belge.yazar_sayisi === 2) kCarpani = 0.8;
      else if (belge.yazar_sayisi === 3) kCarpani = 0.6;
      else if (belge.yazar_sayisi === 4) kCarpani = 0.5;
      else if (belge.yazar_sayisi >= 5 && belge.yazar_sayisi <= 9) kCarpani = 1 / belge.yazar_sayisi;
      else if (belge.yazar_sayisi >= 10) kCarpani = 0.1;

      puan *= kCarpani;

      if (belge.baslica_yazar_mi) puan *= 1.8;
      if (belge.universite_isbirligi_var_mi) puan *= 1.3;
      if (belge.derleme_makale_mi) puan *= 1.2;

      puan = Math.round(puan);

      if (!belgeMap[belge.tablo_satiri_id]) {
        belgeMap[belge.tablo_satiri_id] = 0;
      }
      belgeMap[belge.tablo_satiri_id] += puan;
    });

    // 4. Son tablo verisi oluşturuluyor
    const tablo5 = allSatirlar.rows.map(satir => ({
      id: satir.id,
      kategori: satir.kategori,
      faaliyet_no: satir.faaliyet_no,
      faaliyet_aciklama: satir.faaliyet_aciklama,
      temelPuan: satir.puan,
      belgePuani: belgeMap[satir.id] || null
    }));

    // 5. JSON yanıtı
    res.json({
      aday: adayBilgisi.rows[0],
      satirlar: tablo5
    });

  } catch (error) {
    console.error('Tablo 5 hesaplama hatası:', error);
    res.status(500).json({ error: 'Sunucu hatası' });
  }
};
