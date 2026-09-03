# Contributing to GearStorm

## Branch naming

- `feature/<short-description>`
- `fix/<short-description>`
- `docs/<short-description>`
- `refactor/<short-description>`

## Commit messages

Use Conventional Commits:

```
feat: add robot assembly scroll stages
fix: correct registration validation
docs: update setup steps in README
style: apply prettier
refactor: extract design tokens
```

## Before you push

```bash
npm run lint
npm run format
npm run type-check
npm run build
```

Pre-commit hooks (Husky + lint-staged) run ESLint and Prettier on staged files.

## Code rules (non-negotiable)

- TypeScript **strict** — no `any`
- Tailwind for styling — no inline styles
- Functional React components with typed props
- Files ideally under ~300 lines
- Follow `03_Rules.md` in the repo root

## Pull requests

1. Link the related phase/task from `04_Phases.md`
2. Describe what changed and why
3. Confirm desktop + mobile smoke check for UI work
4. Ensure CI (GitHub Actions) is green

## Environment

Never commit `.env` / `.env.local`. Use `.env.example` as the template.
