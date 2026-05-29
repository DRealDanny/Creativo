📋 PHASE 13.1: ABOUT ME - DATA WIRING & TERMINAL FIXES

Role: Premium Full-Stack Engineer

Reference: Must strictly follow JULES_MASTER_RULES.md.

🎯 The Goal

The CMS UI layout is already complete and merged to main. Do NOT touch the CSS, styling, or layout. This phase strictly focuses on establishing the physical JSON data file, resolving backend API crashes, fixing a TipTap terminal warning, and wiring the Vite frontend precisely so it maps to the correct sections (without breaking the main Hero layout).

🛠️ Execution Steps

Step 1: Establish the Baseline JSON File & Specific Schema

Create a new file at frontend/public/data/about.json with this exact data structure. We are using highly specific keys (cardRole, cardName, storyHeadline) so they do not conflict with the main Hero section on the frontend:

{
  "identityCard": {
    "image": "",
    "cardRole": "BRAND STRUCTURALIST & VIDEO EDITOR",
    "cardName": "Creativo"
  },
  "coreStory": {
    "storyHeadline": "I don't just design things. I build the visual logic...",
    "bioHtml": "<p>Welcome to my world.</p>",
    "cvLink": "#"
  }
}

Step 2: Robust Backend API (src/app/api/about/route.ts)

The GET request must safely handle the file read.
Fix: Implement a try/catch block. If the file is missing, gracefully return the default JSON structure from Step 1 instead of throwing an ENOENT 500 error. Do not crash.

Step 3: Update CMS State (No CSS Changes)
Ensure the Next.js CMS dashboard (src/app/dashboard/about/page.tsx) uses these specific state variables (identityCard.cardName, coreStory.storyHeadline, etc.) for its inputs.

Step 4: Fix TipTap Terminal Warning (src/app/dashboard/components/RichTextEditor.tsx)
The terminal is throwing a warning about a duplicate extension.

Fix: Remove the duplicate underline extension from the TipTap useEditor configuration array.

Step 5: Precise Vite Frontend Wiring (frontend/src/pages/About.jsx or equivalent)
Add React useState and useEffect to fetch data from /data/about.json?t= + timestamp.

CRITICAL - DO NOT TOUCH THE HERO SECTION: Leave the main massive text at the very top of the page completely alone. Do not inject data there.

TARGET THE PICTURE FRAME: Map identityCard.cardName, identityCard.cardRole, and identityCard.image strictly to the HTML elements that make up the Picture Frame / ID Card UI.

TARGET THE STORY: Map coreStory.storyHeadline and coreStory.bioHtml to the "My Story" section further down the page. Use <div dangerouslySetInnerHTML={{ __html: data.coreStory.bioHtml }} />.

Open a Draft PR once the JSON file is created, the API is stable, the terminal is warning-free, and the Vite frontend is wired to the exact correct sections.