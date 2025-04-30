import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import JuriPaneli from "./pages/JuriPaneli";
import AdayPaneli from "./pages/AdayPaneli";
import AdayGiris from "./pages/AdayGiris";
import JuriDetay from "./pages/Juridetay"; // Detay sayfası
import IlanBasvurulari from "./pages/IlanBasvurulari"; // Yeni eklenen sayfa
import Navbar from "./components/Navbar";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/juri" element={<JuriPaneli />} />
        <Route path="/ilan-basvurulari" element={<IlanBasvurulari />} /> {/* 👈 Yeni rota */}
        <Route path="/juri-detay" element={<JuriDetay />} /> {/* 👈 Detay sayfası */}
        <Route path="/aday-giris" element={<AdayGiris />} />
        <Route path="/aday" element={<AdayPaneli />} />
      </Routes>
    </Router>
  );
}

export default App;
