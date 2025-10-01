import { ComponentType } from "react";
import ButtonRipple from "@/components/microinteractions/button-ripple";
import MagneticButton from "@/components/microinteractions/magnetic-button";
import { StatefulButtonExample } from "@/components/microinteractions/stateful-button-example";
import { ButtonToCard } from "@/components/microinteractions/button-to-card";
import { TransactionList } from "@/components/microinteractions/transaction-list";

export interface MicrointeractionEntry {
  name: string;
  slug: string;
  description: string;
  component: ComponentType;
}

export const registry: MicrointeractionEntry[] = [
  {
    name: "Button Ripple",
    slug: "button-ripple",
    description:
      "A ripple effect that expands from the click point with smooth fade-out animation. Uses AnimatePresence for managing multiple simultaneous ripples.",
    component: ButtonRipple,
  },
  {
    name: "Magnetic Button",
    slug: "magnetic-button",
    description:
      "A button that follows the cursor with spring physics when the mouse is nearby. Demonstrates useMotionValue and useSpring for smooth, physics-based animations.",
    component: MagneticButton,
  },
  {
    name: "Stateful Button",
    slug: "stateful-button",
    description:
      "Fully controlled animated buttons with multiple states. Parent components have complete control over content, timing, and state transitions. Includes examples for payment processing, delete confirmation, and save operations with error handling.",
    component: StatefulButtonExample,
  },
  {
    name: "Button to Card",
    slug: "button-to-card",
    description: "A button that when clicked, reveals a card with a fade-in animation.",
    component: ButtonToCard,
  },
  {
    name: "Transaction List",
    slug: "transaction-list",
    description:
      "An expandable transaction list with smooth layout animations. Click any transaction to reveal detailed information with animated separators and a modal overlay. Demonstrates coordinated layout animations using LayoutGroup and AnimatePresence.",
    component: TransactionList,
  },
];
