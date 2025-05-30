const products = [
  { name: "Phone Charger", price: 500, image: "https://via.placeholder.com/150?text=Charger", rating: 4 },
  { name: "School Bag", price: 1200, image: "https://via.placeholder.com/150?text=School+Bag", rating: 5 },
  { name: "Women Handbag", price: 1500, image: "https://via.placeholder.com/150?text=Handbag", rating: 4 },
  { name: "Solar Light", price: 1800, image: "https://via.placeholder.com/150?text=Solar+Light", rating: 3 },
  { name: "USB Cable", price: 200, image: "https://via.placeholder.com/150?text=USB+Cable", rating: 5 }
];

const cart = {};

function displayProducts() {
  const container = document.getElementById("product-list");
  container.innerHTML = "";
  products.forEach((product, index) => {
    const div = document.createElement("div");
    div.className = "product-card";

    const stars = "★".repeat(product.rating) + "☆".repeat(5 - product.rating);

    div.innerHTML = `
      <img src="${product.image}" alt="${product.name}" />
      <h3>${product.name}</h3>
      <p>Ksh ${product.price}</p>
      <div class="rating">${stars}</div>
      <button onclick="addToCart(${index})">Add to Cart</button>
    `;
    container.appendChild(div);
  });
}

function addToCart(index) {
  const product = products[index];
  if (cart[product.name]) {
    cart[product.name].quantity += 1;
  } else {
    cart[product.name] = {
      price: product.price,
      quantity: 1
    };
  }
  updateCart();
}

function removeFromCart(name) {
  if (cart[name]) {
    cart[name].quantity -= 1;
    if (cart[name].quantity <= 0) {
      delete cart[name];
    }
  }
  updateCart();
}

function updateCart() {
  const cartList = document.getElementById("cart");
  cartList.innerHTML = "";
  let total = 0;

  for (const [name, details] of Object.entries(cart)) {
    const itemTotal = details.price * details.quantity;
    total += itemTotal;
    const li = document.createElement("li");
    li.innerHTML = `
      ${name} - ${details.quantity} x Ksh ${details.price} = Ksh ${itemTotal}
      <button onclick="removeFromCart('${name}')">Remove</button>
    `;
    cartList.appendChild(li);
  }

  if (total > 0) {
    const summary = document.createElement("li");
    summary.innerHTML = `<strong>Total: Ksh ${total}</strong>`;
    cartList.appendChild(summary);
  } else {
    cartList.innerHTML = "<li>Your cart is empty.</li>";
  }
}

function checkout() {
  let message = "Order Summary:\n";
  let total = 0;

  for (const [name, details] of Object.entries(cart)) {
    message += `- ${name}: ${details.quantity} x Ksh ${details.price}\n`;
    total += details.price * details.quantity;
  }

  if (total === 0) {
    alert("Your cart is empty.");
    return;
  }

  message += `\nTotal: Ksh ${total}`;
  const whatsappUrl = `https://wa.me/254712345678?text=${encodeURIComponent(message)}`;
  window.open(whatsappUrl, '_blank');
}

displayProducts();
