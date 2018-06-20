const {
    ObjectID
} = require('mongodb');
const {
    Todo
} = require('./../../models/todo.js');
const {
    User
} = require('./../../models/user.js');
const jwt = require('jsonwebtoken');

const userIds = [new ObjectID(), new ObjectID()];

const users = [{
        _id: userIds[0],
        email: 'john@example.com',
        password: "userOnePass",
        tokens: [{
            access: 'auth',
            token: jwt.sign({
                _id: userIds[0],
                access: 'auth'
            }, process.env.JWT_SECRET).toString()
        }]
    },
    {
        _id: new ObjectID(),
        email: 'jen@test.com',
        password: "userTwoPass",
        tokens: [{
            access: 'auth',
            token: jwt.sign({
                _id: userIds[1],
                access: 'auth'
            }, process.env.JWT_SECRET).toString()
        }]
    }
]

const todos = [{
        _id: new ObjectID(),
        text: "hello world",
        _creator: userIds[0]
    },
    {
        _id: new ObjectID(),
        text: "I am here",
        _creator: userIds[1]
    }
]

const populateTodos = (done) => {
    Todo.remove({}).then(() => {
        return Todo.insertMany(todos);
    }).then(() => done());
}

const populateUsers = (done) => {
    User.remove({}).then(() => {
        //the middleware that hash the password is not automatically called with insertMany so we have to explicity called saved 

        const userOne = new User(users[0]).save();
        const userTwo = new User(users[1]).save();

        return Promise.all([userOne, userTwo])
    }).then(() => done());
}

module.exports = {
    todos,
    users,
    populateTodos,
    populateUsers
}