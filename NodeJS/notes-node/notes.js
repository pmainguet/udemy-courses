console.log('Starting node.js');

const fs = require('fs');

const filename = 'notes-data.json';
let notes = [];

(() => {
    try {
        //blocking
        notes = JSON.parse(fs.readFileSync(filename));
    } catch (e) {
        console.log(e);
    }
})();

const saveNotes = () => {
    //blocking
    return fs.writeFileSync(filename, JSON.stringify(notes));
}

const duplicatesExist = (title) => {
    const duplicateNotes = notes.filter((note) => {
        return note.title === title
    });

    return (duplicateNotes.length === 0) ? false : true;

}

const addNote = (title, body) => {
    var note = {
        title,
        body
    }

    try {
        if (!duplicatesExist(title)) {
            notes.push(note);
            saveNotes();
            return note;
        }
    } catch (e) {
        console.log(e);
    }
}

const getAll = () => {
    return notes;
};

const readNote = (title) => {
    //you can also use filter
    return notes.find(elt => elt.title === title);
};

const removeNote = (title) => {
    const index = notes.findIndex(elt => elt.title === title);
    if (index) {
        //you can use notes.filter(elt => elt.title !== title); and use the return value of filter
        notes.splice(index, 1);
        saveNotes();
        return title;
    }
}

module.exports = {
    addNote,
    getAll,
    readNote,
    removeNote
};