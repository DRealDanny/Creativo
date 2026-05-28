📋 PHASE 13: ABOUT ME MODULE (WITH RICH TEXT)

Role: Premium Full-Stack Engineer

Reference: Must strictly follow JULES_MASTER_RULES.md for architecture and styling.

🎯 The Goal

Rename the "Profile Picture" tab to "About Me". Build a two-section CMS page to control the About Page identity card and the core bio story. Introduce a reusable, highly-restricted Rich Text Editor component.

🛠️ Execution Steps

Step 1: Backend Setup (Data & Image Handling)

Create a dummy JSON file at frontend/public/data/about.json:

{
  "identity": {
    "image": "/images/profile.jpg",
    "subheading": "BRAND STRUCTURALIST & VIDEO EDITOR",
    "heading": "Creativo"
  },
  "story": {
    "heading": "I don't just design things, I give them a backbone.",
    "bioHtml": "<p>I'm Creativo...</p>",
    "cvLink": "[https://link-to-cv.com](https://link-to-cv.com)"
  }
}

Create src/app/api/about/route.ts to handle GET/POST requests for the JSON file.

Image Uploads: If an image is uploaded, the API must use FormData, save the physical file into Vite's frontend/public/images/ directory, and save the resulting /images/filename.ext path to the JSON.

Step 2: Create Reusable <RichTextEditor /> Component

Create src/components/RichTextEditor.tsx.
Use a headless editor like TipTap so you have 100% control over the CSS styling (no ugly default toolbars).

RESTRICTED TOOLBAR RULES: You may ONLY include buttons for: Bold, Italic, Underline, Text Color Highlight, and Line Breaks (Paragraphs).

FORBIDDEN: Do NOT include Font Size, Alignment, or Font Family. (The frontend CSS handles this).
Toolbar UI must match Danny's premium standard (transparent backgrounds, thin strokes, high contrast).

Step 3: CMS UI - "About Me" (src/app/dashboard/about/page.tsx)

Ensure Sidebar navigation is updated from "Profile Picture" to "About Me" and correctly linked to /dashboard/about.

Section 1: Identity Card

Image uploader input (must show preview of current image).
2 transparent text inputs for Subheading and Heading.
Dedicated Section-1-only green Commit button.

Section 2: The Core Story

Expanding text area for the Main Heading.
Drop in the new <RichTextEditor /> component for the main bio body.
Transparent input for the "Download CV" link.
Dedicated Section-2-only green Commit button.
State Logic: Track dirty states independently. Clicking Commit on Section 1 should NOT commit changes from Section 2, and vice versa.

Step 4: Frontend Wiring (Vite React SPA)

Locate the About Page components in the /frontend directory.
Add standard React useEffect and useState.
Fetch data with cache-busting: fetch('/data/about.json?t=' + new Date().getTime()).

Inject the image src, text fields, and CV link.
Render the bioHtml using <div dangerouslySetInnerHTML={{ __html: data.story.bioHtml }} /> so the frontend applies its native CSS styling to the incoming tags.

Open a Draft PR once the CMS preview works, data saves correctly, and the live frontend updates.
