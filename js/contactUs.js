

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
document.getElementById("contactForm").addEventListener("submit", async function (event) {
    event.preventDefault(); // Prevent default form submission

    const formData = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        phone: document.getElementById("phone").value,
        subject: document.getElementById("subject").value,
        message: document.getElementById("message").value,
        marketingConsent: document.getElementById("marketingConsent").checked ? "yes" : "no",
    };

    try {
        const response = await fetch("/api/contact", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        });

        const result = await response.json();

        if (response.ok) {
            alert("Thank you for contacting us!");
            document.getElementById("contactForm").reset();
        } else {
            alert(result.error || "Something went wrong. Please try again.");
        }
    } catch (error) {
        console.error("Error submitting form:", error);
        alert("An unexpected error occurred. Please try again later.");
    }
});



