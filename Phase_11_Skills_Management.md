📋 PHASE 11: SKILLS CMS & VITE FRONTEND WIRING

Role: Premium Full-Stack Engineer

🛑 CRITICAL ARCHITECTURE CONTEXT

CMS BACKEND: Next.js (App Router). Uses standard Node fs to write to JSON files.

LIVE FRONTEND: Vite React SPA. Uses standard browser fetch(). DO NOT use Next.js Server Components or fs in the frontend directory!

DATA STORAGE: Flat-file JSON database located in the root /data directory.

STYLING: Strictly Vanilla CSS Modules. Match the transparent input UI from the Socials page exactly.

🎯 The Goal

Build the Next.js "Manage Skills" CMS page, connect the root /data folder to Vite via a symlink, and make the Vite frontend fetch the live data securely.

🛠️ Execution Steps

Step 1: The CMS Backend (Next.js)

Create /data/skills.json seeded with the frontend's current data (Creative Design, Web Dev, Video Editing arrays).

Create src/app/api/skills/route.ts to handle GET/POST to this JSON file.

Step 2: Build the CMS Manage Skills UI (src/app/dashboard/skills/page.tsx)

Build the page with 3 category sections matching the JSON arrays.

UI Rules: Match the transparent inputs of the Socials page exactly. Each skill row gets a transparent input, a Blue "Commit" button, and a Red "Remove" button. Each section gets a Green "Add Skill" button at the bottom.

Wire inputs to the global CommitContext and trigger Toasts on success/error.

Step 3: The Architecture Fix (Vite Symlink)

Navigate to the Vite frontend directory.

Create a symlink at frontend/public/data that points directly to the root ../data folder. (This ensures Vite serves the live JSON files as static assets during dev AND build).

Remove any old custom Vite vite.config.js middlewares previously created to serve these files, as the symlink makes them native to Vite's public directory.

Step 4: The Frontend Wiring (Vite React SPA)

Update the frontend Footer (Socials) and Tools & Stack (Skills) components.

Use standard React useState and useEffect.

Fetch the data using aggressive cache-busting so it always shows the latest CMS changes:
fetch('/data/skills.json?t=' + new Date().getTime())

Map the fetched data to the UI components. Handle loading states gracefully (e.g., return null or a skeleton until data loads so the UI doesn't crash).

Open a Draft PR once the CMS is functional, the symlink is created, and the Vite frontend is successfully rendering the live JSON data.