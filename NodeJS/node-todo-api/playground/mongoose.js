const {
    ObjectID
} = require('mongodb');
const {
    mongoose
} = require('./../server/db/mongoose');
const {
    Todo
} = require('./../server/models/todo.js');

const id = "5b23e9619b5e7e7bbf9b6c2e";

if (!ObjectID.isValid(id)) {
    return console.log('id is not valid')
}

const text = "I am here";

//FIND - Find with id (no need for new ObjectId() as with plain MongoDB)
Todo.find({
    //_id: id
    completed: false
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