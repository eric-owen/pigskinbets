const mongoose = require('mongoose');
// const db = mongoose.connection;
// mongoose.connect("mongodb+srv://new-user-13:houston13@pigskinbets.ifnrc.mongodb.net/Bets?retryWrites=true&w=majority", {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//     useFindAndModify: false,
//     useCreateIndex: true
// });
// db.on('error', console.error.bind(console, 'connection error:'));
// db.once('open', function() {
//   // we're connected!
//     console.log("DB connected for real...")
// });
const {Schema} = mongoose



// const betSchema = new Schema({
//     userName: String,
//     betType:  String,
//     betAmount: Number,
//     team: String,
//     overUnder: String,
//     open: Boolean,
//     betstatus: String,
//     date: { type: Date, default: Date.now },
//     hidden: Boolean,
//     meta: {
//         winings: Number,
//         total:  Number
//     }
// });

const teamSchema = new Schema({
    teamName: String,
    won: Boolean,
    record: {
        wins: Number,
        losses: Number,
        ties: Number
    },
    confernce: String, 
    division: {
        name: String,
        record: {
            wins: Number,
            losses: Number,
            ties: Number
        }
    },
});

// const userSchema = new Schema({
//     name: String,
//     userName: String,
//     currentBankRoll: Number,
//     history: {
//         wins: Number,
//         losses: Number,
//         totalEarnings: Number,
//     },
// })

// const Bets = mongoose.model('Bet', betSchema);
const Teams = mongoose.model('Team', teamSchema);
// const Users = mongoose.model('User', userSchema);

// const small = new Bets({
//     userName: 'Big Money',
//     betType: 'small bet',
//     betAmount: 200,
//     team: 'SeaHawks',
//     open: true,
//     betstatus: 'pending'

// });
//     small.save(function(err) {
//         if (err) return handleError(err);
//     });

