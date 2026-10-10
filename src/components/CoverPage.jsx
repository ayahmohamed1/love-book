import React from 'react';

export function CoverPage({ data, onOpenBook }) {
  const {
    image,
    title = "OUR LOVE",
    subtitle = "MI LUGAR FAVORITO",
    columns = []
  } = data || {};

  return (
    <div
      className="cover-page-root"
      onClick={onOpenBook}
      role="button"
      tabIndex={0}
      title="انقر لفتح الكتاب"
    >
      <div className="cover-inner-border">
        {/* Header Title Section */}
        <header className="cover-header">
          <h1 className="cover-main-title">{title}</h1>
          <div className="cover-subtitle-wrapper">
            <span className="cover-subtitle">{subtitle}</span>
            <div className="cover-divider-line"></div>
          </div>
        </header>

        {/* 4 Metadata Columns (HISTORIA, MEMORIES, WISHLIST, PLANEADOR) */}
        {columns && columns.length > 0 && (
          <section className="cover-meta-grid" aria-label="Book sections">
            {columns.map((col, idx) => (
              <div key={idx} className="cover-meta-col">
                <h3 className="cover-col-title">{col.title}</h3>
                <p className="cover-col-desc">{col.desc}</p>
              </div>
            ))}
          </section>
        )}

        {/* Big Romantic Hero Image - 100% Contained & Framed */}
        <div className="cover-photo-frame">
          <div className="cover-photo-matting">
            <img
              src={image}
              alt="Cover romantic moment"
              className="cover-photo-img"
              loading="eager"
              decoding="async"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default CoverPage;
