// 1.
function myHero(name) {
  return `My favourite super-Hero is ${name}`;
}

let hero = myHero("Batman");
// console.log(hero);

// 2.

function order(myOrder) {
  function orderPlaced() {
    return `Order Confirmed for ${myOrder}`;
  }
  return orderPlaced();
}

let orderConfirmation = order("Tea");
// console.log(orderConfirmation);

// 3.

const calculateTotal = (price, quantity) => price * quantity;

let total = calculateTotal(99, 100);
// console.log(total);

// 4.

function assembled(name) {
  return `I am ${name}`;
}

function avengers(FunctionAssembled) {
  return FunctionAssembled("Hulk");
}

let store = avengers(assembled);

// console.log(store);

// 5.

function createTeaMaker(name) {
  let score = 564;
  return function (teatype) {
    return `Making ${teatype} ${name} ${score}`;
  };
}

let teaMaker = createTeaMaker("Taufeeq");
let result = teaMaker("Black Tea");

console.log(result);
