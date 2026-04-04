# ERP Front-end

A modern ERP front-end application built with Next.js 14, React 18, and TypeScript, following monorepo architecture with pnpm workspaces.

## 📁 Project Structure

```
erp-front-end/
├── apps/
│   └── erp/                   # Main Next.js application
│       ├── src/
│       │   └── app/
│       ├── package.json
│       ├── next.config.js
│       └── tsconfig.json
├── packages/
│   └── shared/                # Shared components, hooks, utilities, and APIs
│       └── src/
│           ├── components/
│           │   ├── badge/
│           │   ├── button/
│           │   ├── card/
│           │   ├── form/
│           │   ├── form-weight-tier/
│           │   ├── input/
│           │   ├── layout/
│           │   ├── modal/
│           │   ├── skeleton/
│           │   └── table/
│           ├── api/
│           │   ├── quotes/
│           │   └── rules/
│           ├── hooks/
│           │   └── api/
│           ├── config/
│           ├── contexts/
│           ├── layouts/
│           ├── lib/
│           ├── locales/
│           ├── types/
│           ├── utils/
│           ├── vendor/
│           └── index.ts
├── pnpm-workspace.yaml
├── package.json
├── turbo.json
├── tsconfig.json
└── README.md
```

## 🚀 Available Scripts

### Root level
```bash
pnpm dev          # Start all apps in development mode
pnpm build        # Build all packages and apps
pnpm lint         # Lint all packages and apps
pnpm typecheck    # Type check all packages and apps
pnpm clean        # Clean all build outputs and dependencies
```

### ERP app
```bash
cd apps/erp
pnpm dev          # Start Next.js development server
pnpm build        # Build for production
pnpm start        # Start production server
pnpm lint         # Run ESLint
```

## 🎨 Available Components

All components are located in `packages/shared/src/components/` and follow consistent patterns:

### Button

Variants: primary, secondary, tertiary, danger
Sizes: sm, md, lg
Features: loading state, full width

### Input

Variants: default, outlined, filled
Features: label, error, helper text, icons

### Card

Variants: default, outlined, elevated, flat
Sizes: sm, md, lg
Features: image, title, description, clickable

### Modal

Sizes: sm, md, lg, xl, full
Features: close on overlay/escape, custom footer

### Badge

Variants: default, primary, success, warning, danger, info
Sizes: sm, md, lg
Features: dot, count badge

### Skeleton

Variants: text, circular, rectangular, rounded
Features: multiple count, custom dimensions

### Table

Features: sortable columns, pagination, row click, empty state

### Form

Layouts: vertical, horizontal, inline
Features: validation, error states, help text

### FormWeightTier

Custom form component for weight tier configuration
Features: dynamic tier management, weight ranges

### Layout

Components: Layout, Layout.Sider, Layout.Header, Layout.Content, Layout.Footer
Features: collapsible sidebar, fixed header, responsive

## 🏗️ Architecture

This project follows the ERP Architecture conventions:

1. **page.tsx** (Server Component) → Imports only Screen
2. **Screen Component** → May contain Containers
3. **Container Components** (Stateful) → Render Presenters
4. **Presenter Components** (Stateless) → UI only
5. **Shared Components** → Reusable across modules

### Import Rules

✅ **Allowed:**
- Any module can import from `@repo/shared`
- Within same module, imports are free

❌ **Forbidden:**
- Cross-module imports between apps
- Importing private containers from other modules

## 🔗 API Integration

The project includes API utilities in `packages/shared/src/api/`:

### Quotes API

- `calculate-price.ts` - Calculate quote prices
- `submit-bulk-quotes.ts` - Submit multiple quotes
- `get-job-status.ts` - Get job processing status

### Rules API

- `get-rules.ts` - Retrieve all rules
- `get-rule.ts` - Get specific rule
- `create-rule.ts` - Create new rule
- `update-rule.ts` - Update existing rule
- `delete-rule.ts` - Delete rule

## 📦 Installation

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev
```

## 🔧 Development

The project uses:

- **Next.js 14** for the app framework
- **React 18** for UI components
- **TypeScript 5** for type safety
- **pnpm** for package management
- **Turbo** for build system
- **CSS Modules** for styling

## 📝 Component Creation

To create new components, follow the established pattern:

1. Create component folder: `packages/shared/src/components/[component-name]/`
2. Create 6 files:
   - `[ComponentName].tsx` - Main component
   - `[ComponentName].module.css` - Styles
   - `types.ts` - TypeScript types
   - `constants.ts` - Constants
   - `helpers.ts` - Helper functions
   - `index.ts` - Exports

## 🎯 Next Steps

- Expand API integration with custom hooks
- Create business logic containers
- Add more shared utilities
- Set up proper routing structure
- Add form validation utilities

## 📄 License

Private project for internal use.

## 🎯 Next Steps

- Add API integration with custom hooks
- Implement authentication screens in core-auth
- Create business logic containers
- Add more shared utilities
- Set up proper routing structure

## 📄 License

Private project for internal use.
