import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Basvurular.css'; // CSS varsa ekliyoruz

const Basvurular = () => {
  const [basvurular, setBasvurular] = useState([]);
  const [seciliBasvuru, setSeciliBasvuru] = useState(null);
  const [seciliDurum, setSeciliDurum] = useState('kabul');
  const [aciklama, setAciklama] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    fetchBasvurular();
  }, []);

  const fetchBasvurular = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/basvurular');
      setBasvurular(response.data);
    } catch (error) {
      console.error('Başvurular getirilemedi:', error);
    }
  };

  const handleSonuclandir = async () => {
    if (!seciliBasvuru) return;
  
    try {
      await axios.put(`http://localhost:5000/api/basvurular/sonuc/${seciliBasvuru}`, {
        durum: seciliDurum,
        aciklama,
      });
  
      alert('Başvuru sonucu başarıyla kaydedildi!');
  
      navigate(`/yonetici/tablo5/${seciliBasvuru}`);
  
      setSeciliBasvuru(null);
      setSeciliDurum('kabul');
      setAciklama('');
    } catch (error) {
      console.error('Başvuru sonucu kaydedilemedi:', error);
      alert('Hata oluştu.');
    }
  };  

  return (
    <div className="basvurular">
      <h1>Başvurular</h1>

      <table className="basvuru-tablosu">
        <thead>
          <tr>
            <th>Ad Soyad</th>
            <th>İlan</th>
            <th>Başvuru Tarihi</th>
            <th>Durum</th>
            <th>İşlemler</th>
          </tr>
        </thead>
        <tbody>
          {basvurular.map((b) => (
            <tr key={b.id}>
              <td>{b.ad_soyad}</td>
              <td>{b.baslik}</td>
              <td>{new Date(b.basvuru_tarihi).toLocaleDateString()}</td>
              <td>{b.durum || 'Beklemede'}</td>
              <td>
                <button onClick={() => navigate(`/yonetici/basvuru-detay/${b.id}`)}>İncele</button>{' '}
                <button onClick={() => setSeciliBasvuru(b.id)}>Sonuçlandır</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal */}
      {seciliBasvuru && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Başvuru Sonuçlandır</h2>

            <label>Durum:</label>
            <select value={seciliDurum} onChange={(e) => setSeciliDurum(e.target.value)}>
              <option value="kabul">Kabul</option>
              <option value="ret">Ret</option>
            </select>

            {seciliDurum === 'ret' && (
              <div>
                <label>Açıklama (isteğe bağlı):</label>
                <textarea
                  value={aciklama}
                  onChange={(e) => setAciklama(e.target.value)}
                  placeholder="Ret nedeni..."
                />
              </div>
            )}

            <div className="modal-buttons">
              <button onClick={handleSonuclandir}>Kaydet</button>
              <button onClick={() => setSeciliBasvuru(null)}>İptal</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Basvurular;
