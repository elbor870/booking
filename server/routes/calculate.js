const express = require('express');
const router = express.Router();
const { calculate } = require('../controllers/calculateController');
const { validateCalculate } = require('../middleware/validation');

router.post('/calculate', validateCalculate, calculate);

module.exports = router;
