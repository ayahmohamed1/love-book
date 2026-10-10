import React from 'react';

export function Spread1Right({ data }) {
  const { photos } = data;

  return (
    <div className="spread-page spread1-right">
      <div className="photo-grid-outer">
        {/* 3x3 Grid of 9 Photos */}
        <div className="nine-photos-grid">
          {photos && photos.map((item, index) => (
            <div key={item.id || index} className="photo-grid-tile">
              <div className="photo-tile-inner">
                <img
                  src={item.url}
                  alt={`Memory photo ${index + 1}`}
                  className="photo-tile-img"
                  loading="lazy"
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
