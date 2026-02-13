let a = 300;

if (true) {
  let a = 10;
  const b = 20;
  console.log("INNER: ", a);
}

console.log(a);
// console.log(b);
// console.log(c);

function one() {
  const username = "Taufeeq";

  function two() {
    const website = "youtube";
    console.log(username);
  }

  // console.log(website);

  two();
}

one();

if (true) {
  const username = "Taufeeq Alam";

  if (username === "Taufeeq Alam") {
    const website = " youtube";
    console.log(username + website);
  }
  // console.log(website);
}

// console.log(username);

// ++++++++++++++++++++ Intresting ++++++++++++++++++++

console.log(addone(4));

function addone(num) {
  return 1 + num;
}

// console.log(addtwo(4));

const addtwo = function (num) {
  return 2 + num;
};
