import { cn } from "@/lib/utils";
import { Globe, X } from "lucide-react";
import { motion, AnimatePresence, MotionConfig } from "motion/react";
import { useCallback, useState } from "react";

export const IconToSelectButton = () => {
  const [open, setOpen] = useState(false);
  const toggle = useCallback(() => setOpen(v => !v), []);
  return (
    <motion.div
      key={"icon-to-select-button"}
      className={cn([
        `flex justify-center items-center cursor-pointer relative z-10 overflow-hidden bg-gray-800 rounded-full `,
        open ? `px-2 h-9` : `px-2 h-9`,
      ])}
      onClick={toggle}
      role="button"
      tabIndex={0}
      aria-expanded={open}
    >
      <Globe className="size-5 flex items-center justify-center " />
      <MotionConfig
        transition={{
          ease: "easeOut",
          duration: 0.3,
        }}
      >
        <AnimatePresence>
          {open && (
            <motion.span
              key={"item1"}
              initial={{ opacity: 0, filter: "blur(10px)", width: 0, marginLeft: "0px" }}
              animate={{ opacity: 1, filter: "blur(0px)", width: "auto", marginLeft: "16px" }}
              exit={{
                opacity: 0,
                filter: "blur(10px)",
                width: 0,
                marginLeft: "0px",
                transition: { delay: 0.1 },
              }}
              className="whitespace-nowrap will-change-transform flex"
            >
              <span>Searching web</span>
              <div className="flex ml-1">
                <motion.span
                  animate={{
                    y: [0, -2],
                    transition: { duration: 0.3, repeat: Infinity, repeatType: "reverse" },
                  }}
                >
                  .
                </motion.span>
                <motion.span
                  animate={{
                    y: [0, -2],
                    transition: {
                      duration: 0.3,
                      delay: 0.1,
                      repeat: Infinity,
                      repeatType: "reverse",
                    },
                  }}
                >
                  .
                </motion.span>
                <motion.span
                  animate={{
                    y: [0, -2],
                    transition: {
                      duration: 0.3,
                      delay: 0.2,
                      repeat: Infinity,
                      repeatType: "reverse",
                    },
                  }}
                >
                  .
                </motion.span>
              </div>
            </motion.span>
          )}

          {open && (
            <motion.span
              key={"item2"}
              initial={{ opacity: 0, filter: "blur(10px)", width: 0, marginLeft: "0px" }}
              animate={{
                opacity: 1,
                filter: "blur(0px)",
                width: "auto",
                marginLeft: "16px",
                transition: { delay: 0.1 },
              }}
              exit={{
                opacity: 0,
                filter: "blur(10px)",
                width: 0,
                marginLeft: "0px",
              }}
              className="will-change-transform"
            >
              <X className="size-5 flex items-center justify-center " />
            </motion.span>
          )}
        </AnimatePresence>
      </MotionConfig>
    </motion.div>
  );
};
