"use client";

import { useState, useEffect } from "react";
import { registry } from "@/lib/registry";

const STORAGE_KEY = "microinteractions-selected-slug";

export default function PlaygroundPage() {
  const [selectedSlug, setSelectedSlug] = useState<string>(registry[0]?.slug || "");
  const [showDescription, setShowDescription] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved && registry.find(entry => entry.slug === saved)) {
      setSelectedSlug(saved);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, selectedSlug);
  }, [selectedSlug]);

  const selectedEntry = registry.find(entry => entry.slug === selectedSlug);
  const SelectedComponent = selectedEntry?.component;

  return (
    <div className="min-h-screen bg-neutral-950 text-white p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 flex gap-4 items-center">
          <div className="flex-1">
            <label htmlFor="component-select" className="block text-sm font-medium mb-2">
              Select Component
            </label>
            <select
              id="component-select"
              value={selectedSlug}
              onChange={e => setSelectedSlug(e.target.value)}
              className="w-full px-4 py-2 bg-neutral-900 border border-neutral-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {registry.length === 0 ? (
                <option value="">No components available</option>
              ) : (
                registry.map(entry => (
                  <option key={entry.slug} value={entry.slug}>
                    {entry.name}
                  </option>
                ))
              )}
            </select>
          </div>

          {selectedEntry && (
            <button
              onClick={() => setShowDescription(!showDescription)}
              className="px-4 py-2 bg-neutral-800 hover:bg-neutral-700 rounded-lg transition-colors self-end"
            >
              {showDescription ? "Hide" : "Show"} Description
            </button>
          )}
        </div>

        {selectedEntry && showDescription && (
          <div className="mb-8 p-4 bg-neutral-900 border border-neutral-800 rounded-lg">
            <h3 className="text-lg font-semibold mb-2">{selectedEntry.name}</h3>
            <p className="text-neutral-400">{selectedEntry.description}</p>
          </div>
        )}

        <div className="min-h-[600px] rounded-lg flex items-center justify-center p-8">
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
