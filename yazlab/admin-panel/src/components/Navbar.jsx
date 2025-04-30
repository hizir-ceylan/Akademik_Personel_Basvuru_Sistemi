import { Link } from 'react-router-dom';
import './Navbar.css'; // Stil dosyası bağlantısı

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <img
          src="/koulogo.png" // ❗️ logo → public/koulogo.png olmalı
          alt="KOÜ Logo"
          className="navbar-logo"
        />
        <h1 className="navbar-title">KOCAELİ ÜNİVERSİTESİ</h1>
      </div>

      <div className="navbar-links">
        <Link to="/">İlanlar</Link>
        <Link to="/add-announcement">Yeni İlan Ekle</Link>
        <Link to="/admin-login">Admin Giriş</Link>
      </div>
    </nav>
  );
}

export default Navbar;
