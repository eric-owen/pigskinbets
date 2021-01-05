const assert = require('assert');
const UserBet = require('./server.js');
describe('Deleting a UserBet', () => {

    let bet;

    beforeEach((done), () => {
        bet = new Bet({ name: 'Mike' });
        bet.save()
        .then(() => done());
    });

    it('removes a UserBet using its instance', (done) => {
        bet.remove()
        .then(() => UserBet.findOne({ name: 'Mike' }))
        .then((UserBet) => {
            assert(UserBet === null);
            done();
        });
    });

    it('removes multiple UserBets', (done) => {
        UserBet.remove({ name: 'Mike' })
        .then(() => UserBet.findOne({ name: 'Mike' }))
        .then((UserBet) => {
            assert(UserBet === null);
            done();
        });
    });

    it('removes a UserBet', (done) => {
        UserBet.findOneAndRemove({ name: 'Mike' })
        .then(() => UserBet.findOne({ name: 'Nike' }))
        .then((UserBet) => {
            assert(UserBet === null);
            done();
        });
    });

    it('removes a UserBet using id', (done) => {
        UserBet.findIdAndRemove(bet._id)
        // the following code block is repeated again and again
        .then(() => UserBet.findOne({ name: 'Mike' }))
        .then((UserBet) => {
            assert(UserBet === null);
            done();
        });
        // block end
    })
})