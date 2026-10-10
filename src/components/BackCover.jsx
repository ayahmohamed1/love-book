import React from 'react';
import { RotateCcw, Heart, Sparkles } from 'lucide-react';

export function BackCover({ data, onRestartBook }) {
  const { title, message, dateText, footerQuote } = data;

  return (
    <div className="spread-page back-cover-root">
      <div className="back-cover-inner">
        {/* Wax Seal Stamp Decoration */}
        <div className="wax-seal-container">
          <div className="wax-seal-circle">
            <Heart className="w-8 h-8 wax-heart fill-white text-white" />
            <div className="wax-edge-ripple"></div>
          </div>
        </div>

        <h2 className="back-cover-title">{title || "Forever & Always"}</h2>

        <p className="back-cover-message">
          "{message || "Every love story is beautiful, but ours is my favorite."}"
        </p>

        {dateText && (
          <div className="back-cover-date-badge">
            <span>{dateText}</span>
          </div>
        )}

        {footerQuote && (
          <p className="back-cover-footer-quote">
            <Sparkles className="w-3.5 h-3.5 inline mr-1 text-amber-300" />
            {footerQuote}
          </p>
        )}

        <div className="back-cover-actions">
          <button
            onClick={onRestartBook}
            className="restart-book-btn"
            title="العودة إلى الغلاف الأول"
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            <span>العودة للغلاف • Re-read Book</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default BackCover;
