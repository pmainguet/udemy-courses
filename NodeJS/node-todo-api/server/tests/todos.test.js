const {
    ObjectID
} = require('mongodb');
const request = require('supertest');
const expect = require('expect')
const {
    app
} = require('./../server.js');
const {
    Todo
} = require('./../models/todo.js');

const {
    todos,
    users,
    populateTodos
} =
require('./seed/seed.js');

//Wipe clean the database each time tests are run, and insert some data
beforeEach(populateTodos);

describe('Server tests', () => {
    it('should return hello world', (done) => {
        request(app)
            .get("/")
            .expect(200)
            .expect(res => {
                expect(res.text).toBe('Hello World');
            })
            .end(done);
    })
});

describe('POST /todos', () => {
    it('should create a todo', (done) => {

        const obj = {
            text: "salut",
            _creator: users[0]._id

        }

        request(app)
            .post("/todos")
            .send(obj)
            .set('x-auth', users[0].tokens[0].token)
            .expect(200)
            .expect((res) => {
                //Check response
                expect(res.body.text).toBe(obj.text);
            })
            .end((err, res) => {

                if (err) {
                    return done(err);
                }
                //Check inside database
                Todo.find({
                    text: obj.text
                }).then((todos) => {
                    expect(todos.length).toBe(1);
                    expect(todos[0].text).toBe(obj.text);
                    done();
                }).catch(err => done(err));

            });
    });

    it('should not create a todo with bad data', (done) => {

        const text = ""

        request(app)
            .post("/todos")
            .send({
                text
            })
            .set('x-auth', users[0].tokens[0].token)
            .expect(400)
            .end((err, res) => {

                if (err) {
                    return done(err);
                }
                //Check inside database
                Todo.find({
                    text
                }).then((todos) => {
                    expect(todos.length).toBe(0);
                    done();
                }).catch(err => done(err));

            });
    });
});

describe("GET /todos", () => {
    it('should return list of todos', (done) => {
        request(app)
            .get("/todos")
            .set('x-auth', users[0].tokens[0].token)
            .expect(200)
            .expect(res => {
                expect(res.body.todos.length).toBeGreaterThan(0);
            })
            .end(done);
    });
});

describe("GET /todos/:id", () => {
    it("should return a specific todo", (done) => {
        const testId = todos[0]._id.toHexString();
        request(app)
            .get(`/todos/${testId}`)
            .set('x-auth', users[0].tokens[0].token)
            .expect(200)
            .expect(res => {
                expect(res.body.todo.text).toBe(todos[0].text);
                expect(res.body.todo._id).toBe(testId);
            })
            .end(done);
    });

    it("should return a 401 if not user todo", (done) => {
        const testId = todos[0]._id.toHexString();
        request(app)
            .get(`/todos/${testId}`)
            .set('x-auth', users[1].tokens[0].token)
            .expect(401)
            .end(done);
    });

    it("should return 404 if find nothing", (done) => {
        const testId = new ObjectID().toHexString();
        request(app)
            .get(`/todos/${testId}`)
            .set('x-auth', users[0].tokens[0].token)
            .expect(404)
            .end(done);
    });

    it("should return 400 if id not valid", (done) => {
        const testId = new ObjectID().toHexString() + '111';
        request(app)
            .get(`/todos/${testId}`)
            .set('x-auth', users[0].tokens[0].token)
            .expect(400)
            .end(done);
    });
});

describe("DELETE /todos/:id", () => {
    it("should remove a specific todo", (done) => {
        const testId = todos[0]._id.toHexString();
        request(app)
            .delete(`/todos/${testId}`)
            .set('x-auth', users[0].tokens[0].token)
            .expect(200)
            .expect(res => {
                expect(res.body.todo._id).toBe(testId);
            })
            .end((err, res) => {
                if (err) {
                    return done(err);
                }

                Todo.findById(res.body.todo._id).then(todos => {
                    expect(todos).toNotExist
                    done();
                }).catch(err => done(err));

            });
    });

    it("should return 404 if find nothing", (done) => {
        const testId = new ObjectID().toHexString();
        request(app)
            .delete(`/todos/${testId}`)
            .set('x-auth', users[0].tokens[0].token)
            .expect(404)
            .end(done);
    });

    it("should return 400 if id not valid", (done) => {
        const testId = new ObjectID().toHexString() + '111';
        request(app)
            .delete(`/todos/${testId}`)
            .set('x-auth', users[0].tokens[0].token)
            .expect(400)
            .end(done);
    });
});

describe("PATCH /todos/:id", () => {
    it("should update a specific todo", (done) => {
        const testId = todos[0]._id.toHexString();
        const body = {
            text: "update test",
            completed: true
        }
        request(app)
            .patch(`/todos/${testId}`)
            .send(body)
            .set('x-auth', users[0].tokens[0].token)
            .expect(200)
            .expect(res => {
                expect(res.body.todo._id).toBe(testId);
                expect(res.body.todo.text).toBe(body.text);
                expect(res.body.todo.completed).toBe(body.completed);
                expect(typeof res.body.todo.completedAt).toBe('number');
            })
            .end((err, res) => {
                if (err) {
                    return done(err);
                }

                Todo.findById(res.body.todo._id).then(todos => {
                    expect(todos._id.toHexString()).toBe(testId);
                    expect(todos.text).toBe(body.text);
                    expect(todos.completed).toBe(body.completed);
                    expect(typeof todos.completedAt).toBe('number');
                    done();
                }).catch(err => done(err));

            });
    });
});