import { useEffect, useState } from 'react';

function Roller() {
  const [roller, setRoller] = useState([]);
  const [yeniRol, setYeniRol] = useState('');

  useEffect(() => {
    const fetchRoller = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/roller');
        const data = await res.json();
        setRoller(data);
      } catch (err) {
        console.error("Rol verisi alınamadı:", err);
      }
    };
    fetchRoller();
  }, []);

  const handleRolEkle = async () => {
    if (!yeniRol.trim()) return alert("Rol ismi boş olamaz");

    try {
      const res = await fetch('http://localhost:5000/api/roller', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ rol_adi: yeniRol }),
      });

      if (res.ok) {
        const eklendi = await res.json();
        setRoller(prev => [...prev, eklendi]);
        setYeniRol('');
      } else {
        alert("Rol ekleme başarısız.");
      }
    } catch (err) {
      console.error("Hata:", err);
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 bg-white shadow-lg rounded-lg p-6">
      <h2 className="text-2xl font-bold text-center text-green-800 mb-6">Kullanıcı Rolleri</h2>

      <ul className="space-y-2 mb-6">
        {roller.map((rol) => (
          <li key={rol.id} className="bg-gray-100 p-3 rounded-md text-gray-700 font-medium shadow-sm">
            {rol.rol_adi}
          </li>
        ))}
      </ul>

      <div className="flex flex-col sm:flex-row gap-3">
        <input
          type="text"
          value={yeniRol}
          onChange={(e) => setYeniRol(e.target.value)}
          placeholder="Yeni rol adı giriniz..."
          className="flex-1 border border-gray-300 p-2 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-green-300"
        />
        <button
          onClick={handleRolEkle}
          className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-md shadow"
        >
          Ekle
        </button>
      </div>
    </div>
  );
}

export default Roller;
