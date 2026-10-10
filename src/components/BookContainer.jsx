import React, { useState, useEffect, useCallback } from 'react';
import CoverPage from './CoverPage';
import Spread1Left from './Spread1Left';
import Spread1Right from './Spread1Right';
import Spread2Left from './Spread2Left';
import Spread2Right from './Spread2Right';
import BackCover from './BackCover';
import { sounds } from '../utils/soundEffects';

export function BookContainer({ content }) {
  // Single-Page Book Pages: 0 to 5
  // 0: Cover (OUR LOVE)
  // 1: Locket + Love Letter
  // 2: 9-Photos Grid
  // 3: Music Player
  // 4: LOVE LOVE LOVE Typography
  // 5: You Are Loved (Back Page)
  const [currentPage, setCurrentPage] = useState(0);
  const [isFlipping, setIsFlipping] = useState(false);
  const [flipDir, setFlipDir] = useState('forward');

  const totalPages = 6;

  const flipTo = useCallback((target, dir) => {
    if (isFlipping || target === currentPage || target < 0 || target >= totalPages) return;
    setIsFlipping(true);
    setFlipDir(dir);
    sounds.playPageFlip();

    setTimeout(() => {
      setCurrentPage(target);
      setIsFlipping(false);
    }, 420);
  }, [currentPage, isFlipping, totalPages]);

  const flipForward = useCallback(() => {
    if (currentPage < totalPages - 1) {
      flipTo(currentPage + 1, 'forward');
    }
  }, [currentPage, totalPages, flipTo]);

  const flipBackward = useCallback(() => {
    if (currentPage > 0) {
      flipTo(currentPage - 1, 'backward');
    }
  }, [currentPage, flipTo]);

  // Handle click on page: click left side flips back, click right side flips forward
  const handlePageClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    if (clickX < rect.width * 0.35) {
      flipBackward();
    } else {
      flipForward();
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'ArrowRight' || e.key === ' ') {
        flipForward();
      } else if (e.key === 'ArrowLeft') {
        flipBackward();
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [flipForward, flipBackward]);

  return (
    <div className="book-stage-viewport">
      {/* 3D Single-Page Book Object */}
      <div
        className={`single-book-card ${isFlipping ? `is-turning-${flipDir}` : ''}`}
        onClick={handlePageClick}
      >
        {/* Hardcover Left Spine Depth */}
        <div className="hardcover-spine-edge"></div>

        {/* Dynamic Page Render */}
        <div className="single-page-content-wrapper">
          {currentPage === 0 && (
            <CoverPage
              data={content.cover}
              onOpenBook={flipForward}
            />
          )}

          {currentPage === 1 && (
            <Spread1Left data={content.spread1.leftPage} />
          )}

          {currentPage === 2 && (
            <Spread1Right data={content.spread1.rightPage} />
          )}

          {currentPage === 3 && (
            <Spread2Left data={content.spread2.leftPage} />
          )}

          {currentPage === 4 && (
            <Spread2Right data={content.spread2.rightPage} />
          )}

          {currentPage === 5 && (
            <BackCover data={content.backPage} />
          )}
        </div>

        {/* Subtle Corner Curl Indicator */}
        {currentPage < totalPages - 1 && (
          <div className="page-curl-corner-hint next-hint" title="اضغط للتقليب للأمام"></div>
        )}
        {currentPage > 0 && (
          <div className="page-curl-corner-hint prev-hint" title="اضغط للتقليب للخلف"></div>
        )}

        {/* Book Floor Drop Shadow */}
        <div className="book-floor-shadow"></div>
      </div>

      {/* Elegant Minimalist Page Indicator Dots */}
      <div className="page-indicator-dots" aria-label="Book pages indicator">
        {Array.from({ length: totalPages }).map((_, idx) => (
          <button
            key={idx}
            className={`indicator-dot ${currentPage === idx ? 'active-dot' : ''}`}
            onClick={(e) => {
              e.stopPropagation();
              flipTo(idx, idx > currentPage ? 'forward' : 'backward');
            }}
            aria-label={`Go to page ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

export default BookContainer;
