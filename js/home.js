/**
 * ==============================================================
 * CREATIVO CREATES
 * Home Page Specific Scripts
 * ==============================================================
 */

document.addEventListener("DOMContentLoaded", () => {
    
    // Ensure GSAP is loaded before firing any homepage-specific animations
    if (typeof gsap !== 'undefined') {
        
        // Example: Homepage Hero Timeline
        // const homeTl = gsap.timeline();
        // homeTl.to('.hero-title', { ... });
        
        console.log("Home.js loaded and ready for Creativo animations.");

    } else {
        console.warn("GSAP is not loaded.");
    }

    // --------------------------------------------------------
    // 3D WIREFRAME STRUCTURAL SPHERE
    // --------------------------------------------------------
    const canvasContainer = document.getElementById('canvas-container');

    // Only run if the container exists, Three.js is loaded, and we are on a desktop screen
    if (canvasContainer && typeof THREE !== 'undefined' && window.innerWidth > 1024) {
        
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
        
        // alpha: true gives us a transparent background so the dark theme shows through
        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });

        // Setup rendering space
        renderer.setSize(500, 500);
        renderer.setPixelRatio(window.devicePixelRatio); // Keeps it sharp on high-res displays
        canvasContainer.appendChild(renderer.domElement);

        // Build the structure: an Icosahedron with detail level 1 creates a complex geometric mesh
        const geometry = new THREE.IcosahedronGeometry(2.5, 1);
        
        // Material settings
        const material = new THREE.MeshBasicMaterial({
            color: 0x1A5BFF, // Adjust this hex if your var(--blue) is different
            wireframe: true,
            transparent: true,
            opacity: 0.25 // Kept subtle so it adds atmosphere without distraction
        });

        const sphere = new THREE.Mesh(geometry, material);
        scene.add(sphere);

        // Pull the camera back so we can see the whole shape
        camera.position.z = 5;

        // Setup clock for smooth floating math
        const clock = new THREE.Clock();

        // The animation loop
        const animate = function () {
            requestAnimationFrame(animate);
            const elapsedTime = clock.getElapsedTime();

            // Continuous slow spin
            sphere.rotation.x += 0.001;
            sphere.rotation.y += 0.002;

            // Subtle vertical floating motion
            sphere.position.y = Math.sin(elapsedTime * 0.5) * 0.1;

            renderer.render(scene, camera);
        };

        animate();
    }
});