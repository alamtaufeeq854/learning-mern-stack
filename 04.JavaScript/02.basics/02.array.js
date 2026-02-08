const marvel_heroes = ["ironman", "thor", "hulk"];
const dc_heroes = ["flash", "batman", "superman"];

// marvel_heroes.push(dc_heroes);

// console.log(marvel_heroes);
// console.log(marvel_heroes[3][1]);

// const all_heroes = marvel_heroes.concat(dc_heroes);
// console.log(all_heroes);

const all_new_heroes = [...marvel_heroes, ...dc_heroes];
console.log(all_new_heroes);

const anotherArray = [4, 3, 6, 5, [5, 2, 6, 5], [5, 1, [5, [3, 6], 4], 5, 2]];

const realAnotherArray = anotherArray.flat(Infinity);
console.log(realAnotherArray);

console.log(Array.isArray("Taufeeq"));
console.log(Array.from("Taufeeq"));

console.log(Array.from({ name: "Taufeeq" })); // Intresting

let score1 = 100;
let score2 = 200;
let score3 = 300;

console.log(Array.of(score1, score2, score3));
