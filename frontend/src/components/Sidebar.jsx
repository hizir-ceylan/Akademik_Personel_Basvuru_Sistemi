import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Sidebar.css';

const Sidebar = () => {
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
    <div className="sidebar">
      <img src="/koulogo.png" alt="KOÜ Logo" className="sidebar-logo" />
      <h2>Yönetici Paneli</h2>
      <div className="user-info">
        <p style={{ margin: '10px 0', fontWeight: 'bold' }}>{adSoyad}</p>
      </div>
      <nav>
        <ul>
          <li><Link to="/yonetici/dashboard">🏠 Ana Sayfa</Link></li>
          <li><Link to="/yonetici/ilan-yonetimi">📢 İlan Yönetimi</Link></li>
          <li><Link to="/yonetici/kriter-yonetimi">📑 Kriter Yönetimi</Link></li>
          <li><Link to="/yonetici/basvurular">📥 Başvurular</Link></li>
          <li><Link to="/yonetici/juri-yonetimi">👥 Jüri Yönetimi</Link></li>
          <li><Link to="/yonetici/ayarlar">⚙️ Ayarlar</Link></li>
        </ul>
      </nav>
      <div className="logout-container">
        <button className="logout-button" onClick={() => {
          localStorage.removeItem('token');
          window.location.href = 'http://localhost:5173';
        }}>
          Çıkış Yap
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
