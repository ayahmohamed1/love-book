import React from 'react';

export function CoverPage({ data, onOpenBook }) {
  const {
    fullCoverImage,
    image,
    title = "OUR LOVE",
    subtitle = "MI LUGAR FAVORITO",
    columns = []
  } = data || {};

  // إذا تم تحديد صورة كاملة للغلاف (سواء fullCoverImage أو image كغلاف متكامل)
  const isFullImageCover = fullCoverImage || (image && !columns?.length);

  if (isFullImageCover) {
    return (
      <div
        className="cover-page-root cover-as-full-image"
        onClick={onOpenBook}
        role="button"
        tabIndex={0}
      >
        <div className="cover-full-image-frame">
          <img
            src={fullCoverImage || image}
            alt="Book Cover"
            className="cover-full-img"
            loading="eager"
          />
        </div>
      </div>
    );
  }

  // في حال استخدام تصميم الكود بالكامل (مع إعطاء الصورة الحجم والمساحة الكاملة الكافية)
  return (
    <div
      className="cover-page-root cover-code-layout"
      onClick={onOpenBook}
      role="button"
      tabIndex={0}
    >
      <div className="cover-inner-border">
        {/* Header Title Section - Compact & Elegant */}
        <header className="cover-header">
          <h1 className="cover-main-title">{title}</h1>
          <div className="cover-subtitle-wrapper">
            <span className="cover-subtitle">{subtitle}</span>
            <div className="cover-divider-line"></div>
          </div>
        </header>

        {/* 4 Metadata Columns - Ultra Slim & Proportional */}
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

        {/* Big Romantic Hero Image - Takes full remaining space */}
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
      </div>
    </div>
  );
}

export default CoverPage;
