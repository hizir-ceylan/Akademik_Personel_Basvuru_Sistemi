import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function AdminLogin() {
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === 'admin123') {
      navigate('/');
    } else {
      alert('Şifre hatalı!');
    }
  };

  return (
    <div style={{ padding: "2rem", backgroundColor: "#f9f9f9", minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center" }}>
      {/* Admin Girişi Başlığı */}
      <h2 style={{ marginTop: "3rem", marginBottom: "1rem", color: "#009739", textAlign: "center" }}>Admin Girişi</h2>

      {/* Form Kutusu */}
      <form onSubmit={handleLogin} style={{
        backgroundColor: "#fff",
        padding: "2rem",
        borderRadius: "10px",
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
        width: "350px",
        marginTop: "1rem"
      }}>
        <div style={{ marginBottom: "1rem" }}>
          <label style={{ fontWeight: "bold" }}>Şifre:</label><br />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{
              width: "100%",
              padding: "0.5rem",
              border: "1px solid #ccc",
              borderRadius: "5px"
            }}
          />
        </div>
        <button type="submit" style={{
          marginTop: "1rem",
          backgroundColor: "#009739",
          color: "#fff",
          border: "none",
          padding: "0.7rem 1.5rem",
          fontSize: "1rem",
          borderRadius: "5px",
          width: "100%",
          cursor: "pointer"
        }}>
          Giriş Yap
        </button>
      </form>
    </div>
  );
}

export default AdminLogin;
