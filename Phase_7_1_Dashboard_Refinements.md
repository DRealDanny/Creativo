📋 PHASE 7.1: DASHBOARD REFINEMENTS & SECURITY

Role: Premium React/Backend Engineer

🛑 CRITICAL CONTEXT & RULES

TECH STACK: Next.js (App Router), NextAuth.js.

STYLING: Strictly Vanilla CSS Modules. DO NOT use Tailwind CSS.

STATE MANAGEMENT: Handle the mobile menu toggle elegantly, ensuring client-side state correctly applies the active CSS module class.

🎯 The Goal

Fix three specific issues from the previous phase: implement strict route protection, fix the mobile sidebar toggle state, and hide the Next.js development indicator.

🛠️ Execution Steps

Step 1: Strict Route Protection (Middleware)

Create a middleware.ts file in the root of the project.

Configure it to use next-auth/middleware to strictly protect the /dashboard route and any nested paths.

If an unauthenticated user attempts to access /dashboard directly via the URL, it MUST instantly redirect them back to /login.

Step 2: Hide Next.js Dev Indicator

Open next.config.mjs (or .js).

Add the configuration to completely disable the development indicators:

devIndicators: {
  appIsrStatus: false,
  buildActivity: false,
}


Step 3: Fix Mobile Menu Toggle State

The hamburger icon in TopBar.tsx is currently not opening the Sidebar.tsx on mobile viewports.

Because layout.tsx coordinates both components, ensure there is a proper client-side state mechanism (like lifting state to a DashboardLayoutWrapper client component, or using a simple Context) to pass the isOpen state and setIsOpen toggle.

Ensure the Sidebar correctly receives this state and dynamically applies the necessary CSS Module class (e.g., className={`${styles.sidebar} ${isOpen ? styles.open : ''}`}) so the CSS transform/transition works on mobile.

Open a Draft PR once these three specific issues are resolved.