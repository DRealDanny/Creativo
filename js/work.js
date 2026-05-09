/**
 * ==============================================================
 * CREATIVO CREATES
 * Work Page Specific Scripts
 * ==============================================================
 */

document.addEventListener("DOMContentLoaded", () => {
    
    // --------------------------------------------------------
    // CUSTOM DROPDOWN FILTER LOGIC
    // --------------------------------------------------------
    const dropdown = document.getElementById('work-filter');
    
    if (dropdown) {
        const trigger = dropdown.querySelector('.dropdown-trigger');
        const selectedText = dropdown.querySelector('.dropdown-selected');
        const items = dropdown.querySelectorAll('.dropdown-item');
        const projects = document.querySelectorAll('.project-item');

        // 1. Toggle dropdown open/close when clicking the trigger
        trigger.addEventListener('click', (e) => {
            e.stopPropagation(); // Prevents click from bubbling to the document
            dropdown.classList.toggle('open');
            trigger.setAttribute('aria-expanded', dropdown.classList.contains('open'));
        });

        // 2. Close dropdown if clicking anywhere else on the page
        document.addEventListener('click', () => {
            dropdown.classList.remove('open');
            trigger.setAttribute('aria-expanded', 'false');
        });

        // 3. Handle selecting an item
        items.forEach(item => {
            item.addEventListener('click', (e) => {
                e.stopPropagation();
                
                // Update active state in menu
                items.forEach(i => i.classList.remove('active'));
                item.classList.add('active');

                // Update the text shown on the trigger button
                selectedText.textContent = item.textContent;

                // Close the dropdown
                dropdown.classList.remove('open');
                trigger.setAttribute('aria-expanded', 'false');

                // 4. Actually filter the projects grid
                const filterValue = item.getAttribute('data-filter');
                
                projects.forEach(project => {
                    // Check if project category matches the selected filter
                    if (filterValue === 'all' || project.getAttribute('data-category') === filterValue) {
                        project.style.display = 'block'; 
                        
                        // If GSAP is loaded, add a smooth reveal animation
                        if (typeof gsap !== 'undefined') {
                            gsap.fromTo(project, 
                                { opacity: 0, y: 20 }, 
                                { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }
                            );
                        }
                    } else {
                        // Hide projects that don't match
                        project.style.display = 'none';
                    }
                });
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