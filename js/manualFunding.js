const amountInput = document.getElementById('amount');
const amountError = document.getElementById('amount-error');
const usernameInput = document.getElementById('username');
const phoneNumberInput = document.getElementById('phone-number');
const phoneError = document.getElementById('phone-error');
const form = document.getElementById('manual-funding-form');
const copyButton = document.getElementById('copy-button');
const changeMethodButton = document.getElementById('change-method-button');

// Copy account number to clipboard
copyButton.addEventListener('click', () => {
    const accountNumber = document.getElementById('account-number').textContent;
    navigator.clipboard.writeText(accountNumber).then(() => {
        alert('Account number copied to clipboard!');
    }).catch(() => {
        alert('Failed to copy account number!');
    });
});

// Validate amount input
amountInput.addEventListener('input', () => {
    const amount = parseFloat(amountInput.value);
    if (amount < 100) {
        amountInput.style.border = '1px solid red';
        amountError.style.display = 'block';
    } else {
        amountInput.style.border = '1px solid #ddd';
        amountError.style.display = 'none';
    }
});
// Validate phone number input
phoneNumberInput.addEventListener('input', () => {
    const value = phoneNumberInput.value;
    if (!/^\d{11}$/.test(value)) {
        phoneNumberInput.style.border = '1px solid red';
        phoneError.style.display = 'block';
    } else {
        phoneNumberInput.style.border = '1px solid #ddd';
        phoneError.style.display = 'none';
    }
});

// Handle form submission
form.addEventListener('submit', (e) => {
    e.preventDefault();
    const amount = parseFloat(amountInput.value);
    const username = usernameInput.value;
    const phone = phoneNumberInput.value;
    const narration = document.getElementById('narration').value;
    if (amount < 100) {
        alert('Amount must be at least ₦100.');
        return;
    }
    if (!/^\d{11}$/.test(phone)) {
        alert('Please enter a valid 11-digit phone number.');
        return;
    }
    alert(`Form submitted successfully! 
Amount: ₦${amount}
Username: ${username}
Phone Number: ${phone}
Narration: ${narration || 'No narration provided.'}`);
    // Clear form fields
    form.reset();
    window.location.href = 'dashboard.html';
});

// Handle change payment method button
changeMethodButton.addEventListener('click', () => {
    window.location.href = 'fundWallet.html';
});