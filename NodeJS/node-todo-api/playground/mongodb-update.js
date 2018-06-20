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

        db.collection('Users').findOneAndUpdate({
            _id: new ObjectID("5b228efc08a33c78228c4f97")
        }, {
            $set: {
                "name": "Jean23"
            }
        }, {
            returnOriginal: false
        }).then(res => console.log(res));

        client.close();
    }
);