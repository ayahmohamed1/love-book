import React from 'react';

export function Spread1Right({ data }) {
  const {
    title = "our memories",
    photos = []
  } = data || {};

  // Take the first 6 photos (2 columns x 3 rows)
  const displayPhotos = photos.slice(0, 6);

  return (
    <div className="single-page-memories-root">
      <div className="memories-page-inner">
        {/* Top Header Label: our memories */}
        <h3 className="memories-tap-hint">
          {title}
        </h3>

        {/* 6 Photos Grid (2 Columns x 3 Rows) */}
        <div className="six-photos-grid">
          {displayPhotos.map((item, idx) => (
            <div
              key={item.id || idx}
              className="memory-card-tile static-tile"
            >
              {/* Top Washi Tape Tab */}
              <div className="washi-tape-tab"></div>

              {/* Card Photo Frame */}
              <div className="memory-card-frame">
                <img
                  src={item.url}
                  alt={`Memory ${idx + 1}`}
                  className="memory-card-img"
                  loading="eager"
                  decoding="async"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Spread1Right;
