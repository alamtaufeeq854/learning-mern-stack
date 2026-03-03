const code = ["js", "py", "java", "cpp"];

code.forEach(function (val) {
  console.log(val);
});

code.forEach((item) => {
  console.log(item);
});

function printMe(item) {
  console.log(item);
}

code.forEach(printMe);

code.forEach((item, index, arr) => {
  console.log(item, index, arr);
});

const mycode = [
  {
    languageName: "Javascript",
    languageFileName: "js",
  },

  {
    languageName: "C++",
    languageFileName: "cpp",
  },

  {
    languageName: "Python",
    languageFileName: "py",
  },
];

mycode.forEach((item) => {
  console.log(item.languageName);
});
