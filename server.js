const express = require('express');
const app = express();
const PORT = 3000;


const betRoutes = require('./routes/bets')

//OAuth Configuration
const OAuth = require('oauth');
const session = require('express-session');

//Middleware
app.set('view engine', 'mustache');
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Routes
app.get('/', (req, res) => {
    res.send({
        message: "website running"
    });
});


app.use('/bets', betRoutes)

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});