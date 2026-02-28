const userEmail = [];

if (userEmail) {
  console.log("Got User Email");
} else {
  console.log("Don't have User Email ");
}

// Falsy values

// false,0,-0,BigInt 0n,"",null,undefined,NaN

// Truthy Values

// "0", "false"," ".[],{},function(){}

if (userEmail.length === 0) {
  console.log("Array Is Empty");
}

const emptObj = {};

if (Object.keys(emptObj).length === 0) {
  console.log("Object Is Empty");
}

// Nullish Coalescing Operator (??): null undefined

let val1;

// val1 = 5 ?? 10;
// val1 = null ?? 10;
// val1 = undefined ?? 15;
val1 = null ?? 10 ?? 20;

console.log(val1);

// Terniary Operator

// condition ? true:false

const price = 100;

price <= 80 ? console.log("less than 80") : console.log("more than 80");
