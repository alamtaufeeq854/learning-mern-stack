// Immediately Invoked Function Expression (IIFE)

(function chai() {
  // Named IIFE
  console.log(`DB CONNECTED`);
})();

((name) => {
  console.log(`DB CONNECTED TWO ${name}`);
})("Taufeeq alam");
