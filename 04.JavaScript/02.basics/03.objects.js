// Singleton
// Object.create

// Object literals

const mySym = Symbol("Key1");

const jsUser = {
  name: "TAUFEEQ",
  "Full Name": "TAUFEEQ ALAM",
  [mySym]: "Key1",
  age: 18,
  location: "Bihar",
  email: "taufeeq@ggogle.com",
  isLoogedIn: false,
  lastLoginDays: ["MOnday", "Friday"],
};

console.log(jsUser.email);
console.log(jsUser["email"]);
console.log(jsUser["Full Name"]);
console.log(jsUser[mySym]);

jsUser.email = "Alamtaufeeqchatgpt.com";
// Object.freeze(jsUser);
jsUser.email = "Alamtaufeeqyoutube.com";
console.log(jsUser);

jsUser.greeting = function () {
  console.log("Hello ! User");
};

jsUser.greetingTwo = function () {
  console.log(`Hello ! User,${this["Full Name"]}`);
};

console.log(jsUser.greeting());
console.log(jsUser.greetingTwo());
