const {
    mongoose
} = require("./../server/db/mongoose");
const {
    Todo
} = require("./../server/models/todo.js");

//deleteMany - delete all documents that satisfy the criteria
Todo.deleteMany({
    text: 'dfdfdsfdsfs'
}).then((res) => console.log(res));

//deleteOne - delete the first document that satisfy the criteria
Todo.deleteOne({
    text: 'dfdfdsfdsfs'
}).then((res) => console.log(res));