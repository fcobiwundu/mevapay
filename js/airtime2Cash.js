document.addEventListener("DOMContentLoaded", () => {

    const serviceProviderLogos = document.querySelectorAll('.service-provider-logo');
    const amountInput          = document.getElementById('amount');
    const receiveAmountField   = document.getElementById('receive-amount');
    const errorField           = document.getElementById('amount-error');
    const networkErrorField    = document.getElementById('network-error');
    const phoneNumberInput     = document.getElementById('phone-number');
    const phoneError           = document.getElementById('phone-error');
    const accountNumberInput   = document.getElementById('account-number');
    const accountError         = document.getElementById('account-error');
    const accountNameInput     = document.getElementById('account-name');
    const screenshotInput      = document.getElementById('screenshot');
    const fileNameDisplay      = document.getElementById('file-name');
    const screenshotError      = document.getElementById('screenshot-error');
    const form                 = document.getElementById('airtime-form');

    // Modals
    const successModal         = document.getElementById('success-modal');
    const errorModal           = document.getElementById('error-modal');
    const doneBtn              = document.getElementById('done-btn');
    const convertAgainBtn      = document.getElementById('convert-again-btn');
    const tryAgainBtn          = document.getElementById('try-again-btn');
    const gotItBtn             = document.getElementById('got-it-btn');
    const errorModalMessage    = document.getElementById('error-modal-message');

    const rates = {
        mtn: 0.8,
        airtel: 0.7,
        glo: 0.6,
        '9mobile': 0.5
    };
    let selectedNetwork = '';

    let failedAttempts = 0;
    const maxFailedAttempts = 3;

    // ====== HELPER FUNCTIONS ======
    function updateReceiveAmount() {
        const amount = parseFloat(amountInput.value);
        if (selectedNetwork && amount >= 100) {
            const rate = rates[selectedNetwork];
            const receiveAmount = (amount * rate).toFixed(2);
            receiveAmountField.textContent = `₦${receiveAmount}`;
        } else {
            receiveAmountField.textContent = '₦0';
        }
    }

    function resetForm() {
        form.reset();
        receiveAmountField.textContent = '₦0';
        serviceProviderLogos.forEach(logo => logo.classList.remove('active'));
        selectedNetwork = '';
        failedAttempts = 0;
        hideAllErrors();
        screenshotError.style.display = 'none';
        fileNameDisplay.innerHTML = 'Drop file or click <span class="upload-link"  style="color: #146EF5; text-decoration: underline;">here</span> to upload';
    }

    function hideAllErrors() {
        errorField.style.display = 'none';
        networkErrorField.style.display = 'none';
        phoneError.style.display = 'none';
        accountError.style.display = 'none';
        screenshotError.style.display = 'none';
        amountInput.style.border = '1px solid #ddd';
        phoneNumberInput.style.border = '1px solid #ddd';
        accountNumberInput.style.border = '1px solid #ddd';
        screenshotInput.style.border = '1px solid #ddd';
    }

    /**
     * Displays an error message below the screenshot input.
     *
     * @param {string} message - The error message to display.
     */
    function displayFileError(message) {
        screenshotError.textContent = message;
        screenshotError.style.display = 'block';
        screenshotInput.style.border = '1px solid red';
        screenshotInput.value = '';
        fileNameDisplay.innerHTML = 'Drop file or click <span class="upload-link"  style="color: #146EF5; text-decoration: underline;">here</span> to upload';
    }

    // ====== EVENT LISTENERS ======
    // Handle network selection
    serviceProviderLogos.forEach(logo => {
        logo.addEventListener('click', () => {
            serviceProviderLogos.forEach(l => l.classList.remove('active'));
            logo.classList.add('active');
            selectedNetwork = logo.getAttribute('data-network');
            networkErrorField.style.display = 'none';
            updateReceiveAmount();
        });
    });

    // Handle amount input
    amountInput.addEventListener('input', () => {
        const amount = parseFloat(amountInput.value);
        if (!selectedNetwork) {
            amountInput.style.border = '1px solid red';
            networkErrorField.style.display = 'block';
            errorField.style.display = 'none';
            receiveAmountField.textContent = '₦0';
            return;
        }
        networkErrorField.style.display = 'none';
        if (isNaN(amount) || amount < 100) {
            amountInput.style.border = '1px solid red';
            errorField.style.display = 'block';
        } else {
            amountInput.style.border = '1px solid #ddd';
            errorField.style.display = 'none';
        }
        updateReceiveAmount();
    });

    // Validate phone number
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

    // Validate account number
    accountNumberInput.addEventListener('input', () => {
        const value = accountNumberInput.value;
        if (!/^\d{10}$/.test(value)) {
            accountNumberInput.style.border = '1px solid red';
            accountError.style.display = 'block';
        } else {
            accountNumberInput.style.border = '1px solid #ddd';
            accountError.style.display = 'none';
        }
    });

    // Advanced file validation and display
    screenshotInput.addEventListener('change', (event) => {
        const file = event.target.files[0];
        if (file) {
            const fileType = file.type;
            const validImageTypes = ['image/jpeg', 'image/png', 'image/jpg'];
            if (!validImageTypes.includes(fileType) || file.size > 5 * 1024 * 1024) {
                displayFileError('Please upload a valid image file (JPEG, PNG, JPG) under 5MB.');
                return;
            }
            // If all validations pass
            screenshotError.style.display = 'none';
            screenshotInput.style.border = '1px solid #ddd';
            fileNameDisplay.textContent = file.name;
        } else {
            fileNameDisplay.innerHTML = 'Drop file or click <span class="upload-link" style="color: #146EF5; text-decoration: underline;">here</span> to upload';
            screenshotError.style.display = 'none';
            screenshotInput.style.border = '1px solid #ddd';
        }
    });

    // Handle form submission
    form.addEventListener('submit', function (e) {
        e.preventDefault();
        hideAllErrors();

        let valid = true;

        // Validate service provider
        if (!selectedNetwork) {
            networkErrorField.style.display = 'block';
            valid = false;
        }

        // Validate amount
        const amount = parseFloat(amountInput.value);
        if (isNaN(amount) || amount < 100) {
            amountInput.style.border = '1px solid red';
            errorField.style.display = 'block';
            valid = false;
        }

        // Validate phone number
        const phoneValue = phoneNumberInput.value;
        if (!/^\d{11}$/.test(phoneValue)) {
            phoneNumberInput.style.border = '1px solid red';
            phoneError.style.display = 'block';
            valid = false;
        }

        // Validate account number
        const accountValue = accountNumberInput.value;
        if (!/^\d{10}$/.test(accountValue)) {
            accountNumberInput.style.border = '1px solid red';
            accountError.style.display = 'block';
            valid = false;
        }

        // Validate screenshot
        const file = screenshotInput.files[0];
        if (!file) {
            displayFileError('Please upload a screenshot.');
            valid = false;
        } else {
            const fileType = file.type;
            const validImageTypes = ['image/jpeg', 'image/png', 'image/jpg'];
            if (!validImageTypes.includes(fileType) || file.size > 5 * 1024 * 1024) {
                displayFileError('Please upload a valid image file (JPEG, PNG, JPG) under 5MB.');
                valid = false;
            }
            if (!file.name.match(/^[a-zA-Z0-9_.-]+$/)) {
                displayFileError('Please upload a valid image.');
                valid = false;
            }
        }

        if (!valid) {
            return;
        }

        // Show loading indicator before starting the async operation
        showLoading();

        // Simulate form submission (will replace with actual AJAX request)
        simulateFormSubmission()
            .then(response => {
                // Hide loading indicator after the operation completes
                hideLoading();

                if (response.success) {
                    showModal(successModal);
                } else {
                    failedAttempts++;
                    if (failedAttempts >= maxFailedAttempts) {
                        errorModalMessage.textContent = 'Please try again later.';
                        tryAgainBtn.style.display = 'none';
                        gotItBtn.style.display = 'inline-block';
                    } else {
                        errorModalMessage.textContent = 'There was an issue processing your request. Please try again.';
                        tryAgainBtn.style.display = 'inline-block';
                        gotItBtn.style.display = 'none';
                    }
                    showModal(errorModal);
                }
            })
            .catch(() => {
                // Hide loading indicator on error
                hideLoading();

                failedAttempts++;
                if (failedAttempts >= maxFailedAttempts) {
                    errorModalMessage.textContent = 'Please try again later.';
                    tryAgainBtn.style.display = 'none';
                    gotItBtn.style.display = 'inline-block';
                } else {
                    errorModalMessage.textContent = 'There was an issue processing your request. Please try again.';
                    tryAgainBtn.style.display = 'inline-block';
                    gotItBtn.style.display = 'none';
                }
                showModal(errorModal);
            });
    });

    /**
     * Simulates form submission by returning a Promise.
     * will replace with actual AJAX requests in production.
     *
     * @returns {Promise<{ success: boolean }>}
     */
    function simulateFormSubmission() {
        return new Promise((resolve, reject) => {
            // Simulate network delay
            setTimeout(() => {
                // Simulate random success or failure
                const isSuccess = Math.random() < 0.7; // 70% chance of success
                if (isSuccess) {
                    resolve({ success: true });
                } else {
                    resolve({ success: false });
                }
            }, 1500);
        });
    }

    // Modal Button Event Listeners
    doneBtn.addEventListener('click', () => {
        hideModal(successModal);
        resetForm();
        window.location.href = 'dashboard.html';
    });

    convertAgainBtn.addEventListener('click', () => {
        hideModal(successModal);
        resetForm();
    });

    tryAgainBtn.addEventListener('click', () => {
        hideModal(errorModal);
    });

    gotItBtn.addEventListener('click', () => {
        hideModal(errorModal);
        resetForm();
        window.location.href = 'dashboard.html';
    });

    /**
     * Displays a modal by removing the 'hidden' class and managing accessibility.
     *
     * @param {HTMLElement} modal - The modal element to display.
     */
    function showModal(modal) {
        if (modal) {
            modal.classList.remove('hidden');
            document.body.classList.add('modal-open');
            const firstButton = modal.querySelector('button');
            if (firstButton) {
                firstButton.focus();
            }
        }
    }

    /**
     * Hides a modal by adding the 'hidden' class and restoring accessibility.
     *
     * @param {HTMLElement} modal - The modal element to hide.
     */
    function hideModal(modal) {
        if (modal) {
            modal.classList.add('hidden');
            document.body.classList.remove('modal-open');
        }
    }
});
