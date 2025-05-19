import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

axios.defaults.baseURL = "http://localhost:5000";

function JuriPaneli() {
  const [ilanlar, setIlanlar] = useState([]);
  const [juriAdi, setJuriAdi] = useState("");
  const navigate = useNavigate();

  // 🔑 JWT token'dan kullanıcı ID'sini al
  const token = localStorage.getItem("token");
  const payload = token ? JSON.parse(atob(token.split(".")[1])) : null;
  const juriId = payload?.userId;

  useEffect(() => {
    if (!juriId) return;

    axios
      .get("/api/juri-bilgisi", { params: { juri_id: juriId } })
      .then((res) => setJuriAdi(res.data.ad_soyad))
      .catch((err) => {
        console.error("Jüri bilgisi alınamadı:", err);
        setJuriAdi("Jüri Kullanıcı");
      });

    axios
      .get("/api/juri-ilanlari", { params: { juri_id: juriId } })
      .then((res) => setIlanlar(res.data))
      .catch((err) => console.error("İlanlar alınamadı:", err));
  }, [juriId]);

  return (
    <div className="min-h-screen bg-gray-50 p-10">
      <h1 className="text-3xl font-bold text-green-700 text-center mb-10">
        🎓 Jüri Paneline Hoş Geldiniz
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {ilanlar.map((ilan) => (
          <div key={ilan.ilan_id} className="bg-white shadow-md rounded-lg p-6 border">
            <h2 className="text-xl font-semibold text-green-800 mb-2">{ilan.baslik}</h2>
            <p className="text-sm text-gray-600 mb-4">📄 İlan ID: {ilan.ilan_id}</p>
            <button
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded"
              onClick={() =>
                navigate("/juri-panel/ilan-basvurulari", {
                  state: { ilan_id: ilan.ilan_id, ilan_baslik: ilan.baslik },
                })
              }
            >
              Başvuruları İncele
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default JuriPaneli;
