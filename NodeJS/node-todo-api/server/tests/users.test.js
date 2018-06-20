const expect = require('expect');
const request = require('supertest');

const {
    app
} = require('./../server.js');
const {
    User
} = require('./../models/user.js');

const {
    users,
    populateUsers
} =
require('./seed/seed.js');

//Wipe clean the database each time tests are run, and insert some data
beforeEach(populateUsers);


describe('POST /users', () => {
    it('should post users', (done) => {

        const User1 = {
            email: "machin@machin.com",
            password: '123456'
        }

        request(app)
            .post('/users')
            .send(User1)
            .expect(200)
            .expect(res => {
                expect(res.body.email).toBe(User1.email);
            })
            .end((err, res) => {
                if (err) {
                    return done(err);
                }

                User.find({
                    email: User1.email
                }).then((users) => {
                    expect(users.length).toBe(1);
                    expect(users[0].email).toBe(User1.email);
                    done();
                }).catch(err => done(err));

            });
    });

    it('should not create user if email exists', (done) => {

        const User1 = {
            email: users[0].email,
            password: '123456'
        }

        request(app)
            .post('/users')
            .send(User1)
            .expect(400)
            .end((err, res) => {
                if (err) {
                    return done(err);
                }

                User.find({
                    email: User1.email
                }).then((users) => {
                    expect(users.length).toBe(1);
                    expect(users[0].email).toBe(users[0].email);
                    done();
                }).catch(err => done(err));

            });
    });

    it('should not create user if email or password invalid', (done) => {
        const User1 = {
            email: "machin",
            password: '123456'
        }

        const User2 = {
            email: "machin@machin.com",
            password: '12'
        }

        request(app)
            .post('/users')
            .send(User1)
            .expect(400)
            .send(User2)
            .expect(400)
            .end((err, res) => {
                if (err) {
                    return done(err);
                }

                User.find({
                    email: User1.email
                }).then((users) => {
                    expect(users.length).toBe(0);
                }).then(() => User.find({
                    email: User2.email
                })).then(
                    users => {
                        expect(users.length).toBe(0);
                    }).catch(err => done(err));

            });

        request(app)
            .post('/users')
            .send(User1)
            .expect(400)
            .end((err, res) => {
                if (err) {
                    return done(err);
                }

                User.find({
                    email: User1.email
                }).then((users) => {
                    expect(users.length).toBe(0);
                    done();
                }).catch(err => done(err));

            });
    });

});

describe('GET /users/me', () => {
    it('should return user if authenticated', (done) => {
        request(app)
            .get('/users/me')
            .set('x-auth', users[0].tokens[0].token)
            .expect(200)
            .expect(res => {
                expect(res.body._id).toBe(users[0]._id.toHexString());
                expect(res.body.email).toBe(users[0].email);
            })
            .end(done);
    });
    it('should return 401 if not authenticated', (done) => {
        request(app)
            .get('/users/me')
            .expect(401)
            .expect(res => {
                expect(res.body).toEqual({})
            })
            .end(done);
    });
});

describe('POST /users/login', () => {
    it('should authenticate user', (done) => {

        request(app)
            .post('/users/login')
            .send({
                email: users[1].email,
                password: users[1].password
            })
            .expect(200)
            .expect(res => {
                expect(res.headers['x-auth']).toBeDefined();
            })
            .end((err, res) => {
                if (err) {
                    return done(err);
                }

                User.findById(users[1]._id).then(user => {
                    expect(user.tokens[1]).toMatchObject({
                        access: 'auth',
                        token: res.headers['x-auth']
                    })
                    done();
                }).catch(e => done(e));
            });
    });

    it('should not authenticate user with bad credentials', done => {
        const user1 = {
            email: 'wwwwwwww',
            password: '123456789'
        }

        request(app)
            .post('/users/login')
            .send(user1)
            .expect(400)
            .end(done);
    });
});

describe('DELETE /users/me/token', () => {
    it('should remove auth token on logout', (done) => {
        request(app)
            .delete('/users/me/token')
            .set('x-auth', users[0].tokens[0].token)
            .expect(200)
            .end((err, res) => {
                if (err) {
                    return done(err)
                }

                User.findOne({
                    email: users[0].email
                }).then(user => {
                    expect(user.tokens.length).toBe(0);
                    done();
                }).catch(e => done(e));
            })
    })
})