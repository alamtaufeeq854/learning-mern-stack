const score = 400;
console.log(score);

const marks = new Number(100);
console.log(marks);

console.log(marks.toString().length);
console.log(marks.toFixed(2));

const otherNumber = 23.39174;

console.log(otherNumber.toPrecision(3));

const hundreds = 1000000;

console.log(hundreds.toLocaleString("en-IN"));

// ++++++++++++++++ MATHS ++++++++++++++++++++

console.log(Math);
console.log(Math.abs(-4));
console.log(Math.round(4.52));
console.log(Math.ceil(4.2));
console.log(Math.floor(4.9));
console.log(Math.min(4, 5, 8, 3, 10, 9));
console.log(Math.max(4, 5, 8, 3, 10, 9));

console.log(Math.random());

console.log(Math.random() * 10 + 1);
console.log(Math.random() * 10 + 1);
console.log(Math.floor(Math.random() * 10 + 1));

const minimum = 10;
const maximum = 20;

console.log(Math.floor(Math.random() * (maximum - minimum + 1) + minimum));
