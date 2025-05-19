import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

function IlanBasvurulari() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const ilanId = state?.ilan_id;
  const ilanBaslik = state?.ilan_baslik;
  const [basvurular, setBasvurular] = useState([]);

  useEffect(() => {
    if (ilanId) {
      axios
        .get("/api/ilan-basvurulari", { params: { ilan_id: ilanId } })
        .then((res) => setBasvurular(res.data))
        .catch((err) => console.error("Başvurular alınamadı:", err));
    }
  }, [ilanId]);

  if (!ilanId) {
    return (
      <div className="text-center text-red-600 mt-10">
        İlan bilgisi bulunamadı. Lütfen jüri panelinden tekrar deneyin.
      </div>
    );
  }

  return (
    <div className="p-10 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-green-700 text-center mb-10">
        📋 {ilanBaslik} Başvuruları
      </h1>
  
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {basvurular.length === 0 ? (
          <p className="text-center text-gray-600 col-span-full">
            Bu ilana henüz başvuru yapılmamış.
          </p>
        ) : (
          basvurular.map((aday) => (
            <div key={aday.basvuru_id} className="border p-6 bg-white rounded-lg shadow">
              <h2 className="text-xl font-semibold text-green-800">{aday.aday_adi}</h2>
              <p className="text-sm text-gray-600 mb-4">Başvuru ID: {aday.basvuru_id}</p>
              <button
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded"
                onClick={() =>
                  navigate("/juri-panel/juri-detay", { state: { aday } })
                }
              >
                İncele
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );  
}

export default IlanBasvurulari;
