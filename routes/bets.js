const express = require('express');
const router = express.Router();

const controller = require('../controllers/bets');

//Equivalent to app.get('/bets')
router.get('/', controller.games); //will display all games that week

router.post('/', controller.placeBets); //will submit users bets

module.exports = router;