📋 PHASE 4: PREMIUM PAGE TRANSITIONS (FRAMER MOTION)

Role: Premium React Motion Engineer

🛑 CRITICAL CONTEXT (READ FIRST)

The <CurtainTransition> component is already built and working perfectly. DO NOT MODIFY OR TOUCH the <CurtainTransition> component or its CSS. Leave the curtain animation exactly as it is.

🎯 The Goal

We are upgrading our routing to use framer-motion. We need the old page to fade out, the scroll-to-top to happen instantly while the screen is blank, and the new page to fade in seamlessly underneath our existing curtain animation.

🛠️ Execution Steps

Step 1: Create the Page Transition Wrapper
Create a new file at frontend/src/components/PageTransition.jsx.
Use Framer Motion to build a wrapper that handles the fade-in and fade-out states.

import { motion } from 'framer-motion';

const PageTransition = ({ children }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      style={{ width: '100%' }}
    >
      {children}
    </motion.div>
  );
};

export default PageTransition;


Step 2: Update App.jsx for AnimatePresence
In your App.jsx (or wherever your <Routes> are defined), implement Framer Motion's <AnimatePresence> to manage the page unmounting.

Import AnimatePresence from framer-motion.

Import the new PageTransition component.

Make sure you are using const location = useLocation();.

Wrap your <Routes> in <AnimatePresence mode="wait">. The mode="wait" is critical—it forces the old page to completely fade out before the new page renders.

CRITICAL: You must pass location={location} and key={location.pathname} directly to the <Routes> element so Framer Motion knows when the route changes.

Wrap the component inside every <Route element={...}> with <PageTransition>.

Example Structure:

{/* Fix the console warning by prefixing the curtain key */}
<CurtainTransition key={`curtain-${location.pathname}`} />

<AnimatePresence mode="wait">
  <Routes location={location} key={location.pathname}>
    <Route path="/" element={<PageTransition><Home /></PageTransition>} />
    <Route path="/about" element={<PageTransition><About /></PageTransition>} />
    {/* Update all existing routes this way */}
  </Routes>
</AnimatePresence>


Step 3: Clean up old CSS
If there is a .page-content-wrapper CSS animation in style.css from a previous iteration, delete it. Framer Motion handles this entirely now.

Open a Draft PR once the <AnimatePresence> logic is implemented and the pages smoothly cross-fade underneath the curtain without any harsh scrolling snaps.