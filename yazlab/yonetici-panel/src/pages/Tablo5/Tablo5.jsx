import './Tablo5.css'

const Tablo5 = () => {
  // Örnek puanlar
  const tablo1Puan = 26 // (20 + 6)
  const tablo2Puan = 25 // (15 + 10)
  const tablo3Puan = 8  // (8)
  const tablo4Puan = 9  // (5 + 4)

  const genelToplam = tablo1Puan + tablo2Puan + tablo3Puan + tablo4Puan

  return (
    <div className="tablo5">
      <h1>Tablo 5 – Genel Puan Dağılımı</h1>

      <table className="puan-tablosu">
        <tbody>
          <tr>
            <td>Tablo 1 (Bilimsel Yayınlar)</td>
            <td>{tablo1Puan} puan</td>
          </tr>
          <tr>
            <td>Tablo 2 (Projeler ve Patentler)</td>
            <td>{tablo2Puan} puan</td>
          </tr>
          <tr>
            <td>Tablo 3 (Eğitim-Öğretim Faaliyetleri)</td>
            <td>{tablo3Puan} puan</td>
          </tr>
          <tr>
            <td>Tablo 4 (Bilimsel Etkinlik ve Hizmetler)</td>
            <td>{tablo4Puan} puan</td>
          </tr>
          <tr className="genel-toplam">
            <td><strong>Genel Toplam</strong></td>
            <td><strong>{genelToplam} puan</strong></td>
          </tr>
        </tbody>
      </table>

      <button className="pdf-btn">
        PDF Olarak İndir
      </button>
    </div>
  )
}

export default Tablo5
