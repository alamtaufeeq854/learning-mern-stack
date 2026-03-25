const Person = {
  name: "Taufeeq",
  greet() {
    console.log(`Hi ! My name is ${this.name}`);
  },
};

Person.greet();

const greetFunction = Person.greet;
greetFunction();

const boundGreet = Person.greet.bind({ name: "alam" });
boundGreet();
