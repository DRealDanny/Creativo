/**
 * ==============================================================
 * CREATIVO CREATES
 * Services Page Specific Scripts
 * ==============================================================
 */

document.addEventListener("DOMContentLoaded", () => {
    
    // Ensure GSAP is loaded before firing any specific animations
    if (typeof gsap !== 'undefined') {
        
        // Example: Staggered animation for service blocks
        // gsap.from('.service-block', { ... });
        
        console.log("Services.js loaded and ready.");

    } else {
        console.warn("GSAP is not loaded.");
    }
});