// for of

// ["", "", ""]
// [{}, {}, {}]

const arr = [1, 2, 3, 4, 5];

for (const num of arr) {
  console.log(num);
}

const greetings = "Hello World !";

for (const greet of greetings) {
  console.log(`Each char is: ${greet}`);
}

// Map

const map = new Map();

map.set(`IN`, "INDIA");
map.set(`Fr`, "France");
map.set(`Cn`, "China");
map.set(`Fr`, "France");
map.set(`Cn`, "China");

console.log(map);

for (const [key, Value] of map) {
  console.log(key, ":", Value);
}

const myObj = {
  game1: `NFS`,
  game2: `GOW`,
};

/*

for (const [key, Value] of myObj) {
  console.log(key, ":", Value);
}

*/
