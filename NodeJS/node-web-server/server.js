const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT ||  3000;

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

//Middleware
app.use((request, response, next) => {
    const now = new Date().toString();
    const log = `${now}: ${request.method} ${request.url}`;
    fs.appendFile('server.log', `${log} \n`, (err) => {
        if (err) {
            console.log(err);
            response.render('maintenance');
        } else {
            console.log(log);
            next();
        }
    });
})

// app.use((req, res, next) => {
//     res.render('maintenance');
// });

app.use(express.static(__dirname + '/public'));


hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
})

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
})

//Routing, define what a GET request to homepage returns
app.get('/html', (request, response) => {
    response.send('<h1>Hello Express</h1>');
});

app.get('/', (request, response) => {
    response.render('welcome.hbs', {
        pageTitle: 'Welcome',
        name: 'Andrew',
        city: 'Paris'
    })
});

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'About',
        content: 'welcome to our About page'
    })
})

//bind the server to a port of the machine
app.listen(port, () => {
    console.log(`Server is up on port ${port}`)
});