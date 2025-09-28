import { ComponentType } from "react";

export interface MicrointeractionEntry {
  name: string;
  slug: string;
  description: string;
  component: ComponentType;
}

export const registry: MicrointeractionEntry[] = [];