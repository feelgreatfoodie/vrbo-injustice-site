/**
 * Advanced animations and interactive effects for VRBO Story website
 */

(function() {
    'use strict';

    // Animation configuration
    const ANIMATION_CONFIG = {
        duration: {
            fast: 300,
            normal: 600,
            slow: 1000
        },
        easing: {
            ease: 'cubic-bezier(0.4, 0, 0.2, 1)',
            bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
            smooth: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
        },
        stagger: 100
    };

    // Initialize animations when DOM is ready
    document.addEventListener('DOMContentLoaded', function() {
        initializeScrollAnimations();
        initializeHoverEffects();
        initializeParticleBackground();
        initializeTimelineAnimations();
        initializeModalAnimations();
        initializeButtonEffects();
        initializeCounterAnimations();
        initializeTextAnimations();
    });

    /**
     * Initialize scroll-triggered animations
     */
    function initializeScrollAnimations() {
        const elements = document.querySelectorAll('[data-animate]');
        
        // Create intersection observer
        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    const element = entry.target;
                    const animationType = element.dataset.animate;
                    const delay = parseInt(element.dataset.delay) || 0;
                    
                    setTimeout(() => {
                        triggerAnimation(element, animationType);
                    }, delay);
                    
                    observer.unobserve(element);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });
        
        elements.forEach(element => observer.observe(element));
    }

    /**
     * Trigger specific animation on element
     */
    function triggerAnimation(element, animationType) {
        element.classList.add('animate-in');
        
        switch (animationType) {
            case 'fadeInUp':
                animateFadeInUp(element);
                break;
            case 'fadeInDown':
                animateFadeInDown(element);
                break;
            case 'fadeInLeft':
                animateFadeInLeft(element);
                break;
            case 'fadeInRight':
                animateFadeInRight(element);
                break;
                        case 'zoomIn':
                animateZoomIn(element);
                break;
            case 'slideInUp':
                animateSlideInUp(element);
                break;
            case 'rotateIn':
                animateRotateIn(element);
                break;
            case 'bounceIn':
                animateBounceIn(element);
                break;
            case 'flipIn':
                animateFlipIn(element);
                break;
            default:
                animateFadeInUp(element);
        }
    }

    /**
     * Fade in up animation
     */
    function animateFadeInUp(element) {
        element.style.transform = 'translateY(30px)';
        element.style.opacity = '0';
        element.style.transition = `all ${ANIMATION_CONFIG.duration.normal}ms ${ANIMATION_CONFIG.easing.ease}`;
        
        requestAnimationFrame(() => {
            element.style.transform = 'translateY(0)';
            element.style.opacity = '1';
        });
    }

    /**
     * Fade in down animation
     */
    function animateFadeInDown(element) {
        element.style.transform = 'translateY(-30px)';
        element.style.opacity = '0';
        element.style.transition = `all ${ANIMATION_CONFIG.duration.normal}ms ${ANIMATION_CONFIG.easing.ease}`;
        
        requestAnimationFrame(() => {
            element.style.transform = 'translateY(0)';
            element.style.opacity = '1';
        });
    }

    /**
     * Fade in left animation
     */
    function animateFadeInLeft(element) {
        element.style.transform = 'translateX(-30px)';
        element.style.opacity = '0';
        element.style.transition = `all ${ANIMATION_CONFIG.duration.normal}ms ${ANIMATION_CONFIG.easing.ease}`;
        
        requestAnimationFrame(() => {
            element.style.transform = 'translateX(0)';
            element.style.opacity = '1';
        });
    }

    /**
     * Fade in right animation
     */
    function animateFadeInRight(element) {
        element.style.transform = 'translateX(30px)';
        element.style.opacity = '0';
        element.style.transition = `all ${ANIMATION_CONFIG.duration.normal}ms ${ANIMATION_CONFIG.easing.ease}`;
        
        requestAnimationFrame(() => {
            element.style.transform = 'translateX(0)';
            element.style.opacity = '1';
        });
    }

    /**
     * Zoom in animation
     */
    function animateZoomIn(element) {
        element.style.transform = 'scale(0.8)';
        element.style.opacity = '0';
        element.style.transition = `all ${ANIMATION_CONFIG.duration.normal}ms ${ANIMATION_CONFIG.easing.bounce}`;
        
        requestAnimationFrame(() => {
            element.style.transform = 'scale(1)';
            element.style.opacity = '1';
        });
    }

    /**
     * Slide in up animation
     */
    function animateSlideInUp(element) {
        element.style.transform = 'translateY(100%)';
        element.style.transition = `transform ${ANIMATION_CONFIG.duration.slow}ms ${ANIMATION_CONFIG.easing.smooth}`;
        
        requestAnimationFrame(() => {
            element.style.transform = 'translateY(0)';
        });
    }

    /**
     * Rotate in animation
     */
    function animateRotateIn(element) {
        element.style.transform = 'rotate(-180deg) scale(0.5)';
        element.style.opacity = '0';
        element.style.transition = `all ${ANIMATION_CONFIG.duration.slow}ms ${ANIMATION_CONFIG.easing.bounce}`;
        
        requestAnimationFrame(() => {
            element.style.transform = 'rotate(0deg) scale(1)';
            element.style.opacity = '1';
        });
    }

    /**
     * Bounce in animation
     */
    function animateBounceIn(element) {
        element.style.transform = 'scale(0.3)';
        element.style.opacity = '0';
        element.style.transition = `all ${ANIMATION_CONFIG.duration.slow}ms ${ANIMATION_CONFIG.easing.bounce}`;
        
        requestAnimationFrame(() => {
            element.style.transform = 'scale(1)';
            element.style.opacity = '1';
        });
    }

    /**
     * Flip in animation
     */
    function animateFlipIn(element) {
        element.style.transform = 'perspective(400px) rotateY(90deg)';
        element.style.opacity = '0';
        element.style.transition = `all ${ANIMATION_CONFIG.duration.slow}ms ${ANIMATION_CONFIG.easing.smooth}`;
        
        requestAnimationFrame(() => {
            element.style.transform = 'perspective(400px) rotateY(0deg)';
            element.style.opacity = '1';
        });
    }

    /**
     * Initialize hover effects
     */
    function initializeHoverEffects() {
        // Card hover effects
        const cards = document.querySelectorAll('.story-card, .evidence-card, .community-card');
        
        cards.forEach(function(card) {
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-10px) scale(1.02)';
                this.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
                this.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.15)';
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) scale(1)';
                this.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.1)';
            });
        });

        // Button hover effects
        const buttons = document.querySelectorAll('.btn-primary, .btn-social');
        
        buttons.forEach(function(button) {
            button.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-2px)';
                this.style.transition = 'all 0.3s ease';
            });
            
            button.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0)';
            });
        });

        // Image hover effects
        const images = document.querySelectorAll('.evidence-image, .timeline-image');
        
        images.forEach(function(image) {
            image.addEventListener('mouseenter', function() {
                this.style.transform = 'scale(1.05)';
                this.style.transition = 'transform 0.3s ease';
            });
            
            image.addEventListener('mouseleave', function() {
                this.style.transform = 'scale(1)';
            });
        });
    }

    /**
     * Initialize particle background effect
     */
    function initializeParticleBackground() {
        const heroSection = document.querySelector('.hero-section');
        if (!heroSection) return;

        // Create canvas for particles
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        
        canvas.style.position = 'absolute';
        canvas.style.top = '0';
        canvas.style.left = '0';
        canvas.style.width = '100%';
        canvas.style.height = '100%';
        canvas.style.pointerEvents = 'none';
        canvas.style.zIndex = '1';
        
        heroSection.appendChild(canvas);

        // Particle system
        const particles = [];
        const particleCount = 50;

        function resizeCanvas() {
            canvas.width = heroSection.offsetWidth;
            canvas.height = heroSection.offsetHeight;
        }

        function createParticle() {
            return {
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                size: Math.random() * 2 + 1,
                opacity: Math.random() * 0.5 + 0.2
            };
        }

        function initParticles() {
            particles.length = 0;
            for (let i = 0; i < particleCount; i++) {
                particles.push(createParticle());
            }
        }

        function updateParticles() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            particles.forEach(function(particle) {
                particle.x += particle.vx;
                particle.y += particle.vy;
                
                // Wrap around edges
                if (particle.x < 0) particle.x = canvas.width;
                if (particle.x > canvas.width) particle.x = 0;
                if (particle.y < 0) particle.y = canvas.height;
                if (particle.y > canvas.height) particle.y = 0;
                
                // Draw particle
                ctx.beginPath();
                ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(255, 255, 255, ${particle.opacity})`;
                ctx.fill();
            });
            
            requestAnimationFrame(updateParticles);
        }

        // Initialize
        resizeCanvas();
        initParticles();
        updateParticles();

        // Handle resize
        window.addEventListener('resize', function() {
            resizeCanvas();
            initParticles();
        });
    }

    /**
     * Initialize timeline animations
     */
    function initializeTimelineAnimations() {
        const timelineItems = document.querySelectorAll('.timeline-item');
        
        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    const item = entry.target;
                    const icon = item.querySelector('.timeline-icon');
                    const content = item.querySelector('.timeline-content');
                    
                    // Animate icon
                    if (icon) {
                        setTimeout(() => {
                            icon.style.transform = 'scale(1)';
                            icon.style.transition = 'transform 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
                        }, 200);
                    }
                    
                    // Animate content
                    if (content) {
                        setTimeout(() => {
                            if (item.classList.contains('timeline-item:nth-child(odd)')) {
                                animateFadeInRight(content);
                            } else {
                                animateFadeInLeft(content);
                            }
                        }, 300);
                    }
                    
                    observer.unobserve(item);
                }
            });
        }, { threshold: 0.3 });
        
        timelineItems.forEach(item => observer.observe(item));
    }

    /**
     * Initialize modal animations
     */
    function initializeModalAnimations() {
        const modals = document.querySelectorAll('.modal');
        
        modals.forEach(function(modal) {
            modal.addEventListener('show.bs.modal', function() {
                const modalDialog = this.querySelector('.modal-dialog');
                modalDialog.style.transform = 'scale(0.8) translateY(-50px)';
                modalDialog.style.opacity = '0';
                modalDialog.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
                
                setTimeout(() => {
                    modalDialog.style.transform = 'scale(1) translateY(0)';
                    modalDialog.style.opacity = '1';
                }, 50);
            });
            
            modal.addEventListener('hide.bs.modal', function() {
                const modalDialog = this.querySelector('.modal-dialog');
                modalDialog.style.transform = 'scale(0.9) translateY(-20px)';
                modalDialog.style.opacity = '0';
            });
        });
    }

    /**
     * Initialize button click effects
     */
    function initializeButtonEffects() {
        const buttons = document.querySelectorAll('.btn');
        
        buttons.forEach(function(button) {
            button.addEventListener('click', function(e) {
                // Create ripple effect
                const ripple = document.createElement('span');
                const rect = this.getBoundingClientRect();
                const size = Math.max(rect.width, rect.height);
                const x = e.clientX - rect.left - size / 2;
                const y = e.clientY - rect.top - size / 2;
                
                ripple.style.cssText = `
                    position: absolute;
                    width: ${size}px;
                    height: ${size}px;
                    left: ${x}px;
                    top: ${y}px;
                    background: rgba(255, 255, 255, 0.4);
                    border-radius: 50%;
                    transform: scale(0);
                    animation: ripple 0.6s linear;
                    pointer-events: none;
                `;
                
                this.style.position = 'relative';
                this.style.overflow = 'hidden';
                this.appendChild(ripple);
                
                setTimeout(() => ripple.remove(), 600);
            });
        });
        
        // Add ripple keyframe animation
        if (!document.getElementById('ripple-animation')) {
            const style = document.createElement('style');
            style.id = 'ripple-animation';
            style.textContent = `
                @keyframes ripple {
                    to {
                        transform: scale(4);
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(style);
        }
    }

    /**
     * Initialize counter animations
     */
    function initializeCounterAnimations() {
        const counters = document.querySelectorAll('.stat-number');
        
        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    const counter = entry.target;
                    animateCounter(counter);
                    observer.unobserve(counter);
                }
            });
        });
        
        counters.forEach(counter => observer.observe(counter));
    }

    /**
     * Animate counter with easing
     */
    function animateCounter(element) {
        const target = parseInt(element.textContent.replace(/[^0-9]/g, '')) || 0;
        const duration = 2000;
        const startTime = performance.now();
        
        function updateCounter(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Easing function (ease-out-cubic)
            const easeOutCubic = 1 - Math.pow(1 - progress, 3);
            const currentValue = Math.floor(target * easeOutCubic);
            
            // Format number with commas or special formatting
            if (element.textContent.includes('$')) {
                element.textContent = '$' + currentValue.toLocaleString();
            } else if (element.textContent.includes('k')) {
                element.textContent = (currentValue / 1000).toFixed(1) + 'k';
            } else if (element.textContent.includes('+')) {
                element.textContent = currentValue.toLocaleString() + '+';
            } else {
                element.textContent = currentValue.toLocaleString();
            }
            
                        if (progress < 1) {
                requestAnimationFrame(updateCounter);
            }
        }
        
        requestAnimationFrame(updateCounter);
    }

    /**
     * Initialize text animations
     */
    function initializeTextAnimations() {
        const textElements = document.querySelectorAll('[data-text-animate]');
        
        textElements.forEach(function(element) {
            const observer = new IntersectionObserver(function(entries) {
                entries.forEach(function(entry) {
                    if (entry.isIntersecting) {
                        const animationType = element.dataset.textAnimate;
                        
                        switch (animationType) {
                            case 'typewriter':
                                animateTypewriter(element);
                                break;
                            case 'fadeInWords':
                                animateFadeInWords(element);
                                break;
                            case 'slideInWords':
                                animateSlideInWords(element);
                                break;
                            case 'highlight':
                                animateHighlight(element);
                                break;
                            default:
                                animateTypewriter(element);
                        }
                        
                        observer.unobserve(element);
                    }
                });
            }, { threshold: 0.5 });
            
            observer.observe(element);
        });
    }

    /**
     * Typewriter animation
     */
    function animateTypewriter(element) {
        const text = element.textContent;
        const speed = parseInt(element.dataset.speed) || 50;
        
        element.textContent = '';
        element.style.borderRight = '2px solid currentColor';
        
        let i = 0;
        const timer = setInterval(function() {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
            } else {
                clearInterval(timer);
                // Remove cursor after animation
                setTimeout(() => {
                    element.style.borderRight = 'none';
                }, 1000);
            }
        }, speed);
    }

    /**
     * Fade in words animation
     */
    function animateFadeInWords(element) {
        const text = element.textContent;
        const words = text.split(' ');
        
        element.innerHTML = words.map(word => 
            `<span class="word-animate" style="opacity: 0; transform: translateY(20px);">${word}</span>`
        ).join(' ');
        
        const wordElements = element.querySelectorAll('.word-animate');
        
        wordElements.forEach(function(word, index) {
            setTimeout(() => {
                word.style.transition = 'all 0.5s ease';
                word.style.opacity = '1';
                word.style.transform = 'translateY(0)';
            }, index * 100);
        });
    }

    /**
     * Slide in words animation
     */
    function animateSlideInWords(element) {
        const text = element.textContent;
        const words = text.split(' ');
        
        element.innerHTML = words.map(word => 
            `<span class="word-animate" style="opacity: 0; transform: translateX(-30px);">${word}</span>`
        ).join(' ');
        
        const wordElements = element.querySelectorAll('.word-animate');
        
        wordElements.forEach(function(word, index) {
            setTimeout(() => {
                word.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
                word.style.opacity = '1';
                word.style.transform = 'translateX(0)';
            }, index * 80);
        });
    }

    /**
     * Highlight animation
     */
    function animateHighlight(element) {
        const originalBg = window.getComputedStyle(element).backgroundColor;
        
        element.style.transition = 'background-color 0.3s ease';
        element.style.backgroundColor = '#fef3c7';
        
        setTimeout(() => {
            element.style.backgroundColor = originalBg;
        }, 1500);
    }

    /**
     * Initialize scroll-triggered parallax
     */
    function initializeParallax() {
        const parallaxElements = document.querySelectorAll('[data-parallax]');
        
        if (parallaxElements.length === 0) return;
        
        // Check for reduced motion preference
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            return;
        }
        
        const updateParallax = throttle(function() {
            const scrolled = window.pageYOffset;
            
            parallaxElements.forEach(function(element) {
                const speed = parseFloat(element.dataset.parallax) || 0.5;
                const yPos = -(scrolled * speed);
                element.style.transform = `translateY(${yPos}px)`;
            });
        }, 16); // ~60fps
        
        window.addEventListener('scroll', updateParallax);
    }

    /**
     * Initialize magnetic effect for buttons
     */
    function initializeMagneticEffect() {
        const magneticElements = document.querySelectorAll('[data-magnetic]');
        
        magneticElements.forEach(function(element) {
            element.addEventListener('mousemove', function(e) {
                const rect = this.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                
                const strength = parseFloat(this.dataset.magnetic) || 0.3;
                
                this.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
                this.style.transition = 'transform 0.1s ease';
            });
            
            element.addEventListener('mouseleave', function() {
                this.style.transform = 'translate(0, 0)';
                this.style.transition = 'transform 0.3s ease';
            });
        });
    }

    /**
     * Initialize floating animation
     */
    function initializeFloatingAnimation() {
        const floatingElements = document.querySelectorAll('[data-float]');
        
        floatingElements.forEach(function(element, index) {
            const duration = parseInt(element.dataset.float) || 3000;
            const delay = index * 200;
            
            element.style.animation = `float ${duration}ms ease-in-out ${delay}ms infinite alternate`;
        });
        
        // Add floating keyframe if not exists
        if (!document.getElementById('float-animation')) {
            const style = document.createElement('style');
            style.id = 'float-animation';
            style.textContent = `
                @keyframes float {
                    from {
                        transform: translateY(0px);
                    }
                    to {
                        transform: translateY(-10px);
                    }
                }
            `;
            document.head.appendChild(style);
        }
    }

    /**
     * Initialize morphing SVG animations
     */
    function initializeSVGMorphing() {
        const morphingElements = document.querySelectorAll('[data-morph]');
        
        morphingElements.forEach(function(element) {
            const targetPath = element.dataset.morph;
            const originalPath = element.getAttribute('d');
            
            element.addEventListener('mouseenter', function() {
                this.style.transition = 'd 0.3s ease';
                this.setAttribute('d', targetPath);
            });
            
            element.addEventListener('mouseleave', function() {
                this.setAttribute('d', originalPath);
            });
        });
    }

    /**
     * Initialize 3D tilt effect
     */
    function initialize3DTilt() {
        const tiltElements = document.querySelectorAll('[data-tilt]');
        
        tiltElements.forEach(function(element) {
            element.addEventListener('mousemove', function(e) {
                const rect = this.getBoundingClientRect();
                const centerX = rect.left + rect.width / 2;
                const centerY = rect.top + rect.height / 2;
                
                const deltaX = (e.clientX - centerX) / (rect.width / 2);
                const deltaY = (e.clientY - centerY) / (rect.height / 2);
                
                const intensity = parseFloat(this.dataset.tilt) || 15;
                
                const rotateX = deltaY * intensity;
                const rotateY = deltaX * intensity;
                
                this.style.transform = `perspective(1000px) rotateX(${-rotateX}deg) rotateY(${rotateY}deg)`;
                this.style.transition = 'transform 0.1s ease';
            });
            
            element.addEventListener('mouseleave', function() {
                this.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
                this.style.transition = 'transform 0.3s ease';
            });
        });
    }

    /**
     * Initialize intersection observer for lazy animations
     */
    function initializeLazyAnimations() {
        const lazyElements = document.querySelectorAll('[data-lazy-animate]');
        
        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    const element = entry.target;
                    const animationClass = element.dataset.lazyAnimate;
                    
                    element.classList.add(animationClass);
                    observer.unobserve(element);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -10% 0px'
        });
        
        lazyElements.forEach(element => observer.observe(element));
    }

    /**
     * Initialize performance-aware animations
     */
    function initializePerformanceAwareAnimations() {
        // Reduce animations on low-end devices
        const isLowEndDevice = navigator.hardwareConcurrency <= 2 || 
                              navigator.deviceMemory <= 2;
        
        if (isLowEndDevice) {
            document.documentElement.classList.add('reduced-animations');
        }
        
        // Pause animations when tab is not visible
        document.addEventListener('visibilitychange', function() {
            const animatedElements = document.querySelectorAll('[style*="animation"]');
            
            if (document.hidden) {
                animatedElements.forEach(el => {
                    el.style.animationPlayState = 'paused';
                });
            } else {
                animatedElements.forEach(el => {
                    el.style.animationPlayState = 'running';
                });
            }
        });
    }

    /**
     * Throttle function for performance
     */
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

    // Initialize additional animations
    window.addEventListener('load', function() {
        initializeParallax();
        initializeMagneticEffect();
        initializeFloatingAnimation();
        initializeSVGMorphing();
        initialize3DTilt();
        initializeLazyAnimations();
        initializePerformanceAwareAnimations();
    });

    // Expose animation functions globally
    window.VRBOAnimations = {
        triggerAnimation: triggerAnimation,
        animateCounter: animateCounter,
        animateTypewriter: animateTypewriter,
        animateFadeInWords: animateFadeInWords
    };

})();

// Intersection Observer polyfill for older browsers
(function() {
    if ('IntersectionObserver' in window) return;
    
    // Simple polyfill fallback
    window.IntersectionObserver = function(callback) {
        return {
            observe: function(element) {
                // Trigger immediately for fallback
                setTimeout(() => {
                    callback([{ isIntersecting: true, target: element }]);
                }, 100);
            },
            unobserve: function() {},
            disconnect: function() {}
        };
    };
})();
