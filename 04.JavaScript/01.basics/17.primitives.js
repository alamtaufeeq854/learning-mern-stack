// Number

let score = 73;
let anotherScore = new Number(89);

// console.log(score);
// console.log(anotherScore.valueOf());

// console.log(typeof score);
// console.log(typeof anotherScore);

// boolean

let isActive = true;
let isReallyActive = new Boolean(true); // not recommended

// null and undefined

let firstname = null;
let lastname = undefined;

// console.log(firstname);
// console.log(lastname);

// string

let myString = "Hello";
let myStringOne = "Hola";
let username = "Taufeeq";

let oldGreet = myString + " " + "Taufeeq";
// console.log(oldGreet);

let greetMessage = `Hello ${username} !`;
let demoOne = `Value is ${2 * 2}`;
// console.log(greetMessage);
// console.log(demoOne);

let sm1 = Symbol("taufeeq");
let sm2 = Symbol("taufeeq");

// console.log(sm1 == sm2); => false
console.log(sm1);
