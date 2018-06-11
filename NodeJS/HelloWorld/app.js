//use node app.js inside the terminal => print "Hello world"
//console.log('hello world');

var user = {
    name: 'Andrew',
    sayHi: () => {
        console.log(this.name)
    },

    sayHiAlt() {
        console.log(this.name)
    }
}

user.sayHiAlt();