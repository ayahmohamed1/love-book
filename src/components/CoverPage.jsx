import React from 'react';
import { BookOpen, Sparkles } from 'lucide-react';

export function CoverPage({ data, onOpenBook }) {
  const { title, subtitle, columns, image, imageAlt } = data;

  return (
    <div className="cover-page-root">
      <div className="cover-inner-border">
        {/* Header Title Section */}
        <header className="cover-header">
          <h1 className="cover-main-title">{title || "OUR LOVE"}</h1>
          <div className="cover-subtitle-wrapper">
            <span className="cover-subtitle">{subtitle || "MI LUGAR FAVORITO"}</span>
            <div className="cover-divider-line"></div>
          </div>
        </header>

        {/* 4 Metadata Columns (Historia, Memories, Wishlist, Planeador) */}
        <section className="cover-meta-grid" aria-label="Book sections">
          {columns && columns.map((col, idx) => (
            <div key={col.id || idx} className="cover-meta-col">
              <h3 className="cover-col-title">{col.title}</h3>
              <p className="cover-col-desc">{col.description}</p>
            </div>
          ))}
        </section>

        {/* Big Romantic Hero Image (Beach Sunset Couple) */}
        <div className="cover-photo-frame">
          <div className="cover-photo-matting">
            <img
              src={image}
              alt={imageAlt || "Cover romantic moment"}
              className="cover-photo-img"
              loading="eager"
            />
          </div>
        </div>

        {/* Interactive Open Book Action */}
        <footer className="cover-footer">
          <button
            onClick={onOpenBook}
            className="open-book-btn"
            title="انقر لفتح الكتاب وبدء الرحلة"
            aria-label="Open the love book"
          >
            <BookOpen className="w-5 h-5 btn-icon" />
            <span className="btn-text">ابدأ قراءة القصة • Open Book</span>
            <Sparkles className="w-4 h-4 btn-sparkle" />
          </button>
        </footer>
      </div>
    </div>
  );
}

export default CoverPage;
