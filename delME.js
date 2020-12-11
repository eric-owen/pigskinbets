const mongoose = require('mongoose');
const db = mongoose.connection;
mongoose.connect("mongodb+srv://new-user-13:houston13@pigskinbets.ifnrc.mongodb.net/<dbname>?retryWrites=true&w=majority", {
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
const yourSchema = new mongoose.Schema({
    name: String
});