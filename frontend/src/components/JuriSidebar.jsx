import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./Sidebar.css";

const JuriSidebar = () => {
  const [adSoyad, setAdSoyad] = useState("Yükleniyor...");

  useEffect(() => {
    const fetchUserInfo = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const payload = JSON.parse(atob(token.split('.')[1]));
          const kullaniciId = payload.userId;

          const response = await axios.get(`http://localhost:5000/api/kullanicilar/${kullaniciId}`);
          const { ad, soyad } = response.data;
          setAdSoyad(`${ad} ${soyad}`);
        } catch (error) {
          setAdSoyad("Bilinmeyen Kullanıcı");
        }
      } else {
        setAdSoyad("Giriş yapılmadı");
      }
    };

    fetchUserInfo();
  }, []);

  return (
    <div className="sidebar">
      <img src="/koulogo.png" alt="KOÜ Logo" className="sidebar-logo" />
      <h2>Jüri Paneli</h2>
      <div className="user-info">
        <p style={{ margin: "10px 0", fontWeight: "bold" }}>{adSoyad}</p>
      </div>
      <nav>
        <ul>
          <li><Link to="/juri-panel">🎓 Atandığım İlanlar</Link></li>
        </ul>
      </nav>
      <div className="logout-container">
        <button className="logout-button" onClick={() => {
          localStorage.removeItem("token");
          window.location.href = "http://localhost:5173";
        }}>
          Çıkış Yap
        </button>
      </div>
    </div>
  );
};

export default JuriSidebar;
