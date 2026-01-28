// Utility function for combining class names
// Note: This is a simplified version that doesn't require external dependencies
// If you need full clsx/tailwind-merge functionality, install: yarn add clsx tailwind-merge

type ClassValue = string | number | boolean | null | undefined | { [key: string]: boolean | null | undefined } | ClassValue[];

/**
 * Combines class names into a single string
 * Simplified version - for full functionality, use clsx and tailwind-merge
 */
export function cn(...inputs: ClassValue[]): string {
  const classes: string[] = [];
  
  for (const input of inputs) {
    if (!input) continue;
    
    if (typeof input === 'string') {
      classes.push(input);
    } else if (typeof input === 'number') {
      classes.push(String(input));
    } else if (Array.isArray(input)) {
      const inner = cn(...input);
      if (inner) classes.push(inner);
    } else if (typeof input === 'object') {
      for (const key in input) {
        if (input[key]) {
          classes.push(key);
        }
      }
    }
  }
  
  return classes.join(' ');
}
