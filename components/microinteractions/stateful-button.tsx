import { AnimatePresence, motion } from "motion/react";
import { type ReactNode } from "react";

interface StatefulButtonProps {
  content: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  stateKey?: string;
  className?: string;
  ariaLabel?: string;
}

export function StatefulButton({
  content,
  onClick,
  disabled = false,
  stateKey = "default",
  className = "",
  ariaLabel = "interactive button",
}: StatefulButtonProps) {
  return (
    <motion.button
      className={`
               cursor-pointer hover:scale-105 active:scale-95 transition-transform duration-200 ease-out
               hover:ease-in active:ease-in ${className}`}
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      aria-disabled={disabled}
    >
      <motion.div
        layout
        className="items-center relative justify-center flex rounded-full px-6 py-2 border-2
                 overflow-hidden border-zinc-600 text-white will-change-transform whitespace-nowrap"
        transition={{ type: "spring", duration: 0.3, bounce: 0.2 }}
      >
        <AnimatePresence mode="popLayout">
          <motion.span
            key={stateKey}
            className="z-20 flex items-center gap-2"
            initial={{
              y: -40,
              opacity: 0,
            }}
            animate={{
              y: 0,
              opacity: 1,
              transition: { duration: 0.3, ease: "easeOut" },
            }}
            exit={{
              y: 40,
              opacity: 0,
              color: "oklch(44.2% 0.017 285.786)",
              transition: {
                duration: 0.2,
                ease: "easeIn",
              },
            }}
          >
            {content}
          </motion.span>
        </AnimatePresence>
      </motion.div>
    </motion.button>
  );
}
