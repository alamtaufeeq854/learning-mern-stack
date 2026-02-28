// for

for (let index = 0; index <= 10; index++) {
  const element = index;

  if (element === 5) {
    console.log("5 is best number");
  }
  console.log(index);
}

// console.log(index);

for (let i = 1; i <= 10; i++) {
  // console.log(`Outer Loop Value: ${i}`);
  for (let j = 1; j <= 10; j++) {
    // console.log(`Inner Loop Value ${j} and Inner Loop ${i}`);
    // console.log(i + ` * ` + j + ` = ` + i * j);
  }
}

let myArray = ["Batman", "Ironman", "Thor"];

console.log(myArray.length);
for (let index = 0; index < myArray.length; index++) {
  const element = myArray[index];
  console.log(element);
}

// break and continue

/*

for (let index = 1; index <= 20; index++) {
  if (index == 5) {
    console.log("5 is Detected");
    break;
  }
  console.log(`Value of i is: ${index}`);
}

*/

for (let index = 1; index <= 20; index++) {
  if (index == 5) {
    console.log("5 is Detected");
    continue;
  }
  console.log(`Value of i is: ${index}`);
}
