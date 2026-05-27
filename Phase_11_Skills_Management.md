📋 PHASE 11: SKILLS MANAGEMENT MODULE

Role: Premium Full-Stack Next.js Engineer

🛑 CRITICAL CONTEXT & RULES

TECH STACK: Next.js (App Router), react-hot-toast, Node.js fs.

STYLING: Strictly Vanilla CSS Modules. Match the exact premium UI from the Socials form (transparent inputs with subtle stroke, #111111 text on light mode / white text on dark mode, solid blue commit buttons).

DATA ARCHITECTURE: Flat-file JSON database (/data/skills.json).

🎯 The Goal

Build the "Manage Skills" page where the user can dynamically add, edit, or remove skills categorized by discipline, syncing everything to a local JSON file.

🛠️ Execution Steps

Step 1: Initialize Local JSON Data

Create /data/skills.json and seed it with the exact data from the user's frontend:

{
  "creativeDesign": ["Figma", "Adobe Photoshop", "Adobe Illustrator", "Affinity Designer"],
  "webDevelopment": ["HTML & CSS", "JavaScript", "PHP", "React", "GSAP", "Tailwind CSS", "Flutter & Dart"],
  "videoEditing": ["Adobe After Effects", "Premiere Pro", "CapCut", "DaVinci Resolve"]
}


Step 2: Create the Next.js API Route

Create src/app/api/skills/route.ts.

Implement a GET method to read data/skills.json.

Implement a POST method to receive the full updated JSON object and write it to data/skills.json.

Step 3: Build the UI Layout (src/app/dashboard/skills/page.tsx)

Main Heading: "Manage Skills" followed by a standard <hr /> divider.

Sections: Create 3 distinct sections with subheadings: "Creative & Visual Design", "Web Development", and "Video Editing".

Step 4: Dynamic Array State & Row UI

Use React state to manage the 3 arrays.

Map through each array to render the skill rows.

Row Layout: Flex container.

Left: Transparent <input> field bound to the specific index of the array.

Right: Two buttons. A solid Blue "Commit" button, and a solid Red "Remove" button (e.g., #EF4444) sitting side-by-side.

Add Button: At the bottom of each section's list, place a solid Green "Add Skill" button (e.g., #10B981) that pushes an empty string to that category's array.

Step 5: Global Context Integration

Ensure editing an input, adding a skill, or removing a skill increments the global CommitContext so the TopBar "Commit All" button activates.

Wire the individual "Commit" buttons and the TopBar "Commit All" to trigger POST /api/skills, update the JSON, reset the commit context, and fire a success Toast.

Open a Draft PR once the form is successfully performing full CRUD operations on the JSON file.