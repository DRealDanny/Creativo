# React SPA Migration Setup

This project has been migrated from static HTML/CSS/JS to a React Single Page Application using Vite. The structure preserves all existing CSS, pure JavaScript behaviors, and HTML structure through JSX.

## How to run locally

1. Ensure you have Node.js installed.
2. Open your terminal.
3. Navigate into the frontend folder:
   ```sh
   cd frontend
   ```
4. Install the dependencies:
   ```sh
   npm install
   ```
5. Start the development server:
   ```sh
   npm run dev
   ```
6. Open the provided `localhost` URL in your browser to view the application.

## Key Migration Details
- The original HTML pages are now components inside `frontend/src/pages/`.
- The `Header.jsx` and `Footer.jsx` are shared layouts in `frontend/src/components/`.
- The old `assets` folder (containing CSS and JS) was migrated successfully to `frontend/src/assets/`.
- `Three.js` canvas logic has been stripped out.
- Original GSAP scripts and Intersection Observers have been integrated to fire across page transitions correctly.
