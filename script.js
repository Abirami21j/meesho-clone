// ================================
// SHOP NOW BUTTON
// ================================

const shopBtn = document.getElementById("shopBtn");

if (shopBtn) {
    shopBtn.addEventListener("click", function () {
        document.getElementById("products").scrollIntoView({
            behavior: "smooth"
        });
    });
}

// ================================
// ADD TO CART
// ================================

const addButtons = document.querySelectorAll(".add");

addButtons.forEach(button => {
    button.addEventListener("click", function () {
        alert("✅ Product added to cart!");
    });
});

// ================================
// BUY NOW
// ================================

const buyButtons = document.querySelectorAll(".buy");

buyButtons.forEach(button => {
    button.addEventListener("click", function () {
        alert("🛍 Redirecting to Checkout...");
    });
});

// ================================
// SEARCH BOX
// ================================

const searchBox = document.querySelector(".search-box input");

if (searchBox) {

    searchBox.addEventListener("keyup", function () {

        const search = searchBox.value.toLowerCase();

        const cards = document.querySelectorAll(".product-card");

        cards.forEach(card => {

            const title = card.querySelector("h3").textContent.toLowerCase();

            if (title.includes(search)) {
                card.style.display = "block";
            } else {
                card.style.display = "none";
            }

        });

    });

}

// ================================
// VIEW MORE
// ================================

const viewMore = document.getElementById("viewMore");

if (viewMore) {

    viewMore.addEventListener("click", function () {

        window.location.href = "product.html";

    });

}

// ================================
// OFFER SLIDER
// ================================

const offers = [

"https://images.meesho.com/images/marketing/1767796583251.webp",

"https://images.meesho.com/images/marketing/1744698143534.webp",

"https://images.meesho.com/images/marketing/1744634654837.webp",

"https://images.meesho.com/images/marketing/1746425994914.webp"

];

let current = 0;

const banner = document.getElementById("offerImage");

function changeOffer() {

    if (banner) {

        banner.src = offers[current];

        current++;

        if (current >= offers.length) {

            current = 0;

        }

    }

}

changeOffer();

setInterval(changeOffer, 3000);

// ================================
// GREETING
// ================================

const hour = new Date().getHours();

if (hour < 12) {

    console.log("Good Morning ☀️");

}
else if (hour < 17) {

    console.log("Good Afternoon 🌞");

}
else {

    console.log("Good Evening 🌙");

}

// ================================
// WELCOME MESSAGE
// ================================

window.onload = function () {

    console.log("Welcome to Meesho Clone");

};