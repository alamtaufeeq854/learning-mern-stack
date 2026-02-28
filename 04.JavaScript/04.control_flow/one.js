// if

const isUserLoggedIn = true;
const temperature = 41;

if (temperature === 40) {
  console.log("Less than 50");
} else {
  console.log("temperature is greater than 50");
}

console.log("Executed");

const score = 200;

if (score > 100) {
  const power = "fly";
  console.log(`User Power: ${power}`);
}

// console.log(`User Power: ${power}`);

const balance = 1000;

if (balance > 500) (console.log("Test"), console.log("Test 2"));

if (balance < 500) {
  console.log("Less Than 500");
} else if (balance < 750) {
  console.log("Less Than 750");
} else if (balance < 900) {
  console.log("Less Than 900");
} else {
  console.log("Less Than 1200");
}

const userLoggedIn = true;
const debitCard = true;
const loggedInFromGoogle = false;
const loggedInFromEmail = true;

if (userLoggedIn && debitCard && 2 == 3) {
  console.log("Allow to buy");
}

if (loggedInFromGoogle || loggedInFromEmail) {
  console.log("User logged in");
}
