/**
 * Portfolio Website - Main JavaScript
 * Author: Bilal EL HAYANI
 * Description: Handles interactive features including navigation highlighting,
 *              smooth scrolling, and scroll animations
 */

(function() {
    'use strict';

    // Wait for DOM to be fully loaded
    document.addEventListener('DOMContentLoaded', function() {
        initNavigation();
        initScrollAnimations();
        initProjectCards();
    });

    /**
     * Initialize navigation active state based on scroll position
     */
    function initNavigation() {
        const navLinks = document.querySelectorAll('.navbar-links a');
        const sections = document.querySelectorAll('section[id], footer[id]');

        // Highlight active nav link on scroll
        function highlightNavigation() {
            let currentSection = '';
            const scrollPosition = window.scrollY + 100; // Offset for navbar height

            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;

                if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                    currentSection = section.getAttribute('id');
                }
            });

            navLinks.forEach(link => {
                link.classList.remove('active');
                const href = link.getAttribute('href');

                if (href && href.includes('#' + currentSection)) {
                    link.classList.add('active');
                }
            });
        }

        // Throttle scroll event for better performance
        let isScrolling = false;
        window.addEventListener('scroll', function() {
            if (!isScrolling) {
                window.requestAnimationFrame(function() {
                    highlightNavigation();
                    isScrolling = false;
                });
                isScrolling = true;
            }
        });

        // Initial call
        highlightNavigation();
    }

    /**
     * Initialize scroll animations for elements
     */
    function initScrollAnimations() {
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        };

        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);

        // Observe project cards and sections
        const animatedElements = document.querySelectorAll('.post, .section-title');
        animatedElements.forEach(element => {
            // Set initial state
            element.style.opacity = '0';
            element.style.transform = 'translateY(20px)';
            element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';

            observer.observe(element);
        });
    }

    /**
     * Add interactivity to project cards
     */
    function initProjectCards() {
        const projectCards = document.querySelectorAll('.project-card');

        projectCards.forEach(card => {
            // Add keyboard accessibility
            card.setAttribute('tabindex', '0');

            // Handle keyboard navigation
            card.addEventListener('keypress', function(e) {
                if (e.key === 'Enter' || e.key === ' ') {
                    const link = card.querySelector('.project-link');
                    if (link) {
                        link.click();
                    }
                }
            });
        });
    }

    /**
     * Add scroll-to-top functionality (optional - uncomment if needed)
     */
    /*
    function initScrollToTop() {
        // Create scroll-to-top button
        const scrollButton = document.createElement('button');
        scrollButton.innerHTML = '<i class="fas fa-arrow-up"></i>';
        scrollButton.className = 'scroll-to-top';
        scrollButton.setAttribute('aria-label', 'Scroll to top');
        document.body.appendChild(scrollButton);

        // Show/hide button based on scroll position
        window.addEventListener('scroll', function() {
            if (window.scrollY > 300) {
                scrollButton.classList.add('visible');
            } else {
                scrollButton.classList.remove('visible');
            }
        });

        // Scroll to top on click
        scrollButton.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    */

    /**
     * Enhanced smooth scrolling for internal links
     */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');

            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                e.preventDefault();

                const navbarHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetElement.offsetTop - navbarHeight - 20;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });

                // Update URL without jumping
                if (history.pushState) {
                    history.pushState(null, null, targetId);
                }
            }
        });
    });

    /**
     * Add loading state indicator
     */
    window.addEventListener('load', function() {
        document.body.classList.add('loaded');
    });

    /**
     * Handle external link security
     * Ensure all external links have proper security attributes
     */
    document.querySelectorAll('a[target="_blank"]').forEach(link => {
        if (!link.hasAttribute('rel')) {
            link.setAttribute('rel', 'noopener noreferrer');
        }
    });

    /**
     * Add copy email functionality (optional enhancement)
     */
    const emailLinks = document.querySelectorAll('a[href^="mailto:"]');
    emailLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const email = this.getAttribute('href').replace('mailto:', '');

            // Optional: Add toast notification or visual feedback
            console.log('Email link clicked:', email);
        });
    });

})();
