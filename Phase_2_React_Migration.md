📋 PHASE 2: STATIC REACT MIGRATION

Role: Principal React Engineer

Task: Migrate a clean, static HTML/CSS codebase from the Reference folder into a React SPA inside a new frontend directory in the root.

CRITICAL BOUNDARIES & ZERO-HALLUCINATION PROTOCOL:

NO PLACEHOLDERS: You MUST strictly copy the exact text, structure, and inner HTML from the Reference pages. Do NOT hallucinate content, and do NOT use placeholder images.

ASSETS: Move the Reference/assets folder into frontend/public/assets. Leave all image paths in the code exactly as they are (e.g., src="assets/img.jpg").

NO MICRO-COMPONENTS: Keep the architecture monolithic. Do NOT extract buttons, cards, or sections into separate files. It must be strictly one file per page (e.g., About.jsx contains the whole About page).

NO ANIMATIONS: Do NOT add GSAP or transitions. Keep it 100% static. Do NOT copy the old main.js file.

1. JSX STRICTNESS PROTOCOL

Convert Vite setup using standard JavaScript (--template react). No TypeScript.

Vigorously convert ALL class= to className=, for= to htmlFor=, and fix self-closing tags.

2. LAYOUT & ROUTING (frontend/src/)

Use react-router-dom v6 (<BrowserRouter>, <Routes>, <Route>) in App.jsx.

Extract Header.jsx and Footer.jsx into frontend/src/components/.

Wrap all 8 pages in a single global layout using this Header and Footer.

3. REACT STATE CONVERSIONS

You MUST convert the following vanilla JS logic into proper React State (useState/useEffect):

Header: Add a scroll listener for the active/scrolled Navbar class. Use useState for the Mobile Menu toggle. Replace <a> with <NavLink>.

Showreel Modal: Use useState to open/close the video modal. CRITICAL: Ensure the iframe/video resets when closed so audio stops playing.

Work Page (Work.jsx): Convert the Filter Dropdown logic into React state.

About Page (About.jsx): Convert the Tools Tabs (Desktop) and Tools Accordion (Mobile) into React state.

4. CSS PRESERVATION

Move ALL CSS files into frontend/src/assets/css/.

Explicitly import every single stylesheet (including mobile-res.css and tablet-res.css) globally in App.jsx in the exact original loading order.

Open a Draft PR once the SPA compiles with zero errors and matches the original HTML perfectly.