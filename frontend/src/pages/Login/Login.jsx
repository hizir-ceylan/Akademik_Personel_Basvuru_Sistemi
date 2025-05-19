import { useState } from "react";
import axios from "axios";
import "./Login.css";

function Login() {
  const [tcNo, setTcNo] = useState("");
  const [sifre, setSifre] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [showRegister, setShowRegister] = useState(false);
  const [ad, setAd] = useState("");
  const [soyad, setSoyad] = useState("");
  const [dogumYili, setDogumYili] = useState("");
  const [email, setEmail] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log("Login fonksiyonu çağrıldı");

    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        tcNo,
        password: sifre,
      });

      const token = res.data.token;
      console.log("Alınan token:", token);
      localStorage.setItem("token", token);

      const payload = JSON.parse(atob(token.split(".")[1]));
      const roleId = parseInt(payload.roleId);
      console.log("JWT içeriği:", payload);
      console.log("Kullanıcı rolü:", roleId);

      if (roleId === 1) {
        window.location.href = "/aday";
      } else if (roleId === 2) {
        window.location.href = "/yonetici/dashboard";
      } else if (roleId === 3) {
        window.location.href = "/admin";
      } else if (roleId === 4) {
        window.location.href = "/juri-panel";
      } else {
        setError("Tanımsız kullanıcı rolü");
      }
    } catch (err) {
      console.error("Login hatası:", err);
      setError("Giriş başarısız: " + (err.response?.data?.message || err.message));
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:5000/api/auth/register", {
        tcNo,
        ad,
        soyad,
        dogumYili,
        email,
        sifre,
      });

      setSuccess("Kayıt başarılı. Giriş yapabilirsiniz.");
      setShowRegister(false);
    } catch (err) {
      setError("Kayıt başarısız: " + (err.response?.data?.message || err.message));
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={showRegister ? handleRegister : handleLogin} className="login-form">
        <img src="/koulogo.png" alt="Kocaeli Üniversitesi Logosu" className="kou-logo" />
        <h2 className="login-title">{showRegister ? "Kayıt Ol" : "Giriş Yap"}</h2>

        <input type="text" placeholder="TC Kimlik No" value={tcNo} onChange={(e) => setTcNo(e.target.value)} required className="input" />

        {showRegister && (
          <>
            <input type="text" placeholder="Ad" value={ad} onChange={(e) => setAd(e.target.value)} required className="input" />
            <input type="text" placeholder="Soyad" value={soyad} onChange={(e) => setSoyad(e.target.value)} required className="input" />
            <input type="number" placeholder="Doğum Yılı" value={dogumYili} onChange={(e) => setDogumYili(e.target.value)} required className="input" />
            <input type="email" placeholder="E-posta" value={email} onChange={(e) => setEmail(e.target.value)} required className="input" />
          </>
        )}

        <input type="password" placeholder="Şifre" value={sifre} onChange={(e) => setSifre(e.target.value)} required className="input" />

        {error && <p className="error-text">{error}</p>}
        {success && <p className="success-text">{success}</p>}

        <button type="submit" className="submit-button">
          {showRegister ? "Kayıt Ol" : "Giriş Yap"}
        </button>

        <div className="toggle-text">
          {showRegister ? "Zaten hesabınız var mı?" : "Hesabınız yok mu?"}
          <button
            type="button"
            onClick={() => {
              setShowRegister(!showRegister);
              setError(null);
              setSuccess(null);
            }}
            className="toggle-button"
          >
            {showRegister ? " Giriş Yap" : " Kayıt Ol"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default Login;
