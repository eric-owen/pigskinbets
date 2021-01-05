const assert = require('assert');
const UserBet = require('./server.js');
let bet;
beforeEach(() => {
    bet = new Bet({  name: 'Mike' });
    bet.save()
        .then(() => done());
});
describe('Reading the bet details', () => {
    it('finds bets with the name of Mike', (done) => {
        UserBet.findOne({ name: 'Mike' })
            .then((UserBet) => {
                assert(bet.name === 'Mike'); 
                done();
            });
    })
})