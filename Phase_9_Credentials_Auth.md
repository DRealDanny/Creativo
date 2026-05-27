📋 PHASE 9: CREDENTIALS AUTHENTICATION

Role: Premium Backend Security & React Engineer

🛑 CRITICAL CONTEXT & RULES

TECH STACK: Next.js (App Router), NextAuth.js, react-hot-toast.

STYLING: Strictly Vanilla CSS Modules.

SECURITY: DO NOT hardcode credentials in the NextAuth configuration. Use environment variables.

🎯 The Goal

Wire up the existing UI login form to authenticate using NextAuth's CredentialsProvider, utilizing .env variables for authorization and react-hot-toast for error handling.

🛠️ Execution Steps

Step 1: Environment Variables Setup

Instruct the user to add ADMIN_USERNAME and ADMIN_PASSWORD to their .env.local file. (Do not write the actual passwords in the code).

Step 2: Update NextAuth Configuration (src/app/api/auth/[...nextauth]/route.ts)

Import and add CredentialsProvider to the providers array alongside the existing Google Provider.

Configure the authorize function to securely compare the submitted credentials against process.env.ADMIN_USERNAME and process.env.ADMIN_PASSWORD.

If the credentials match, return a hardcoded admin user object (e.g., { id: "1", name: "Danny", email: "admin@creativocreates.com" }). If they fail, return null.

Step 3: Wire Up the Login UI (src/app/login/page.tsx or equivalent)

Convert the login form component to a Client Component ("use client";) if it isn't already.

Use React useState to manage the username and password input values.

On form submission, call NextAuth's signIn('credentials', { username, password, redirect: false }).

Step 4: Error Handling with Toasts

Evaluate the response from the signIn call.

If response?.error exists, trigger a toast.error('Invalid username or password.').

If successful, use next/navigation router to programmatically push the user to /dashboard and trigger a toast.success('Login successful!').

Open a Draft PR once the Credentials provider is completely wired up to the frontend UI.