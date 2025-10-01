# Microinteractions Playground

A learning playground for experimenting with microinteractions using Next.js, TypeScript, Tailwind CSS, and Motion.

## About

This project is designed for learning and exploring microinteractions - those small, delightful animations and interface details that enhance user experience. The playground provides an easy way to create, test, and compare different microinteraction patterns.

## Tech Stack

- **Next.js 15** - React framework with App Router
- **TypeScript** - Type safety with strict mode enabled
- **Tailwind CSS** - Utility-first CSS framework
- **Motion** - Modern animation library for React

## Getting Started

### Prerequisites

- Node.js 18+
- pnpm (recommended) or npm

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd microinteractions

# Install dependencies
pnpm install

# Run development server
pnpm dev
```

Open [http://localhost:3000/playground](http://localhost:3000/playground) to see the playground.

## Project Structure

```
microinteractions/
├── app/
│   ├── playground/
│   │   └── page.tsx           # Main playground interface
│   ├── layout.tsx
│   └── globals.css
├── components/
│   └── microinteractions/     # All microinteraction components
│       ├── button-ripple.tsx
│       └── magnetic-button.tsx
├── lib/
│   └── registry.ts            # Component registry
└── README.md
```

## Adding New Microinteractions

Creating a new microinteraction is simple and takes just a few steps:

### 1. Create Your Component

Create a new file in `components/microinteractions/`:

```tsx
// components/microinteractions/my-interaction.tsx
"use client";

import { motion } from "motion/react";

export default function MyInteraction() {
  return (
    <motion.div whileHover={{ scale: 1.1 }} className="p-8 bg-blue-600 rounded-lg">
      Hover me!
    </motion.div>
  );
}
```

### 2. Register Your Component

Add one line to `lib/registry.ts`:

```tsx
import MyInteraction from "@/components/microinteractions/my-interaction";

export const registry: MicrointeractionEntry[] = [
  // ... existing entries
  {
    name: "My Interaction",
    slug: "my-interaction",
    description: "A brief description of what this microinteraction does",
    component: MyInteraction,
  },
];
```

### 3. See It in Action

Your component will automatically appear in the playground dropdown. Select it to test and experiment!

## Example Microinteractions

### Button Ripple

Click-triggered ripple effect that expands from the click point with smooth fade-out animation.

**Key concepts:**

- Multiple simultaneous animations
- AnimatePresence for mount/unmount animations
- Dynamic positioning based on user input

### Magnetic Button

Button that follows the cursor with spring physics when nearby.

**Key concepts:**

- useMotionValue for performance
- useSpring for physics-based animation
- Distance-based interaction zones

## Tips for Learning

1. **Start Simple** - Begin with basic hover states and transitions
2. **Study the Examples** - The included examples demonstrate common patterns
3. **Experiment Freely** - The playground makes it easy to iterate quickly
4. **Read Motion Docs** - Familiarize yourself with Motion's API at [motion.dev](https://motion.dev)
5. **Consider Performance** - Use `useMotionValue` for frequently updating values
6. **Think About UX** - Microinteractions should enhance, not distract

## Development

```bash
# Run development server
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start

# Lint code
pnpm lint
```

## License

MIT

## Contributing

Feel free to add your own microinteractions and share them! This is a learning project, so experimentation is encouraged.
