// BARBA TRANSITIONS AND INITIAL LOADER

document.addEventListener("DOMContentLoaded", () => {
    // INITIAL LOADER
    const loader = document.getElementById('gsap-loader');
    if (loader) {
        if (!sessionStorage.getItem('loaderHasRun')) {
            window.addEventListener('load', () => {
                const letters = loader.querySelectorAll('.loader-text span:not(.loader-dot)');
                const dot = loader.querySelector('.loader-dot');

                const tl = gsap.timeline({
                    onComplete: () => {
                        loader.style.display = 'none';
                        sessionStorage.setItem('loaderHasRun', 'true');
                    }
                });

                // GSAP stagger-rises the "CREATIVO" letters from a clip path
                tl.fromTo(letters,
                    { y: "100%" },
                    { y: "0%", duration: 0.6, stagger: 0.05, ease: "power3.out" }
                )
                // The dot animates in blue #2060FF
                .fromTo(dot,
                    { opacity: 0, scale: 0 },
                    { opacity: 1, scale: 1, color: "#2060FF", duration: 0.4, ease: "back.out(1.7)" },
                    "-=0.2"
                )
                // Pause, then GSAP slides the entire loader up
                .to(loader,
                    { y: "-100%", duration: 0.8, ease: "power3.inOut", delay: 0.4 }
                );
            });
        } else {
            loader.style.display = 'none';
        }
    }


    barba.hooks.beforeEnter((data) => {
        // 1. Parse the incoming HTML string
        const nextHtml = data.next.html;
        const parser = new DOMParser();
        const nextDoc = parser.parseFromString(nextHtml, 'text/html');

        // 2. Sync Body Classes (Crucial for page-specific layouts)
        document.body.className = nextDoc.body.className;

        // 3. Sync Head Stylesheets (Crucial for page-specific CSS)
        const currentHead = document.head;
        const nextHead = nextDoc.head;

        const nextLinks = Array.from(nextHead.querySelectorAll('link[rel="stylesheet"]'));
        nextLinks.forEach(link => {
            // If the new stylesheet isn't in the current head, append it
            if (!currentHead.querySelector(`link[href="${link.getAttribute('href')}"]`)) {
                const newLink = document.createElement('link');
                newLink.rel = 'stylesheet';
                newLink.href = link.getAttribute('href');
                currentHead.appendChild(newLink);
            }
        });
    });

    // BARBA INIT
    barba.init({
        prevent: ({ el }) => {
            // Add an exclusion rule to ignore /backend-admin (or any links that should trigger a hard refresh)
            const href = el.getAttribute('href');
            if (href && href.includes('/backend-admin')) {
                return true;
            }
            return false;
        },
        transitions: [{
            name: 'curtain-transition',
            leave(data) {
                // leave: Clean up! Call the ScrollTrigger kill and Three.js cleanup functions.
                if (window.CreativoAnim && window.CreativoAnim.cleanupAll) {
                    window.CreativoAnim.cleanupAll();
                }

                // Then, GSAP animates the blue curtain up (y: "0%") to cover the screen. Return the GSAP promise.
                return gsap.to('.transition-curtain', {
                    y: "0%",
                    duration: 0.6,
                    ease: "power3.inOut"
                });
            },
            enter(data) {
                // enter: Barba swaps the DOM behind the blue curtain. GSAP animates the blue curtain off the top (y: "-100%").
                return gsap.to('.transition-curtain', {
                    y: "-100%",
                    duration: 0.6,
                    ease: "power3.inOut",
                    delay: 0.1
                });
            },
            after(data) {
                // after: Instantly reset the curtain (y: "100%").
                gsap.set('.transition-curtain', { y: "100%" });

                // Re-call all main.js and animation.js init functions for the newly loaded page.
                if (window.CreativoMain && window.CreativoMain.initAll) {
                    window.CreativoMain.initAll();
                }
                if (window.CreativoAnim && window.CreativoAnim.initAll) {
                    window.CreativoAnim.initAll();
                }
            }
        }]
    });
});
