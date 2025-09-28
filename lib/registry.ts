import { ComponentType } from "react";
import ButtonRipple from "@/components/microinteractions/button-ripple";
import MagneticButton from "@/components/microinteractions/magnetic-button";

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
];