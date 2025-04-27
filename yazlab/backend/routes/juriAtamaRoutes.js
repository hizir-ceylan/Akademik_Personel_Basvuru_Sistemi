const express = require('express');
const router = express.Router();
const juriAtamaController = require('../controllers/juriAtamaController');

router.get('/ilanlar', juriAtamaController.getIlanlar);

router.get('/juri-uyeleri', juriAtamaController.getJuriUyeleri);

router.get('/atanan-juriler/:ilanId', juriAtamaController.getAtananJuriler);

router.post('/ata', juriAtamaController.ataJuri);

router.delete('/sil/:ilanId/:juriId', juriAtamaController.silJuriAtama);

module.exports = router;
