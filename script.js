/**
 * Configuration Object
 * Centralized links for easy replacement in the future.
 */
const portfolioConfig = {
    email: "usmanboota.dev@gmail.com",
    whatsapp: "https://wa.me/923000437358",
    linkedin: "https://linkedin.com/in/musman100official",
    github: "https://github.com/useratnns"
};

document.addEventListener('DOMContentLoaded', () => {

    // 1. Inject Dynamic Links
    const injectLinks = () => {
        // Email
        const emailLinks = document.querySelectorAll('.dynamic-email');
        emailLinks.forEach(link => {
            link.href = `mailto:${portfolioConfig.email}`;
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

        // General mailto CTA (e.g. "Start a Project")
        const mailtoLinks = document.querySelectorAll('.dynamic-mailto');
        mailtoLinks.forEach(link => {
            link.href = `mailto:${portfolioConfig.email}?subject=New Project Inquiry`;
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