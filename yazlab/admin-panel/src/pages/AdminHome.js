import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function AdminHome() {
  const [announcements, setAnnouncements] = useState([]);

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/announcements');
        setAnnouncements(response.data);
      } catch (error) {
        console.error('Veri çekme hatası:', error.response?.data || error.message);
      }
    };

    fetchAnnouncements();
  }, []);

  const handleDelete = async (id) => {
    const onay = window.confirm("Bu ilanı silmek istediğinizden emin misiniz?");
    if (!onay) return;

    try {
      await axios.delete(`http://localhost:5000/api/announcements/${id}`);
      setAnnouncements(prev => prev.filter(ilan => ilan.id !== id));
      alert("İlan silindi.");
    } catch (err) {
      console.error("Silme hatası:", err);
      alert("İlan silinemedi.");
    }
  };

  return (
    <div style={{ padding: "2rem", backgroundColor: "#f9f9f9", minHeight: "100vh" }}>
      <h2 style={{ marginBottom: "2rem", color: "#009739" }}>İlanlar</h2>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "1.5rem" }}>
        {announcements.map((ilan) => (
          <div key={ilan.id} style={{
            backgroundColor: "#fff",
            border: "1px solid #ddd",
            borderRadius: "10px",
            padding: "1.5rem",
            width: "300px",
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)"
          }}>
            <h3 style={{ color: "#009739" }}>{ilan.baslik}</h3>
            <p><strong>Kadro Türü:</strong> {ilan.kadro_turu}</p>
            <p><strong>Fakülte:</strong> {ilan.fakulte}</p>
            <p><strong>Başlangıç:</strong> {ilan.baslangic_tarihi}</p>
            <p><strong>Bitiş:</strong> {ilan.bitis_tarihi}</p>
            <div style={{ marginTop: "1rem", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              <Link to={`/edit-announcement/${ilan.id}`} style={buttonStyle}>Düzenle</Link>
              <button
                onClick={() => handleDelete(ilan.id)}
                style={{ ...buttonStyle, backgroundColor: "#cc0000" }}
              >
                Sil
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const buttonStyle = {
  backgroundColor: "#009739",
  color: "#fff",
  padding: "0.5rem 1rem",
  borderRadius: "5px",
  fontWeight: "bold",
  textDecoration: "none",
  textAlign: "center",
  border: "none",
  cursor: "pointer"
};

export default AdminHome;
