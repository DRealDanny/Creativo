/**
 * ==============================================================
 * CREATIVO CREATES
 * About Page Specific Scripts
 * ==============================================================
 */

document.addEventListener("DOMContentLoaded", () => {
    
    // Ensure GSAP is loaded before firing any about-specific animations
    if (typeof gsap !== 'undefined') {
        
        // Example: About page specific entrance animations
        // const aboutTl = gsap.timeline();
        // aboutTl.to('.about-hero h1', { ... });
        
        console.log("About.js loaded and ready.");

    } else {
        console.warn("GSAP is not loaded.");
    }
});