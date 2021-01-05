const assert = require('assert');
const Bet = require('./server.js'); //imports the Bet model.
describe('Creating documents', () => {
    it('creates a new Bet', (done) => {
        //assertion is not included in mocha so 
        //require assert which was installed along with mocha
        const bet = new Bet({ name: 'Money-line' });
        Bet.save() //takes some time and returns a promise
            .then(() => {
                assert(!bet.isNew); //if bet is saved to db it is not new
                done();
            });
    });
});