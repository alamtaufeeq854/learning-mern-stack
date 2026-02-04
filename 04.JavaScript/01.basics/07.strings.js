const myName = "TAUFEEQ ";
const age = 18;

console.log(myName + age + " Details");

console.log(`Hello ! My name is ${myName}and my age is ${age}`);

const gameName = new String("God Of War");

console.log(gameName[0]);
console.log(gameName.__proto__);

console.log(gameName.length);
console.log(gameName.toUpperCase());
console.log(gameName.charAt(2));
console.log(gameName.indexOf("d"));

const newString = gameName.substring(0, 5);
console.log(newString);

const anotherString = gameName.slice(-8, 4);
console.log(anotherString);

const newStringOne = "  TAUFEEQ ALAM            ";
console.log(newStringOne);
console.log(newStringOne.trim());

const rollNumber = "25BTHTA54";

console.log(rollNumber.replace("54", "UFEEQ"));
console.log(rollNumber);

console.log(rollNumber.includes("BT"));

console.log(rollNumber.split(5));
