import { useState, useEffect } from 'react';
import axios from 'axios';
import './Dashboard.css';

const Dashboard = () => {
  const [stats, setStats] = useState({
    aktifIlanlar: 0,
    bekleyenBasvurular: 0,
    toplamJuriUyeleri: 0,
    kapanmakUzereOlanIlanlar: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/dashboard');
        setStats(response.data);
      } catch (error) {
        console.error('Dashboard verileri çekilemedi:', error);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="dashboard">
      <h1>Yönetici Paneline Hoşgeldiniz 👋</h1>
      <div className="card-container">
        <div className="card">
          <h2>Aktif İlanlar</h2>
          <p className="card-number">{stats.aktifIlanlar}</p>
        </div>
        <div className="card">
          <h2>Bekleyen Başvurular</h2>
          <p className="card-number">{stats.bekleyenBasvurular}</p>
        </div>
        <div className="card">
          <h2>Toplam Jüri Üyesi</h2>
          <p className="card-number">{stats.toplamJuriUyeleri}</p>
        </div>
        <div className="card">
          <h2>Kapanacak İlanlar</h2>
          <p className="card-number">{stats.kapanmakUzereOlanIlanlar}</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
