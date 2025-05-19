const express = require('express');
const router = express.Router();
const ilanController = require('../controllers/ilanController');

router.get('/', ilanController.getIlanlar);
router.get('/aktif', ilanController.getAktifIlanlar);
router.post('/', ilanController.createIlan);
router.get('/:id', ilanController.getIlanById);

module.exports = router;
