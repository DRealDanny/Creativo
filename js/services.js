/**
 * ==============================================================
 * CREATIVO CREATES
 * Services Page Specific Scripts
 * ==============================================================
 */

document.addEventListener("DOMContentLoaded", () => {
    
    // Deliverables Mobile Accordion Logic
    const deliverableGroups = document.querySelectorAll('.service-deliverables');
    
    deliverableGroups.forEach(group => {
        const heading = group.querySelector('h5');
        
        if (heading) {
            heading.addEventListener('click', () => {
                // Only trigger on mobile screens (768px or smaller)
                if (window.innerWidth <= 768) {
                    const isOpen = group.classList.contains('open');
                    
                    // Close other accordions when one is clicked
                    deliverableGroups.forEach(g => g.classList.remove('open'));
                    
                    // Open the clicked one
                    if (!isOpen) {
                        group.classList.add('open');
                    }
                }
            });
        }
    });

    // Ensure GSAP is loaded before firing any specific animations
    if (typeof gsap !== 'undefined') {
        
        // Example: Staggered animation for service blocks
        // gsap.from('.service-block', { ... });
        
        console.log("Services.js loaded and ready.");

    } else {
        console.warn("GSAP is not loaded.");
    }
});