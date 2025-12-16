document.addEventListener('DOMContentLoaded', () => {
    // Typing Animation
    const typeWriterElement = document.getElementById('typewriter');
    const textArray = ["Java Applications", "Salesforce Solutions", "Robust APIs", "Cloud Integrations"];
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeSpeed = 100;

    function type() {
        const currentText = textArray[textIndex];

        if (isDeleting) {
            typeWriterElement.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
            typeSpeed = 50;
        } else {
            typeWriterElement.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
            typeSpeed = 100;
        }

        if (!isDeleting && charIndex === currentText.length) {
            isDeleting = true;
            typeSpeed = 2000; // Pause at end
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % textArray.length;
            typeSpeed = 500; // Pause before new word
        }

        setTimeout(type, typeSpeed);
    }

    // Start Typing
    if (typeWriterElement) {
        type();
    }

    // Mobile Menu Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    document.querySelectorAll('.nav-links li a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });

    // Scroll Reveal Animation
    const revealElements = document.querySelectorAll('.section-title, .about-text, .feature-card, .skill-category, .project-card, .contact-wrapper');

    const revealOnScroll = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                revealOnScroll.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });

    revealElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.8s ease-out';
        revealOnScroll.observe(el);
    });

    // Add CSS class for revealed state dynamically
    const styleSheet = document.createElement("style");
    styleSheet.innerText = `
        .revealed {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(styleSheet);

    // Reset contact form on back navigation
    window.addEventListener('pageshow', (event) => {
        const form = document.querySelector('.contact-form');
        if (form && (event.persisted || (performance.getEntriesByType && performance.getEntriesByType("navigation")[0].type === 'back_forward'))) {
            form.reset();
        }
    });
});
