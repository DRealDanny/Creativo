📋 PHASE 7.2: STRICT SESSION SECURITY

Role: Premium Backend Security Engineer

🛑 CRITICAL CONTEXT & RULES

TECH STACK: Next.js (App Router), NextAuth.js.

OBJECTIVE: Override the default 30-day NextAuth persistent session. We require a highly secure, volatile session for this CMS.

🛠️ Execution Steps

Step 1: Update NextAuth Configuration
Open src/app/api/auth/[...nextauth]/route.ts (or your NextAuth config file).

Step 2: Enforce strict Session Limits
Add a session object to the NextAuth configuration to reduce the absolute maximum age of the session to 2 hours (in seconds: 2 * 60 * 60), and ensure it uses the JWT strategy.

  session: {
    strategy: "jwt",
    maxAge: 2 * 60 * 60, // 2 hours hard limit
  },


Step 3: Force a Browser "Session" Cookie
By default, NextAuth sets an Expires date on its cookies, making them persistent across browser restarts. We need to override the cookie policy to omit the maxAge/expires attribute on the session token. This forces the browser to treat it as a true "Session Cookie" that is destroyed the moment the browser application is completely closed.

Add a cookies object to the NextAuth options to override sessionToken.

Retain httpOnly: true, sameSite: 'lax', and path: '/'.

DO NOT include maxAge in the cookie options.

Open a Draft PR once the NextAuth configuration is updated to strictly enforce these session rules.