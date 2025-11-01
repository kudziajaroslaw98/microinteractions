"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { type MicrointeractionEntry } from "@/lib/registry";
import { ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";

const STORAGE_KEY = "microinteractions-selected-slug";

interface ComponentSelectorProps {
  registry: MicrointeractionEntry[];
  selectedSlug: string;
  onSelectSlug: (slug: string) => void;
}

export function ComponentSelector({
  registry,
  selectedSlug,
  onSelectSlug,
}: ComponentSelectorProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const selectedEntry = registry.find((entry) => entry.slug === selectedSlug);

  // During SSR and initial client render, show a consistent placeholder
  // After mounting, show the actual selected component name
  const displayText = mounted
    ? selectedEntry?.name || "Select a component"
    : "Select a component";

  return (
    <div>
      <label className="block text-sm font-medium mb-2">Select Component</label>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="w-xs px-4 py-2 bg-neutral-900 border border-neutral-800 rounded-lg hover:bg-neutral-800 transition-colors flex items-center justify-between">
            <span>{displayText}</span>
            <ChevronDown className="h-4 w-4 opacity-50" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-[--radix-dropdown-menu-trigger-width]">
          {registry.length === 0 ? (
            <DropdownMenuItem disabled>No components available</DropdownMenuItem>
          ) : (
            registry.map((entry) => (
              <DropdownMenuItem
                key={entry.slug}
                onClick={() => onSelectSlug(entry.slug)}
              >
                {entry.name}
              </DropdownMenuItem>
            ))
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
