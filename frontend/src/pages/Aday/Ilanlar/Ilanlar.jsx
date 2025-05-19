import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Ilanlar.css";

const Ilanlar = () => {
  const [ilanlar, setIlanlar] = useState([]);
  const [adayId, setAdayId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const payload = JSON.parse(atob(token.split(".")[1]));
      setAdayId(payload.userId);
    }

    const fetchIlanlar = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/ilanlar");
        const bugun = new Date();
        const aktifIlanlar = res.data.filter(ilan =>
          new Date(ilan.bitis_tarihi) >= bugun
        );
        setIlanlar(aktifIlanlar);
      } catch (err) {
        console.error("İlanlar çekilemedi:", err);
      }
    };

    fetchIlanlar();
  }, []);

  const handleBasvur = (ilanId) => {
    navigate(`/aday/basvuru/${ilanId}`);
  };

  return (
    <div className="ilanlar">
      <h1>Açık Akademik Kadro İlanları</h1>
      <div className="ilan-listesi">
        {ilanlar.length === 0 ? (
          <p>Şu anda aktif ilan bulunmamaktadır.</p>
        ) : (
          ilanlar.map((ilan) => (
            <div key={ilan.id} className="ilan-karti">
              <h2>{ilan.baslik}</h2>
              <p><strong>Fakülte:</strong> {ilan.fakulte}</p>
              <p><strong>Bitiş Tarihi:</strong> {new Date(ilan.bitis_tarihi).toLocaleDateString()}</p>
              <p><strong>Açıklama:</strong> {ilan.aciklama || "Açıklama yok."}</p>
              <button className="basvur-btn" onClick={() => handleBasvur(ilan.id)}>
                Başvur
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Ilanlar;
