import React from 'react';

export function CoverPage({ data, onOpenBook }) {
  const { title, subtitle, columns, image } = data;

  return (
    <div className="cover-page-root" onClick={onOpenBook} role="button" tabIndex={0}>
      <div className="cover-inner-border">
        {/* Header Title Section */}
        <header className="cover-header">
          <h1 className="cover-main-title">{title || "OUR LOVE"}</h1>
          <div className="cover-subtitle-wrapper">
            <span className="cover-subtitle">{subtitle || "MI LUGAR FAVORITO"}</span>
            <div className="cover-divider-line"></div>
          </div>
        </header>

        {/* 4 Metadata Columns (HISTORIA, MEMORIES, WISHLIST, PLANEADOR) */}
        <section className="cover-meta-grid" aria-label="Book sections">
          {columns && columns.map((col, idx) => (
            <div key={idx} className="cover-meta-col">
              <h3 className="cover-col-title">{col.title}</h3>
              <p className="cover-col-desc">{col.desc}</p>
            </div>
          ))}
        </section>

        {/* Big Romantic Hero Image (Beach Sunset Couple) */}
        <div className="cover-photo-frame">
          <div className="cover-photo-matting">
            <img
              src={image}
              alt="Cover romantic moment"
              className="cover-photo-img"
              loading="eager"
            />
          </div>
        </div>

        {/* Realistic Book Open Hover Cue */}
        <div className="cover-open-cue">
          <span className="cue-dot"></span>
        </div>
      </div>
    </div>
  );
}

export default CoverPage;
