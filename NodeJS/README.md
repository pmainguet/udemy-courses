# TABLE OF CONTENTS

- [0 - SETUP NODE AND WHY NODE](#0)
- [A - NODE JS FUNDAMENTALS](#a)

NEW PROJECT

- Create folder and initialize npm via _npm init_
- Create app.js

Source: https://www.udemy.com/the-complete-nodejs-developer-course-2/

# <a name="0"></a> 0 - SETUP NODE AND WHY NODE

## SETUP

- Install node globally on the machine (use node v10 for the course)

  - download latest version on nodejs.org and install npm
  - update node and/or use node version manager n

            npm install -g n
            n 0.8.14
            n latest

## WHAT IS NODE ?

- Javascript runtime build on Chrome's V8 engine (open source JS engine written in C++) that allow JS code to be run on a machine instead of the browser. It takes JS code and compile it to machine code (via V8's C++ routines)
- you can make web server with node as well as application that interacts with filesystem
- Node CLI: type node in terminal and interact with it

### Differences between JS in browser and JS in NodeJS

- In browser, global variable is object window, and document stores the DOM
- In node, it's global, similar to the window object, process is similar to document as it stores specific information about the process that is currently ran

### Examples of NodeJS terminal command

        //Exit a process without error
        process.exit(0)

## Why use Node

- "NodeJS uses an event-driven, non-blocking I/O model (from the ground-up) that makes it lightweight and efficient"

  - I/O (input/output): something that your app does all the time when reading or writing to a database
  - non-blocking: request does not block each others (it does not make the I/O operations faster, it just does not block other operations, so the entire app is faster)
    Explanation: https://www.udemy.com/the-complete-nodejs-developer-course-2/learn/v4/t/lecture/5525228?start=500

              //Example of blocking code
              var getUserSync = require('./getUserSync');
              var user1 = getUserSync('123');
              console.log('user1',user1);
              var user2 = getUserSync('321');
              console.log('user2',user2);
              var sum = 1+2;
              console.log('the sum is ' + sum)

              //Example of non-blocking code
              var getUserSync = require('./getUser');

              getUser('123',function(user){
                  console.log('user1',user);
              })

              getUser('321',function(user){
                  console.log('user2',user);
              })

              var sum = 1+2;
              console.log('The sum is ' + sum);

    For the blocking code to be able to process the two getUserSync call concurrently, it would need to start another thread. NodeJS is single threaded which means that the app runs on a single thread, so you can't use this strategy , which nonetheless does not scale up well, CPU and RAM wise, and is a waste of ressources as the second thread stay mostly idle during the entire process. You have to rely on callback functions and the event loop of NodeJS to be faster and more efficient on ressources.

* It uses npm as its package ecosystem, the largest of open source libraries in the world. As nodejs is built non blocking from the ground up, you can use any npm package and rely on a non blocking philosophy.

## Useful utilities/packages

- lodash: https://lodash.com/: isString, uniq, ...

# <a name="a"></a> A - NODE JS FUNDAMENTALS

- _require_ allow to use third parties or separate files inside our app
  - built-in modules: list on https://nodejs.org/api

* Examples

  - require built-in modules or third party module (via npm)

          const fs = require('fs'); //filesystem
          const os = require('os');

  - require own files

          const notes = require('./notes.js');

## Differences between CommonJS _require_ used in NodeJS and ES6 export/import

- Not all JS engine natively supports ES6 modules. Babel is then used to converts import and export declaration to CommonJS (require/module.exports) by default anyway.

        //CommonJS
        //const module = { exports: {} }; => we have access to this object in node

        module.exports.test = () => {...};

        module.exports = {
            addNote: addNote
        };

        const module = require ('module')
        module.test()

        //ES6
        export default const module = () =>{...}

        import module from './module'

## Debugging node apps

## VIA CLI

        node inspect app.js

        list(10) => list 10 first line
        n        => next statement
        c        => continue until next line break
        repl     => Read-Eval-Print-Loop to evaluate variables

        // you can add the following statement in file, to create a line break in debug mode + c

        debugger;

## CHROME DEV TOOLS

- _debugger_ work the same on dev tool
- use _nodemon --inspect-brk app.js_ in cli
- in chrome, navigate to chrome:://inspect

# <b name="b"></b> B - ASYNCHRONOUS & APIs

- fetch is not available in nodejs (as it is a Web API of the browser), you can use the _request_ package, a simplified HTTP client

* If problems with parsing response, check if you specified headers.accept

             request({
                url: query,
                json: true
                }, (error, response, body) => {
                console.log(body);
             });

- HTTP Response are made up by
  - Status Code: 200, everything OK, 404 Page not found ...
  - Request:
  - Headers: headers of a request specify what type of response we accept for example, headers of a response is set by the contacted API
  - Body

## Abstract callbacks

- If you need to abstract your console.log for error messages and result

        //call the function
        geocode.geocodeAddress(argv.a, (errorMessage, result) => {
        if (errorMessage) {
                console.log(errorMessage);
        } else {
                console.log(JSON.stringify(result, undefined, 2));
        }
        });

        //implement callbacks
        const geocodeAddress = (address, callback) => {
                ...
                request({
                        url: query,
                        json: true
                }, (error, response, body) => {
                        if (error) {
                                callback('Error with Google servers');
                        } else {
                        try {
                                ...
                                callback(undefined, [formattedAddress, lat, lon])
                                ...
                });
        }

# <a name=""></a> XXX - WEB SERVER AND EXPRESS

For additional info, http://expressjs.com

- We have to install body-parser library alongside express. It takes a string body (from the Response), turns it into a javascript objectand make it accessible in request.body.

        const bodyParser = require('body-parser');
        app.use(bodyParser.json());
        ...
        app.get(...,(req,res) =>
                console.log(req.body);
        );

## Start server and bind it to a port

                const express = require('express');
                var app = express();
                app.listen(3000, () => {
                        console.log('Server is up on port 3000')
                });

- Then start via CLI and navigate to http://localhost:3000
- Express automatically defines the Content-Type header of the server response application/json for JSON, text/html for HTML ...

## Routing

- https://expressjs.com/en/guide/routing.html

                //Routing, define what a GET request to homepage returns
                app.get('/', (request, response) => {
                resquest.send('Hello Express');
                });

## Setup a static directory (so you don't have to define route for every files)

- Add following line on top of other app.get command

                app.use(express.static(__dirname + './public'));

                then all files in public are accessible like http://localhost:3000/help.html

## Rendering Templates with Data

- Use templating engine Handlebars (http://handlebarsjs.com/) but it is possible to use others like Pug, EJS, Mustache

        npm install hbs --save

        const hbs = require('hbs');
        app.set('view engine','hbs');

- Use a _views_ folder (express look by default in this folder) and create template for page with \*.hbs extension

        //In template
        <body>
        <h1>{{pageTitle}}</h1>
        <p>{{content}}</p>
        <footer>
                Copyright PM {{currentYear}}
        </footer>
        </body>

        //in server.js
        app.get('/about', (req, res) => {
        res.render('about.hbs', {
                pageTitle: 'About',
                currentYear: new Date().getFullYear(),
                content: 'welcome to our About page'
        })
        })

### Partials

- Partials are part of a page that need to be implemented in many different pages
- First register partials folder

        hbs.registerPartials(\_\_dirname + '/views/partials');

- if /views/partials/footer.js exists, you use the following to include in other .hbs file

        {{> footer}}

- Handlebars helpers: ways to register functions to run to dynamically create some output

        //First register helper

        hbs.registerHelper('getCurrentYear', ()=>{
                return new Date().getFullYear();
        })

        hbs.registerHelper('screamIt', (text) => {
        return text.toUpperCase();
        })

        //you can then use {{currentYear}} in templates and don't have to pass it via the .get

        {{getCurrentYear}}

        {{screamIt name}}

## Express Middleware

- Middleware functions are functions that have access to the request object (req), the response object (res), and the next function in the application’s request-response cycle.
- The next function is a function in the Express router which, when invoked, executes the middleware succeeding the current middleware.
- Middleware functions can perform the following tasks:

  - Execute any code.
  - Make changes to the request and the response objects.
  - End the request-response cycle.
  - Call the next middleware in the stack.

- If the current middleware function does not end the request-response cycle, it must call next() to pass control to the next middleware function. Otherwise, the request will be left hanging.

- You register a middleware via _app.use_

        var myLogger = function (req, res, next) {
                console.log('LOGGED')
                next()
        }

        app.use(myLogger)

## Adding Version Control & deploying your app

- Initialize repo

                git init
                git add
                git commit
                git pull/push

- Setting up GitHub & SSH Keys

  - Check if keys in ~/.ssh
  - Generating a key ssh-keygen -t rsa -b 4096 -C 'pierre@aupasdecourses.com'
  - Tell ssh-agent where the key lives
    eval "$(ssh-agent -s)"
    ssh-add ~/.ssh/id_rsa
  - Copy id_rsa.pub in GitHub
  - run ssh -T git@github.com to check if everything work
  - Clone repository: NOTA: in order for SSH keys to work you have to use the git@github.com:pmainguet/udemy-courses.git url not the https version.

## Deploying app on Heroku

- Heroku is a web app for managing web applications that are hosted in the cloud
- Install Heroku CLI Tool, install via command line (see instructions on website)
- Login with _heroku login_
- Setup SSH key _heroku keys:add_ and check with _ssh -v git@heroku.com_
- add variable in order for Heroku to dynamically set port

                const port = process.env.PORT || 3000;

- Inside of _package.json_, add in "scripts" a new script called "start" (name is important)

                "scripts":{
                        ...
                        "start": "node server.js"
                }

- commit modification with git
- use _heroku create_ and _git push heroku master_ commands to deploy app to Heroku
- type _heroku open_
- configure DNS to customize URL

## Setting up ES6 support and MongoDB for Heroku

- Setup ES6 support

                //package.json
                "engines":{
                        "node":"10.2.1"
                }

- Setting up MongoDB:

  - Go to dashboard.heroku.com, click in the app if you already deployed it
  - Click on "Add-on", select "mLab MongoDB" and provision add on to the app,
  - In the CLI, type \_heroku addons:create mongolab:sandbox\_
  - Type _heroku config_ to get a list of all config var, and get _MONGODB_URI_
  - in mongoose.js, add the following code

                const MONGODB_URI = process.env.<name of the variable via heroku config> || 'mongodb://localhost:27017/TodoApp'

  - push app to heroku, _git push heroku master_
  - you can check logs from heroku via _heroku logs_

# <a name=""></a> XXX - TESTING YOUR APPLICATION

- Install Mocha framework to test apps _npm i --save-dev mocha_
- create next to the file you want to test a file with the same name but with \*.test.js extension, to add test case.
- Configure "scripts" section of package.json

                "scripts":{
                        ...
                        "test": "mocha **/*.test.js"
                }

- Watch and auto restart test on file change

                nodemon --exec 'npm test'

                //or in package.json
                "scripts":{
                        ...
                        "test": "mocha **/*.test.js",
                        "test-watch": "nodemon --exec 'npm test'"
                }

## Manually defines test cases

                const utils = require('./utils');

                it('should add two numbers', () => {
                        const res = utils.add(33, 11);
                        if (typeof (res) !== 'number') {
                                throw new Error('does not return two numbers');
                        }
                });

## Use an assertion library

- Assertion libraries let us make assertions about values whether it's about their type, the value itself ...
- We use Expect library: https://github.com/mjackson/expect (warning we use expect@1.20.2, changes have been made for 2.x versions, see GitHub)

                const expect = require('expect');
                expect(res).toBe(44).toBeA('number').toNotBe(12);

- toBe and toNotBe do not work great for arrays and objects, use .toEqual or .toNotEqual in this case
- toInclude and toExclude for array value check and object method check

## Test asynchronous code

- use the done(); function in test to let mocha now when an async call has returned

                //utils.js
                module.exports.asyncAdd = (a, b, callback) => {
                        setTimeout(() => {
                                callback(a + b);
                        }, 1000);
                }

                //utils.test.js
                it('should add two numbers async', (done) => {
                        const res = utils.asyncAdd(33, 11, sum => {
                                expect(sum).toBe(44).toBeA('number');
                        });
                        done();
                });

## Testing Express applications

- We use library supertest https://github.com/visionmedia/supertest, after setting up an Express web server

                const request = require('supertest');
                const app = require('./server.js').app;

                it('should return hello world', (done) => {
                        request(app)
                        .get('/')
                        .expect('Content-Type', /html/)
                        .expect(200)
                        .end(done);
                });

- you can pipe in the expect library within supertest

                const request = require('supertest');
                const expect = require('expect')
                const app = require('./server.js').app;

                it('should return hello world', (done) => {
                request(app)
                        .get('/')
                        .expect((res) => {
                        expect(res.text).toBeA('string');
                        })
                        .expect('Content-Type', /html/)
                        .expect(200)
                        .end(done);
                });

## Organizing Test with describe()

- describe is a Mocha function that let group tasks together to make it easier to scan their output.

                describe('Utils', () => { <tests>});

## Test spies (Expect utility)

- When you have nested function and you want to only test the outer function, you can use Spies to swap out the real nested function for a testing utility. We also use Rewire library to swap out variables for tests

                //in app.js
                const db = require('./db.js')           => we don't care about the implementation of db
                const handleSignup = (email, password) => {
                        db.saveUser({
                                email,
                                password
                        })
                }

                //in app.test.js
                const expect = require('expect');
                const rewire = require('rewire');

                //we allow app.js to be rewired
                const app = rewire('./app.js');

                describe('handleSignup', () => {
                        //we define the spy and "rewire" the db variable with the following mockup
                        const db = {
                                saveUser: expect.createSpy()
                        };
                        app.__set__('db', db);

                        it('should call the spy correctly', () => {
                                const spy = expect.createSpy();
                                spy('Andrew');
                                expect(spy).toHaveBeenCalledWith('Andrew');
                        })

                        //we define the test
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

# <a name=""></a> XXX - MongoDB, Mongoose and REST APIs

- MongoDB: NoSQL Database
- Mongoose, library to help use MongoDB

## Differences between SQL and NoSQL database

- In a SQL database, the data is structured in a TABLE with ROW/RECORDS. SQL is SCHEMA-BASED via COLUMNS: each records have the same properties (columns)
- In a NoSQL, the data is stored as a COLLECTION, an array-like structure with individual DOCUMENT. The documents do not need to share the same schema with the same properties. The properties of a document are called FIELDS.
- Unlike with other database manager, you don't need to create a database before you start using it in MongoDB, but MongoDB won't create it until we start adding data to it.

## MongoDB

### Install on local machine

- Download https://www.mongodb.com/dr/fastdl.mongodb.org/linux/mongodb-linux-x86_64-ubuntu1604-3.6.5.tgz/download
- Extract and rename folder to mongo in user folder
- Create mongo-data folder next to the mongo folder, that gonna store the actual data
- Go to mongo/bin
- Start the database by typing _./mongod --dbpath ~/mongo-data_, last line should be "waiting for connections on port 27017"
- In an other tab, type ./mongo, and we connect to the database, examples of commands below

                db.Todos.insert({text: 'Film new node course'});
                db.Todos.find();

- You can use RoboMongo to have a graphical interface to interact with the database https://robomongo.org

### Connecting to Mongo and Write data

- We use mongodb native library to connect to the database within NodeJS: https://github.com/mongodb/node-mongodb-native

                //CLI
                npm install mongodb --save

                //JS File
                const MongoClient = require('mongodb').MongoClient;
                MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
                        if (err) {
                                return console.log('Unable to connect to MongoDB server');
                        }
                        console.log('Connected to MongoDB server');

                        const db = client.db('TodoApp');

                        db.collection('Todos').insertOne({
                                text: 'SOmething to do',
                                completed: false
                        }, (err, result) => {
                                if (err) {
                                return console.log('Unable to insert todo', err);
                                }
                                console.log(JSON.stringify(result.ops, undefined, 2));
                        })

                        client.close();
                });

### The ObjectId

- The ObjectId is not an autoincrementing integer like for MySQL. IT is a randomly generated string that you don't need to check over if you have multiple databases.
- It is a 12 bytes value:

  - The four first bytes are the timestamp, so we don't need to use a created_at field as it is already encoded in the Id

                result.ops[0]._id.getTimestamp();

  - The next 3 bytes are a machine identifier
  - The next 2 bytes are the process id
  - The last 3 bytes are a counter like MySQL would do

- Even if it is automatically created you can add the \_id field in your object during creation
- You can import the ObjectID in order to use it whenever you want in your code

                const {MongoClient, ObjectID} = require('mongo);
                const obj = new ObjectID();

### Fetching data

                const {
                        MongoClient
                } = require('mongodb');

                MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
                        if (err) {
                                return console.log('Unable to connect to MongoDB server');
                        }
                        console.log('Connected to MongoDB server');

                        const db = client.db('TodoApp');

                        db.collection('Todos').find().toArray().then((result) => console.log(result));


                        client.close();
                });

- Query with find()

                //By Property
                db.collection('Todos').find({
                        completed: false
                })

                //By Id
                db.collection('Todos').find({
                        _id: new ObjectID('5b228ac822908970579b6b16')
                })

- You can find additional methods (like count) for what is returned by find() (a Cursor object) in the doc of mongodb-native

### Delete Documents

                //deleteMany => delete all records matching criteria
                db.collection('Todos').deleteMany({
                        "text": "example of text"
                }).then(res => console.log(res));

                //deleteOne => delete one specific record
                db.collection('Todos').deleteOne({
                        _id: new ObjectID('5b229003b4979ddfdca8e86a')
                }).then(res => console.log(res));

                //findOneAndDelete => delete the first item matching the criteria
                db.collection('Todos').findOneAndDelete({
                "completed": false
                }).then(res => console.log(res));

### Updating Data

                db.collection('Users').findOneAndUpdate({
                        _id: new ObjectID("5b228efc08a33c78228c4f97")
                        }, {
                                $set: {
                                        "name": "Jean23"
                                }
                        }, {
                        returnOriginal: false
                }).then(res => console.log(res));

- Update Operators in Mongo-DB
  - _$set_ set the value of a field in a document
  - _$unset_ removes the specified field from a document
  - _$rename_ renames a field
  - And many more: https://docs.mongodb.com/manual/reference/operator/update/

## The Mongoose ORM

- ORM: Object Relational Mapping, allow to simplify operations with the DB, and add additional functionalities like validation. It provides a straight-forward, schema-based solution to model your application data. It includes built-in type casting, validation, query building, business logic hooks and more, out of the box.
- With Mongoose, we don't have to micromanage the order things happen.
- MongoDB can use callbacks but it is better to use Promises.
- The connection to the database with Mongoose is similar compare to straight MongoDB library.

### Setting up Mongoose & saving first items to db (POST)

- http://mongoosejs.com
- npm i mongoose --save
- In a regular mongodb, a collection can have documents with different properties (schema), but mongoose like to keep it a little more organized. We have to create MODEL for everything we want to store in the DB, that will have certain attributes/properties

                const mongoose = require('mongoose');

                //Tell Mongoose which Promises library to use
                mongoose.Promise = global.Promise;

                //Connect to the database
                mongoose.connect('mongodb://localhost:27017/TodoApp');

                //Create model => the second argument is equivalent to new Schema({...})
                const ToDo = mongoose.model('Todo', {
                        text: {
                                type: String
                        },
                        completed: {
                                type: Boolean
                        },
                        completedAt: {
                                type: Number
                        }
                });

                //Create new Entity
                const newTodo = new ToDo({
                text: 'Cook dinner',
                });

                //Save entity to db
                newTodo.save().then(doc => console.log('Save Todo: ', doc), e => console.log('Error: ', e));

### Validators, Types and Defaults

- Validators: http://mongoosejs.com/docs/validation.html
- Types: http://mongoosejs.com/docs/schematypes.html
- Defaults: http://mongoosejs.com/docs/api.html#schematype_SchemaType-default

### Mongoose Find Queries and ID Validation (GET)

                const id = "5b23e9619b5e7e7bbf9b6c2e";

                if (!ObjectID.isValid(id)) {
                        console.log('id is not valid')
                }

                //FIND - Find with id (no need for new ObjectId() as with plain MongoDB)
                Todo.find({
                        _id: id
                }).then((res) => console.log(res)).catch(err => console.log('Error with request', err.message));

                //FINDONE - Find the first item which match criteria
                Todo.findOne({
                        text
                }).then((res) => console.log(res)).catch(err => console.log('Error with request', err.message));

                //FINDBYID - Simplified version
                Todo.findById(id).then((res) => {
                        if (!res) {
                                return console.log(`Error! There is nothing in the database matching id of ${id}`)
                        }
                        console.log(res)
                }).catch(err => console.log('Error with request', err.message));

## Delete document with Mongoose (DELETE)

                //deleteMany - delete all documents that satisfy the criteria
                Todo.deleteMany({
                text: 'dfdfdsfdsfs'
                }).then((res) => console.log(res));

                //deleteOne - delete the first document that satisfy the criteria
                Todo.deleteOne({
                text: 'dfdfdsfdsfs'
                }).then((res) => console.log(res));

- Others are available

                Todo.remove({...})
                Todo.findOneAndRemove({...})
                Todo.findByIdAndRemove()

## Update document with Mongoose (PATCH)

- Install lodash library
- In order to select the property a user can setup we use the \_pick property to parse the body of the request

                const body = _.pick(req.body, ['text', 'completed']);

## Create a Test Database

- First you need to set up the NODE_ENV variable. On top of the server.js file add (and make appropriate change in code)

                const env = process.env.NODE_ENV || "development";

                if (env === 'development') {
                        process.env.PORT = 3000;
                        process.env.MONGOLAB_OLIVE_URI = 'mongodb://localhost:27017/TodoApp';
                } else if (env === 'test') {
                        process.env.PORT = 3000;
                        process.env.MONGOLAB_OLIVE_URI = 'mongodb://localhost:27017/TodoAppTest';
                }

- In package.json, change scripts

                "scripts": {
                        "test": "export NODE_ENV=test || SET \"NODE_ENV = test\" && mocha server/**/*.test.js",
                        "test-watch": "nodemon --exec 'npm test'",
                        "start": "node server/server.js"
                },

## Install and configure POSTMAN to work with API

- Install via https://www.getpostman.com
- You can define Postman Environments, to easily switch between dev and prod environment
  - copy url and go to Manage Environment dropmenu on the top right
  - Create Two environment with "url" key and the url for the considered environment (local or remote)
  - In Postman Collection, select each saved request and change url with {{url}}
  - To switch between Environment, use the dropdown menu at the top right
- Use environment variable to set headers for example

  - Switch to the "Test" tab and set some code that gonna run after the request

                var token = postman.getResponseHeader('x-auth');
                postman.setEnvironmentVariable('x-auth',token);

  - Use {{token}} variable in headers
  - You can also set a _lastid_ variable for GET /todos/:id request, in "Test" tab of POST /todos

                const body = JSON.parse(responseBody);
                postman.setEnvironmentVariable('todoId', body._id);

# <a name=""></a> XXX - Creation of a REST API

- First refactor code to separate db configuration, models and controller

## Resources

### Create Resource Creation Endpoint - POST /todos

                app.post("/todos", (req, res) => {
                        //Create Entity
                        const Todo1 = new Todo({
                          text: req.body.text,
                          completed: req.body.completed
                        });

                        //Save to dB
                        Todo1.save().then(doc => {
                          res.send(doc);
                        }, err => {
                          res.status(400).send(err);
                        });
                });

### Create List Resources Endpoint - GET /todos

                app.get("/todos", (req, res) => {
                  Todo.find().then(todos => {
                    res.send({todos});
                  }, err => {
                    res.status(400).send(err);
                  });
                });

### Create Get Individual Resource Endpoint - GET /todos/:id

                app.get("/todos/:id", (req, res) => {
                        const id = req.params.id;

                if (!ObjectId.isValid(id)) return res.status(400).send();

                Todo.findById(id).then(todo => {
                        if (!todo) {
                                return res.status(404).send();
                        }
                                res.send({todo});
                }, err => res.status(400));
                });

### Create Delete Individual Resource Endpoint - DELETE /todos/:id

                app.delete("/todos/:id", (req, res) => {
                const id = req.params.id;

                if (!ObjectId.isValid(id)) return res.status(400).send();

                Todo.findByIdAndRemove(id).then(todo => {
                        if (!todo) return res.status(404).send();
                        res.status(200).send({todo});
                }, err => res.status(400).send());
                })

### Create Update Individual Resource Endpoint - PATCH /todos/:id

                app.patch('/todos/:id', (req, res) => {
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

                Todo.findByIdAndUpdate(id, {$set: body},{new: true})
                        .then(todo => {
                                if (!todo) {
                                        return res.status(404).send();
                                }
                                res.status(200).send({todo});
                        }, err => res.status(400).send());
                })

## Manage users

### Set up Users Model

- Need to have a valid email, encrypt password (via bcrypt hash encryption), and have login tokens (encrypt string that gonna pass in each request to get resources)

                //User model
                {
                        email: 'toto@test.com',
                        password: 'fdkhgdfkjgdfgkpirowmlqù',
                        tokens: [
                                {
                                        access:'auth',
                                        token: 'rdfgàçrdisojsdgkjlkglklj'
                                }
                        ]
                }

- For email validation, we use moongoose custom validation (see http://mongoosejs.com/docs/validation.html) with the npm library _validator_ (https://www.npmjs.com/package/validator)

                npm i -save validator

                const User = mongoose.model('User', {
                        email: {
                                type: String,
                                required: true,
                                minlength: 1,
                                trim: true,
                                unique: true,
                                validate: {
                                validator: validator.isEmail,
                                message: '{VALUE} is not a valid email'
                                },
                        },
                        password: {
                                type: String,
                                required: true,
                                minlength: 6,
                        },
                        tokens: [{
                                access: {
                                type: String,
                                required: true,
                                },
                                token: {
                                type: String,
                                required: true,
                                }
                        }]
                });

- It is better for reusability to use Schema, and we can then add instance methods to the schema.

                const UserSchema = mongoose.Schema({
                        email: ...,
                        password: ...,
                        tokens: ...
                }

                UserSchema.methods.xxx

### Hashing and JSON Web Tokens (JWT)

- We use _cryptojs_ module to handle all operations with encryption in the playground, but we use _jsonwebtoken_ library in production (implements directly the JWT standard)
- SHA256 is a one-way hashing algorithm

                npm i crypto-js --save

                const {
                    SHA256
                } = require('crypto-js');

                const message = 'I am user number 3';
                const hash = SHA256(message).toString();

- What we are trying to do, is to encrypt data (containing for example the id of the user) in a way that allow to 1) spot manipulation of data (via hash verification) and 2) forbid manipulation of data and rehashing by salting the hash. Instead of sending the data below:

                const data = {
                        id: 4,
                }

we send a token, that contain the data property and the hash value of the data, including a salt

                const salt= 'a random string';

                const token = {
                        data,
                        hash: SHA256(JSON.stringify(data)+salt).toString()
                }

- To check if the data has been manipulated we just have to compare the hash

                //Check if the data has been manipulated

                ///We try to manipulate the data
                token.data.id = 5;
                token.hash = SHA256(JSON.stringify(token.data)).toString();

                ///What we expect
                const resultHash = SHA256(JSON.stringify(token.data) + salt).toString();

                if (resultHash === token.hash) {
                console.log('data was not manipulated');
                } else {
                console.log('data has been manipulated');
                }

- A standard way to hash the data has been put in place: JWT

                npm i jsonwebtoken --save

- We have 2 functions, one to create the token and the other to verify it

                //we return it to the client, and store it inside the tokens array of the User model
                const token = jwt.sign(data, 'somesecretstring');

                //return eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTAsImlhdCI6MTUyOTM0NTY4OH0.kLFWi9leXnT7UkK1KBxPbKODm8ZZl7eJdUkDsorphRc

                //We can check the generated token in jwt.io

                ///HEADER - algo and type of token => everything before the first '.'
                {
                        "alg": "HS256",
                        "typ": "JWT"
                }

                ///PAYLOAD - DATA => everything between the '.'s
                {
                        "id": 10,
                        "iat": 1529345688
                }

                ///VERIFY SIGNATURE - HASH => everything after the second '.'
                HMACSHA256(
                        base64UrlEncode(header) + "." +
                        base64UrlEncode(payload),
                        your-256-bit-secret
                )

                const decoded = jwt.verify(token, 'somesecretstring');

                // return the payload if secret correct, otherwiser error

### Generating Auth Tokens and Setting Headers

- We are going to define INSTANCE methods within UserSchema.methods and MODEL methods within UserSchema.statics

- We create an INSTANCE methods within the UserSchema (see above), that create the token and save it to the instance property _tokens_

                UserSchema.methods.generateAuthToken = function () {
                        const user = this;
                        const access = 'auth';
                        const secret = 'somerandomstring';
                        const token = jwt.sign({
                                _id: user._id.toHexString(),
                                access
                        }, secret).toString();

                        user.tokens.concat([{
                                access,
                                token
                        }]);

                        user.save().then(()=>{
                                return token;
                        });
                }

- We implement the generation of token within the POST /users

                app.post('/users', (req, res) => {
                        ...
                        User1.save().then(() => {
                                return user.generateAuthToken()         => we return the generated token
                        }).then((token) => {
                                res.header('x-auth', token).send(user); => we set the custom 'x-auth' header with the token and send the user back
                        }).catch(err => res.status(400).send())
                });

NOTA: whenever you use 'x-...' header, it is a custom header that you use within your app but is not a standard http header

- We limit the data that we send back to the user. We should never send back the password and the tokens. We override a method in this case, within the User Schema methods

                UserSchema.methods.toJSON = function () {
                        const user = this;
                        const userObj = user.toObject();
                        return _.pick(userObj, ['_id', 'email']);
                }

- We get the token within the 'x-auth' header that we gonna use for further request

### Turning routes to private and use Auth middleware

- Private route means that we gonna do the following actions

  - get the token from 'x-auth' header
  - validate the token via jwt.verify function
  - we find the user associate with this token
  - request the resource if the token is valid and the user is allowed to perform the requested action

- First example, 'by hand'

                //Custom route
                app.get('/users/me', (req, res) => {
                        const token = req.header('x-auth');
                        User.findByToken(token).then(user => {
                                if (!user) {
                                        return Promise.reject();
                                }
                                res.send(user);
                        }).catch(err => res.status(401).send());
                });

                //Inside User Model
                UserSchema.statics.findByToken = function (token) {
                        const User = this;
                        let decoded;

                        try {
                                decoded = jwt.verify(token, secret);
                        } catch (e) {
                                // return new Promise((resolve, reject) => {
                                //     reject();
                                // })
                                return Promise.reject();
                        }

                        return this.findOne({
                                '_id': decoded._id,
                                'tokens.token': token,
                                'tokens.access': 'auth'
                        })
                }

- To easily does that for every route, we create an Express middleware

                //within middleware/authenticate.js
                const authenticate = (req, res, next) => {
                        const token = req.header('x-auth');
                        User.findByToken(token).then(user => {
                                if (!user) {
                                return Promise.reject();
                                }
                                req.user = user;
                                req.token = token;
                                next();
                        }).catch(err => res.status(401).send());
                }

                //We then call it like that
                app.get('/users/me', authenticate, (req, res) => {
                        res.send(req.user);
                });

### Hashing password

- Process

  - Validate plain password within the user model
  - Hash it via bcrypt, and use mongoose middleware to implement in the user model, before a document is saved (see http://mongoosejs.com/docs/middleware.html)

                npm i bcryptjs --save

                //in user model
                UserSchema.pre('save', function (next) {                                => mongoose middleware (pre-hook)
                        const user = this;

                        //only hash when password is modified
                        if (user.isModified('password')) {
                                bcrypt.genSalt(10)                                      => generate salt length 10
                                .then(salt => bcrypt.hash(user.password, salt))         => hash password
                                .then(hash => {
                                        user.password = hash;                           => set password equals to hash
                                        next()
                                })
                                .catch(err => console.log(err))
                        } else {
                                next();
                        }
                })

                bcrypt.genSalt(10)                                      => generate the salt (length = 10)
                .then(salt => bcrypt.hash('string to hash', salt))      => hash
                .then(hash => {
                        return bcrypt.compare('string to hash', hash)   => return true in this case
                })
                .then(res => console.log(res))
                .catch(err => console.log(err));

- Save it to the database

### Seed test database with users

- refactor BeforeEach call within a seed.js file, and add support for seeding users inside

### Logging in

- Create new model function in User model findByCredentials

                UserSchema.statics.findByCredentials = function (email, password) {
                const User = this;

                return User.findOne({
                        email
                        })
                        .then(user => {
                        if (!user) {
                                return Promise.reject();
                        }
                        return new Promise((resolve, reject) => {
                                bcrypt.compare(password, user.password, (err, res) => {
                                if (res) {
                                        resolve(user);
                                } else {
                                        reject();
                                }
                                });
                        });
                        });
                }

- Implement route

                app.post("/users/login", (req, res) => {
                const body = _.pick(req.body, ['email', 'password']);

                //Check if user exists
                User.findByCredentials(body.email, body.password)
                        .then(user => {
                        return user.generateAuthToken()
                        }).then(token => {
                        res.header('x-auth', token).send(user);
                        })
                        .catch(err => res.status(400).send({}))
                });

### Logging out

- Create a removeToken instance function in user model

                UserSchema.methods.removeToken = function (token) {
                        const user = this;

                        return user.update({
                                $pull: {
                                tokens: {
                                        token
                                }
                                }
                        });
                }

* Implement route

                app.delete('/users/me/token', authenticate, (req, res) => {
                        req.user.removeToken(req.token).then(() => {
                                res.status(200).send()
                        }).catch(e => res.status(400).send())
                })

## Make all routes private

- Tweak todo model to add id of user that created the todo

                _creator: {
                        required: true,
                        type: moongoose.Schema.Types.ObjectId,
                }

- Use authenticate middleware for each route that need to be made private and tweak function and test functions

                app.get("/todos", authenticate, (req, res) => {
                        Todo.find({
                                _creator: req.user._id
                        }).then(todos => res.send({
                                todos
                        }), err => res.status(400).send());
                });

## Improve App Configuration

- Change how you configure process.env variables

        //Config.js
        const env = process.env.NODE_ENV || "development";

        if (env === 'development' || env === 'test') {
                const config = require('./config.json');
                const envConfig = config[env];
                Object.keys(envConfig).forEach(key => process.env[key] = envConfig[key]);
        }

        //Config.json => to be ignored in .gitignore
        {
                "test": {
                        "PORT": 3000,
                        "MONGOLAB_OLIVE_URI": "mongodb://localhost:27017/TodoApp",
                        "JWT_SECRET": "fdsfdsf1dsf476ds843ee"
                },
                "development": {
                        "PORT": 3000,
                        "MONGOLAB_OLIVE_URI": "mongodb://localhost:27017/TodoAppTest",
                        "JWT_SECRET": "somesecrdfdsfdsfdsfds2165ds7f65ds4132setstring"
                }
        }

- Set the JWT_SECRET variable in heroku

        heroku config:set JWT_SECRET=<secret>

# <a name=""></a> XXX - Creation of Web Socket API

## Create new web app with Path module

- Create basic express app with a server and public folder
- Use _path_ node module to easily handles path to public and server folder. It allows to join path segments.

                console.log(__dirname + '/../public');
                console.log(path.join(__dirname, '..', 'public'));

- Serve up the public folder

                app.use(express.static(path.join(__dirname, '../public')));

## Add Socket.io to the app

- The server will be able to accept connections and will be setting up the client to make the connection, in order to have a persistent connection to send data back and forth.

                npm i socket.io --save

- Currently we use Express to make our web server. Behind the scenes, Express is actually using a build in node module called HTTP to create the server. We are going to use HTTP ourselves, configure Express to work with HTTP, then and only then, will we be able to add a socket.io support.

                const http = require('http');
                const socketIO = require('socket.io');
                ...
                var app = express();
                var server = http.createServer(app);
                var io = socketIO(server);

                server.listen(port, () => {
                        ...
                });

- the io variable is used to communicate between the server and the client. We have access to several features:
  - We have access to a route that accepts incoming connections. We can use an integrated library to interact to the server: http://localhost:3000/socket.io/socket.io.js
- We now are able to accept connection, but on the client side we are not connecting to the client. To have a live connection you need to have the following on the client side:

                //index.html
                <script src='/socket.io/socket.io.js'></script>
                <script>
                        const socket = io();
                </script>

- Communication between client and server can be anything at all. It comes in the form of an event. Events can be emitted from either the client of the server and either the client or the serve can listen for events. A couple of default events are built-in:

  - Register an event listener on the server side with 'connection' event

                io.on('connection', (socket)=>{
                        console.log('User is connected');
                });

NOTE: Web sockets are a persistent technology meaning the client and server both keep the communication channel open for as long as both of them want to. If the server shuts down, the client doesn't have a choice, and vice-versa. When the connection drops the client is still goint to try to reconnect when we restart the server.

- Register an event listener on the client side with 'connect' event

              <script>
                      const socket = io();
                      socket.on('connect', (socket) => {
                              console.log('I am connected');
                      })
              </script>

- Register an event listener on the server and the client side with 'disconnect' event

                //server.js
                io.on('connection', (socket) => {
                        console.log('User is connected');
                        socket.on('disconnect', () => {
                                console.log('User is disconnected');
                        });
                });

                //index.html
                <script>
                        const socket = io();
                        socket.on('connect', () => {
                                console.log('I am connected');
                        });
                        socket.on('disconnect', () => {
                                console.log('I am disconnected');
                        });
                </script>

WARNING: By using arrow function in js on client side, you can experience crashes in browsers others than Chrome.

## Emitting and listening to custom events

- Emitting from server to client

                //emitting (server)
                io.on('connection', (socket) => {
                        console.log('User is connected');
                        socket.on('disconnect', () => {
                                console.log('User is disconnected');
                        });
                        socket.emit('newEmail', {
                                from:'test@gmail.com',
                                text: 'Hey! What's up?!',
                                createAt: 123
                        });
                });

                //listening (client)
                socket.on('newEmail', function (email) {
                        console.log('New email', email);
                });

- Emitting from client to server

                //emitting (client)
                socket.on('connect', function () {
                        socket.emit('createEmail', {
                                to: 'test@test.com',
                                from: 'robert@redford.com',
                                text: 'I am fine',
                                createAt: 234
                        })
                });

                //listening (server)
                io.on('connection', (socket) => {
                        ...
                        socket.on('createEmail', (email) => {
                                console.log('Creation of email', email)
                        })
                        ...
                });

## Broadcasting events

- Send event to a single user => use _socket.emit_

- Broadcasting event to every connected user (including the emitter) => use _io.emit_

                socket.on('createMessage', (message) => {
                        io.emit('newMessage', {
                                from: message.from,
                                text: message.text,
                                createdAt: new Date().getTime()
                        })
                })

- Broadcast event to every connected user but one => use _socket.broadcast.emit_

                socket.on('createMessage', (message) => {
                        socket.broadcast.emit('newMessage', {
                                from: message.from,
                                text: message.text,
                                createdAt: new Date().getTime()
                        })
                })

## Message Generator and Tests

## Events acknowledgments

## Message Form and JQuery

## Geolocation

## Styling the chat page

## Timestamps and formatting with Moment

## Printing Message Timestamps

## Moustache.js

## Autoscrolling

## Adding a join page

## Passing Room data

## Socket.io Rooms

## Storing Users with ES6 Classes

## Wiring up User List

## Sending Messages to Room Only

# <a name=""></a> XXX - ASYNC / AWAIT

# <a name=""></a> XXX - HOW-TO / RECIPES

## Write to file

        const fs = require('fs'); //filesystem
        const os = require('os');

        const name = "test.txt";
        const data = new Date().getMilliseconds();
        //append file fs.appendFile(file, data [,options], callback)
        fs.appendFile(name, data, e => {
            console.log(`Write ${data} down to ${name}`)
        })

## Automatically reload app when making changes

- Use Nodemon

        npm install --global nodemon
        nodemon app.js => similar to live-server for frontend JS

- If you need to watch specific files

        nodemon app.js

## Get input from the terminal

- Pass arguments

        node app.js arg // CLI

        process.argv // inside app.js

- use yargs module to parse command line arguments effortless => http://yargs.js.org

        node app.js --title=secrets
        => parse arguments as key/value pair

### Required argments

        const argv = yargs
        .command('add', 'add a new note ', {
                title: {
                describe: 'title of note',
                demand: true,
                alias: 't'
                },
                body: {
                describe: 'body of note',
                demand: true,
                alias: 'b'
                }
        })
        .options({
                address: {
                demand: true,
                alias: 'a',
                describe: 'Address to fetch the weather for',
                string: true
                }
        })
        .help()
        .alias('help', 'h')
        .argv;

## Convert JSON to string and vice-versa

        JSON.stringify(json);       // json => string
        JSON.parse(string);         // string => json

## List duplicates elements

        const duplicateNotes = notes.filter( note =>  note.title === title );

## Get user input and encode/decode it

        encodeURIComponent(query);
        decodeURIComponent(query);

## Pretty print JSON

        JSON.stringify(results, undefined, 2)

## Check if a Document ID is valid

        const {
                ObjectID
        } = require('mongodb');
        const id = "5b23e9619b5e7e7bbf9b6c2e";

        if (!ObjectID.isValid(id)) {
        return console.log('id is not valid')
        }

## get the id string from the objectId

        {
                _id: new ObjectID()
        }
        const testId = todos[0]._id.toHexString();
