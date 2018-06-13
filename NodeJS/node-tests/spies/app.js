const db = require('./db.js');

module.exports.handleSignup = (email, password) => {
    //check if email exist
    //save the user to db
    db.saveUser({
        email,
        password
    })
    //Send the welcome email
}