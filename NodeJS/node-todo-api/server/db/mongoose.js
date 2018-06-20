const mongoose = require('mongoose');

//Tell Mongoose which Promises library to use
mongoose.Promise = global.Promise;

//Connect to the database
module.exports.mongoose = mongoose.connect(process.env.MONGOLAB_OLIVE_URI);