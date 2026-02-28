/*

const coding = ["js", "py", "java", "cpp"];

const values = coding.forEach((item) => {
  console.log(item);
  return item;
});

console.log(values);

*/

const myNums = [1, 2, 3, 4, 5, 6, 7, 8, 9];

const newNums = myNums.filter((num) => {
  return num > 4;
});
console.log(newNums);

const newNums2 = [];

myNums.forEach((num) => {
  if (num > 4) {
    newNums2.push(num);
  }
});

console.log(newNums2);

const books = [
  {
    title: "The Alchemist",
    genre: "Fiction",
    publish: 1988,
    edition: "1st",
  },
  {
    title: "Clean Code",
    genre: "Programming",
    publish: 2008,
    edition: "1st",
  },
  {
    title: "Atomic Habits",
    genre: "Self Help",
    publish: 2018,
    edition: "1st",
  },
  {
    title: "Introduction to Algorithms",
    genre: "Computer Science",
    publish: 2009,
    edition: "3rd",
  },
];

let userBook = books.filter((bk) => bk.genre === "Programming");

console.log(userBook);

userBook = books.filter((bk) => {
  return bk.publish >= 1995 && bk.genre === "Self Help";
});

console.log(userBook);
