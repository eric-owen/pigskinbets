const express = require('express');
const router = express.Router();

const controller = require('../controllers/home');

//Equivalent to app.get('/home')
router.get('/', controller.home); //will display all games that week

module.exports = router;