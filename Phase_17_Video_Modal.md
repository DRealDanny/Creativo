📋 PHASE 17: VIDEO REEL MODAL INTEGRATION

Role: Premium React UI/UX Engineer
Reference: Must strictly follow JULES_MASTER_RULES.md.

🎯 The Goal

Enhance the UX of the Video Editing Case Study template. Instead of the "Watch Reel" button linking away to an external URL, it must open a seamless, in-page video modal—cloning the exact behavior and styling of the "Watch Showreel" modal from the Homepage.

🛠️ Execution Steps

Step 1: Clone the Modal Logic

Open frontend/src/pages/Home.jsx (or wherever the Homepage Showreel modal is located).

Analyze how the React state (useState) and the modal JSX (the dark overlay and the iframe) are built.

Step 2: Inject State into the Case Study Template

Open frontend/src/pages/CaseStudyVideoEditing.jsx.

Import useState.

Set up the boolean state to control the modal (e.g., const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);).

Step 3: Refactor the "Watch Reel" Button

Locate the "Watch Reel" <a href> tag in the Hero section of the template.

Convert it into a <button> (or attach an onClick handler to the existing anchor/button structure).

Remove the href attribute so it doesn't navigate away.

Wire the onClick event to set isVideoModalOpen to true.

Step 4: Inject the Modal UI

Paste the cloned modal JSX at the bottom of the CaseStudyVideoEditing.jsx return block.

The Video Source: Bind the <iframe> src attribute to the fetched caseStudyHero.heroWatchReelLink data instead of the homepage link.

The Close Action: Ensure clicking the dark background overlay or a close button sets isVideoModalOpen to false.

Audio Cleanup (CRITICAL): Ensure that when the modal is closed, the iframe is completely unmounted from the DOM (e.g., {isVideoModalOpen && ( <div className="modal">...</div> )}) so the Vimeo audio instantly stops playing in the background.

Open a Draft PR once the modal successfully opens, plays the specific project's reel, and closes perfectly.