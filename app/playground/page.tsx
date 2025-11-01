"use client";

import { ComponentSelector } from "@/components/playground/component-selector";
import { registry } from "@/lib/registry";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

const STORAGE_KEY = "microinteractions-selected-slug";

export default function PlaygroundPage() {
  const [selectedSlug, setSelectedSlug] = useState<string>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved && registry.find(entry => entry.slug === saved)) {
        return saved;
      }
    }
    return registry[0]?.slug || "";
  });
  const [showDescription, setShowDescription] = useState(false);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, selectedSlug);
  }, [selectedSlug]);

  const selectedEntry = registry.find(entry => entry.slug === selectedSlug);
  const SelectedComponent = selectedEntry?.component;

  return (
    <div className="min-h-screen text-white p-8 relative" style={{ background: "#000000" }}>
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='2' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.08'/%3E%3C/svg%3E")`,
          opacity: 1,
        }}
      />
      <div className="max-w-7xl mx-auto relative items-center flex flex-col z-10">
        <div className="flex gap-4 items-center">
          <ComponentSelector
            registry={registry}
            selectedSlug={selectedSlug}
            onSelectSlug={setSelectedSlug}
          />

          {selectedEntry && (
            <button
              onClick={() => setShowDescription(!showDescription)}
              className="px-4 py-2 bg-neutral-800 hover:bg-neutral-700 rounded-lg transition-colors self-end"
            >
              {showDescription ? "Hide" : "Show"} Description
            </button>
          )}
        </div>

        <AnimatePresence mode="popLayout">
          {selectedEntry && showDescription && (
            <motion.div
              className="mb-8 p-4 max-w-lg"
              initial={{ y: -100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -100, opacity: 0, height: 0 }}
              transition={{ type: "spring", damping: 16, stiffness: 140 }}
            >
              <p className="text-neutral-500 text-sm">{selectedEntry.description}</p>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="min-h-[600px] w-xl rounded-lg flex items-center justify-center p-8">
          {SelectedComponent ? (
            <SelectedComponent />
          ) : (
            <p className="text-neutral-500 text-center">
              No component selected. Add components to the registry to get started.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
