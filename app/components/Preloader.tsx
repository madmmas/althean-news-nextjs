'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { withBasePath } from '@/lib/basePath';

export default function Preloader() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (!isLoading) return null;

  return (
    <div id="back__preloader">
      <div id="back__circle_loader"></div>
      <div className="back__loader_logo">
        <Image 
          src={withBasePath("/assets/images/preload.png")} 
          alt="Preload"
          width={100}
          height={100}
        />
      </div>
    </div>
  );
}

