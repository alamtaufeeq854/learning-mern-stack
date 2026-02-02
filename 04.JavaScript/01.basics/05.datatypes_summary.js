// Primitive

// 7 types : String, Number, Boolean, null, Undefined, Symbol, BigInt

const score = 100;
const scoreValue = 100.7;

const isLoggedIn = false;
const outsideTemp = null;
let userEmail;

const id = Symbol("273");
const anotherId = Symbol("273");

console.log(id === anotherId);

const bigNumber = 9846476215872544n;

// Reference (Non Primitive)

// Array, Objects, Functions

const heroes = [
  "Ironman",
  "Hulk",
  "Captain America",
  "Thor",
  "Black Widow",
  "Hawkeye",
];

let myObj = {
  name: "TAUFEEQ",
  course: "Btech cse",
  age: 17,
};

const myFunction = function () {
  console.log("Hello World !");
};

console.log(typeof score);
console.log(typeof scoreValue);
console.log(typeof id);
console.log(typeof bigNumber);
console.log(typeof heroes);
console.log(typeof myObj);
console.log(typeof myFunction);

/*

Return type of variables in JavaScript

1) Primitive Datatypes
       Number => number
       String  => string
       Boolean  => boolean
       null  => object
       undefined  =>  undefined
       Symbol  =>  symbol
       BigInt  =>  bigint

2) Non-primitive Datatypes
       Arrays  =>  object
       Function  =>  function
       Object  =>  object

*/
