Phase 19: The "Add New" & "Edit" Architecture

The Objective

Upgrade the individual CMS category pages to handle multiple projects, dynamically switching between "Add New" (blank slate) and "Edit" (pre-filled data) modes. Additionally, add a clear "+ Add New" UI trigger to the Master Work Dashboard.

1. The "+ Add New" Button (Master Dashboard)

Open src/app/dashboard/work/page.tsx.

At the top of the page (near the "All Work" heading), add a solid Blue (#2060FF) button labeled "+ Add New Project".

When clicked, it should present a simple dropdown or 3 quick options (Branding, Web Development, Video Editing).

Clicking an option routes the user to that specific CMS page (e.g., /dashboard/branding) without any URL parameters, triggering a blank canvas.

2. Frontend State & URL Parsing (src/app/dashboard/[category]/page.tsx)

Apply this logic to all three category CMS pages:

Use useSearchParams() from next/navigation to check if a ?slug= parameter exists in the URL.

Edit Mode: If slug exists, fetch the existing JSON file, find the object matching that slug, and pre-fill all the React state variables (inputs, rich text, dynamic blocks, images).

Add New Mode: If no slug exists, initialize the React state with completely empty strings/arrays. Generate a new, unique UUID for the project id in the background.

3. The "Commit All" Logic Upgrade

The top-right "Commit All" button remains the master save action for the specific page.

When clicked, the payload sent to the API must include the full project object, including the generated slug and id.

4. The Backend API Logic (/api/[category]/route.ts)

Update the POST/PATCH routes for all three categories to handle arrays:

The API must read the existing JSON array.

Check for Existing: Search the array for an object with a matching id.

If Found (Edit): Overwrite that specific object with the incoming payload.

If Not Found (Add New): Append the incoming payload as a brand new object to the end of the array.

Write the updated array back to the JSON file.

5. UI Polish

At the top of the form on the category pages, dynamically change the title text to clarify the mode (e.g., "Create New Branding Project" vs "Edit: [Project Title]").