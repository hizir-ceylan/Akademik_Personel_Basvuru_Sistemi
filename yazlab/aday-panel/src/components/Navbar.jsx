import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import kouLogo from "../assets/logokou.png";

function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();

  const showBackButton = ["/juri", "/juri-detay", "/ilan-basvurulari"].includes(location.pathname);

  return (
    <div className="fixed top-0 left-0 w-full flex items-center justify-between px-6 h-20 bg-white shadow-md z-50">
      {/* Geri Butonu */}
      {showBackButton ? (
        <button
          onClick={() => navigate(-1)}
          className="bg-green-700 hover:bg-green-800 text-white px-4 py-2 rounded-md text-sm"
        >
          ← Geri
        </button>
      ) : (
        <div></div>
      )}

      {/* Ortalanmış Logo */}
      <div className="absolute left-1/2 transform -translate-x-1/2">
        <img
          src={kouLogo}
          alt="Kocaeli Üniversitesi"
          className="h-14 bg-white rounded-full shadow-md p-1"
        />
      </div>

      {/* Sağ boşluk (simetri) */}
      <div className="w-[72px]"></div>
    </div>
  );
}

export default Navbar;
