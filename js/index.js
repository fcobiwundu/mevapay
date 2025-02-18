
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
        {threshold: 0.3} //(30% in view)
    );

    cards.forEach((card) => {
        observer.observe(card);
    });
});
