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
  const totalPages = 6;
  const [currentPage, setCurrentPage] = useState(0);
  const [targetPage, setTargetPage] = useState(0);
  const [isFlipping, setIsFlipping] = useState(false);
  const [flipDir, setFlipDir] = useState('forward');

  const touchStartX = useRef(0);
  const touchStartY = useRef(0);

  const pageNames = [
    { title: "Cover", label: "OUR LOVE" },
    { title: "Message", label: "Message" },
    { title: "Memories", label: "Memories" },
    { title: "Song", label: "Our Song" },
    { title: "Love", label: "Love" },
    { title: "Heart", label: "Forever" }
  ];

  const renderPage = useCallback((pageIndex) => {
    switch (pageIndex) {
      case 0:
        return <CoverPage data={content.cover} onOpenBook={() => flipTo(1, 'forward')} />;
      case 1:
        return <Spread1Left data={content.messagePage} onNext={() => flipTo(2, 'forward')} />;
      case 2:
        return <Spread1Right data={content.memoriesPage} />;
      case 3:
        return <Spread2Left data={content.musicPage} />;
      case 4:
        return <Spread2Right data={content.lovePage} />;
      case 5:
        return <BackCover data={content.backPage} />;
      default:
        return null;
    }
  }, [content]);

  const flipTo = useCallback((target, dir) => {
    if (isFlipping || target === currentPage || target < 0 || target >= totalPages) return;
    
    const direction = dir || (target > currentPage ? 'forward' : 'backward');
    setIsFlipping(true);
    setFlipDir(direction);
    setTargetPage(target);
    sounds.playPageFlip();

    // 600ms realistic 3D page turn
    setTimeout(() => {
      setCurrentPage(target);
      setIsFlipping(false);
    }, 600);
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

  // Touch Swipe Handlers for mobile
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e) => {
    const deltaX = e.changedTouches[0].clientX - touchStartX.current;
    const deltaY = e.changedTouches[0].clientY - touchStartY.current;

    if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 40) {
      if (deltaX < 0) {
        flipForward();
      } else {
        flipBackward();
      }
    }
  };

  // Click on page: left side flips back, right side flips forward
  const handlePageClick = (e) => {
    if (['BUTTON', 'INPUT', 'A'].includes(e.target.tagName)) return;
    // Don't flip if clicking inside music card, chic button, or photo lightbox
    if (
      e.target.closest('.compact-music-card') ||
      e.target.closest('.lightbox-content') ||
      e.target.closest('.chic-flip-indicator')
    ) return;

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

  // Active page displayed underneath during flip
  const underlyingPageIndex = isFlipping
    ? (flipDir === 'forward' ? targetPage : currentPage)
    : currentPage;

  // Page leaf being rotated in 3D during flip
  const flippingPageIndex = isFlipping
    ? (flipDir === 'forward' ? currentPage : targetPage)
    : null;

  return (
    <div
      className="book-stage-viewport"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* 3D Physical Scrapbook Container */}
      <div className="book-3d-scene">
        
        {/* Hardcover Base Backplate (الغلاف الصلب الخارجي بلمسة سوداء فاخرة وبدون أي زوايا صفراء) */}
        <div className="hardcover-book-base">
          
          {/* Sleek Black Metallic Corner Protectors on Hardcover */}
          <div className="cover-corner-bracket top-left"></div>
          <div className="cover-corner-bracket top-right"></div>
          <div className="cover-corner-bracket bottom-left"></div>
          <div className="cover-corner-bracket bottom-right"></div>

          {/* Hardcover Spine Column with 3D Depth & Sleek Black Stitched Hinges */}
          <div className="hardcover-spine-column">
            <div className="spine-fold-shadow"></div>
            <div className="spine-embossed-ridge ridge-1"></div>
            <div className="spine-embossed-ridge ridge-2"></div>
            <div className="spine-embossed-ridge ridge-3"></div>
            <div className="spine-black-stitch"></div>
          </div>

          {/* Left Stacked Pages (الورق المقلوب المتجمع على الشمال) */}
          <div className="staggered-pages-stack-left">
            {currentPage > 0 && (
              <div
                className="staggered-leaf-edge left-leaf-1"
                onClick={(e) => { e.stopPropagation(); flipBackward(); }}
                title="الصفحة السابقة"
              />
            )}
            {currentPage > 1 && (
              <div
                className="staggered-leaf-edge left-leaf-2"
                onClick={(e) => { e.stopPropagation(); flipTo(currentPage - 2, 'backward'); }}
              />
            )}
          </div>

          {/* The Inner Book Pages Deck */}
          <div
            className="book-pages-deck"
            onClick={handlePageClick}
          >
            {/* The Underlying Active Page Layer */}
            <div className="book-page-layer underlying-layer">
              {renderPage(underlyingPageIndex)}
              {isFlipping && <div className="underlying-page-shadow"></div>}
            </div>

            {/* Right Stacked Pages (صفحات الكتاب المتتالية المرصوصة خلف الصفحة مع لمسات سوداء راقية) */}
            <div className="staggered-pages-stack-right">
              {Array.from({ length: totalPages - 1 - currentPage }).map((_, idx) => {
                const pIdx = currentPage + 1 + idx;
                const tabWidth = 14 + (idx + 1) * 9;
                return (
                  <div
                    key={pIdx}
                    className={`staggered-leaf-tab tab-step-${idx + 1}`}
                    style={{
                      width: `${tabWidth}px`,
                      zIndex: 10 - idx,
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                      flipTo(pIdx, 'forward');
                    }}
                    title={`انتقل إلى: ${pageNames[pIdx]?.label || `صفحة ${pIdx + 1}`}`}
                  >
                    <span className="tab-vertical-hint">{pageNames[pIdx]?.title}</span>
                    <div className="tab-black-edge"></div>
                  </div>
                );
              })}
            </div>

            {/* The 3D Flipping Leaf (حركة قلبة صفحة الكتاب الحقيقية ثلاثية الأبعاد) */}
            {isFlipping && flippingPageIndex !== null && (
              <div className={`book-flipping-leaf leaf-turn-${flipDir}`}>
                {/* Front face of leaf: outgoing page */}
                <div className="leaf-face leaf-face-front">
                  {renderPage(flippingPageIndex)}
                  <div className="leaf-shading-glare front-glare"></div>
                </div>

                {/* Back face of leaf: luxury burgundy scrapbook texture with black/silver crest */}
                <div className="leaf-face leaf-face-back">
                  <div className="scrapbook-page-back-canvas">
                    <div className="back-damask-motif">
                      <div className="back-heart-crest">❦</div>
                      <div className="back-monogram-rule"></div>
                      <span className="back-book-title">BOOK OF US</span>
                    </div>
                  </div>
                  <div className="leaf-shading-glare back-glare"></div>
                </div>
              </div>
            )}

            {/* Inner Gutter Shadow (ثنية الكتاب الداخلية) */}
            <div className="book-inner-gutter-shadow"></div>

            {/* Chic Minimalist Page Turn Hint (أنيق ومودرن جداً وبدون أي جزء شفاف يغطي الصور) */}
            {currentPage < totalPages - 1 && !isFlipping && (
              <div
                className={`chic-flip-indicator next-indicator ${currentPage === 0 ? 'is-cover-badge' : ''}`}
                onClick={(e) => {
                  e.stopPropagation();
                  flipForward();
                }}
                title={currentPage === 0 ? "افتح الكتاب" : "الصفحة التالية"}
              >
                <span className="chic-indicator-text">
                  {currentPage === 0 ? "OPEN" : "FLIP"}
                </span>
                <span className="chic-indicator-arrow">→</span>
              </div>
            )}

            {currentPage > 0 && !isFlipping && (
              <div
                className="chic-flip-indicator prev-indicator"
                onClick={(e) => {
                  e.stopPropagation();
                  flipBackward();
                }}
                title="الصفحة السابقة"
              >
                <span className="chic-indicator-arrow">←</span>
                <span className="chic-indicator-text">BACK</span>
              </div>
            )}
          </div>

          {/* Hardcover Outer Overhang Board Rims (بروز أطراف الغلاف) */}
          <div className="hardcover-overhang-rim top-rim"></div>
          <div className="hardcover-overhang-rim bottom-rim"></div>
          <div className="hardcover-overhang-rim right-rim"></div>
        </div>

        {/* 3D Realistic Contact Floor Shadow */}
        <div className="book-scene-floor-shadow"></div>
      </div>

      {/* Floating Bottom Navigation */}
      <nav className="floating-bottom-book-nav" aria-label="Book navigation">
        <button
          className={`nav-bar-btn ${currentPage === 0 || isFlipping ? 'nav-disabled' : ''}`}
          onClick={(e) => {
            e.stopPropagation();
            flipBackward();
          }}
          disabled={currentPage === 0 || isFlipping}
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
          className={`nav-bar-btn ${currentPage === totalPages - 1 || isFlipping ? 'nav-disabled' : ''}`}
          onClick={(e) => {
            e.stopPropagation();
            flipForward();
          }}
          disabled={currentPage === totalPages - 1 || isFlipping}
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
