📋 PHASE 12: MANAGE SHOWREEL MODULE

Role: Premium Full-Stack Engineer

Reference: Must strictly follow

JULES_MASTER_RULES.md for architecture and styling.

🎯 The Goal

Build the "Manage Showreel" CMS page featuring a live Vimeo video previewer, and wire it to the live Vite frontend Hero Section.

🛠️ Execution Steps

Step 1: Backend Setup (The Data)
Create a dummy JSON file directly in the Vite public folder: frontend/public/data/showreel.json.
Structure: { "url": "https://vimeo.com/76979871" } (Use a dummy Vimeo ID).

Create the Next.js API route src/app/api/showreel/route.ts to handle GET/POST requests to this exact file path.

Step 2: CMS UI - "Manage Showreel" (src/app/dashboard/showreel/page.tsx)
Heading: "Manage Showreel" followed by the standard <hr /> divider.

Video Previewer: * Add a video container above the input field.

Use an <iframe> configured for Vimeo.
Helper Logic: Write a small utility function to convert standard Vimeo URLs (e.g., https://vimeo.com/123456) into valid embed URLs (https://player.vimeo.com/video/123456) so the iframe preview doesn't break depending on what link the user pastes.

Input Row: * Strict Flex Row layout (display: flex; gap: 8px; align-items: center;).
Input: Transparent background, thin stroke, flex: 1 to take up space. Must use the global autofill fix.

Commit Button: Right next to the input.
State Logic:
Track the dirty state. If the input URL differs from the saved JSON URL, the Commit button turns solid Green (#10B981) and is clickable. If unchanged, it is grey/disabled.
Update the global CommitContext and fire Toasts on success.

Step 3: Frontend Wiring (Vite React SPA)
Locate the Hero Section component in the /frontend directory containing the "Watch Showreel" button/modal.

Add standard React useEffect and useState.
Fetch the data using aggressive cache-busting: fetch('/data/showreel.json?t=' + new Date().getTime()).

Inject the fetched URL into the frontend's video player or modal href/src.

Open a Draft PR once the CMS preview works, data saves correctly, and the live frontend successfully plays the fetched video.