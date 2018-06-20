// const {
//     SHA256
// } = require('crypto-js');

// const message = 'I am user number 3';
// const hash = SHA256(message).toString();

// console.log(message);
// console.log(hash);

// const data = {
//     id: 4
// };

// const salt = 'a random string';

// const token = {
//     data,
//     hash: SHA256(JSON.stringify(data) + salt).toString()
// }

// //Check if the data has been manipulated

// ///We try to manipulate the data
// token.data.id = 5;
// token.hash = SHA256(JSON.stringify(token.data)).toString();

// ///What we expect
// const resultHash = SHA256(JSON.stringify(token.data) + salt).toString();

// if (resultHash === token.hash) {
//     console.log('data was not manipulated');
// } else {
//     console.log('data has been manipulated');
// }

const jwt = require('jsonwebtoken');

const data = {
    id: 10
}

const token = jwt.sign(data, 'somesecretstring');

const decoded = jwt.verify(token, 'somesecretstring');

console.log(decoded)