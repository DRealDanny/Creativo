📋 TASK 1: CONTACT UI & ORPHANED FILE CLEANUP

Role: Premium React Engineer & Backend Architect
Reference: Must strictly follow JULES_MASTER_RULES.md.

🎯 The Goal

Fix a visual layout issue on the Contact page where social icons and text are awkwardly stacked.

Implement backend garbage collection: When a project is deleted or an image is replaced via the CMS, the physical image files MUST be deleted from the frontend/public/images/ directory to prevent repository bloat.

🛠️ Execution Steps

Step 1: Contact Page UI Fix (frontend/src/pages/Contact.jsx & CSS)

Open the Contact page component and locate the "Find Me On" social links section.

Layout Fix: The icon (e.g., Instagram/Behance logo) and its corresponding text label (@creativocreates) are currently stacking vertically.

Action: Update the CSS class (or inline styles) for the wrapper holding the icon and text. Apply strict Flexbox rules: display: flex; flex-direction: row; align-items: center; gap: 12px; (adjust gap as needed) to force them onto the same horizontal line. Ensure this horizontal alignment applies across Mobile, Tablet, and Desktop breakpoints.

Step 2: Backend Garbage Collection - DELETE Method (admin/src/app/api/work/route.ts or equivalent)

Locate the API logic that handles deleting a project from the JSON files.

Action: Before removing the project from the JSON array, extract ALL image URLs associated with that project (e.g., gridImage, heroBgImage, blockImage).

Use the Node.js fs.unlink or fs.unlinkSync method to physically delete those image files from the frontend/public/images/ directory.

Step 3: Backend Garbage Collection - PATCH/UPDATE Method

Locate the API logic that handles updating a project.

Action: Compare the incoming image URLs with the existing image URLs in the JSON object.

If a new image was uploaded (meaning the URL string changed), use fs.unlink to physically delete the old, replaced image file from the frontend/public/images/ directory before saving the new JSON state.

Open a Draft PR once the Contact UI is fixed and the backend safely deletes orphaned image files.