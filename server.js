const express = require('express');
const app = express();
const PORT = 3000;


const betRoutes = require('./routes/bets')
const performanceRoutes = require('./routes/performance')

//OAuth Configuration
const OAuth = require('oauth');
const session = require('express-session');

app.use(express.static('public'))

//Middleware
app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Routes
app.get('/', (req, res) => {
    res.send({
        message: "website running"
    });
});


app.use('/bets', betRoutes);
app.use('/performance', performanceRoutes);

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});