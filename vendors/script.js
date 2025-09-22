let cart = [];
let total = 0;

const addButtons = document.querySelectorAll(".add");
const removeButtons = document.querySelectorAll(".remove");
const cartBody = document.getElementById("cart-body");
const totalAmount = document.getElementById("total-amount");
const bookingForm = document.getElementById("booking-form");
const successMsg = document.getElementById("booking-success");

function updateCart() {
    cartBody.innerHTML = "";

    if (cart.length === 0) {
        cartBody.innerHTML = `
            <tr>
                <td colspan="3" style="text-align:center; color: grey;">
                    Your cart is empty.
                </td>
            </tr>`;
    } else {
        cart.forEach((item, index) => {
            let row = document.createElement("tr");
            row.innerHTML = `
                <td>${index + 1}</td>
                <td>${item.name}</td>
                <td>₹${item.price}</td>`;
            cartBody.appendChild(row);
        });
    }

    totalAmount.innerText = total;
}

addButtons.forEach(btn => {
    btn.addEventListener("click", () => {
        let box = btn.closest(".service-item");
        let name = box.dataset.name;
        let price = parseFloat(box.dataset.price);

        cart.push({ name: name, price: price });
        total += price;

        btn.style.display = "none";
        btn.nextElementSibling.style.display = "inline-block";

        updateCart();
    });
});

removeButtons.forEach(btn => {
    btn.addEventListener("click", () => {
        let box = btn.closest(".service-item");
        let name = box.dataset.name;
        let price = parseFloat(box.dataset.price);

        cart = cart.filter(item => item.name !== name);
        total -= price;

        btn.style.display = "none";
        btn.previousElementSibling.style.display = "inline-block";

        updateCart();
    });
});


function sendMail() {
   

    const bookBtn = document.querySelector(".book-now-btn");

    // Check if cart is empty
    if (cart.length === 0) {
        alert("Please add at least one item in cart.");
        return;
    }

    // Change button text to "Booking..."
    bookBtn.innerText = "Booking...";

    let params = {
        from_name: document.getElementById("fullname").value,
        reply_to: document.getElementById("email").value,
        cart: cart.map(item => `${item.name} (₹${item.price})`).join(", "),
        total: total.toFixed(2)
    };

    emailjs.send("service_fy6g2rt", "template_4ysb3ai", params)
.then(() => {
    successMsg.style.display = "block";
    bookBtn.innerText = "Booking Success"; 
    bookBtn.style.backgroundColor = "#4CAF50";

    setTimeout(() => {
        successMsg.style.display = "none";
        bookBtn.innerText = "Book Now";
        bookBtn.style.backgroundColor = "";
    }, 6000);

    bookingForm.reset();
    cart = [];
    total = 0;
    updateCart();
})
.catch((err) => {
    console.error("Email failed:", err);
    bookBtn.innerText = "Book Now";
});

}
