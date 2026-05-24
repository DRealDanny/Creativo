📋 PHASE 3: ROUTING UX POLISH & CURTAIN TRANSITION

Role: Premium React Motion Engineer

Task: Enhance the SPA routing experience by implementing instant scroll-restoration and a premium "Staggered Curtain" reveal animation on route changes.

1. Instant Scroll Restoration

Currently, navigating between pages leaves the user at their previous scroll depth.

Create a new component frontend/src/components/ScrollToTop.jsx.

Use useLocation from react-router-dom.

Set up a useEffect that triggers window.scrollTo(0, 0) every time the pathname changes.

Import and place <ScrollToTop /> inside App.jsx (inside <BrowserRouter> but outside <Routes>).

2. Premium Staggered Curtain Reveal

Instead of a simple fade, implement a 4-split vertical curtain that slides up to reveal the new page.

Step A: The CSS (Add to global styles)
Create these exact styles to power the 4 columns:

@keyframes slideCurtainUp {
  0% { transform: translateY(0); }
  100% { transform: translateY(-100%); }
}

.curtain-overlay {
  position: fixed;
  inset: 0;
  z-index: 9999;
  display: flex;
  pointer-events: none; /* Allows clicking through after animation */
}

.curtain-panel {
  flex: 1;
  height: 100%;
  background-color: var(--primary, #0000ff); /* Fallback to blue if variable missing */
  transform: translateY(0);
  animation: slideCurtainUp 0.8s cubic-bezier(0.77, 0, 0.175, 1) forwards;
}

/* Stagger the animation delays */
.curtain-panel:nth-child(1) { animation-delay: 0s; }
.curtain-panel:nth-child(2) { animation-delay: 0.1s; }
.curtain-panel:nth-child(3) { animation-delay: 0.2s; }
.curtain-panel:nth-child(4) { animation-delay: 0.3s; }


Step B: The React Component

Create frontend/src/components/CurtainTransition.jsx.

The component should render the .curtain-overlay wrapper containing four .curtain-panel divs.

Step C: Triggering in App.jsx

Import CurtainTransition and useLocation into App.jsx.

Place <CurtainTransition key={location.pathname} /> directly inside your layout, above your <Routes>.

CRITICAL: Passing key={location.pathname} forces React to completely destroy and recreate the curtain component every time the URL changes. This perfectly syncs the slide-up animation with the ScrollToTop action!

Open a Draft PR once the scroll restoration and curtain animations are working flawlessly.