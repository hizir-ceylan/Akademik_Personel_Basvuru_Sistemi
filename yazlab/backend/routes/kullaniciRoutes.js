const express = require('express');
const router = express.Router();
const kullaniciController = require('../controllers/kullaniciController');

router.get('/:id', kullaniciController.getKullaniciById);

module.exports = router;
