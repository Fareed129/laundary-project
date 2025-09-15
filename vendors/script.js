// ==========================
// CART FUNCTIONALITY
// ==========================
const addButtons = document.querySelectorAll(".add");
const removeButtons = document.querySelectorAll(".remove");
const cartBody = document.getElementById("cart-body");
const totalAmountEl = document.getElementById("total-amount");

let cart = [];
let total = 0;

// Helper: Render Cart
function renderCart() {
  cartBody.innerHTML = "";

  if (cart.length === 0) {
    cartBody.innerHTML = `
      <tr class="cart-empty">
        <td colspan="3" style="text-align:center; color: grey;">
          <div class="empty-info">
            <ion-icon class="info-icon" name="information-circle-outline"></ion-icon>
            <p class="title">No items in cart</p>
            <p class="subtitle">Add items to the cart from service bar.</p>
          </div>
        </td>
      </tr>`;
  } else {
    cart.forEach((item, index) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${index + 1}</td>
        <td>${item.name}</td>
        <td>₹${item.price.toFixed(2)}</td>`;
      cartBody.appendChild(row);
    });
  }

  totalAmountEl.innerText = total.toFixed(2);
}

// Add Service
addButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    const serviceItem = btn.closest(".service-item");
    const name = serviceItem.dataset.name;
    const price = parseFloat(serviceItem.dataset.price);

    cart.push({ name, price });
    total += price;

    btn.style.display = "none";
    btn.nextElementSibling.style.display = "inline-block";

    renderCart();
  });
});

// Remove Service
removeButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    const serviceItem = btn.closest(".service-item");
    const name = serviceItem.dataset.name;
    const price = parseFloat(serviceItem.dataset.price);

    cart = cart.filter(item => item.name !== name);
    total -= price;

    btn.style.display = "none";
    btn.previousElementSibling.style.display = "inline-block";

    renderCart();
  });
});

/// ==========================
// BOOKING FORM / EMAILJS
// ==========================
document.addEventListener("DOMContentLoaded", () => {
  const bookingForm = document.getElementById("booking-form");
  const successMsg = document.getElementById("booking-success");

  successMsg.style.display = "none"; // hide initially

  bookingForm.addEventListener("submit", (e) => {
    e.preventDefault();

    // Validate cart
    if (cart.length === 0) {
      alert("Please add at least one service to book.");
      return;
    }

    // Collect form data
    const fullName = document.getElementById("fullname").value.trim();
    const email = document.getElementById("email").value.trim();
    const mobile = document.getElementById("mobile").value.trim();

    if (!fullName || !email || !mobile) {
      alert("Please fill all required fields (Name, Email, Mobile).");
      return;
    }

    const templateParams = {
      fullname: fullName,
      email: email,
      mobile: mobile,
      total_amount: total.toFixed(2)
    };

    // Send email using promise chaining
    emailjs.send("service_u6pll1p", "template_0lcqzrn", templateParams)
      .then((response) => {
        // Show success message
        successMsg.style.display = "block";
        successMsg.innerText = "Thank you! Your booking is confirmed. A confirmation email has been sent.";

        // Auto-hide after 5 seconds
        setTimeout(() => {
          successMsg.style.display = "none";
        }, 5000);

        // Reset form & cart
        bookingForm.reset();
        cart = [];
        total = 0;
        renderCart();

        // Reset buttons
        addButtons.forEach(btn => (btn.style.display = "inline-block"));
        removeButtons.forEach(btn => (btn.style.display = "none"));

      }, (error) => {
        console.error("EmailJS error:", error);
        alert("Failed to send confirmation email. Check your EmailJS config or internet connection.");
      });
  });
});
