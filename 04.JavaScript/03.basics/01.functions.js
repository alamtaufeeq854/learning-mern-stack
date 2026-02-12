function sayMyName() {
  console.log("T");
  console.log("A");
  console.log("U");
  console.log("F");
  console.log("E");
  console.log("E");
  console.log("Q");
}

sayMyName();

function addTwoNumber(number1, number2) {
  console.log(number1 + number2);
}

function addTwoNumbers(number1, number2) {
  // let result = number1 + number2;
  // return result;
  return number1 + number2;
}

const result = addTwoNumbers(5, 4);

console.log("Result is: ", result);

function loginUserMessage(username = "sam") {
  if (!username) {
    console.log("Please, Enter a username");
    return;
  }

  return `${username} just logged in`;
}

console.log(loginUserMessage("Taufeeq"));
console.log(loginUserMessage());

function calculateCartPrice(val1, val2, ...num1) {
  return num1;
}

console.log(calculateCartPrice(200, 500, 300, 2000));

const User = {
  username: "Taufeeq",
  price: 499,
};

function handleObject(anyobject) {
  console.log(
    `usernmae is ${anyobject.username} and price is ${anyobject.price}`,
  );
}

handleObject(User);

handleObject({
  username: "Alam",
  price: 799,
});

const myNewArray = [100, 500, 600, 900, 400];

function returnSecondValue(getArray) {
  return getArray[1];
}

console.log(returnSecondValue(myNewArray));
console.log(returnSecondValue([100, 500, 600, 900, 400]));
