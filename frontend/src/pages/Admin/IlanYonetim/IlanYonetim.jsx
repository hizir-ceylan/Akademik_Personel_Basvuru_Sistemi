import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './IlanYonetim.css';

function IlanYonetim() {
  const [ilanlar, setIlanlar] = useState([]);
  const [duzenleId, setDuzenleId] = useState(null);
  const [duzenleForm, setDuzenleForm] = useState({
    baslik: '',
    kadro_turu: '',
    fakulte: '',
    baslangic_tarihi: '',
    bitis_tarihi: ''
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchIlanlar = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/admin/ilanlar');
        const data = await res.json();
        setIlanlar(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Veri çekme hatası:", err);
      }
    };
    fetchIlanlar();
  }, []);

  const handleSil = async (id) => {
    if (!window.confirm("Bu ilanı silmek istiyor musunuz?")) return;
    try {
      const res = await fetch(`http://localhost:5000/api/admin/ilanlar/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setIlanlar(prev => prev.filter(i => i.id !== id));
        alert("İlan silindi.");
      } else {
        alert("Silme başarısız.");
      }
    } catch (err) {
      console.error("Silme hatası:", err);
    }
  };

  const handleDuzenleAc = (ilan) => {
    setDuzenleId(ilan.id);
    setDuzenleForm({
      baslik: ilan.baslik,
      kadro_turu: ilan.kadro_turu,
      fakulte: ilan.fakulte,
      baslangic_tarihi: ilan.baslangic_tarihi,
      bitis_tarihi: ilan.bitis_tarihi
    });
  };

  const handleDuzenleKaydet = async () => {
    try {
      const res = await fetch(`http://localhost:5000/api/admin/ilanlar/${duzenleId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(duzenleForm),
      });
      if (res.ok) {
        const guncel = await res.json();
        setIlanlar(prev => prev.map(i => i.id === guncel.id ? guncel : i));
        setDuzenleId(null);
        alert("İlan güncellendi.");
      } else {
        alert("Güncelleme başarısız.");
      }
    } catch (err) {
      console.error("Güncelleme hatası:", err);
    }
  };

  const formatDate = (dateStr) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString('tr-TR');
  };

  return (
    <div className="ilan-container">
      <h2 className="ilan-title">İlan Yönetimi</h2>
      <div className="ilan-list">
        {ilanlar.map((ilan) => (
          <div key={ilan.id} className="ilan-card">
            {duzenleId === ilan.id ? (
              <div className="ilan-form">
                <input className="input" value={duzenleForm.baslik} onChange={e => setDuzenleForm(prev => ({ ...prev, baslik: e.target.value }))} />
                <input className="input" value={duzenleForm.kadro_turu} onChange={e => setDuzenleForm(prev => ({ ...prev, kadro_turu: e.target.value }))} />
                <input className="input" value={duzenleForm.fakulte} onChange={e => setDuzenleForm(prev => ({ ...prev, fakulte: e.target.value }))} />
                <input type="date" className="input" value={duzenleForm.baslangic_tarihi} onChange={e => setDuzenleForm(prev => ({ ...prev, baslangic_tarihi: e.target.value }))} />
                <input type="date" className="input" value={duzenleForm.bitis_tarihi} onChange={e => setDuzenleForm(prev => ({ ...prev, bitis_tarihi: e.target.value }))} />
                <div className="button-group">
                  <button onClick={handleDuzenleKaydet} className="btn green">Kaydet</button>
                  <button onClick={() => setDuzenleId(null)} className="btn gray">İptal</button>
                </div>
              </div>
            ) : (
              <>
                <h3 className="ilan-baslik">{ilan.baslik}</h3>
                <p>{ilan.kadro_turu} - {ilan.fakulte}</p>
                <p className="ilan-tarih">Başvuru: {formatDate(ilan.baslangic_tarihi)} → {formatDate(ilan.bitis_tarihi)}</p>
                <div className="button-group">
                  <button onClick={() => handleSil(ilan.id)} className="btn red">Sil</button>
                  <button onClick={() => handleDuzenleAc(ilan)} className="btn green">Düzenle</button>
                  <button onClick={() => navigate(`/admin/basvurular/${ilan.id}`)} className="btn green">Başvuruları Görüntüle</button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default IlanYonetim;
