# Changelog

## [2026-04-22]

### Added
- Active dot indicator (`::before` pseudo-element) on selected nav tabs — 5 px `#caf5f7` circle appears before the label; hidden on inactive tabs.
- `justify-content: center` on active tabs so Home tab dot+label aligns identically to other tabs (e.g. Favorites).
- Active devices section on Home tab rendered as a full `device-grid` (same layout as Favorites), scrollable when content overflows.

### Changed
- Tab color scheme set to `#caf5f7` for borders, active text, and dot indicator (dark mode). Light mode uses `#0891b2`.
- All `box-shadow` glow effects removed and replaced with `none`; each site marked with `/* add/remove glow from here */` comment for easy restoration.
- Hero bar background made fully transparent — no border, no box-shadow, blends into dashboard background.
- Hero text colors: time and temperature use `#caf5f7` (dark) / `#0e7490` (light); secondary text uses `rgba(255,255,255,0.5)` (dark) / `rgba(10,10,30,0.5)` (light).
- Clock interval changed from 1 s to 60 s; seconds removed from time display (format: `h:mm AM/PM`).
- Add modal given translucent glass background (`rgba` + `backdrop-filter: blur`).
- Device cards set to fixed height `110px` with `overflow: hidden` to prevent layout shift on toggle.
- Subtle `translateY(-2px)` hover lift on device cards replacing the previous zoom-in scale transform.
- `home-scroll` / reminders section commented out in HomeTab (`{false && ...}`) to eliminate whitespace gap at bottom of Home tab.

### Fixed
- Home tab active dot misaligned above "Home" text — caused by missing `justify-content: center` on flex container; now centered inline.
- Scrollbar appearing when hovering device cards near container edge — fixed by adding `padding: 3px` to `.device-grid` and `overflow: hidden` on `.tab-content`.

### Preserved (commented out, re-enable when needed)
- Light/dark theme toggle — state, `useEffect`, import, and button markup all commented with `── re-enable` markers in `App.tsx`.
- Fan spin animation — CSS `@keyframes spin` and `.fan-spin` class commented out; `DeviceCard.tsx` has instructions to re-wrap icon in `<span className="fan-spin">`.
- Reminders section in HomeTab — full form and list commented with `{false && ...}`; CSS also commented.

## [2026-04-23]

### Added
- `.nav-row` wrapper — `+` button moved outside `<nav>` and sits as a sibling; nav bar now uses `width: fit-content` centered via `justify-content: center` on the row.
- Green separator (`border-left: 1px solid rgba(34,197,94,0.3)`) between nav tabs; first tab has no left border.
- `overflow: clip` on `.device-grid` — prevents `translateY` hover lift on device cards from triggering a scrollbar in the scroll container.

### Changed
- Active tab dot indicator replaced with bold (`font-weight: bold`) + full opacity (`opacity: 1`) on the active tab; all tabs share the same `#caf5f7` color and weight, only opacity differs (0.4 inactive → 1 active), eliminating layout shift on click.
- Nav tabs moved into a unified straight box (`.top-nav`) with subtle glass background and border; individual tab pill borders removed.
- `.home-tab` content-area CSS scoped to `.tab-body .home-tab` — fixes class collision that caused the Home nav button to inherit `flex: 1` and stretch across the full nav bar.
- `translateY(-2px)` device card hover reduced to `translateY(-1px)` for a subtler lift.
- `.home-section-row` given `margin-top: -4px` to pull "Active" label closer to the date.
- "Active" label indented `2.5px` via `padding-left`.

### Fixed
- Home tab nav button stretching to fill entire nav bar — caused by `.home-tab` CSS rule leaking `flex: 1` onto the button element.
- Extra whitespace on left of first tab and right of last tab — switched separator from `border-right` to `border-left` and removed it from the first child.
- `+` button not vertically centered in nav bar — was `position: absolute` without `top`; now sits in normal flow as a flex sibling in `.nav-row`.

## [Unreleased]

### Added
- `src/data/views.tsx` — single source of truth for all views. Derives the `View` type from a `const` array, eliminating the need to touch `types.ts` when adding a new view.
- `ViewConfig.removable` flag — room tabs marked `removable: true` show a hover-reveal ✕ button in the nav; clicking it removes the room tab and navigates home.
- `ViewConfig.addOption` field — rooms self-register in the + modal. Adding or re-adding a removed room via + navigates directly to it.
- Bedroom room view (Living Room and Bedroom both removable/re-addable via the + modal).
- `.nav-tab-group` + `.nav-tab-remove` CSS — hover-reveal ✕ button on removable room tabs.

### Changed
- `View` type moved out of `types.ts` and derived from `VIEW_CONFIG` ids in `views.tsx`. Adding a new view now requires editing **one file only** (`views.tsx`).
- `App.tsx` nav and tab body now loop over `visibleConfig` (filtered `VIEW_CONFIG`) — no more hardcoded per-view conditionals.
- `AddModal` now accepts an `options` prop instead of hardcoding `ADD_OPTIONS`; `App.tsx` builds the combined list (rooms first, then device types, hiding already-visible rooms).
- `TABS` constant removed from `constants.ts` (replaced by `VIEW_CONFIG`).
- Hero bar (time card) redesigned: greeting → time → date stacked vertically; time font increased to 30px; weather right-aligned column; card padding increased to `16px 18px`; divider height increased to 56px.

### Fixed
- Hero bar layout: greeting was previously rendered beside the clock in a horizontal flex row; now correctly stacked above the time.
- Weather detail wrapped in `.weather-detail` column so condition and hi/lo lines align to the right edge.
