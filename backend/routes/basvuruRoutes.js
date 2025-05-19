const express = require('express');
const router = express.Router();
const multer = require("multer");

const storage = multer.memoryStorage();
const upload = multer({ dest: "uploads/" });
const basvuruController = require("../controllers/basvuruController");

const {
  getBasvurular,
  getBasvuruById,
  updateBasvuruSonucu,
  getBasvuruDetay,
  getBasvuruSayisiByAdayId
} = require('../controllers/basvuruController');

router.get('/', getBasvurular);
router.get('/:id', getBasvuruById);
router.put('/sonuc/:id', updateBasvuruSonucu);
router.get('/detay/:id', getBasvuruDetay);
router.get('/aday/:adayId', getBasvuruSayisiByAdayId);
router.post("/yeni", upload.array("belgeler"), basvuruController.yeniBasvuru);

module.exports = router;
