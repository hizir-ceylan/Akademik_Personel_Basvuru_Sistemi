import { useState, useEffect } from 'react';
import axios from 'axios';
import './JuriYonetimi.css';

const JuriYonetimi = () => {
    const [ilanlar, setIlanlar] = useState([]);
    const [secilenIlanId, setSecilenIlanId] = useState('');
    const [juriUyeleri, setJuriUyeleri] = useState([]);
    const [atananJuriler, setAtananJuriler] = useState([]);

    useEffect(() => {
        fetchIlanlar();
        fetchJuriUyeleri();
    }, []);

    useEffect(() => {
        if (secilenIlanId) {
            fetchAtananJuriler(secilenIlanId);
        }
    }, [secilenIlanId]);

    const fetchIlanlar = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/juri-atama/ilanlar');
            setIlanlar(response.data);
        } catch (error) {
            console.error('İlanlar çekilemedi:', error);
        }
    };

    const fetchJuriUyeleri = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/juri-atama/juri-uyeleri');
            setJuriUyeleri(response.data);
        } catch (error) {
            console.error('Jüri üyeleri çekilemedi:', error);
        }
    };

    const fetchAtananJuriler = async (ilanId) => {
        try {
            const response = await axios.get(`http://localhost:5000/api/juri-atama/atanan-juriler/${ilanId}`);
            setAtananJuriler(response.data);
        } catch (error) {
            console.error('Atanan jüri üyeleri çekilemedi:', error);
        }
    };

    const handleAta = async (juriId) => {
        try {
            await axios.post('http://localhost:5000/api/juri-atama/ata', {
                ilanId: secilenIlanId,
                juriId: juriId
            });
            alert('Jüri başarıyla atandı!');
            fetchAtananJuriler(secilenIlanId);
        } catch (error) {
            console.error('Atama hatası:', error);
            alert(error.response?.data?.error || 'Bir hata oluştu.');
        }
    };

    const handleJuriSil = async (juriId) => {
        try {
            await axios.delete(`http://localhost:5000/api/juri-atama/sil/${secilenIlanId}/${juriId}`);
            alert('Jüri ataması silindi!');
            fetchAtananJuriler(secilenIlanId);
        } catch (error) {
            console.error('Silme hatası:', error);
            alert('Silme işlemi başarısız.');
        }
    };

    return (
        <div className="juri-yonetimi">
            <h1>Jüri Yönetimi</h1>

            <div className="form-section">
                <label>İlan Seçin:</label>
                <select value={secilenIlanId} onChange={(e) => setSecilenIlanId(e.target.value)}>
                    <option value="">İlan Seç</option>
                    {ilanlar.map((ilan) => (
                        <option key={ilan.id} value={ilan.id}>{ilan.baslik}</option>
                    ))}
                </select>
            </div>

            {secilenIlanId && (
                <>
                    <h2>Jüri Üyeleri</h2>
                    <div className="juri-listesi">
                        {juriUyeleri.map((juri) => (
                            <div key={juri.id} className="juri-karti">
                                <p>{juri.ad_soyad}</p>
                                <button
                                    onClick={() => handleAta(juri.id)}
                                    disabled={atananJuriler.find(a => a.id === juri.id) || atananJuriler.length >= 5}
                                >
                                    {atananJuriler.find(a => a.id === juri.id) ? 'Atandı' : 'Ata'}
                                </button>
                            </div>
                        ))}
                    </div>

                    <h2>Atanan Jüri Üyeleri</h2>
                    <ul className="atanan-juri-listesi">
                        {atananJuriler.map((juri) => (
                            <li key={juri.id}>
                                {juri.ad_soyad}
                                <button
                                    style={{ marginLeft: '10px', backgroundColor: 'red', color: 'white', border: 'none', padding: '5px 10px', borderRadius: '5px', cursor: 'pointer' }}
                                    onClick={() => handleJuriSil(juri.id)}
                                >
                                    Sil
                                </button>
                            </li>
                        ))}
                    </ul>
                </>
            )}
        </div>
    );
};

export default JuriYonetimi;
