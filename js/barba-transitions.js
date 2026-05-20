// Initialize Barba.js
document.addEventListener("DOMContentLoaded", () => {
    // Wait for GSAP and Barba to load
    if (typeof barba === 'undefined') {
        console.warn("Barba is not loaded");
        return;
    }

    barba.init({

        transitions: [{
            name: 'curtain-transition',
            leave(data) {
                // GSAP animates curtain up (y: "0%") over 0.5s
                return gsap.to('.transition-curtain', {
                    y: "0%",
                    duration: 0.5,
                    ease: "power2.inOut"
                });
            },
            enter(data) {
                // Barba swaps DOM implicitly here since sync: true?
                // Actually sync: true will run leave and enter at the same time if not careful,
                // but if we wait for leave, we can just use async/await. Wait, sync: true in barba means leave and enter run concurrently.
                // The prompt says: "leave: GSAP animates curtain up (y: "0%") over 0.5s. enter: Barba swaps DOM. after: GSAP animates curtain off the top (y: "-100%") over 0.5s. Instantly reset to y: "100%"."
                // This means sync: false (default). leave finishes -> enter -> after finishes.
            },
            after(data) {
                // after: GSAP animates curtain off the top (y: "-100%") over 0.5s. Instantly reset to y: "100%".
                return gsap.to('.transition-curtain', {
                    y: "-100%",
                    duration: 0.5,
                    ease: "power2.inOut",
                    onComplete: () => {
                        gsap.set('.transition-curtain', { y: "100%" });
                    }
                });
            }
        }]
    });

    // DOM Sync: Use barba.hooks.beforeEnter and DOMParser to extract the new document.body.className and sync it.
    // Extract ALL <link rel="stylesheet"> tags from the next <head> and append any missing ones to the current <head>.
    barba.hooks.beforeEnter((data) => {
        const nextHtml = data.next.html;
        if (!nextHtml) return;

        const parser = new DOMParser();
        const nextDoc = parser.parseFromString(nextHtml, 'text/html');

        // Sync body class
        document.body.className = nextDoc.body.className;

        // Sync missing stylesheets
        const nextLinks = nextDoc.querySelectorAll('link[rel="stylesheet"]');
        const currentLinks = document.querySelectorAll('link[rel="stylesheet"]');
        const currentHrefs = Array.from(currentLinks).map(link => link.getAttribute('href'));

        nextLinks.forEach(link => {
            const href = link.getAttribute('href');
            if (!currentHrefs.includes(href)) {
                const newLink = document.createElement('link');
                newLink.rel = 'stylesheet';
                newLink.href = href;
                document.head.appendChild(newLink);
            }
        });
    });

    // State Reset (CRITICAL): In barba.hooks.after

    barba.hooks.leave((data) => {
        if (window.CreativoMain && window.CreativoMain.cleanupAll) {
            window.CreativoMain.cleanupAll();
        }
        if (window.CreativoAnim && window.CreativoAnim.cleanupAll) {
            window.CreativoAnim.cleanupAll();
        }
    });

    barba.hooks.after((data) => {
        // Close the mobile side canvas menu
        const navLinksWrap = document.querySelector('.nav-links-wrap');
        const navBackdrop = document.querySelector('.nav-backdrop');
        const mobileToggle = document.querySelector('.mobile-nav-toggle');

        if (navLinksWrap) navLinksWrap.classList.remove('open');
        if (navBackdrop) navBackdrop.classList.remove('open');
        if (mobileToggle) mobileToggle.classList.remove('open');
        document.body.style.overflow = ''; // reset body overflow if it was locked

        // Update active link states
        const currentPath = window.location.pathname;

        const allNavLinks = document.querySelectorAll('.nav-link, .mobile-link');
        allNavLinks.forEach(link => {
            link.classList.remove('active');
            // Check if link href matches current path. Account for root '/' vs '/index.html'
            const linkHref = link.getAttribute('href');
            if (linkHref === currentPath || (linkHref === '/' && currentPath === '/index.html') || (linkHref === '/index.html' && currentPath === '/')) {
                link.classList.add('active');
            } else if (currentPath.includes(linkHref) && linkHref !== '/' && linkHref !== '/index.html') {
                // Simple check for sub-pages, adjust if necessary
                link.classList.add('active');
            }
        });

        // Re-initialize scripts
        if (window.CreativoMain && window.CreativoMain.initAll) {
            window.CreativoMain.initAll();
        }
        if (window.CreativoAnim && window.CreativoAnim.initAll) {
            window.CreativoAnim.initAll();
        }
    });
});
