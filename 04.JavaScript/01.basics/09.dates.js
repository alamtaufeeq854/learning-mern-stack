// Dates

let myDate = new Date();

console.log(myDate);
console.log(myDate.toString());
console.log(myDate.toDateString());
console.log(myDate.toLocaleString());
console.log(typeof myDate);

let createMyDate1 = new Date(2023, 0, 23);
console.log(createMyDate1.toDateString());

let createMyDate2 = new Date(2023, 0, 23, 5, 3, 21);
console.log(createMyDate2.toLocaleString());

let createMyDate3 = new Date("2025-02-25");
console.log(createMyDate3.toLocaleString());

let createMyDate4 = new Date("01-16-2025");
console.log(createMyDate4.toLocaleString());

let myTimeStamp = Date.now();
console.log(myTimeStamp);
console.log(createMyDate4.getTime());
console.log(Math.floor(Date.now() / 1000));

let newDate = new Date();
console.log(newDate);
console.log(newDate.getMonth() + 1);
console.log(newDate.getDay());

newDate.toLocaleString("default", {
  weekday: "long",
});
