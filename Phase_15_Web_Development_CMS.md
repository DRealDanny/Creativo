📋 PHASE 15: WEB DEVELOPMENT CMS & REPEATER

Role: Premium Full-Stack Engineer
Reference: Must strictly follow JULES_MASTER_RULES.md.

🎯 The Goal

Clone the exact UI, styling, and logic from the "Branding" CMS module and repurpose it for "Web Development". Ensure the new JSON schema maps correctly to the CaseStudyWebDevelopment.jsx frontend template.

🛠️ Execution Steps

Step 1: The JSON Schema (frontend/public/data/web-development.json)
Create this exact file. It must be an array of objects. Use these specific keys:

[
  {
    "id": "web-project-1",
    "projectCategory": "Web Development",
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
      "heroWhatWeDid": "",
      "heroWebsiteLink": "",
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


Step 2: CMS UI Development (src/app/dashboard/web-development/page.tsx)

Sidebar Navigation: Open the Sidebar component and ensure the "Web Development" link routes to /dashboard/web-development and has active state logic.

Clone the UI: Copy the EXACT UI layout, white cards, transparent inputs, image preview logic (with "Change Upload" hover states), and independent commit logic from dashboard/branding/page.tsx.

Data & API: Map the inputs to the new JSON schema above. Point the Commit actions to a new API route: src/app/api/web-development/route.ts.

Field Update: Change the "View Deliverables" field label to "Visit Website Link" and ensure it maps to heroWebsiteLink.

Image Duplication Note: Ensure the API and state logic inherits the exact same isFile checking logic we successfully built for the Branding individual commits.

Step 3: Vite Frontend Wiring (frontend/src/pages/CaseStudyWebDevelopment.jsx & Work Grid)

Wipe Dummy Data: Remove the hardcoded text and images from the Web Development case study template.

Wire the Fetch: Add useEffect to fetch /data/web-development.json?t= + timestamp.

Dynamic Route Setup: Ensure this new category generates slugs from gridTitle and routes dynamically just like Branding does (e.g., /case-study/lumina-website).

Map the Array:

Update the main /work page grid to fetch and merge projects from BOTH branding.json and web-development.json into one master array so the "Filter By Type" dropdown works.

Map CaseStudyWebDevelopment.jsx to display the caseStudyHero data. Wire the "Visit Website" button to the heroWebsiteLink.

Map over the dynamicBlocks array to render the alternating text/media sections down the page.

Open a Draft PR when the CMS form is fully functional and the Vite frontend is successfully rendering the Web Development data.