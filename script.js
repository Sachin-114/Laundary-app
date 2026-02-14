// ========== Scroll to Booking ==========
function scrollToBooking() {
  const bookingSection = document.getElementById("booking");
  if (bookingSection) {
    bookingSection.scrollIntoView({ behavior: "smooth" });
  }
}

// ========== Cart Logic ==========
let total = 0;
const cartItems = document.getElementById("cartItems");
const totalAmount = document.getElementById("total");

function addItem(name, price) {
  const li = document.createElement("li");
  li.setAttribute("data-name", name);
  li.innerText = `${name} - ₹${price}`;
  cartItems.appendChild(li);

  total += price;
  totalAmount.innerText = total;
}

function removeItem(name, price) {
  const items = cartItems.querySelectorAll("li");

  for (let i = 0; i < items.length; i++) {
    if (items[i].getAttribute("data-name") === name) {
      cartItems.removeChild(items[i]);
      total -= price;
      totalAmount.innerText = total < 0 ? 0 : total;
      return;
    }
  }

  alert("Bro, ye item cart me nahi hai ");
}

// ========== Book Now (Demo Mode - No EmailJS Key Needed) ==========
function sendEmail() {
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const phone = document.getElementById("phone").value.trim();

  if (!name || !email || !phone) {
    alert("Bro, saari details bhar de pehle ");
    return;
  }

  if (cartItems.children.length === 0) {
    alert("Bro, pehle koi service add kar ");
    return;
  }

  let services = [];
  document.querySelectorAll("#cartItems li").forEach((li) => {
    services.push(li.innerText);
  });

  console.log("ORDER (Demo Mode):", {
    name,
    email,
    phone,
    services,
    total
  });

  alert(
    `Order placed successfully! \n\n` +
    `Name: ${name}\n` +
    `Email: ${email}\n` +
    `Phone: ${phone}\n` +
    `Services: ${services.join(", ")}\n` +
    `Total: ₹${total}\n\n` +
    `Demo Email Mode`
  );

  // Reset cart
  cartItems.innerHTML = "";
  total = 0;
  totalAmount.innerText = "0";

  // Reset form
  document.getElementById("name").value = "";
  document.getElementById("email").value = "";
  document.getElementById("phone").value = "";
}
