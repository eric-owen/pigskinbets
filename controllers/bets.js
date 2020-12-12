let db = [];
let primaryId = 0;
let userId = 0;


exports.games = (req, res) => {
    res.render('bets')
};

exports.placeBets = (req, res) => {
    db.push({
        id: primaryId,
        user: userId,
        betAmount: req.body.betAmount,
        betCategory: req.body.betCategory,
        teamBet: req.body.teamBet
    });
    primaryId++
    userId++

    res.status(200).json({
        message: "Bet placed successfully, GL"
    });
};

