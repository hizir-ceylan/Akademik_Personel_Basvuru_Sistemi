import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './BasvuruDetay.css';

const BasvuruDetay = () => {
  const { id } = useParams();
  const [basvuru, setBasvuru] = useState(null);

  useEffect(() => {
    const fetchBasvuru = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/basvurular/${id}`);
        setBasvuru(response.data);
      } catch (error) {
        console.error('Başvuru detayı çekilemedi:', error);
      }
    };

    fetchBasvuru();
  }, [id]);

  if (!basvuru) {
    return <p>Yükleniyor...</p>;
  }

  return (
    <div className="basvuru-detay">
      <h1>Başvuru Detayı</h1>

      <div className="detay-kart">
        <p><strong>Ad Soyad:</strong> {basvuru.ad_soyad}</p>
        <p><strong>Başvurduğu İlan:</strong> {basvuru.baslik}</p>
        <p><strong>Başvuru Tarihi:</strong> {basvuru.basvuru_tarihi.slice(0, 10)}</p>
        <p><strong>Başvuru Durumu:</strong> {basvuru.durum}</p>
      </div>
    </div>
  );
};

export default BasvuruDetay;
