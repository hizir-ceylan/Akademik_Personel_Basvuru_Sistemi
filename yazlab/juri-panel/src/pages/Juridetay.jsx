import React, { useState } from "react";
import { useLocation } from "react-router-dom";

function JuriDetay() {
  const { state } = useLocation();
  const aday = state?.aday;
  const [sonuc, setSonuc] = useState(null);

  if (!aday) {
    return (
      <div className="text-center text-red-600 mt-32">
        Aday bilgisi bulunamadı. Lütfen jüri panelinden tekrar deneyin.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white pt-28 pb-12 px-4">
      <div className="max-w-2xl mx-auto bg-white border border-green-700 rounded-xl shadow-lg p-8">
        {/* Başlık ve Aday */}
        <div className="text-center mb-6">
          <div className="text-5xl mb-2">👤</div>
          <h1 className="text-3xl font-bold text-green-800">{aday.aday_adi}</h1>
          <p className="text-gray-600 mt-2">
            📌 İlan: {aday.ilan_basligi} <br />
            🔍 Başvuru ID: {aday.basvuru_id}
          </p>
        </div>

        {/* Belgeler */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-700 mb-2 flex items-center">
            📁 Belgeler:
          </h2>
          <ul className="list-disc list-inside text-blue-700 space-y-1">
            <li><a href="#">Makale_1.pdf</a></li>
            <li><a href="#">YüksekLisansBelgesi.pdf</a></li>
            <li><a href="#">CV.pdf</a></li>
          </ul>
        </div>

        {/* Rapor Yükle */}
        <div className="mb-6">
          <label className="block font-medium text-gray-700 mb-1">📤 Rapor Yükle:</label>
          <input type="file" className="w-full border p-2 rounded text-sm" />
        </div>

        {/* Değerlendirme */}
        <div className="mb-6">
          <label className="block font-medium text-gray-700 mb-2">📝 Değerlendirme:</label>
          <div className="grid grid-cols-2 gap-4">
            <button
              className={`py-2 rounded font-semibold text-white ${
                sonuc === "Olumlu" ? "bg-green-700" : "bg-green-500 hover:bg-green-600"
              }`}
              onClick={() => setSonuc("Olumlu")}
            >
              ✅ Olumlu
            </button>
            <button
              className={`py-2 rounded font-semibold text-white ${
                sonuc === "Olumsuz" ? "bg-red-700" : "bg-red-500 hover:bg-red-600"
              }`}
              onClick={() => setSonuc("Olumsuz")}
            >
              ❌ Olumsuz
            </button>
          </div>
        </div>

        {/* Gönder Butonu */}
        <button className="w-full bg-blue-700 hover:bg-blue-800 text-white py-2 rounded font-bold">
          🚀 Gönder
        </button>
      </div>
    </div>
  );
}

export default JuriDetay;
