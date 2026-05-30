📋 PHASE 14.1: IMAGE UPLOAD DUPLICATION FIX

Role: Premium Full-Stack Engineer

🛑 CRITICAL CONTEXT

The CMS is currently duplicating image files exponentially in the frontend/public/images/ directory. When the "Commit All" button is clicked (or when individual commits fire), the API is taking the existing image and re-saving it as a brand new file with a new timestamp, instead of recognizing that the file is unchanged.

🎯 The Goal

Refactor the API route and frontend state logic to prevent identical images from being re-uploaded and re-saved when other fields in the form are committed.

🛠️ Execution Steps

Step 1: Frontend State Polish (src/app/dashboard/branding/page.tsx)

Ensure the image dropzones are only sending a File object to the API if the user actually uploaded a new file.

If the user hasn't touched the image dropzone, the state for that image should just be the existing URL string (e.g., /images/grid-branding-123.jpg), not a file object.

Step 2: API Route Logic Fix (src/app/api/branding/route.ts)

When iterating through the incoming FormData, check the type of the incoming image data.

If it's a File: Process the upload, generate the new timestamped filename, save it via fs, and update the JSON with the new path.

If it's a String (or empty): Do NOT attempt to save a new file. Simply retain the existing string URL in the JSON object.

Ensure this logic applies to gridImage, heroBgImage, and every blockImage inside the dynamic repeater array.

Open a Draft PR once the API is successfully ignoring unchanged images and the duplication stops.