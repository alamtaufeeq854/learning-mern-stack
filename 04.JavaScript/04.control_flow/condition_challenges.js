// Checking if a number is greater than another number:

let num1 = 8;
let num2 = 2;

/* 
console.log("I am regular Upper code ");

if (num2 > num1) {
  console.log("num2 is greater than num1");
} else {
  console.log("Nope ! num2 is not greater than num1");
}

console.log("I am regular Bottom code ");
 */

// checking if string is equal to another string:

let username = "chai";
let anotherUsername = "chai";

if (username == anotherUsername) {
  // console.log("Pick another username");
} else {
  console.log("You can Pick this username");
}

// Checking if a variable is number or not:

let score = 44;

if (typeof score === "number") {
  console.log("Yeah ! this is a number");
} else {
  console.log("Oops ! this is not a number");
}

// Checking if boolean value is true or false:

let win = false;

if (win) console.log("yeah ! We win");
// else console.log("ohh ! We lose");

// Checking if array is empty or not:

let arr = [];

console.log(arr.length);

if (arr.length === 0) console.log("Array is empty");
else console.log("Array is not empty");
