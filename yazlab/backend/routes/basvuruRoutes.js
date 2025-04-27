const express = require('express');
const router = express.Router();
const basvuruController = require('../controllers/basvuruController');

router.get('/', basvuruController.getBasvurular);
router.get('/:id', basvuruController.getBasvuruById);
module.exports = router;
