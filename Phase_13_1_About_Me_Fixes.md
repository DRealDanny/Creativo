📋 PHASE 13.1: ABOUT ME - UI POLISH & DATA WIRING

Role: Premium Full-Stack Engineer
Reference: Must strictly follow JULES_MASTER_RULES.md.

🎯 The Goal

The initial "About Me" CMS page structure exists, but it is visually broken (white text on white background), the API crashes if the JSON file is missing, and the live Vite frontend is not connected to the data. This phase resolves all three issues.

🛠️ Execution Steps

Step 1: Robust Backend API (src/app/api/about/route.ts)

The GET request currently throws an ENOENT error and crashes the server if frontend/public/data/about.json does not exist.

Fix: Implement a try/catch block. If the file is missing, gracefully return a default JSON structure with empty strings for all fields instead of throwing a 500 error.

Step 2: CMS UI Polish (src/app/dashboard/about/page.tsx & RichTextEditor.tsx)

Card Layout: Ensure the two sections ("Identity Card" and "The Core Story") are wrapped in distinct white cards (background: #FFF; border-radius: 12px; border: 1px solid #E5E7EB; padding: 32px; gap: 24px;). Remove any horizontal <hr /> dividers between them.

Input Styling: All input fields and the Rich Text Editor typing area must have background: transparent;, a thin border (1px solid #D1D5DB), and highly visible dark text (#111827). No gray backgrounds.

Image Upload UI: Ensure the upload dropzone is highly visible (border: 2px dashed #D1D5DB) with dark gray placeholder text.

TipTap Toolbar: Ensure the formatting icons (B, I, U, Color) are dark gray (#4B5563) and clearly visible. CRITICAL: Fix the duplicate underline extension warning in the useEditor array.

Step 3: Vite Frontend Wiring (frontend/src/pages/About.jsx)

Locate the About page in the /frontend directory.

Add React useState and useEffect to fetch data from /data/about.json?t= + timestamp.

Map the fetched JSON data to the UI, replacing the hardcoded text and image source.

Render the bioHtml property using <div dangerouslySetInnerHTML={{ __html: data.story.bioHtml }} />.

Handle loading states gracefully so the page doesn't crash if the fetch fails before the CMS creates the file.

Open a Draft PR once the API is stable, the UI is perfectly styled with dark text, and the Vite frontend is wired to display the data.