📋 PHASE 8: SOCIALS MODULE & TOAST SYSTEM
Role: Premium React UI Engineer

🛑 CRITICAL CONTEXT & RULES
TECH STACK: Next.js (App Router), react-hot-toast.
STYLING: Strictly Vanilla CSS Modules. DO NOT use Tailwind CSS.
ICONS: Use Remixicons (<i> tags).
RESPONSIVENESS: All layouts must be fully responsive (Mobile, Tablet, Desktop).

🎯 The Goal

Implement react-hot-toast for global notifications using their default, out-of-the-box styles.
Build the "Socials" CMS module featuring individual field commits and a smart "Commit All" batch action.

🛠️ Execution Steps

Step 1: Install & Configure React Hot Toast
Add react-hot-toast to the project dependencies.
Add the <Toaster /> component to the main layout (dashboard/layout.tsx). Position it at bottom-right.

Step 2: The Socials Page Header & "Commit All" (src/app/dashboard/socials/page.tsx)
Header Layout: Flex space-between. Title on the left, "Commit All" button on the right.
"Commit All" Button Logic: * Default: Greyed out (disabled, unclickable).
Active: Solid Green (#10B981), clickable. Only active when editedFieldsCount > 1.
Action: Triggers toast.success('All changes successfully committed!').

Step 3: The Socials Form Grid (Socials.module.css)
Build fields for Email, X (Twitter), LinkedIn, Instagram, and YouTube.
Row Layout: 1. Platform Icon (Remixicon)
2. Text Input Field
3. Individual "Commit" Button (Solid Blue #2060FF).

Mobile Layout (< 768px): Stack or wrap elements elegantly so the row does not break off-screen.
Action: Clicking an individual Blue Commit button triggers toast.success('Commit successful!').

Step 4: Form State Management
Use React useState to track initialValues vs currentValues (use mock data for now).
Compute editedFieldsCount to control the "Commit All" button state.

Add a temporary test button at the bottom of the page to trigger toast.error('Commit failed.') and toast('Partial commit', { icon: '⚠️' }) so we can visually verify them.

Open a Draft PR once complete.