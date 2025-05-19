const express = require('express');
const router = express.Router();
const { getKullaniciById } = require('../controllers/kullaniciController');

router.get('/:id', getKullaniciById);

module.exports = router;