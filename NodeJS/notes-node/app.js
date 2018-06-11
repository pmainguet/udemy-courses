console.log('Starting app.');

const fs = require('fs'); //filesystem
const os = require('os');
const _ = require('lodash');
const yargs = require('yargs');
const notes = require('./notes.js');

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
const command = argv._[0];
if (command) {
    console.log(`Command: ${command}`);
    switch (command) {
        case 'add':
            const note = notes.addNote(argv.title, argv.body);
            if (note) {
                console.log('Add Note: ' + argv.title);
            } else {
                console.log('same title exists! Abort!')
            }
            break;
        case 'list':
            console.log('Getting all notes');
            console.log(notes.getAll());
            break;
        case 'remove':
            const index = notes.removeNote(argv.title);
            if (index) {
                console.log('Remove Note :' + argv.title)
            } else {
                console.log('Cannot find note with title :' + argv.title)
            }
            break;
        case 'read':
            console.log('Read Note :' + title)
            console.log(notes.readNote(argv.title));
            break;
        default:
            console.log('Arguments not recognized, please use node app.js add/remove/read/list with --title and --body options');
    }
} else {
    console.log('Error with command!');
}