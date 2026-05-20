## 2024-05-20 - Global Focus Visible State
**Learning:** The application was lacking clear focus indicators for interactive elements which makes keyboard navigation difficult. The global `cursor: none` coupled with the custom cursor JS hides the native cursor and the site relied on hover states but lacked `focus` states. Adding a generic `:focus-visible` rule is an easy global fix for a11y.
**Action:** Applied a global `:focus-visible` outline using the existing brand color variable `var(--blue-light)` to `a`, `button`, `input`, `textarea`, `select`, and `[tabindex]` elements.
