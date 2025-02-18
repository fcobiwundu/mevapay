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

// FAQ Toggle Functionality (to ensure only one FAQ remains open at a time)
document.querySelectorAll("details summary").forEach(summary => {
    summary.addEventListener("click", function () {
        const details = this.parentElement;
        document.querySelectorAll("details").forEach(item => {
            if (item !== details) {
                item.removeAttribute("open");
            }
        });
    });
});

const observerOptions = {
    root: null,
    threshold: window.innerWidth <= 768 ? 0.2 : 0.1, 
    rootMargin: "0px"
};

// Burger Menu Toggle
const burgerMenu = document.getElementById('burger-menu');
const navLinks = document.getElementById('nav-links');

// Toggle navigation links when burger menu is clicked
burgerMenu.addEventListener('click', (event) => {
    navLinks.classList.toggle('active');
    burgerMenu.classList.toggle('open');
    event.stopPropagation(); 
});

// Close navigation links when clicking outside
document.addEventListener('click', (event) => {
    const isClickInsideMenu = burgerMenu.contains(event.target) || navLinks.contains(event.target);

    if (!isClickInsideMenu && navLinks.classList.contains('active')) {
        navLinks.classList.remove('active');
        burgerMenu.classList.remove('open');
    }
});



// Function to add the shake effect
// function addShakeEffect() {
//     const whatsappButton = document.getElementById('whatsapp-btn');
//     whatsappButton.classList.add('shake');

//     // Remove the shake effect after the animation completes (0.5s duration)
//     setTimeout(() => {
//         whatsappButton.classList.remove('shake');
//     }, 500); // 500ms matches the animation duration
// }

// Function to trigger the shake effect every minute
// function startShakingTimer() {
//     addShakeEffect(); // Trigger the first shake immediately
//     setInterval(() => {
//         addShakeEffect();
//     }, 60000); // 30000ms = 30 seconds
// }

// Start the shaking timer when the page loads
// window.addEventListener('DOMContentLoaded', startShakingTimer);



// // tawk-container - Tawkto container display  (commented after footer )
//  document.addEventListener("DOMContentLoaded", function () {
//     function openTawk() {
//         var Tawk_API = Tawk_API || {}, Tawk_LoadStart = new Date();
//         (function () {
//             var s1 = document.createElement("script"),
//                 s0 = document.getElementsByClassName("tawk-container")[0];
//             if (s0) {
//                 s1.async = true;
//                 s1.src = 'https://embed.tawk.to/6775a198af5bfec1dbe593d7/1ighnufhc';
//                 s1.charset = 'UTF-8';
//                 s1.setAttribute('crossorigin', '*');
//                 s0.parentNode.insertBefore(s1, s0);
//             } else {
//                 console.error("Element with class 'tawk' not found.");
//             }
//         })();
//     }
//     openTawk();
// });
