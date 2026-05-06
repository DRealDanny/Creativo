/**
 * ==============================================================
 * CREATIVO CREATES
 * Work Page Specific Scripts
 * ==============================================================
 */

document.addEventListener("DOMContentLoaded", () => {
    
    // Setup for future portfolio filtering logic
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectItems = document.querySelectorAll('.project-item');

    if (filterBtns.length > 0 && projectItems.length > 0) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Remove active class from all buttons
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                // Filter logic would go here
                const filterValue = btn.getAttribute('data-filter');
                console.log(`Filtering portfolio by: ${filterValue}`);
            });
        });
    }

    // Ensure GSAP is loaded for animations
    if (typeof gsap !== 'undefined') {
        console.log("Work.js loaded and ready for animations.");
    } else {
        console.warn("GSAP is not loaded.");
    }
});