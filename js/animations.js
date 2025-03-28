/**
 * Terraequipo Animations
 * Handles all animations and transitions on the website
 */

class ScrollAnimator {
    constructor() {
        this.animateElements = document.querySelectorAll('[data-animate]');
        this.intersectionObserver = null;
        this.init();
    }
    
    init() {
        if ('IntersectionObserver' in window) {
            this.setupIntersectionObserver();
        } else {
            this.fallbackAnimation();
        }
    }
    
    setupIntersectionObserver() {
        this.intersectionObserver = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        this.animateElement(entry.target);
                        this.intersectionObserver.unobserve(entry.target);
                    }
                });
            },
            {
               
