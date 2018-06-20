require('./config/config.js')

const _ = require('lodash');
const {
    ObjectId
} = require('mongodb');
const express = require('express');
const bodyParser = require('body-parser');

const {
    mongoose
} = require('./db/mongoose.js');

const {
    Todo
} = require('./models/todo.js');

const {
    User
} = require('./models/user.js')

const {
    authenticate
} = require('./middleware/authenticate.js');

const app = express();

//Midlleware - mandatory
app.use(bodyParser.json());

//Test
app.get("/", (req, res) => {
    res.send("Hello World");
});

//Resource Creation Endpoint - POST /todos
app.post("/todos", authenticate, (req, res) => {

    //Create Entity
    const Todo1 = new Todo({
        text: req.body.text,
        completed: req.body.completed,
        _creator: req.user._id
    });

    //Save to dB
    Todo1.save().then(doc => {
        res.send(doc);
    }, err => {
        res.status(400).send(err);
    });
});

//List Resources Endpoint - GET /todos
app.get("/todos", authenticate, (req, res) => {

    Todo.find({
        _creator: req.user._id
    }).then(todos => res.send({
        todos
    }), err => res.status(400).send());
});

//Get Individual Resource Endpoint - GET /todos/:id

app.get("/todos/:id", authenticate, (req, res) => {
    const id = req.params.id;

    if (!ObjectId.isValid(id)) {
        return res.status(400).send();
    }

    Todo.findOne({
        _id: id,
        _creator: req.user._id
    }).then(todo => {
        if (!todo) {
            return res.status(404).send();
        }
        res.send({
            todo
        })
    }, err => res.status(400));
});

//Delete Individual Resource Endpoint - DELETE /todos/:id

app.delete('/todos/:id', authenticate, (req, res) => {
    const id = req.params.id;

    if (!ObjectId.isValid(id)) {
        return res.status(400).send();
    }

    Todo.findOneAndRemove({
        _id: id,
        _creator: req.user._id
    }).then(todo => {
        if (!todo) {
            return res.status(404).send();
        }
        return todo.remove();
    }).then(todo => res.status(200).send({
        todo
    })).catch(err => res.status(400).send());
})

//Update individual resource endpoint - PATCH /todos/:id

app.patch('/todos/:id', authenticate, (req, res) => {
    const id = req.params.id;
    const body = _.pick(req.body, ['text', 'completed']);

    if (!ObjectId.isValid(id)) {
        return res.status(400).send();
    }

    if (_.isBoolean(body.completed) && body.completed) {
        body.completedAt = new Date().getTime();
    } else {
        body.completed = false;
        body.completedAt = null;
    }

    Todo.findOneAndUpdate(
        id, {
            $set: body
        }, {
            new: true
        }).then(todo => {
        if (!todo) {
            return res.status(404).send();
        }
        res.status(200).send({
            todo
        });
    }, err => res.status(400).send());
});

// Create User - POST /users

app.post('/users', (req, res) => {

    const body = _.pick(req.body, ['email', 'password']);
    const user = new User(body);

    user.save().then(() => {
        return user.generateAuthToken()
    }).then(token => {
        res.header('x-auth', token).send(user);
    }).catch(err => {
        res.status(400).send();
    })
});

app.get('/users/me', authenticate, (req, res) => {
    res.send(req.user);
});

app.post("/users/login", (req, res) => {
    const body = _.pick(req.body, ['email', 'password']);

    //Check if user exists
    User.findByCredentials(body.email, body.password)
        .then(user => {
            return user.generateAuthToken()
        }).then(token => {
            res.header('x-auth', token).send();
        })
        .catch(err => res.status(400).send({}))
});

app.delete('/users/me/token', authenticate, (req, res) => {
    req.user.removeToken(req.token).then(() => {
        res.status(200).send()
    }).catch(e => res.status(400).send())
})

app.listen(process.env.PORT, () => {
    console.log(`Starting app on port ${process.env.PORT}`);
});

module.exports = {
    app
};