# Agent Brief: Creativo SPA Layer (Barba.js + GSAP Loader + Blue Curtain)

## Role and constraints

You are implementing a **custom SPA-style navigation layer** on an existing static portfolio site. You are a senior front-end engineer.

**Repository:** `Creativo` (GitHub folder `Creativo/`)

**Hard rules (from `AGENTS.md`):**
- Do **not** commit to `main`. Work on a feature branch and open a **Draft PR** only.
- **Vanilla HTML/CSS/JS only** — no React, Vue, Tailwind, etc.
- **Execute only this task.** Do not refactor unrelated code, redesign pages, or add features outside this scope.
- Preserve existing visual design, animations, and responsive behavior.

**Tech stack for this task:**
- **Routing:** [Barba.js](https://barba.js.org/) (`@barba/core` v2)
- **Animation:** GSAP 3.12.5 (already on CDN)
- **No new CSS frameworks**

---

## Project inventory (read before coding)

### Public pages (8 total)

| File | Notes |
|------|--------|
| `index.html` | Home — Three.js hero (`#heroCanvas`), `home.css`, showreel modal |
| `work.html` | Work filter UI — `work.css` |
| `about.html` | Tools tabs + accordion — `about.css` |
| `services.html` | `services.css` |
| `contact.html` | `contact.css` |
| `case-study/branding.html` | Uses `../` relative links today |
| `case-study/web-development.html` | Same |
| `case-study/video-editing.html` | Same |

### JS

- `js/main.js` — navbar, mobile menu, cursor, orb parallax, scroll reveal (IntersectionObserver), stats counter, showreel modal, scroll-to-top, work filter, tools tabs/accordion. **All init runs once on `DOMContentLoaded`.**
- `js/animation.js` — GSAP ScrollTrigger register, `initHeroCanvas()` (Three.js, **no cleanup/dispose today**), `initHeroEntrance()`. Home-only.

### CSS

- `css/global.css` — design tokens; `--blue: #2060FF`; `@keyframes word-rise` used by `.hero-word-inner`
- Page-specific: `home.css`, `work.css`, `about.css`, `services.css`, `contact.css`, `case-study.css`

### Server

- `.htaccess` — clean URLs: `/work` resolves to `work.html`; `.html` URLs 301 to extensionless

### Script load pattern (today)

- Home: Three.js + GSAP + ScrollTrigger + `main.js` + `animation.js`
- Other pages: GSAP + ScrollTrigger + `main.js` + `animation.js` (Three only on home)

---

## Objective (3 phases)

### Phase 1 — Session loader (once per session)

- Full-screen fixed loader on **first landing only**
- SVG wordmark: **CREATIVO.** — letters stagger-rise via clip-path (match existing `word-rise` hero feel); blue dot after letters
- GSAP exits loader (slide up + fade) after `window` `load` (and minimum animation time)
- **`sessionStorage`** flag so loader never runs again in same tab session
- Loader sits **above** everything (`z-index` > curtain)

### Phase 2 — Barba seamless routing

- Barba intercepts **all internal** same-origin navigations (nav, footer, in-content links, buttons-as-links)
- No full browser reload for internal pages
- External links (`target="_blank"`, `mailto:`, `https://` social) must **not** be hijacked

### Phase 3 — Blue curtain transition (`#2060FF`)

- Fixed `.transition-curtain` — default `transform: translateY(100%)` (hidden below viewport)
- **Leave:** curtain → `translateY(0%)` (covers screen)
- **Swap:** Barba replaces container HTML behind curtain
- **Enter:** curtain → `translateY(-100%)` (exits top), revealing new page
- **Reset:** instant `translateY(100%)` with `duration: 0` after enter completes
- Curtain color: **`#2060FF`** (`var(--blue)` in `global.css`)

---

## Architecture decisions (non-negotiable)

### 1. New orchestration file

Create **`js/barba-transitions.js`** — single owner of:

- Loader lifecycle
- Barba init + transitions
- Curtain GSAP timeline
- `sessionStorage` loader gate
- Calls into refactored `main.js` / `animation.js` inits
- ScrollTrigger kill + Three.js cleanup on leave
- Dynamic page CSS injection (see pitfall #1)

### 2. Refactor inits for re-run safety

**`js/main.js`**

- Extract every `init*` into named functions (already mostly done)
- Export a single public API, e.g.:

```js
window.Creativo = window.Creativo || {};
Creativo.initPage = function () { /* all inits */ };
Creativo.destroyPage = function () { /* cleanup */ };
```

- **`destroyPage` must:**
  - `ScrollTrigger.getAll().forEach(t => t.kill())` if ScrollTrigger exists
  - Remove duplicate `window` scroll/mouse listeners added by previous inits (see pitfall #3)
  - Disconnect any `IntersectionObserver` instances (store observer ref on `Creativo._revealObserver` and disconnect in destroy)
  - Cancel `requestAnimationFrame` loops from cursor/orb/stats if re-init would stack them

- Replace bare `DOMContentLoaded` auto-init with:

```js
if (!window.__CREATIVO_BARBA__) {
  document.addEventListener('DOMContentLoaded', () => Creativo.initPage());
}
```

(`barba-transitions.js` sets `__CREATIVO_BARBA__` and calls `initPage` itself.)

**`js/animation.js`**

- Extract `destroyHero()` that:
  - Cancels Three.js `requestAnimationFrame` loop (store `rafId`)
  - `renderer.dispose()`, remove canvas from `#heroCanvas`, clear container
  - Kill any animation-specific GSAP timelines/tweens targeting hero elements
- `Creativo.initHomeAnimations = () => { initHeroCanvas(); initHeroEntrance(); }`
- `Creativo.destroyHomeAnimations = destroyHero`
- Do **not** auto-run on `DOMContentLoaded` when Barba is active — Barba `enter` hook calls home init only when namespace is `home`

### 3. Root-relative internal URLs everywhere

Replace **all** internal `href`s across 8 pages:

| Before (examples) | After |
|-------------------|--------|
| `index.html`, `work.html` | `/`, `/work`, `/about`, `/services`, `/contact` |
| `../index.html` (case studies) | `/` |
| `../work.html` | `/work` |
| `case-study/branding.html` | `/case-study/branding` |
| `../css/global.css` in case-study `<head>` | `/css/global.css` (and same for other assets) |

**Why:** Barba `fetch()` resolves from site root; `../` breaks inconsistently by depth.

**Note:** `.htaccess` serves extensionless URLs. Prefer extensionless paths in links (`/work` not `/work.html`) to avoid 301 + double-fetch. Barba `href` matcher must accept both if legacy links remain.

Also update **`initNavbar` active-link logic** in `main.js` to normalize paths without `.html` and with trailing slashes.

### 4. Barba DOM contract (critical structure)

Apply to **all 8 HTML files**:

```html
<body data-barba="wrapper">
  <!-- PERSISTENT (outside container) -->
  <div id="site-loader" aria-hidden="true">...</div>
  <div class="transition-curtain" aria-hidden="true"></div>
  <div class="cursor-dot">...</div>
  <div class="cursor-ring">...</div>
  <div class="noise-layer">...</div>
  <div class="orb-container">...</div>
  <nav class="nav">...</nav>
  <div class="mobile-menu">...</div>
  <div class="nav-backdrop">...</div>

  <main data-barba="container" data-barba-namespace="home|work|about|...">
    <!-- ONLY this block swaps -->
  </main>

  <!-- DECISION: footer inside or outside container -->
  ...
</body>
```

**Recommendation:** Keep **`<footer>` inside `data-barba="container"`** so footer content can differ per page, OR keep outside if identical on all pages (Creativo footers look structurally identical — either works; **pick one and apply consistently on all 8 files**).

**Do NOT put inside container:** loader, curtain, cursor, orbs, nav (avoids re-binding nav listeners every transition).

Set unique `data-barba-namespace` per page:

- `home`, `work`, `about`, `services`, `contact`, `case-branding`, `case-web`, `case-video`

### 5. Page-specific CSS with Barba (mandatory)

**Barba only swaps the container DOM. It does NOT apply `<link>` tags from the fetched page's `<head>`.**

If you only swap `<main>` and user navigates Home → Work, **`work.css` never loads** → broken layout.

**Required fix in `barba-transitions.js`:**

```js
const PAGE_STYLES = {
  home: ['/css/home.css'],
  work: ['/css/work.css'],
  about: ['/css/about.css'],
  services: ['/css/services.css'],
  contact: ['/css/contact.css'],
  'case-branding': ['/css/case-study.css'],
  'case-web': ['/css/case-study.css'],
  'case-video': ['/css/case-study.css'],
};
```

On `beforeEnter` / `afterEnter`:

- Remove previous dynamic `<link data-barba-style>` tags
- Inject current namespace stylesheets
- Always keep `global.css`, `tablet-res.css`, `mobile-res.css` in static `<head>` on every page (root-relative `/css/...`)

### 6. Script tags and CDN order

Add to **all 8 pages** before `main.js`:

```html
<script src="https://unpkg.com/@barba/core@2.9.7/dist/barba.umd.js" defer></script>
<script src="js/barba-transitions.js" defer></script>
```

Keep GSAP before Barba orchestration. Home keeps Three.js.

**Load order:**

1. GSAP (+ ScrollTrigger)
2. Three (home only)
3. `main.js`
4. `animation.js`
5. `barba-transitions.js` (initializes Barba on `DOMContentLoaded`)

Set `window.__CREATIVO_BARBA__ = true` at top of `barba-transitions.js`.

### 7. Loader SVG behavior

Build inline SVG in `#site-loader`:

- Letters: `C R E A T I V O` + `.` as separate groups
- Each letter masked with `clipPath` rect animating like `word-rise` (GSAP `yPercent` on inner group or `clip-path` animation)
- Dot: brand blue `#2060FF`, animates after letter stagger
- Timeline: letters → dot → pause ~0.4s → exit loader (`yPercent: -100`, `opacity: 0`, `duration ~0.9`, `ease: power3.inOut`)
- On loader complete: `sessionStorage.setItem('creativo-loader-done', '1')`, remove `is-loading` from `body`, `ScrollTrigger.refresh()` if needed

**Skip loader when:**

```js
if (sessionStorage.getItem('creativo-loader-done')) {
  // hide loader immediately (display:none or class is-done)
}
```

Use `window.addEventListener('load', ...)` plus `document.fonts.ready` if Bebas/Syne needed for SVG text metrics.

### 8. Curtain GSAP timeline (Barba v2)

Use **synchronous** transition hooks and return Promises:

```js
barba.init({
  transitions: [{
    name: 'curtain',
    async leave(data) {
      await gsap.to(curtain, { yPercent: 0, duration: 0.55, ease: 'power3.inOut' });
      Creativo.destroyPage?.();
      Creativo.destroyHomeAnimations?.();
    },
    async enter(data) {
      // container already swapped
      Creativo.initPage();
      if (data.next.namespace === 'home') Creativo.initHomeAnimations();
      document.getElementById('footerYear').textContent = new Date().getFullYear();
      await gsap.to(curtain, { yPercent: -100, duration: 0.55, ease: 'power3.inOut' });
      gsap.set(curtain, { yPercent: 100 }); // instant reset
      ScrollTrigger.refresh();
    }
  }]
});
```

Tune `yPercent` vs `translateY(100%)` — use **one transform model** (prefer GSAP `yPercent` consistently).

**`z-index` stack:**

- Loader: `10000`
- Curtain: `9990`
- Nav: existing (~100)
- Modal: must be **above container** but **below loader**; verify showreel still works on home

### 9. Barba link rules

```js
barba.init({
  prevent: ({ el }) => {
    if (el.matches('[data-barba-prevent]')) return true;
    if (el.target === '_blank') return true;
    if (el.href.startsWith('mailto:')) return true;
    if (el.origin !== window.location.origin) return true;
    if (el.href.endsWith('#') || el.getAttribute('href') === '#') return true;
    return false;
  }
});
```

Add `data-barba-prevent` to:

- Showreel trigger if it's `<a href="#">`
- Any placeholder `#` CTAs
- Admin/backend links if present

### 10. Scroll and history

In `afterEnter`:

- `window.scrollTo(0, 0)` (Barba may not reset scroll)
- Close mobile menu if open (remove `.open` classes)
- Update `document.title` from fetched HTML (`data.next.html` parse `<title>` in hook, or use Barba `data.next.page` if available)

### 11. `animation.js` ScrollTrigger note

Today ScrollTrigger is registered but **scroll reveals use CSS + IntersectionObserver in `main.js`**, not ScrollTrigger scroll animations. Still call `ScrollTrigger.kill()` on leave as future-proofing.

**Do NOT** apply `gsap.set()` to `[data-reveal]` elements (documented warning in `animation.js`).

### 12. Home Three.js

`initHeroCanvas()` currently:

- No dispose
- Runs `requestAnimationFrame` forever
- Appends renderer without checking existing canvas

On leave from `home`:

- **Must** destroy WebGL context and cancel RAF
On re-enter home:
- Re-init only if `#heroCanvas` exists and width > 1024

### 13. CSS additions in `global.css`

```css
#site-loader { position: fixed; inset: 0; z-index: 10000; ... }
#site-loader.is-hidden { pointer-events: none; visibility: hidden; }
body.is-loading { overflow: hidden; }
.transition-curtain {
  position: fixed; inset: 0;
  background: #2060FF;
  z-index: 9990;
  transform: translateY(100%);
  pointer-events: none;
}
```

Use `will-change: transform` sparingly on curtain only during transition.

---

## Files to touch (checklist)

| File | Action |
|------|--------|
| `js/barba-transitions.js` | **Create** |
| `js/main.js` | Refactor init/destroy; fix navbar path matching |
| `js/animation.js` | Refactor home init/destroy |
| `css/global.css` | Loader + curtain styles |
| `index.html` | Barba attrs, root links, loader markup, scripts |
| `work.html` | Same |
| `about.html` | Same |
| `services.html` | Same |
| `contact.html` | Same |
| `case-study/*.html` (×3) | Same + root asset paths |
| `.htaccess` | **Do not change** unless Barba fetch breaks (test first) |

**Do not touch:** `backend-admin/*`, unrelated CSS redesigns.

---

## Mistakes to avoid (read twice)

1. **Assuming Barba loads new CSS** — it doesn't. Dynamic stylesheet injection per namespace is mandatory.

2. **Putting nav inside container** — duplicates listeners, breaks mobile menu state, flickers active link.

3. **Re-init without destroy** — doubled scroll/mousemove listeners, multiple RAF loops, memory leaks, jittery cursor/orbs.

4. **Leaving Three.js running** — WebGL leaks when leaving home; second visit may show blank or double canvas.

5. **Running loader on every navigation** — must be `sessionStorage` once per session only.

6. **Curtain same color as background** — use `#2060FF`, not near-black.

7. **Relative `../` links in case studies** — will break under Barba fetch from root.

8. **Inline `<script>document.getElementById('footerYear')...`** in container — won't re-fire; set year in `enter` hook.

9. **`gsap.set` on `[data-reveal]`** — breaks CSS reveal system.

10. **Executing scripts inside swapped HTML** — Barba won't run them; all logic must live in external JS called from hooks.

11. **Forgetting `ScrollTrigger.refresh()`** after enter — misaligned triggers if any added later.

12. **Blocking transition on slow images** — curtain should animate on click; don't wait for all images unless using `prefetch` plugin intentionally.

13. **Prefetching wrong URLs** — if using `@barba/prefetch`, prefetch extensionless paths consistent with links.

14. **Testing only on `file://`** — Barba `fetch` requires HTTP server (local Apache/XAMPP or `npx serve`). `.htaccess` rules need Apache.

15. **Committing to main / giant PR** — one feature branch, draft PR, visual test all 8 routes.

16. **Changing hero CSS word-rise on loader** — loader should *echo* the effect, not break hero animation on first paint after loader.

17. **Opacity on `body` during loader** — prefer hiding loader panel only; don't leave `body.is-loading` stuck (breaks scroll).

18. **Vimeo modal iframe** — on leave from home, pause/reset iframe `src` in destroy to stop audio bleeding.

---

## Implementation order (follow sequentially)

1. Read all 8 HTML files and both JS files completely.
2. Add loader + curtain markup + CSS (static on all pages).
3. Refactor `main.js` / `animation.js` init/destroy APIs **before** Barba.
4. Manual test: call `Creativo.initPage()` / `destroyPage()` from console twice — no duplicate behavior.
5. Create `barba-transitions.js` with loader only — test session gate.
6. Add Barba wrapper/container/namespaces to all HTML.
7. Convert all internal links + asset paths to root-relative.
8. Implement dynamic CSS switching per namespace.
9. Implement curtain transition + hooks calling init/destroy.
10. Wire home Three.js cleanup.
11. Full regression pass (test matrix below).

---

## Test matrix (all must pass)

| # | Test | Expected |
|---|------|----------|
| 1 | First visit `/` | Loader plays once, home visible, hero animates |
| 2 | Refresh `/` same session | No loader |
| 3 | New tab `/` | Loader plays again |
| 4 | Home → Work | Blue curtain up/down, no white flash, work grid styled |
| 5 | Work → Case study → About → Contact | All styled correctly |
| 6 | Case study → Home | Three.js canvas appears (desktop), no duplicate canvas |
| 7 | Home → Home nav click | No break (same namespace transition or prevent self) |
| 8 | External Instagram link | Full navigation, new tab, Barba not involved |
| 9 | `mailto:` link | Native behavior |
| 10 | Mobile menu open → navigate | Menu closes, no scroll lock |
| 11 | Browser back/forward | Barba handles or degrades gracefully — verify no blank page |
| 12 | `#footerYear` | Correct year after every transition |
| 13 | Showreel modal (home) | Opens/closes; no audio after leaving home |
| 14 | Scroll reveal cards | Animate once per page visit, not broken on re-entry |
| 15 | Work filter dropdown | Works after Barba enter on work |
| 16 | About tabs/accordion | Work after enter |
| 17 | Resize during transition | No stuck curtain (kill timeline on `beforeUnload` optional) |
| 18 | Lighthouse sanity | No runaway RAF listeners (performance tab) |

---

## Definition of done

- [ ] `js/barba-transitions.js` exists and owns loader + Barba + curtain
- [ ] Loader runs once per `sessionStorage` session
- [ ] All internal navigation uses Barba without full reload
- [ ] Blue `#2060FF` curtain transition on every internal route change
- [ ] All 8 pages updated with consistent `data-barba` structure and root-relative links
- [ ] Page-specific CSS loads correctly on every route
- [ ] `main.js` / `animation.js` safe re-init with cleanup
- [ ] Three.js cleaned up when leaving home
- [ ] Draft PR opened (not merged to main) with short test notes and screen recording GIF recommended

---

## PR description template for the agent

```markdown
## Summary
Implements Barba.js SPA navigation with GSAP session loader and blue curtain transitions across all 8 public pages.

## Changes
- Added js/barba-transitions.js
- Refactored main.js / animation.js for init/destroy lifecycle
- Updated all HTML pages: Barba attributes, root-relative URLs
- Added loader + curtain styles to global.css
- Dynamic per-page CSS injection for Barba namespace

## Test plan
- [ ] Loader once per session
- [ ] All route combinations in test matrix
- [ ] Home Three.js + showreel
- [ ] Work filter + About tabs on client-side navigation
- [ ] Tested on local Apache with .htaccess (not file://)
```

---

## Optional enhancement (only if time permits, not required)

- `@barba/prefetch` for faster swaps
- `prefers-reduced-motion` → shorten or disable curtain/loader

---

## Correction to the original plan

The original plan listed `ScrollTrigger kill on leave` in `animation.js` — **also** kill in `Creativo.destroyPage()` because most scroll behavior is IntersectionObserver-based in `main.js`, and **listener cleanup belongs in `main.js`**, not only `animation.js`. The orchestrator (`barba-transitions.js`) should call **both** destroy functions on every `leave`.
