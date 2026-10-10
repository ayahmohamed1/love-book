import React, { useState } from 'react';
import { X } from 'lucide-react';

export function Spread1Right({ data }) {
  const {
    title = "tap a memory to reveal",
    photos = []
  } = data || {};

  const [activePhoto, setActivePhoto] = useState(null);

  // Take the first 6 photos (2 columns x 3 rows)
  const displayPhotos = photos.slice(0, 6);

  return (
    <div className="single-page-memories-root">
      <div className="memories-page-inner">
        {/* Top Header Label */}
        <h3 className="memories-tap-hint">
          {title}
        </h3>

        {/* 6 Photos Grid (2 Columns x 3 Rows) */}
        <div className="six-photos-grid">
          {displayPhotos.map((item, idx) => (
            <div
              key={item.id || idx}
              className="memory-card-tile"
              onClick={(e) => {
                e.stopPropagation();
                setActivePhoto(item);
              }}
              role="button"
              tabIndex={0}
            >
              {/* Top Washi Tape Tab */}
              <div className="washi-tape-tab"></div>

              {/* Card Photo Frame */}
              <div className="memory-card-frame">
                <img
                  src={item.url}
                  alt={`Memory ${idx + 1}`}
                  className="memory-card-img"
                  loading="lazy"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Preview */}
      {activePhoto && (
        <div className="photo-lightbox" onClick={() => setActivePhoto(null)}>
          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            <button
              className="lightbox-close-btn"
              onClick={() => setActivePhoto(null)}
              aria-label="Close"
            >
              <X className="w-6 h-6" />
            </button>
            <div className="lightbox-image-wrap">
              <img
                src={activePhoto.url}
                alt="Memory expanded"
                className="lightbox-img"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Spread1Right;
