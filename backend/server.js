const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const app = express();
require("dotenv").config();
dotenv.config();


app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Backend çalışıyor 🚀');
});

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const dashboardRoutes = require('./routes/dashboardRoutes');
const ilanRoutes = require('./routes/ilanRoutes');
const basvuruRoutes = require('./routes/basvuruRoutes');
const kriterRoutes = require('./routes/kriterRoutes');
const kullaniciRoutes = require('./routes/kullaniciRoutes');
const juriAtamaRoutes = require('./routes/juriAtamaRoutes');
const tablo5Routes = require('./routes/tablo5Routes');
const authRoutes = require("./routes/authRoutes");
const adminDashboardRoutes = require("./routes/dashboard");
const adminIlanlarRoutes = require("./routes/ilanlar");
const adminKullaniciRoutes = require("./routes/kullanicilar");
const adminRollerRoutes = require("./routes/roller");
const juriRoutes = require("./routes/juri");

app.use('/api', juriRoutes);
app.use("/api/auth", authRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/ilanlar', ilanRoutes);
app.use('/api/basvurular', basvuruRoutes);
app.use('/api/kriterler', kriterRoutes);
app.use('/api/kullanicilar', kullaniciRoutes);
app.use('/api/juri-atama', juriAtamaRoutes);
app.use('/api/tablo5', tablo5Routes);
app.use('/api/admin/dashboard', adminDashboardRoutes);
app.use('/api/admin/ilanlar', adminIlanlarRoutes);
app.use('/api/admin/kullanicilar', adminKullaniciRoutes);
app.use('/api/admin/roller', adminRollerRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server çalışıyor: http://localhost:${PORT}`);
});
