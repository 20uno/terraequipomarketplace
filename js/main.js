// Main JavaScript File

document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle (would need to add HTML for mobile menu)
    const mobileMenuButton = document.createElement('button');
    mobileMenuButton.className = 'mobile-menu-button';
    mobileMenuButton.innerHTML = '<i class="fas fa-bars"></i>';
    document.querySelector('.header .container').appendChild(mobileMenuButton);
    
    mobileMenuButton.addEventListener('click', function() {
        document.querySelector('.main-nav').classList.toggle('active');
    });
    
    // Calculator functionality
    const calculateBtn = document.getElementById('calculate-btn');
    if (calculateBtn) {
        calculateBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Simple calculation for demo purposes
            const equipmentType = document.getElementById('equipment-type').value;
            const value = parseFloat(document.getElementById('value').value) || 0;
            const coverage = document.getElementById('coverage').value;
            
            // Calculate insurance cost (1-3% of equipment value based on coverage)
            let insuranceRate;
            switch(coverage) {
                case 'basic':
                    insuranceRate = 0.01;
                    break;
                case 'medium':
                    insuranceRate = 0.02;
                    break;
                case 'premium':
                    insuranceRate = 0.03;
                    break;
                default:
                    insuranceRate = 0.02;
            }
            
            const insuranceCost = value * insuranceRate;
            
            // Calculate shipping cost (random for demo)
            const shippingCost = Math.floor(Math.random() * 5000) + 2000;
            
            // Display results
            document.getElementById('insurance-cost').textContent = '$' + insuranceCost.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            document.getElementById('shipping-cost').textContent = '$' + shippingCost.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            document.getElementById('total-cost').textContent = '$' + (insuranceCost + shippingCost).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            
            document.getElementById('results').style.display = 'block';
        });
    }
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Form validation example
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            const inputs = this.querySelectorAll('input[required], select[required], textarea[required]');
            let isValid = true;
            
            inputs.forEach(input => {
                if (!input.value.trim()) {
                    input.style.borderColor = 'var(--danger-color)';
                    isValid = false;
                } else {
                    input.style.borderColor = '';
                }
            });
            
            if (!isValid) {
                e.preventDefault();
                alert('Por favor completa todos los campos requeridos.');
            }
        });
    });
});
