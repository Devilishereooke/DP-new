const express = require('express');
const { getReadings, addReading } = require('../controllers/dashboard');

const router = express.Router();

router.route('/').get(getReadings).post(addReading)

module.exports = router