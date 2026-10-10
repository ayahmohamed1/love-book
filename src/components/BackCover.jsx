import React from 'react';

export function BackCover({ data }) {
  const { image = "/images/heart-lace-final.jpg" } = data || {};

  return (
    <div className="single-page-lace-heart-root">
      <div className="lace-heart-page-inner">
        <img
          src={image}
          alt="Our Heart"
          className="lace-heart-full-img"
          loading="eager"
          decoding="async"
        />
      </div>
    </div>
  );
}

export default BackCover;
