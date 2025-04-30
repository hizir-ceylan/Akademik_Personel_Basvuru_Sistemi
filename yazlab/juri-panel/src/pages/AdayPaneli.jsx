import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AdayPaneli = () => {
  const navigate = useNavigate();

  const [ilanlar, setIlanlar] = useState([]);
  const [seciliIlan, setSeciliIlan] = useState(null);
  const [indeksliYayin, setIndeksliYayin] = useState(null);
  const [atifBelgesi, setAtifBelgesi] = useState(null);
  const [konferansBelgesi, setKonferansBelgesi] = useState(null);
  const [basvuruGecmisi, setBasvuruGecmisi] = useState([]);

  // ADAY GİRİŞ KONTROLÜ
  useEffect(() => {
    const girisYaptiMi = localStorage.getItem("adayGiris");
    if (girisYaptiMi !== "true") {
      navigate("/aday-giris");
    }
  }, [navigate]);

  // ÇIKIŞ İŞLEMİ
  const handleLogout = () => {
    localStorage.removeItem("adayGiris");
    navigate("/aday-giris");
  };

  // İlanları API'den çek
  useEffect(() => {
    axios.get("http://localhost:5000/api/ilanlar")
      .then(response => setIlanlar(response.data))
      .catch(error => console.error("İlanlar alınamadı:", error));
  }, []);

  // BAŞVURU YAPMA
  const handleBasvuruYap = () => {
    if (seciliIlan && indeksliYayin && atifBelgesi && konferansBelgesi) {
      const yeniBasvuru = {
        ilanBaslik: seciliIlan.baslik,
        tarih: new Date().toLocaleString("tr-TR"),
        durum: "Beklemede",
        belgeler: {
          indeksliYayin: indeksliYayin.name,
          atifBelgesi: atifBelgesi.name,
          konferansBelgesi: konferansBelgesi.name,
        },
      };

      setBasvuruGecmisi([...basvuruGecmisi, yeniBasvuru]);
      setSeciliIlan(null);
      setIndeksliYayin(null);
      setAtifBelgesi(null);
      setKonferansBelgesi(null);

      alert("Başvurunuz başarıyla alınmıştır. Durum: Beklemede.");
    } else {
      alert("Lütfen tüm belgeleri yükleyin!");
    }
  };

  return (
    <div className="min-h-screen pt-24 p-4 bg-gray-100">

      {/* ÜST HEADER */}
      <div className="flex items-center justify-between bg-white shadow rounded p-4 mb-8 relative">
        <h1 className="text-3xl font-bold text-[#006633] text-center w-full">
          Aday Paneli
        </h1>
        <button
          onClick={handleLogout}
          className="absolute right-6 bg-red-600 hover:bg-red-700 text-white text-lg font-semibold px-6 py-2 rounded"
        >
          Çıkış Yap
        </button>
      </div>

      {/* İLANLAR 3 KATEGORİYE AYRILDI */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">

        {/* Dr. Öğr. Üyesi */}
        <div className="bg-white p-6 rounded shadow">
          <h2 className="text-2xl font-bold text-[#006633] mb-4 text-center">Dr. Öğr. Üyesi</h2>
          {ilanlar
            .filter(ilan => ilan.baslik.includes("Dr. Öğr. Üyesi"))
            .map((ilan) => (
              <div
                key={ilan.id}
                className="p-4 border rounded mb-4 hover:shadow-lg cursor-pointer"
                onClick={() => setSeciliIlan(ilan)}
              >
                <h3 className="text-lg font-semibold text-[#006633]">{ilan.baslik}</h3>
              </div>
            ))}
        </div>

        {/* Doçent */}
        <div className="bg-white p-6 rounded shadow">
          <h2 className="text-2xl font-bold text-[#006633] mb-4 text-center">Doçent</h2>
          {ilanlar
            .filter(ilan => ilan.baslik.includes("Doçent"))
            .map((ilan) => (
              <div
                key={ilan.id}
                className="p-4 border rounded mb-4 hover:shadow-lg cursor-pointer"
                onClick={() => setSeciliIlan(ilan)}
              >
                <h3 className="text-lg font-semibold text-[#006633]">{ilan.baslik}</h3>
              </div>
            ))}
        </div>

        {/* Profesör */}
        <div className="bg-white p-6 rounded shadow">
          <h2 className="text-2xl font-bold text-[#006633] mb-4 text-center">Profesör</h2>
          {ilanlar
            .filter(ilan => ilan.baslik.includes("Profesör"))
            .map((ilan) => (
              <div
                key={ilan.id}
                className="p-4 border rounded mb-4 hover:shadow-lg cursor-pointer"
                onClick={() => setSeciliIlan(ilan)}
              >
                <h3 className="text-lg font-semibold text-[#006633]">{ilan.baslik}</h3>
              </div>
            ))}
        </div>

      </div>

      {/* BAŞVURU FORMU */}
      {seciliIlan && (
        <div className="bg-white p-6 rounded shadow-lg mb-10">
          <h2 className="text-2xl font-bold text-[#006633] mb-4">{seciliIlan.baslik}</h2>

          <div className="mb-4">
            <label className="block text-gray-700 mb-2">İndeksli Yayın Yükle:</label>
            <input
              type="file"
              onChange={(e) => setIndeksliYayin(e.target.files[0])}
              className="border p-2 w-full rounded"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Atıf Belgesi Yükle:</label>
            <input
              type="file"
              onChange={(e) => setAtifBelgesi(e.target.files[0])}
              className="border p-2 w-full rounded"
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 mb-2">Konferans Katılım Belgesi Yükle:</label>
            <input
              type="file"
              onChange={(e) => setKonferansBelgesi(e.target.files[0])}
              className="border p-2 w-full rounded"
            />
          </div>

          <button
            onClick={handleBasvuruYap}
            className="bg-[#006633] hover:bg-[#005122] text-white font-bold px-6 py-3 rounded w-full"
          >
            Başvuru Yap
          </button>
        </div>
      )}

      {/* BAŞVURU GEÇMİŞİ */}
      {basvuruGecmisi.length > 0 && (
        <div className="bg-white p-6 rounded shadow-lg">
          <h2 className="text-2xl font-bold text-[#006633] mb-6">Başvuru Geçmişi</h2>

          {basvuruGecmisi.map((basvuru, index) => (
            <div key={index} className="border p-4 rounded mb-4 bg-gray-50">
              <p><span className="font-bold">İlan:</span> {basvuru.ilanBaslik}</p>
              <p><span className="font-bold">Başvuru Tarihi:</span> {basvuru.tarih}</p>
              <p><span className="font-bold">Durum:</span> {basvuru.durum}</p>
              <p><span className="font-bold">İndeksli Yayın:</span> {basvuru.belgeler.indeksliYayin}</p>
              <p><span className="font-bold">Atıf Belgesi:</span> {basvuru.belgeler.atifBelgesi}</p>
              <p><span className="font-bold">Konferans Katılım:</span> {basvuru.belgeler.konferansBelgesi}</p>
            </div>
          ))}
        </div>
      )}

    </div>
  );
};

export default AdayPaneli;
