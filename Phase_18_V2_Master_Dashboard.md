Phase 18 (V2): Master Work Dashboard & UI Polish

1. Strict Guardrails (DO NOT TOUCH)

Authentication: Do NOT touch, move, or modify src/app/api/auth/[...nextauth] or any related NextAuth files.

ESLint: Do NOT attempt to fix linting rules in this session.

Sidebar Navigation: Do NOT create a new "All Work" tab. Locate the existing WORK section header in the sidebar layout. Convert that existing header into a clickable Link routing to /dashboard/work.

2. The Master Dashboard UI (src/app/dashboard/work/page.tsx)

This page must look premium, spacious, and highly legible.

Canvas Styling: Ensure all text uses high-contrast colors (e.g., #111827 or #374151 for headings and text). Do NOT use white text on light backgrounds.

List Layout: Render the combined projects (Branding, Web, Video) as a clean, full-width vertical list. Each project should be a sleek row (display: flex, justify-content: space-between, align-items: center, border-bottom: 1px solid #E5E7EB, padding: 16px 0).

Row Content (Left Side):

Project Title (Bold, modern typography).

Niche/Category Badge (e.g., a subtle light-gray pill background with dark text like "Web Development").

Do not display the narrative or description here to keep it visually clean.

Row Controls (Right Side):

The Premium Toggle: Do NOT use a button that says "Feature". Build a sleek, iOS-style CSS toggle switch.

Active State: Vibrant Green background (#10B981), toggle circle moved to the right.

Inactive State: Subtle Gray background (#D1D5DB), toggle circle on the left.

Edit & Delete: Use minimalist, icon-only buttons (or very clean text buttons with transparent backgrounds and subtle hover states) instead of chunky colored blocks.

3. The Backend API (/api/work)

Create a clean GET route to fetch and combine all three JSON files.

Create a PATCH route to handle the toggle state (isFeatured: true/false).

Create a DELETE route.

4. Frontend Data Wipe

Open frontend/src/pages/Home.jsx. Completely DELETE the hardcoded dummy array. Wire the "Selected Work" section to only render items from the dynamic fetch where isFeatured === true.

Open frontend/src/pages/Work.jsx. Completely DELETE the hardcoded dummy array. Map through the dynamic data only.