const express = require('express');
const app = express();
require('dotenv').config();
const PORT = process.env.PORT || 3000;

const homeRoutes = require('./routes/home');
const betRoutes = require('./routes/bets');
const performanceRoutes = require('./routes/performance');

// // MongoDB database connection
const mongoose = require('mongoose');
const db = mongoose.connection;
mongoose.connect("mongodb+srv://new-user-13:houston13@pigskinbets.ifnrc.mongodb.net/Bets?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
});
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
    console.log("DB connected for real...")
});
const {Schema} = mongoose
const betSchema = new Schema({
    userName: String,
    betType:  String,
    betAmount: Number,
    betTeam: String,
    homeTeam: String,
    awayTeam: String,
    odds: Number,
    risk: Number,
    gameStatus: String,
    potentialWinnings: Number,
    overUnder: String,
    open: Boolean,
    betstatus: String,
    date: { type: Date, default: Date.now },
    hidden: Boolean,
    meta: {
        winings: Number,
        total:  Number
    }
});

const userSchema = new Schema({
    name: String,
    userName: String,
    favTeam: String,
    currentBankRoll: Number,
    history: {
        wins: Number,
        losses: Number,
        totalEarnings: Number,
    },
});
let Bet = mongoose.model('Bet', betSchema);
const User = mongoose.model('User', userSchema);

module.exports = mongoose.model('Bet', betSchema, 'Bet');

//Passport-GoogleOAuth20 Configuration
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const cookieSession = require('cookie-session');
const { home } = require('./controllers/home');

app.use(passport.initialize());
app.use(passport.session());

app.use(cookieSession({
    name: 'pigskinbets-session',
    keys: ['key1', 'key2']
}));

passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(user, done) {
    done(err, user);
});

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.callbackURL
},
function(accessToken, refreshToken, profile, done) {
    // use the profile info (mainly profile id) to check if the user is registered in our DB
    // User.findOrCreate({ googleId: profile.id }, function (err, user) {
        return done(null, profile); //or return done(err, user)
    // });
}
));

app.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

app.get('/google/callback', //change this back to /google/callback
    passport.authenticate('google', { failureRedirect: '/' }),
    function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
});

app.get('/findSomeBetRoute', (req,res) => {
    let findBetsByName = (usersNames,done) => {
        Bet.find({userName: usersNames}, (err, betResults) => {
            if(err){
                console.log(err);
            }else{
                console.log(betResults)
            }
        });
    }
    findBetsByName('Big Money Mike');
    res.status(200).json({
        message: 'These are your current bets',
        body: JSON.stringify(res.data)
    })
})

app.get('/findSomeUserRoute', (req,res) => {
    User.findOne({userName: 'Big Money Mike'}, (err, data) => {
        if(err) {
            console.log(err)
        }else{
            console.log(data)
        }
    })
    res.status(200).json({
        message: `Hello Mike`
    })
});

app.post('/someBetsRoute', (req , res) => {
    // Adding info into database
    const newBet= new Bet({
        userName: req.session.passport.user,
        betType: req.body.data.betType,
        betAmount: req.body.data.risk,
        homeTeam: req.body.data.homeTeam,
        awayTeam: req.body.data.awayTeam,
        gameStatus: req.body.data.gameStatus,
        betTeam: req.body.data.betTeam,
        odds: req.body.data.betsOdds,
        potentialWinnings: req.body.data.potentialWinnings,
        risk: req.body.data.betRisk,
        open: true,
        betStatus: 'pending'
    
    });
        newBet.save(function(err) {
            if (err) return handleError(err);
        });
    res.status(200).json({
        message: "Bet placed successfully, GL",
        body: JSON.stringify(res.data)
    });
})

app.post('/someUserRoute', (req , res) => {
    // Adding info into database
    const newUser= new User({
        name: 'MIke',
        userName: req.session.user,
        favTeam:'',
        currentBankRoll: 10000,
        history: {
            wins: 20,
            losses: 5,
            totalEarnings: 30000,
        },
    });
        newUser.save(function(err) {
            if (err) return handleError(err);
        });

    res.status(200).json({
        message: `Hello Mike, good luck out there!`
    });
});

app.delete('/someDeleteRoute', (req,res) => {
    Bet.findOneAndRemove({ betTeam: req.body.data.betTeam }, (err, data) => {
        if(err) {
            return handleError(err)
        }else {
            console.log(data)
        }
    });
    res.status(200).json({
        message: 'You were takin out of this bet'
    })
})

app.patch('/someUpdateRoute', (req,res) => {
        Bet.findOneAndUpdate({betTeam: 'Cowboys'}, { betTeam: 'Saints'}, { new: true }, (err, data) => {
            if(err){
                console.log(err);
            }else{
                console.log(data)
                data.save()
            }
        }); 
    res.status(200).json({
        message: 'Bet updated Thank You and Good Luck',
        body: res.data
    });
})

app.get('/performance', (req,res) => {
    Bet.find({}, (err, data) => {
        if(err){
            console.log(err);
        }else{
            // console.log(data)
            res.render('performance', {
                array: data,
                user: req.user
            });
        }
    });
})

//Static Files
app.use(express.static('public'))

//Middleware
app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded());
const isLoggedIn = (req, res, next) => {
    if (req.session.passport && req.session.passport.user) {
        next();
    } else {
        res.redirect('/');
    };
};

//Routes
app.use(function(req,res,next){
    req.db = db;
    next();
});
app.use('/', homeRoutes);
app.use('/bets', isLoggedIn, betRoutes);
app.use('/performance', isLoggedIn, performanceRoutes);
app.get('/logout', (req, res) => {
    req.session = null;
    req.logout();
    res.redirect('/');
});

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});


// (function poll(){
// setTimeout(function(){
//     async function getScores(week) {
//             const response = await axios.get(`https://charlotte.rotogrinders.com/sports/nfl/events?key=${API_Key}&week=2020-reg-${week}`);
//             return await response.data.data;
//         };
//         //Setup the next poll recursively
//         poll();
//     },30000);
// })();

