/**
 * Main JavaScript functionality for VRBO Story website
 */

(function() {
    'use strict';

    // DOM Content Loaded Event
    document.addEventListener('DOMContentLoaded', function() {
        initializeAOS();
        initializeNavbar();
        initializeSmoothScrolling();
        initializeCounters();
        initializeScrollAnimations();
        initializeModalHandlers();
        initializeShareTracking();
        initializeParallaxEffect();
        initializeTypingEffect();
    });

    /**
     * Initialize AOS (Animate On Scroll) library
     */
    function initializeAOS() {
        if (typeof AOS !== 'undefined') {
            AOS.init({
                duration: 800,
                easing: 'ease-out-cubic',
                once: true,
                offset: 50,
                delay: 100
            });
        }
    }

    /**
     * Initialize navbar scroll behavior
     */
    function initializeNavbar() {
        const navbar = document.getElementById('mainNav');
        
        window.addEventListener('scroll', function() {
            if (window.scrollY > 100) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });

        // Mobile menu close on link click
        const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
        const navbarCollapse = document.querySelector('.navbar-collapse');
        
        navLinks.forEach(function(link) {
            link.addEventListener('click', function() {
                if (navbarCollapse.classList.contains('show')) {
                    const bsCollapse = new bootstrap.Collapse(navbarCollapse);
                    bsCollapse.hide();
                }
            });
        });
    }

    /**
     * Initialize smooth scrolling for anchor links
     */
    function initializeSmoothScrolling() {
        const smoothScrollLinks = document.querySelectorAll('a[href^="#"]');
        
        smoothScrollLinks.forEach(function(link) {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    const offsetTop = targetElement.offsetTop - 80; // Account for fixed navbar
                    
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    /**
     * Initialize animated counters
     */
    function initializeCounters() {
        const counters = document.querySelectorAll('[id$="-counter"]');
        
        counters.forEach(function(counter) {
            const observer = new IntersectionObserver(function(entries) {
                entries.forEach(function(entry) {
                    if (entry.isIntersecting) {
                        animateCounter(counter);
                        observer.unobserve(counter);
                    }
                });
            });
            
            observer.observe(counter);
        });
    }

    /**
     * Animate counter from 0 to target value
     */
    function animateCounter(element) {
        const target = parseInt(element.textContent) || 0;
        const duration = 2000;
        const step = target / (duration / 16); // 60fps
        let current = 0;
        
        const timer = setInterval(function() {
            current += step;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            
            element.textContent = Math.floor(current).toLocaleString();
        }, 16);
    }

    /**
     * Initialize scroll-triggered animations
     */
    function initializeScrollAnimations() {
        const animatedElements = document.querySelectorAll('.scroll-animate, .timeline-item');
        
        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate', 'in-view');
                    
                    // Stagger animation for timeline items
                    if (entry.target.classList.contains('timeline-item')) {
                        const delay = Array.from(entry.target.parentNode.children).indexOf(entry.target) * 200;
                        setTimeout(function() {
                            entry.target.style.opacity = '1';
                            entry.target.style.transform = 'translateY(0)';
                        }, delay);
                    }
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });
        
        animatedElements.forEach(function(element) {
            observer.observe(element);
        });
    }

    /**
     * Initialize modal event handlers
     */
    function initializeModalHandlers() {
        const modals = document.querySelectorAll('.modal');
        
        modals.forEach(function(modal) {
            modal.addEventListener('shown.bs.modal', function() {
                // Track modal view
                const modalId = this.id;
                trackEvent('modal_view', { modal_id: modalId });
            });
        });
    }

    /**
     * Initialize social share tracking
     */
    function initializeShareTracking() {
        const shareButtons = document.querySelectorAll('.btn-social');
        
        shareButtons.forEach(function(button) {
            button.addEventListener('click', function(e) {
                const platform = getPlatformFromButton(this);
                trackEvent('social_share', { platform: platform });
                
                // Update share counter
                updateShareCounter();
                
                // Add animation feedback
                this.classList.add('animate-pulse');
                setTimeout(() => {
                    this.classList.remove('animate-pulse');
                }, 600);
            });
        });
    }

    /**
     * Get platform name from button classes
     */
    function getPlatformFromButton(button) {
        if (button.classList.contains('btn-twitter')) return 'twitter';
        if (button.classList.contains('btn-facebook')) return 'facebook';
        if (button.classList.contains('btn-reddit')) return 'reddit';
        return 'unknown';
    }

    /**
     * Update share counter display
     */
    function updateShareCounter() {
        const counter = document.getElementById('shares-counter');
        if (counter) {
            const currentCount = parseInt(counter.textContent) || 0;
            const newCount = currentCount + 1;
            
            // Store in localStorage
            localStorage.setItem('story-shares', newCount);
            
            // Animate counter update
            counter.classList.add('counter-animate');
            counter.textContent = newCount;
            
            setTimeout(() => {
                counter.classList.remove('counter-animate');
            }, 500);
        }
    }

    /**
     * Initialize parallax scrolling effect
     */
    function initializeParallaxEffect() {
        const parallaxElements = document.querySelectorAll('.parallax');
        
        if (parallaxElements.length === 0) return;
        
        // Check if user prefers reduced motion
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            return;
        }
        
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            
            parallaxElements.forEach(function(element) {
                element.style.transform = `translateY(${rate}px)`;
            });
        });
    }

    /**
     * Initialize typing effect for hero text
     */
    function initializeTypingEffect() {
        const typewriterElements = document.querySelectorAll('.typewriter');
        
        typewriterElements.forEach(function(element) {
            const text = element.textContent;
            element.textContent = '';
            element.style.borderRight = '3px solid var(--primary-color)';
            
                        let i = 0;
            const timer = setInterval(function() {
                if (i < text.length) {
                    element.textContent += text.charAt(i);
                    i++;
                } else {
                    clearInterval(timer);
                    // Remove cursor after typing is complete
                    setTimeout(() => {
                        element.style.borderRight = 'none';
                    }, 1000);
                }
            }, 100);
        });
    }

    /**
     * Track events for analytics
     */
    function trackEvent(eventName, parameters) {
        // Google Analytics 4
        if (typeof gtag !== 'undefined') {
            gtag('event', eventName, parameters);
        }
        
        // Facebook Pixel
        if (typeof fbq !== 'undefined') {
            fbq('track', eventName, parameters);
        }
        
        // Console log for debugging
        console.log('Event tracked:', eventName, parameters);
    }

    /**
     * Initialize view counter with realistic simulation
     */
    function initializeViewCounter() {
        const viewsCounter = document.getElementById('views-counter');
        if (!viewsCounter) return;
        
        // Get or generate base view count
        let views = localStorage.getItem('story-views');
        if (!views) {
            views = Math.floor(Math.random() * 5000) + 2000;
            localStorage.setItem('story-views', views);
        }
        
        views = parseInt(views) + Math.floor(Math.random() * 10) + 1;
        localStorage.setItem('story-views', views);
        
        // Animate counter
        animateCounterTo(viewsCounter, views);
    }

    /**
     * Animate counter to specific value
     */
    function animateCounterTo(element, targetValue) {
        const duration = 2000;
        const startValue = 0;
        const increment = targetValue / (duration / 16);
        let current = startValue;
        
        const timer = setInterval(function() {
            current += increment;
            if (current >= targetValue) {
                current = targetValue;
                clearInterval(timer);
            }
            element.textContent = Math.floor(current).toLocaleString();
        }, 16);
    }

    /**
     * Initialize lazy loading for images
     */
    function initializeLazyLoading() {
        const images = document.querySelectorAll('img[data-src]');
        
        const imageObserver = new IntersectionObserver(function(entries, observer) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        images.forEach(function(img) {
            imageObserver.observe(img);
        });
    }

    /**
     * Initialize form handlers
     */
    function initializeFormHandlers() {
        const forms = document.querySelectorAll('form');
        
        forms.forEach(function(form) {
            form.addEventListener('submit', function(e) {
                e.preventDefault();
                
                // Basic form validation
                if (validateForm(form)) {
                    submitForm(form);
                }
            });
        });
    }

    /**
     * Validate form inputs
     */
    function validateForm(form) {
        const inputs = form.querySelectorAll('input[required], textarea[required]');
        let isValid = true;
        
        inputs.forEach(function(input) {
            if (!input.value.trim()) {
                showFieldError(input, 'This field is required');
                isValid = false;
            } else {
                clearFieldError(input);
            }
        });
        
        return isValid;
    }

    /**
     * Show field error message
     */
    function showFieldError(field, message) {
        clearFieldError(field);
        
        const errorDiv = document.createElement('div');
        errorDiv.className = 'field-error text-danger small mt-1';
        errorDiv.textContent = message;
        
        field.classList.add('is-invalid');
        field.parentNode.appendChild(errorDiv);
    }

    /**
     * Clear field error message
     */
    function clearFieldError(field) {
        field.classList.remove('is-invalid');
        const existingError = field.parentNode.querySelector('.field-error');
        if (existingError) {
            existingError.remove();
        }
    }

    /**
     * Submit form data
     */
    function submitForm(form) {
        const formData = new FormData(form);
        const submitButton = form.querySelector('button[type="submit"]');
        
        // Show loading state
        if (submitButton) {
            submitButton.disabled = true;
            submitButton.innerHTML = '<span class="spinner me-2"></span>Sending...';
        }
        
        // Simulate form submission (replace with actual endpoint)
        setTimeout(function() {
            showNotification('Message sent successfully!', 'success');
            form.reset();
            
            if (submitButton) {
                submitButton.disabled = false;
                submitButton.innerHTML = 'Send Message';
            }
        }, 2000);
    }

    /**
     * Show notification message
     */
    function showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `alert alert-${type} notification-toast`;
        notification.innerHTML = `
            <span>${message}</span>
            <button type="button" class="btn-close" onclick="this.parentElement.remove()"></button>
        `;
        
        // Add styles for notification
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            z-index: 9999;
            min-width: 300px;
            animation: slideInRight 0.3s ease;
        `;
        
        document.body.appendChild(notification);
        
        // Auto remove after 5 seconds
        setTimeout(function() {
            if (notification.parentNode) {
                notification.style.animation = 'slideOutRight 0.3s ease';
                setTimeout(() => notification.remove(), 300);
            }
        }, 5000);
    }

    /**
     * Initialize tooltip functionality
     */
    function initializeTooltips() {
        const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
        tooltipTriggerList.map(function(tooltipTriggerEl) {
            return new bootstrap.Tooltip(tooltipTriggerEl);
        });
    }

    /**
     * Initialize copy to clipboard functionality
     */
    function initializeCopyToClipboard() {
        const copyButtons = document.querySelectorAll('[data-copy]');
        
        copyButtons.forEach(function(button) {
            button.addEventListener('click', function() {
                const textToCopy = this.dataset.copy || window.location.href;
                
                navigator.clipboard.writeText(textToCopy).then(function() {
                    showNotification('Link copied to clipboard!', 'success');
                }).catch(function() {
                    // Fallback for older browsers
                    const textArea = document.createElement('textarea');
                    textArea.value = textToCopy;
                    document.body.appendChild(textArea);
                    textArea.select();
                    document.execCommand('copy');
                    document.body.removeChild(textArea);
                    
                    showNotification('Link copied to clipboard!', 'success');
                });
            });
        });
    }

    /**
     * Initialize reading progress indicator
     */
    function initializeReadingProgress() {
        const progressBar = document.createElement('div');
        progressBar.className = 'reading-progress';
        progressBar.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 0%;
            height: 3px;
            background: linear-gradient(90deg, var(--primary-color), var(--accent-color));
            z-index: 9999;
            transition: width 0.3s ease;
        `;
        
        document.body.appendChild(progressBar);
        
        window.addEventListener('scroll', function() {
            const scrollTop = window.pageYOffset;
            const docHeight = document.body.scrollHeight - window.innerHeight;
            const scrollPercent = (scrollTop / docHeight) * 100;
            
            progressBar.style.width = Math.min(scrollPercent, 100) + '%';
        });
    }

    /**
     * Initialize keyboard navigation
     */
    function initializeKeyboardNavigation() {
        document.addEventListener('keydown', function(e) {
            // ESC key closes modals
            if (e.key === 'Escape') {
                const openModal = document.querySelector('.modal.show');
                if (openModal) {
                    const bsModal = bootstrap.Modal.getInstance(openModal);
                    if (bsModal) bsModal.hide();
                }
            }
            
            // Arrow keys for section navigation
            if (e.key === 'ArrowDown' && e.ctrlKey) {
                e.preventDefault();
                navigateToNextSection();
            }
            
            if (e.key === 'ArrowUp' && e.ctrlKey) {
                e.preventDefault();
                navigateToPreviousSection();
            }
        });
    }

    /**
     * Navigate to next section
     */
    function navigateToNextSection() {
        const sections = document.querySelectorAll('section[id]');
        const currentScrollY = window.pageYOffset;
        
        for (let i = 0; i < sections.length; i++) {
            const section = sections[i];
            const sectionTop = section.offsetTop - 100;
            
            if (sectionTop > currentScrollY) {
                section.scrollIntoView({ behavior: 'smooth' });
                break;
            }
        }
    }

    /**
     * Navigate to previous section
     */
    function navigateToPreviousSection() {
        const sections = document.querySelectorAll('section[id]');
        const currentScrollY = window.pageYOffset;
        
        for (let i = sections.length - 1; i >= 0; i--) {
            const section = sections[i];
            const sectionTop = section.offsetTop - 100;
            
            if (sectionTop < currentScrollY) {
                section.scrollIntoView({ behavior: 'smooth' });
                break;
            }
        }
    }

    /**
     * Initialize performance monitoring
     */
    function initializePerformanceMonitoring() {
        // Monitor Core Web Vitals
        if ('web-vital' in window) {
            getCLS(console.log);
            getFID(console.log);
            getFCP(console.log);
            getLCP(console.log);
            getTTFB(console.log);
        }
        
        // Monitor page load time
        window.addEventListener('load', function() {
            const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
            trackEvent('page_load_time', { load_time: loadTime });
        });
    }

    /**
     * Initialize error handling
     */
    function initializeErrorHandling() {
        window.addEventListener('error', function(e) {
            console.error('JavaScript Error:', e.error);
            trackEvent('javascript_error', {
                message: e.message,
                filename: e.filename,
                lineno: e.lineno
            });
        });
        
        window.addEventListener('unhandledrejection', function(e) {
            console.error('Unhandled Promise Rejection:', e.reason);
            trackEvent('promise_rejection', { reason: e.reason });
        });
    }

    // Initialize view counter on load
    window.addEventListener('load', initializeViewCounter);
    
    // Expose utility functions globally
    window.VRBOStory = {
        showNotification: showNotification,
        trackEvent: trackEvent,
        animateCounter: animateCounter
    };

})();

// Additional utility functions
function debounce(func, wait, immediate) {
    let timeout;
    return function executedFunction() {
        const context = this;
        const args = arguments;
        const later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

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

// Service Worker registration for PWA capabilities
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js').then(function(registration) {
            console.log('ServiceWorker registration successful');
        }).catch(function(err) {
            console.log('ServiceWorker registration failed');
        });
    });
}
