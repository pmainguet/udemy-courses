# TABLE OF CONTENTS

- [0 - SETUP NODE AND WHY NODE](#0)
- [A - NODE JS FUNDAMENTALS](#a)

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
        .help()
        .argv;

## Convert JSON to string and vice-versa

        JSON.stringify(json);       // json => string
        JSON.parse(string);         // string => json

## List duplicates elements

        const duplicateNotes = notes.filter( note =>  note.title === title );
