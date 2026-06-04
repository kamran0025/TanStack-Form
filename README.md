# TanStack Form · Microsession Demo

A React + TypeScript application demonstrating TanStack Form concepts through live, interactive examples.

## Getting Started

```bash
npm install
npm run dev
```

## Project Structure

```
src/
├── main.tsx                  # App entry point
├── App.tsx                   # Root component + tab routing
│
├── types/
│   └── index.ts              # All shared TypeScript interfaces & types
│
├── styles/
│   ├── tokens.ts             # Design tokens (colors)
│   └── shared.ts             # Shared style helper functions
│
├── constants/
│   ├── index.ts              # Static data (STATES_MAP, DEPARTMENTS, etc.)
│   └── code.ts               # Code snippet strings for the code panels
│
├── utils/
│   └── index.ts              # Utility functions (sleep, email validators)
│
├── hooks/
│   └── useEmailValidator.ts  # Reusable async email validation hook
│
├── components/               # Shared UI atoms
│   ├── FieldLabel.tsx        # Form field wrapper with label + error
│   ├── SuccessScreen.tsx     # Post-submit success display
│   ├── StateChip.tsx         # Live form-state debug chip
│   └── CodePanel.tsx         # Syntax-highlighted code viewer
│
└── forms/                    # Demo form implementations
    ├── LoginForm.tsx          # 1. Basic login with canSubmit gate
    ├── AsyncForm.tsx          # 2. Debounced async email validation
    ├── DependentForm.tsx      # 3. Country → State dependent fields
    ├── ArrayForm.tsx          # 4. Dynamic skill list (push/remove)
    └── EnterpriseForm.tsx     # 5. Multi-step employee onboarding
```

## Demo Tabs

| Tab | Concept Demonstrated |
|-----|---------------------|
| 1. Login Form | Controlled inputs, sync validation, `canSubmit` gate |
| 2. Async Validation | Debounce, `isValidating` state, async email check |
| 3. Dependent Fields | Country resets state, surgical re-renders |
| 4. Array Fields | `pushValue` / `removeValue`, per-item validators |
| 5. Enterprise Form | Multi-step wizard, server error mapping, progress stepper |

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start Vite dev server |
| `npm run build` | Type-check + production build |
| `npm run preview` | Preview production build |
| `npm run type-check` | TypeScript-only check (no emit) |
