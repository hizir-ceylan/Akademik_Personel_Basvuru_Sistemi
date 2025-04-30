import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdminHome from './pages/AdminHome';
import AddAnnouncement from './pages/AddAnnouncement';
import KriterYonetimi from './pages/KriterYonetimi'; // Burası önemli

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AdminHome />} />
        <Route path="/add-announcement" element={<AddAnnouncement />} />
        <Route path="/kriter-yonetimi" element={<KriterYonetimi />} />
      </Routes>
    </Router>
  );
}

export default App;
