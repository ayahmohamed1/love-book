import React, { useState } from 'react';
import { Sparkles, X } from 'lucide-react';

export function Spread2Right({ data }) {
  const { bigWords, cursiveOverlays, polaroids } = data;
  const [activePolaroid, setActivePolaroid] = useState(null);

  return (
    <div className="spread-page spread2-right">
      <div className="typographic-art-container">
        {/* Layer 1: Giant Stacked Bold LOVE Typography */}
        <div className="stacked-love-words">
          {(bigWords || ["LOVE", "LOVE", "LOVE", "LOVE"]).map((word, idx) => (
            <div key={idx} className="love-word-line">
              {word}
            </div>
          ))}
        </div>

        {/* Layer 2: Intertwined Golden Cursive Words (En este / lugar / favorito) */}
        <div className="cursive-overlays-container">
          {(cursiveOverlays || [
            { text: "En este", position: "26%" },
            { text: "lugar", position: "48%" },
            { text: "favorito", position: "70%" }
          ]).map((item, idx) => (
            <div
              key={idx}
              className="cursive-overlay-item"
              style={{ top: item.position }}
            >
              <span className="cursive-text">{item.text}</span>
            </div>
          ))}
        </div>

        {/* Layer 3: Tilted Realistic Polaroid Photos */}
        <div className="polaroids-layer">
          {polaroids && polaroids.map((polaroid, idx) => {
            const isTop = idx === 0;
            const style = isTop
              ? {
                  top: polaroid.top || "14%",
                  right: polaroid.right || "10%",
                  transform: `rotate(${polaroid.rotation || 12}deg)`
                }
              : {
                  bottom: polaroid.bottom || "15%",
                  left: polaroid.left || "12%",
                  transform: `rotate(${polaroid.rotation || -10}deg)`
                };

            return (
              <div
                key={polaroid.id || idx}
                className="polaroid-card"
                style={style}
                onClick={() => setActivePolaroid(polaroid)}
                role="button"
                tabIndex={0}
                title="اضغط للتكبير"
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    setActivePolaroid(polaroid);
                  }
                }}
              >
                <div className="polaroid-pin-or-tape"></div>
                <div className="polaroid-photo-frame">
                  <img
                    src={polaroid.image}
                    alt={polaroid.caption || "Polaroid memory"}
                    className="polaroid-img"
                    loading="lazy"
                  />
                </div>
                {polaroid.caption && (
                  <span className="polaroid-handwritten-caption">
                    {polaroid.caption}
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Polaroid Preview Lightbox */}
      {activePolaroid && (
        <div className="photo-lightbox" onClick={() => setActivePolaroid(null)}>
          <div className="lightbox-content polaroid-lightbox-content" onClick={(e) => e.stopPropagation()}>
            <button
              className="lightbox-close-btn"
              onClick={() => setActivePolaroid(null)}
              aria-label="Close polaroid preview"
            >
              <X className="w-6 h-6" />
            </button>
            <div className="polaroid-lightbox-card">
              <img
                src={activePolaroid.image}
                alt={activePolaroid.caption || "Polaroid expanded"}
                className="lightbox-img"
              />
              <p className="polaroid-expanded-caption">
                <Sparkles className="w-4 h-4 inline-block mr-1 text-amber-500" />
                {activePolaroid.caption}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Decorative Page Footer Number */}
      <div className="page-footer-number">
        <span>04</span>
      </div>
    </div>
  );
}

export default Spread2Right;
