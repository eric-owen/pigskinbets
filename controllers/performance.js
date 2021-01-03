const mongoose = require('mongoose');
// const db = mongoose.connection;


exports.performance = (req, res) => {

    res.render('performance')
};



exports.list = (req,res) => {
    
    res.render('Bets',{currentBets});
}
