📋 PHASE 7: HEADLESS CMS - DASHBOARD SKELETON UI

Role: Premium React UI Engineer

🛑 CRITICAL CONTEXT & RULES

TECH STACK: Next.js (App Router).

STYLING: Strictly Vanilla CSS Modules (e.g., dashboard.module.css). DO NOT use Tailwind CSS.

TYPOGRAPHY: Import and apply a premium, stylish sans-serif font (like 'Plus Jakarta Sans' or 'Inter' via Google Fonts in the layout) for that high-end SaaS feel.

ICONS: Use the globally available Remixicons via standard <i> tags.

SCOPE: This is strictly a static UI layout build. Do not wire up the database or complex state logic yet.

🎯 The Goal

Build the master layout for the CMS Dashboard. It must feature a fixed, dark-themed sidebar on the left and a fluid, light-themed main workspace on the right, matching premium SaaS aesthetics.

🛠️ Execution Steps

Step 1: The Master Layout Component & Typography
Create src/app/dashboard/layout.tsx and src/app/dashboard/layout.module.css.

Apply a stylish global font to the dashboard wrapper.

Build a 2-column layout (CSS Grid or Flexbox).

Left Column: Fixed width (approx 260px).

Right Column: Fluid width (calc(100% - 260px)), with a light background (e.g., #f9fafb) and overflow-y: auto.

Pass the children prop into the right column.

Step 2: The Dark Sidebar (Sidebar.tsx)
Create a Sidebar component to sit in the left column.

Theme: Dark mode background (e.g., #111827), muted grey text for inactive links, white text for active links.

Header: A bold "Dashboard" wordmark at the top.

Structure the Navigation exactly like this:

LINK: "Home" (with a standard Home Remixicon). This is the default overview link.

DIVIDER: A subtle dark-grey line (<hr>)

HEADING: "[Briefcase Icon] WORK" (Icon + Text, uppercase, muted, small font)

Link: Branding

Link: Web Development

Link: Video Editing

DIVIDER: A subtle dark-grey line (<hr>)

HEADING: "[User/Settings Icon] PROFILE" (Icon + Text, uppercase, muted, small font)

Link: Profile Picture

Link: Watch Showreel

Link: Skills

DIVIDER: A subtle dark-grey line (<hr>)

LINK: "Socials" (Clickable, bold white text)

Footer Area (Pinned to bottom): "Logout" button. Use a standard logout Remixicon. Style both the icon and text in a distinct Red color (e.g., #FF4444) so it stands out.

Step 3: The Top Navigation (TopBar.tsx)
Create a TopBar component to sit at the very top of the right column (Main Workspace).

Theme: Solid white background (#ffffff), very subtle bottom border (1px solid #e5e7eb), generous padding.

Layout: Flexbox space-between.

Left Side: Page Title (hardcode to "Home" or "Overview" for now).

Right Side: User Profile cluster (A standard user Remixicon and the text "Danny").

Step 4: The Placeholder Content (page.tsx)
Update src/app/dashboard/page.tsx to render inside the layout.

The main canvas should be clean and mostly empty for now.

Add a simple white card (using CSS modules for padding, border-radius, and a subtle drop shadow).

Add placeholder text inside the card: "Welcome home, Danny. Select a module from the sidebar to begin editing."

Step 5: Mobile Responsiveness
In layout.module.css and the respective component CSS, ensure that on mobile screens (< 768px), the sidebar is hidden by default, and the right column expands to 100% width. Add a simple hamburger icon to the TopBar on mobile to represent opening the menu (no need to script the open/close logic just yet, just get it visually placed).

Open a Draft PR once the static dashboard layout is pixel-perfect.