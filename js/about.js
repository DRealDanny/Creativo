/**
 * ==============================================================
 * CREATIVO CREATES
 * About Page Specific Scripts
 * ==============================================================
 */

document.addEventListener("DOMContentLoaded", () => {
    
    // Tools Mobile Accordion Logic
    const toolGroups = document.querySelectorAll('.tools-group');
    
    toolGroups.forEach(group => {
        const heading = group.querySelector('h4');
        
        if (heading) {
            heading.addEventListener('click', () => {
                // Only trigger on mobile
                if (window.innerWidth <= 768) {
                    const isOpen = group.classList.contains('open');
                    
                    // Close others
                    toolGroups.forEach(g => g.classList.remove('open'));
                    
                    // Open clicked
                    if (!isOpen) {
                        group.classList.add('open');
                    }
                }
            });
        }
    });

    // Ensure GSAP is loaded before firing any about-specific animations
    if (typeof gsap !== 'undefined') {
        console.log("About.js loaded and ready.");
    } else {
        console.warn("GSAP is not loaded.");
    }
});