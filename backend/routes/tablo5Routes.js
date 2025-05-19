const express = require('express');
const router = express.Router();
const { getTablo5 } = require('../controllers/tablo5Controller');

router.get('/:adayId', getTablo5);

module.exports = router;
