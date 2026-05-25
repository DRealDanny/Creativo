📋 PHASE 8: SOCIALS MODULE & TOAST SYSTEM
Role: Premium React UI Engineer
🛑 CRITICAL CONTEXT & RULES
TECH STACK: Next.js (App Router), React Context.
STYLING: Strictly Vanilla CSS Modules. DO NOT use Tailwind CSS.
ICONS: Use Remixicons (<i> tags).
TERMINOLOGY: Use "Commit" instead of "Save" or "Publish".
RESPONSIVENESS: All layouts must be fully responsive (Mobile, Tablet, Desktop) using standard CSS media queries (@media (max-width: 768px)).
🎯 The Goal
Build a global Toast Notification system (Green, Red, Yellow, Blue) that auto-dismisses after 3 seconds.
Build the "Socials" CMS module featuring individual field commits and a smart "Commit All" batch action.
🛠️ Execution Steps
Step 1: The Global Toast Context (src/components/Toast/)
Create ToastContext.tsx, Toast.tsx, and Toast.module.css.
Styling Requirements: * Desktop: Position bottom-right, no close button, auto-dismiss after 3000ms with smooth CSS slide-in.
Mobile (< 768px): Position bottom-center or top-center, width calc(100% - 32px) to prevent horizontal overflow.
The 4 Variants:
Success (Green): "All Commits Successful" | "All your changes have been successfully deployed to the live site."
Error (Red): "Commit Failed" | "There was an error saving your changes. Please check the fields and try again."
Warning (Yellow): "Partial Commit Successful" | "This change is live, but you still have unsaved edits pending."
Info (Blue): "Commit Successful" | "Your change has been securely saved and deployed."
Wrap the dashboard layout with ToastProvider.
Step 2: The Socials Page Header & "Commit All" (src/app/dashboard/socials/page.tsx)
Create a page-level header (inside the page content area, at the top).
Layout: Flex space-between. On mobile, ensure the title and button scale appropriately.
Right Side: "Commit All" button.
Default State: Greyed out (disabled CSS state, lowered opacity, unclickable).
Active State: Solid Green (#10B981), clickable.
Logic: Only active when editedFieldsCount > 1.
Action: Triggers the Green Toast.
Step 3: The Socials Form Grid (Socials.module.css)
Build a list of fields for Email, X (Twitter), LinkedIn, Instagram, and YouTube.
Row Layout (Desktop): Each row MUST contain:
Platform Icon (Remixicon)
Text Input Field (Flex-grow to fill space)
Individual "Commit" Button (Solid Blue #2060FF, matching the login button style).
Row Layout (Mobile < 768px): Ensure the row adapts elegantly. If space is too tight, wrap the "Commit" button to the next line below the input, stretching it to 100% width, or use a stacked flex layout.
Action: Clicking an individual Blue Commit button triggers the Blue Toast.
Step 4: Form State Management
Use React useState and useEffect to track the initialValues versus currentValues.
Create a computed variable (e.g., const editedFieldsCount = ...) that counts how many inputs currently differ from their initial state to power the Green button's logic.
Open a Draft PR once the Toast system is functional, fully responsive, and the smart Socials page UI is built.