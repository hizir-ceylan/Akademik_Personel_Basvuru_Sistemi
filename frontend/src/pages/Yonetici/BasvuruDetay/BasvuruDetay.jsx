import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './BasvuruDetay.css';

const BasvuruDetay = () => {
  const { id } = useParams();
  const [detay, setDetay] = useState(null);

  useEffect(() => {
    const fetchDetay = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/basvurular/detay/${id}`);
        setDetay(response.data);
      } catch (error) {
        console.error('Başvuru detayları çekilemedi:', error);
      }
    };

    fetchDetay();
  }, [id]);

  if (!detay) return <p>Yükleniyor...</p>;

  const { basvuru, belgeler, raporlar } = detay;

  return (
    <div className="basvuru-detay">
      <h1>Başvuru Detayları</h1>

      <div className="basvuru-bilgisi">
        <p><strong>Aday:</strong> {basvuru.ad} {basvuru.soyad}</p>
        <p><strong>İlan:</strong> {basvuru.baslik}</p>
        <p><strong>Tarih:</strong> {new Date(basvuru.basvuru_tarihi).toLocaleDateString()}</p>
        <p><strong>Durum:</strong> {basvuru.durum || 'Bekliyor'}</p>
      </div>

      <h2>Başvuru Belgeleri</h2>
      <table className="detay-tablosu">
        <thead>
          <tr>
            <th>Faaliyet Açıklama</th>
            <th>Belge</th>
          </tr>
        </thead>
        <tbody>
          {belgeler.map((b) => (
            <tr key={b.id}>
              <td>{b.kategori}.{b.faaliyet_no} - {b.faaliyet_aciklama}</td>
              <td>
                <a href={b.belge_url} target="_blank" rel="noopener noreferrer">
                  Görüntüle
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>Jüri Raporları</h2>
      <table className="detay-tablosu">
        <thead>
          <tr>
            <th>Jüri Üyesi</th>
            <th>Rapor</th>
          </tr>
        </thead>
        <tbody>
          {raporlar.map((r) => (
            <tr key={r.id}>
              <td>{r.ad} {r.soyad}</td>
              <td>
                <a href={r.rapor_url} target="_blank" rel="noopener noreferrer">
                  Raporu Gör
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BasvuruDetay;
