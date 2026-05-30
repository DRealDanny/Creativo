📋 PHASE 16: VIDEO EDITING CMS & TEMPLATE

Role: Premium Full-Stack Engineer
Reference: Must strictly follow JULES_MASTER_RULES.md.

🎯 The Goal

Build the CMS dashboard for the "Video Editing" tab by cloning the established pattern from the Branding/Web Dev modules. Wire the CaseStudyVideoEditing.jsx frontend template and combine all three data sources into the master Work grid.

🛠️ Execution Steps

Step 1: The JSON Schema (frontend/public/data/video-editing.json)
Create this exact file using the established array schema.

Category: Ensure the hidden/auto-assigned category is strictly "projectCategory": "Video Editing".

Link Key: Update the hero link key to "heroWatchReelLink": "".

Blank Slate: Ensure the file contains NO placeholder data or links (empty strings only).

Step 2: CMS UI Development (src/app/dashboard/video-editing/page.tsx)

Clone: Duplicate the exact UI, CSS layout, transparent inputs, and image preview logic (with "Change Upload" hover states and thumbnail rendering) from dashboard/branding/page.tsx.

Label Update: Change the Hero Entry button link label to "Watch Reel Link".

Independent Commits: Ensure the independent section commit logic and global TopBar "Commit All" logic are fully functional.

Step 3: Strict Routing & Slug Generation

Clean Slugs: When generating the slug from the Grid Title, ensure it is just the formatted string (e.g., klave-youtube-series). DO NOT prepend /video/ or any other subdirectories to it.

Unified Path: The URL structure must strictly remain /case-study/:slug just like the other categories.

Step 4: Vite Frontend Wiring (frontend/src/pages/CaseStudyVideoEditing.jsx & Work Grid)

Wipe Dummy Data: Remove all hardcoded dummy text and images from CaseStudyVideoEditing.jsx.

Master Grid Consolidation: Update frontend/src/pages/Work.jsx. It must now use Promise.all (or equivalent logic) to fetch from all THREE JSON files (branding.json, web-development.json, and video-editing.json), combine them into a single master array, and map them to the grid. Ensure the "Filter by type" dropdown perfectly filters the "Video Editing" category.

Template Wiring: Wire the CaseStudyVideoEditing.jsx template to display the fetched data, mapping the "Watch Reel" button to heroWatchReelLink. Render the dynamic repeater blocks normally.

Open a Draft PR when the CMS form is fully functional and the frontend grid displays all three categories flawlessly.