import React, { useState, useEffect, useCallback } from 'react';
import confetti from 'canvas-confetti';
import {
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Minimize2,
  Sparkles,
  Volume2,
  VolumeX,
  Settings,
  HeartHandshake,
  BookOpen
} from 'lucide-react';
import CoverPage from './CoverPage';
import Spread1Left from './Spread1Left';
import Spread1Right from './Spread1Right';
import Spread2Left from './Spread2Left';
import Spread2Right from './Spread2Right';
import BackCover from './BackCover';
import { sounds } from '../utils/soundEffects';

export function BookContainer({ content, onOpenCustomizer }) {
  const [spreadIndex, setSpreadIndex] = useState(0);
  const [isFlipping, setIsFlipping] = useState(false);
  const [flipDirection, setFlipDirection] = useState('next'); // 'next' | 'prev'
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);

  const totalSpreads = 4; // 0: Cover, 1: Spread 1, 2: Spread 2, 3: Back Cover

  // Navigation handlers with page flip sound & animation
  const goToSpread = useCallback((targetIndex, dir = null) => {
    if (targetIndex === spreadIndex || targetIndex < 0 || targetIndex >= totalSpreads) return;
    
    const direction = dir || (targetIndex > spreadIndex ? 'next' : 'prev');
    setFlipDirection(direction);
    setIsFlipping(true);
    sounds.playPageFlip();

    // After animation duration, switch content
    setTimeout(() => {
      setSpreadIndex(targetIndex);
      setIsFlipping(false);
    }, 380);
  }, [spreadIndex, totalSpreads]);

  const handleNext = useCallback(() => {
    if (spreadIndex < totalSpreads - 1) {
      goToSpread(spreadIndex + 1, 'next');
    }
  }, [spreadIndex, totalSpreads, goToSpread]);

  const handlePrev = useCallback(() => {
    if (spreadIndex > 0) {
      goToSpread(spreadIndex - 1, 'prev');
    }
  }, [spreadIndex, goToSpread]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight') {
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        handlePrev();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleNext, handlePrev]);

  // Fullscreen toggle
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().then(() => setIsFullscreen(true)).catch(() => {});
    } else {
      document.exitFullscreen().then(() => setIsFullscreen(false)).catch(() => {});
    }
  };

  // Romantic hearts shower burst
  const triggerRomanticConfetti = () => {
    sounds.playChime();
    
    // Heart confetti shapes
    const defaults = {
      spread: 360,
      ticks: 80,
      gravity: 0.6,
      decay: 0.94,
      startVelocity: 25,
      colors: ['#8b121e', '#e63946', '#f28482', '#f7cad0', '#ffb5a7']
    };

    confetti({
      ...defaults,
      particleCount: 45,
      scalar: 1.2,
      shapes: ['circle']
    });

    confetti({
      ...defaults,
      particleCount: 25,
      scalar: 2,
      shapes: ['star']
    });
  };

  // Toggle sound effects
  const toggleSound = () => {
    const nextState = !soundEnabled;
    setSoundEnabled(nextState);
    sounds.enabled = nextState;
  };

  return (
    <div className="book-app-wrapper">
      {/* Top Floating App Bar */}
      <header className="book-top-bar">
        <div className="top-bar-left">
          <span className="app-badge">
            <HeartHandshake className="w-4 h-4 text-[#8b121e]" />
            <span>كتاب الذكريات • Memory Book</span>
          </span>
          <span className="current-title-tag">{content.cover?.title || "OUR LOVE"}</span>
        </div>

        <div className="top-bar-actions">
          {/* Confetti Trigger */}
          <button
            onClick={triggerRomanticConfetti}
            className="action-icon-btn"
            title="إطلاق قلوب ونجوم رومانسية"
            aria-label="Shower hearts"
          >
            <Sparkles className="w-4 h-4 text-amber-500" />
            <span className="btn-label-desktop">تساقط القلوب</span>
          </button>

          {/* Sound Mute/Unmute */}
          <button
            onClick={toggleSound}
            className="action-icon-btn"
            title={soundEnabled ? "كتم أصوات تقليب الصفحات" : "تفعيل أصوات التقليب"}
            aria-label="Toggle sound"
          >
            {soundEnabled ? <Volume2 className="w-4 h-4 text-[#8b121e]" /> : <VolumeX className="w-4 h-4 text-gray-400" />}
          </button>

          {/* Fullscreen Toggle */}
          <button
            onClick={toggleFullscreen}
            className="action-icon-btn"
            title={isFullscreen ? "الخروج من ملء الشاشة" : "ملء الشاشة"}
            aria-label="Toggle fullscreen"
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>

          {/* Client Customizer Modal Button */}
          <button
            onClick={onOpenCustomizer}
            className="action-icon-btn highlight-btn"
            title="تعديل البيانات والصور لعميل جديد"
            aria-label="Customize book content"
          >
            <Settings className="w-4 h-4" />
            <span className="font-semibold">تعديل بيانات العميل</span>
          </button>
        </div>
      </header>

      {/* Main 3D Book Stage */}
      <main className="book-stage">
        {/* Navigation Arrow: Previous (Left) */}
        <button
          className={`nav-arrow-btn nav-prev ${spreadIndex === 0 ? 'disabled' : ''}`}
          onClick={handlePrev}
          disabled={spreadIndex === 0 || isFlipping}
          aria-label="الصفحة السابقة"
          title="الصفحة السابقة (السهم الأيسر)"
        >
          <ChevronLeft className="w-7 h-7" />
        </button>

        {/* 3D Book Object */}
        <div className={`book-3d-container ${spreadIndex === 0 ? 'is-closed-cover' : ''} ${spreadIndex === 3 ? 'is-back-cover' : 'is-open-spread'}`}>
          <div className={`book-binding-wrapper ${isFlipping ? `flipping-${flipDirection}` : ''}`}>
            
            {/* SPREAD 0: The Front Cover */}
            {spreadIndex === 0 && (
              <div className="single-page-card cover-card">
                <CoverPage
                  data={content.cover}
                  onOpenBook={() => goToSpread(1, 'next')}
                />
              </div>
            )}

            {/* SPREAD 1: Open 2-Pages (Locket + Love Letter & 9-Photos Grid) */}
            {spreadIndex === 1 && (
              <div className="two-page-spread">
                <div className="page-leaf leaf-left">
                  <Spread1Left data={content.spread1.leftPage} />
                </div>
                <div className="book-spine-divider">
                  <div className="spine-crease"></div>
                  <div className="spine-shadow-left"></div>
                  <div className="spine-shadow-right"></div>
                </div>
                <div className="page-leaf leaf-right">
                  <Spread1Right data={content.spread1.rightPage} />
                </div>
              </div>
            )}

            {/* SPREAD 2: Open 2-Pages (Postage Stamp Music Player & LOVE Typography with Polaroids) */}
            {spreadIndex === 2 && (
              <div className="two-page-spread">
                <div className="page-leaf leaf-left">
                  <Spread2Left data={content.spread2.leftPage} />
                </div>
                <div className="book-spine-divider">
                  <div className="spine-crease"></div>
                  <div className="spine-shadow-left"></div>
                  <div className="spine-shadow-right"></div>
                </div>
                <div className="page-leaf leaf-right">
                  <Spread2Right data={content.spread2.rightPage} />
                </div>
              </div>
            )}

            {/* SPREAD 3: Back Cover Page */}
            {spreadIndex === 3 && (
              <div className="single-page-card back-card">
                <BackCover
                  data={content.backCover}
                  onRestartBook={() => goToSpread(0, 'prev')}
                />
              </div>
            )}

          </div>

          {/* Book Depth and Edge Drop Shadow Effect */}
          <div className="book-bottom-shadow"></div>
          <div className="book-lateral-pages-thickness"></div>
        </div>

        {/* Navigation Arrow: Next (Right) */}
        <button
          className={`nav-arrow-btn nav-next ${spreadIndex === totalSpreads - 1 ? 'disabled' : ''}`}
          onClick={handleNext}
          disabled={spreadIndex === totalSpreads - 1 || isFlipping}
          aria-label="الصفحة التالية"
          title="الصفحة التالية (السهم الأيمن)"
        >
          <ChevronRight className="w-7 h-7" />
        </button>
      </main>

      {/* Bottom Floating Navigation Dock */}
      <footer className="book-bottom-dock">
        <div className="dock-pills-list">
          <button
            className={`dock-pill ${spreadIndex === 0 ? 'active' : ''}`}
            onClick={() => goToSpread(0)}
          >
            <BookOpen className="w-3.5 h-3.5 inline mr-1" />
            الغلاف
          </button>

          <button
            className={`dock-pill ${spreadIndex === 1 ? 'active' : ''}`}
            onClick={() => goToSpread(1)}
          >
            صفحة 1 - 2 (الرسالة ومعرض الصور)
          </button>

          <button
            className={`dock-pill ${spreadIndex === 2 ? 'active' : ''}`}
            onClick={() => goToSpread(2)}
          >
            صفحة 3 - 4 (الأغنية و LOVE)
          </button>

          <button
            className={`dock-pill ${spreadIndex === 3 ? 'active' : ''}`}
            onClick={() => goToSpread(3)}
          >
            الخاتمة
          </button>
        </div>

        <div className="dock-keyboard-hint">
          <span>يمكنك استخدام الأسهم ⬅️ ➡️ من لوحة المفاتيح للتنقل بين الصفحات</span>
        </div>
      </footer>
    </div>
  );
}

export default BookContainer;
