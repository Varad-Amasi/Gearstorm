# GearStorm Website

Modern interactive website for **GearStorm 2.0**, an inter-college robotics competition organised in collaboration with **IEEE RAS and ISTE of KLS GIT Belagavi**.

## Stack

- React 18 + TypeScript (strict)
- Vite 5
- Tailwind CSS 3
- Express JSON API (`../backend`)
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

Open [http://localhost:5173](http://localhost:5173). Start the API in another terminal (`cd ../backend && npm run dev`) for registration.

## Scripts

| Command                | Description                   |
| ---------------------- | ----------------------------- |
| `npm run dev`          | Start Vite dev server         |
| `npm run build`        | Type-check + production build |
| `npm run preview`      | Preview production build      |
| `npm run lint`         | ESLint                        |
| `npm run format`       | Prettier write                |
| `npm run format:check` | Prettier check                |
| `npm run type-check`   | TypeScript only               |

## Project layout

- `src/components/` — UI, robot, sections
- `src/styles/` — design tokens, typography, cursor
- `src/config/` — routes, SEO, API
- `src/types/` — shared TypeScript models

## Documentation

Project docs live in the repo root `docs/` folder.
