import React from 'react';
import HeartLocket from './HeartLocket';

export function Spread1Left({ data }) {
  const { locket, letter } = data;

  return (
    <div className="spread-page spread1-left">
      <div className="page-content-wrapper">
        {/* Top Half: Silver Double Heart Locket */}
        <section className="locket-section" aria-label="Heart Locket">
          <HeartLocket
            leftImage={locket?.leftHeartImage}
            rightImage={locket?.rightHeartImage}
            leftText={locket?.titleLeft || "My"}
            rightText={locket?.titleRight || "Love"}
            customFullImage={locket?.customLocketFullImage}
          />
        </section>

        {/* Bottom Half: Burgundy Love Letter Card */}
        <section className="love-letter-section" aria-label="Love Letter">
          <div className="love-letter-card">
            <h2 className="letter-heading-script">{letter?.scriptHeading || "love"}</h2>
            <div className="letter-body-text">
              {letter?.paragraphs && letter.paragraphs.map((p, idx) => (
                <p key={idx} className="letter-paragraph">
                  {p}
                </p>
              ))}
            </div>
            {letter?.signature && (
              <div className="letter-signature-wrap">
                <span className="letter-signature">{letter.signature}</span>
              </div>
            )}
          </div>
        </section>
      </div>

      {/* Decorative Page Footer Number */}
      <div className="page-footer-number">
        <span>01</span>
      </div>
    </div>
  );
}

export default Spread1Left;
