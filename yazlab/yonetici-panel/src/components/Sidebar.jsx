
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Sidebar.css';

const Sidebar = () => {
  const [adSoyad, setAdSoyad] = useState('isim');

  useEffect(() => {
    const fetchUserInfo = async () => {
      const kullaniciId = localStorage.getItem('kullaniciId'); // şimdilik localStorage kullanıyoruz
      if (kullaniciId) {
        try {
          const response = await axios.get(`http://localhost:5000/api/kullanicilar/${kullaniciId}`);
          setAdSoyad(response.data.ad_soyad);
        } catch (error) {
          console.error('Kullanıcı bilgisi çekilemedi:', error);
        }
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
          <li><Link to="/">🏠 Ana Sayfa</Link></li>
          <li><Link to="/ilan-yonetimi">📢 İlan Yönetimi</Link></li>
          <li><Link to="/kriter-yonetimi">📑 Kriter Yönetimi</Link></li>
          <li><Link to="/basvurular">📥 Başvurular</Link></li>
          <li><Link to="/juri-yonetimi">👥 Jüri Yönetimi</Link></li>
          <li><Link to="/degerlendirmeler">📝 Değerlendirmeler</Link></li>
          <li><Link to="/raporlar">📊 Raporlar</Link></li>
          <li><Link to="/ayarlar">⚙️ Ayarlar</Link></li>
        </ul>
      </nav>
      <div className="logout-container">
        <button className="logout-button">Çıkış Yap</button>
      </div>
    </div>
  )
}

export default Sidebar;
