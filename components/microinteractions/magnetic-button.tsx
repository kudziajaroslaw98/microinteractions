"use client";

import { useRef, MouseEvent } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

export default function MagneticButton() {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { damping: 20, stiffness: 300 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!buttonRef.current) return;

    const button = buttonRef.current;
    const rect = button.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const distanceX = e.clientX - centerX;
    const distanceY = e.clientY - centerY;

    const maxDistance = 100;
    const pullStrength = 0.3;

    const distance = Math.sqrt(distanceX ** 2 + distanceY ** 2);

    if (distance < maxDistance) {
      x.set(distanceX * pullStrength);
      y.set(distanceY * pullStrength);
    } else {
      x.set(0);
      y.set(0);
    }
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <div className="flex flex-col items-center gap-8">
      <div
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="w-80 h-80 flex items-center justify-center"
      >
        <motion.button
          ref={buttonRef}
          style={{ x: springX, y: springY }}
          className="px-8 py-4 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg transition-colors"
        >
          Magnetic Button
        </motion.button>
      </div>
      <p className="text-neutral-400 text-sm max-w-md text-center">
        Move your cursor near the button to see it follow with spring physics
      </p>
    </div>
  );
}
