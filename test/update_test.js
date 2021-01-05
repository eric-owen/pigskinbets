const assert = require('assert');
const UserBet = require('./server.js');
describe('Udating a UserBet', () => {

    let bet;

    beforeEach((done) => {
        bet = new Bet({ name: 'Mike' });
        bet.save()
        .then(() => done());
    });
    
    function assertHelper(statement, done) {
        statement
        .then(() => betmon.find({}))
        .then((UserBets) => {
        assert(UserBets.length === 1);
        assert(UserBets[0].name === 'Mike');
        done();
        });
    }
    
    it('sets and saves UserBet using an instance', (done) => {
        bet.set('name', 'Mike'); //not updated in mongodb yet
        assertHelper(bet.save(), done);
    });
    
    it('update UserBet using instance', (done) => {
        //useful to update multiple fields of the object
        assertHelper(bet.update({ name: 'Mike' }), done);
    });

    it('update all matching UserBets using model', (done) => {
        assertHelper(UserBet.update({ name: 'bet' }, { name: 'Mike' }), done);
    });

    it('update one UserBet using model', (done) => {
        assertHelper(UserBet.findOneAndUpdate({ name: 'bet' }, { name: 'Mike' }), done);
    });

    it('update one UserBet with id using model', (done) => {
        assertHelper(UserBet.findByIdAndUpdate(bet._id, { name: 'Mike' }), done);
    });
});