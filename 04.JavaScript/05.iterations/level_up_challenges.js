// 1.

let marvelHeroes = [
  "Iron Man",
  "Captain America",
  "Hulk",
  "Hawkeye",
  "Black Widow",
  "Thor",
];
let store = [];

for (let index = 0; index < marvelHeroes.length; index++) {
  if (marvelHeroes[index] != "Hawkeye") store.push(marvelHeroes[index]);
  else break;
}

// console.log(store);

// 2.

let cities = ["london", "paris", "New York", "Delhi", "Tokyo", "New jersey"];
let favCities = [];

for (let index = 0; index < cities.length; index++) {
  if (cities[index] === "paris") continue;

  favCities.push(cities[index]);
}
// console.log(favCities);

// 3.

let numbers = [1, 2, 3, 4, 5, 6];
let storeNumbers = [];

for (const num of numbers) {
  if (num === 4) break;

  storeNumbers.push(num);
}
// console.log(storeNumbers);

// 4.

let heroes = [
  "Iron Man",
  "Captain America",
  "Hulk",
  "Batman",
  "Dr. Strange",
  "Hawkeye",
  "Black Widow",
  "Thor",
];
let storeHeroes = [];

for (const hero of heroes) {
  if (hero === "Hulk") continue;
  storeHeroes.push(hero);
}

// console.log(storeHeroes);

// 5.

let cityPopulation = {
  "New York": 250000,
  Berlin: 152000,
  Tokyo: 4500000,
};

let citiesPopulation = {};

// console.log(Object.values(cityPopulation));

for (const city in cityPopulation) {
  if (city == "Berlin") break;
  citiesPopulation[city] = cityPopulation[city];
}

// console.log(citiesPopulation);

// 6.

let Population = {
  "New York": 2500000,
  Berlin: 15200000,
  Tokyo: 450000,
  Mumbai: 12000500,
  "New jersey": 3000000,
};

let storepopulations = {};

for (const city in Population) {
  if (Population[city] < 3000000) continue;

  storepopulations[city] = Population[city];
}

// console.log(storepopulations);

// 7.

let cityName = ["london", "paris", "New York", "Delhi", "Tokyo", "New jersey"];

let NameofCity = [];

cityName.forEach(function (name) {
  if (name === "Delhi") return;

  NameofCity.push(name);
});

// console.log(NameofCity);

// 8.

let cityVisited = [
  "london",
  "paris",
  "New York",
  "Delhi",
  "Tokyo",
  "New jersey",
];

let famousCity = [];

cityVisited.forEach((visit) => {
  if (visit === "New York") return;

  famousCity.push(visit);
});

// console.log(famousCity);

// 9.

let myNumbers = [2, 5, 7, 8, 9, 4];
let doubleNumbers = [];

for (let index = 0; index < myNumbers.length; index++) {
  if (myNumbers[index] === 7) continue;

  doubleNumbers.push(2 * myNumbers[index]);
}

// console.log(doubleNumbers);

// 10.

let teaNames = [
  "Green Tea",
  "Black Tea",
  "Masala Tea",
  "Oolong Tea",
  "Herbal Tea",
  "Lemon Tea",
  "Ginger Tea",
];

let shortTeas = [];

for (const tea of teaNames) {
  if (tea.length > 9) break;

  shortTeas.push(tea);
}

console.log(shortTeas);
