const {
    MongoClient,
    ObjectID
} = require('mongodb');

//var obj = new ObjectID();

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
    if (err) {
        return console.log('Unable to connect to MongoDB server');
    }
    console.log('Connected to MongoDB server');

    const db = client.db('TodoApp');

    //Insert data in TodoApp database

    // db.collection('Todos').insertOne({
    //     text: 'SOmething to do',
    //     completed: false
    // }, (err, result) => {
    //     if (err) {
    //         return console.log('Unable to insert todo', err);
    //     }
    //     console.log(JSON.stringify(result.ops, undefined, 2));
    // })

    //Insert new doc into Users

    db.collection('Users').insertOne({
        name: 'Andrew',
        age: 23,
        location: 'Paris'
    }, (err, result) => {
        if (err) {
            return console.log('Unable to insert user', err);
        }
        console.log(JSON.stringify(result.ops[0]._id.getTimestamp(), undefined, 2));
    })

    client.close();
});