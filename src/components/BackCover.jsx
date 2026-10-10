import React from 'react';

export function BackCover({ data }) {
  const {
    image,
    title = "You are",
    titleSecondLine = "loved.",
    subtitle = "In every whispered breeze and every star above."
  } = data || {};

  // إذا تم توفير صورة الكارت الجاهزة، يتم عرضها مباشرة بكامل أناقتها
  if (image) {
    return (
      <div className="spread-page back-cover-spread">
        <div className="scallop-card-wrapper">
          <div className="scallop-card image-card-view">
            <img
              src={image}
              alt="You are loved"
              className="back-cover-full-img"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    );
  }

  // أو التصميم البرمجي
  return (
    <div className="spread-page back-cover-spread">
      <div className="scallop-card-wrapper">
        <div className="scallop-card">
          <div className="scallop-inner-frame">
            <svg
              className="scallop-svg-border"
              viewBox="0 0 320 400"
              preserveAspectRatio="none"
              fill="#5c0b14"
            >
              <path d="
                M 35 15
                Q 50 8, 65 15 Q 80 8, 95 15 Q 110 8, 125 15 Q 140 8, 155 15 Q 170 8, 185 15 Q 200 8, 215 15 Q 230 8, 245 15 Q 260 8, 275 15 Q 290 8, 305 25
                Q 312 40, 305 55 Q 312 70, 305 85 Q 312 100, 305 115 Q 312 130, 305 145 Q 312 160, 305 175 Q 312 190, 305 205 Q 312 220, 305 235 Q 312 250, 305 265 Q 312 280, 305 295 Q 312 310, 305 325 Q 312 340, 305 355 Q 312 370, 295 385
                Q 280 392, 265 385 Q 250 392, 235 385 Q 220 392, 205 385 Q 190 392, 175 385 Q 160 392, 145 385 Q 130 392, 115 385 Q 100 392, 85 385 Q 70 392, 55 385 Q 40 392, 25 375
                Q 18 360, 25 345 Q 18 330, 25 315 Q 18 300, 25 285 Q 18 270, 25 255 Q 18 240, 25 225 Q 18 210, 25 195 Q 18 180, 25 165 Q 18 150, 25 135 Q 18 120, 25 105 Q 18 90, 25 75 Q 18 60, 25 45 Q 18 30, 35 15
                Z
              " />
            </svg>

            <div className="scallop-card-content">
              <div className="you-are-loved-heading">
                <span className="script-line-1">{title}</span>
                <span className="script-line-2">{titleSecondLine}</span>
              </div>

              <p className="scallop-sub-poem">
                {subtitle}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BackCover;
