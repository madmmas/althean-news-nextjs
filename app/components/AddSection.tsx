'use client';
import Image from 'next/image';

import { withBasePath } from '@/lib/basePath';

interface AddSectionProps {
  padding?: string;
  image?: string;
  alt?: string;
  noContainer?: boolean;
}

export default function AddSection({ 
  padding = '', 
  image = '/assets/images/add2.jpg', 
  alt = 'add-image',
  noContainer = false
}: AddSectionProps = {}) {
  const imagePath = withBasePath(image);
  
  if (noContainer) {
    return (
      <div className={`back-add text-center ${padding}`}>
        <Image src={imagePath} alt={alt}
                  width={800}
                  height={600}
                />
      </div>
    );
  }
  return (
    <div className={`back-add text-center ${padding}`}>
      <div className="container">
        <Image src={imagePath} alt={alt}
                  width={800}
                  height={600}
                />
      </div>
    </div>
  );
}

