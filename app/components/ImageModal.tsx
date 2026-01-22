'use client';

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import Image from 'next/image';

interface ImageModalProps {
  isOpen: boolean;
  imageUrl: string;
  alt?: string;
  onClose: () => void;
}

/**
 * React component for image lightbox/preview
 */
export default function ImageModal({ isOpen, imageUrl, alt = 'Image', onClose }: ImageModalProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Handle ESC key to close modal
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      window.addEventListener('keydown', handleEsc);
    }

    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, [isOpen, onClose]);

  if (!mounted || !isOpen) return null;

  const modalContent = (
    <div
      className="mfp-wrap mfp-close-btn-in mfp-auto-cursor mfp-fade mfp-wrap-style mfp-ready"
      onClick={onClose}
    >
      <div className="mfp-container mfp-s-ready mfp-image-holder mfp-container-style">
        <div
          className="mfp-content mfp-content-style"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="mfp-figure">
            <button
              className="mfp-close mfp-close-style"
              type="button"
              onClick={onClose}
              title="Close (Esc)"
            >
              ×
            </button>
            <figure>
              <Image
                src={imageUrl}
                alt={alt}
                width={1200}
                height={800}
                style={{ width: 'auto', height: 'auto', maxWidth: '100%', maxHeight: '90vh' }}
                className="mfp-img"
              />
              {alt && (
                <figcaption>
                  <div className="mfp-bottom-bar">
                    <div className="mfp-title">{alt}</div>
                  </div>
                </figcaption>
              )}
            </figure>
          </div>
        </div>
        <div className="mfp-bg mfp-bg-style" />
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
}

