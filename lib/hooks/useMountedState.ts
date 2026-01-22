import { useState, useEffect } from 'react';

/**
 * Custom hook to handle client-side mount state
 * Prevents SSR hydration issues with client-only components
 */
export function useMountedState(): boolean {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return mounted;
}

