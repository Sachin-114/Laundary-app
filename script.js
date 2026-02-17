emailjs.init("YOUR_PUBLIC_KEY");

let total = 0;
const cartItems = document.getElementById("cartItems");
const totalSpan = document.getElementById("total");

function addItem(name, price) {
  const li = document.createElement("li");
  li.innerText = `${name} - ₹${price}`;
  cartItems.appendChild(li);
  total += price;
  totalSpan.innerText = total;
}

function removeItem(name, price) {
  const items = cartItems.getElementsByTagName("li");
  for (let i = 0; i < items.length; i++) {
    if (items[i].innerText.includes(name)) {
      cartItems.removeChild(items[i]);
      total -= price;
      totalSpan.innerText = total;
      break;
    }
  }
}

function scrollToBooking() {
  document.getElementById("services").scrollIntoView({ behavior: "smooth" });
}

function bookNow() {
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const phone = document.getElementById("phone").value;

  emailjs.send("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", {
    user_name: name,
    user_email: email,
    user_phone: phone,
    total_amount: total
  });

  document.getElementById("msg").innerText =
    "Thank you For Booking the Service We will get back to you soon!";
}
