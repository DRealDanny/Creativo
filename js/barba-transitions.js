// Initialize Barba.js
document.addEventListener("DOMContentLoaded", () => {
    // Wait for GSAP and Barba to load
    if (typeof barba === 'undefined') {
        console.warn("Barba is not loaded");
        return;
    }

    barba.init({
        sync: true, // Run leave and enter concurrently if needed, but rely on await
        transitions: [{
            name: 'curtain-transition',

            // 1. LEAVE: Bring the curtain down
            async leave(data) {
                // Cleanup before transition
                if (window.CreativoMain && window.CreativoMain.cleanupAll) {
                    window.CreativoMain.cleanupAll();
                }
                if (window.CreativoAnim && window.CreativoAnim.cleanupAll) {
                    window.CreativoAnim.cleanupAll();
                }

                // Animate blue curtain up to cover the screen
                await gsap.to('.transition-curtain', {
                    y: '0%',
                    duration: 0.5,
                    ease: 'power3.inOut'
                });
                // At this point, the screen is entirely blue.
            },

            // 2. ENTER: The screen is covered. Swap states instantly.
            enter(data) {
                // A. INSTANT SCROLL RESET (User cannot see this happen)
                window.scrollTo(0, 0);

                // B. DOM PARSER: Sync Body Classes
                const parser = new DOMParser();
                const nextDoc = parser.parseFromString(data.next.html, 'text/html');
                document.body.className = nextDoc.body.className;

                // C. HEAD SYNC: Forcefully update stylesheets
                const currentHead = document.head;
                const nextHead = nextDoc.head;

                // Remove old stylesheets that aren't global
                const nextLinks = Array.from(nextHead.querySelectorAll('link[rel="stylesheet"]'));
                const currentLinks = Array.from(currentHead.querySelectorAll('link[rel="stylesheet"]'));
                const nextHrefs = nextLinks.map(link => link.getAttribute('href'));

                currentLinks.forEach(link => {
                    const href = link.getAttribute('href');
                    if (!nextHrefs.includes(href)) {
                        link.remove();
                    }
                });

                // Append new stylesheets from the incoming page
                nextLinks.forEach(link => {
                    const href = link.getAttribute('href');
                    if (!currentHead.querySelector(`link[href="${href}"]`)) {
                        const newLink = document.createElement('link');
                        newLink.rel = 'stylesheet';
                        newLink.href = href;
                        currentHead.appendChild(newLink);
                    }
                });

                // D. FORCE CLOSE MOBILE MENU
                const menu = document.querySelector('.mobile-menu');
                const backdrop = document.querySelector('.nav-backdrop');

                if (menu) menu.classList.remove('open');
                if (backdrop) backdrop.classList.remove('visible');
                document.body.style.overflow = ''; // reset body overflow if it was locked

                // E. UPDATE ACTIVE LINKS
                const currentPath = window.location.pathname;
                const allNavLinks = document.querySelectorAll('.nav-link, .mobile-link, .footer-nav-link');

                allNavLinks.forEach(link => {
                    link.classList.remove('active');
                    const linkHref = link.getAttribute('href');
                    if (!linkHref) return;

                    const hrefBase = linkHref.replace('.html', '').replace(/^\//, '');
                    const pathBase = currentPath.replace('.html', '').replace(/^\//, '') || 'index';

                    // If root index
                    if ((hrefBase === 'index' || hrefBase === '') && (pathBase === 'index' || pathBase === '')) {
                        link.classList.add('active');
                    } else if (hrefBase === 'work' && pathBase.startsWith('case-study')) {
                        link.classList.add('active');
                    } else if (hrefBase && pathBase.includes(hrefBase) && hrefBase !== 'index') {
                        link.classList.add('active');
                    }
                });
            },

            // 3. AFTER: Reveal the fixed page
            async after(data) {
                // Re-initialize scripts here
                if (window.CreativoMain && window.CreativoMain.initAll) {
                    window.CreativoMain.initAll();
                }
                if (window.CreativoAnim && window.CreativoAnim.initAll) {
                    window.CreativoAnim.initAll();
                }

                // Animate blue curtain off the top of the screen
                await gsap.to('.transition-curtain', {
                    y: '-100%',
                    duration: 0.5,
                    ease: 'power3.inOut'
                });

                // Instantly reset curtain to the bottom for the next transition
                gsap.set('.transition-curtain', { y: '100%' });
            }
        }]
    });
});
