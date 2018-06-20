//https://www.npmjs.com/package/bcryptjs

const bcrypt = require('bcryptjs');

const pwd = '123abc!'

bcrypt.genSalt(10)
    .then(salt => bcrypt.hash(pwd, salt))
    .then(hash => {
        const hashPwd = hash
        return bcrypt.compare(pwd, hash)
    })
    .then(res => console.log(res))
    .catch(err => console.log(err));