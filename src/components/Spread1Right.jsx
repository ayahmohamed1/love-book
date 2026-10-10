import React, { useState } from 'react';
import { Eye, X, ZoomIn } from 'lucide-react';

export function Spread1Right({ data }) {
  const { photos, title } = data;
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  return (
    <div className="spread-page spread1-right">
      <div className="photo-grid-outer">
        {title && <div className="sr-only"><h2>{title}</h2></div>}
        
        {/* 3x3 Grid of 9 Photos */}
        <div className="nine-photos-grid">
          {photos && photos.map((item, index) => (
            <div
              key={item.id || index}
              className="photo-grid-tile"
              onClick={() => setSelectedPhoto(item)}
              title={item.caption || `صورة رقم ${index + 1}`}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  setSelectedPhoto(item);
                }
              }}
            >
              <div className="photo-tile-inner">
                <img
                  src={item.url}
                  alt={item.caption || `Memory photo ${index + 1}`}
                  className="photo-tile-img"
                  loading="lazy"
                />
                <div className="photo-tile-overlay">
                  <ZoomIn className="w-5 h-5 overlay-icon" />
                  {item.caption && <span className="overlay-caption">{item.caption}</span>}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal when a photo is clicked */}
      {selectedPhoto && (
        <div className="photo-lightbox" onClick={() => setSelectedPhoto(null)}>
          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            <button
              className="lightbox-close-btn"
              onClick={() => setSelectedPhoto(null)}
              aria-label="Close photo view"
            >
              <X className="w-6 h-6" />
            </button>
            <div className="lightbox-image-wrap">
              <img
                src={selectedPhoto.url}
                alt={selectedPhoto.caption || "Expanded photo"}
                className="lightbox-img"
              />
            </div>
            {selectedPhoto.caption && (
              <p className="lightbox-caption">{selectedPhoto.caption}</p>
            )}
          </div>
        </div>
      )}

      {/* Decorative Page Footer Number */}
      <div className="page-footer-number">
        <span>02</span>
      </div>
    </div>
  );
}

export default Spread1Right;
