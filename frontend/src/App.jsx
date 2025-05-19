// App.jsx
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Login from "./pages/Login/Login";

// Yonetici Sayfalar
import Dashboard from "./pages/Yonetici/Dashboard/Dashboard";
import IlanYonetimi from "./pages/Yonetici/IlanYonetimi/IlanYonetimi";
import KriterYonetimi from "./pages/Yonetici/KriterYonetimi/KriterYonetimi";
import Basvurular from "./pages/Yonetici/Basvurular/Basvurular";
import BasvuruDetay from "./pages/Yonetici/BasvuruDetay/BasvuruDetay";
import JuriYonetimi from "./pages/Yonetici/JuriYonetimi/JuriYonetimi";
import Tablo5 from "./pages/Yonetici/Tablo5/Tablo5";

// Aday Sayfalar
import AdayDashboard from "./pages/Aday/Dashboard/AdayDashboard";
import Ilanlar from "./pages/Aday/Ilanlar/ilanlar";
import BasvuruYap from "./pages/Aday/Basvuru/BasvuruYap";
import AdaySidebar from "./components/AdaySidebar";

// Admin Sayfalar
import AdminDashboard from "./pages/Admin/AdminDashboard/AdminDashboard";
import AdminBasvuruDetay from "./pages/Admin/AdminBasvuruDetay/BasvuruDetay";
import IlanYonetim from "./pages/Admin/IlanYonetim/IlanYonetim";
import KullaniciRolleri from "./pages/Admin/KullaniciRolleri/KullaniciRolleri";
import YeniIlanEkle from "./pages/Admin/YeniIlanEkle/YeniIlanEkle";
import Navbar from "./components/Navbar";

// Juri Sayfalar
import JuriPaneli from "./pages/Juri/JuriPaneli";
import IlanBasvurulari from "./pages/Juri/IlanBasvurulari";
import JuriDetay from "./pages/Juri/Juridetay";
import JuriSidebar from "./components/JuriSidebar";


import Sidebar from "./components/Sidebar";
import { isAuthorized } from "./utils/auth";
import "./index.css";

function Protected({ children, roleId }) {
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthorized(roleId)) {
      navigate("/login");
    }
  }, [navigate, roleId]);

  return isAuthorized(roleId) ? children : null;
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />

        {/* Aday Paneli */}
        <Route
          path="/aday/*"
          element={
            <Protected roleId={1}>
              <div style={{ display: "flex", height: "100vh" }}>
                <AdaySidebar />
                <main style={{ flex: 1, overflowY: "auto", marginLeft: "250px", padding: "30px" }}>
                  <Routes>
                    <Route path="" element={<AdayDashboard />} />
                    <Route path="ilanlar" element={<Ilanlar />} />
                    <Route path="basvuru/:ilanId" element={<BasvuruYap />} />
                  </Routes>
                </main>
              </div>
            </Protected>
          }
        />

        {/* Yonetici Paneli */}
        <Route
          path="/yonetici/*"
          element={
            <Protected roleId={2}>
              <div style={{ display: "flex", height: "100vh" }}>
                <Sidebar />
                <main style={{ flex: 1, overflowY: "auto", marginLeft: "250px", padding: "30px" }}>
                  <Routes>
                    <Route path="dashboard" element={<Dashboard />} />
                    <Route path="ilan-yonetimi" element={<IlanYonetimi />} />
                    <Route path="kriter-yonetimi" element={<KriterYonetimi />} />
                    <Route path="basvurular" element={<Basvurular />} />
                    <Route path="basvuru-detay/:id" element={<BasvuruDetay />} />
                    <Route path="juri-yonetimi" element={<JuriYonetimi />} />
                    <Route path="tablo5/:adayId" element={<Tablo5 />} />
                  </Routes>
                </main>
              </div>
            </Protected>
          }
        />

        {/* Admin Paneli */}
        <Route
          path="/admin/*"
          element={
            <Protected roleId={3}>
              <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
                <Navbar />
                <main style={{ flex: 1, padding: "80px 20px 20px 20px" }}>
                  <Routes>
                    <Route path="" element={<AdminDashboard />} />
                    <Route path="basvuru-detay/:id" element={<AdminBasvuruDetay />} />
                    <Route path="ilan-yonetim" element={<IlanYonetim />} />
                    <Route path="kullanici-rolleri" element={<KullaniciRolleri />} />
                    <Route path="yeni-ilan-ekle" element={<YeniIlanEkle />} />
                  </Routes>
                </main>
              </div>
            </Protected>
          }
        />

        <Route
          path="/juri-panel/*"
          element={
            <Protected roleId={4}>
              <div style={{ display: "flex" }}>
                <JuriSidebar />
                <main
                  style={{
                    flexGrow: 1,
                    marginLeft: "250px",
                    padding: "30px",
                    minHeight: "100vh",
                    backgroundColor: "#f9f9f9",
                    overflowY: "auto",
                  }}
                >
                  <Routes>
                    <Route path="" element={<JuriPaneli />} />
                    <Route path="ilan-basvurulari" element={<IlanBasvurulari />} />
                    <Route path="juri-detay" element={<JuriDetay />} />
                  </Routes>
                </main>
              </div>
            </Protected>
          }
        />


      </Routes>
    </Router>
  );
}

export default App;
