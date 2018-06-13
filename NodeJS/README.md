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
