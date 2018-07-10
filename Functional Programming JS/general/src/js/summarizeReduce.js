//Summarize data in an array

const array = [
  {
    id: 1,
    description: "patate",
    calories: 600
  },
  {
    id: 2,
    description: "jambon",
    calories: 200
  }
];

const summary = array.reduce((acc, e) => (acc += e.calories), 0);

console.log(summary);

//Other example

const grades = [34, 23, 67, 56, 91, 10, 100];

const result = grades.map(e => e > 34);

const numberTop = result.reduce((acc, e) => (acc += e), 0);
const numberTop2 = grades.reduce((acc, e) => {
  if (e > 34) {
    return (acc += 1);
  } else {
    return acc;
  }
}, 0);

console.log(result);
console.log(numberTop);
console.log(numberTop2);

//group by grade

const numberBygrade = grades.reduce((acc, grade) => {
  const { a = 0, b = 0, c = 0, d = 0, e = 0, f = 0 } = acc;
  if (grade > 90) {
    return {
      ...acc,
      a: a + 1
    };
  } else if (grade > 80) {
    return {
      ...acc,
      b: b + 1
    };
  } else if (grade > 70) {
    return {
      ...acc,
      c: c + 1
    };
  } else if (grade > 60) {
    return {
      ...acc,
      d: d + 1
    };
  } else if (grade > 50) {
    return {
      ...acc,
      e: e + 1
    };
  } else if (grade < 40) {
    return {
      ...acc,
      f: f + 1
    };
  }
});

console.log(numberBygrade);
