const admissionNumber = 88974;
let studentName = "TAUFFEQ";
var rollNumber = "587765";
subject = "Btech";
let courseName;

// admissionNumber = 956478; // not allowed

studentName = "ALAM";
rollNumber = 871423;
subject = "BCA";

/*
prefer not to use var because of issue 
in block scope and functional scope
*/

console.log(admissionNumber);

console.table([admissionNumber, studentName, rollNumber, subject, courseName]);
