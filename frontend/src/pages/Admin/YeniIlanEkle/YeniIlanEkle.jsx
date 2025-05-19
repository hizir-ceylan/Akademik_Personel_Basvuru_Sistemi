import { useState } from 'react';
import './YeniIlanEkle.css';

function YeniIlanEkle() {
  const [formData, setFormData] = useState({
    baslik: '',
    kadro_turu: '',
    fakulte: '',
    baslangic_tarihi: '',
    bitis_tarihi: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { baslik, kadro_turu, fakulte, baslangic_tarihi, bitis_tarihi } = formData;
    if (!baslik || !kadro_turu || !fakulte || !baslangic_tarihi || !bitis_tarihi) {
      alert("Tüm alanlar doldurulmalıdır.");
      return;
    }

    try {
      const res = await fetch('http://localhost:5000/api/admin/ilanlar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, created_by: 1 })
      });

      const data = await res.json();
      if (res.ok) {
        alert("İlan başarıyla eklendi!");
        setFormData({
          baslik: '',
          kadro_turu: '',
          fakulte: '',
          baslangic_tarihi: '',
          bitis_tarihi: ''
        });
      } else {
        console.error("Sunucu hatası:", data.message);
        alert("İlan eklenemedi. Lütfen tekrar deneyin.");
      }
    } catch (err) {
      console.error("İstek hatası:", err);
      alert("Sunucuya bağlanılamadı.");
    }
  };

  return (
    <div className="ekle-container">
      <h2 className="ekle-title">Yeni İlan Ekle</h2>
      <div className="ekle-card">
        <form onSubmit={handleSubmit} className="ekle-form">
          <label>İlan Başlığı</label>
          <input
            name="baslik"
            value={formData.baslik}
            placeholder="Örn: Doçent Alım İlanı"
            onChange={handleChange}
            required
          />

          <label>Kadro Türü</label>
          <input
            name="kadro_turu"
            value={formData.kadro_turu}
            placeholder="Örn: Dr. Öğr. Üyesi"
            onChange={handleChange}
            required
          />

          <label>Fakülte</label>
          <input
            name="fakulte"
            value={formData.fakulte}
            placeholder="Örn: Mühendislik Fakültesi"
            onChange={handleChange}
            required
          />

          <label>Başlangıç Tarihi</label>
          <input
            type="date"
            name="baslangic_tarihi"
            value={formData.baslangic_tarihi}
            onChange={handleChange}
            required
          />

          <label>Bitiş Tarihi</label>
          <input
            type="date"
            name="bitis_tarihi"
            value={formData.bitis_tarihi}
            onChange={handleChange}
            required
          />

          <button type="submit">İlanı Kaydet</button>
        </form>
      </div>
    </div>
  );
}

export default YeniIlanEkle;
