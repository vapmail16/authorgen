/**
 * Vibrant Bold Theme - Main JavaScript
 * ===================================
 * Enhanced animations and interactions for the vibrant-bold template
 */

document.addEventListener('DOMContentLoaded', function() {
    console.log('🎨 Vibrant Bold Theme Loaded!');
    
    // Initialize all features
    initPageTransition();
    initScrollAnimations();
    initSmoothScrolling();
    initFormValidation();
    initParallaxEffects();
    initButtonAnimations();
    initCardTiltEffects();
    initColorShifting();
    initParticleEffects();
    initGlassmorphismEffects();
});

/**
 * Scroll Animations
 * Animate elements as they come into view
 */
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                
                // Add staggered animation for multiple elements
                const siblings = entry.target.parentElement.querySelectorAll('.animate-on-scroll');
                siblings.forEach((sibling, index) => {
                    if (sibling === entry.target) {
                        setTimeout(() => {
                            sibling.classList.add('animated');
                        }, index * 100);
                    }
                });
            }
        });
    }, observerOptions);

    // Observe all elements with animate-on-scroll class
    document.querySelectorAll('.animate-on-scroll').forEach(el => {
        observer.observe(el);
    });
}

/**
 * Smooth Scrolling for Navigation Links
 */
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
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

/**
 * Form Validation and Enhancement
 */
function initFormValidation() {
    const contactForm = document.querySelector('.contact-form');
    if (!contactForm) return;

    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const name = formData.get('name');
        const email = formData.get('email');
        const subject = formData.get('subject');
        const message = formData.get('message');
        
        // Basic validation
        if (!name || !email || !subject || !message) {
            showNotification('Please fill in all fields', 'error');
            return;
        }
        
        if (!isValidEmail(email)) {
            showNotification('Please enter a valid email address', 'error');
            return;
        }
        
        // Simulate form submission
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        
        setTimeout(() => {
            showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
            this.reset();
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, 2000);
    });
}

/**
 * Parallax Effects for Hero Section
 */
function initParallaxEffects() {
    const hero = document.querySelector('.hero');
    if (!hero) return;

    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallaxSpeed = 0.5;
        
        if (scrolled < window.innerHeight) {
            hero.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
        }
    });
}

/**
 * Enhanced Button Animations
 */
function initButtonAnimations() {
    document.querySelectorAll('.btn').forEach(btn => {
        btn.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-4px) scale(1.05)';
        });
        
        btn.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
        
        btn.addEventListener('mousedown', function() {
            this.style.transform = 'translateY(-2px) scale(1.02)';
        });
        
        btn.addEventListener('mouseup', function() {
            this.style.transform = 'translateY(-4px) scale(1.05)';
        });
    });
}

/**
 * Card Tilt Effects
 */
function initCardTiltEffects() {
    document.querySelectorAll('.book-card, .hobby-card').forEach(card => {
        card.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px) scale(1.02)`;
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0) scale(1)';
        });
    });
}

/**
 * Dynamic Color Shifting
 */
function initColorShifting() {
    const heroTitle = document.querySelector('.author-name');
    if (!heroTitle) return;

    let hue = 0;
    setInterval(() => {
        hue = (hue + 1) % 360;
        heroTitle.style.filter = `hue-rotate(${hue}deg) drop-shadow(0 0 20px rgba(0, 102, 255, 0.4))`;
    }, 100);
}

/**
 * Utility Functions
 */
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existing = document.querySelector('.notification');
    if (existing) {
        existing.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Style the notification
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        color: white;
        font-weight: 600;
        z-index: 1000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 300px;
        box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
    `;
    
    // Set background color based on type
    switch(type) {
        case 'success':
            notification.style.background = 'linear-gradient(135deg, #00ff66, #00cc52)';
            break;
        case 'error':
            notification.style.background = 'linear-gradient(135deg, #ff0066, #cc0052)';
            break;
        default:
            notification.style.background = 'linear-gradient(135deg, #0066ff, #0044cc)';
    }
    
    // Add to DOM
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 5 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 300);
    }, 5000);
}

/**
 * Mobile Navigation Enhancement
 */
function initMobileNavigation() {
    const nav = document.querySelector('.nav');
    const navLinks = document.querySelector('.nav-links');
    
    if (!nav || !navLinks) return;
    
    // Create mobile menu button
    const menuBtn = document.createElement('button');
    menuBtn.className = 'mobile-menu-btn';
    menuBtn.innerHTML = '☰';
    menuBtn.style.cssText = `
        display: none;
        background: none;
        border: none;
        font-size: 1.5rem;
        color: var(--color-primary);
        cursor: pointer;
        padding: 0.5rem;
    `;
    
    nav.appendChild(menuBtn);
    
    // Toggle mobile menu
    menuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('mobile-open');
        menuBtn.innerHTML = navLinks.classList.contains('mobile-open') ? '✕' : '☰';
    });
    
    // Close mobile menu when clicking on a link
    navLinks.addEventListener('click', (e) => {
        if (e.target.tagName === 'A') {
            navLinks.classList.remove('mobile-open');
            menuBtn.innerHTML = '☰';
        }
    });
    
    // Show mobile menu button on small screens
    const mediaQuery = window.matchMedia('(max-width: 768px)');
    function handleMobileView(e) {
        if (e.matches) {
            menuBtn.style.display = 'block';
            navLinks.style.cssText = `
                position: absolute;
                top: 100%;
                left: 0;
                right: 0;
                background: white;
                flex-direction: column;
                padding: 1rem;
                box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                transform: translateY(-100%);
                opacity: 0;
                transition: all 0.3s ease;
                pointer-events: none;
            `;
        } else {
            menuBtn.style.display = 'none';
            navLinks.style.cssText = '';
            navLinks.classList.remove('mobile-open');
        }
    }
    
    mediaQuery.addListener(handleMobileView);
    handleMobileView(mediaQuery);
}

/**
 * Initialize mobile navigation
 */
initMobileNavigation();

/**
 * Performance Optimization
 */
// Debounce scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Throttle resize events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Optimize scroll performance
window.addEventListener('scroll', throttle(() => {
    // Scroll-based animations here
}, 16));

window.addEventListener('resize', debounce(() => {
    // Resize-based adjustments here
}, 250));

/**
 * Page Transition Effects
 */
function initPageTransition() {
    const pageElements = document.querySelectorAll('.page-transition');
    pageElements.forEach((element, index) => {
        setTimeout(() => {
            element.classList.add('loaded');
        }, index * 200);
    });
}

/**
 * Enhanced Particle Effects
 */
function initParticleEffects() {
    const container = document.querySelector('.particles-container');
    if (!container) return;

    // Create additional dynamic particles with vibrant colors
    const colors = [
        'linear-gradient(135deg, #ff0066, #ffaa00)',
        'linear-gradient(135deg, #00ff66, #0066ff)',
        'linear-gradient(135deg, #ffaa00, #ff0066)',
        'linear-gradient(135deg, #0066ff, #00ff66)',
        'linear-gradient(135deg, #ff0066, #00ff66)',
        'linear-gradient(135deg, #00ff66, #ffaa00)',
        'linear-gradient(135deg, #ffaa00, #0066ff)',
        'linear-gradient(135deg, #0066ff, #ff0066)'
    ];
    
    for (let i = 0; i < 12; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        const size = 6 + Math.random() * 8; // 6px to 14px
        const color = colors[Math.floor(Math.random() * colors.length)];
        
        particle.style.cssText = `
            top: ${Math.random() * 100}%;
            left: ${Math.random() * 100}%;
            animation-delay: ${Math.random() * 10}s;
            animation-duration: ${6 + Math.random() * 4}s;
            width: ${size}px;
            height: ${size}px;
            background: ${color};
            box-shadow: 0 0 ${size * 1.5}px rgba(0, 102, 255, 0.7), 0 0 ${size * 2}px rgba(255, 0, 102, 0.5);
        `;
        container.appendChild(particle);
    }

    // Add mouse interaction with particles
    container.addEventListener('mousemove', (e) => {
        const particles = container.querySelectorAll('.particle');
        particles.forEach((particle, index) => {
            const rect = container.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const particleRect = particle.getBoundingClientRect();
            const particleX = particleRect.left - rect.left;
            const particleY = particleRect.top - rect.top;
            
            const distance = Math.sqrt((x - particleX) ** 2 + (y - particleY) ** 2);
            
            if (distance < 100) {
                const force = (100 - distance) / 100;
                const angle = Math.atan2(y - particleY, x - particleX);
                const moveX = Math.cos(angle) * force * 20;
                const moveY = Math.sin(angle) * force * 20;
                
                particle.style.transform = `translate(${moveX}px, ${moveY}px) scale(${1 + force * 0.5})`;
            } else {
                particle.style.transform = 'translate(0, 0) scale(1)';
            }
        });
    });
}

/**
 * Glassmorphism Effects
 */
function initGlassmorphismEffects() {
    const footer = document.querySelector('.footer');
    if (!footer) return;

    // Add dynamic blur effect based on scroll
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = scrolled / maxScroll;
        
        const blurAmount = 10 + (scrollPercent * 10);
        footer.style.backdropFilter = `blur(${blurAmount}px)`;
    });

    // Add vibrant floating elements to footer
    const footerContent = footer.querySelector('.footer-content');
    if (footerContent) {
        const footerColors = [
            'linear-gradient(135deg, #ff0066, #ffaa00)',
            'linear-gradient(135deg, #00ff66, #0066ff)',
            'linear-gradient(135deg, #ffaa00, #ff0066)',
            'linear-gradient(135deg, #0066ff, #00ff66)',
            'linear-gradient(135deg, #ff0066, #00ff66)'
        ];
        
        for (let i = 0; i < 5; i++) {
            const floatElement = document.createElement('div');
            floatElement.className = 'footer-float-element';
            const size = 15 + Math.random() * 25; // 15px to 40px
            const color = footerColors[Math.floor(Math.random() * footerColors.length)];
            
            floatElement.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                background: ${color};
                border-radius: 50%;
                top: ${Math.random() * 100}%;
                left: ${Math.random() * 100}%;
                animation: footerFloat 8s ease-in-out infinite;
                animation-delay: ${Math.random() * 8}s;
                pointer-events: none;
                box-shadow: 0 0 ${size * 1.5}px rgba(255, 255, 255, 0.3), 0 0 ${size * 2}px rgba(0, 102, 255, 0.4);
                border: 2px solid rgba(255, 255, 255, 0.2);
                backdrop-filter: blur(2px);
            `;
            footer.appendChild(floatElement);
        }
    }
}

/**
 * Enhanced Scroll Animations with Staggered Effects
 */
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                
                // Add staggered animation for multiple elements
                const siblings = entry.target.parentElement.querySelectorAll([
                    '.animate-on-scroll',
                    '.animate-on-scroll-left',
                    '.animate-on-scroll-right',
                    '.animate-on-scroll-scale'
                ].join(','));
                
                siblings.forEach((sibling, index) => {
                    if (sibling === entry.target) {
                        setTimeout(() => {
                            sibling.classList.add('animated');
                        }, index * 150);
                    }
                });
            }
        });
    }, observerOptions);

    // Observe all elements with animation classes
    const animateElements = document.querySelectorAll([
        '.animate-on-scroll',
        '.animate-on-scroll-left', 
        '.animate-on-scroll-right',
        '.animate-on-scroll-scale'
    ].join(','));
    
    animateElements.forEach(el => observer.observe(el));
}

console.log('✨ Vibrant Bold JavaScript initialized successfully!');
