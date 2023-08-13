function togglePasswordVisibility() {
  var passwordInput = document.getElementById("password");
  var toggleIcon = document.querySelector(".toggle-icon");
  if (passwordInput.type === "password") {
    passwordInput.type = "text";
    toggleIcon.innerHTML = "&#x1F576;";
  } else {
    passwordInput.type = "password";
    toggleIcon.innerHTML = "&#x1F441;";
  }
}

function validatePassword(password) {
  // Check password length
  if (password.length < 8) {
    return 'Password must be at least 8 characters long.';
  }

  // Check for at least 1 uppercase letter
  if (!/[A-Z]/.test(password)) {
    return 'Password must contain at least 1 uppercase letter.';
  }

  // Check for at least 1 special character
  if (!/[!@#$%^&*()]/.test(password)) {
    return 'Password must contain at least 1 special character.';
  }

  return null; // No error
}

document.getElementById("signup-form").addEventListener("submit", function (e) {
  e.preventDefault();

  // Get form values
  var firstName = document.getElementById("firstName").value;
  var lastName = document.getElementById("lastName").value;
  var email = document.getElementById("email").value;
  var password = document.getElementById("password").value;

  // Validate password
  var passwordError = validatePassword(password);
  if (passwordError) {
    document.getElementById("password-condition").textContent = passwordError;
    return;
  }

  // Create user object
  var user = {
    firstName: firstName,
    lastName: lastName,
    email: email,
    password: password
  };

  // Store user object in localStorage
  localStorage.setItem('user', JSON.stringify(user));
  localStorage.setItem('isLoggedIn', true); // Set the login status to true
  localStorage.setItem('userName', `${firstName} ${lastName}`); // Set the user's name in localStorage

  // Clear form fields
  document.getElementById("firstName").value = "";
  document.getElementById("lastName").value = "";
  document.getElementById("email").value = "";
  document.getElementById("password").value = "";

  // Show success message
  alert('Signup successful!');

  // Redirect to login page after a delay
  setTimeout(function () {
    window.location.href = 'login.html';
  }, 2000); // 2 seconds delay
});
