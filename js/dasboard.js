// public/js/dashboard.js

/** SELECTORS **/
const burgerMenu = document.querySelector(".burger-menu");      // Burger menu for mobile
const sidebar = document.querySelector(".sidebar");             // Sidebar navigation
const expandBtnContainer = document.querySelector(".expand-btn"); // Expand button container
const expandBtn = expandBtnContainer?.querySelector("img");     // Expand button image
const logo = document.querySelector(".logo_wrapper img");        // Sidebar logo
const contentWrapper = document.querySelector(".content-wrapper"); // Main content wrapper

/** FUNCTION: Adjust Sidebar Based on Screen Size **/
function handleResponsiveSidebar() {
    const screenWidth = window.innerWidth; // Get current screen width

    if (screenWidth >= 769 && screenWidth <= 1024) {
        /** TABLET: Sidebar is always collapsed **/
        sidebar.classList.add("collapsed");
        sidebar.classList.remove("show");
        if (burgerMenu) burgerMenu.style.display = "none";

        // Display expand button for tablet view
        expandBtnContainer.style.display = "flex";
        if (expandBtn) expandBtn.src = "assets/images/icons/next-icon.svg";

        // Adjust logo for tablet view
        if (logo) {
            logo.src = "assets/images/logos/logo-icon.svg";
            logo.style.width = "24px";
            logo.style.height = "auto";
        }
        contentWrapper.classList.remove("shifted");
    } else if (screenWidth <= 768) {
        /** MOBILE: Sidebar is off-canvas, show burger menu **/
        if (burgerMenu) burgerMenu.style.display = "block";
        sidebar.classList.remove("collapsed", "show");

        // Hide expand button on mobile
        expandBtnContainer.style.display = "none";

        // Adjust logo for mobile view
        if (logo) {
            logo.src = "assets/images/logos/logo-full.svg";
            logo.style.width = "120px";
            logo.style.height = "auto";
        }
        contentWrapper.classList.remove("shifted");
    } else {
        /** DESKTOP: Sidebar is expandable, show expand button **/
        sidebar.classList.remove("collapsed", "show");
        if (burgerMenu) burgerMenu.style.display = "none";
        expandBtnContainer.style.display = "flex";

        // Adjust logo for desktop view
        if (logo) {
            logo.src = "assets/images/logos/logo-full.svg";
            logo.style.width = "120px";
            logo.style.height = "auto";
        }
        contentWrapper.classList.add("shifted");
    }
}

// Add dropdown functionality
document.querySelectorAll('.dropdown-toggle').forEach((toggle) => {
    toggle.addEventListener('click', function (e) {
        e.preventDefault();

        const parent = this.parentElement;

        // Toggle dropdown state
        if (parent.classList.contains('open')) {
            parent.classList.remove('open');
        } else {
            // Close all other dropdowns
            document.querySelectorAll('.dropdown').forEach((dropdown) => {
                dropdown.classList.remove('open');
            });

            // Open this dropdown
            parent.classList.add('open');
        }
    });
});

// Close dropdown when clicking outside
document.addEventListener('click', function (e) {
    if (!e.target.closest('.dropdown')) {
        document.querySelectorAll('.dropdown').forEach((dropdown) => {
            dropdown.classList.remove('open');
        });
    }
});



/** MOBILE: Toggle Sidebar Off-Canvas **/
burgerMenu?.addEventListener("click", () => {
    if (window.innerWidth <= 768) {
        sidebar.classList.toggle("show");
        contentWrapper.classList.remove("shifted");

        if (sidebar.classList.contains("show")) {
            expandBtnContainer.style.display = "block";
            expandBtn.src = "assets/images/icons/back-icon.svg";
        } else {
            expandBtnContainer.style.display = "none";
        }
    }
});

/** EXPAND/COLLAPSE BUTTON **/
expandBtnContainer?.addEventListener("click", () => {
    const screenWidth = window.innerWidth;

    if (screenWidth <= 768) {
        // Mobile: Close sidebar on button click
        if (sidebar.classList.contains("show")) {
            sidebar.classList.remove("show");
            expandBtnContainer.style.display = "none";
        }
    } else {
        // Tablet/Desktop: Toggle collapse state
        sidebar.classList.toggle("collapsed");

        if (sidebar.classList.contains("collapsed")) {
            contentWrapper.classList.remove("shifted");
            if (expandBtn) expandBtn.src = "assets/images/icons/next-icon.svg";

            if (screenWidth >= 769 && screenWidth <= 1024) {
                if (logo) {
                    logo.src = "assets/images/logos/logo-icon.svg";
                    logo.style.width = "24px";
                }
            } else {
                if (logo) {
                    logo.src = "assets/images/logos/logo-icon.svg";
                    logo.style.width = "24px";
                }
            }
        } else {
            contentWrapper.classList.add("shifted");
            if (expandBtn) expandBtn.src = "assets/images/icons/back-icon.svg";
            if (logo) {
                logo.src = "assets/images/logos/logo-full.svg";
                logo.style.width = "120px";
            }
        }
    }
});

/** CLICK OUTSIDE: Close Sidebar for Mobile/Tablet **/
document.addEventListener("click", (event) => {
    const screenWidth = window.innerWidth;

    if (screenWidth <= 768) {
        if (!sidebar.contains(event.target) && !burgerMenu.contains(event.target)) {
            sidebar.classList.remove("show");
            expandBtnContainer.style.display = "none";
        }
    } else if (screenWidth >= 769 && screenWidth <= 1024) {
        if (!sidebar.classList.contains("collapsed") &&
            !sidebar.contains(event.target) &&
            !expandBtnContainer.contains(event.target)) {
            sidebar.classList.add("collapsed");
            contentWrapper.classList.remove("shifted");
            if (logo) {
                logo.src = "assets/images/logos/logo-icon.svg";
                logo.style.width = "24px";
            }
        }
    }
});

function toggleBalanceVisibility(balanceId, iconElement) {
    const balanceText = document.getElementById(balanceId);
    const actualBalance = "₦11,570.60"; // Balace place holder
    const hiddenPlaceholder = "****"; // Placeholder when hidden

    // Toggle between showing actual balance and placeholder
    if (balanceText.textContent === hiddenPlaceholder) {
        balanceText.textContent = actualBalance; 
        iconElement.src = "assets/images/icons/eye.svg"; 
    } else {
        balanceText.textContent = hiddenPlaceholder; 
        iconElement.src = "assets/images/icons/eye-slash.svg"; 
    }
}

/** INIT: Handle Screen Size on Load & Resize **/
window.addEventListener("resize", handleResponsiveSidebar);
document.addEventListener("DOMContentLoaded", handleResponsiveSidebar);
// Carousel references
const track = document.querySelector('.carousel-track');
const slides = Array.from(document.querySelectorAll('.carousel-item'));
const dotsContainer = document.getElementById('carouselDots');
// State
let currentSlide = 0;
const totalSlides = slides.length;
const INTERVAL_MS = 3000; // 3s per slide
let startX = 0;
let isDragging = false;

// Create one dot per slide
const dots = slides.map((_, index) => {
    const dot = document.createElement('span');
    dot.classList.add('dot');
    dot.addEventListener('click', () => {
        currentSlide = index;
        updateCarousel();
    });
    dotsContainer.appendChild(dot);
    return dot;
});

// Move slides & highlight current dot
function updateCarousel() {
    track.style.transform = `translateX(-${currentSlide * 100}%)`;
    dots.forEach(dot => dot.classList.remove('active'));
    dots[currentSlide].classList.add('active');
}

// Auto-play infinite loop
const autoPlay = setInterval(() => {
    currentSlide++;
    if (currentSlide >= totalSlides) {
        currentSlide = 0;
    }
    updateCarousel();
}, INTERVAL_MS);

// Initialize
updateCarousel();

// Add event listeners for horizontal scrolling
track.addEventListener('wheel', (event) => {
    event.preventDefault(); // Prevent default scrolling behavior

    if (event.deltaX !== 0) {
        // Use deltaX for horizontal scrolling
        if (event.deltaX > 0) {
            // Scroll right
            currentSlide++;
            if (currentSlide >= totalSlides) {
                currentSlide = 0; // Wrap to first slide
            }
        } else {
            // Scroll left
            currentSlide--;
            if (currentSlide < 0) {
                currentSlide = totalSlides - 1; // Wrap to last slide
            }
        }
        updateCarousel();
    } else if (event.deltaY !== 0) {
        // Fallback for vertical scrolling translating to horizontal
        if (event.deltaY > 0) {
            // Scroll right
            currentSlide++;
            if (currentSlide >= totalSlides) {
                currentSlide = 0; // Wrap to first slide
            }
        } else {
            // Scroll left
            currentSlide--;
            if (currentSlide < 0) {
                currentSlide = totalSlides - 1; // Wrap to last slide
            }
        }
        updateCarousel();
    }
});

// Add touch event listeners for mobile
track.addEventListener('touchstart', (event) => {
    startX = event.touches[0].clientX; // Record the starting X position
    isDragging = true;
});

track.addEventListener('touchmove', (event) => {
    if (!isDragging) return;

    const currentX = event.touches[0].clientX;
    const diffX = startX - currentX;

    if (Math.abs(diffX) > 50) { // Threshold for swipe detection
        if (diffX > 0) {
            // Swipe left
            currentSlide++;
            if (currentSlide >= totalSlides) {
                currentSlide = 0; // Wrap to first slide
            }
        } else {
            // Swipe right
            currentSlide--;
            if (currentSlide < 0) {
                currentSlide = totalSlides - 1; // Wrap to last slide
            }
        }
        updateCarousel();
        isDragging = false; // Reset dragging state
    }
});

track.addEventListener('touchend', () => {
    isDragging = false; // Reset dragging state
});

// Money flow Chart
const ctx = document.getElementById('money-flow-chart').getContext('2d');

// Custom data
const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
const incomeData = [40000, 30000, 35000, 15000, 10000, 38000];
const expenseData = [20000, 12000, 9000, 7000, 5000, 10000];

const data = {
  labels: labels,
  datasets: [
    {
      label: 'Income',
      data: incomeData,
      backgroundColor: '#146EF5',
      barPercentage: 0.65,
      categoryPercentage: 0.9,
      barThickness: 12,
      borderRadius: 8,
    },
    {
      label: 'Expense',
      data: expenseData,
      backgroundColor: '#f6a74a', // Orange
      barPercentage: 0.65,
      categoryPercentage: 0.9,
      barThickness: 12,
      borderRadius: 8,
    },
  ]
};

//  chart options
const options = {
  responsive: true,
  // Let the container control the height:
  maintainAspectRatio: false,

  // Provide some bottom padding to avoid cutting off x-axis labels
  layout: {
    padding: {
      bottom: 40
    }
  },
  scales: {
    x: {
      grid: {
        display: false, // no vertical grid lines
      },
    },
    y: {
      beginAtZero: true,
      grid: {
        color: '#ddd',
        borderDash: [4, 4], // dashed horizontal lines
        drawBorder: false,
      },
      ticks: {
        // Format as currency with commas
        callback: function(value) {
          return '₦' + value.toLocaleString();
        },
      },
    },
  },
  plugins: {
    legend: {
      display: false, // Hide legend
    },
    tooltip: {
      callbacks: {
        label: function(context) {
          const label = context.dataset.label || '';
          const val = context.parsed.y;
          return `${label}: ₦${val.toLocaleString()}`;
        },
      },
    },
  },
};

//  Dynamically set the canvas parent’s height so the chart can grow
const canvas = document.getElementById('money-flow-chart');
canvas.parentNode.style.height = '300px'; // adjust to your preference

// 5. Create the chart
new Chart(ctx, {
  type: 'bar',
  data: data,
  options: options,
});

document.addEventListener("DOMContentLoaded", function () {
    // Select the container where transactions will be rendered
    const transactionListContainer = document.querySelector("#transactions-main-section .transaction-list");
  
    // Function to fetch and render the two most recent transactions
    async function fetchRecentTransactions() {
      try {
        // Make request to the API with a limit of 2
        const response = await fetch('/api/transactions?limit=2');
        const data = await response.json();
        
        // Ensure to receive the expected structure
        const { transactions } = data;
        if (!transactions) {
          console.error("No transactions data returned");
          return;
        }
        
        // Clear the container before re-rendering
        transactionListContainer.innerHTML = "";
        
        // Loop through each transaction and render its HTML
        transactions.forEach(transaction => {
          const transactionType = transaction.type.charAt(0).toUpperCase() + transaction.type.slice(1);
          // 'credit' means a positive amount; otherwise, treat as negative.
          const isCredit = transaction.type.toLowerCase() === "credit";
          const amountText = isCredit ? `+₦${transaction.amount}` : `-₦${transaction.amount}`;
          const amountClass = isCredit ? "positive" : "negative";
          
          const transactionItem = document.createElement("div");
          transactionItem.classList.add("transaction-item");
          transactionItem.innerHTML = `
            <div class="transaction-left">
              <div class="transaction-icon">
                <span>
                  <img src="assets/images/icons/${transaction.type}.svg" alt="${transaction.type} Icon">
                </span>
              </div>
              <div class="transaction-details">
                <div class="transaction-title-amount">
                  <p>${transactionType}</p>
                  <span class="amount ${amountClass}">${amountText}</span>
                </div>
                <div class="transaction-date-status">
                  <span class="date">${new Date(transaction.createdAt).toLocaleString()}</span>
                  <span class="status ${transaction.status === 'completed' ? 'success' : transaction.status}">
                    ${transaction.status}
                  </span>
                </div>
              </div>
            </div>
          `;
          transactionListContainer.appendChild(transactionItem);
        });
      } catch (error) {
        console.error("Error fetching recent transactions:", error);
      }
    }
  
    // Initial fetch when the dashboard loads
    fetchRecentTransactions();
  
    // Setup Socket.IO  to listen for new transaction events
    if (typeof io !== "undefined") {
      const socket = io();
      socket.on("newTransaction", (newTransaction) => {
        console.log("New transaction received:", newTransaction);
        // When a new transaction event is received, re-fetch the two most recent transactions
        fetchRecentTransactions();
      });
    }
  });
  

document.addEventListener("DOMContentLoaded", function () {
    const modal = document.getElementById("welcomeModal");
    const gotItBtn = document.getElementById("gotItBtn");
    const welcomeText = document.getElementById("welcomeText");

    // Helper to get today as YYYY-MM-DD
    const today = new Date().toISOString().split("T")[0];

    // (Optional) Special holiday messages
    const holidayMessages = {
        // 🎊 Static Holidays (Month-Day)
        "1-1": "🎆 Happy New Year! May this year bring you joy, success, and unlimited good vibes! 🥳",
        "2-14": "💌 Love is in the air! Happy Valentine's Day! Treat yourself and your loved ones! ❤️",
        "3-17": "🍀 Luck is on your side today! Happy St. Patrick's Day! Cheers to green vibes! ☘️",
        "4-1": "😆 April Fools’ Day is here! Watch your back—tricks are everywhere! 🎭",
        "5-1": "💪 Shout-out to all the hard workers! Happy Workers’ Day—rest, relax, and recharge! 🎉",
        "5-27": "🎈 Happy Children’s Day! Stay playful, stay curious, stay awesome! 🎠",
        "5-29": "🇳🇬 Nigeria's Democracy Day! Cheers to progress, unity, and freedom! ✊",
        "6-19": "🖤 Juneteenth! A day of freedom, culture, and history—celebrate boldly! 🎶",
        "6-21": "🌞 Summer Solstice! Longest day, endless sunshine—soak it all in! ☀️",
        "7-4": "🎆 Fireworks, BBQ, and freedom! Happy Independence Day, America! 🇺🇸",
        "10-1": "🎊 Naija no dey carry last! Happy Nigerian Independence Day! 🇳🇬",
        "10-31": "👻 Trick or treat time! Happy Halloween! Don’t let the ghosts get you! 🎃",
        "11-1": "🌟 Honoring the saints today! Happy All Saints’ Day! Stay blessed! 🙏",
        "11-4": "✨ Light up your world! Happy Diwali! May your days be as bright as fireworks! 🪔",
        "11-25": "🍂 Happy Thanksgiving! Grateful hearts, full plates, and warm hugs! 🦃",
        "11-29": "🛍️ Black Friday Madness! Swipe that card, grab those deals! 💳",
        "12-1": "❤️ Stay aware, stay strong! World AIDS Day—spread knowledge, not stigma! 🎗️",
        "12-24": "🎅 Santa’s coming! Christmas Eve is here—hang your stockings! 🎁",
        "12-25": "🎄 Ho! Ho! Ho! Merry Christmas! Wishing you joy, love, and all the goodies! 🎅",
        "12-26": "📦 More gifts? Yes, please! Happy Boxing Day! Unbox the joy! 🎊",
        "12-31": "🎇 Boom! It’s the last day of the year! Time to party and prep for greatness! 🥂",

        //  Changeable Holidays (Dates Change Each Year)
        "good_friday": "🙏 A day to reflect and remember. Wishing you a peaceful Good Friday! ✝️",
        "easter_sunday": "🐰 Happy Easter! May your basket be full of love, laughter, and chocolate! 🍫",
        "easter_monday": "🌷 Easter Monday vibes! More joy, more family time, more treats! 🎉",
        "eid_al_fitr": "🌙 Eid Mubarak! The fast is over—time for feasting and family! 🕌",
        "eid_al_adha": "🐏 Happy Eid al-Adha! May your faith grow stronger and your blessings multiply! ✨",
        "mawlid_nabi": "🕋 Mawlid an-Nabi—celebrating the birth of the Prophet Muhammad! Peace be upon him! 🌙",
        "ramadan_start": "🍽️ Ramadan Mubarak! Wishing you a month full of blessings and self-reflection! 🌟",
    };

    // ** NEW ARRAYS: CUSTOM & RANDOM MOTIVATIONAL MESSAGES **
   
    const customMotivationalMessages = [
        // Will later a logic for the custom moltivational messages to be added from admin dashboard
        // "The world moves fast. The question is, are you moving with it?",
     
    ];

    const randomMotivationalMessages = [
        // Speed & Efficiency – Because Time is Precious
        "The world moves fast. The question is, are you moving with it?",
        "Efficiency isn’t just a skill, it’s a superpower.",
        "Time saved is success gained. Don’t waste a second toady.",
        "Every second dey count o—life no come with a pause button.",
        "Speed isn’t just about moving fast, it’s about moving smart.",
        "The fastest way to success? Eliminating unnecessary delays.",
        "Work smart, move fast, achieve more.",
        "Your time is your most valuable currency. Spend it wisely.",
        
        // Insightful & Educational – The Power of Knowledge
        "Preparation na sure odd for better future.",
        "Knowledge na power. To apply am na superpower.",
        "The more you learn, the more opportunity you create for yourself—we go lie for you?",
        "A strong foundation today builds an unshakable future.",
        "What worked yesterday may not work tomorrow. Keep growing.",
        "Opportunities don’t disappear, they just go to the people who are ready.",
        
        // Fun & Motivational – Because Life Should Be Enjoyable
        "Dream big, start small, but most importantly—start.",
        "The greatest investment you can make is in yourself.",
        "Hard work beats talent when talent doesn’t work hard.",
        "The secret to getting ahead is getting started.",
        "Every expert was once a beginner. Keep learning.",
        "Your success story is being written—make it worth reading.",
        
        // Inspiration for Growth & Success – Your Future is Limitless
        "Be the person today that your future self will thank you for.",
        "The best opportunities don’t come to those who wait—they come to those who take action.",
        "You don’t have to be perfect to start, but you have to start to be perfect.",
        "Sometime growth no too comfortable, but staying same na that one dangerous pass",
        "If you never challenge yourself, you’ll never know how strong you are.",
        
        // Efficiency & Problem-Solving – Because Solutions Matter
        "The biggest problem in life is not having a problem—it’s ignoring the solutions.",
        "A problem is only a problem until you find the right strategy.",
        "The best way to solve a challenge? Break it down and tackle it step by step.",
        "Obstacles aren’t stop signs—they’re just detours.",
        "The only failure is refusing to try.",
        "Great things happen when preparation meets opportunity.",
        "If e no work no quit—adjust your approach.",
        
        // Leadership & Vision – Lead with Confidence
        "Vision without action is just a dream.",
        "Your influence is measured by the impact you leave behind.",
        
        // Resilience & Determination – Overcome Anything
        "Your failures don’t define you—your comebacks do.",
        "The only way to fail is to stop trying.",
        "The difference between winners and quitters? One more try.",

        //  Self-Improvement – Become Your Best Self
        "No too try to be the best, just get better than yesterday.",
        "You see that yesterday wey pass—you no fit change, but you fit shape tomorrow.",
        "You've got this.",
    ];

    const currentDate = new Date();
    const monthDayKey = `${currentDate.getMonth() + 1}-${currentDate.getDate()}`;
    const holidayMessage = holidayMessages[monthDayKey]; // Check if today's a static holiday

    let specialMessage = "👋 Welcome to Mevapay!";

    if (holidayMessage) {
      // If it's a holiday, use holiday message
      specialMessage = holidayMessage;
    } else {
      // Not a holiday, so check for custom or random messages
      if (customMotivationalMessages.length > 0) {
        // If there's at least one custom motivational message, pick the first or any logic you prefer
        specialMessage = customMotivationalMessages[0];
      } else if (randomMotivationalMessages.length > 0) {
        // No custom message, but random messages exist
        const randomIndex = Math.floor(Math.random() * randomMotivationalMessages.length);
        specialMessage = randomMotivationalMessages[randomIndex];
      }
      // Else, remain the default "👋 Welcome to Mevapay!"
    }

    welcomeText.innerText = specialMessage;

    // Read the last shown date from localStorage
    const lastShownDate = localStorage.getItem("welcomeModalDate");

    // If modal wasn't shown today, show it
    if (lastShownDate !== today) {
        modal.style.display = "flex";
        document.body.classList.add("modal-open");
    }

    // When user dismisses modal, save today's date in localStorage
    gotItBtn.addEventListener("click", function () {
        modal.style.display = "none";
        document.body.classList.remove("modal-open");
        localStorage.setItem("welcomeModalDate", today);
    });
});



// // Handle Wallet Balance Display
// document.addEventListener("DOMContentLoaded", () => {
//     const walletBalanceElement = document.getElementById("wallet-balance");
//     const usernameElement = document.getElementById("username");

//     // Mock API call to fetch wallet balance
//     const fetchWalletBalance = async () => {
//         try {
//             const response = await fetch("/api/wallet/balance");
//             const data = await response.json();
//             walletBalanceElement.textContent = data.balance.toFixed(2);
//             usernameElement.textContent = data.username;
//         } catch (error) {
//             console.error("Error fetching wallet balance:", error);
//         }
//     };

//     fetchWalletBalance();
// });

// // Handle Airtime Purchase Modal
// const airtimeModal = document.getElementById("airtime-modal");
// const closeAirtimeModal = document.getElementById("close-airtime-modal");
// const airtimeForm = document.getElementById("airtime-form");

// document.getElementById("fund-wallet-btn").addEventListener("click", () => {
//     airtimeModal.classList.remove("hidden");
// });

// closeAirtimeModal.addEventListener("click", () => {
//     airtimeModal.classList.add("hidden");
// });

// // Handle Airtime Form Submission
// airtimeForm.addEventListener("submit", async (e) => {
//     e.preventDefault();
//     const phone = document.getElementById("phone").value;
//     const amount = document.getElementById("amount").value;

//     try {
//         const response = await fetch("/api/airtime", {
//             method: "POST",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify({ phone, amount }),
//         });

//         const data = await response.json();
//         if (response.ok) {
//             alert(`Airtime purchase successful for ₦${amount}!`);
//             airtimeModal.classList.add("hidden");
//         } else {
//             alert(`Error: ${data.message}`);
//         }
//     } catch (error) {
//         console.error("Error purchasing airtime:", error);
//     }
// });



// // // public/js/dashboard.js
// // document.addEventListener('DOMContentLoaded', () => {
// //     const walletBalanceElement = document.getElementById('wallet-balance');
// //     const transactionListElement = document.getElementById('transaction-list');
// //     const fundWalletButton = document.getElementById('fund-wallet');

// //     // Fetch user data from the server
// //     const loadDashboard = async () => {
// //         try {
// //             const response = await fetch('/api/dashboard', {
// //                 headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
// //             });
// //             const data = await response.json();

// //             // Update wallet balance
// //             walletBalanceElement.textContent = data.walletBalance.toFixed(2);

// //             // Populate transactions
// //             transactionListElement.innerHTML = '';
// //             data.transactions.forEach((transaction) => {
// //                 const li = document.createElement('li');
// //                 li.textContent = `${transaction.type} - ₦${transaction.amount} - ${transaction.status}`;
// //                 transactionListElement.appendChild(li);
// //             });
// //         } catch (error) {
// //             console.error('Error loading dashboard:', error.message);
// //         }
// //     };

// //     // Initialize fund wallet
// //     fundWalletButton.addEventListener('click', async () => {
// //         try {
// //             const amount = prompt('Enter amount to fund wallet:');
// //             if (!amount) return;

// //             const response = await fetch('/api/transactions/fund', {
// //                 method: 'POST',
// //                 headers: {
// //                     'Content-Type': 'application/json',
// //                     Authorization: `Bearer ${localStorage.getItem('token')}`,
// //                 },
// //                 body: JSON.stringify({ amount }),
// //             });

// //             const data = await response.json();
// //             if (data.checkoutUrl) {
// //                 window.location.href = data.checkoutUrl;
// //             }
// //         } catch (error) {
// //             console.error('Error funding wallet:', error.message);
// //         }
// //     });

// //     // Load the dashboard on page load
// //     loadDashboard();
// // });


// // // public/js/dashboard.js
// // const airtimeModal = document.getElementById('airtime-modal');
// // const airtimeForm = document.getElementById('airtime-form');

// // // Show airtime modal
// // document.getElementById('buy-airtime').addEventListener('click', () => {
// //     airtimeModal.style.display = 'block';
// // });

// // // Handle airtime purchase
// // airtimeForm.addEventListener('submit', async (e) => {
// //     e.preventDefault();

// //     const phone = document.getElementById('phone').value;
// //     const amount = document.getElementById('amount').value;

// //     try {
// //         const response = await fetch('/api/transactions/airtime', {
// //             method: 'POST',
// //             headers: {
// //                 'Content-Type': 'application/json',
// //                 Authorization: `Bearer ${localStorage.getItem('token')}`,
// //             },
// //             body: JSON.stringify({ phoneNumber: phone, amount }),
// //         });

// //         const data = await response.json();
// //         alert(data.message);
// //         airtimeModal.style.display = 'none';
// //     } catch (error) {
// //         console.error('Error buying airtime:', error.message);
// //     }
// // });


// // // public/js/dashboard.js
// // document.addEventListener('DOMContentLoaded', () => {
// //     const walletBalanceElement = document.getElementById('wallet-balance');
// //     const transactionsElement = document.getElementById('transactions');

// //     const loadDashboard = async () => {
// //         try {
// //             const response = await fetch('/api/dashboard', {
// //                 headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
// //             });
// //             const data = await response.json();

// //             walletBalanceElement.textContent = data.walletBalance.toFixed(2);
// //             transactionsElement.innerHTML = '';
// //             data.transactions.forEach((transaction) => {
// //                 const li = document.createElement('li');
// //                 li.textContent = `${transaction.type}: ₦${transaction.amount}`;
// //                 transactionsElement.appendChild(li);
// //             });
// //         } catch (error) {
// //             console.error('Error loading dashboard:', error.message);
// //         }
// //     };

// //     loadDashboard();
// // });
