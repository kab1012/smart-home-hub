# Smart Home Hub

A smart home control dashboard built with React 19, TypeScript, and Vite. Manage devices, rooms, reminders, and themes from a single glassmorphic UI.

## Features

- **Device control** — Toggle 15 devices across 5 rooms (lights, fans, plugs, switches, cameras, locks, thermostats, speakers)
- **Favorites** — Pin frequently used devices for quick access
- **Reminders** — Create, prioritize, and schedule home tasks
- **Theme** — Auto light/dark mode (switches at 08:00 and 18:00) with manual override
- **Add modal** — UI scaffold for adding new devices, rooms, scenes, and automations

## Project Structure

```
src/
├── types.ts                      # Shared TypeScript types and interfaces
├── utils/
│   └── time.ts                   # fmt, greeting, greetIcon, isDayTime
├── data/
│   ├── devices.ts                # Seed device inventory (15 devices)
│   ├── reminders.ts              # Seed reminders (3 entries)
│   ├── addOptions.ts             # Add-new modal options (10 entries)
│   └── constants.ts              # Priority colors, weather data, nav tabs
├── components/
│   ├── EmptyState.tsx            # Empty placeholder UI
│   ├── DeviceCard.tsx            # Single device tile with toggle and favorite
│   ├── CameraCard.tsx            # Read-only camera tile
│   ├── AddModal.tsx              # New device/room/scene modal
│   ├── ReminderRow.tsx           # Single reminder list item
│   └── tabs/
│       ├── HomeTab.tsx           # Dashboard — clock, weather, active devices, reminders
│       ├── FavoritesTab.tsx      # Grid of pinned devices
│       ├── RoomTab.tsx           # Devices filtered by room
│       └── CategoryTab.tsx       # Devices filtered by category
├── App.tsx                       # Root component — state, nav, tab routing (68 lines)
├── App.css                       # Styles, theming (CSS variables), animations
├── main.tsx                      # React root entry point
└── index.css                     # Global resets and root styles
```

## Tech Stack

- **React 19** with hooks (`useState`, `useEffect`)
- **TypeScript ~6** — strict mode enabled
- **Vite 8** — fast dev server with HMR
- **ESLint 9** — TypeScript + React hooks rules

## Getting Started

```bash
npm install
npm run dev
```

Build for production:

```bash
npm run build
```

## Data Layer

All static data lives in `src/data/` and is imported at the edges that need it. To swap in a real API, replace the seed imports — component interfaces stay the same.

| File | Contents |
|------|----------|
| `data/devices.ts` | 15 seed smart home devices |
| `data/reminders.ts` | 3 seed reminders with today/tomorrow dates |
| `data/addOptions.ts` | 10 add-new options shown in the modal |
| `data/constants.ts` | Priority color map, weather snapshot, nav tab list |
