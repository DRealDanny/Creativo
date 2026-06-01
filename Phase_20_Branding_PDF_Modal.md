Phase 20: Branding Case Study PDF Document Modal

1. Objective

Implement a premium modal overlay in CaseStudyBranding.jsx specifically optimized for viewing multi-page PDF documents (like Brand Guidelines) without leaving the page.

2. The Document Viewer UI (frontend/src/pages/CaseStudyBranding.jsx)

State Management: Introduce React state (isOpen, setIsOpen) to toggle the modal via the primary Call-to-Action button on the page.

Backdrop Styling: Use the same premium backdrop from the video template: a fixed overlay with a dark background and backdrop blur (fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md).

Container Sizing (The Fix): Do NOT use aspect-video. The inner container must be designed for vertical scrolling documents. Use viewport-relative sizing so it is massive on desktop and fills the screen on mobile (e.g., relative w-[95vw] md:w-[85vw] max-w-6xl h-[90vh] bg-slate-900 rounded-xl overflow-hidden shadow-2xl).

The Close Button: Place a highly visible, absolute-positioned 'X' or Close icon in the top right corner of the screen or container so the user can easily exit the document.

3. PDF Implementation

Inside the modal container, render an <iframe> to display the PDF.

The iframe should take up the entire container (className="w-full h-full border-none").

The src of the iframe should map to a PDF URL provided in the Branding JSON data (e.g., project.pdfLink or project.documentUrl).