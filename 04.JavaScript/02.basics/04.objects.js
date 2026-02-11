// cont tinderUser = new Object()
const tinderUser = {};

tinderUser.id = "123abc";
tinderUser.name = "sammy";
tinderUser.isLogged = false;

console.log(tinderUser);

const regularUser = {
  email: "some@gmail.com",
  fullName: {
    userFullName: { firstName: "Taufeeq", lastName: "Alam" },
  },
};

console.log(regularUser.fullName.userFullName.firstName);

const obj1 = { 1: "a", 2: "b" };
const obj2 = { 3: "a", 4: "b" };
const obj4 = { 5: "a", 6: "b" };

//  obj3 = { obj1, obj2 };

// obj3 = Object.assign({}, obj1, obj2, obj4);

obj3 = { ...obj1, ...obj2 };
console.log(obj3);

const users = [
  {
    emailId: "aabbcc@gmail.com",
    rollNumber: "25BTH523",
  },
  {
    emailId: "aabbcc@gmail.com",
    rollNumber: "25BTH523",
  },
  {
    emailId: "aabbcc@gmail.com",
    rollNumber: "25BTH523",
  },
];

users[1].emailId;
console.log(tinderUser);

console.log(Object.keys(tinderUser));
console.log(Object.values(tinderUser));
console.log(Object.entries(tinderUser));

const course = {
  coursename: "Btech Cse",
  price: "500000",
  courseInstructor: "Taufeeq",
};

course.courseInstructor;

const { courseInstructor: instructor } = course;

// console.log(courseInstructor);

console.log(instructor);
