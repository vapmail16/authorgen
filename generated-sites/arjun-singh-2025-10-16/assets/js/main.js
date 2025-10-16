// Clean Earth Theme - Main JavaScript
// Minimal, Professional Interactions

(function() {
    'use strict';

    // ===== Smooth Scrolling =====
    function initSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }

    // ===== Mobile Navigation Toggle =====
    function initMobileMenu() {
        const navToggle = document.getElementById('navToggle');
        const navMenu = document.getElementById('navMenu');

        if (navToggle && navMenu) {
            navToggle.addEventListener('click', (e) => {
                e.stopPropagation();
                navMenu.classList.toggle('active');
                navToggle.classList.toggle('active');
            });

            // Close menu when clicking a link
            navMenu.querySelectorAll('.nav-link').forEach(link => {
                link.addEventListener('click', () => {
                    navMenu.classList.remove('active');
                    navToggle.classList.remove('active');
                });
            });

            // Close menu when clicking outside
            document.addEventListener('click', (e) => {
                if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
                    navMenu.classList.remove('active');
                    navToggle.classList.remove('active');
                }
            });
        }
    }

    // ===== Read More Toggle =====
    function initReadMore() {
        const readMoreBtn = document.getElementById('readMoreBtn');
        const extendedBio = document.getElementById('extendedBio');

        if (readMoreBtn && extendedBio) {
            readMoreBtn.addEventListener('click', () => {
                extendedBio.classList.toggle('collapsed');
                
                if (extendedBio.classList.contains('collapsed')) {
                    readMoreBtn.textContent = 'Read more';
                } else {
                    readMoreBtn.textContent = 'Read less';
                }
            });
        }
    }

    // ===== Scroll Animations =====
    function initScrollAnimations() {
        const elements = document.querySelectorAll('.animate-on-scroll');

        if (!elements.length) return;

        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Add a small delay for staggered animation
                    setTimeout(() => {
                        entry.target.classList.add('fade-in');
                    }, 100);
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        elements.forEach(element => {
            observer.observe(element);
        });
    }

    // ===== Form Validation (Enhanced) =====
    function initFormValidation() {
        const form = document.querySelector('.contact-form');
        if (!form) return;

        // Real-time validation
        const inputs = form.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', () => {
                validateField(input);
            });

            input.addEventListener('input', () => {
                if (input.classList.contains('error')) {
                    validateField(input);
                }
            });
        });

        // Form submission
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            let isValid = true;
            inputs.forEach(input => {
                if (!validateField(input)) {
                    isValid = false;
                }
            });

            if (isValid) {
                // Form is valid - you can add actual submission logic here
                alert('Thank you for your message! (Note: This is a demo - configure server-side handling to enable sending.)');
                form.reset();
            }
        });
    }

    function validateField(field) {
        const value = field.value.trim();
        let isValid = true;

        // Remove previous error
        field.classList.remove('error');
        const existingError = field.parentElement.querySelector('.error-message');
        if (existingError) {
            existingError.remove();
        }

        // Check if required field is empty
        if (field.hasAttribute('required') && !value) {
            isValid = false;
            showError(field, 'This field is required');
        }

        // Email validation
        if (field.type === 'email' && value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                isValid = false;
                showError(field, 'Please enter a valid email address');
            }
        }

        return isValid;
    }

    function showError(field, message) {
        field.classList.add('error');
        
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = message;
        errorDiv.style.cssText = 'color: #C85A54; font-size: 0.875rem; margin-top: 0.25rem;';
        
        field.parentElement.appendChild(errorDiv);
    }

    // ===== Navbar Scroll Effect =====
    function initNavbarScroll() {
        const navbar = document.querySelector('.navbar');
        let lastScrollTop = 0;

        window.addEventListener('scroll', () => {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

            // Add shadow when scrolled
            if (scrollTop > 50) {
                navbar.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.1)';
            } else {
                navbar.style.boxShadow = 'none';
            }

            lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
        });
    }

    // ===== External Links - Open in New Tab =====
    function initExternalLinks() {
        document.querySelectorAll('a[href^="http"]').forEach(link => {
            // Skip if already has target
            if (!link.hasAttribute('target')) {
                link.setAttribute('target', '_blank');
                link.setAttribute('rel', 'noopener noreferrer');
            }
        });
    }

    // ===== Lazy Load Images =====
    function initLazyLoading() {
        const images = document.querySelectorAll('img[data-src]');
        
        if (!images.length) return;

        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                        imageObserver.unobserve(img);
                    }
                });
            });

            images.forEach(img => imageObserver.observe(img));
        } else {
            // Fallback for older browsers
            images.forEach(img => {
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
            });
        }
    }

    // ===== Image Error Handling =====
    function initImageErrorHandling() {
        document.querySelectorAll('img').forEach(img => {
            img.addEventListener('error', function() {
                // Hide broken images gracefully
                this.style.display = 'none';
                
                // If it's an author photo, show placeholder
                if (this.classList.contains('author-photo')) {
                    const placeholder = this.parentElement.querySelector('.author-photo-placeholder');
                    if (placeholder) {
                        placeholder.style.display = 'flex';
                    }
                }
            });
        });
    }

    // ===== Reading Progress Indicator (for story page) =====
    function initReadingProgress() {
        const storyContent = document.querySelector('.story-content');
        if (!storyContent) return;

        const progressBar = document.createElement('div');
        progressBar.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 0%;
            height: 3px;
            background: linear-gradient(90deg, var(--color-sage), var(--color-olive));
            z-index: 9999;
            transition: width 0.2s ease;
        `;
        document.body.appendChild(progressBar);

        window.addEventListener('scroll', () => {
            const windowHeight = window.innerHeight;
            const documentHeight = document.documentElement.scrollHeight;
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            const scrollPercent = (scrollTop / (documentHeight - windowHeight)) * 100;
            progressBar.style.width = Math.min(scrollPercent, 100) + '%';
        });
    }

    // ===== Initialize All Features =====
    function init() {
        // Core features
        initSmoothScroll();
        initMobileMenu();
        initReadMore();
        initScrollAnimations();
        initFormValidation();
        initNavbarScroll();
        initExternalLinks();
        initLazyLoading();
        initImageErrorHandling();
        initReadingProgress();

        // Console message
        console.log('%c✨ Clean Earth Theme Loaded', 'color: #8B9556; font-size: 14px; font-weight: bold;');
    }

    // ===== Run When DOM is Ready =====
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    // ===== Prevent Animation Jank on Resize =====
    let resizeTimer;
    window.addEventListener('resize', () => {
        document.body.classList.add('resize-animation-stopper');
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            document.body.classList.remove('resize-animation-stopper');
        }, 400);
    });

    // Add CSS for resize animation stopper
    const style = document.createElement('style');
    style.textContent = `
        .resize-animation-stopper * {
            animation: none !important;
            transition: none !important;
        }
    `;
    document.head.appendChild(style);

})();

