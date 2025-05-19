import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './KriterYonetimi.css';

const KriterYonetimi = () => {
  const [kriterler, setKriterler] = useState([]);
  const [seciliKriter, setSeciliKriter] = useState(null);
  const [silKriter, setSilKriter] = useState(null);
  const [yeniModalAcik, setYeniModalAcik] = useState(false);
  const [filtre, setFiltre] = useState("Dr. Öğr. Üyesi");

  const [formData, setFormData] = useState({
    faaliyet_referans: '',
    sart_tipi: '',
    deger: '',
    aciklama: ''
  });

  const [yeniKriter, setYeniKriter] = useState({
    kadro_turu: 'Dr. Öğr. Üyesi',
    faaliyet_referans: '',
    sart_tipi: 'Asgari Sayı',
    deger: '',
    aciklama: ''
  });

  useEffect(() => {
    fetchKriterler();
  }, []);

  const fetchKriterler = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/kriterler');
      setKriterler(response.data);
    } catch (error) {
      console.error('Kriterler çekilemedi:', error);
    }
  };

  const handleEditClick = (kriter) => {
    setSeciliKriter(kriter);
    setFormData({
      faaliyet_referans: kriter.faaliyet_referans,
      sart_tipi: kriter.sart_tipi,
      deger: kriter.deger ?? '',
      aciklama: kriter.aciklama ?? ''
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`http://localhost:5000/api/kriterler/${seciliKriter.id}`, formData);
      alert('Kriter güncellendi.');
      setSeciliKriter(null);
      fetchKriterler();
    } catch (error) {
      console.error('Kriter güncellenemedi:', error);
      alert('Hata oluştu.');
    }
  };

  const handleSil = async () => {
    try {
      await axios.delete(`http://localhost:5000/api/kriterler/${silKriter.id}`);
      alert('Kriter silindi.');
      setSilKriter(null);
      fetchKriterler();
    } catch (error) {
      console.error('Kriter silinemedi:', error);
      alert('Silme sırasında hata oluştu.');
    }
  };

  const handleYeniKaydet = async () => {
    try {
      await axios.post('http://localhost:5000/api/kriterler', yeniKriter);
      alert('Yeni kriter eklendi.');
      setYeniModalAcik(false);
      setYeniKriter({
        kadro_turu: 'Dr. Öğr. Üyesi',
        faaliyet_referans: '',
        sart_tipi: 'Asgari Sayı',
        deger: '',
        aciklama: ''
      });
      fetchKriterler();
    } catch (error) {
      console.error('Yeni kriter eklenemedi:', error);
      alert("Ekleme işlemi sırasında hata oluştu.");
    }
  };

  const filtrelenmisKriterler = kriterler
  .filter(k =>
    k.kadro_turu === filtre ||
    (filtre === 'Doçent' && k.kadro_turu === 'Doçent / Profesör') ||
    (filtre === 'Profesör' && k.kadro_turu === 'Doçent / Profesör')
  )
  .sort((a, b) => {
    if (a.kadro_turu === 'Doçent / Profesör' && b.kadro_turu !== 'Doçent / Profesör') return 1;
    if (b.kadro_turu === 'Doçent / Profesör' && a.kadro_turu !== 'Doçent / Profesör') return -1;
    return a.sira_no - b.sira_no;
  });


  return (
    <div className="kriterler">
      <h1>Kadro Kriterleri</h1>

      <div className="ust-kontrol">
        <div>
          <label style={{ marginRight: '8px', fontWeight: 'bold' }}>Kadro Türü:</label>
          <select value={filtre} onChange={(e) => setFiltre(e.target.value)}>
            <option value="Dr. Öğr. Üyesi">Dr. Öğr. Üyesi</option>
            <option value="Doçent">Doçent</option>
            <option value="Profesör">Profesör</option>
          </select>
        </div>
        <button className="ekle-btn" onClick={() => setYeniModalAcik(true)}>+ Yeni Kriter</button>
      </div>

      <table className="kriter-tablosu">
        <thead>
          <tr>
            <th>Kadro Türü</th>
            <th>Faaliyet Referansı</th>
            <th>Şart Tipi</th>
            <th>Değer</th>
            <th>Açıklama</th>
            <th>İşlemler</th>
          </tr>
        </thead>
        <tbody>
          {filtrelenmisKriterler.map((kriter) => (
            <tr key={kriter.id}>
              <td>{kriter.kadro_turu}</td>
              <td>{kriter.faaliyet_referans}</td>
              <td>{kriter.sart_tipi}</td>
              <td>{kriter.deger ?? '-'}</td>
              <td>{kriter.aciklama || '-'}</td>
              <td>
                <button onClick={() => handleEditClick(kriter)}>Düzenle</button>{' '}
                <button onClick={() => setSilKriter(kriter)}>Sil</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Düzenle Modali */}
      {seciliKriter && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Kriter Düzenle</h2>
            <label>Faaliyet Referansı:</label>
            <input name="faaliyet_referans" value={formData.faaliyet_referans} onChange={handleInputChange} />
            <label>Şart Tipi:</label>
            <select name="sart_tipi" value={formData.sart_tipi} onChange={handleInputChange}>
              <option>Asgari Sayı</option>
              <option>Azami Puan</option>
              <option>Asgari Puan</option>
              <option>Toplam Puan</option>
            </select>
            <label>Değer:</label>
            <input name="deger" type="number" value={formData.deger} onChange={handleInputChange} />
            <label>Açıklama:</label>
            <textarea name="aciklama" value={formData.aciklama} onChange={handleInputChange} />
            <div className="modal-buttons">
              <button onClick={handleUpdate}>Kaydet</button>
              <button onClick={() => setSeciliKriter(null)}>İptal</button>
            </div>
          </div>
        </div>
      )}

      {/* Silme Modali */}
      {silKriter && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Kriter Sil</h2>
            <p>
              <strong>{silKriter.faaliyet_referans}</strong> kriterini silmek istediğinize emin misiniz?
            </p>
            <div className="modal-buttons">
              <button onClick={handleSil}>Evet, Sil</button>
              <button onClick={() => setSilKriter(null)}>İptal</button>
            </div>
          </div>
        </div>
      )}

      {/* Yeni Ekleme Modali */}
      {yeniModalAcik && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Yeni Kriter Ekle</h2>
            <label>Kadro Türü:</label>
            <select value={yeniKriter.kadro_turu} onChange={e => setYeniKriter({ ...yeniKriter, kadro_turu: e.target.value })}>
              <option value="Dr. Öğr. Üyesi">Dr. Öğr. Üyesi</option>
              <option value="Doçent">Doçent</option>
              <option value="Profesör">Profesör</option>
              <option value="Doçent / Profesör">Doçent / Profesör</option>
            </select>
            <label>Faaliyet Referansı:</label>
            <input value={yeniKriter.faaliyet_referans} onChange={e => setYeniKriter({ ...yeniKriter, faaliyet_referans: e.target.value })} />
            <label>Şart Tipi:</label>
            <select value={yeniKriter.sart_tipi} onChange={e => setYeniKriter({ ...yeniKriter, sart_tipi: e.target.value })}>
              <option value="Asgari Sayı">Asgari Sayı</option>
              <option value="Azami Puan">Azami Puan</option>
              <option value="Asgari Puan">Asgari Puan</option>
              <option value="Toplam Puan">Toplam Puan</option>
            </select>
            <label>Değer:</label>
            <input type="number" value={yeniKriter.deger} onChange={e => setYeniKriter({ ...yeniKriter, deger: e.target.value })} />
            <label>Açıklama:</label>
            <textarea value={yeniKriter.aciklama} onChange={e => setYeniKriter({ ...yeniKriter, aciklama: e.target.value })} />
            <div className="modal-buttons">
              <button onClick={handleYeniKaydet}>Kaydet</button>
              <button onClick={() => setYeniModalAcik(false)}>İptal</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default KriterYonetimi;
