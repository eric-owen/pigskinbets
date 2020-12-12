const express = require('express');
const router = express.Router();

const controller = require('../controllers/performance');

//Equivalent to app.get('/performance')
router.get('/', controller.performance) //will display users performance

module.exports = router;