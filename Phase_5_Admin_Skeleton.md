📋 PHASE 5: HEADLESS CMS - LOGIN UI SKELETON

Role: Premium React UI Engineer

🛑 CRITICAL CONTEXT & RULES

TECH STACK: Next.js (App Router).

STYLING: strictly Vanilla CSS Modules (login.module.css). DO NOT use Tailwind CSS.

ICONS: Do NOT install any icon packages. Strictly use the Remixicons CDN link in the layout file.

STRICT UI: ONLY include the exact text and fields requested below. DO NOT add "Forgot Password", "Remember Me", "Sign Up", or any top icons.

🎯 The Goal

Build a premium, responsive Login page inside the /admin Next.js application using a clean, solid white card aesthetic over the background image.

🛠️ Execution Steps

Step 1: Add Remixicons CDN

Open src/app/layout.tsx.

Add the Remixicons CDN link (https://cdn.jsdelivr.net/npm/remixicon@4.2.0/fonts/remixicon.css) into the <head>.

Step 2: Create the Login Route
Create:

src/app/login/page.tsx

src/app/login/login.module.css

Step 3: Build the UI Layout & Background
Build the layout in page.tsx matching these exact specifications:

Background: The full page should cover the viewport. Use url('/login-bg.jpg'), but add a dark overlay using a linear-gradient so the background image essentially appears at 30% opacity (e.g., background: linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url('/login-bg.jpg') center/cover;).

Form Container: Centered on the screen. It MUST be a solid white card (background: #ffffff;). Give it generous padding, a smooth border-radius, and a subtle soft drop shadow to lift it off the dark background (e.g., box-shadow: 0 20px 40px rgba(0,0,0,0.2);).

Typography: Because the card is white, use clean, sans-serif dark text (#111 or #333) for all headers, labels, and inputs inside the container.

Step 4: The Strict Content Structure

Headers: * Main: "Welcome Back"

Sub: "sign in to access your website content management system and control changes"

Inputs: * Username input field (with light border and dark text).

Password input field. Implement a React useState toggle with a Remixicon (ri-eye-line / ri-eye-off-line) to switch the input type between password and text.

Primary Action: A solid dark/black "Log In" button with white text.

Divider: An "Or" divider line (use a light gray line).

Secondary Action: A transparent/outlined "Sign In with Google" button with a Google Remixicon (ri-google-fill) on the left of the text.

Step 5: Responsiveness
Ensure the login.module.css uses media queries to scale the white card's width and padding down gracefully for Tablet and Mobile.

Step 6: Root Redirect
Update the main src/app/page.tsx to redirect to /login for now.

Open a Draft PR once the layout is perfect and the password toggle works.