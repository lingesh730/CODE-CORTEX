// Function to open tabs
function openTab(evt, tabName) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none"; // Hide all tabs
    }
    tablinks = document.querySelectorAll(".tab button");
    tablinks.forEach(function(btn) {
        btn.classList.remove("active");
    });
    document.getElementById(tabName).style.display = "block"; // Show the selected tab
    evt.currentTarget.classList.add("active");
}

// Click on the default tab to open it
document.getElementById("defaultOpen").click();

// Function for social login (placeholder)
function socialLogin(provider) {
    alert("Redirecting to " + provider + " login...");
    // Implement social login functionality here
}
document.getElementById('registerBtn').addEventListener('click', () => {
    fetch('/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: 'John Doe',
            email: 'john@example.com',
            password: 'password123'
        })
    })
    .then(response => response.json())
    .then(data => {
        console.log('User registered:', data);
    })
    .catch(error => {
        console.error('Error:', error);
    });
});
