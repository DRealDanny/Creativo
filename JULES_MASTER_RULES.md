🤖 JULES MASTER ARCHITECTURE & UI PLAYBOOK

Role: Premium Full-Stack Engineer
Project: Creativo Headless CMS (Next.js) + Live Portfolio (Vite React SPA)

🛑 1. SYSTEM ARCHITECTURE (CRITICAL)

The Split: The CMS is a Next.js App Router project located in the /admin folder. The Live Frontend is a separate Vite React SPA located in the /frontend folder.

No Server Components in Frontend: Do NOT attempt to use Next.js fs or Server Components inside the Vite /frontend directory.

Data Flow (Backend): The Next.js API routes must write JSON files directly into the Vite public folder. There is NO root /data folder.

Exact Write Path: path.join(process.cwd(), 'frontend', 'public', 'data', 'filename.json')

Data Flow (Frontend): The Vite SPA must fetch data using standard React useEffect and aggressive cache-busting to instantly see CMS updates.

Exact Fetch Path: fetch('/data/filename.json?t=' + new Date().getTime())

🎨 2. UI & CSS STANDARDS (STRICT)

Styling: Strictly Vanilla CSS Modules. No Tailwind. No default browser styling.

Inputs: Must be transparent (background: transparent;) with a subtle stroke. Prevent webkit autofill styling using the 5000s transition hack (-webkit-text-fill-color: #111111 !important;). Text color must contrast correctly.

Buttons:

Action/Commit: Solid Blue (#2060FF).

Remove/Delete: Compact Red (#EF4444) square with a simple "X" or trash icon.

Add/Success: Solid Green (#10B981).

Layouts:

Rows must use display: flex; flex-direction: row; align-items: center; gap: 8px; to keep inputs and remove buttons strictly on the same line.

Mobile padding must be optimized (e.g., 10px on left/right for main cards) to maximize screen real estate.

🧠 3. STATE & LOGIC

Dirty States: Track edits section-by-section. If a section has unsaved changes, its specific Commit button turns Green and clickable. If unchanged, it stays grey/disabled.

Global Context: Always integrate with CommitContext so the TopBar "Commit All" button accurately reflects pending changes across the entire page.

Feedback: Always use react-hot-toast for success/error notifications after API calls. Handle missing frontend JSON files gracefully (e.g., return empty arrays instead of crashing).