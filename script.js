/**
 * Configuration Object
 * Centralized links for easy replacement in the future.
 */
const portfolioConfig = {
    email: "https://mail.google.com/mail/?view=cm&fs=1&to=usmanboota.dev@gmail.com",
    whatsapp: "https://wa.me/923000437358",
    linkedin: "https://linkedin.com/in/musman100official",
    github: "https://github.com/useratnns",
    fiverr: "https://www.fiverr.com/sellers/usman_devs/"
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


    // 4. Project Slider Interaction
    const setupSlider = () => {
        const imageSlides = document.querySelectorAll('.project-image-slide');
        const infoSlides = document.querySelectorAll('.project-info-slide');
        const indicators = document.querySelectorAll('.indicator');
        const prevBtn = document.querySelector('.prev-btn');
        const nextBtn = document.querySelector('.next-btn');
        let currentSlide = 0;
        let slideInterval;

        if (imageSlides.length === 0 || infoSlides.length === 0) return;

        const showSlide = (index) => {
            // Remove active classes
            imageSlides.forEach(s => s.classList.remove('active'));
            infoSlides.forEach(s => s.classList.remove('active'));
            indicators.forEach(i => i.classList.remove('active'));

            // Handle wrap-around
            if (index >= imageSlides.length) currentSlide = 0;
            else if (index < 0) currentSlide = imageSlides.length - 1;
            else currentSlide = index;

            // Add active classes
            imageSlides[currentSlide].classList.add('active');
            infoSlides[currentSlide].classList.add('active');
            indicators[currentSlide].classList.add('active');
        };

        const nextSlide = () => {
            showSlide(currentSlide + 1);
        };

        const prevSlide = () => {
            showSlide(currentSlide - 1);
        };

        // Manual Navigation
        if (nextBtn) nextBtn.addEventListener('click', () => {
            nextSlide();
            resetInterval();
        });

        if (prevBtn) prevBtn.addEventListener('click', () => {
            prevSlide();
            resetInterval();
        });

        indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => {
                showSlide(index);
                resetInterval();
            });
        });

        // Auto Navigation
        const startInterval = () => {
            slideInterval = setInterval(nextSlide, 5000);
        };

        const resetInterval = () => {
            clearInterval(slideInterval);
            startInterval();
        };

        // Pause on hover
        const showcase = document.querySelector('.project-showcase');
        if (showcase) {
            showcase.addEventListener('mouseenter', () => clearInterval(slideInterval));
            showcase.addEventListener('mouseleave', startInterval);
        }

        startInterval();
    };

    setupSlider();
});
