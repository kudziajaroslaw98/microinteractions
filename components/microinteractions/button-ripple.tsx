"use client";

import { useState, MouseEvent } from "react";
import { motion, AnimatePresence } from "motion/react";

interface Ripple {
  id: number;
  x: number;
  y: number;
}

export default function ButtonRipple() {
  const [ripples, setRipples] = useState<Ripple[]>([]);
  const [nextId, setNextId] = useState(0);

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    const button = e.currentTarget;
    const rect = button.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const newRipple: Ripple = {
      id: nextId,
      x,
      y,
    };

    setRipples(prev => [...prev, newRipple]);
    setNextId(prev => prev + 1);

    setTimeout(() => {
      setRipples(prev => prev.filter(ripple => ripple.id !== newRipple.id));
    }, 600);
  };

  return (
    <div className="flex flex-col items-center gap-8">
      <button
        onClick={handleClick}
        className="relative overflow-hidden cursor-pointer px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors"
      >
        <span className="relative z-10">Click me</span>
        <AnimatePresence>
          {ripples.map(ripple => (
            <motion.span
              key={ripple.id}
              className="absolute bg-white rounded-full pointer-events-none -translate-x-1/2 -translate-y-1/2"
              style={{
                left: ripple.x,
                top: ripple.y,
              }}
              initial={{ width: 0, height: 0, opacity: 0.8 }}
              animate={{ width: 400, height: 400, opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            />
          ))}
        </AnimatePresence>
      </button>
      <p className="text-neutral-400 text-sm max-w-md text-center">
        Click the button to see a ripple effect that expands from the click point
      </p>
    </div>
  );
}
