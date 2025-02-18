// Get the elements
const emailField = document.getElementById("email");
const amountInput = document.getElementById("amount");
const errorDiv = document.getElementById("amount-error");
const form = document.getElementById("card-funding-form");
const changeMethodButton = document.getElementById('change-method-button');

// Fetch the user's email from the API
async function getUserEmail() {
    try {
        const response = await fetch('https://api.example.com/getUserEmail'); // will replace with actual API endpoint
        const data = await response.json();
        if (data.email) {
            emailField.textContent = data.email; // Display the fetched email
        } else {
            emailField.textContent = 'Email not available'; // Handle case where email is not returned
        }
    } catch (error) {
        console.error('Error fetching email:', error);
        emailField.textContent = 'Error fetching email, Try again Later.'; // Display error if API call fails
    }
}

// Call the function to load the email when the page loads
getUserEmail();

// Add an event listener to check the amount when the form is submitted
form.addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent form submission for validation

    const amount = parseFloat(amountInput.value);

    // Validate the amount
    if (amount < 100) {
        errorDiv.style.display = "block"; // Show error if the amount is below ₦100
    } else {
        errorDiv.style.display = "none"; // Hide error if the amount is valid
        
        form.reset();

        console.log("Form is valid. You can proceed with the transaction.");

        // Redirect to the dashboard page
        window.location.href = "dashboard.html";
    }
});

changeMethodButton.addEventListener('click', () => {
    window.location.href = 'fundWallet.html';
});
