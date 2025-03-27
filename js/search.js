// Search functionality
document.addEventListener('DOMContentLoaded', function() {
    const searchForm = document.querySelector('.search-bar form');
    
    if (searchForm) {
        searchForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const searchTerm = this.querySelector('input').value.trim();
            const category = this.querySelector('select').value;
            
            if (searchTerm || category !== 'all') {
                // In a real implementation, this would redirect to search results
                console.log(`Searching for "${searchTerm}" in category ${category}`);
                alert(`Búsqueda realizada: "${searchTerm}" en categoría ${category}`);
            } else {
                alert('Por favor ingresa un término de búsqueda o selecciona una categoría.');
            }
        });
    }
    
    // Search suggestions (mock data)
    const searchInput = document.querySelector('.search-bar input');
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            // In a real implementation, this would fetch suggestions from an API
            if (this.value.length > 2) {
                console.log('Fetching suggestions for:', this.value);
            }
        });
    }
});
