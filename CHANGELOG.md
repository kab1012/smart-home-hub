# Changelog

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
