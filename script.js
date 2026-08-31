/**
 * Configuration Object
 * Centralized links for easy replacement in the future.
 */
const portfolioConfig = {
    email: "https://mail.google.com/mail/?view=cm&fs=1&to=usmanboota.dev@gmail.com",
    whatsapp: "https://wa.me/923000437358",
    linkedin: "https://linkedin.com/in/musman100official",
    github: "https://github.com/useratnns",
    fiverr: "https://www.fiverr.com/musman100"
};

document.addEventListener('DOMContentLoaded', () => {

    // 1. Inject Dynamic Links
    const injectLinks = () => {
        // Email
        const emailLinks = document.querySelectorAll('.dynamic-email');
        emailLinks.forEach(link => {
            link.href = portfolioConfig.email;
            link.target = "_blank";
            link.rel = "noopener noreferrer";
        });

        // WhatsApp
        const whatsappLinks = document.querySelectorAll('.dynamic-whatsapp');
        whatsappLinks.forEach(link => {
            link.href = portfolioConfig.whatsapp;
        });

        // LinkedIn
        const linkedinLinks = document.querySelectorAll('.dynamic-linkedin');
        linkedinLinks.forEach(link => {
            link.href = portfolioConfig.linkedin;
        });

        // GitHub
        const githubLinks = document.querySelectorAll('.dynamic-github');
        githubLinks.forEach(link => {
            link.href = portfolioConfig.github;
        });

        // Fiverr / Primary CTAs
        const fiverrLinks = document.querySelectorAll('.dynamic-fiverr');
        fiverrLinks.forEach(link => {
            link.href = portfolioConfig.fiverr;
            link.target = "_blank";
            link.rel = "noopener noreferrer";
        });
    };

    // 2. Mobile Menu Toggle
    const setupMobileMenu = () => {
        const toggleBtn = document.querySelector('.mobile-menu-toggle');
        const nav = document.querySelector('.main-nav');
        const navLinks = document.querySelectorAll('.main-nav a');

        if (toggleBtn && nav) {
            toggleBtn.addEventListener('click', () => {
                nav.classList.toggle('active');

                // Toggle icon
                const icon = toggleBtn.querySelector('i');
                if (nav.classList.contains('active')) {
                    icon.classList.remove('fa-bars');
                    icon.classList.add('fa-xmark');
                } else {
                    icon.classList.remove('fa-xmark');
                    icon.classList.add('fa-bars');
                }
            });

            // Close menu when clicking a link
            navLinks.forEach(link => {
                link.addEventListener('click', () => {
                    nav.classList.remove('active');
                    const icon = toggleBtn.querySelector('i');
                    icon.classList.remove('fa-xmark');
                    icon.classList.add('fa-bars');
                });
            });
        }
    };

    // 3. FAQ Accordion
    const setupFAQ = () => {
        const faqQuestions = document.querySelectorAll('.faq-question');

        faqQuestions.forEach(question => {
            question.addEventListener('click', () => {
                const isExpanded = question.getAttribute('aria-expanded') === 'true';
                const answer = question.nextElementSibling;

                // Close all others
                faqQuestions.forEach(q => {
                    if (q !== question) {
                        q.setAttribute('aria-expanded', 'false');
                        q.nextElementSibling.style.maxHeight = null;
                    }
                });

                // Toggle current
                if (isExpanded) {
                    question.setAttribute('aria-expanded', 'false');
                    answer.style.maxHeight = null;
                } else {
                    question.setAttribute('aria-expanded', 'true');
                    answer.style.maxHeight = answer.scrollHeight + "px";
                }
            });
        });
    };

    // Initialize all
    injectLinks();
    setupMobileMenu();
    setupFAQ();
});

// 4. Gallery Interaction
document.addEventListener('DOMContentLoaded', () => {
    const carousel = document.querySelector('.gallery-carousel');
    const items = document.querySelectorAll('.gallery-item');
    if (!carousel) return;

    let currentRotation = 0;

    items.forEach((item, index) => {
        item.addEventListener('click', () => {
            // Calculate how much to rotate so the clicked item faces front.
            // Items are at 0, 72, 144, 216, 288 degrees.
            const itemRotation = index * 72;

            // We want the carousel to rotate backwards relative to the item's position
            // Add or subtract 360 to find the shortest path

            // Basic rotation logic to bring it front:
            // currentRotation - (currentRotation % 360) gives the base rotation
            let targetRotation = -itemRotation;

            // Stop auto animation to allow manual control
            carousel.style.animation = 'none';

            // Set smooth transition
            carousel.style.transition = 'transform 0.8s ease-out';
            carousel.style.transform = `rotateY(${targetRotation}deg)`;
        });
    });
});
