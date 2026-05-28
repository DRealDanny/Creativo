📋 PHASE 13.1: ABOUT ME - DATA WIRING & TERMINAL FIXES

Role: Premium Full-Stack Engineer

Reference: Must strictly follow JULES_MASTER_RULES.md.

🎯 The Goal

The CMS UI layout is already complete and pushed to main. Do NOT touch the CSS, styling, or layout. This phase strictly resolves the backend API crashing when a file is missing, fixes a TipTap terminal warning, and wires the live Vite frontend to display the JSON data.

🛠️ Execution Steps

Step 1: Robust Backend API (src/app/api/about/route.ts)

The GET request currently throws an ENOENT error and crashes the server if frontend/public/data/about.json does not exist yet.
Fix: Implement a try/catch block. If the file is missing, gracefully return a default JSON structure (with empty strings) instead of throwing a 500 error. Do not crash.

Step 2: Fix TipTap Terminal Warning (src/app/dashboard/components/RichTextEditor.tsx or similar)

The terminal is throwing a warning about a duplicate extension.
Fix: Remove the duplicate underline extension from the TipTap useEditor configuration array.

Step 3: Vite Frontend Wiring (frontend/src/pages/About.jsx or equivalent)

Locate the About page in the /frontend directory.
Add React useState and useEffect to fetch data from /data/about.json?t= + timestamp.

Map the fetched JSON data to the UI, replacing the hardcoded text and image source.
Render the bioHtml property using <div dangerouslySetInnerHTML={{ __html: data.story.bioHtml }} />.

Handle loading states gracefully so the Vite page doesn't crash if the JSON doesn't exist yet.

Open a Draft PR once the API is stable, the terminal is warning-free, and the Vite frontend is wired to display the data.