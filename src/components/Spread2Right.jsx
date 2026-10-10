import React from 'react';

export function Spread2Right({ data }) {
  const { bigWords, cursiveOverlays, polaroids } = data;

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
              >
                <div className="polaroid-photo-frame">
                  <img
                    src={polaroid.image}
                    alt="Polaroid memory"
                    className="polaroid-img"
                    loading="lazy"
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Spread2Right;
