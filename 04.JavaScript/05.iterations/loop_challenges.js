// 1.

let sum = 0;
let i = 1;
while (i <= 5) {
  sum += i;
  i++;
}
// console.log(sum);

// 2.

let countdown = [];
let j = 5;
while (j >= 1) {
  countdown.push(j);
  j--;
}
// console.log(countdown);

// 3.

let teaCollection = [];
let tea;
/* 
do {
    tea = prompt(`Enter Your Tea(Type "stop" to end): `);

  if (tea != "stop") teaCollection.push(tea);
} while (tea != "stop");

 console.log(teaCollection);
  */

// 4.

let total = 0;
let k = 1;

do {
  total += k;
  k++;
} while (k <= 3);

// console.log(total);

// 5.

numbers = [2, 4, 6];
multiplynumber = [];

for (let index = 0; index < numbers.length; index++) {
  multiplynumber.push(numbers[index] * 2);
}

// console.log(multiplynumber);

// 6.

cities = ["Tokyo", "London", "New York", "Mumbai"];
copyCities = [];

for (let l = 0; l < cities.length; l++) {
  copyCities.push(cities[l]);
}

console.log(copyCities);
