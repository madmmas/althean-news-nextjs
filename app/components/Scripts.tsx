'use client';

import { useEffect } from 'react';
import { getBasePath } from '@/lib/basePath';

/**
 * Scripts component - loads only non-jQuery scripts
 * All jQuery functionality has been replaced with React hooks and components
 */
export default function Scripts() {
  useEffect(() => {
    const basePath = getBasePath();
    
    // Load only non-jQuery scripts
    const loadScript = (src: string, onLoad?: () => void) => {
      // Check if script is already loaded
      const existingScript = document.querySelector(`script[src="${src}"]`);
      if (existingScript) {
        if (onLoad) onLoad();
        return existingScript;
      }

      const script = document.createElement('script');
      script.src = src;
      script.async = true;
      if (onLoad) script.onload = onLoad;
      document.body.appendChild(script);
      return script;
    };

    // Load Bootstrap (doesn't require jQuery in Bootstrap 5)
    loadScript(`${basePath}/assets/js/bootstrap.min.js`);
    
    // Load WOW.js for animations (doesn't require jQuery)
    loadScript(`${basePath}/assets/js/wow.min.js`, () => {
      // Initialize WOW after it loads
      if (typeof window !== 'undefined' && (window as any).WOW) {
        const wow = new (window as any).WOW({
          boxClass: 'wow',
          animateClass: 'animated',
          offset: 0,
          mobile: false,
          live: true,
        });
        wow.init();
      }
    });
    
    // Load other plugins that don't require jQuery
    loadScript(`${basePath}/assets/js/plugins.js`);
    
    // Load Owl Carousel CSS (for React Owl Carousel component)
    const loadCSS = (href: string) => {
      const existingLink = document.querySelector(`link[href="${href}"]`);
      if (existingLink) return existingLink;
      
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = href;
      document.head.appendChild(link);
      return link;
    };
    
    // Load Owl Carousel CSS files
    loadCSS(`${basePath}/assets/css/owl.carousel.css`);
  }, []);

  return null;
}

