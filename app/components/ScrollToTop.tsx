'use client';

import { useEffect, useState } from 'react';

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);

    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <div 
      id="backscrollUp" 
      onClick={scrollToTop}
      className={isVisible ? 'scroll-to-top-visible' : 'scroll-to-top-hidden'}
    >
      <span aria-hidden="true" className="fi-rr-arrow-small-up"></span>
    </div>
  );
}

