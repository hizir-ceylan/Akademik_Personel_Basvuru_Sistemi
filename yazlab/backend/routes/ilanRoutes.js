const express = require('express');
const router = express.Router();
const ilanController = require('../controllers/ilanController');

router.get('/', ilanController.getIlanlar);

router.post('/', ilanController.createIlan);

module.exports = router;
