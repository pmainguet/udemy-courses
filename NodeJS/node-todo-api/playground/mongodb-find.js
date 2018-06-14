const {
    MongoClient,
    ObjectID
} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
    if (err) {
        return console.log('Unable to connect to MongoDB server');
    }
    console.log('Connected to MongoDB server');

    const db = client.db('TodoApp');

    db.collection('Todos').find({
        _id: new ObjectID('5b228ac822908970579b6b16')
    }).toArray().then((result) => {
        console.log(JSON.stringify(result, undefined, 2));
    }, (err) => console.log('Unable to fetch todo', err));


    client.close();
});