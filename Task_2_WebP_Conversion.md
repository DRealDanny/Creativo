Task 2: Backend Image WebP Conversion

1. Objective

Optimize website performance by automatically converting all uploaded images from the CMS (JPEG, PNG, etc.) into the lightweight .webp format before saving them to the frontend public directory.

2. Implementation Steps

Install Dependency: Install the sharp package inside the backend/admin environment (npm install sharp).

Intercept Uploads: Locate the backend API routes responsible for handling image uploads (typically in POST and PATCH requests for case studies/projects).

Convert & Save: - Instead of saving the raw file directly, pass the uploaded file buffer through sharp.

Convert it using .webp({ quality: 80 }) (or similar optimal settings).

Save the new file to the appropriate frontend/public/images/... directory with the .webp file extension.

Update JSON Data: Ensure the path saved to the JSON database string reflects the new .webp extension so the frontend accurately pulls the optimized image.