// Copy account number to clipboard
// Add event listeners to all copy buttons
const copyButtons = document.querySelectorAll('.copy-button');

copyButtons.forEach((button, index) => {
    button.addEventListener('click', () => {
        // Get the account number associated with the current button
        const accountNumber = document.querySelectorAll('.account-number')[index].textContent.trim();
        navigator.clipboard.writeText(accountNumber)
            .then(() => {
                alert('Account number copied to clipboard!');
            })
            .catch(() => {
                alert('Failed to copy account number!');
            });
    });
});


//  for navigation logic
// Navigate to the dashboard when "Done" is clicked
document.getElementById('done-button').addEventListener('click', () => {
    window.location.href = "dashboard.html"; 
});

// Navigate to a different page when "Change Payment Method" is clicked
document.getElementById('change-method-button').addEventListener('click', () => {
    window.location.href = 'fundWallet.html'; 
});
