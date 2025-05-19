import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './AdaySidebar.css';

const AdaySidebar = () => {
  const [adSoyad, setAdSoyad] = useState('Yükleniyor...');

  useEffect(() => {
    const fetchUserInfo = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const payload = JSON.parse(atob(token.split('.')[1]));
          const kullaniciId = payload.userId;

          const response = await axios.get(`http://localhost:5000/api/kullanicilar/${kullaniciId}`);
          const { ad, soyad } = response.data;
          setAdSoyad(`${ad} ${soyad}`);
        } catch (error) {
          console.error('Kullanıcı bilgisi çekilemedi:', error);
          setAdSoyad('Bilinmeyen Kullanıcı');
        }
      } else {
        setAdSoyad('Giriş yapılmadı');
      }
    };

    fetchUserInfo();
  }, []);

  return (
    <div className="aday-sidebar">
      <img src="/koulogo.png" alt="KOÜ Logo" className="aday-sidebar-logo" />
      <h2>Aday Paneli</h2>
      <div className="aday-user-info">
        <p style={{ margin: '10px 0', fontWeight: 'bold' }}>{adSoyad}</p>
      </div>
      <nav>
        <ul>
          <li><Link to="/aday">🏠 Ana Sayfa</Link></li>
          <li><Link to="/aday/ilanlar">📢 İlanlar</Link></li>
          <li><Link to="/aday/basvurularim">📄 Başvurularım</Link></li>
          <li><Link to="/aday/bildirimler">🔔 Bildirimler</Link></li>
        </ul>
      </nav>
      <div className="aday-logout-container">
        <button className="aday-logout-button" onClick={() => {
          localStorage.removeItem('token');
          window.location.href = '/login';
        }}>
          Çıkış Yap
        </button>
      </div>
    </div>
  );
};

export default AdaySidebar;
