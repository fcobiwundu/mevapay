document.addEventListener("DOMContentLoaded", () => {
  // ====== SELECTORS ======
  const serviceProviderLogos = document.querySelectorAll(".service-provider-logo");
  const tabs                 = document.querySelectorAll(".tab");
  const offersGrid           = document.getElementById("offers-grid");

  // All modals
  const confirmationModal    = document.getElementById("cancel-modal");
  const paymentModal         = document.getElementById("payment-modal");
  const pinModal             = document.getElementById("pin-modal");
  const noNumberModal        = document.getElementById("no-number-modal");

  // Confirmation Modal buttons
  const cancelBtn             = document.getElementById("cancel-btn");
  const continueBtn          = document.getElementById("continue-btn");

  // Payment Modal elements
  const paymentCloseIcon     = document.getElementById("payment-close-icon");
  const confirmToPayButton   = document.getElementById("confirm-to-pay");
  const paymentTotal         = document.getElementById("payment-total");
  const paymentAmountEl      = document.getElementById("payment-amount");
  const billerNameEl         = document.getElementById("biller-name");
  const recipientNumberEl    = document.getElementById("recipient-number");

  // PIN Modal elements
  const pinCloseIcon         = document.getElementById("pin-close-icon");
  const pinField             = document.getElementById("pin-field");
  const toggleVisibility     = document.getElementById("toggle-visibility");
  const submitPinButton      = document.getElementById("submit-pin");
  const pinAmountEl          = document.getElementById("pin-amount");

  // "No number" modal
  const gotItBtn             = document.getElementById("got-it-btn");

  // Other
  const recipientPhoneInput  = document.getElementById("recipient-phone");
  const phoneErrorEl         = document.getElementById("phone-error");

  // State
  let selectedNetwork        = null;
  let activeTab              = "sme";
  let pinAttempts            = 3;
  let currentModal           = null;

  // Offer data
  const offersData = {
    airtel: {
      sme: [
        { label: "Airtel SME 1GB", price: "₦500",  cashback: "₦10 Cashback" },
        { label: "Airtel SME 2GB", price: "₦1000", cashback: "₦20 Cashback" },
        { label: "Airtel SME 3GB", price: "₦1500", cashback: "₦30 Cashback" },
        { label: "Airtel SME 5GB", price: "₦2000", cashback: "₦50 Cashback" },
        { label: "Airtel SME 10GB", price: "₦5000", cashback: "₦100 Cashback" },
        { label: "Airtel SME 15GB", price: "₦7500", cashback: "₦150 Cashback" },
        { label: "Airtel SME 20GB", price: "₦10000", cashback: "₦200 Cashback" },
        { label: "Airtel SME 25GB", price: "₦12500", cashback: "₦250 Cashback" },
        { label: "Airtel SME 30GB", price: "₦15000", cashback: "₦300 Cashback" },
        { label: "Airtel SME 50GB", price: "₦25000", cashback: "₦500 Cashback" },
        { label: "Airtel SME 75GB", price: "₦37500", cashback: "₦750 Cashback" },
        { label: "Airtel SME 100GB", price: "₦50000", cashback: "₦1000 Cashback" }
      ],
     
    },
    // will add mtn, glo, 9mobile later
  };

  const tabsOrder = ["sme", "sme2", "cg", "gifting"];

  // ====== HELPER FUNCTIONS ======
  function showModal(modal) {
    modal.classList.add("show");
    modal.classList.remove("hidden");
    
    // Add this to prevent body scrolling ONLY when "no-number-modal" is shown:
    if (modal === noNumberModal) {
      document.body.classList.add("no-number-modal-open");
    }

    currentModal = modal;
  }

  function closeModal(modal) {
    modal.classList.remove("show");
    modal.classList.add("hidden");

    // Remove the body class if "no-number-modal" is the one closing
    if (modal === noNumberModal) {
      document.body.classList.remove("no-number-modal-open");
    }

    if (currentModal === modal) {
      currentModal = null;
    }
  }

  // Confirmation modal logic (Open with reference to Payment or PIN modal)
  function openConfirmationModal(originModal) {
    showModal(confirmationModal);

    cancelBtn.onclick = () => {
      // "Leave" -> close both the confirmation and the origin modal
      closeModal(confirmationModal);
      closeModal(originModal);
    };
    continueBtn.onclick = () => {
      // "Continue" -> close the confirmation only, re-show the origin modal
      closeModal(confirmationModal);
      showModal(originModal);
    };
  }

  // Check if phone is valid
  function isPhoneValid() {
    const phoneVal = recipientPhoneInput.value.trim();
    if (!selectedNetwork) {
      // no network selected => invalid
      return false;
    }
    if (phoneVal.length !== 11) {
      return false;
    }
    return true;
  }

  // Validate phone input
  recipientPhoneInput.addEventListener("input", () => {
    const phoneVal = recipientPhoneInput.value.trim();

    // Check if the user selected a network
    if (!selectedNetwork) {
      phoneErrorEl.textContent = "Please select a network provider.";
      recipientPhoneInput.classList.add("invalid");
      return;
    }

    // If network is selected, check phone length
    if (phoneVal.length < 11) {
      phoneErrorEl.textContent = "Please enter a valid phone number.";
      recipientPhoneInput.classList.add("invalid");
    } else {
      // 11 digits => remove error
      phoneErrorEl.textContent = "";
      recipientPhoneInput.classList.remove("invalid");
    }
  });

  // ====== LOAD OFFERS & TAB LOGIC ======
  function loadOffers(direction = "none") {
    if (!selectedNetwork) {
      offersGrid.innerHTML = "<p>Please select a network provider.</p>";
      return;
    }

    // Slide out
    offersGrid.style.transition = "transform 0.3s ease";
    offersGrid.style.transform  = (direction === "left")
      ? "translateX(-100%)"
      : "translateX(100%)";

    setTimeout(() => {
      offersGrid.innerHTML = "";
      const offers = offersData[selectedNetwork]?.[activeTab] || [];

      offers.forEach((offer) => {
        const offerCard = document.createElement("div");
        offerCard.className = "offer-card";
        offerCard.innerHTML = `
          <p><strong>${offer.label}</strong></p>
          <p>${offer.price}</p>
        `;
        // Clicking an offer -> check phone first
        offerCard.addEventListener("click", () => {
          if (!isPhoneValid()) {
            showModal(noNumberModal);
            return;
          }
          // Phone is valid => open Payment Modal
          paymentTotal.textContent      = offer.price;
          paymentAmountEl.textContent   = offer.price;
          billerNameEl.textContent      = selectedNetwork.toUpperCase();
          recipientNumberEl.textContent = recipientPhoneInput.value.trim();
          pinAmountEl.textContent       = offer.price;

          showModal(paymentModal);
        });

        offersGrid.appendChild(offerCard);
      });

      // Slide in
      offersGrid.style.transition = "none";
      offersGrid.style.transform  = (direction === "left")
        ? "translateX(100%)"
        : "translateX(-100%)";

      setTimeout(() => {
        offersGrid.style.transition = "transform 0.3s ease";
        offersGrid.style.transform  = "translateX(0)";
      }, 50);
    }, 300);
  }

  function handleTabChange(tabName) {
    tabs.forEach((t) => t.classList.remove("active"));
    const clickedTab = Array.from(tabs).find((t) => t.dataset.tab === tabName);
    if (clickedTab) clickedTab.classList.add("active");

    const currentIndex = tabsOrder.indexOf(activeTab);
    const newIndex     = tabsOrder.indexOf(tabName);
    const direction    = (currentIndex < newIndex) ? "left" : "right";

    activeTab = tabName;
    loadOffers(direction);
  }

  // Optional Swipe Logic for offers
  let isDragging = false;
  let touchStartX = 0;
  function handleSwipe(startX, endX) {
    const deltaX = startX - endX;
    const idx    = tabsOrder.indexOf(activeTab);
    if (Math.abs(deltaX) > 50) {
      // left -> next
      if (deltaX > 0 && idx < tabsOrder.length - 1) {
        handleTabChange(tabsOrder[idx + 1]);
      } 
      // right -> previous
      else if (deltaX < 0 && idx > 0) {
        handleTabChange(tabsOrder[idx - 1]);
      }
    }
  }
  offersGrid.addEventListener("touchstart", (e) => {
    touchStartX = e.touches[0].pageX;
    isDragging  = true;
  });
  offersGrid.addEventListener("touchend", (e) => {
    if (!isDragging) return;
    const touchEndX = e.changedTouches[0].pageX;
    handleSwipe(touchStartX, touchEndX);
    isDragging = false;
  });

  // ====== EVENT LISTENERS ======
  // Service Provider logos
  serviceProviderLogos.forEach((logo) => {
    logo.addEventListener("click", () => {
      // 1) Remove .active from all logos
      serviceProviderLogos.forEach((l) => l.classList.remove("active"));
      // 2) Add .active to this clicked logo
      logo.classList.add("active");

      selectedNetwork = logo.dataset.network;

      // Clear any phone error if it was "Please select network"
      if (recipientPhoneInput.classList.contains("invalid")) {
        const phoneVal = recipientPhoneInput.value.trim();
        if (phoneVal.length < 11) {
          phoneErrorEl.textContent = "Please enter a valid phone number.";
        } else {
          phoneErrorEl.textContent = "";
          recipientPhoneInput.classList.remove("invalid");
        }
      }
      loadOffers();
    });
  });

  // Tabs
  tabs.forEach((tab) => {
    tab.addEventListener("click", () => handleTabChange(tab.dataset.tab));
  });

  // Payment Modal: close icon -> open confirmation
  paymentCloseIcon.addEventListener("click", () => {
    openConfirmationModal(paymentModal);
  });

  // Payment Modal: confirm -> close Payment, open PIN
  confirmToPayButton.addEventListener("click", () => {
    closeModal(paymentModal);
    showModal(pinModal);
  });

  // PIN Modal: close icon -> open confirmation
  pinCloseIcon.addEventListener("click", () => {
    openConfirmationModal(pinModal);
  });

  // Toggle PIN visibility (optional)
  toggleVisibility.addEventListener("click", () => {
    pinField.type = (pinField.type === "password") ? "text" : "password";
  });

  // PIN Modal: submit
  submitPinButton.addEventListener("click", () => {
    const enteredPin = pinField.value.trim();
    if (enteredPin === "1234") {
      alert("Payment Successful!");
      closeModal(pinModal);
      pinField.value = "";
      pinAttempts = 3;
    } else {
      pinAttempts--;
      if (pinAttempts > 0) {
        alert(`Incorrect PIN. You have ${pinAttempts} attempt(s) left.`);
      } else {
        alert("3 failed attempts. Closing PIN Modal.");
        closeModal(pinModal);
        pinField.value = "";
        pinAttempts = 3;
      }
    }
  });

  // "Got It" button in "No Number" modal
  gotItBtn.addEventListener("click", () => {
    closeModal(noNumberModal);
  });

  // Initial load
  loadOffers();
});