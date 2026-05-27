📋 PHASE 11: SKILLS CMS & FRONTEND DATA WIRING

Role: Premium Full-Stack Next.js Engineer

🛑 CRITICAL CONTEXT & RULES

TECH STACK: Next.js (App Router), react-hot-toast, Node.js fs.

STYLING: Strictly Vanilla CSS Modules. CMS inputs must remain transparent with subtle borders.

OBJECTIVE: Build the "Manage Skills" CMS page, AND wire up the actual frontend components (Footer and Tools & Stack) to read from the JSON flat files.

🛠️ Execution Steps

Step 1: Build the CMS Manage Skills Page

Create /data/skills.json seeded with the frontend's current data (Creative Design, Web Dev, Video Editing arrays).

Create src/app/api/skills/route.ts to handle GET/POST for the JSON file.

Build src/app/dashboard/skills/page.tsx with 3 category sections.

UI Rules: Match the transparent inputs of the Socials page. Each skill row gets a transparent input, a Blue "Commit" button, and a Red "Remove" button. Each section gets a Green "Add Skill" button at the bottom.

Wire to the global CommitContext and Toasts.

Step 2: Frontend Integration - Socials (The Fix)

Locate the frontend Footer component (likely src/components/Footer.tsx or similar).

Convert it to an Async Server Component if it isn't already.

Use fs.promises.readFile to read data/socials.json on the server.

Replace the hardcoded href links for Email, X, LinkedIn, and Instagram with the dynamic data from the JSON file.

Step 3: Frontend Integration - Skills

Locate the frontend component for the Tools & Stack section.

Convert it to an Async Server Component.

Use fs.promises.readFile to read data/skills.json on the server.

Replace the hardcoded lists with dynamic map() functions rendering the arrays from the JSON file.

Open a Draft PR once the CMS is managing Skills, AND the live frontend website is successfully reflecting changes made to both Socials and Skills.