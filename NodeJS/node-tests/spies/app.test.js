const expect = require('expect');
const rewire = require('rewire');

const app = rewire('./app.js');

describe('handleSignup', () => {

    //define the spy and "rewire" the db variable with the following mockup
    const db = {
        saveUser: expect.createSpy()
    };
    app.__set__('db', db);

    it('should call the spy correctly', () => {
        const spy = expect.createSpy();
        spy('Andrew');
        expect(spy).toHaveBeenCalledWith('Andrew');
    })

    it('should call saveUser with user object', () => {
        const email = "test@test.com";
        const password = "123456";

        app.handleSignup(email, password);
        expect(db.saveUser).toHaveBeenCalledWith({
            email,
            password
        });
    })
});