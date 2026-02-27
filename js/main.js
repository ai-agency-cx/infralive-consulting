document.addEventListener('DOMContentLoaded', () => {
    
    // Mobile Navigation Toggle
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

    // Contact Form Handling (AJAX)
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
});