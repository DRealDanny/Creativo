📋 PHASE 6: HEADLESS CMS - NEXTAUTH INTEGRATION

Role: Premium Backend/React Engineer

🛑 CRITICAL CONTEXT & RULES

TECH STACK: Next.js (App Router).

PACKAGE: Use standard next-auth (v4 is fine for stable App Router integration unless v5 is explicitly configured).

SECURITY: We are using Google Provider. We MUST restrict access so that ONLY the email defined in process.env.ADMIN_EMAIL is allowed to log in.

🎯 The Goal

Wire up the Google Sign-In button on the existing Login UI to securely authenticate the admin user via NextAuth.

🛠️ Execution Steps

Step 1: Install NextAuth

Run npm install next-auth inside the /admin directory.

Step 2: Create the Auth API Route

Create the NextAuth catch-all route: src/app/api/auth/[...nextauth]/route.ts.

Configure the GoogleProvider using GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET.

Add a signIn callback: Check if the user.email matches process.env.ADMIN_EMAIL. If it matches, return true. If not, return false (which will automatically reject unauthorized users).

Step 3: Update the Login UI

Open src/app/login/page.tsx.

Add "use client"; to the top of the file since we now need interactivity for the authentication functions.

Import signIn from next-auth/react.

Update the "Sign In with Google" button to have an onClick={() => signIn('google', { callbackUrl: '/dashboard' })}.

Step 4: Protect the Root

Create a simple src/app/dashboard/page.tsx with a basic "Welcome to Dashboard" placeholder text so we have somewhere to redirect to after a successful login.

Open a Draft PR once the next-auth package is installed and the API route is configured.


### Your Prompt for Jules:
```text
We are moving on to Phase 6. I need you to wire up the Google Sign-In button on our Login page using NextAuth. 

I have already created my `.env.local` file with my Google Client ID, Secret, and Admin Email. 

Please read the `Phase_6_NextAuth.md` file located in the root of the project and execute the backend authentication logic. Make sure the `signIn` callback is strictly configured to only allow the email I set in my environment variables.
