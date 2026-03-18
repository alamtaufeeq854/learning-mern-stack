function person(name, age) {
  this.name = name;
  this.age = age;
}

function car(make, model) {
  this.make = make;
  this.model = model;
}

let myCar = new car("Toyota", "Camry");
// console.log(myCar);

let myNewCar = new car("Tata", "Safari");
// console.log(myNewCar);

function teaType(tea) {
  this.tea = tea;

  this.describe = function () {
    return `This is a cup of ${this.tea}`;
  };
}

let lemonTea = new teaType("Lemon Tea");
// console.log(lemonTea.describe());

function Animal(species) {
  this.species = species;
}

Animal.prototype.sound = function () {
  return `${this.species} makes sound`;
};

let cat = new Animal("Cat");
// console.log(cat.sound());

let dog = new Animal("Dog");
// console.log(dog.sound());

function Drink(name) {
  if (!new.target) throw new Error("This must be called with new keyword");

  this.name = name;
}

let water = new Drink("water");
// console.log(water);

let coffee = Drink("coffee");
