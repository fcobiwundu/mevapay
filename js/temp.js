// Data.js

document.addEventListener("DOMContentLoaded", () => {
    // Select elements
    const networkLogos = document.querySelectorAll(".network-logo");
    const tabs = document.querySelectorAll(".tab");
    const offersGrid = document.getElementById("offers-grid");
    const cancelModal = document.getElementById("cancel-modal");
    const paymentModal = document.getElementById("payment-modal");
    const pinModal = document.getElementById("pin-modal");
    const leaveButton = document.getElementById("leave-button");
    const continueButton = document.getElementById("continue-button");
    const confirmToPay = document.getElementById("confirm-to-pay");
    const pinField = document.getElementById("pin-field");
    const toggleVisibility = document.getElementById("toggle-visibility");

    let selectedNetwork = null;
    let activeTab = "sme";

    // Placeholder data for offers
    const offersData = {
        airtel: {
            sme: [
                { label: "Airtel SME 1GB", price: "₦500", cashback: "₦10 Cashback" },
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
            sme2: [
                { label: "Airtel SME2 500MB", price: "₦300", cashback: "₦5 Cashback" },
                { label: "Airtel SME2 1GB", price: "₦600", cashback: "₦10 Cashback" },
                { label: "Airtel SME2 2GB", price: "₦1200", cashback: "₦20 Cashback" },
                { label: "Airtel SME2 3GB", price: "₦1800", cashback: "₦30 Cashback" },
                { label: "Airtel SME2 5GB", price: "₦3000", cashback: "₦50 Cashback" },
                { label: "Airtel SME2 7GB", price: "₦4200", cashback: "₦70 Cashback" },
                { label: "Airtel SME2 10GB", price: "₦6000", cashback: "₦100 Cashback" },
                { label: "Airtel SME2 15GB", price: "₦9000", cashback: "₦150 Cashback" },
                { label: "Airtel SME2 20GB", price: "₦12000", cashback: "₦200 Cashback" },
                { label: "Airtel SME2 30GB", price: "₦18000", cashback: "₦300 Cashback" },
                { label: "Airtel SME2 50GB", price: "₦30000", cashback: "₦500 Cashback" },
                { label: "Airtel SME2 100GB", price: "₦60000", cashback: "₦1000 Cashback" }
            ],
            cg: [
                { label: "Airtel CG 1GB", price: "₦700", cashback: "₦15 Cashback" },
                { label: "Airtel CG 2GB", price: "₦1400", cashback: "₦30 Cashback" },
                { label: "Airtel CG 3GB", price: "₦2100", cashback: "₦45 Cashback" },
                { label: "Airtel CG 5GB", price: "₦3500", cashback: "₦75 Cashback" },
                { label: "Airtel CG 10GB", price: "₦7000", cashback: "₦150 Cashback" },
                { label: "Airtel CG 15GB", price: "₦10500", cashback: "₦225 Cashback" },
                { label: "Airtel CG 20GB", price: "₦14000", cashback: "₦300 Cashback" },
                { label: "Airtel CG 25GB", price: "₦17500", cashback: "₦375 Cashback" },
                { label: "Airtel CG 30GB", price: "₦21000", cashback: "₦450 Cashback" },
                { label: "Airtel CG 50GB", price: "₦35000", cashback: "₦750 Cashback" },
                { label: "Airtel CG 75GB", price: "₦52500", cashback: "₦1125 Cashback" },
                { label: "Airtel CG 100GB", price: "₦70000", cashback: "₦1500 Cashback" }
            ],
            gifting: [
                { label: "Airtel Gifting 1GB", price: "₦800", cashback: "₦20 Cashback" },
                { label: "Airtel Gifting 2GB", price: "₦1600", cashback: "₦40 Cashback" },
                { label: "Airtel Gifting 3GB", price: "₦2400", cashback: "₦60 Cashback" },
                { label: "Airtel Gifting 5GB", price: "₦4000", cashback: "₦100 Cashback" },
                { label: "Airtel Gifting 10GB", price: "₦8000", cashback: "₦200 Cashback" },
                { label: "Airtel Gifting 15GB", price: "₦12000", cashback: "₦300 Cashback" },
                { label: "Airtel Gifting 20GB", price: "₦16000", cashback: "₦400 Cashback" },
                { label: "Airtel Gifting 25GB", price: "₦20000", cashback: "₦500 Cashback" },
                { label: "Airtel Gifting 30GB", price: "₦24000", cashback: "₦600 Cashback" },
                { label: "Airtel Gifting 50GB", price: "₦40000", cashback: "₦1000 Cashback" },
                { label: "Airtel Gifting 75GB", price: "₦60000", cashback: "₦1500 Cashback" },
                { label: "Airtel Gifting 100GB", price: "₦80000", cashback: "₦2000 Cashback" }
            ]
        },
        mtn: {
            sme: [
                { label: "MTN SME 1GB", price: "₦550", cashback: "₦11 Cashback" },
                { label: "MTN SME 2GB", price: "₦1100", cashback: "₦22 Cashback" },
                { label: "MTN SME 3GB", price: "₦1650", cashback: "₦33 Cashback" },
                { label: "MTN SME 5GB", price: "₦2200", cashback: "₦55 Cashback" },
                { label: "MTN SME 10GB", price: "₦5500", cashback: "₦110 Cashback" },
                { label: "MTN SME 15GB", price: "₦8250", cashback: "₦165 Cashback" },
                { label: "MTN SME 20GB", price: "₦11000", cashback: "₦220 Cashback" },
                { label: "MTN SME 25GB", price: "₦13750", cashback: "₦275 Cashback" },
                { label: "MTN SME 30GB", price: "₦16500", cashback: "₦330 Cashback" },
                { label: "MTN SME 50GB", price: "₦27500", cashback: "₦550 Cashback" },
                { label: "MTN SME 75GB", price: "₦41250", cashback: "₦825 Cashback" },
                { label: "MTN SME 100GB", price: "₦55000", cashback: "₦1100 Cashback" }
            ],
            sme2: [
                { label: "MTN SME2 500MB", price: "₦310", cashback: "₦6 Cashback" },
                { label: "MTN SME2 1GB", price: "₦620", cashback: "₦12 Cashback" },
                { label: "MTN SME2 2GB", price: "₦1240", cashback: "₦24 Cashback" },
                { label: "MTN SME2 3GB", price: "₦1860", cashback: "₦36 Cashback" },
                { label: "MTN SME2 5GB", price: "₦3100", cashback: "₦60 Cashback" },
                { label: "MTN SME2 7GB", price: "₦4340", cashback: "₦84 Cashback" },
                { label: "MTN SME2 10GB", price: "₦6200", cashback: "₦120 Cashback" },
                { label: "MTN SME2 15GB", price: "₦9300", cashback: "₦180 Cashback" },
                { label: "MTN SME2 20GB", price: "₦12400", cashback: "₦240 Cashback" },
                { label: "MTN SME2 30GB", price: "₦18600", cashback: "₦360 Cashback" },
                { label: "MTN SME2 50GB", price: "₦31000", cashback: "₦600 Cashback" },
                { label: "MTN SME2 100GB", price: "₦62000", cashback: "₦1200 Cashback" }
            ],
            cg: [
                { label: "MTN CG 1GB", price: "₦750", cashback: "₦16 Cashback" },
                { label: "MTN CG 2GB", price: "₦1500", cashback: "₦32 Cashback" },
                { label: "MTN CG 3GB", price: "₦2250", cashback: "₦48 Cashback" },
                { label: "MTN CG 5GB", price: "₦3750", cashback: "₦80 Cashback" },
                { label: "MTN CG 10GB", price: "₦7500", cashback: "₦160 Cashback" },
                { label: "MTN CG 15GB", price: "₦11250", cashback: "₦240 Cashback" },
                { label: "MTN CG 20GB", price: "₦15000", cashback: "₦320 Cashback" },
                { label: "MTN CG 25GB", price: "₦18750", cashback: "₦400 Cashback" },
                { label: "MTN CG 30GB", price: "₦22500", cashback: "₦480 Cashback" },
                { label: "MTN CG 50GB", price: "₦37500", cashback: "₦800 Cashback" },
                { label: "MTN CG 75GB", price: "₦56250", cashback: "₦1200 Cashback" },
                { label: "MTN CG 100GB", price: "₦75000", cashback: "₦1600 Cashback" }
            ],
            gifting: [
                { label: "MTN Gifting 1GB", price: "₦850", cashback: "₦22 Cashback" },
                { label: "MTN Gifting 2GB", price: "₦1700", cashback: "₦44 Cashback" },
                { label: "MTN Gifting 3GB", price: "₦2550", cashback: "₦66 Cashback" },
                { label: "MTN Gifting 5GB", price: "₦4250", cashback: "₦110 Cashback" },
                { label: "MTN Gifting 10GB", price: "₦8500", cashback: "₦220 Cashback" },
                { label: "MTN Gifting 15GB", price: "₦12750", cashback: "₦330 Cashback" },
                { label: "MTN Gifting 20GB", price: "₦17000", cashback: "₦440 Cashback" },
                { label: "MTN Gifting 25GB", price: "₦21250", cashback: "₦550 Cashback" },
                { label: "MTN Gifting 30GB", price: "₦25500", cashback: "₦660 Cashback" },
                { label: "MTN Gifting 50GB", price: "₦42500", cashback: "₦1100 Cashback" },
                { label: "MTN Gifting 75GB", price: "₦63750", cashback: "₦1650 Cashback" },
                { label: "MTN Gifting 100GB", price: "₦85000", cashback: "₦2200 Cashback" }
            ]
        },
        glo: {
            sme: [
                { label: "Glo SME 1GB", price: "₦480", cashback: "₦9 Cashback" },
                { label: "Glo SME 2GB", price: "₦960", cashback: "₦18 Cashback" },
                { label: "Glo SME 3GB", price: "₦1440", cashback: "₦27 Cashback" },
                { label: "Glo SME 5GB", price: "₦2400", cashback: "₦45 Cashback" },
                { label: "Glo SME 10GB", price: "₦4800", cashback: "₦90 Cashback" },
                { label: "Glo SME 15GB", price: "₦7200", cashback: "₦135 Cashback" },
                { label: "Glo SME 20GB", price: "₦9600", cashback: "₦180 Cashback" },
                { label: "Glo SME 25GB", price: "₦12000", cashback: "₦225 Cashback" },
                { label: "Glo SME 30GB", price: "₦14400", cashback: "₦270 Cashback" },
                { label: "Glo SME 50GB", price: "₦24000", cashback: "₦450 Cashback" },
                { label: "Glo SME 75GB", price: "₦36000", cashback: "₦675 Cashback" },
                { label: "Glo SME 100GB", price: "₦48000", cashback: "₦900 Cashback" }
            ],
            sme2: [
                { label: "Glo SME2 500MB", price: "₦290", cashback: "₦4 Cashback" },
                { label: "Glo SME2 1GB", price: "₦580", cashback: "₦8 Cashback" },
                { label: "Glo SME2 2GB", price: "₦1160", cashback: "₦16 Cashback" },
                { label: "Glo SME2 3GB", price: "₦1740", cashback: "₦24 Cashback" },
                { label: "Glo SME2 5GB", price: "₦2900", cashback: "₦40 Cashback" },
                { label: "Glo SME2 7GB", price: "₦4060", cashback: "₦56 Cashback" },
                { label: "Glo SME2 10GB", price: "₦5800", cashback: "₦80 Cashback" },
                { label: "Glo SME2 15GB", price: "₦8700", cashback: "₦120 Cashback" },
            ],
            cg: [
                { label: "GLO CG 1GB", price: "₦750", cashback: "₦16 Cashback" },
                { label: "GLO CG 2GB", price: "₦1500", cashback: "₦32 Cashback" },
                { label: "GLO CG 3GB", price: "₦2250", cashback: "₦48 Cashback" },
                { label: "GLO CG 5GB", price: "₦3750", cashback: "₦80 Cashback" },
                { label: "GLO CG 10GB", price: "₦7500", cashback: "₦160 Cashback" },
                { label: "GLO CG 15GB", price: "₦11250", cashback: "₦240 Cashback" },
                { label: "GLO CG 20GB", price: "₦15000", cashback: "₦320 Cashback" },
                { label: "GLO CG 25GB", price: "₦18750", cashback: "₦400 Cashback" },
                { label: "GLO CG 30GB", price: "₦22500", cashback: "₦480 Cashback" },
                { label: "GLO CG 50GB", price: "₦37500", cashback: "₦800 Cashback" },
                { label: "GLO CG 75GB", price: "₦56250", cashback: "₦1200 Cashback" },
                { label: "GLO CG 100GB", price: "₦75000", cashback: "₦1600 Cashback" }
            ],
            gifting: [
                { label: "GLO Gifting 1GB", price: "₦850", cashback: "₦22 Cashback" },
                { label: "GLO Gifting 2GB", price: "₦1700", cashback: "₦44 Cashback" },
                { label: "GLO Gifting 3GB", price: "₦2550", cashback: "₦66 Cashback" },
                { label: "GLO Gifting 5GB", price: "₦4250", cashback: "₦110 Cashback" },
                { label: "GLO Gifting 10GB", price: "₦8500", cashback: "₦220 Cashback" },
                { label: "GLO Gifting 15GB", price: "₦12750", cashback: "₦330 Cashback" },
                { label: "GLO Gifting 20GB", price: "₦17000", cashback: "₦440 Cashback" },
                { label: "GLO Gifting 25GB", price: "₦21250", cashback: "₦550 Cashback" },
                { label: "GLO Gifting 30GB", price: "₦25500", cashback: "₦660 Cashback" },
                { label: "GLO Gifting 50GB", price: "₦42500", cashback: "₦1100 Cashback" },
                { label: "GLO Gifting 75GB", price: "₦63750", cashback: "₦1650 Cashback" },
                { label: "GLO Gifting 100GB", price: "₦85000", cashback: "₦2200 Cashback" }
            ]
        },
        "9mobile": {
            sme: [
                { label: "9mobile SME 1GB", price: "₦500", cashback: "₦10 Cashback" },
                { label: "9mobile SME 2GB", price: "₦1000", cashback: "₦20 Cashback" },
                { label: "9mobile SME 3GB", price: "₦1500", cashback: "₦30 Cashback" },
                { label: "9mobile SME 5GB", price: "₦2000", cashback: "₦50 Cashback" },
                { label: "9mobile SME 10GB", price: "₦5000", cashback: "₦100 Cashback" },
                { label: "9mobile SME 15GB", price: "₦7500", cashback: "₦150 Cashback" },
                { label: "9mobile SME 20GB", price: "₦10000", cashback: "₦200 Cashback" },
                { label: "9mobile SME 25GB", price: "₦12500", cashback: "₦250 Cashback" },
                { label: "9mobile SME 30GB", price: "₦15000", cashback: "₦300 Cashback" },
                { label: "9mobile SME 50GB", price: "₦25000", cashback: "₦500 Cashback" },
                { label: "9mobile SME 75GB", price: "₦37500", cashback: "₦750 Cashback" },
                { label: "9mobile SME 100GB", price: "₦50000", cashback: "₦1000 Cashback" }
            ],
            sme2: [
                { label: "9mobile SME2 500MB", price: "₦300", cashback: "₦5 Cashback" },
                { label: "9mobile SME2 1GB", price: "₦600", cashback: "₦10 Cashback" },
                { label: "9mobile SME2 2GB", price: "₦1200", cashback: "₦20 Cashback" },
                { label: "9mobile SME2 3GB", price: "₦1800", cashback: "₦30 Cashback" },
                { label: "9mobile SME2 5GB", price: "₦3000", cashback: "₦50 Cashback" },
                { label: "9mobile SME2 7GB", price: "₦4200", cashback: "₦70 Cashback" },
                { label: "9mobile SME2 10GB", price: "₦6000", cashback: "₦100 Cashback" },
                { label: "9mobile SME2 15GB", price: "₦9000", cashback: "₦150 Cashback" },
                { label: "9mobile SME2 20GB", price: "₦12000", cashback: "₦200 Cashback" },
                { label: "9mobile SME2 30GB", price: "₦18000", cashback: "₦300 Cashback" },
                { label: "9mobile SME2 50GB", price: "₦30000", cashback: "₦500 Cashback" },
                { label: "9mobile SME2 100GB", price: "₦60000", cashback: "₦1000 Cashback" }
            ],
            cg: [
                { label: "9mobile CG 1GB", price: "₦700", cashback: "₦15 Cashback" },
                { label: "9mobile CG 2GB", price: "₦1400", cashback: "₦30 Cashback" },
                { label: "9mobile CG 3GB", price: "₦2100", cashback: "₦45 Cashback" },
                { label: "9mobile CG 5GB", price: "₦3500", cashback: "₦75 Cashback" },
                { label: "9mobile CG 10GB", price: "₦7000", cashback: "₦150 Cashback" },
                { label: "9mobile CG 15GB", price: "₦10500", cashback: "₦225 Cashback" },
                { label: "9mobile CG 20GB", price: "₦14000", cashback: "₦300 Cashback" },
                { label: "9mobile CG 25GB", price: "₦17500", cashback: "₦375 Cashback" },
                { label: "9mobile CG 30GB", price: "₦21000", cashback: "₦450 Cashback" },
                { label: "9mobile CG 50GB", price: "₦35000", cashback: "₦750 Cashback" },
                { label: "9mobile CG 75GB", price: "₦52500", cashback: "₦1125 Cashback" },
                { label: "9mobile CG 100GB", price: "₦70000", cashback: "₦1500 Cashback" }
            ],
            gifting: [
                { label: "9mobile Gifting 1GB", price: "₦800", cashback: "₦20 Cashback" },
                { label: "9mobile Gifting 2GB", price: "₦1600", cashback: "₦40 Cashback" },
                { label: "9mobile Gifting 3GB", price: "₦2400", cashback: "₦60 Cashback" },
                { label: "9mobile Gifting 5GB", price: "₦4000", cashback: "₦100 Cashback" },
                { label: "9mobile Gifting 10GB", price: "₦8000", cashback: "₦200 Cashback" },
                { label: "9mobile Gifting 15GB", price: "₦12000", cashback: "₦300 Cashback" },
                { label: "9mobile Gifting 20GB", price: "₦16000", cashback: "₦400 Cashback" },
                { label: "9mobile Gifting 25GB", price: "₦20000", cashback: "₦500 Cashback" },
                { label: "9mobile Gifting 30GB", price: "₦24000", cashback: "₦600 Cashback" },
                { label: "9mobile Gifting 50GB", price: "₦40000", cashback: "₦1000 Cashback" },
                { label: "9mobile Gifting 75GB", price: "₦60000", cashback: "₦1500 Cashback" },
                { label: "9mobile Gifting 100GB", price: "₦80000", cashback: "₦2000 Cashback" }
            ]
        }
    };

    // Load offers into the grid
    const loadOffers = () => {
        offersGrid.innerHTML = "";
        if (!selectedNetwork || !offersData[selectedNetwork]) {
            offersGrid.innerHTML = "<p>Please select a network provider.</p>";
            return;
        }
        const offers = offersData[selectedNetwork][activeTab] || [];
        offers.forEach(offer => {
            const offerCard = document.createElement("div");
            offerCard.className = "offer-card";
            offerCard.innerHTML = `
                <p><strong>${offer.label}</strong></p>
                <p>${offer.price}</p>
                <p>${offer.cashback}</p>
            `;
            offerCard.addEventListener("click", () => {
                // Open payment modal
                document.getElementById("payment-amount").innerText = offer.price;
                document.getElementById("biller-name").innerText = selectedNetwork;
                document.getElementById("recipient-number").innerText = "090xxxxxxxx"; // Placeholder
                paymentModal.classList.remove("hidden");
            });
            offersGrid.appendChild(offerCard);
        });
    };

    // Handle tab change
    const handleTabChange = (tab) => {
        tabs.forEach(t => t.classList.remove("active"));
        tab.classList.add("active");
        activeTab = tab.dataset.tab;
        loadOffers();
    };

    // Handle network selection
    const handleNetworkSelection = (logo) => {
        selectedNetwork = logo.dataset.network;
        loadOffers();
    };

    // Toggle modal visibility
    const toggleModal = (modal, show) => {
        if (show) {
            modal.classList.remove("hidden");
        } else {
            modal.classList.add("hidden");
        }
    };

    // Event listeners
    networkLogos.forEach(logo => {
        logo.addEventListener("click", () => handleNetworkSelection(logo));
    });

    tabs.forEach(tab => {
        tab.addEventListener("click", () => handleTabChange(tab));
    });

    leaveButton.addEventListener("click", () => {
        toggleModal(cancelModal, false);
    });

    continueButton.addEventListener("click", () => {
        toggleModal(cancelModal, false);
    });

    confirmToPay.addEventListener("click", () => {
        toggleModal(paymentModal, false);
        toggleModal(pinModal, true);
    });

    toggleVisibility.addEventListener("click", () => {
        if (pinField.type === "password") {
            pinField.type = "text";
        } else {
            pinField.type = "password";
        }
    });

    // Load initial offers
    loadOffers();
});




<div class="promo-section">
<div class="promo-content">
    <img src="assets/images/promo-banner.png" alt="Promotional Offer">
    <div class="promo-text">
        <h3 class="promo-title">UP TO 97% OFF</h3>
        <p class="promo-subtitle">Get 1GB For ₦10</p>
    </div>
</div>
</div>


/* Promo Section */
.promo-section {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #fff;
    margin-bottom: 1rem;
    padding: 1rem;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.promo-content {
    display: flex;
    align-items: center;
    gap: 1rem;
}

.promo-content img {
    width: 100px; /* Adjust size as per design */
    height: auto;
    border-radius: 8px;
}

.promo-text {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
}

.promo-title {
    font-size: 1.2rem;
    font-weight: bold;
    color: #333;
    margin: 0;
}

.promo-subtitle {
    font-size: 0.9rem;
    color: #666;
    margin: 0;
}