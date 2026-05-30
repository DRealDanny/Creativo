Phase 18: Master "Work" Dashboard & Dynamic Homepage

The Objective

Transform the static "Work" tab in the CMS into a central command center that aggregates all uploaded projects across Branding, Web Development, and Video Editing. This dashboard will control what projects are featured on the live Homepage using a visual toggle system.

1. CMS Master Dashboard UI (src/app/dashboard/work/page.tsx)

Data Aggregation: Fetch and merge branding.json, web-development.json, and video-editing.json into a single, unified list.

List Item Display: Each row must display:
Project Title
Project Subtitle / Narrative
Category Badge (e.g., "Branding", "Web Development", "Video Editing")
Action Controls (Per Project):

The Featured Toggle: A UI switch to feature the project on the Homepage.

Active State: The toggle pill/background must be Green.

Inactive State: The toggle pill/background must be Grey.

Edit Button: Clicking this routes the user to the specific category's CMS page (e.g., /dashboard/branding?edit=[slug]). The target CMS page must read this URL parameter and automatically pre-fill the form with the existing data so it can be corrected.

Delete Button: A trash icon/button with a confirmation prompt. On confirm, it removes the project from its respective JSON file.

2. Backend API Logic

Toggle Updates: Ensure the API can handle a partial update to switch "isFeatured": true/false on a specific project without destroying the rest of the object.

Delete Logic: Ensure the API can safely filter out a specific project by its slug and save the updated JSON array.

3. Frontend Live Site Wiring (frontend/src/pages/Home.jsx)

Wipe Dummy Data: Completely remove all hardcoded template projects inside the "Selected Work" section of the Homepage. It must be a blank slate.

Dynamic Fetching: Wire the "Selected Work" section to use Promise.all to fetch all three JSON files.

The Filter: Strictly filter the combined array to only render projects where isFeatured === true.

Ensure the live project cards still route correctly to their respective /case-study/[slug] pages.