📋 PHASE 5: HEADLESS CMS - LOGIN UI SKELETON

Role: Premium React UI Engineer

🛑 CRITICAL CONTEXT & RULES

TECH STACK: Next.js (App Router).

STYLING: strictly Vanilla CSS Modules. DO NOT use Tailwind CSS. Write clean, intentional standard CSS.

ICONS: Do NOT install any icon packages. We will strictly use the Remixicons CDN.

🎯 The Goal

Build a premium, responsive Login page inside the /admin Next.js application using a Glassmorphism (frosted glass) aesthetic over a background image. This is strictly a UI build. Do not wire up actual authentication logic yet.

🛠️ Execution Steps

Step 1: Add Remixicons CDN

Open src/app/layout.tsx.

Add the Remixicons CDN link (e.g., https://cdn.jsdelivr.net/npm/remixicon@4.2.0/fonts/remixicon.css) into the <head> section so it is globally available.

Step 2: Create the Login Route
Create a new directory and files for the login page:

src/app/login/page.tsx

src/app/login/login.module.css

Step 3: Build the Glassmorphism UI
Build the layout in page.tsx matching these exact specifications:

Background: The full page should cover the viewport and use url('/login-bg.jpg') as its background image, properly centered and covering the screen.

Form Container: Centered on the screen. Use CSS backdrop-filter to create a glassmorphism effect (e.g., background: rgba(25, 25, 35, 0.4); backdrop-filter: blur(12px); border: 1px solid rgba(255, 255, 255, 0.1);).

Typography: Clean, sans-serif white text.

Step 4: The Content Structure

Headers: * Main: "Welcome Back"

Sub: "sign in to access your website content management system and control changes"

Inputs: * Username input field.

Password input field. Implement a React useState toggle with a Remixicon "Eye" / "Eye-off" class (ri-eye-line / ri-eye-off-line) to switch the input type between password and text.

Primary Action: A solid "Log In" button.

Divider: An "Or" divider line.

Secondary Action: A transparent/outlined "Sign In with Google" button with a Google Remixicon (ri-google-fill) on the left of the text.

Step 5: Responsiveness
Ensure the login.module.css uses media queries to scale the glass container width, padding, and font sizes down gracefully for Tablet and Mobile viewports.

Step 6: Root Redirect (Optional but helpful)
Update the main src/app/page.tsx to simply redirect to /login for now, so we don't see the default Next.js boilerplate.

Open a Draft PR once the visual layout is pixel-perfect and the password toggle works.