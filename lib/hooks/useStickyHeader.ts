'use client';

import { useEffect, useState } from 'react';

/**
 * Hook to handle sticky header on scroll
 * Replaces jQuery sticky header functionality
 */
export function useStickyHeader() {
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scroll = window.scrollY || window.pageYOffset;
      setIsSticky(scroll >= 100);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initial state

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return isSticky;
}

