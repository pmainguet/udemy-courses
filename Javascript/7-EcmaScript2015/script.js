// let and const

// /* Differences between var, let, const */
// // ES5
// var name5 = 'Jane Smith';
// var age5 = 23;
// name5 = 'Jane Miller';

// console.log(name5);

// // ES6

// let name6 = 'Jane Smith';
// const age6 = 23;
// name6 = 'Jane Miller';
// age6 = 36;

// console.log(name6);
// console.log(age6);

/* ES5 function scoped vs ES6 block scoped*/

//ES5

// function driversLicence(passedTest) {
//     if (passedTest) {
//         console.log(firstName);
//         var firstName = 'John';
//         var yoB = 1990;
//     }

//     console.log(firstName + ' is born in ' + yoB); // function scoped => no error
// }

// driversLicence(true);

// //ES6

// function driversLicence6(passedTest) {
//     let firstName;
//     const yoB = 1990;
//     if (passedTest) {
//         firstName = 'John';
//     }

//     console.log(firstName + ' is born in ' + yoB); // block scoped => result in error as firstName and yoB are declared in another block
// }

// driversLicence6(true);

/* Exemple of IIFEs with Blocks*/

// //ES5
// (function () {
//     var c = 3;
// })();

// console.log(c);

// //ES6
// {
//     const a = 1;
//     let b = 2;
//     var c = 3;
// }

// console.log(a + b);
// console.log(c);

/* Strings */

// let firstName = 'john';
// let lastName = 'Smith';
// const yoB = 1990;

// function calcAge(year) {
//     return 2016 - year;
// }

// // ES5
// console.log('This is ' + firstName + '...' + yoB + ' ' + calcAge(yoB));

// //ES6
// console.log(`This is ${firstName} ... ${yoB} ${calcAge(yoB)}`);

/* Arrow Functions */

// const years = [1990, 1965, 1982];

// //ES5
// var ages5 = years.map(function (current, index, array) {
//     return 2016 - current;
// });
// console.log(ages5);

// //ES6
// const ages6 = years.map(current => 2016 - current);

//ES5
// var box5 = {
//     color: 'green',
//     position: 1,
//     clickMe: function () {

//         var self = this; //if we don't do that, the regular function call used as callback in addEventListener will use the global this variable and not the current object

//         document.querySelector('.green').addEventListener('click', function () {
//             var str = 'This is box number' + self.position + 'and it is ' + self.color;
//             alert(str);
//         })
//     }
// }
// box5.clickMe();

// //ES6
// var box6 = {
//     color: 'blue',
//     position: 1,
//     clickMe: function () {
//         document.querySelector('.blue').addEventListener('click', () => {
//             var str = 'This is box number' + this.position + 'and it is ' + this.color;
//             alert(str);
//         })
//     }
// }
// box6.clickMe();


// //Another example

// function Person(name) {
//     this.name = name;
// }

// //ES5
// Person.prototype.myFriends5 = function (friends) {
//     var arr = friends.map(function (el) {
//         return this.name + ' is friend with ' + el;
//     }.bind(this));
//     console.log(arr);
// }

// var John = new Person('John');
// John.myFriends5(['Lisbeth', 'Jane']);

// //ES6

// Person.prototype.myFriends6 = function (friends) {
//     const arr = friends.map(el => `${this.name} is friends with ${el}.`);
//     console.log(arr);
// }

// var Paul = new Person('Paul');
// Paul.myFriends6(['Ron', 'Robert']);

/* Destructuring */

// //ES5
// var john = ['John', 26];
// var name = john[0];
// var age = john[1];

// //ES6
// const [name6, age6] = ['John', 26];
// console.log(name6);
// console.log(age6);

// const obj = {
//     firstName: 'John',
//     lastName: 'Smith',
// }

// const {
//     firstName,
//     lastName
// } = obj;

// console.log(firstName);
// console.log(lastName);

// const {
//     firstName: a,
//     lastName: b
// } = obj;

// console.log(`${a} ${b}`);

// function calcAgeRetirement(year) {
//     const age = new Date().getFullYear() - year;
//     return [age, 65 - age];
// }

// const [age, retirement] = calcAgeRetirement(1990);
// console.log(age);
// console.log(retirement);

/* Arrays */


const boxes = document.querySelectorAll('.box');

//ES5
var boxesArr5 = Array.prototype.slice.call(boxes);
boxesArr5.forEach(function (cur) {
    cur.style.backgroundColor = 'dodgerblue';
})

//ES6
const boxesArr6 = Array.from(boxes)
boxesArr6.forEach(cur => cur.style.backgroundColor = 'orange');

//ES5
for (var i = 0; i < boxesArr5.length; i++) {
    if (boxesArr5[i].className === 'box blue') {
        continue;
    }
    boxesArr5[i].textContent = 'I changed to blue';
}

//ES6
for (const cur of boxesArr6) {
    if (cur.className.includes('blue')) {
        continue;
    }
    cur.textContent = 'I changed to blue (or not)';
}