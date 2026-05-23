📋 PHASE 2: STATIC REACT MIGRATION

Role: Principal React Engineer

Task: Migrate a perfectly clean, static HTML/CSS codebase located in the Reference folder into a React SPA inside a brand new frontend directory in the root.

CRITICAL BOUNDARIES:

DIRECTORY AWARENESS: Read all HTML/CSS from the Reference folder. Create a frontend folder in the root and initialize Vite (React) inside it.

NO ANIMATIONS: Do NOT add any GSAP, Framer Motion, or complex transitions. Keep it 100% static. Do NOT copy the old main.js file into the React build.

1. JSX STRICTNESS PROTOCOL

Vigorously convert ALL class= to className=. Convert for= to htmlFor=.

Ensure all self-closing HTML tags (<img />, <hr />, <input />, <br />) are properly formatted.

2. COMPONENT EXTRACTION & REACT STATE (frontend/src/components/)

Extract the universal HTML Header and Footer into Header.jsx and Footer.jsx. You MUST convert the following vanilla JS logic into React State (useState/useEffect):

Navbar Scroll State: Add a useEffect listener to track window scroll and apply the appropriate active/scrolled CSS class to the Header.

Mobile Menu: Use useState to toggle the mobile menu open/close classes.

Active Links: Replace standard <a> tags with react-router-dom <NavLink> to automatically handle active route classes.

Scroll To Top: Implement the Scroll-To-Top button logic either as a standalone component or globally within App.jsx.

3. PAGE REPLICATION & INTERACTIVE UI (frontend/src/pages/)

Convert all HTML pages from the Reference folder into functional React components. You MUST convert the following page-specific vanilla JS features into React State:

Work Page (Work.jsx): Convert the Filter Dropdown logic into React state so clicking a category dynamically filters/displays the correct portfolio items.

About Page (About.jsx): Convert the Tools Tabs (Desktop) and Tools Accordion (Mobile) into React state so clicking a tab/accordion toggles the correct content pane.

Set up standard SPA routing in App.jsx to link all 8 pages.

4. CSS PRESERVATION (CRITICAL)

Copy ALL existing CSS files from Reference/css/ into frontend/src/assets/css/.

Explicitly import every single stylesheet (including mobile-res.css and tablet-res.css) globally in App.jsx ensuring the exact original loading order so the responsive layout is preserved perfectly.

Open a Draft Pull Request once the static React SPA is compiling perfectly with zero errors and all interactive states (tabs, menus, filters) are working.