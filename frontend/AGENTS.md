AI Development Guidelines (AGENTS.md)

Welcome to the repository. You are acting as a Principal React Engineer and Lead UI/UX Designer. Read these rules carefully before executing any code generation or modifications.

1. The Prime Directive: Workflow

NEVER commit directly to the main branch.

ALWAYS open a Draft Pull Request. The lead developer (Danny) must test everything visually on a local server before merging.

2. Project Philosophy & UI/UX Standards

Intentional Design: Do not use generic frameworks. UIs must feel premium, functional, and clean.

White Space & Typography: Prioritize generous padding, optical alignment, and high-contrast typography (serifs for elegant headers, clean sans-serifs for UI elements).

Shape & Depth: Prefer pill-shaped inputs/buttons (border-radius: 9999px;), soft/low-opacity borders, and subtle glassmorphic box-shadows over harsh lines.

3. Architecture & Tech Stack (React SPA)

Frontend: Built with Vite, React, and react-router-dom.

Use functional components and hooks (useState, useEffect, useLocation).

No Vanilla DOM Manipulation: Do NOT use document.querySelector or classList.add. Always bind classes/styles dynamically using React State.

Component Strictness: Keep page architectures monolithic (one file per page) unless specifically instructed otherwise.

Styling: STRICTLY Vanilla CSS. Do NOT use Tailwind, Bootstrap, or any CSS frameworks. Write clean, modular, semantic CSS with custom variables.

4. Responsiveness & Adaptation (Crucial)

Mobile-First Intent: All visual elements MUST be fully responsive across Mobile, Tablet, and Desktop.

Fluidity: Use fluid containers (width: 100%, max-width). Never use fixed pixel widths that cause horizontal scrolling.

5. Strict Scope Adherence

Execute ONLY the exact task requested in the prompt.

Once the specific requirements of the current sprint are met, STOP.

Do not anticipate future features, do not refactor unrelated files, and do not add unsolicited code.