function validatePasswords() {
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;

    if (password !== confirmPassword) {
        alert('Passwords do not match. Please try again.');
        return false;
    }
    return true;
}

function togglePasswordVisibility(fieldId, iconElement) {
    const passwordField = document.getElementById(fieldId);
    if (passwordField.type === "password") {
        passwordField.type = "text";
        iconElement.src = "assets/images/icons/eye.svg"; // Change to "hide" icon

    } else {
        passwordField.type = "password";
        iconElement.src = "assets/images/icons/eye-slash.svg"; // Change back to "show" icon
    }   

    // Ensure consistent size
    iconElement.style.width = "20px"; 
    iconElement.style.height = "20px"; 
}

// Smooth Scrolling for Anchor Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute("href"));
        target.scrollIntoView({
            behavior: "smooth"
        });
    });
});
