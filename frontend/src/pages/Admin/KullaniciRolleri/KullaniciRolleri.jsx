import { useEffect, useState } from 'react';
import './KullaniciRolleri.css';

function KullaniciRolleri() {
  const [kullanicilar, setKullanicilar] = useState([]);
  const roller = {
    1: 'Aday',
    2: 'Yönetici',
    3: 'Admin',
    4: 'Jüri'
  };

  useEffect(() => {
    fetch('http://localhost:5000/api/admin/kullanicilar')
      .then(res => res.json())
      .then(data => setKullanicilar(data))
      .catch(err => console.error('Kullanıcı çekme hatası:', err));
  }, []);

  const handleRolDegistir = async (id, yeniRol) => {
    try {
      const res = await fetch(`http://localhost:5000/api/admin/kullanicilar/${id}/rol`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ rol_id: parseInt(yeniRol) })
      });

      if (res.ok) {
        const guncellenen = await res.json();
        setKullanicilar(prev =>
          prev.map(k => (k.id === guncellenen.id ? guncellenen : k))
        );
        alert("Rol güncellendi");
      }
    } catch (err) {
      console.error("Güncelleme hatası:", err);
    }
  };

  const handleSil = async (id) => {
    if (!window.confirm("Bu kullanıcıyı silmek istiyor musunuz?")) return;

    try {
      const res = await fetch(`http://localhost:5000/api/admin/kullanicilar/${id}`, {
        method: 'DELETE'
      });

      if (res.ok) {
        setKullanicilar(prev => prev.filter(k => k.id !== id));
      } else {
        alert("Silme işlemi başarısız.");
      }
    } catch (err) {
      console.error("Kullanıcı silme hatası:", err);
    }
  };

  return (
    <div className="roller-page-container">
      <h2 className="roller-title">Kullanıcı Rolleri</h2>
      <div className="roller-container">
        <div className="roller-table">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Ad Soyad</th>
                <th>Email</th>
                <th>Rol</th>
                <th>İşlem</th>
              </tr>
            </thead>
            <tbody>
              {kullanicilar.map(user => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.ad} {user.soyad}</td>
                  <td>{user.email}</td>
                  <td>
                    <select
                      value={user.rol_id}
                      onChange={(e) => handleRolDegistir(user.id, e.target.value)}
                    >
                      {Object.entries(roller).map(([id, ad]) => (
                        <option key={id} value={id}>{ad}</option>
                      ))}
                    </select>
                  </td>
                  <td>
                    <button className="sil-btn" onClick={() => handleSil(user.id)}>Sil</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default KullaniciRolleri;
