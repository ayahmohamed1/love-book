import React, { useState, useEffect, useCallback } from 'react';
import CoverPage from './CoverPage';
import Spread1Left from './Spread1Left';
import Spread1Right from './Spread1Right';
import Spread2Left from './Spread2Left';
import Spread2Right from './Spread2Right';
import BackCover from './BackCover';
import { sounds } from '../utils/soundEffects';

export function BookContainer({ content }) {
  // 0: Cover (Closed), 1: Spread 1 (Open), 2: Spread 2 (Open), 3: Back Page (Open or Closed)
  const [currentPage, setCurrentPage] = useState(0);
  const [isFlipping, setIsFlipping] = useState(false);
  const [flipDir, setFlipDir] = useState('forward');

  const totalPages = 4;

  const flipTo = useCallback((target, dir) => {
    if (isFlipping || target === currentPage || target < 0 || target >= totalPages) return;
    setIsFlipping(true);
    setFlipDir(dir);
    sounds.playPageFlip();

    setTimeout(() => {
      setCurrentPage(target);
      setIsFlipping(false);
    }, 450);
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
      {/* 3D Interactive Book */}
      <div className={`book-object ${currentPage === 0 ? 'book-closed' : 'book-open'} ${isFlipping ? `is-flipping-${flipDir}` : ''}`}>
        
        {/* ==============================================================
            PAGE 0: CLOSED COVER
            ============================================================== */}
        {currentPage === 0 && (
          <div className="book-single-cover" onClick={flipForward}>
            <CoverPage
              data={content.cover}
              onOpenBook={flipForward}
            />
            {/* Hardcover thickness & shadow */}
            <div className="hardcover-edge-spine"></div>
            <div className="page-curl-corner-hint"></div>
          </div>
        )}

        {/* ==============================================================
            PAGE 1: SPREAD 1 (Locket + Letter & 9-Photos Grid)
            ============================================================== */}
        {currentPage === 1 && (
          <div className="book-spread-wrapper">
            {/* Left Page (Click to flip backward to Cover) */}
            <div className="spread-half spread-left-page" onClick={flipBackward}>
              <Spread1Left data={content.spread1.leftPage} />
              <div className="page-turn-hint-left"></div>
            </div>

            {/* Middle Book Spine */}
            <div className="book-center-spine">
              <div className="spine-crease-shadow"></div>
            </div>

            {/* Right Page (Click to flip forward to Spread 2) */}
            <div className="spread-half spread-right-page" onClick={flipForward}>
              <Spread1Right data={content.spread1.rightPage} />
              <div className="page-turn-hint-right"></div>
            </div>
          </div>
        )}

        {/* ==============================================================
            PAGE 2: SPREAD 2 (Music Player & LOVE Typography with Polaroids)
            ============================================================== */}
        {currentPage === 2 && (
          <div className="book-spread-wrapper">
            {/* Left Page (Click to flip backward to Spread 1) */}
            <div className="spread-half spread-left-page" onClick={flipBackward}>
              <Spread2Left data={content.spread2.leftPage} />
              <div className="page-turn-hint-left"></div>
            </div>

            {/* Middle Book Spine */}
            <div className="book-center-spine">
              <div className="spine-crease-shadow"></div>
            </div>

            {/* Right Page (Click to flip forward to Back Page) */}
            <div className="spread-half spread-right-page" onClick={flipForward}>
              <Spread2Right data={content.spread2.rightPage} />
              <div className="page-turn-hint-right"></div>
            </div>
          </div>
        )}

        {/* ==============================================================
            PAGE 3: SPREAD 3 / BACK PAGE (You are loved Card)
            ============================================================== */}
        {currentPage === 3 && (
          <div className="book-single-cover back-cover-view" onClick={flipBackward}>
            <BackCover data={content.backPage} />
            <div className="hardcover-edge-spine spine-right"></div>
            <div className="page-curl-corner-hint flip-back-hint"></div>
          </div>
        )}

        {/* 3D Floor Shadow */}
        <div className="book-floor-shadow"></div>
      </div>
    </div>
  );
}

export default BookContainer;
