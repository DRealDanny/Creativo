📋 REACT MIGRATION - STEP 2: HTML INJECTION & COMPONENT STATE

Role: Principal React Engineer

Task: This is Step 2 of 3. Your goal is to inject the static HTML into the React scaffolding created in Step 1, convert it strictly to JSX, and implement React state (useState) for interactive UI components like the Header menu.

DIRECTORY AWARENESS (CRITICAL): All React scaffolding from Step 1 is located inside the frontend directory. You must perform all of the following work exclusively inside the frontend/src/ folder. Do NOT alter the original HTML files in the root directory.

ANIMATION RULE: Do NOT add GSAP or vanilla JS animations yet (that is Step 3). Focus strictly on DOM structure and React State.

1. JSX STRICTNESS PROTOCOL (Apply to all files below)

You MUST rigorously convert ALL class= to className=.

Convert for= to htmlFor=.

Ensure all self-closing HTML tags (<img />, <hr />, <input />, <br />) are properly formatted to prevent Vite compilation errors.

2. REACTIFY THE HEADER & FOOTER (frontend/src/components/)

Header.jsx: Inject the original HTML Header code here.

Replace standard <a> navigation tags with react-router-dom <NavLink> or <Link>.

React State: Convert the vanilla JS mobile menu toggle into a React useState hook. The hamburger icon should toggle an isMenuOpen boolean state, which conditionally applies your existing active CSS classes to the mobile menu.

Footer.jsx: Inject the original HTML Footer code here. Convert links to <Link>.

3. INJECT PAGE CONTENT (frontend/src/pages/)

Open the 8 page components in frontend/src/pages/.

Inject the main HTML content from the original root static files into their respective React components.

Ensure the pages are wrapped with the <Header /> and <Footer /> components if they aren't already handled by a global Layout wrapper.

Double-check that all image paths in src="" point correctly to the public or assets folder.

Open a Draft Pull Request once the HTML is fully converted to JSX inside the frontend folder and the Header state compiles without errors.