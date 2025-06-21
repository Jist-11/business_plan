document.addEventListener('DOMContentLoaded', () => {
    // Console log branding for a personal touch
    console.log("💎 Website by Manan — Book Yours!");
    console.log("%cBlazing fast, modern, and high-impact websites.", "color: #00f7ff; font-weight: bold;");

    // --- Sticky Navigation Bar Shadow ---
    const navbar = document.getElementById('navbar');
    // Ensure navbar element exists before adding scroll listener
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }


    // --- Mobile Hamburger Menu Toggle ---
    const hamburgerMenu = document.getElementById('hamburger-menu');
    const mobileMenu = document.getElementById('mobile-menu');

    // Ensure both elements exist before attaching listeners
    if (hamburgerMenu && mobileMenu) {
        hamburgerMenu.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });

        // Close mobile menu when a nav link is clicked (for better UX)
        document.querySelectorAll('#mobile-menu .mobile-nav-link').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden'); // Hide menu after selection
            });
        });
    }

    // --- Smooth Scrolling for Internal Navigation Links ---
    // Selects all links that start with '#' but do NOT have target="_blank"
    document.querySelectorAll('a.nav-link[href^="#"], a.mobile-nav-link[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            // Check if the link is meant to open in a new tab; if so, let default behavior happen
            if (this.getAttribute('target') === '_blank') {
                return;
            }

            e.preventDefault(); // Prevent default jump behavior

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            const offset = navbar ? navbar.offsetHeight : 0; // Get dynamic navbar height, default to 0 if navbar not found

            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - offset,
                    behavior: 'smooth'
                });
            }
        });
    });

    // --- Dynamic Subheadline Typing Effect ---
    const subheadlineElement = document.getElementById('subheadline');
    const phrases = [
        "Affordable at ₹200 💸",
        "Mobile-First Design 📱",
        "Trusted by Students & Shops 🔑",
        "Delivered in 24 Hours 🚀"
    ];
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    const typingSpeed = 100;
    const deletingSpeed = 50;
    const pauseTime = 1500;

    function typeEffect() {
        if (!subheadlineElement) return; // Guard: Exit if element not found

        const currentPhrase = phrases[phraseIndex];

        if (isDeleting) {
            subheadlineElement.textContent = currentPhrase.substring(0, charIndex - 1);
            charIndex--;
            if (charIndex === 0) {
                isDeleting = false;
                phraseIndex = (phraseIndex + 1) % phrases.length;
                setTimeout(typeEffect, typingSpeed);
                return;
            }
        } else {
            subheadlineElement.textContent = currentPhrase.substring(0, charIndex + 1);
            charIndex++;
            if (charIndex === currentPhrase.length) {
                isDeleting = true;
                setTimeout(typeEffect, pauseTime);
                return;
            }
        }
        const currentSpeed = isDeleting ? deletingSpeed : typingSpeed;
        setTimeout(typeEffect, currentSpeed);
    }

    if (subheadlineElement) { // Guard: Only start if element exists
        typeEffect();
    }


    // --- Scroll Reveal Animations (Intersection Observer API) ---
    const revealElements = document.querySelectorAll('.reveal');
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    revealElements.forEach(el => {
        observer.observe(el);
    });

    // --- Testimonials Carousel ---
    const testimonialCarousel = document.getElementById('testimonial-carousel');
    const testimonialDotsContainer = document.getElementById('testimonial-dots');
    const testimonials = document.querySelectorAll('.testimonials-section__testimonial-item');
    let currentTestimonialIndex = 0;
    const intervalTime = 5000;
    let carouselInterval;

    function updateCarousel() {
        if (testimonialCarousel && testimonials.length > 0) { // Guard: Ensure elements exist and there are testimonials
            testimonialCarousel.style.transform = `translateX(-${currentTestimonialIndex * 100}%)`;
            updateDots();
        }
    }

    function updateDots() {
        if (!testimonialDotsContainer) return; // Guard: Ensure dots container exists
        testimonialDotsContainer.querySelectorAll('.testimonial-dot').forEach((dot, index) => {
            if (index === currentTestimonialIndex) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }

    function startCarousel() {
        if (testimonials.length === 0) return; // Guard: No testimonials to carousel
        clearInterval(carouselInterval); // Clear existing interval
        carouselInterval = setInterval(() => {
            currentTestimonialIndex = (currentTestimonialIndex + 1) % testimonials.length;
            updateCarousel();
        }, intervalTime);
    }

    function resetCarouselInterval() {
        clearInterval(carouselInterval);
        startCarousel();
    }

    if (testimonialDotsContainer) { // Guard: Only add listener if container exists
        testimonialDotsContainer.addEventListener('click', (e) => {
            if (e.target.classList.contains('testimonial-dot')) {
                const slideIndex = parseInt(e.target.dataset.slide);
                if (!isNaN(slideIndex)) {
                    currentTestimonialIndex = slideIndex;
                    updateCarousel();
                    resetCarouselInterval();
                }
            }
        });
    }

    if (testimonialCarousel && testimonials.length > 0) { // Guard: Only init if relevant elements exist
        updateCarousel();
        startCarousel();
    }


    // --- FAQ Accordion ---
    const faqAccordion = document.getElementById('faq-accordion');

    if (faqAccordion) { // Guard: Only add listener if accordion exists
        faqAccordion.addEventListener('click', (e) => {
            const header = e.target.closest('.faq-item__header');
            if (!header) return;

            const content = header.nextElementSibling;
            const icon = header.querySelector('.faq-item__icon');

            // Close all other open accordions
            document.querySelectorAll('.faq-item__header.active').forEach(openHeader => {
                if (openHeader !== header) {
                    openHeader.classList.remove('active');
                    const openContent = openHeader.nextElementSibling;
                    if (openContent) { // Guard: Check if content exists
                        openContent.classList.remove('open');
                        openContent.style.maxHeight = null;
                        // For pure CSS, reset padding too if it changes with 'open' class
                        openContent.style.paddingTop = '0px';
                        openContent.style.paddingBottom = '0px';
                    }
                    const openIcon = openHeader.querySelector('.faq-item__icon');
                    if (openIcon) { // Guard: Check if icon exists
                        openIcon.textContent = '+';
                    }
                }
            });

            // Toggle the clicked accordion
            header.classList.toggle('active');
            if (content) { // Guard: Check if content exists
                content.classList.toggle('open');
                if (content.classList.contains('open')) {
                    // Set max-height to scrollHeight for smooth expansion
                    content.style.maxHeight = content.scrollHeight + "px";
                    // Also apply padding here since content starts at 0px padding-top/bottom
                    content.style.paddingTop = '24px'; // Match CSS .faq-item__content.open padding
                    content.style.paddingBottom = '24px'; // Match CSS .faq-item__content.open padding
                } else {
                    // Collapse content by resetting max-height and padding
                    content.style.maxHeight = null;
                    content.style.paddingTop = '0px';
                    content.style.paddingBottom = '0px';
                }
            }

            if (icon) { // Guard: Check if icon exists
                icon.textContent = content && content.classList.contains('open') ? '×' : '+';
            }
        });

        // Initialize FAQ states: ensure all are closed on load
        document.querySelectorAll('.faq-item__content').forEach(content => {
            content.style.maxHeight = null;
            content.style.paddingTop = '0px'; // Explicitly set to 0
            content.style.paddingBottom = '0px'; // Explicitly set to 0
            content.classList.remove('open');
        });
        document.querySelectorAll('.faq-item__icon').forEach(icon => {
            icon.textContent = '+';
        });
        document.querySelectorAll('.faq-item__header').forEach(header => {
            header.classList.remove('active');
        });
    }

    // --- "Open Form" Confirmation Message ---
    const openFormButton = document.getElementById('open-form-button');
    const bookingSuccessMessage = document.getElementById('booking-success-message');
    const googleFormURL = "https://docs.google.com/forms/d/e/1FAIpQLScdtzNJjXkSmbQIyXDqigO7yzJLCFSJZJbfOHbPO1taHfa37w/viewform";

    // Ensure both elements exist
    if (openFormButton && bookingSuccessMessage) {
        openFormButton.addEventListener('click', (e) => {
            e.preventDefault(); // Prevent default link behavior immediately

            // Show the success message
            bookingSuccessMessage.classList.remove('hidden'); // Make it display
            // Force reflow to ensure the transition is applied from the 'hidden' state
            void bookingSuccessMessage.offsetWidth;
            bookingSuccessMessage.classList.add('show'); // Apply 'show' for opacity/visibility transition

            // Set a timeout to open the form and hide the message
            setTimeout(() => {
                // Hide the message first
                bookingSuccessMessage.classList.remove('show'); // Start fade-out
                setTimeout(() => {
                    bookingSuccessMessage.classList.add('hidden'); // After transition, set display:none
                }, 500); // This should match the CSS transition duration

                // Open the Google Form in a new tab
                const newTab = window.open(googleFormURL, '_blank', 'noopener,noreferrer');
                if (newTab) {
                    newTab.focus(); // Try to bring the new tab to the front
                } else {
                    console.warn("Popup blocked. Please allow popups for this site to open the form.");
                }
            }, 1500); // Message visible for 1.5 seconds before starting to hide and open form
        });
    }
});
