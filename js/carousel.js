/**
 * Terraequipo Carousel Component
 * Handles all carousel functionality on the website
 */

class Carousel {
    constructor(container) {
        this.container = container;
        this.items = Array.from(container.querySelectorAll('.carousel-item'));
        this.prevBtn = container.parentElement.querySelector('.carousel-prev');
        this.nextBtn = container.parentElement.querySelector('.carousel-next');
        this.currentIndex = 0;
        this.autoScrollInterval = null;
        
        this.init();
    }
    
    init() {
        if (!this.items.length) return;
        
        // Set initial active item
        this.updateActiveItem();
        
        // Set up event listeners
        if (this.prevBtn) {
            this.prevBtn.addEventListener('click', () => this.prev());
        }
        
        if (this.nextBtn) {
            this.nextBtn.addEventListener('click', () => this.next());
        }
        
        // Set up auto-scroll if enabled
        if (this.container.hasAttribute('data-autoscroll')) {
            this.startAutoScroll();
            
            // Pause auto-scroll on hover
            this.container.addEventListener('mouseenter', () => this.stopAutoScroll());
            this.container.addEventListener('mouseleave', () => this.startAutoScroll());
        }
        
        // Handle swipe events for touch devices
        this.setupTouchEvents();
    }
    
    prev() {
        this.currentIndex = (this.currentIndex - 1 + this.items.length) % this.items.length;
        this.updateActiveItem();
    }
    
    next() {
        this.currentIndex = (this.currentIndex + 1) % this.items.length;
        this.updateActiveItem();
    }
    
    goTo(index) {
        if (index >= 0 && index < this.items.length) {
            this.currentIndex = index;
            this.updateActiveItem();
        }
    }
    
    updateActiveItem() {
        const itemWidth = this.items[0].offsetWidth;
        const gap = parseInt(getComputedStyle(this.container).gap) || 0;
        const scrollPosition = this.currentIndex * (itemWidth + gap);
        
        this.container.scrollTo({
            left: scrollPosition,
            behavior: 'smooth'
        });
        
        // Update button states
        if (this.prevBtn) {
            this.prevBtn.disabled = this.currentIndex === 0;
        }
        
        if (this.nextBtn) {
            this.nextBtn.disabled = this.currentIndex === this.items.length - 1;
        }
        
        // Update indicators if they exist
        this.updateIndicators();
    }
    
    startAutoScroll() {
        if (this.autoScrollInterval) return;
        
        const interval = parseInt(this.container.getAttribute('data-interval')) || 5000;
        
        this.autoScrollInterval = setInterval(() => {
            this.next();
        }, interval);
    }
    
    stopAutoScroll() {
        if (this.autoScrollInterval) {
            clearInterval(this.autoScrollInterval);
            this.autoScrollInterval = null;
        }
    }
    
    updateIndicators() {
        const indicators = this.container.parentElement.querySelectorAll('.carousel-indicator');
        if (indicators.length) {
            indicators.forEach((indicator, index) => {
                indicator.classList.toggle('active', index === this.currentIndex);
            });
        }
    }
    
    setupTouchEvents() {
        let touchStartX = 0;
        let touchEndX = 0;
        
        this.container.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });
        
        this.container.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            this.handleSwipe();
        }, { passive: true });
    }
    
    handleSwipe() {
        const threshold = 50;
        
        if (touchEndX < touchStartX - threshold) {
            this.next();
        } else if (touchEndX > touchStartX + threshold) {
            this.prev();
        }
    }
}

// Initialize all carousels on the page
document.addEventListener('DOMContentLoaded', function() {
    const carousels = document.querySelectorAll('.carousel-container');
    carousels.forEach(container => {
        new Carousel(container);
    });
});
