const bar = document.getElementById('bar');
const close = document.getElementById('close');
const nav = document.getElementById('navbar');

if (bar) {
    bar.addEventListener('click', () => {
        nav.classList.add('active');
    });
}

if (close) {
    close.addEventListener('click', () => {
        nav.classList.remove('active');
    });
}


 // Optional: Stop animation on hover
 var saleElement = document.getElementById('sale');
 saleElement.addEventListener('mouseenter', function() {
   saleElement.style.animationPlayState = 'paused';
 });
 saleElement.addEventListener('mouseleave', function() {
   saleElement.style.animationPlayState = 'running';
 });

const addToCartButtons = document.querySelectorAll(".add-to-cart");

// Add click event listener to each button
addToCartButtons.forEach(button => {
    button.addEventListener("click", addToCart);
});

// Function to handle adding the item to the cart
// Function to handle adding the item to the cart
function addToCart(event) {
    const product = event.target.closest(".pro");

    // Get the product details
    const productImage = product.querySelector(".image").src;
    const productName = product.querySelector(".name").textContent;
    const productBrand = product.querySelector(".brand").textContent;
    const productPrice = product.querySelector(".price").textContent;

    // Create an object representing the item
    const item = {
        image: productImage,
        name: productName,
        brand: productBrand,
        price: productPrice
    };

    // Retrieve the cart items from local storage
    let cartItems = localStorage.getItem("cartItems");
    cartItems = cartItems ? JSON.parse(cartItems) : [];

    // Add the item to the cart
    cartItems.push(item);

    // Store the updated cart items in local storage
    localStorage.setItem("cartItems", JSON.stringify(cartItems));

    // Create a confirmation dialog with OK and Cancel buttons
    const confirmation = confirm(`${productName} has been added to the cart!\n\nPress OK to view the cart or Cancel to continue shopping.`);

    // Handle the user's confirmation choice
    if (confirmation) {
        // Redirect to the cart page
        window.location.href = "cart.html";
    } else {
        // Continue shopping
    }
}

// index.js

// Function to retrieve the user's name from localStorage
// Function to retrieve user information from local storage and populate the profile section
function populateProfileSection() {
    // Retrieve the user's name from local storage
    const userName = localStorage.getItem("userName");

    // Extract the first name from the full name
  const firstName = userName.split(" ")[0];
  
    // Populate the profile section in index.html with the retrieved information
    const profileNameElement = document.getElementById("profileName");
  
    profileNameElement.textContent = firstName; // Set the text content of the profile name
}
  
  // Function to check if the user is logged in and update the UI accordingly
  function checkLoggedIn() {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
  
    if (isLoggedIn) {
      // User is logged in
      const loginIcon = document.querySelector("#navbar .loginIcon");
      if (loginIcon) {
        loginIcon.style.display = "none"; // Hide the login icon
      }
  
      const logoutIcon = document.createElement("a");
      logoutIcon.href = "#";
      logoutIcon.id = "logoutIcon";
      logoutIcon.innerHTML = '<i class="fas fa-sign-out-alt"></i> Logout';
      logoutIcon.addEventListener("click", handleLogout);
  
      const navbar = document.getElementById("navbar");
      navbar.appendChild(logoutIcon);
  
      // Populate the profile section
      populateProfileSection();
    } else {
      // User is not logged in
      // Redirect to login.html page
      window.location.href = 'login.html';
    }
  }
  
  function handleLogout() {
    // Clear user data from local storage
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userName");
    localStorage.removeItem("userImage");
  
    // Redirect to login.html page
    window.location.href = 'login.html';
  }
  
  // Call the function to check if the user is logged in when the page loads
  window.onload = function () {
    checkLoggedIn();
  };
  