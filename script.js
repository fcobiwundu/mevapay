// Scroll Animation Functionality
document.addEventListener("DOMContentLoaded", function () {
    const observerOptions = {
        root: null,
        threshold: 0.1, // Trigger when 10% of the element is visible
        rootMargin: "0px"
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("animate-on-scroll");
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Select elements for scroll animations
    const elementsToAnimate = document.querySelectorAll(".about-card, .feature-card");
    elementsToAnimate.forEach(element => observer.observe(element));
});

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
    threshold: window.innerWidth <= 768 ? 0.2 : 0.1, // Adjust threshold for mobile screens
    rootMargin: "0px"
};
// Burger Menu Toggle
const burgerMenu = document.getElementById('burger-menu');
const navLinks = document.getElementById('nav-links');

burgerMenu.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    burgerMenu.classList.toggle('open');
});


document.addEventListener("DOMContentLoaded", () => {
    const cards = document.querySelectorAll(".feature-card");

    // Function to check if card is in the viewport
    const isInViewport = (element) => {
        const rect = element.getBoundingClientRect();
        return (
            rect.top < window.innerHeight - 100 && rect.bottom > 0
        );
    };

    // Scroll event listener
    const handleScroll = () => {
        cards.forEach((card) => {
            if (isInViewport(card)) {
                card.classList.add("animate");
            }
        });
    };

    // Initial check and scroll listener
    handleScroll();
    window.addEventListener("scroll", handleScroll);
});
document.addEventListener("DOMContentLoaded", function () {
    const cards = document.querySelectorAll(".feature-card");

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("animate-on-scroll");
                }
            });
        },
        {threshold: 0.2}
    );

    cards.forEach((card) => {
        observer.observe(card);
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const cards = document.querySelectorAll(".flip-card");

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("flip-on-scroll");
                }
            });
        },
        {threshold: 0.3} // Adjust for when you want the flip to trigger (30% in view)
    );

    cards.forEach((card) => {
        observer.observe(card);
    });
});


// <textarea id="message" name="message" placeholder="Your Message" rows="6" required></textarea>
// <p id="wordCount">0/100 words</p>
//
// <script>
//     const textarea = document.getElementById('message');
//     const wordCountDisplay = document.getElementById('wordCount');
//     const maxWords = 100;
//
//     textarea.addEventListener('input', () => {
//     const words = textarea.value.trim().split(/\s+/); // Split input by spaces
//     const wordCount = words.filter(word => word.length > 0).length;
//
//     if (wordCount > maxWords) {
//     textarea.value = words.slice(0, maxWords).join(' '); // Truncate to max words
// }
//
//     wordCountDisplay.textContent = `${Math.min(wordCount, maxWords)}/${maxWords} words`;
// });
// </script>


// contact form
// Trigger fade-in animation for contact sections when scrolling
document.addEventListener("scroll", () => {
    const contactSections = document.querySelectorAll('.contact-info, .contact-form');
    const scrollPosition = window.scrollY + window.innerHeight;

    contactSections.forEach((section) => {
        if (scrollPosition > section.offsetTop + 50) {
            section.style.opacity = "1";
            section.style.transform = "translateY(0)";
        }
    });
});

// Form validation
document.getElementById('contactForm').addEventListener('submit', function (event) {
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const message = document.getElementById('message').value.trim();

    if (!name || !email || !phone || !message) {
        event.preventDefault(); // Prevent form submission
        alert('Please fill in all fields before submitting.');
    }

    // alert('Your message has been sent successfully!');
});

// document.getElementById('phone').addEventListener('input', function (event) {
//     // Step 1: Replace any characters that are not numbers or the '+' symbol
//     this.value = this.value.replace(/[^0-9+]/g, '');
//
//     // Step 2: Ensure that '+' appears only at the start of the input
//     if (this.value.indexOf('+') > 0) {
//         // If '+' is not the first character, remove all instances of '+'
//         this.value = this.value.replace(/\+/g, '');
//     }
// });
