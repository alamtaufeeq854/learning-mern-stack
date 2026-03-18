let Car = {
  make: "Toyota",
  model: "Camry",
  year: 2020,

  start: function () {
    return `This ${this.make} car made in year ${this.year}`;
  },
};

// console.log(Car.start());

function person(name, age) {
  this.name = name;
  this.age = age;
}

let john = new person("John Doe", 20);

// console.log(john.name);

function Animal(type) {
  this.type = type;
}

Animal.prototype.speak = function () {
  return `${this.type} make sound`;
};

Array.prototype.alam = function () {
  return `custom method ${this}`;
};

let myArray = [1, 2, 3];
// console.log(myArray.alam());
let myNewArray = [1, 2, 3, 5, 6];
// console.log(myNewArray.alam());

class vehicle {
  constructor(make, model) {
    this.make = make;
    this.model = model;
  }

  start() {
    return `${this.model} is a car from ${this.make}`;
  }
}

class car extends vehicle {
  drive() {
    return `${this.make}: This is an inheritance example`;
  }
}

let myCar = new car("Toyota", "Corolla");
// console.log(myCar.start());
// console.log(myCar.drive());

let vehOne = new vehicle("Toyota", "Corolla");
// console.log(vehOne.make);

// Encapsulation

class BankAccount {
  #balance = 0;

  deposit(amount) {
    this.#balance += amount;
    return this.#balance;
  }

  getBalance() {
    return `$ ${this.#balance}`;
  }
}

let account = new BankAccount();
// console.log(account.getBalance());

class coffeeMachine {
  start() {
    return `Machine started`;
  }

  brewCoffee() {
    return `Brewing coffee....`;
  }

  pressStartButton() {
    let msgOne = this.start();
    let msgTwo = this.brewCoffee();

    return `${msgOne} and ${msgTwo}`;
  }
}

let myMachine = new coffeeMachine();

// console.log(myMachine.start());
// console.log(myMachine.brewCoffee());

// console.log(myMachine.pressStartButton());

// Polymorphism

class Bird {
  fly() {
    return `Flying....`;
  }
}

class Penguin extends Bird {
  fly() {
    return `Penguins can't fly`;
  }
}

let bird = new Bird();
let penguin = new Penguin();
// console.log(bird.fly());
// console.log(penguin.fly());

// static method

class Calculator {
  static add(a, b) {
    return a + b;
  }
}

// let miniCalc = new Calculator();
// console.log(miniCalc.add(4, 6));

// console.log(Calculator.add(5, 3));

class Employee {
  #salary;

  constructor(name, salary) {
    if (salary < 0) {
      throw new Error("Salary can't be negative");
    }
    this.name = name;
    this.#salary = salary;
  }

  get salary() {
    return `You are not allowed to see salary`;
  }

  set salary(Value) {
    if (Value < 0) {
      console.error("Invalid Salary");
    } else this._salary = Value;
  }
}

let employ = new Employee("Alam", -5000);
console.log(employ._salary);
