  emailjs.init("qAxkEkowVDc6RGbff"); // Public Key

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

  // +91 / 0 optional, 10 digit number validation
  const pattern = /^(?:\+91|0)?[6-9]\d{9}$/;

  function validateForm(name, email, phone) {
    if (!name.trim()) {
      alert("Name is empty");
      return false;
    }

    if (!email.trim() || !email.includes("@")) {
      alert("Email is not valid");
      return false;
    }

    if (!phone.trim()) {
      alert("Enter phone number");
      return false;
    }

    if (!pattern.test(phone)) {
      alert("Enter valid 10 digit mobile number (0 / +91 allowed)");
      return false;
    }

    if (total === 0) {
      alert("Please add at least one service");
      return false;
    }

    return true;
  }

  function bookNow() {
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;

    if (!validateForm(name, email, phone)) return;

    const serviceList = Array.from(cartItems.children)
      .map(li => li.innerText)
      .join(", ");

    const params = {
      name: name,
      email: email,
      phone: phone,
      services: serviceList,
      total: total
    };

    emailjs
      .send("service_c1u595t", "template_6y9cbyw", params)
      .then(function () {
        document.getElementById("msg").innerText =
          "Thank you for booking! We will get back to you soon.";
      })
      .catch(function (error) {
        alert("Failed to send booking: " + error.text);
      });
  }