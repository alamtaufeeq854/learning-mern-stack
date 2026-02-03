// Stack (Primitive), Heap(Non-Primitive)

// Stack

let myName = "TAUFEEQ ALAM";
let anotherName = myName;
anotherName = "DUA";

console.log(myName);
console.log(anotherName);

// Heap

let userOne = {
  name: "TAHIRA",
  age: 19,
};

let userTwo = userOne;

userTwo.age = 18;

console.log(userOne.age);
console.log(userTwo.age);
