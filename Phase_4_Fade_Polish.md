📋 PHASE 4: ROUTE TRANSITION POLISH & BUG FIX

Role: Premium React Motion Engineer

🛑 CRITICAL CONTEXT (READ FIRST)

The <CurtainTransition> component is already built and working perfectly on route changes. DO NOT MODIFY OR TOUCH the internal logic or CSS of the <CurtainTransition> component. Leave the curtain animation exactly as it is.

🎯 The Goals

Fix the React Key Error: We have a console error: Encountered two children with the same key. We need to ensure all elements using location.pathname as a key have unique string prefixes.

Hide the Scroll Snap: The new page visually "snaps" to the top while the curtain is moving. We will hide this by forcing the actual page content to fade in smoothly underneath the curtain.

🛠️ Execution Steps

Step 1: The Global CSS
Add the following CSS to our global stylesheet to handle the page content fade:

@keyframes pageContentFadeIn {
  0% { opacity: 0; }
  30% { opacity: 0; } /* Hold invisibility for a moment to hide the scroll snap */
  100% { opacity: 1; }
}

.page-content-wrapper {
  animation: pageContentFadeIn 0.8s ease-in-out forwards;
  width: 100%;
}


Step 2: Update App.jsx (Fix Keys & Add Wrapper)
Find the component where the <Routes> are rendered (usually App.jsx or a layout component). Update the rendering structure to look EXACTLY like this:

{/* 1. Add a 'curtain-' prefix to the Curtain key to fix the duplicate key error */}
<CurtainTransition key={`curtain-${location.pathname}`} />

{/* 2. Wrap the Routes in the new fade wrapper, and give it a 'page-' prefix key */}
<div key={`page-${location.pathname}`} className="page-content-wrapper">
  <Routes>
    {/* Your existing routes stay here */}
  </Routes>
</div>


Step 3: ScrollToTop Verification
Ensure the <ScrollToTop /> component is properly firing window.scrollTo(0, 0) immediately on route change. Because the .page-content-wrapper starts at opacity: 0, this instant jump to the top will be completely invisible to the user.

Open a Draft PR once the console errors are gone and the page content smoothly fades in underneath the curtain on every route change.