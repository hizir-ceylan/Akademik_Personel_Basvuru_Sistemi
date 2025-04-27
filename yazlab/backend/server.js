const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const app = express();

dotenv.config();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Backend çalışıyor 🚀');
});

const dashboardRoutes = require('./routes/dashboardRoutes');
const ilanRoutes = require('./routes/ilanRoutes');
const basvuruRoutes = require('./routes/basvuruRoutes');
const kriterRoutes = require('./routes/kriterRoutes');
const kullaniciRoutes = require('./routes/kullaniciRoutes');
const juriAtamaRoutes = require('./routes/juriAtamaRoutes');

app.use('/api/dashboard', dashboardRoutes);
app.use('/api/ilanlar', ilanRoutes);
app.use('/api/basvurular', basvuruRoutes);
app.use('/api/kriterler', kriterRoutes);
app.use('/api/kullanicilar', kullaniciRoutes);
app.use('/api/juri-atama', juriAtamaRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server çalışıyor: http://localhost:${PORT}`);
});
