let isSignUp = true; // Default form is Sign Up

function toggleForm() {
    isSignUp = !isSignUp;
    const formTitle = document.getElementById('form-title');
    const submitBtn = document.getElementById('submit-btn');
    const toggleText = document.getElementById('toggle-text');
    const toggleLink = document.getElementById('toggle-link');
    const errorMsg = document.getElementById('error-msg');
    
    if (!isSignUp) {
        formTitle.innerText = 'Login';
        submitBtn.innerText = 'Login';
        toggleText.innerText = "Don't have an account?";
        toggleLink.innerText = 'Sign Up';
        document.getElementById('confirm-password').style.display = 'none';
    } else {
        formTitle.innerText = 'Sign Up';
        submitBtn.innerText = 'Create Account';
        toggleText.innerText = "Already have an account?";
        toggleLink.innerText = 'Login';
        document.getElementById('confirm-password').style.display = 'block';
        errorMsg.style.display = 'none';
    }
}

document.getElementById('auth-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form from submitting normally
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;
    const errorMsg = document.getElementById('error-msg');

    if (isSignUp) {
        // Check if passwords match
        if (password !== confirmPassword) {
            errorMsg.innerText = "Passwords do not match!";
            errorMsg.style.display = "block";
            return;
        } else {
            errorMsg.style.display = "none";
            alert("Account created successfully!");
            // Here, you would normally handle storing the account credentials in a database
        }
    } else {
        alert("Logged in successfully!");
        // Handle login logic here, like verifying credentials
    }
});

// Toggle password visibility
function togglePasswordVisibility(id) {
    const passwordInput = document.getElementById(id);
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
    } else {
        passwordInput.type = 'password';
    }
}

document.getElementById('submit-btn').addEventListener('click', function() {
    window.location.href = 'http://127.0.0.1:5500/public/indexHT.html';
  });
