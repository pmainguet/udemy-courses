const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const _ = require('lodash');
const bcrypt = require('bcryptjs');

const UserSchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
        minlength: 1,
        trim: true,
        unique: true,
        validate: {
            validator: validator.isEmail,
            message: "{VALUE} is not a valid email"
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    tokens: [{
        access: {
            type: String,
            required: true
        },
        token: {
            type: String,
            required: true
        }
    }]
});

UserSchema.methods.toJSON = function () {
    const user = this;
    const userObj = user.toObject();

    return _.pick(userObj, ['_id', 'email']);
}

UserSchema.methods.generateAuthToken = function () {
    const user = this;
    const access = "auth";
    const token = jwt
        .sign({
                _id: user._id.toHexString(),
                access
            },
            process.env.JWT_SECRET
        )
        .toString();


    user.tokens.push({
        access,
        token
    });

    return user.save().then(() => {
        return token;
    }).catch(err => console.log(err));
};

UserSchema.methods.removeToken = function (token) {
    const user = this;

    return user.update({
        $pull: {
            tokens: {
                token
            }
        }
    });
}

UserSchema.statics.findByToken = function (token) {
    const User = this;
    let decoded;

    try {
        decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (e) {
        // return new Promise((resolve, reject) => {
        //     reject();
        // })
        return Promise.reject();
    }

    return this.findOne({
        '_id': decoded._id,
        'tokens.token': token,
        'tokens.access': 'auth'
    })
}

UserSchema.statics.findByCredentials = function (email, password) {
    const User = this;

    return User.findOne({
            email
        })
        .then(user => {
            if (!user) {
                return Promise.reject();
            }
            return new Promise((resolve, reject) => {
                bcrypt.compare(password, user.password, (err, res) => {
                    if (res) {
                        resolve(user);
                    } else {
                        reject();
                    }
                });
            });
        });
}

UserSchema.pre('save', function (next) {
    const user = this;

    //only hash when password is modified
    if (user.isModified('password')) {
        bcrypt.genSalt(10)
            .then(salt => bcrypt.hash(user.password, salt))
            .then(hash => {
                user.password = hash;
                next()
            })
            .catch(err => console.log(err))
    } else {
        next();
    }
})

//Create model
const User = mongoose.model("User", UserSchema);

module.exports = {
    User
};