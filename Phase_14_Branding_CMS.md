📋 PHASE 14: BRANDING CMS & DYNAMIC REPEATER

Role: Premium Full-Stack Engineer
Reference: Must strictly follow JULES_MASTER_RULES.md.

🎯 The Goal

Build the CMS dashboard for the "Branding" tab. It must capture data for the Grid Preview (Index) and the Case Study Template (Deep Dive). It requires a dynamic repeater field so the user can add infinite content blocks. Finally, clear the dummy data in the Vite frontend and wire it to the new JSON structure.

🛠️ Execution Steps

Step 1: The JSON Schema (frontend/public/data/branding.json)
Create this exact file. It must be an array of objects to support multiple projects. Use these highly specific keys to prevent class collisions:

[
  {
    "id": "brand-project-1",
    "projectCategory": "Branding",
    "isFeaturedOnHome": false,
    "gridPreview": {
      "gridImage": "",
      "gridTitle": "",
      "gridNarrative": ""
    },
    "caseStudyHero": {
      "heroBgImage": "",
      "heroTitle": "",
      "heroSector": "",
      "heroDeliverables": "",
      "heroHookRichText": ""
    },
    "dynamicBlocks": [
      {
        "blockId": "block-1",
        "blockHeading": "",
        "blockSubHeading": "",
        "blockImage": "",
        "blockVimeoLink": ""
      }
    ]
  }
]


Step 2: CMS UI Development (src/app/dashboard/branding/page.tsx) & Navigation

Sidebar Navigation (CRITICAL): Open the Sidebar component and ensure the "Branding" link is clickable and correctly routes the user to /dashboard/branding.

CRITICAL UI REFERENCE: Open src/app/dashboard/about/page.tsx and study its CSS module. You MUST replicate its exact "Card" layout. Wrap the sections below in distinct white cards (#FFF background, 12px border-radius, thin border, subtle shadow). All inputs must be transparent with thin borders and dark text.

Section 1 - The Grid Hook: Inputs for gridImage, gridTitle, and gridNarrative.

Section 2 - The Hero Entry: Inputs for heroBgImage, heroTitle, heroSector, heroDeliverables, and a TipTap Rich Text editor for heroHookRichText.

Section 3 - The Dynamic Builder:

A repeatable card container holding inputs for blockHeading, blockSubHeading, blockImage, and blockVimeoLink.

Include the live Vimeo preview logic (reused from the Showreel tab).

Include a solid Green "Add New Section" button at the bottom that appends a new empty block to the dynamicBlocks array.

Wire up the standard Blue "Commit" buttons for the rows/sections, hooking into the global CommitContext.

Step 3: Vite Frontend Wiring & Cleanup (frontend/src/pages/CaseStudyBranding.jsx & Work Grid)

Wipe Dummy Data: Remove the hardcoded text and images from the Branding case study template and the main Work grid.

Wire the Fetch: Add useEffect to fetch /data/branding.json?t= + timestamp.

Map the Array:

Map the main /work grid to display the gridPreview data.

Map the CaseStudyBranding.jsx template to display the caseStudyHero data.

Map over the dynamicBlocks array to render the alternating text/media sections down the page.

Open a Draft PR when the CMS form is fully functional (especially the dynamic "Add Section" button) and the Vite frontend is successfully rendering the JSON data.