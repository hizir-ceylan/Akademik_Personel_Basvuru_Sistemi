import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./BasvuruYap.css";

const BasvuruYap = () => {
    const { ilanId } = useParams();
    const navigate = useNavigate();
    const [adayId, setAdayId] = useState(null);
    const [ilan, setIlan] = useState(null);
    const [kriterler, setKriterler] = useState([]);
    const [belgeler, setBelgeler] = useState({});

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            const payload = JSON.parse(atob(token.split(".")[1]));
            setAdayId(payload.userId);
        }

        const fetchIlanVeKriterler = async () => {
            try {
                const ilanRes = await axios.get(`http://localhost:5000/api/ilanlar/${ilanId}`);
                setIlan(ilanRes.data);

                const kriterRes = await axios.get(`http://localhost:5000/api/kriterler/by-ilan/${ilanId}`);
                setKriterler(kriterRes.data);
            } catch (err) {
                console.error("Veriler alınamadı:", err);
            }
        };

        fetchIlanVeKriterler();
    }, [ilanId]);

    const handleBelgeDegis = (kriterId, index, field, value) => {
        setBelgeler(prev => {
            const yeni = { ...prev };
            if (!yeni[kriterId]) yeni[kriterId] = [];
            yeni[kriterId][index] = {
                ...yeni[kriterId][index],
                [field]: value
            };
            return yeni;
        });
    };

    const handleYeniBelgeEkle = (kriterId) => {
        setBelgeler(prev => ({
            ...prev,
            [kriterId]: [...(prev[kriterId] || []), {
                dosya: null,
                aday_aciklama: "",
                yazar_sayisi: 1,
                baslica_yazar_mi: false,
                sorumlu_yazar_mi: false,
                es_katki_var_mi: false,
                derleme_makale_mi: false,
                universite_isbirligi_var_mi: false
            }]
        }));
    };

    const handleBelgeSil = (kriterId, index) => {
        setBelgeler(prev => {
            const yeni = { ...prev };
            yeni[kriterId].splice(index, 1);
            return { ...yeni };
        });
    };

    const handleBasvuruYap = async () => {
        if (!adayId) return alert("Aday bilgisi alınamadı.");
    
        const hasBaslicaYazar = Object.values(belgeler).flat().some(b => b.baslica_yazar_mi);
        const toplamMakaleSayisi = Object.values(belgeler).flat().length;
    
        for (let kriter of kriterler) {
            if (kriter.faaliyet_referans === "Başlıca Yazar" && !hasBaslicaYazar) {
                return alert(`Eksik kriter: ${kriter.faaliyet_referans} - ${kriter.aciklama}`);
            }
    
            if (kriter.faaliyet_referans === "Toplam Makale" && toplamMakaleSayisi < kriter.deger) {
                return alert(`Eksik kriter: ${kriter.faaliyet_referans} - ${kriter.aciklama}`);
            }
        }
    
        for (let kriterId in belgeler) {
            for (let belge of belgeler[kriterId]) {
                if (!belge.dosya) {
                    return alert("Tüm belgeler için dosya seçilmelidir.");
                }
            }
        }
    
        try {
            const formData = new FormData();
            formData.append("aday_id", adayId);
            formData.append("ilan_id", ilanId);
    
            const metaList = [];
    
            kriterler.forEach((kriter, i) => {
                const tablo_satiri_id = 19 + i;
                const belgeListesi = belgeler[kriter.id] || [];
    
                belgeListesi.forEach((belge) => {
                    formData.append("belgeler", belge.dosya);
    
                    metaList.push({
                        tablo_satiri_id,
                        aday_aciklama: belge.aday_aciklama,
                        yazar_sayisi: belge.yazar_sayisi,
                        baslica_yazar_mi: belge.baslica_yazar_mi,
                        sorumlu_yazar_mi: belge.sorumlu_yazar_mi,
                        es_katki_var_mi: belge.es_katki_var_mi,
                        derleme_makale_mi: belge.derleme_makale_mi,
                        universite_isbirligi_var_mi: belge.universite_isbirligi_var_mi
                    });
                });
            });
    
            formData.append("metaBilgi", JSON.stringify(metaList));
    
            await axios.post("http://localhost:5000/api/basvurular/yeni", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
    
            alert("Başvuru başarıyla yapıldı.");
            navigate("/aday");
        } catch (err) {
            console.error("Başvuru gönderilemedi:", err);
            alert("Başvuru sırasında bir hata oluştu.");
        }
    };
    


    return (
        <div className="basvuru-yap">
            <h1>Başvuru Formu</h1>
            <p>İlan No: {ilanId}</p>
            {ilan && <p><strong>Kadro Türü:</strong> {ilan.kadro_turu}</p>}

            {kriterler.length === 0 ? (
                <p>Yükleniyor...</p>
            ) : (
                <form onSubmit={(e) => e.preventDefault()}>
                    {kriterler.map((kriter, i) => (
                        <div key={kriter.id} className="kriter-item">
                            <h4>{kriter.faaliyet_referans} - Asgari Sayı: {kriter.deger}</h4>
                            <p><em>{kriter.aciklama}</em></p>
                            {!(kriter.faaliyet_referans === "Başlıca Yazar" || kriter.faaliyet_referans === "Toplam Makale") && (
                                <button type="button" onClick={() => handleYeniBelgeEkle(kriter.id)}>Belge Ekle</button>
                            )}
                            {(belgeler[kriter.id] || []).map((belge, index) => (
                                <div key={index} className="belge-formu">
                                    <input type="file" onChange={(e) => handleBelgeDegis(kriter.id, index, 'dosya', e.target.files[0])} />
                                    <input type="text" placeholder="Açıklama" onChange={(e) => handleBelgeDegis(kriter.id, index, 'aday_aciklama', e.target.value)} />
                                    <input type="number" min="1" placeholder="Yazar Sayısı" onChange={(e) => handleBelgeDegis(kriter.id, index, 'yazar_sayisi', parseInt(e.target.value))} />
                                    <label><input type="checkbox" onChange={(e) => handleBelgeDegis(kriter.id, index, 'baslica_yazar_mi', e.target.checked)} /> Başlıca Yazar</label>
                                    <label><input type="checkbox" onChange={(e) => handleBelgeDegis(kriter.id, index, 'sorumlu_yazar_mi', e.target.checked)} /> Sorumlu Yazar</label>
                                    <label><input type="checkbox" onChange={(e) => handleBelgeDegis(kriter.id, index, 'es_katki_var_mi', e.target.checked)} /> Eş Katkı</label>
                                    <label><input type="checkbox" onChange={(e) => handleBelgeDegis(kriter.id, index, 'derleme_makale_mi', e.target.checked)} /> Derleme</label>
                                    <label><input type="checkbox" onChange={(e) => handleBelgeDegis(kriter.id, index, 'universite_isbirligi_var_mi', e.target.checked)} /> Üni. İşbirliği</label>
                                    <button type="button" onClick={() => handleBelgeSil(kriter.id, index)}>Sil</button>
                                </div>
                            ))}
                        </div>
                    ))}
                    <button type="button" onClick={handleBasvuruYap}>Başvuruyu Gönder</button>
                </form>
            )}
        </div>
    );
};

export default BasvuruYap;
