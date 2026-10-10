import React from 'react';
import { ArrowRight } from 'lucide-react';

export function Spread1Left({ data, onNext }) {
  const {
    topImage = "/images/cat.jpg",
    title = "Happy Birthday, my love.",
    message = "Being with you is truly one of the best things that has ever happened to me. From the moment you came into my life, everything started to feel brighter and more meaningful..."
  } = data || {};

  return (
    <div className="single-page-message-root">
      <div className="message-page-inner">
        {/* Top Image Spot (Cat Image / Custom Picture) */}
        <div className="message-image-frame">
          <div className="message-image-card">
            <img
              src={topImage}
              alt="Love Message"
              className="message-cat-img"
              loading="eager"
            />
          </div>
        </div>

        {/* Message Heading */}
        <h2 className="message-script-title">
          {title}
        </h2>

        {/* Message Body Paragraph */}
        <p className="message-body-text">
          {message}
        </p>

        {/* Bottom Arrow Button to turn to next page */}
        <div className="message-footer-action">
          <button
            className="message-next-arrow-btn"
            onClick={(e) => {
              e.stopPropagation();
              if (onNext) onNext();
            }}
            title="الصفحة التالية"
            aria-label="Next page"
          >
            <ArrowRight className="w-6 h-6 text-white" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Spread1Left;
