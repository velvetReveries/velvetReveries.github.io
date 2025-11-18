// Load the navigation bar into the page
document.addEventListener('DOMContentLoaded', function() {
    // Get the navbar container element
    const navbarContainer = document.getElementById('navbar-container');
    
    if (navbarContainer) {
        // Fetch the navbar HTML file
        fetch('navbar.html')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to load navbar');
                }
                return response.text();
            })
            .then(data => {
                // Insert the navbar HTML into the container
                navbarContainer.innerHTML = data;
            })
            .catch(error => {
                console.error('Error loading navbar:', error);
            });
    }
});
