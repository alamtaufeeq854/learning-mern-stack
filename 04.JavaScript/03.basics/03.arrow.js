const user = {
  username: "Taufeeq",
  price: 799,

  welcomeMessage: function () {
    console.log(`${this.username}, welcome to website`);
    console.log(this);
  },
};

user.welcomeMessage();
user.username = "Alam";
user.welcomeMessage();

console.log(this);

/* 

function me() {
  let username = "Taufeeq";
  console.log(this.username);
}

*/

/*

const me = function () {
  let username = "Taufeeq";
  console.log(this.username);
};

*/

const me = () => {
  let username = "Taufeeq";
  console.log(this);
};

me();

/*

const addTwo = (num1, num2) => {
  return num1 + num2;
};

*/

// const addTwo = (num1, num2) => num1 + num2;

const addTwo = (num1, num2) => ({ myName: "Taufeeq" });

console.log(addTwo(3, 5));

// const myArray = [5, 6, 9, 2, 7, 8];
// myArray.forEach();
