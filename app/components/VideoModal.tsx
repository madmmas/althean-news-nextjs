'use client';

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

interface VideoModalProps {
  isOpen: boolean;
  videoUrl: string;
  onClose: () => void;
}

/**
 * React component to replace Magnific Popup for video modals
 */
export default function VideoModal({ isOpen, videoUrl, onClose }: VideoModalProps) {
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

  if (!mounted || !isOpen) return null;

  // Extract YouTube video ID
  const getYouTubeId = (url: string): string | null => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
  };

  const videoId = getYouTubeId(videoUrl);
  const embedUrl = videoId ? `https://www.youtube.com/embed/${videoId}` : videoUrl;

  const modalContent = (
    <div
      className="video-modal-wrap"
      onClick={onClose}
    >
      <div className="video-modal-container">
        <div
          className="video-modal-content"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="mfp-iframe-scaler">
            <button
              className="mfp-close video-modal-close"
              type="button"
              onClick={onClose}
            >
              ×
            </button>
            <iframe
              className="mfp-iframe video-modal-iframe"
              src={embedUrl}
              frameBorder="0"
              allow="autoplay; fullscreen"
              allowFullScreen
            />
          </div>
        </div>
        <div className="video-modal-bg" />
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
}

