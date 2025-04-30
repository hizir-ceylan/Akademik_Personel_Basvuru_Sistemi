import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function AddAnnouncement() {
  const [baslik, setBaslik] = useState('');
  const [kadroTuru, setKadroTuru] = useState('');
  const [fakulte, setFakulte] = useState('');
  const [baslangicTarihi, setBaslangicTarihi] = useState('');
  const [bitisTarihi, setBitisTarihi] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const yeniIlan = {
      baslik,
      kadro_turu: kadroTuru,
      fakulte,
      baslangic_tarihi: baslangicTarihi,
      bitis_tarihi: bitisTarihi,
      created_by: 1
    };

    try {
      await axios.post('http://localhost:5000/api/announcements', yeniIlan);
      alert('İlan başarıyla eklendi!');
      navigate('/');
    } catch (error) {
      console.error('İlan ekleme hatası:', error.response?.data || error.message);
      alert('İlan eklenemedi!');
    }
  };

  return (
    <div style={{ padding: "2rem", maxWidth: "600px", margin: "auto", backgroundColor: "#fff", borderRadius: "10px", boxShadow: "0 0 10px rgba(0,0,0,0.1)" }}>
      <h2 style={{ marginBottom: "1.5rem", color: "#009739" }}>Yeni İlan Ekle</h2>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <input
          type="text"
          placeholder="İlan Başlığı"
          value={baslik}
          onChange={(e) => setBaslik(e.target.value)}
          required
          style={inputStyle}
        />
        <input
          type="text"
          placeholder="Kadro Türü"
          value={kadroTuru}
          onChange={(e) => setKadroTuru(e.target.value)}
          required
          style={inputStyle}
        />
        <input
          type="text"
          placeholder="Fakülte"
          value={fakulte}
          onChange={(e) => setFakulte(e.target.value)}
          required
          style={inputStyle}
        />
        <div style={{ display: "flex", gap: "1rem" }}>
          <input
            type="date"
            value={baslangicTarihi}
            onChange={(e) => setBaslangicTarihi(e.target.value)}
            required
            style={{ ...inputStyle, flex: 1 }}
          />
          <input
            type="date"
            value={bitisTarihi}
            onChange={(e) => setBitisTarihi(e.target.value)}
            required
            style={{ ...inputStyle, flex: 1 }}
          />
        </div>
        <button type="submit" style={buttonStyle}>İlan Ekle</button>
      </form>
    </div>
  );
}

const inputStyle = {
  padding: "0.75rem",
  fontSize: "1rem",
  border: "1px solid #ccc",
  borderRadius: "5px"
};

const buttonStyle = {
  backgroundColor: "#009739",
  color: "#fff",
  padding: "0.75rem",
  fontSize: "1rem",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
  fontWeight: "bold"
};

export default AddAnnouncement;
