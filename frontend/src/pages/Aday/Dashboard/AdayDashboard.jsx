import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './AdayDashboard.css';

const AdayDashboard = () => {
  const [adSoyad, setAdSoyad] = useState('');
  const [ilanSayisi, setIlanSayisi] = useState(0);
  const [basvuruSayisi, setBasvuruSayisi] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token');
      if (!token) return;

      const payload = JSON.parse(atob(token.split('.')[1]));
      const userId = payload.userId;

      try {
        const userRes = await axios.get(`http://localhost:5000/api/kullanicilar/${userId}`);
        setAdSoyad(`${userRes.data.ad} ${userRes.data.soyad}`);

        const ilanRes = await axios.get(`http://localhost:5000/api/ilanlar/aktif`);
        setIlanSayisi(ilanRes.data.length);

        const basvuruRes = await axios.get(`http://localhost:5000/api/basvurular/aday/${userId}`);
        setBasvuruSayisi(basvuruRes.data.length);
      } catch (err) {
        console.error("Dashboard verileri çekilemedi:", err);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="aday-dashboard">
      <h1>Hoş geldiniz, {adSoyad}</h1>

      <div className="istatistik-kutulari">
        <div className="kutucuk">
          <h3>📢 Aktif İlan</h3>
          <p>{ilanSayisi}</p>
        </div>
        <div className="kutucuk">
          <h3>📥 Yaptığınız Başvurular</h3>
          <p>{basvuruSayisi}</p>
        </div>
      </div>
    </div>
  );
};

export default AdayDashboard;
