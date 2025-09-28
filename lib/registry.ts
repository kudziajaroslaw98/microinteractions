import { ComponentType } from "react";
import ButtonRipple from "@/components/microinteractions/button-ripple";
import MagneticButton from "@/components/microinteractions/magnetic-button";
import { StatefulButton } from "@/components/microinteractions/stateful-button";

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
    description: "A ripple effect that expands from the click point with smooth fade-out animation. Uses AnimatePresence for managing multiple simultaneous ripples.",
    component: ButtonRipple,
  },
  {
    name: "Magnetic Button",
    slug: "magnetic-button",
    description: "A button that follows the cursor with spring physics when the mouse is nearby. Demonstrates useMotionValue and useSpring for smooth, physics-based animations.",
    component: MagneticButton,
  },
  {
    name: "Stateful Button",
    slug: "stateful-button",
    description: "A button that changes its text when clicked. Demonstrates useState for managing state.",
    component: StatefulButton,
  },
];
