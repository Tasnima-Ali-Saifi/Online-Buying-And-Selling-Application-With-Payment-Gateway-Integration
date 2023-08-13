document.getElementById("login-form").addEventListener("submit", function (e) {
  e.preventDefault();

  // Get form values
  var email = document.getElementById("email").value;
  var password = document.getElementById("password").value;

  // Retrieve user object from localStorage
  var user = JSON.parse(localStorage.getItem('user'));

  if (user && user.email === email && user.password === password) {
    // Login successful
    localStorage.setItem('isLoggedIn', true); // Set the login status to true
    window.location.href = 'index.html'; // Redirect to index.html page
  } else {
    // Login failed
    alert('Invalid email or password. Please try again.');
  }

  // Clear form fields
  document.getElementById("email").value = "";
  document.getElementById("password").value = "";
});
