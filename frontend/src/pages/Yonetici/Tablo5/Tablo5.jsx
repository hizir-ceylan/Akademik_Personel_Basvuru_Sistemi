import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import '../../../fonts/DejaVuSans-normal.js';
import './Tablo5.css';

const Tablo5 = () => {
  const { adayId } = useParams();
  const [data, setData] = useState({ aday: null, satirlar: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTablo5 = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/tablo5/${adayId}`);
        setData(response.data);
      } catch (error) {
        console.error('Tablo 5 verisi çekilemedi:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTablo5();
  }, [adayId]);

  const toplamPuan = data.satirlar.reduce((acc, satir) => acc + (satir.belgePuani || 0), 0);

  const grupluVeri = data.satirlar.reduce((acc, satir) => {
    if (!acc[satir.kategori]) acc[satir.kategori] = [];
    acc[satir.kategori].push(satir);
    return acc;
  }, {});

  const handlePdfExport = () => {
    const doc = new jsPDF();

    doc.setFont('DejaVuSans');
    doc.setFontSize(12);
    doc.text('TABLO 5', 105, 15, { align: 'center' });
    doc.setFontSize(9);
    doc.text(
      'ÖĞRETİM ÜYELİKLERİNE ATAMA İÇİN YAPILAN BAŞVURULARDA ADAYLARIN YAYIN, EĞİTİM-ÖĞRETİM VE\nDİĞER FAALİYETLERİNİN DEĞERLENDİRİLMESİNE İLİŞKİN GENEL PUANLAMA BİLGİLERİ',
      105,
      22,
      { align: 'center' }
    );

    if (data.aday) {
      doc.text(`Ad Soyad: ${data.aday.ad} ${data.aday.soyad}`, 15, 35);
      doc.text(`Başvurduğu İlan: ${data.aday.baslik}`, 15, 42);
    }

    let y = 50;

    Object.entries(grupluVeri).forEach(([kategori, satirlar]) => {
      doc.setFontSize(11);
      doc.text(`Kategori ${kategori}`, 15, y);
      y += 3;

      autoTable(doc, {
        head: [['Faaliyet No', 'Faaliyet', 'Temel Puan', 'Belgeye Göre Puan']],
        body: satirlar.map(s => [
          s.faaliyet_no ?? '-',
          (s.faaliyet_aciklama || '').replace(/ı/g, 'i').replace(/ğ/g, 'g').replace(/ş/g, 's')
                                     .replace(/ç/g, 'c').replace(/ö/g, 'o').replace(/ü/g, 'u')
                                     .replace(/İ/g, 'I'),
          s.temelPuan,
          s.belgePuani ?? '-'
        ]),
        startY: y + 5,
        styles: { font: 'DejaVuSans', fontSize: 8, cellPadding: 3 },
        columnStyles: { 1: { cellWidth: 100 } },
        headStyles: { fillColor: [0, 153, 102], textColor: 255 },
        theme: 'grid',
        didDrawPage: (data) => {
          y = data.cursor.y + 10;
        }
      });
    });

    doc.setFontSize(11);
    doc.text(`Toplam Puan: ${toplamPuan}`, 15, y + 5);

    doc.save(`tablo5_aday_${adayId}.pdf`);
  };

  if (loading) return <div>Yükleniyor...</div>;
  if (!data.satirlar.length) return <div>Bu adaya ait Tablo 5 bulunamadı.</div>;

  return (
    <div className="tablo5">
      <h2 style={{ textAlign: 'center' }}>TABLO 5</h2>
      <p style={{ textAlign: 'center', fontWeight: 'bold' }}>
        ÖĞRETİM ÜYELİKLERİNE ATAMA İÇİN YAPILAN BAŞVURULARDA ADAYLARIN YAYIN, EĞİTİM-ÖĞRETİM VE DİĞER FAALİYETLERİNİN DEĞERLENDİRİLMESİNE İLİŞKİN GENEL PUANLAMA BİLGİLERİ
      </p>

      {data.aday && (
        <div style={{ marginTop: '20px', marginBottom: '10px' }}>
          <p><strong>Ad Soyad:</strong> {data.aday.ad} {data.aday.soyad}</p>
          <p><strong>Başvurduğu İlan:</strong> {data.aday.baslik}</p>
        </div>
      )}

      <button onClick={handlePdfExport} className="pdf-button">PDF Olarak İndir</button>

      {Object.entries(grupluVeri).map(([kategori, satirlar]) => (
        <div key={kategori} className="kategori-grubu">
          <h2 style={{ marginTop: '30px' }}>Kategori {kategori}</h2>
          <table className="tablo5-tablosu">
            <thead>
              <tr>
                <th>Faaliyet No</th>
                <th>Faaliyet</th>
                <th>Temel Puan</th>
                <th>Belgeye Göre Puan</th>
              </tr>
            </thead>
            <tbody>
              {satirlar.map((satir) => (
                <tr key={satir.id}>
                  <td>{satir.faaliyet_no ?? '-'}</td>
                  <td>{satir.faaliyet_aciklama}</td>
                  <td>{satir.temelPuan}</td>
                  <td>{satir.belgePuani ?? '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}

      <h2 style={{ marginTop: '40px' }}>Toplam Puan: {toplamPuan}</h2>
    </div>
  );
};

export default Tablo5;
