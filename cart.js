

// // Display the cart items initially
// displayCartItems();
// Check if cartItems exists in local storage, otherwise initialize it as an empty array
let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

// Get the cart container and total price field
const cartContainer = document.getElementById("cart-items");
const totalPriceField = document.getElementById("total-price");

// Function to handle removing an item from the cart
function removeItem(index) {
    // Get the item to be removed
    const item = cartItems[index];

    // Display an alert confirmation popup
    const confirmRemove = confirm(`Are you sure you want to remove ${item.name} from the cart?`);

    // Check if the user confirmed the removal
    if (confirmRemove) {
        // Remove the item from the cart items array
        cartItems.splice(index, 1);

        // Update the cart items in local storage
        localStorage.setItem("cartItems", JSON.stringify(cartItems));

        // Refresh the cart display and total price
        displayCartItems();
        calculateTotalPrice();
    }
}

// Function to display the cart items
function displayCartItems() {
    // Clear the cart container
    cartContainer.innerHTML = "";

    // Iterate over the cart items and display them
    cartItems.forEach((item, index) => {
        const cartItem = document.createElement("div");
        cartItem.classList.add("cart-item");

        const image = document.createElement("img");
        image.src = item.image;
        cartItem.appendChild(image);

        const name = document.createElement("h5");
        name.textContent = item.name;
        cartItem.appendChild(name);

        const brand = document.createElement("span");
        brand.textContent = item.brand;
        cartItem.appendChild(brand);

        const price = document.createElement("h4");
        price.textContent = item.price;
        price.classList.add("price");
        cartItem.appendChild(price);

        const clearButton = document.createElement("button");
        clearButton.textContent = "Clear Item";
        clearButton.classList.add("btn", "btn-success");
        clearButton.addEventListener("click", () => removeItem(index));
        cartItem.appendChild(clearButton);

        cartContainer.appendChild(cartItem);
    });
}

// Function to calculate the total price of cart items
function calculateTotalPrice() {
    let totalPrice = 0;
    const priceElements = document.getElementsByClassName("price");
    for (let i = 0; i < priceElements.length; i++) {
        const itemPrice = parseFloat(priceElements[i].textContent.replace(/[^\d.]/g, ""));
        if (!isNaN(itemPrice)) {
            totalPrice += itemPrice;
        }
    }
    totalPriceField.value = ` ${totalPrice.toFixed(1)}`;
}

// Function to create a Razorpay order
function createRazorpayOrder() {
  // Retrieve the total price from the input field
  const totalPrice = parseFloat(totalPriceField.value);

  // Check if the total price is valid
  if (isNaN(totalPrice) || totalPrice <= 0) {
    alert("Invalid total price.");
    return;
  }

  // Make an AJAX request to the server to create the order
  var serverUrl =  'http://127.0.0.1:5000';  // Replace with your server IP address and port
  var createOrderUrl = serverUrl + '/create-order';

  $.ajax({
    url: createOrderUrl,
    type: "POST",
    data: JSON.stringify({ amount: totalPrice * 100, currency: "INR", receipt: "receipt" }),
    contentType: "application/json",
    dataType: "json",
    success: function (data) {
      // Once the order is created, proceed with the payment
      const options = {
        key: "rzp_test_j5Kw2jj4nakv3i",
        amount: data.orderId.amount,
        currency: data.orderId.currency,
        name: "Tasnima Saifi's Store",
        description: "Payment",
        order_id: data.orderId.id,
        handler: function (response) {
          // Handle the payment response here (e.g., update database, show success message)
          console.log(response);
          displayOrderDetails(response);
        },
        prefill: {
          name: "Tasnima Ali Saifi",
          email: "tasnimaalisaifi@gmail.com",
          contact: "7061399715"
        },
        notes: {
          address: "Graphic Era Demeed To Be University,Clement town,Dehradun,Uttranchal,248002"
        },
        theme: {
          color: "#F37254"
        }
      };

      const rzp1 = new Razorpay(options);
      rzp1.open();
    },
    error: function (error) {
      console.log(error);
      alert("An error occurred while creating the order. Please try again.");
    }
  });
}

// Function to display the order details
function displayOrderDetails(response) {
  // Retrieve the order details from the response object
  const orderId = response.razorpay_order_id;
  const paymentId = response.razorpay_payment_id;
  const signature = response.razorpay_signature;

  // Display the order details
  alert("Payment successful!\n\nOrder ID: " + orderId + "\nPayment ID: " + paymentId + "\nSignature: " + signature);
}



// Display the cart items and total price initially
displayCartItems();
calculateTotalPrice();


//service worker 
if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
    navigator.serviceWorker.register('/service-worker.js')
      .then(function(registration) {
        console.log('Service Worker registered with scope:', registration.scope);
      })
      .catch(function(error) {
        console.log('Service Worker registration failed:', error);
      });
  });
}
