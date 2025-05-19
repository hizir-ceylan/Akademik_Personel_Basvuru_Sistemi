const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const pool = require("../db");
const axios = require("axios");
const xml2js = require("xml2js");

async function kimlikDogrula(tc, ad, soyad, dogumYili) {
  const soapEnvelope = `<?xml version="1.0" encoding="utf-8"?>
    <soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
                   xmlns:xsd="http://www.w3.org/2001/XMLSchema"
                   xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
      <soap:Body>
        <TCKimlikNoDogrula xmlns="http://tckimlik.nvi.gov.tr/WS">
          <TCKimlikNo>${tc}</TCKimlikNo>
          <Ad>${ad.toUpperCase()}</Ad>
          <Soyad>${soyad.toUpperCase()}</Soyad>
          <DogumYili>${dogumYili}</DogumYili>
        </TCKimlikNoDogrula>
      </soap:Body>
    </soap:Envelope>`;

  const response = await axios.post(
    "https://tckimlik.nvi.gov.tr/Service/KPSPublic.asmx",
    soapEnvelope,
    {
      headers: {
        "Content-Type": "text/xml; charset=utf-8",
        "SOAPAction": "http://tckimlik.nvi.gov.tr/WS/TCKimlikNoDogrula",
      },
    }
  );

  const parsed = await xml2js.parseStringPromise(response.data);
  const result = parsed["soap:Envelope"]["soap:Body"][0]["TCKimlikNoDogrulaResponse"][0]["TCKimlikNoDogrulaResult"][0];
  return result === "true";
}

exports.login = async (req, res) => {
  const { tcNo, password } = req.body;
  console.log("Gelen login verisi:", req.body);

  try {
    const result = await pool.query("SELECT * FROM kullanicilar WHERE tc_kimlik_no = $1", [tcNo]);
    const user = result.rows[0];
    console.log("Veritabanından gelen kullanıcı:", user);

    if (!user || user.sifre !== password) {
      console.log("Kimlik bilgileri hatalı");
      return res.status(401).json({ message: "Geçersiz kimlik bilgileri" });
    }

    const token = jwt.sign(
      { userId: user.id, roleId: user.rol_id },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    console.log("Üretilen token:", token);
    return res.json({ token });

  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Sunucu hatası" });
  }
};


exports.register = async (req, res) => {
    console.log("Gelen veri:", req.body);
  const { tcNo, ad, soyad, dogumYili, sifre, email } = req.body;

  try {
    const valid = await kimlikDogrula(tcNo, ad, soyad, dogumYili);
    if (!valid) return res.status(400).json({ message: "Kimlik doğrulama başarısız" });

    const result = await pool.query("SELECT * FROM kullanicilar WHERE tc_kimlik_no = $1", [tcNo]);
    if (result.rows.length > 0) return res.status(400).json({ message: "Bu kullanıcı zaten kayıtlı" });

    await pool.query(
        "INSERT INTO kullanicilar (tc_kimlik_no, ad, soyad, dogum_yili, email, sifre, rol_id, created_at) VALUES ($1, $2, $3, $4, $5, $6, $7, NOW())",
        [tcNo, ad, soyad, dogumYili, email, sifre, 1]
      );      

    res.status(201).json({ message: "Kayıt başarılı" });
  } catch (err) {
    console.error("Register error:", err);
    res.status(500).json({ message: "Sunucu hatası" });
  }
};
