📋 REACT MIGRATION - STEP 3: GSAP, TRANSITIONS & JS LOGIC

Role: Principal React Engineer

Task: This is Step 3 of 3. The React scaffolding, routing, and HTML/State conversions are complete. Your final task is to safely inject the existing vanilla GSAP animations, custom cursor, and page transitions into the React SPA lifecycle.

DIRECTORY AWARENESS (CRITICAL): All work must be done exclusively inside the frontend/src/ folder. Do NOT alter the original root files.

1. GSAP INSTALLATION

Run npm install gsap inside the frontend directory.

Do NOT use CDN scripts for GSAP. Import it locally in the components where it is needed (import gsap from 'gsap').

2. GLOBAL JS LOGIC (Custom Cursor)

Locate your original vanilla JS custom cursor logic.

Implement this logic globally inside frontend/src/App.jsx (or a main Layout wrapper) using a useEffect hook with an empty dependency array [] so it only initializes once on app mount.

Ensure you return a cleanup function to remove event listeners if the component unmounts.

3. SPA ROUTING TRANSITIONS ("The Curtain")

Implement the existing GSAP "curtain" page transition to work with react-router-dom.

Because this is an SPA, you must intercept route changes. When a user clicks a <Link>, fire the GSAP exit transition (curtain closes), then update the route/URL, and finally fire the GSAP entry transition (curtain opens) on the new page mount.

(You may create a PageTransitionWrapper.jsx component or handle this via useLocation to manage the timing).

4. PAGE-LEVEL GSAP REVEALS (Fixing the hidden content)

Open all 8 page components in frontend/src/pages/.

Inside every page component, implement a useEffect hook that fires the exact vanilla GSAP entry animations (e.g., staggering text, fading in images, scrolling reveals) specific to that page.

This will fix the current issue where content remains hidden at opacity: 0.

5. MEMORY MANAGEMENT

Crucial React Step: Whenever using GSAP inside a useEffect, you MUST use gsap.context() or return a cleanup function to revert() the animations/triggers when the component unmounts. This prevents severe memory leaks and conflicting animations during SPA routing.

Open a Draft Pull Request once the cursor is working, the curtain transitions operate between routes, and all page content animates in correctly.