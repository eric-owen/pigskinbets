const express = require('express');
const app = express();
require('dotenv').config();
const PORT = 3000;

const homeRoutes = require('./routes/home');
const betRoutes = require('./routes/bets');
const performanceRoutes = require('./routes/performance');


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

app.get('/google/callback', 
    passport.authenticate('google', { failureRedirect: '/' }),
    function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
});

//Static Files
app.use(express.static('public'))

//Middleware
app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
const isLoggedIn = (req, res, next) => {
    if (req.session.passport && req.session.passport.user) {
        next();
    } else {
        res.redirect('/');
    };
};

//Routes
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