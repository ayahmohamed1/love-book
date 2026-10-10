import React, { useState, useEffect, useCallback, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import CoverPage from './CoverPage';
import Spread1Left from './Spread1Left';
import Spread1Right from './Spread1Right';
import Spread2Left from './Spread2Left';
import Spread2Right from './Spread2Right';
import BackCover from './BackCover';
import { sounds } from '../utils/soundEffects';

export function BookContainer({ content }) {
  // Pages 0 to 5:
  // 0: Cover (OUR LOVE)
  // 1: Cat Message ("Happy Birthday, my love.")
  // 2: 6 Memories Photos (2x3 Grid)
  // 3: Modern Burgundy Music Player
  // 4: LOVE LOVE LOVE Typography & Polaroids
  // 5: Lace Heart Final Photo
  const [currentPage, setCurrentPage] = useState(0);
  const [isFlipping, setIsFlipping] = useState(false);
  const [flipDir, setFlipDir] = useState('forward');

  const totalPages = 6;
  const touchStartX = useRef(0);
  const touchStartY = useRef(0);

  const flipTo = useCallback((target, dir) => {
    if (isFlipping || target === currentPage || target < 0 || target >= totalPages) return;
    setIsFlipping(true);
    setFlipDir(dir);
    sounds.playPageFlip();

    setTimeout(() => {
      setCurrentPage(target);
      setIsFlipping(false);
    }, 380);
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

  // Touch Swipe Handlers for 100% reliable mobile flipping
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e) => {
    const deltaX = e.changedTouches[0].clientX - touchStartX.current;
    const deltaY = e.changedTouches[0].clientY - touchStartY.current;

    // Only trigger if horizontal swipe is greater than vertical movement
    if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 40) {
      if (deltaX < 0) {
        // Swiped Left -> Go Forward
        flipForward();
      } else {
        // Swiped Right -> Go Backward
        flipBackward();
      }
    }
  };

  // Click on page: left side flips back, right side flips forward
  const handlePageClick = (e) => {
    // If the click is on an interactive input, slider, or button, ignore
    if (['BUTTON', 'INPUT', 'A'].includes(e.target.tagName)) return;
    
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    if (clickX < rect.width * 0.32) {
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
    <div
      className="book-stage-viewport"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* 3D Single-Page Hardcover Book */}
      <div
        className={`single-book-card ${isFlipping ? `is-turning-${flipDir}` : ''}`}
        onClick={handlePageClick}
      >
        {/* Left Hardcover Spine Depth */}
        <div className="hardcover-spine-edge"></div>

        {/* Dynamic Page Content */}
        <div className="single-page-content-wrapper">
          {currentPage === 0 && (
            <CoverPage
              data={content.cover}
              onOpenBook={flipForward}
            />
          )}

          {currentPage === 1 && (
            <Spread1Left
              data={content.messagePage}
              onNext={flipForward}
            />
          )}

          {currentPage === 2 && (
            <Spread1Right data={content.memoriesPage} />
          )}

          {currentPage === 3 && (
            <Spread2Left data={content.musicPage} />
          )}

          {currentPage === 4 && (
            <Spread2Right data={content.lovePage} />
          )}

          {currentPage === 5 && (
            <BackCover data={content.backPage} />
          )}
        </div>

        {/* Realistic Page Flip Shadow Layer */}
        {isFlipping && <div className={`page-flip-curl-shadow ${flipDir}`}></div>}

        {/* Subtle Corner Hints */}
        {currentPage < totalPages - 1 && (
          <div className="page-curl-corner-hint next-hint"></div>
        )}
        {currentPage > 0 && (
          <div className="page-curl-corner-hint prev-hint"></div>
        )}

        {/* Floor Ambient Shadow */}
        <div className="book-floor-shadow"></div>
      </div>

      {/* Floating Bottom Navigation (Guarantees every page flips effortlessly on mobile & desktop) */}
      <nav className="floating-bottom-book-nav" aria-label="Book navigation">
        <button
          className={`nav-bar-btn ${currentPage === 0 ? 'nav-disabled' : ''}`}
          onClick={(e) => {
            e.stopPropagation();
            flipBackward();
          }}
          disabled={currentPage === 0}
          title="الصفحة السابقة"
          aria-label="Previous page"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        {/* Page Dots Indicator */}
        <div className="page-indicator-dots">
          {Array.from({ length: totalPages }).map((_, idx) => (
            <button
              key={idx}
              className={`indicator-dot ${currentPage === idx ? 'active-dot' : ''}`}
              onClick={(e) => {
                e.stopPropagation();
                flipTo(idx, idx > currentPage ? 'forward' : 'backward');
              }}
              title={`الصفحة ${idx + 1}`}
              aria-label={`Go to page ${idx + 1}`}
            />
          ))}
        </div>

        <button
          className={`nav-bar-btn ${currentPage === totalPages - 1 ? 'nav-disabled' : ''}`}
          onClick={(e) => {
            e.stopPropagation();
            flipForward();
          }}
          disabled={currentPage === totalPages - 1}
          title="الصفحة التالية"
          aria-label="Next page"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </nav>
    </div>
  );
}

export default BookContainer;
