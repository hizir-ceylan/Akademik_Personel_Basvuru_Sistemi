import { useState, useEffect } from 'react';
import axios from 'axios';
import './Basvurular.css';
import { useNavigate } from 'react-router-dom';

const Basvurular = () => {
  const [basvurular, setBasvurular] = useState([]); 
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBasvurular = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/basvurular');
        setBasvurular(response.data);
      } catch (error) {
        console.error('Başvurular çekilemedi:', error);
      }
    };

    fetchBasvurular();
  }, []);

  return (
    <div className="basvurular">
      <h1>Başvurular</h1>

      {basvurular.length === 0 ? (
        <p>Henüz başvuru yapılmamış.</p>
      ) : (
        <table className="basvuru-tablosu">
          <thead>
            <tr>
              <th>Ad Soyad</th>
              <th>İlan Başlığı</th>
              <th>Başvuru Tarihi</th>
              <th>Durum</th>
              <th>İşlem</th>
            </tr>
          </thead>
          <tbody>
            {basvurular.map((basvuru) => (
              <tr key={basvuru.id}>
                <td>{basvuru.ad_soyad}</td>
                <td>{basvuru.baslik}</td>
                <td>{basvuru.basvuru_tarihi.slice(0, 10)}</td>
                <td>{basvuru.durum}</td>
                <td>
                  <button className="incele-btn" onClick={() => navigate(`/basvuru-detay/${basvuru.id}`)}>
                    İncele
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Basvurular;
