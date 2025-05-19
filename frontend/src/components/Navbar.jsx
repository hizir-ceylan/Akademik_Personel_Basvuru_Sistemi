import { NavLink } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = 'http://localhost:5173';
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <img src="/koulogo.png" alt="KOÜ Logo" className="logo" />
        <h1 className="navbar-title">Admin Panel</h1>
      </div>
      <div className="navbar-right">
        <NavLink to="/admin/ilan-yonetim" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>İlanlar</NavLink>
        <NavLink to="/admin/yeni-ilan-ekle" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>Yeni İlan</NavLink>
        <NavLink to="/admin/kullanici-rolleri" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>Roller</NavLink>
        <NavLink to="/admin" end className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>Anasayfa</NavLink>

        <button className="logout-button" onClick={handleLogout}>
          Çıkış Yap
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
