// 1.
let teaFlavors = ["green tea", "Black tea", "Oolong Tea"];

let firstTea = teaFlavors[0];

// console.log(firstTea);

// 2.
let cities = ["london", "paris", "New York", "Delhi"];
let favCities = cities[2];

// console.log(favCities);

// 3.
let teaTypes = ["herbel tea", "White Tea", "Masala tea", "green tea"];
teaTypes[2] = "Milk Tea";
// console.log(teaTypes[2]);
// console.log(teaTypes);

// 4.
let citiesVisited = ["Mumbai", "london", "paris", "new york"];
citiesVisited.push("Berlin");
// console.log(citiesVisited);

// 5.
let heroes = ["Thor", "Batman", "Shaktiman"];
const hero = heroes.pop();
// console.log(heroes);
// console.log(hero);

// 6.
let planets = ["Earth", "Mars", "Jupiter", "Uranus"];
let softCopy = planets;
planets.pop();
// console.log(softCopy);
// console.log(planets);

// 7.
let topcities = ["Berlin", "paris", "London"];
// let hardCopies = [...topcities];
let hardCopies = topcities.slice();
topcities.pop();
// console.log(hardCopies);
// console.log(topcities);

// 8.
let marvel = ["Iron man", "Captain America"];
let DC = ["Batman", "Superman"];
let ourHeroes = marvel.concat(DC);
// console.log(ourHeroes);

// 9.
let famousCities = ["london", "paris", "New York", "Delhi"];
let citiesLength = famousCities.length;
// console.log(citiesLength);

// 10.
let marvelHeroes = [
  "Iron Man",
  "Captain America",
  "Hulk",
  "Hawkeye",
  "Black Widow",
  "Thor",
];
isThanos = marvelHeroes.includes("Thanos");
console.log(isThanos);
