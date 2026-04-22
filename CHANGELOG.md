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
