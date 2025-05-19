import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './BasvuruDetay.css';

function BasvuruDetay() {
  const { ilanId } = useParams();
  const [basvurular, setBasvurular] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBasvurular = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/admin/ilanlar/${ilanId}/basvurular`);
        const data = await res.json();
        setBasvurular(data);
      } catch (err) {
        console.error("Başvuru çekme hatası:", err);
        alert("Başvuru bilgileri alınamadı.");
      } finally {
        setLoading(false);
      }
    };
    fetchBasvurular();
  }, [ilanId]);

  return (
    <div className="basvuru-wrapper">
      <h2 className="basvuru-title">İlana Başvuranlar</h2>
      <div className="basvuru-container">
        {loading ? (
          <p className="loading-text">Yükleniyor...</p>
        ) : basvurular.length === 0 ? (
          <p className="no-data-text">Bu ilana henüz başvuru yapılmamış.</p>
        ) : (
          <table className="basvuru-table">
            <thead>
              <tr>
                <th>Aday ID</th>
                <th>Ad</th>
                <th>Soyad</th>
                <th>Başvuru Tarihi</th>
              </tr>
            </thead>
            <tbody>
              {basvurular.map((b, i) => (
                <tr key={i}>
                  <td>{b.aday_id}</td>
                  <td>{b.ad}</td>
                  <td>{b.soyad}</td>
                  <td>{new Date(b.basvuru_tarihi).toLocaleDateString('tr-TR')}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default BasvuruDetay;
