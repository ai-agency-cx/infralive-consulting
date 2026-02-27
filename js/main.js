document.addEventListener('DOMContentLoaded', () => {
    
    // ========== MOBILE NAVIGATION TOGGLE ==========
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close menu when a link is clicked
        document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }));
    }

    // ========== BACK TO TOP BUTTON ==========
    const backToTopButton = document.createElement('a');
    backToTopButton.href = '#';
    backToTopButton.className = 'back-to-top';
    backToTopButton.innerHTML = '↑';
    backToTopButton.setAttribute('aria-label', 'Back to top');
    document.body.appendChild(backToTopButton);

    // Show/hide back to top button
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopButton.classList.add('visible');
        } else {
            backToTopButton.classList.remove('visible');
        }
    });

    // Smooth scroll to top
    backToTopButton.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // ========== ENHANCED NAVIGATION ACTIVE STATE ==========
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-link').forEach(link => {
        const linkPage = link.getAttribute('href');
        if (linkPage === currentPage || (currentPage === '' && linkPage === 'index.html')) {
            link.classList.add('active');
        }
    });

    // ========== CARD HOVER ENHANCEMENTS ==========
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.zIndex = '10';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.zIndex = '1';
        });
    });

    // ========== CONTACT FORM HANDLING (AJAX) ==========
    const form = document.getElementById('contactForm');
    const formStatus = document.getElementById('form-status');

    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            const data = new FormData(form);
            const action = form.action;

            // Check if action is the placeholder
            if (action.includes('YOUR_FORM_ID')) {
                formStatus.style.color = 'red';
                formStatus.textContent = "Error: Formspree ID not configured yet.";
                return;
            }

            try {
                formStatus.textContent = 'Sending...';
                const response = await fetch(action, {
                    method: 'POST',
                    body: data,
                    headers: {
                        'Accept': 'application/json'
                    }
                });

                if (response.ok) {
                    formStatus.style.color = 'green';
                    formStatus.textContent = "Thanks for your submission! We'll be in touch soon.";
                    form.reset();
                } else {
                    const jsonData = await response.json();
                    let errors = jsonData.errors;
                    let errorMessage = "Oops! During submission, there was a problem.";
                    
                    if (errors) {
                        errorMessage = errors.map(error => error.message).join(", ");
                    }
                    formStatus.style.color = 'red';
                    formStatus.textContent = errorMessage;
                }
            } catch (error) {
                formStatus.style.color = 'red';
                formStatus.textContent = "Oops! There was a problem submitting your form.";
            }
        });
    }

    // ========== SMOOTH SCROLL FOR ANCHOR LINKS ==========
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            
            // Only process internal anchor links
            if (href !== '#' && href.startsWith('#')) {
                e.preventDefault();
                const targetElement = document.querySelector(href);
                
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80, // Adjust for header height
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // ========== ADD LOADING ANIMATION TO PAGE ==========
    document.body.classList.add('loaded');
});