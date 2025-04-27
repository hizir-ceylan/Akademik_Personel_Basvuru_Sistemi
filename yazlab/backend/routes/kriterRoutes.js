const express = require('express');
const router = express.Router();
const kriterController = require('../controllers/kriterController');

router.get('/', kriterController.getKriterler);

router.put('/:id', kriterController.updateKriterPuan);

module.exports = router;
