const myObj = {
  cpp: "C++",
  js: "JavaScript",
  py: "Python",
  C: "C",
};

for (const key in myObj) {
  console.log(`${key} is a file name of ${myObj[key]}`);
}

const programming = ["js", "py", "java", "cpp"];

for (const key in programming) {
  console.log(programming[key]);
}

const map = new Map();

map.set(`IN`, "INDIA");
map.set(`Fr`, "France");
map.set(`Cn`, "China");
map.set(`Fr`, "France");
map.set(`Cn`, "China");

for (const key in map) {
  console.log(key);
}
