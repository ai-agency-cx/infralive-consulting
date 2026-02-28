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

    // ========== NEWSLETTER FORM HANDLING ==========
    const newsletterForm = document.getElementById('newsletterForm');
    const newsletterMessage = document.getElementById('newsletterMessage');

    if (newsletterForm && newsletterMessage) {
        newsletterForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const emailInput = newsletterForm.querySelector('input[type="email"]');
            const checkbox = newsletterForm.querySelector('input[type="checkbox"]');
            const submitButton = newsletterForm.querySelector('button[type="submit"]');
            
            // Validate email
            if (!emailInput.value || !emailInput.validity.valid) {
                showNewsletterMessage('Please enter a valid email address.', 'error');
                return;
            }
            
            // Validate checkbox
            if (!checkbox.checked) {
                showNewsletterMessage('Please agree to receive updates.', 'error');
                return;
            }
            
            // Disable button during submission
            const originalButtonText = submitButton.textContent;
            submitButton.textContent = 'Subscribing...';
            submitButton.disabled = true;
            
            try {
                // Simulate API call - in production, replace with actual API endpoint
                await new Promise(resolve => setTimeout(resolve, 1500));
                
                // Success - in production, this would be actual API success
                showNewsletterMessage('Thank you for subscribing! You will receive updates soon.', 'success');
                newsletterForm.reset();
                
                // Store in localStorage to prevent duplicate submissions
                localStorage.setItem('newsletterSubscribed', 'true');
                
            } catch (error) {
                showNewsletterMessage('Something went wrong. Please try again later.', 'error');
            } finally {
                // Re-enable button
                submitButton.textContent = originalButtonText;
                submitButton.disabled = false;
            }
        });
        
        // Check if already subscribed
        if (localStorage.getItem('newsletterSubscribed') === 'true') {
            const emailInput = newsletterForm.querySelector('input[type="email"]');
            const checkbox = newsletterForm.querySelector('input[type="checkbox"]');
            const submitButton = newsletterForm.querySelector('button[type="submit"]');
            
            emailInput.disabled = true;
            checkbox.disabled = true;
            submitButton.disabled = true;
            submitButton.textContent = 'Already Subscribed';
            
            showNewsletterMessage('You are already subscribed to our newsletter.', 'success');
        }
        
        function showNewsletterMessage(message, type) {
            newsletterMessage.textContent = message;
            newsletterMessage.className = `newsletter-message newsletter-${type}`;
            newsletterMessage.style.display = 'block';
            
            // Auto-hide after 5 seconds
            setTimeout(() => {
                newsletterMessage.style.display = 'none';
            }, 5000);
        }
    }

    // ========== SOCIAL SHARE FUNCTIONALITY ==========
    function initSocialShare() {
        const shareButtons = document.querySelectorAll('.share-button');
        
        shareButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                
                const platform = button.getAttribute('data-platform');
                const url = encodeURIComponent(window.location.href);
                const title = encodeURIComponent(document.title);
                const text = encodeURIComponent('Check out Infralyze Solutions');
                
                let shareUrl = '';
                
                switch (platform) {
                    case 'twitter':
                        shareUrl = `https://twitter.com/intent/tweet?url=${url}&text=${text}`;
                        break;
                    case 'linkedin':
                        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;
                        break;
                    case 'facebook':
                        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
                        break;
                    case 'email':
                        shareUrl = `mailto:?subject=${title}&body=${text}%0A%0A${url}`;
                        break;
                }
                
                if (shareUrl) {
                    window.open(shareUrl, '_blank', 'width=600,height=400');
                }
            });
        });
    }
    
    // Initialize social share if buttons exist
    if (document.querySelector('.share-button')) {
        initSocialShare();
    }

    // ========== ADD SOCIAL MEDIA LINKS TO FOOTER ==========
    function addSocialMediaLinks() {
        const contactSection = document.querySelector('.footer-grid > div:nth-child(3)');
        
        if (contactSection && !contactSection.querySelector('.social-links')) {
            const socialLinks = document.createElement('div');
            socialLinks.className = 'social-links';
            socialLinks.innerHTML = `
                <a href="https://twitter.com/Infralyze" class="social-link" target="_blank" rel="noopener" aria-label="Twitter">
                    <svg class="social-icon" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"/>
                    </svg>
                </a>
                <a href="https://linkedin.com/company/Infralyze" class="social-link" target="_blank" rel="noopener" aria-label="LinkedIn">
                    <svg class="social-icon" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
                        <rect x="2" y="9" width="4" height="12"/>
                        <circle cx="4" cy="4" r="2"/>
                    </svg>
                </a>
                <a href="https://github.com/Infralyze" class="social-link" target="_blank" rel="noopener" aria-label="GitHub">
                    <svg class="social-icon" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
                    </svg>
                </a>
            `;
            
            contactSection.appendChild(socialLinks);
        }
    }
    
    // Add social media links
    addSocialMediaLinks();

    // ========== ADD SHARE BUTTONS TO PAGES ==========
    function addShareButtons() {
        const mainContent = document.querySelector('main');
        
        if (mainContent && !document.querySelector('.share-buttons')) {
            const isArticlePage = window.location.pathname.includes('case-studies.html') || 
                                 window.location.pathname.includes('services.html');
            
            if (isArticlePage) {
                const shareSection = document.createElement('div');
                shareSection.className = 'share-buttons';
                shareSection.innerHTML = `
                    <span style="color: var(--color-white); margin-right: 12px;">Share:</span>
                    <a href="#" class="share-button" data-platform="twitter">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"/>
                        </svg>
                        Twitter
                    </a>
                    <a href="#" class="share-button" data-platform="linkedin">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
                            <rect x="2" y="9" width="4" height="12"/>
                            <circle cx="4" cy="4" r="2"/>
                        </svg>
                        LinkedIn
                    </a>
                    <a href="#" class="share-button" data-platform="email">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                            <polyline points="22,6 12,13 2,6"/>
                        </svg>
                        Email
                    </a>
                `;
                
                // Insert after the first section
                const firstSection = mainContent.querySelector('.section');
                if (firstSection) {
                    firstSection.insertAdjacentElement('afterend', shareSection);
                }
            }
        }
    }
    
    // Add share buttons if on article page
    addShareButtons();

    // ========== SEARCH FUNCTIONALITY ==========
    function initSearch() {
        const searchToggle = document.querySelector('.search-toggle');
        const searchBox = document.querySelector('.search-box');
        const searchInput = document.querySelector('.search-input');
        const searchResults = document.querySelector('.search-results');
        
        if (!searchToggle || !searchBox || !searchInput || !searchResults) return;
        
        // Site pages data for search
        const sitePages = [
            {
                title: 'Home',
                url: 'index.html',
                description: 'Infralyze Solutions homepage - AI & IT Infrastructure consulting',
                keywords: ['home', 'main', 'landing']
            },
            {
                title: 'About Us',
                url: 'about.html',
                description: 'Learn about Infralyze Solutions - Our mission, team, and expertise',
                keywords: ['about', 'company', 'team', 'mission', 'values']
            },
            {
                title: 'Services',
                url: 'services.html',
                description: 'Our services - AI Solutions, Infrastructure, IT Consulting',
                keywords: ['services', 'ai', 'infrastructure', 'consulting', 'solutions']
            },
            {
                title: 'Case Studies',
                url: 'case-studies.html',
                description: 'Client success stories and case studies',
                keywords: ['case studies', 'success stories', 'clients', 'projects']
            },
            {
                title: 'Contact Us',
                url: 'contact.html',
                description: 'Get in touch with Infralyze Solutions',
                keywords: ['contact', 'get in touch', 'email', 'phone', 'support']
            }
        ];
        
        // Toggle search box
        searchToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            searchBox.classList.toggle('active');
            if (searchBox.classList.contains('active')) {
                searchInput.focus();
            }
        });
        
        // Close search when clicking outside
        document.addEventListener('click', (e) => {
            if (!searchBox.contains(e.target) && !searchToggle.contains(e.target)) {
                searchBox.classList.remove('active');
            }
        });
        
        // Search functionality
        searchInput.addEventListener('input', (e) => {
            const query = e.target.value.toLowerCase().trim();
            
            if (query.length < 2) {
                searchResults.innerHTML = '<div class="no-results">Type at least 2 characters to search</div>';
                return;
            }
            
            const results = sitePages.filter(page => {
                return page.title.toLowerCase().includes(query) ||
                       page.description.toLowerCase().includes(query) ||
                       page.keywords.some(keyword => keyword.toLowerCase().includes(query));
            });
            
            if (results.length === 0) {
                searchResults.innerHTML = '<div class="no-results">No results found for "' + query + '"</div>';
                return;
            }
            
            searchResults.innerHTML = results.map(page => `
                <div class="search-result-item" data-url="${page.url}">
                    <div class="search-result-title">${page.title}</div>
                    <div class="search-result-url">${page.description}</div>
                </div>
            `).join('');
            
            // Add click handlers to results
            document.querySelectorAll('.search-result-item').forEach(item => {
                item.addEventListener('click', () => {
                    const url = item.getAttribute('data-url');
                    window.location.href = url;
                });
            });
        });
        
        // Handle Enter key
        searchInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                const query = searchInput.value.toLowerCase().trim();
                if (query.length < 2) return;
                
                const firstResult = sitePages.find(page => 
                    page.title.toLowerCase().includes(query) ||
                    page.description.toLowerCase().includes(query) ||
                    page.keywords.some(keyword => keyword.toLowerCase().includes(query))
                );
                
                if (firstResult) {
                    window.location.href = firstResult.url;
                }
            }
        });
    }
    
    // Initialize search
    initSearch();

    // ========== PERFORMANCE OPTIMIZATION ==========
    // Lazy load images
    function lazyLoadImages() {
        const images = document.querySelectorAll('img[data-src]');
        
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.getAttribute('data-src');
                    img.removeAttribute('data-src');
                    observer.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    }
    
    // Initialize lazy loading
    if ('IntersectionObserver' in window) {
        lazyLoadImages();
    }

    // ========== GOOGLE ANALYTICS 4 INTEGRATION ==========
    function initGoogleAnalytics() {
        // Replace with your actual GA4 measurement ID
        const GA_MEASUREMENT_ID = 'G-XXXXXXXXXX'; // TODO: Replace with actual ID
        
        // Only initialize if not in development
        if (window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1') {
            // Load gtag.js
            const script = document.createElement('script');
            script.async = true;
            script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
            document.head.appendChild(script);
            
            window.dataLayer = window.dataLayer || [];
            function gtag() { dataLayer.push(arguments); }
            gtag('js', new Date());
            gtag('config', GA_MEASUREMENT_ID);
            
            // Track custom events
            trackNewsletterSignups();
            trackContactFormSubmissions();
            trackPageViews();
        }
    }
    
    function trackNewsletterSignups() {
        const newsletterForm = document.getElementById('newsletterForm');
        if (newsletterForm) {
            newsletterForm.addEventListener('submit', () => {
                if (typeof gtag !== 'undefined') {
                    gtag('event', 'newsletter_signup', {
                        'event_category': 'engagement',
                        'event_label': 'Newsletter Subscription'
                    });
                }
            });
        }
    }
    
    function trackContactFormSubmissions() {
        const contactForm = document.getElementById('contactForm');
        if (contactForm) {
            contactForm.addEventListener('submit', () => {
                if (typeof gtag !== 'undefined') {
                    gtag('event', 'contact_form_submission', {
                        'event_category': 'lead',
                        'event_label': 'Contact Form'
                    });
                }
            });
        }
    }
    
    function trackPageViews() {
        // Track virtual pageviews for single page applications
        if (typeof gtag !== 'undefined') {
            gtag('event', 'page_view', {
                'page_title': document.title,
                'page_location': window.location.href,
                'page_path': window.location.pathname
            });
        }
    }
    
    // Initialize Google Analytics
    initGoogleAnalytics();

    // ========== PERFORMANCE MONITORING ==========
    function monitorPerformance() {
        // Measure page load time
        window.addEventListener('load', () => {
            const timing = performance.timing;
            const loadTime = timing.loadEventEnd - timing.navigationStart;
            
            console.log(`Page loaded in ${loadTime}ms`);
            
            // Send to analytics if load time is slow
            if (loadTime > 3000 && typeof gtag !== 'undefined') {
                gtag('event', 'slow_page_load', {
                    'event_category': 'performance',
                    'event_label': `Load time: ${loadTime}ms`,
                    'value': loadTime
                });
            }
        });
        
        // Monitor Core Web Vitals (simplified)
        if ('PerformanceObserver' in window) {
            try {
                const observer = new PerformanceObserver((list) => {
                    for (const entry of list.getEntries()) {
                        console.log(`${entry.name}:`, entry.startTime);
                    }
                });
                
                observer.observe({ entryTypes: ['largest-contentful-paint', 'first-input', 'layout-shift'] });
            } catch (e) {
                // PerformanceObserver not supported
            }
        }
    }
    
    // Start performance monitoring
    monitorPerformance();

    // ========== ACCESSIBILITY ENHANCEMENTS ==========
    function enhanceAccessibility() {
        // Add skip to content link
        const skipLink = document.createElement('a');
        skipLink.href = '#main-content';
        skipLink.className = 'skip-to-content';
        skipLink.textContent = 'Skip to main content';
        skipLink.style.cssText = `
            position: absolute;
            top: -40px;
            left: 0;
            background: var(--color-accent-1);
            color: white;
            padding: 8px;
            z-index: 10000;
        `;
        skipLink.addEventListener('focus', function() {
            this.style.top = '0';
        });
        skipLink.addEventListener('blur', function() {
            this.style.top = '-40px';
        });
        
        document.body.insertBefore(skipLink, document.body.firstChild);
        
        // Add main content id if not present
        const mainContent = document.querySelector('main');
        if (mainContent && !mainContent.id) {
            mainContent.id = 'main-content';
        }
        
        // Enhance focus visibility
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Tab') {
                document.body.classList.add('keyboard-navigation');
            }
        });
        
        document.addEventListener('mousedown', () => {
            document.body.classList.remove('keyboard-navigation');
        });
    }
    
    // Initialize accessibility enhancements
    enhanceAccessibility();

    // ========== ADVANCED MICRO-INTERACTIONS ==========
    function initMicroInteractions() {
        // Scroll-triggered animations
        const animatedElements = document.querySelectorAll('.card, .section, .service-item');
        
        if ('IntersectionObserver' in window) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('animate-in');
                        observer.unobserve(entry.target);
                    }
                });
            }, {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            });
            
            animatedElements.forEach(el => observer.observe(el));
        }
        
        // Parallax effect for hero section
        const hero = document.querySelector('.hero');
        if (hero) {
            window.addEventListener('scroll', () => {
                const scrolled = window.pageYOffset;
                const rate = scrolled * -0.5;
                hero.style.transform = `translate3d(0, ${rate}px, 0)`;
            });
        }
        
        // Animated counters
        const counters = document.querySelectorAll('.counter');
        counters.forEach(counter => {
            const target = +counter.getAttribute('data-target');
            const increment = target / 100;
            let current = 0;
            
            const updateCounter = () => {
                if (current < target) {
                    current += increment;
                    counter.textContent = Math.ceil(current);
                    setTimeout(updateCounter, 20);
                } else {
                    counter.textContent = target;
                }
            };
            
            // Start counter when in view
            const counterObserver = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting) {
                    updateCounter();
                    counterObserver.unobserve(counter);
                }
            });
            
            counterObserver.observe(counter);
        });
        
        // Hover effects for images
        const images = document.querySelectorAll('img.hover-effect');
        images.forEach(img => {
            img.addEventListener('mouseenter', () => {
                img.style.transform = 'scale(1.05)';
                img.style.transition = 'transform 0.3s ease';
            });
            
            img.addEventListener('mouseleave', () => {
                img.style.transform = 'scale(1)';
            });
        });
        
        // Ripple effect for buttons
        const buttons = document.querySelectorAll('.btn-ripple');
        buttons.forEach(button => {
            button.addEventListener('click', function(e) {
                const x = e.clientX - e.target.getBoundingClientRect().left;
                const y = e.clientY - e.target.getBoundingClientRect().top;
                
                const ripple = document.createElement('span');
                ripple.classList.add('ripple');
                ripple.style.left = `${x}px`;
                ripple.style.top = `${y}px`;
                
                this.appendChild(ripple);
                
                setTimeout(() => {
                    ripple.remove();
                }, 600);
            });
        });
    }
    
    // Initialize micro-interactions
    initMicroInteractions();
    
    // ========== ADD CSS FOR ANIMATIONS ==========
    function addAnimationStyles() {
        const style = document.createElement('style');
        style.textContent = `
            /* Scroll animations */
            .animate-in {
                animation: fadeInUp 0.6s ease forwards;
            }
            
            @keyframes fadeInUp {
                from {
                    opacity: 0;
                    transform: translateY(30px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
            
            /* Ripple effect */
            .ripple {
                position: absolute;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.7);
                transform: scale(0);
                animation: ripple 0.6s linear;
                pointer-events: none;
            }
            
            @keyframes ripple {
                to {
                    transform: scale(4);
                    opacity: 0;
                }
            }
            
            /* Staggered animations */
            .card:nth-child(1) { animation-delay: 0.1s; }
            .card:nth-child(2) { animation-delay: 0.2s; }
            .card:nth-child(3) { animation-delay: 0.3s; }
            .card:nth-child(4) { animation-delay: 0.4s; }
            .card:nth-child(5) { animation-delay: 0.5s; }
            
            /* Loading skeleton */
            .skeleton {
                background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
                background-size: 200% 100%;
                animation: loading 1.5s infinite;
            }
            
            @keyframes loading {
                0% { background-position: 200% 0; }
                100% { background-position: -200% 0; }
            }
            
            /* Page transition */
            .page-transition {
                animation: pageFade 0.3s ease;
            }
            
            @keyframes pageFade {
                from { opacity: 0; }
                to { opacity: 1; }
            }
        `;
        document.head.appendChild(style);
    }
    
    // Add animation styles
    addAnimationStyles();

    // ========== SERVICE WORKER REGISTRATION ==========
    function registerServiceWorker() {
        if ('serviceWorker' in navigator) {
            window.addEventListener('load', () => {
                navigator.serviceWorker.register('/sw.js')
                    .then(registration => {
                        console.log('ServiceWorker registered successfully:', registration.scope);
                        
                        // Check for updates
                        registration.addEventListener('updatefound', () => {
                            const newWorker = registration.installing;
                            console.log('ServiceWorker update found:', newWorker.state);
                            
                            newWorker.addEventListener('statechange', () => {
                                if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                                    console.log('New content is available; please refresh.');
                                    // Show update notification to user
                                    showUpdateNotification();
                                }
                            });
                        });
                    })
                    .catch(error => {
                        console.log('ServiceWorker registration failed:', error);
                    });
            });
            
            // Listen for controller change
            navigator.serviceWorker.addEventListener('controllerchange', () => {
                console.log('ServiceWorker controller changed');
                window.location.reload();
            });
        }
    }
    
    function showUpdateNotification() {
        // Create update notification
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            background: var(--gradient-accent);
            color: white;
            padding: 16px 24px;
            border-radius: var(--border-radius);
            box-shadow: var(--shadow-lg);
            z-index: 10000;
            display: flex;
            align-items: center;
            gap: 12px;
            animation: slideIn 0.3s ease;
        `;
        
        notification.innerHTML = `
            <span>New version available!</span>
            <button onclick="window.location.reload()" style="
                background: white;
                color: var(--color-accent-1);
                border: none;
                padding: 8px 16px;
                border-radius: 6px;
                font-weight: 600;
                cursor: pointer;
            ">Refresh</button>
        `;
        
        document.body.appendChild(notification);
        
        // Auto-remove after 10 seconds
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }, 10000);
    }
    
    // Register service worker
    registerServiceWorker();

    // ========== PERFORMANCE METRICS COLLECTION ==========
    function collectPerformanceMetrics() {
        // Collect Core Web Vitals
        if ('webVitals' in window) {
            webVitals.getCLS(console.log);
            webVitals.getFID(console.log);
            webVitals.getLCP(console.log);
        }
        
        // Collect custom metrics
        const metrics = {
            pageLoadTime: performance.timing.loadEventEnd - performance.timing.navigationStart,
            domContentLoaded: performance.timing.domContentLoadedEventEnd - performance.timing.navigationStart,
            firstPaint: performance.getEntriesByType('paint').find(entry => entry.name === 'first-paint')?.startTime || 0,
            firstContentfulPaint: performance.getEntriesByType('paint').find(entry => entry.name === 'first-contentful-paint')?.startTime || 0,
            timeToInteractive: performance.timing.domInteractive - performance.timing.navigationStart
        };
        
        console.log('Performance metrics:', metrics);
        
        // Send to analytics if available
        if (typeof gtag !== 'undefined') {
            gtag('event', 'performance_metrics', {
                'event_category': 'performance',
                'event_label': 'Page Load',
                'value': metrics.pageLoadTime,
                'non_interaction': true
            });
        }
    }
    
    // Collect metrics after page load
    window.addEventListener('load', () => {
        setTimeout(collectPerformanceMetrics, 1000);
    });

    // ========== ERROR TRACKING ==========
    function setupErrorTracking() {
        // Track JavaScript errors
        window.addEventListener('error', (event) => {
            const errorData = {
                message: event.message,
                filename: event.filename,
                lineno: event.lineno,
                colno: event.colno,
                error: event.error?.stack
            };
            
            console.error('JavaScript Error:', errorData);
            
            // Send to analytics if available
            if (typeof gtag !== 'undefined') {
                gtag('event', 'exception', {
                    'description': event.message,
                    'fatal': false
                });
            }
        });
        
        // Track unhandled promise rejections
        window.addEventListener('unhandledrejection', (event) => {
            console.error('Unhandled Promise Rejection:', event.reason);
            
            if (typeof gtag !== 'undefined') {
                gtag('event', 'exception', {
                    'description': 'Unhandled Promise Rejection: ' + event.reason,
                    'fatal': false
                });
            }
        });
        
        // Track resource loading errors
        document.addEventListener('error', (event) => {
            if (event.target.tagName === 'IMG' || event.target.tagName === 'SCRIPT' || event.target.tagName === 'LINK') {
                console.error('Resource failed to load:', event.target.src || event.target.href);
            }
        }, true);
    }
    
    // Setup error tracking
    setupErrorTracking();

    // ========== ADD LOADING ANIMATION TO PAGE ==========
    document.body.classList.add('loaded');
    
    // Add page transition class
    document.documentElement.classList.add('page-transition');
    
    // Add animation for update notification
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        
        @keyframes slideOut {
            from { transform: translateX(0); opacity: 1; }
            to { transform: translateX(100%); opacity: 0; }
        }
    `;
    document.head.appendChild(style);
});