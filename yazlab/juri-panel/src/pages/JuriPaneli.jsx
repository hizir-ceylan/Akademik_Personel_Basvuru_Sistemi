import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

axios.defaults.baseURL = "http://localhost:3001";

function JuriPaneli() {
  const [ilanlar, setIlanlar] = useState([]);
  const [juriAdi, setJuriAdi] = useState("");
  const juriId = 10;
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("/api/juri-bilgisi", { params: { juri_id: juriId } })
      .then((res) => setJuriAdi(res.data.ad_soyad));

    axios
      .get("/api/juri-ilanlari", { params: { juri_id: juriId } })
      .then((res) => setIlanlar(res.data));
  }, []);

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-green-700 text-center mb-4">🎓 Jüri Paneline Hoş Geldiniz</h1>
     
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {ilanlar.map((ilan) => (
          <div key={ilan.ilan_id} className="border p-6 rounded-lg shadow bg-white">
            <h2 className="text-xl font-semibold text-green-700 mb-2">{ilan.baslik}</h2>
            <p className="text-sm text-gray-600">İlan ID: {ilan.ilan_id}</p>
            <button
              className="mt-4 w-full bg-blue-700 hover:bg-blue-800 text-white py-2 rounded"
              onClick={() => navigate("/ilan-basvurulari", { state: { ilan_id: ilan.ilan_id, ilan_baslik: ilan.baslik } })}
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
