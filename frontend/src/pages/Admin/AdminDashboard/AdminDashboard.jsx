import { useEffect, useState } from 'react';
import './AdminDashboard.css';

function AdminDashboard() {
  const [stats, setStats] = useState({ ilan_sayisi: 0, basvuru_sayisi: 0, kullanici_sayisi: 0 });

  useEffect(() => {
    fetch('http://localhost:5000/api/admin/dashboard/istatistikler')
      .then(res => res.json())
      .then(data => setStats(data))
      .catch(err => console.error("İstatistik hatası:", err));
  }, []);

  return (
    <div className="dashboard-container">
      <h2>Admin Panele Hoşgeldiniz 👋</h2>
      <div className="dashboard-cards">
        <div className="dashboard-card">
          <h3>İlan Sayısı</h3>
          <p>{stats.ilan_sayisi}</p>
        </div>
        <div className="dashboard-card">
          <h3>Başvuru Sayısı</h3>
          <p>{stats.basvuru_sayisi}</p>
        </div>
        <div className="dashboard-card">
          <h3>Kullanıcı Sayısı</h3>
          <p>{stats.kullanici_sayisi}</p>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
