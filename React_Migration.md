📋 REACT MIGRATION PROTOCOL

Role: Principal React Engineer & Migration Specialist

Task: Execute a flawless HTML to React SPA migration inside a new frontend directory. Resolve previous Vite/GSAP environment conflicts, enforce strict JSX rules, ensure 100% CSS preservation (including media queries), and establish SPA routing.

CRITICAL RULES & BOUNDARIES:

DIRECTORY: Create a new frontend folder. All React code and configurations (package.json, vite.config.js, src, etc.) must be generated inside this folder.

THREE.JS: Completely strip out and remove any Three.js scripts, canvases, or dependencies from this migration.

ICONS: Keep the standard HTML Remix Icons setup via CDN in the public index.html. Do NOT install or use a React-specific icon library.

PHASE 1: COMPONENT & PAGE ARCHITECTURE

Components: Extract ONLY the universal Header and Footer into frontend/src/components/.

Pages: Convert all existing HTML pages into functional components in frontend/src/pages/.

JSX Strictness (CRITICAL): You MUST rigorously convert ALL class= to className=, for= to htmlFor=, and ensure all self-closing tags (<img />, <hr />, <input />, <br />) are properly formatted to prevent console errors. Fix any empty src="" attributes.

PHASE 2: 100% CSS PRESERVATION & RESPONSIVENESS

Move ALL existing CSS files into frontend/src/assets/css/.

CRITICAL FIX: You must explicitly import every single stylesheet needed for the layout to work, including mobile-res.css and tablet-res.css. Import these globally in App.jsx or main.jsx ensuring the exact original loading order (base styles first, then responsive overrides) so the layout does not break on smaller screens.

PHASE 3: GSAP, JS LOGIC & SPA ROUTING (react-router-dom)

Install react-router-dom and set up standard SPA routing in App.jsx.

Update the <Header> to use <NavLink> or <Link> instead of standard <a> tags.

The GSAP Fix (CRITICAL): Do NOT use CDN scripts for GSAP in Vite; it causes a Window scope error. Instead, run npm install gsap.

Import standard GSAP (import gsap from 'gsap') into the necessary components. Run the exact existing vanilla JavaScript logic for the custom cursor, curtain transition, and page reveal animations inside React useEffect hooks so they execute safely after the component has mounted.

PHASE 4: THE SAFETY FALLBACK

Failsafe: To prevent a blank screen if JS/GSAP fails to fire on route change, implement a CSS fallback. Add a standard CSS rule (e.g., .no-js .content { opacity: 1 !important; visibility: visible !important; } or a React useEffect timeout) that guarantees the main page content will be visible to the user even if the GSAP reveal animations encounter an error.

PHASE 5: SETUP DOCUMENTATION

Create a SETUP.md file in the root directory explaining how to run the frontend via cd frontend, npm install, and npm run dev.

Review your JSX for class attributes, verify the responsive CSS is imported, and open the Draft PR.