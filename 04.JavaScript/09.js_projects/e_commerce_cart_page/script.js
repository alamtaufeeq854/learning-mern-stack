document.addEventListener("DOMContentLoaded", () => {
  const products = [
    { id: 1, name: "Product 1", Price: 10.04 },
    { id: 2, name: "Product 2", Price: 4.17 },
    { id: 3, name: "Product 3", Price: 23.39 },
  ];

  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  const ProductList = document.getElementById("product-list");
  const cartItems = document.getElementById("cart-items");
  const emptyCartMessage = document.getElementById("empty-cart");
  const cartTotalMessage = document.getElementById("cart-total");
  const totalPriceDisplay = document.getElementById("total-price");
  const checkOutBtn = document.getElementById("checkout-btn");

  products.forEach((product) => {
    const productdiv = document.createElement("div");
    productdiv.classList.add("product");
    productdiv.innerHTML = `<span>${product.name}: $${product.Price.toFixed(2)}</span>
    <button data-id="${product.id}">Add to cart</button>`;

    ProductList.appendChild(productdiv);
  });

  ProductList.addEventListener("click", (e) => {
    if (e.target.tagName === "BUTTON") {
      const productId = parseInt(e.target.getAttribute("data-id"));
      const product = products.find((p) => p.id === productId);
      addToCart(product);
    }
  });

  let removeBtnDiv = document.createElement("div");
  removeBtnDiv.innerHTML = `<button id="remove-btn" class="btn">Remove</button>`;

  function addToCart(product) {
    cart.push(product);
    renderCart();
  }

  function renderCart() {
    cartItems.innerHTML = "";

    let totalPrice = 0.0;

    if (cart.length > 0) {
      cartTotalMessage.classList.remove("hidden");

      cart.forEach((item, index) => {
        totalPrice += item.Price;

        let cartItemDiv = document.createElement("div");
        cartItemDiv.innerHTML = `${item.name}: $${item.Price}`;
        cartItems.appendChild(cartItemDiv);

        totalPriceDisplay.textContent = `$${totalPrice.toFixed(2)}`;
      });
      cartItems.appendChild(removeBtnDiv);
      saveTasks();
    } else {
      const emptyMsg = document.createElement("p");
      emptyMsg.id = "empty-cart";
      emptyMsg.textContent = "Your cart is empty.";
      cartItems.appendChild(emptyMsg);

      totalPriceDisplay.textContent = "$0.00";
      cartTotalMessage.classList.add("hidden");
    }
  }

  checkOutBtn.addEventListener("click", () => {
    cart.length = 0;
    alert("Your Order Is Placed !");
    renderCart();
  });

  removeBtnDiv.addEventListener("click", () => {
    cart.pop();
    saveTasks();
    renderCart();
  });

  function saveTasks() {
    localStorage.setItem("cart", JSON.stringify(cart));
  }

  renderCart();
});
