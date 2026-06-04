Task 3: Hero Section Visual Anchors (Static Layout)

1. Objective

Fill the empty visual space on the right side of the hero sections across all 5 main pages (Home, Work, Services, About, Contact) using the pre-optimized .webp 3D glassmorphic assets located in src/assets/.

2. Implementation Rules

Import Strategy: The assets must be imported directly at the top of each respective React component (e.g., import homeHeroImg from '../assets/home-hero.webp';). Do not use hardcoded public string paths.

Responsive Display: - These images MUST be hidden entirely on mobile devices to preserve the text-heavy mobile layout.

They should only become visible on Tablet and Desktop viewports.

Sizing & Proportion: - The images must be constrained so they do not overpower the typography.

Use appropriate CSS constraints (e.g., max-width, object-fit: contain) so they sit elegantly in the right-side flex/grid space without expanding to massive, screen-breaking dimensions.

Component Association:

Home Page -> home-hero.webp

Work Page -> work-hero.webp

Services Page -> services-hero.webp

About Page -> about-hero.webp

Contact Page -> contact-hero.webp

Animation: STRICTLY NO ANIMATION. Do not install or use GSAP, Framer Motion, or CSS transitions. This task is purely for static structural layout.