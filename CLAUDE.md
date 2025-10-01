# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

A learning playground for microinteractions built with Next.js 15 App Router, TypeScript (strict mode), Tailwind CSS v4, and Motion (motion.dev). The project uses a registry-based architecture where microinteraction components are registered in a central file and dynamically rendered in a playground UI.

## Essential Commands

```bash
# Type checking (primary verification method - do not run dev server)
pnpm typecheck

# Build with Turbopack
pnpm build

# Linting
pnpm lint
pnpm lint:fix

# Formatting
pnpm format
pnpm format:check
```

## Architecture

### Registry System (`lib/registry.ts`)

The core architectural pattern. All microinteraction components must be:
1. Created in `components/microinteractions/`
2. Registered in `lib/registry.ts` as a `MicrointeractionEntry` with name, slug, description, and component reference
3. The registry auto-populates the playground dropdown - no manual UI updates needed

### Playground Page (`app/playground/page.tsx`)

- Dynamically renders selected component from registry
- Persists selection to localStorage
- Provides component description toggle
- Uses client-side rendering ("use client")

### Component Patterns

Microinteraction components typically:
- Use `"use client"` directive (Motion requires client-side)
- Import from `motion/react` (not framer-motion)
- Self-contained with all state management internal
- Follow Motion animation best practices:
  - `useMotionValue` for frequently updated values (performance)
  - `useSpring` for physics-based animations
  - `AnimatePresence` for mount/unmount animations
  - `layout` prop for layout animations

### Path Aliases

- `@/*` maps to project root (e.g., `@/components/...`, `@/lib/...`)

## Motion Library Notes

- Use `motion/react` imports (not `framer-motion`)
- Common patterns: `motion.div`, `motion.button`, `AnimatePresence`, `useMotionValue`, `useSpring`
- Animation props: `initial`, `animate`, `exit`, `whileHover`, `whileTap`, `layout`
- Prefer declarative animations over imperative

## Stateful Button Pattern

The `StatefulButton` component in `components/microinteractions/stateful-button.tsx` is a reusable controlled component where parent components manage state and content. Key props:
- `content`: ReactNode to display (can include icons, text, spinners)
- `stateKey`: Unique key to trigger exit/enter animations on state changes
- `onClick`, `disabled`, `className`, `ariaLabel`

See `stateful-button-example.tsx` for usage patterns (payment, delete, save with error handling).

## TypeScript Configuration

- Strict mode enabled
- Target: ES2017
- Path aliases configured (`@/*`)
- Uses Next.js TypeScript plugin
