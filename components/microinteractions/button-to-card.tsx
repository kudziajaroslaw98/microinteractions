import { useState, useCallback } from "react";
import { AnimatePresence, LayoutGroup, motion } from "motion/react";
import { cn } from "@/lib/utils";
import { Layout } from "lucide-react";

export function ButtonToCard() {
  const [open, setOpen] = useState(false);
  const toggle = useCallback(() => setOpen(v => !v), []);

  return (
    <LayoutGroup>
      <motion.div
        onClick={toggle}
        role="button"
        tabIndex={0}
        aria-expanded={open}
        className="cursor-pointer"
        animate={{
          width: open ? 400 : 140,
          borderRadius: open ? 20 : 999,
          background: open ? "linear-gradient(135deg, #1f2937 0%, #111827 50%, #0f172a 100%)" : "",
        }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
      >
        <AnimatePresence mode="popLayout">
          {open && (
            <motion.div
              key="form-content"
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, maxHeight: 0 }}
              // transition={{ duration: 0.15 }}
              className="p-6 pb-0"
            >
              {/* Header Section */}
              <motion.div
                className="flex flex-col"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                // transition={{ delay: 0.1, duration: 0.3 }}
              >
                <h2 className="m-0 text-lg font-semibold text-white">Payment Details</h2>
                <p className="text-gray-400 text-xs">Complete your purchase securely</p>
              </motion.div>

              {/* Form Section */}
              <div className="flex flex-col gap-3 pt-4">
                {/* Card Number */}
                <motion.div
                  className="flex flex-col gap-2"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15, duration: 0.3 }}
                >
                  <label className="text-xs font-medium text-gray-300">Card Number</label>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="1234 5678 9012 3456"
                      className="w-full rounded-lg px-3 py-2.5 bg-gray-800/50 backdrop-blur-sm text-white placeholder-gray-500 border border-gray-600/30 focus:outline-none focus:ring-2 focus:ring-gray-500/50 focus:border-gray-500/50 transition-all duration-200 font-mono text-sm"
                    />
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500">
                      💳
                    </div>
                  </div>
                </motion.div>

                {/* Expiry and CVC */}
                <motion.div
                  className="flex gap-3"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.25, duration: 0.3 }}
                >
                  <div className="flex flex-col gap-2 flex-1">
                    <label className="text-xs font-medium text-gray-300">Expiry Date</label>
                    <input
                      type="text"
                      placeholder="MM/YY"
                      className="w-full rounded-lg px-3 py-2.5 bg-gray-800/50 backdrop-blur-sm text-white placeholder-gray-500 border border-gray-600/30 focus:outline-none focus:ring-2 focus:ring-gray-500/50 focus:border-gray-500/50 transition-all duration-200 font-mono text-sm"
                    />
                  </div>
                  <div className="flex flex-col gap-2 flex-1">
                    <label className="text-xs font-medium text-gray-300">CVC</label>
                    <input
                      type="text"
                      placeholder="123"
                      className="w-full rounded-lg px-3 py-2.5 bg-gray-800/50 backdrop-blur-sm text-white placeholder-gray-500 border border-gray-600/30 focus:outline-none focus:ring-2 focus:ring-gray-500/50 focus:border-gray-500/50 transition-all duration-200 font-mono text-sm"
                    />
                  </div>
                </motion.div>

                {/* Name on Card */}
                <motion.div
                  className="flex flex-col gap-2"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.35, duration: 0.3 }}
                >
                  <label className="text-xs font-medium text-gray-300">Name on Card</label>
                  <input
                    type="text"
                    placeholder="Jane Doe"
                    className="w-full rounded-lg px-3 py-2.5 bg-gray-800/50 backdrop-blur-sm text-white placeholder-gray-500 border border-gray-600/30 focus:outline-none focus:ring-2 focus:ring-gray-500/50 focus:border-gray-500/50 transition-all duration-200 text-sm"
                  />
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        {/* Payment Button - Always rendered */}
        <motion.div
          key="payment-button"
          layout
          className={cn([open ? "px-6 pb-6" : "", "overflow-hidden"])}
        >
          <motion.button
            layout
            className={`w-full py-3 font-semibold text-sm text-white ${
              open
                ? "mt-4 rounded-lg border border-gray-600/30 bg-gradient-to-r from-[#374151] to-[#1f2937]"
                : "px-6 rounded-full border  border-gray-600/30 bg-gradient-to-r from-[#374151] to-[#1f2937]"
            }`}
          >
            <motion.span layout className="flex items-center justify-center gap-2">
              Pay $99
            </motion.span>
          </motion.button>
          {/* Security Badge
            {open && (
              <motion.div
                className="flex items-center justify-center gap-2 text-xs text-gray-400 mt-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                // transition={{ duration: 0.3 }}
              >
                <span>🔒</span>
                <span>Secured by 256-bit SSL encryption</span>
              </motion.div>
            )} */}
        </motion.div>
      </motion.div>
    </LayoutGroup>
  );
}
