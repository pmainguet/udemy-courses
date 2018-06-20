const {
    MongoClient,
    ObjectID
} = require("mongodb");

MongoClient.connect(
    "mongodb://localhost:27017/TodoApp",
    (err, client) => {
        if (err) {
            return console.log("Unable to connect to MongoDB server");
        }
        console.log("Connected to MongoDB server");

        const db = client.db("TodoApp");

        //deleteMany => delete all records matching criteria
        // db.collection('Todos').deleteMany({
        //     "text": "example of text"
        // }).then(res => console.log(res));

        //deleteOne => delete one specific record
        // db.collection('Todos').deleteOne({
        //     _id: new ObjectID('5b229003b4979ddfdca8e86a')
        // }).then(res => console.log(res));

        //findOneAndDelete => delete the first item matching the criteria
        db.collection('Todos').findOneAndDelete({
            "completed": false
        }).then(res => console.log(res));

        client.close();
    }
);