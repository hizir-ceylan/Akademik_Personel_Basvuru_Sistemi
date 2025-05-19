const express = require('express');
const router = express.Router();
const kriterController = require('../controllers/kriterController');

router.get('/', kriterController.getKriterler);
router.delete('/:id', kriterController.deleteKriter);
router.put('/:id', kriterController.updateKriter);
router.post('/', kriterController.createKriter);
router.get('/:kadroTuru', kriterController.getKriterlerByKadroTuru);
router.get('/by-ilan/:ilanId', kriterController.getKriterlerByIlanId);

module.exports = router;
