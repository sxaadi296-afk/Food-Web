// ======================================
// ROYAL BITES - JAVASCRIPT
// ======================================


// 1. MOBILE NAVIGATION

function toggleMenu() {
    const navLinks = document.getElementById("navLinks");

    if (navLinks) {
        navLinks.classList.toggle("active");
    }
}


// 2. FOOD DATABASE

const foods = [
    {
        id: 1,
        name: "Classic Burger",
        category: "Burger",
        price: 650,
        image: "clburger.jpeg",
        description: "Fresh and delicious classic burger."
    },
    {
        id: 2,
        name: "Cheese Pizza",
        category: "Pizza",
        price: 1200,
        image: "chpizza.jpeg",
        description: "Cheesy pizza with fresh toppings."
    },
    {
        id: 3,
        name: "Creamy Pasta",
        category: "Pasta",
        price: 850,
        image: "crpasta.jpeg",
        description: "Creamy Italian style pasta."
    },
    {
        id: 4,
        name: "Chocolate Dessert",
        category: "Dessert",
        price: 450,
        image: "cdesert.jpeg",
        description: "Delicious chocolate dessert."
    },
    {
        id: 5,
        name: "Double Beef Burger",
        category: "Burger",
        price: 950,
        image: "Dbburger.jpeg",
        description: "Double beef burger with cheese."
    },
    {
        id: 6,
        name: "Italian Pizza",
        category: "Pizza",
        price: 1500,
        image: "ipizza.jpeg",
        description: "Authentic Italian pizza."
    },
    {
        id: 7,
        name: "White Sauce Pasta",
        category: "Pasta",
        price: 900,
        image: "wspasta.jpeg",
        description: "Rich and creamy white sauce pasta."
    },
    {
        id: 8,
        name: "Chocolate Cake",
        category: "Dessert",
        price: 550,
        image: "ccake.jpeg",
        description: "Fresh chocolate cake."
    }
];


// 3. DISPLAY FOOD

function displayFoods(productList = foods) {

    const container = document.getElementById("foodContainer");

    if (!container) return;

    container.innerHTML = "";

    if (productList.length === 0) {
        container.innerHTML = "<p>No food found!</p>";
        return;
    }

    productList.forEach(food => {

        container.innerHTML += `
            <div class="food-card">

                <img src="${food.image}" alt="${food.name}">

                <h3>${food.name}</h3>

                <p>Rs. ${food.price}</p>

                <button onclick="addToCart(${food.id})">
                    Add To Cart
                </button>

                <button onclick="addToFavorites(${food.id})">
                    ♡ Favourite
                </button>

                <a href="food-details.html?id=${food.id}">
                    View Details
                </a>

            </div>
        `;
    });
}


// 4. CART DATA

let cart = JSON.parse(localStorage.getItem("royalCart")) || [];

function saveCart() {
    localStorage.setItem("royalCart", JSON.stringify(cart));
}


// 5. ADD TO CART

function addToCart(id) {

    const food = foods.find(item => item.id === id);

    if (!food) return;

    const existingItem = cart.find(item => item.id === id);

    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({
            ...food,
            quantity: 1
        });
    }

    saveCart();
    alert(food.name + " added to cart!");
    displayCart();

}


// 6. DISPLAY CART

function displayCart() {

    const container = document.getElementById("cartContainer");

    if (!container) return;

    container.innerHTML = "";

    let total = 0;

    if (cart.length === 0) {
        container.innerHTML = "<h3>Your cart is empty!</h3>";
    }

    cart.forEach(item => {

        total += item.price * item.quantity;

        container.innerHTML += `
            <div class="cart-item">

                <img src="${item.image}" alt="${item.name}">

                <div>
                    <h3>${item.name}</h3>

                    <p>Rs. ${item.price}</p>

                    <button onclick="changeQuantity(${item.id}, -1)">-</button>

                    <span>${item.quantity}</span>

                    <button onclick="changeQuantity(${item.id}, 1)">+</button>

                    <button onclick="removeFromCart(${item.id})">Remove</button>
                </div>

            </div>
        `;
    });

    const totalElement = document.getElementById("cartTotal");

    if (totalElement) {
        totalElement.textContent = "Rs. " + total;
    }

}


// 7. CHANGE QUANTITY

function changeQuantity(id, amount) {

    const item = cart.find(food => food.id === id);

    if (!item) return;

    item.quantity += amount;

    if (item.quantity <= 0) {
        removeFromCart(id);
    } else {
        saveCart();
        displayCart();
    }

}


// 8. REMOVE ITEM

function removeFromCart(id) {
    cart = cart.filter(item => item.id !== id);
    saveCart();
    displayCart();
}


// 9. SEARCH FOOD

function searchFood() {

    const input = document.getElementById("searchFood") || document.getElementById("searchInput");

    if (!input) return;

    const value = input.value.toLowerCase().trim();

    const results = foods.filter(food =>
        food.name.toLowerCase().includes(value)
    );

    displayFoods(results);
}


// 10. CATEGORY FILTER

function filterFood(category) {

    const selectedCategory = category.toLowerCase();

    if (selectedCategory === "all") {
        displayFoods();
        return;
    }

    const results = foods.filter(food =>
        food.category.toLowerCase() === selectedCategory
    );

    displayFoods(results);
}


// 11. FAVOURITES

let favorites = JSON.parse(localStorage.getItem("royalFavorites")) || [];

function addToFavorites(id) {

    if (favorites.includes(id)) {
        favorites = favorites.filter(item => item !== id);
        alert("Removed from favourites!");
    } else {
        favorites.push(id);
        alert("Added to favourites!");
    }

    localStorage.setItem("royalFavorites", JSON.stringify(favorites));

}


// 12. NEWSLETTER

const newsletterForm = document.getElementById("newsletterForm");

if (newsletterForm) {
    newsletterForm.addEventListener("submit", function(event) {
        event.preventDefault();
        alert("Thank you for subscribing!");
        newsletterForm.reset();
    });
}


// 13. CHECKOUT FUNCTIONALITY

const checkoutForm = document.getElementById("checkoutForm");

if (checkoutForm) {

    checkoutForm.addEventListener("submit", function(event) {

        event.preventDefault();

        const name = document.getElementById("customerName").value.trim();
        const phone = document.getElementById("customerPhone").value.trim();
        const address = document.getElementById("customerAddress").value.trim();
        const payment = document.getElementById("paymentMethod").value;

        if (!name || !phone || !address || !payment) {
            alert("Please fill all the fields!");
            return;
        }

        if (cart.length === 0) {
            alert("Your cart is empty!");
            return;
        }

        const order = {
            customerName: name,
            customerPhone: phone,
            customerAddress: address,
            paymentMethod: payment,
            items: cart,
            total: cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
        };

        localStorage.setItem("royalOrder", JSON.stringify(order));

        localStorage.removeItem("royalCart");
        cart = [];

        window.location.href = "confirmation.html";

    });

}


// 14. ORDER CONFIRMATION

document.addEventListener("DOMContentLoaded", function () {

    displayFoods();
    displayCart();

    const searchInput = document.getElementById("searchFood") || document.getElementById("searchInput");

    if (searchInput) {
        searchInput.addEventListener("input", searchFood);
    }

    const order = JSON.parse(localStorage.getItem("royalOrder"));

    if (order) {
        const customerName = document.getElementById("orderCustomerName");
        const orderItems = document.getElementById("orderItems");
        const orderTotal = document.getElementById("orderTotal");
        const paymentInfo = document.getElementById("paymentInfo");

        if (customerName) customerName.textContent = order.customerName;

        if (orderItems) {
            orderItems.innerHTML = "";
            order.items.forEach(function (item) {
                const li = document.createElement("li");
                li.textContent = item.name + " × " + item.quantity + " — Rs. " + (item.price * item.quantity);
                orderItems.appendChild(li);
            });
        }

        if (orderTotal) orderTotal.textContent = "Rs. " + order.total;
        if (paymentInfo) paymentInfo.textContent = order.paymentMethod;
    }

});
// LOGIN FUNCTIONALITY

document.addEventListener("DOMContentLoaded", function () {

    const loginForm = document.getElementById("loginForm");

    if (!loginForm) return;

    loginForm.addEventListener("submit", function (event) {

        event.preventDefault();

        const email = document.getElementById("loginEmail").value.trim();
        const password = document.getElementById("loginPassword").value;

        const savedUser = JSON.parse(localStorage.getItem("royalUser"));

        if (!email || !password) {
            alert("Please fill all fields!");
            return;
        }

        if (!savedUser) {
            alert("No account found! Please sign up first.");
            return;
        }

        if (email === savedUser.email &&
            password === savedUser.password) {

            alert("Login Successful! Welcome to Royal Bite.");
            window.location.href = "index.html";

        } else {
            alert("Invalid email or password!");
        }

    });

});
// SIGNUP FUNCTIONALITY

document.addEventListener("DOMContentLoaded", function () {

    const signupForm = document.getElementById("signupForm");

    if (!signupForm) return;

    signupForm.addEventListener("submit", function (event) {

        event.preventDefault();

        const name = document.getElementById("signupName").value.trim();
        const email = document.getElementById("signupEmail").value.trim();
        const password = document.getElementById("signupPassword").value;
        const confirmPassword = document.getElementById("confirmPassword").value;

        if (!name || !email || !password || !confirmPassword) {
            alert("Please fill all fields!");
            return;
        }

        if (password.length < 6) {
            alert("Password must be at least 6 characters!");
            return;
        }

        if (password !== confirmPassword) {
            alert("Passwords do not match!");
            return;
        }

        const existingUser = JSON.parse(localStorage.getItem("royalUser"));

        if (existingUser && existingUser.email === email) {
            alert("This email is already registered!");
            return;
        }

        const user = {
            name: name,
            email: email,
            password: password
        };

        localStorage.setItem("royalUser", JSON.stringify(user));

        alert("Account created successfully!");

        window.location.href = "login.html";

    });

});
// RESERVATION FUNCTIONALITY

document.addEventListener("DOMContentLoaded", function () {

    const reservationForm = document.getElementById("reservationForm");

    if (!reservationForm) return;

    reservationForm.addEventListener("submit", function (event) {

        event.preventDefault();

        const reservation = {
            name: document.getElementById("reservationName").value.trim(),
            email: document.getElementById("guestEmail").value.trim(),
            phone: document.getElementById("reservationPhone").value.trim(),
            date: document.getElementById("reservationDate").value,
            time: document.getElementById("reservationTime").value,
            guests: document.getElementById("reservationGuests").value,
            request: document.getElementById("specialRequest").value.trim()
        };

        localStorage.setItem(
            "royalReservation",
            JSON.stringify(reservation)
        );

        alert("Reservation request submitted successfully!");

        reservationForm.reset();

    });

});
// CONTACT FORM FUNCTIONALITY

document.addEventListener("DOMContentLoaded", function () {

    const contactForm = document.getElementById("contactForm");

    if (!contactForm) return;

    contactForm.addEventListener("submit", function (event) {

        event.preventDefault();

        const name = document.getElementById("contactName").value.trim();
        const email = document.getElementById("contactEmail").value.trim();
        const subject = document.getElementById("contactSubject").value.trim();
        const message = document.getElementById("contactMessage").value.trim();

        if (!name || !email || !subject || !message) {
            alert("Please fill all fields!");
            return;
        }

        const contactData = {
            name: name,
            email: email,
            subject: subject,
            message: message
        };

        localStorage.setItem(
            "royalContact",
            JSON.stringify(contactData)
        );

        alert("Your message has been submitted successfully!");

        contactForm.reset();

    });

});