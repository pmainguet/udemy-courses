//Currying and Partial Application

function initGreet(greeting, name) {
  return `${greeting} ${name}`;
}

function greet(greeting) {
  return function(name) {
    return `${greeting} ${name}`;
  };
}

const friends = ["John", "Roger", "Alice"];

const friendGreetings = friends.map(greet("Hello"));

console.log(friendGreetings);

//Simplified syntax with Ramda library that transform a function to a curryied version

const Ramda = require("ramda");

const regularGreet = (greeting, name) => `${greeting} ${name}`;
const curryiedGreet = Ramda.curry(regularGreet);

console.log(regularGreet("Good morning", "Roger"));
console.log(curryiedGreet("Good morning")("Roger"));
console.log(curryiedGreet("Good morning", "Roger"));
