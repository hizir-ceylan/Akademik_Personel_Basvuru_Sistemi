import { useState, useEffect } from 'react';
import axios from 'axios';
import './KriterYonetimi.css';

const KriterYonetimi = () => {
  const [kriterler, setKriterler] = useState([]);
  const [guncellenenPuan, setGuncellenenPuan] = useState({});
  
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

  const handleInputChange = (id, yeniPuan) => {
    setGuncellenenPuan({ ...guncellenenPuan, [id]: yeniPuan });
  };

  const handlePuanGuncelle = async (id) => {
    try {
      await axios.put(`http://localhost:5000/api/kriterler/${id}`, {
        puan: guncellenenPuan[id]
      });
      alert('Puan güncellendi!');
      fetchKriterler();
      setGuncellenenPuan({});
    } catch (error) {
      console.error('Puan güncellenemedi:', error);
      alert('Bir hata oluştu.');
    }
  };

  return (
    <div className="kriter-yonetimi">
      <h1>Kriter Yönetimi</h1>

      <table className="kriter-tablosu">
        <thead>
          <tr>
            <th>Kategori</th>
            <th>Faaliyet No</th>
            <th>Faaliyet Açıklaması</th>
            <th>Puan</th>
            <th>İşlem</th>
          </tr>
        </thead>
        <tbody>
          {kriterler.map((kriter) => (
            <tr key={kriter.id}>
              <td>{kriter.kategori}</td>
              <td>{kriter.faaliyet_no}</td>
              <td>{kriter.faaliyet_aciklama}</td>
              <td>
                <input
                  type="number"
                  value={guncellenenPuan[kriter.id] ?? kriter.puan}
                  onChange={(e) => handleInputChange(kriter.id, e.target.value)}
                />
              </td>
              <td>
                <button onClick={() => handlePuanGuncelle(kriter.id)}>Güncelle</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default KriterYonetimi;
