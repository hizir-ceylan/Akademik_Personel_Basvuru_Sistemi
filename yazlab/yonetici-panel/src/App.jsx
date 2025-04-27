import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Sidebar from './components/Sidebar'
import Dashboard from './pages/Dashboard/Dashboard'
import IlanYonetimi from './pages/IlanYonetimi/IlanYonetimi'
import KriterYonetimi from './pages/KriterYonetimi/KriterYonetimi'
import Basvurular from './pages/Basvurular/Basvurular'
import BasvuruDetay from './pages/BasvuruDetay/BasvuruDetay'
import JuriYonetimi from './pages/JuriYonetimi/JuriYonetimi'
import './index.css'


function App() {
  return (
    <Router>
      <div style={{ display: 'flex', height: '100vh' }}>
        <Sidebar />
        <main style={{ flex: 1, marginLeft: '270px', padding: '30px' }}>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/ilan-yonetimi" element={<IlanYonetimi />} />
            <Route path="/kriter-yonetimi" element={<KriterYonetimi />} />
            <Route path="/basvurular" element={<Basvurular />} />
            <Route path="/basvuru-detay/:id" element={<BasvuruDetay />} />
            <Route path="juri-yonetimi" element={<JuriYonetimi />} />
          </Routes>
        </main>
      </div>
    </Router>
  )
}

export default App
