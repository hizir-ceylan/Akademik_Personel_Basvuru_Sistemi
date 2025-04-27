import { useState, useEffect } from 'react';
import axios from 'axios';
import './IlanYonetimi.css';

const IlanYonetimi = () => {
  const [ilanlar, setIlanlar] = useState([]);
  const [modalAcik, setModalAcik] = useState(false);
  const [yeniIlan, setYeniIlan] = useState({
    baslik: '',
    kadro_turu: '',
    fakulte: '',
    baslangic_tarihi: '',
    bitis_tarihi: ''
  });

  const kullaniciRol = localStorage.getItem('kullaniciRol');
  const kullaniciId = localStorage.getItem('kullaniciId');

  useEffect(() => {
    fetchIlanlar();
  }, []);

  const fetchIlanlar = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/ilanlar');
      setIlanlar(response.data);
    } catch (error) {
      console.error('İlanlar çekilemedi:', error);
    }
  };

  const handleIlanEkle = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/ilanlar', {
        ...yeniIlan,
        created_by: kullaniciId,
        kullanici_rol: kullaniciRol
      });
      alert('İlan başarıyla eklendi.');
      setModalAcik(false);
      setYeniIlan({ baslik: '', kadro_turu: '', fakulte: '', baslangic_tarihi: '', bitis_tarihi: '' });
      fetchIlanlar();
    } catch (error) {
      console.error('İlan eklenemedi:', error);
      alert(error.response?.data?.error || 'Bir hata oluştu.');
    }
  };

  return (
    <div className="ilan-yonetimi">
      <h1>İlan Yönetimi</h1>
      {(kullaniciRol === 'admin') && (
        <button className="yeni-ilan-btn" onClick={() => setModalAcik(true)}>+ Yeni İlan Ekle</button>
      )}

      <div className="ilan-listesi">
        {ilanlar.map((ilan) => (
          <div className="ilan-karti" key={ilan.id}>
            <h3>{ilan.baslik}</h3>
            <p>Kadro Türü: {ilan.kadro_turu}</p>
            <p>Fakülte: {ilan.fakulte}</p>
            <p>Başlangıç: {ilan.baslangic_tarihi.split('T')[0]}</p>
            <p>Bitiş: {ilan.bitis_tarihi.split('T')[0]}</p>
          </div>
        ))}
      </div>

      {/* Modal */}
      {modalAcik && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Yeni İlan Ekle</h2>
            <form onSubmit={handleIlanEkle}>
              <input
                type="text"
                placeholder="İlan Başlığı"
                value={yeniIlan.baslik}
                onChange={(e) => setYeniIlan({ ...yeniIlan, baslik: e.target.value })}
                required
              />
              <input
                type="text"
                placeholder="Kadro Türü"
                value={yeniIlan.kadro_turu}
                onChange={(e) => setYeniIlan({ ...yeniIlan, kadro_turu: e.target.value })}
                required
              />
              <input
                type="text"
                placeholder="Fakülte"
                value={yeniIlan.fakulte}
                onChange={(e) => setYeniIlan({ ...yeniIlan, fakulte: e.target.value })}
                required
              />
              <input
                type="date"
                value={yeniIlan.baslangic_tarihi}
                onChange={(e) => setYeniIlan({ ...yeniIlan, baslangic_tarihi: e.target.value })}
                required
              />
              <input
                type="date"
                value={yeniIlan.bitis_tarihi}
                onChange={(e) => setYeniIlan({ ...yeniIlan, bitis_tarihi: e.target.value })}
                required
              />
              <div className="modal-buttons">
                <button type="submit" className="kaydet-btn">Kaydet</button>
                <button type="button" className="iptal-btn" onClick={() => setModalAcik(false)}>İptal</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default IlanYonetimi;
