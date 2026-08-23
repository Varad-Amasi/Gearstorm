# GearStorm Website

Modern interactive website for **GearStorm**, an inter-college robotics competition by **IEEE RAS, KLS GIT Belagavi**.

## Stack

- React 18 + TypeScript (strict)
- Vite 5
- Tailwind CSS 3
- Firebase (Auth / Firestore / Storage — configured for later phases)
- ESLint + Prettier + Husky

## Prerequisites

- Node.js 20+ (22 recommended)
- npm 10+

## Setup (under 10 minutes)

```bash
# From repo root
cd gearstorm-website
cp .env.example .env.local
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

### Firebase (optional for Phase 1)

1. Create a project at [Firebase Console](https://console.firebase.google.com)
2. Add a Web app and copy config into `.env.local`
3. Enable Auth (Email / Google), Firestore, and Storage when you reach Phase 6

Without Firebase keys, the app still runs; Firebase modules stay uninitialized.

## Scripts

| Command              | Description                   |
| -------------------- | ----------------------------- |
| `npm run dev`        | Start Vite dev server         |
| `npm run build`      | Type-check + production build |
| `npm run preview`    | Preview production build      |
| `npm run lint`       | ESLint                        |
| `npm run format`     | Prettier write                |
| `npm run type-check` | TypeScript only               |

## Project layout

See parent docs (`02_Architecture.md`) for the full tree. Phase 1 includes:

- `src/components/common/` — Button, Card, Input, Badge
- `src/styles/` — design tokens, globals, animations
- `src/config/` — Firebase + API config
- `src/types/` — shared TypeScript models

## Documentation

Project docs live in the repo root:

| File                    | Purpose             |
| ----------------------- | ------------------- |
| `00_ENHANCED_PROMPT.md` | Full product vision |
| `01_PRD.md`             | Requirements        |
| `02_Architecture.md`    | Tech design         |
| `03_Rules.md`           | Coding standards    |
| `04_Phases.md`          | Roadmap             |
| `05_Design.md`          | Design system       |
| `06_Memory.md`          | Session progress    |

## Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md).

## License

Private — IEEE RAS KLS GIT event site.
