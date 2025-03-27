// Carousel functionality
document.addEventListener('DOMContentLoaded', function() {
    const carousels = document.querySelectorAll('.carousel-container');
    
    carousels.forEach(carousel => {
        const prevBtn = carousel.parentElement.querySelector('.prev');
        const nextBtn = carousel.parentElement.querySelector('.next');
        
        if (prevBtn && nextBtn) {
            const itemWidth = carousel.querySelector('.equipment-card, .testimonial-card').offsetWidth;
            const gap = 20; // Gap between items in pixels
            
            prevBtn.addEventListener('click', function() {
                carousel.scrollBy({
                    left: -(itemWidth + gap),
                    behavior: 'smooth'
                });
            });
            
            nextBtn.addEventListener('click', function() {
                carousel.scrollBy({
                    left: itemWidth + gap,
                    behavior: 'smooth'
                });
            });
        }
    });
    
    // Auto-scroll for testimonials
    const testimonialCarousel = document.querySelector('.testimonial-carousel');
    if (testimonialCarousel) {
        setInterval(() => {
            const firstItem = testimonialCarousel.querySelector('.testimonial-card');
            if (firstItem) {
                const itemWidth = firstItem.offsetWidth + 30; // Including gap
                
                testimonialCarousel.scrollBy({
                    left: itemWidth,
                    behavior: 'smooth'
                });
                
                // Check if we've reached the end
                if (testimonialCarousel.scrollLeft + testimonialCarousel.offsetWidth >= 
                    testimonialCarousel.scrollWidth - 100) {
                    // Wait for scroll to finish then reset
                    setTimeout(() => {
                        testimonialCarousel.scrollTo({
                            left: 0,
                            behavior: 'auto'
                        });
                    }, 1000);
                }
            }
        }, 5000);
    }
});
