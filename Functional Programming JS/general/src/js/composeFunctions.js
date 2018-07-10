const R = require("ramda");

const text = `Nostrud Lorem aliquip incididunt magna eu dolor laboris ea do cillum quis.`;

const bOw = R.split(" ", text);
const wordList = R.length(bOw);

console.log(wordList);

const countWords = R.compose(
  R.length,
  R.split(" ")
)(text);
console.log(countWords);

const countWords2 = R.pipe(
  R.split(" "),
  R.length
)(text);
console.log(countWords2);
