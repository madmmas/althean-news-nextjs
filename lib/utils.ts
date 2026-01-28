import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

// modified from shadcn/ui/utils.js
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
