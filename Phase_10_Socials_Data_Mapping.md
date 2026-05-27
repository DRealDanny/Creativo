📋 PHASE 10: SOCIALS DATA MAPPING & API SETUP

Role: Premium Full-Stack Next.js Engineer

🛑 CRITICAL CONTEXT & RULES

TECH STACK: Next.js (App Router), react-hot-toast, Node.js fs (File System).

UI PROTECTION: DO NOT modify Socials.module.css. The UI design is locked and approved. Only modify the React logic and data flow.

OBJECTIVE: Audit the frontend Footer component, map the exact social icons to the CMS form, and wire the form to read/write from a local JSON file.

🛠️ Execution Steps

Step 1: Audit and Sync Form Fields

Review the existing frontend Footer component to see exactly which social links/emails are currently hardcoded or used.

Update src/app/dashboard/socials/page.tsx: Remove any placeholder inputs (like YouTube or TikTok) if they do not exist in the frontend Footer. Add any missing ones.

CRITICAL: Ensure the exact HTML structure and CSS module class names remain identical so the transparent input styling and flex alignment do not break.

Step 2: Initialize Local JSON Database

Create a folder at the root called data (if it doesn't exist).

Create data/socials.json.

Populate it with the actual current links from the frontend Footer. Example structure:

{
  "email": "hello@creativocreates.com",
  "x": "[https://x.com/](https://x.com/)...",
  "linkedin": "[https://linkedin.com/in/](https://linkedin.com/in/)...",
  "instagram": "[https://instagram.com/](https://instagram.com/)..."
}


Step 3: Create the Next.js API Route

Create src/app/api/socials/route.ts.

Implement a GET method to read data/socials.json.

Implement a POST method to receive updated links and write them back to data/socials.json using the fs module.

Step 4: Wire the CMS Frontend

In src/app/dashboard/socials/page.tsx, use useEffect (or standard data fetching) to call GET /api/socials on mount and populate the initialValues and current input states.

Update the individual "Commit" buttons and the global TopBar "Commit All" logic to trigger a POST /api/socials request with the updated data.

Await the response and trigger the appropriate toast.success() or toast.error() based on the API result.

Open a Draft PR once the data is successfully syncing between the CMS UI and the JSON file.