import React from 'react';

/**
 * ميدالية القلبين المفتوحة (Double Heart Locket)
 * بتصميم فضي واقعي مطابق للصورة المعطاة مع تقطيع الصور داخل القلبين.
 */
export function HeartLocket({
  leftImage,
  rightImage,
  leftText = "My",
  rightText = "Love",
  customFullImage = ""
}) {
  // إذا وفّر المستخدم صورة كاملة مجهزة مسبقاً للميدالية، يتم عرضها مباشرة
  if (customFullImage) {
    return (
      <div className="locket-custom-wrapper">
        <img
          src={customFullImage}
          alt="Heart Locket"
          className="locket-custom-img"
        />
      </div>
    );
  }

  return (
    <div className="heart-locket-container">
      {/* سلسلة الميدالية العلوية */}
      <div className="locket-chain-connector">
        <div className="locket-ring"></div>
        <div className="locket-loop"></div>
      </div>

      <div className="locket-duo">
        {/* القلب الأيسر (My) */}
        <div className="locket-half left-half">
          <span className="locket-script-label left-label">{leftText}</span>
          <div className="heart-metallic-rim">
            <div className="heart-inner-bevel">
              <div className="heart-photo-mask">
                <img
                  src={leftImage}
                  alt="Left heart memory"
                  className="heart-photo"
                  loading="lazy"
                />
                <div className="heart-glass-glare"></div>
              </div>
            </div>
          </div>
        </div>

        {/* حلقة المفصل بين القلبين */}
        <div className="locket-hinge">
          <span></span>
          <span></span>
          <span></span>
        </div>

        {/* القلب الأيمن (Love) */}
        <div className="locket-half right-half">
          <span className="locket-script-label right-label">{rightText}</span>
          <div className="heart-metallic-rim">
            <div className="heart-inner-bevel">
              <div className="heart-photo-mask">
                <img
                  src={rightImage}
                  alt="Right heart memory"
                  className="heart-photo"
                  loading="lazy"
                />
                <div className="heart-glass-glare"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default HeartLocket;
