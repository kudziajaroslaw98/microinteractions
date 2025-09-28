import { AnimatePresence, motion } from "motion/react";
import { useCallback, useState } from "react";
import { Check, Loader } from "lucide-react";

export function StatefulButton() {
  const [activeState, setActiveState] = useState("default");
  const [states, setStates] = useState([
    "default",
    "long_text",
    "with_icon",
    "icon only",
  ]);

  const handleClick = useCallback(() => {
    if (activeState === "default") {
      setActiveState("long_text");
    } else if (activeState === "long_text") {
      setActiveState("with_icon");
    } else if (activeState === "with_icon") {
      setActiveState("icon only");
    } else if (activeState === "icon only") {
      setActiveState("default");
    }
  }, [activeState]);

  const getStateComponent = useCallback(() => {
    switch (activeState) {
      case "default":
        return <span>Click me</span>;
      case "long_text":
        return <span>Clicked ddsadas dasdsa</span>;

      case "with_icon":
        return (
          <span className="flex gap-2 items-center">
            <Loader className="flex animate-spin size-5" />{" "}
            <span> Loading...</span>
          </span>
        );
      case "icon only":
        return <Check className="flex size-6" />;
      default:
        return null;
    }
  }, [activeState]);

  return (
    <motion.button
      className="cursor-pointer relative items-center flex rounded-full px-6 py-2 overflow-hidden border-2 border-zinc-800 text-white will-change-transform"
      layout
      transition={{ type: "spring", duration: 0.4 }}
      onClick={handleClick}
    >
      <AnimatePresence mode="popLayout">
        <motion.span
          key={activeState}
          className="z-20 flex-col will-change-[transform,filter]"
          initial={{
            y: -40,
            opacity: 0,
            zIndex: 20,
          }}
          animate={{
            y: 0,
            opacity: 1,
            zIndex: 20,
            transition: { duration: 0.2, ease: "easeIn" },
          }}
          exit={{
            y: 15,
            opacity: 0,
            zIndex: 20,
            filter: "blur(10px)",
            transition: { duration: 0.1, ease: "easeOut" },
            color: "#17171a",
          }}
        >
          {getStateComponent()}
        </motion.span>
      </AnimatePresence>
    </motion.button>
  );
}
