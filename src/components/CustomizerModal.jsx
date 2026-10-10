import React, { useState } from 'react';
import { X, Copy, Check, RotateCcw, Sparkles, BookOpen, Music, Image as ImageIcon } from 'lucide-react';

export function CustomizerModal({ isOpen, onClose, currentContent, onUpdateContent, onResetContent }) {
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState('cover');

  // Local state initialized from currentContent
  const [formData, setFormData] = useState(JSON.parse(JSON.stringify(currentContent)));

  if (!isOpen) return null;

  const handleChange = (path, value) => {
    setFormData((prev) => {
      const updated = { ...prev };
      const keys = path.split('.');
      let current = updated;
      for (let i = 0; i < keys.length - 1; i++) {
        current = current[keys[i]];
      }
      current[keys[keys.length - 1]] = value;
      return updated;
    });
  };

  const handleApply = () => {
    onUpdateContent(formData);
    onClose();
  };

  const handleCopyConfig = () => {
    const jsonStr = JSON.stringify(formData, null, 2);
    navigator.clipboard.writeText(jsonStr);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="customizer-overlay" onClick={onClose}>
      <div className="customizer-modal" onClick={(e) => e.stopPropagation()} dir="rtl">
        {/* Header */}
        <div className="customizer-header">
          <div className="customizer-title-group">
            <Sparkles className="w-5 h-5 text-amber-600" />
            <div>
              <h3>لوحة تخصيص بيانات الكتاب (لكل عميل)</h3>
              <p className="modal-sub">عدّل النصوص والصور هنا لمعاينة مباشرة، أو عدّل ملف <code>src/data/bookContent.js</code></p>
            </div>
          </div>
          <button className="modal-close-icon" onClick={onClose} aria-label="Close modal">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tabs */}
        <div className="customizer-tabs">
          <button
            className={`customizer-tab-btn ${activeTab === 'cover' ? 'active' : ''}`}
            onClick={() => setActiveTab('cover')}
          >
            <BookOpen className="w-4 h-4 ml-1 inline" />
            الغلاف (Cover)
          </button>
          <button
            className={`customizer-tab-btn ${activeTab === 'spread1' ? 'active' : ''}`}
            onClick={() => setActiveTab('spread1')}
          >
            <ImageIcon className="w-4 h-4 ml-1 inline" />
            القلبين والرسالة والصور
          </button>
          <button
            className={`customizer-tab-btn ${activeTab === 'spread2' ? 'active' : ''}`}
            onClick={() => setActiveTab('spread2')}
          >
            <Music className="w-4 h-4 ml-1 inline" />
            الأغنية وبولارويد LOVE
          </button>
        </div>

        {/* Form Body */}
        <div className="customizer-body">
          {activeTab === 'cover' && (
            <div className="tab-pane">
              <div className="form-group">
                <label>عنوان الغلاف الرئيسي (Title):</label>
                <input
                  type="text"
                  value={formData.cover.title}
                  onChange={(e) => handleChange('cover.title', e.target.value)}
                  placeholder="OUR LOVE"
                />
              </div>

              <div className="form-group">
                <label>العنوان الفرعي (Subtitle):</label>
                <input
                  type="text"
                  value={formData.cover.subtitle}
                  onChange={(e) => handleChange('cover.subtitle', e.target.value)}
                  placeholder="MI LUGAR FAVORITO"
                />
              </div>

              <div className="form-group">
                <label>رابط صورة الغلاف (Cover Image URL):</label>
                <input
                  type="text"
                  value={formData.cover.image}
                  onChange={(e) => handleChange('cover.image', e.target.value)}
                  placeholder="https://..."
                />
              </div>
            </div>
          )}

          {activeTab === 'spread1' && (
            <div className="tab-pane">
              <h4 className="pane-section-title">💍 ميدالية القلبين (Double Heart Locket):</h4>
              <div className="form-row-2">
                <div className="form-group">
                  <label>صورة القلب الأيسر (URL):</label>
                  <input
                    type="text"
                    value={formData.spread1.leftPage.locket.leftHeartImage}
                    onChange={(e) => handleChange('spread1.leftPage.locket.leftHeartImage', e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label>صورة القلب الأيمن (URL):</label>
                  <input
                    type="text"
                    value={formData.spread1.leftPage.locket.rightHeartImage}
                    onChange={(e) => handleChange('spread1.leftPage.locket.rightHeartImage', e.target.value)}
                  />
                </div>
              </div>

              <div className="form-row-2">
                <div className="form-group">
                  <label>نص القلب الأيسر:</label>
                  <input
                    type="text"
                    value={formData.spread1.leftPage.locket.titleLeft}
                    onChange={(e) => handleChange('spread1.leftPage.locket.titleLeft', e.target.value)}
                    placeholder="My"
                  />
                </div>
                <div className="form-group">
                  <label>نص القلب الأيمن:</label>
                  <input
                    type="text"
                    value={formData.spread1.leftPage.locket.titleRight}
                    onChange={(e) => handleChange('spread1.leftPage.locket.titleRight', e.target.value)}
                    placeholder="Love"
                  />
                </div>
              </div>

              <div className="form-group">
                <label>صورة ميدالية مخصصة جاهزة (اختياري، تملأ كامل الميدالية):</label>
                <input
                  type="text"
                  value={formData.spread1.leftPage.locket.customLocketFullImage || ""}
                  onChange={(e) => handleChange('spread1.leftPage.locket.customLocketFullImage', e.target.value)}
                  placeholder="اتركه فارغاً لاستخدام تصميم القلوب الفضي التفاعلي"
                />
              </div>

              <h4 className="pane-section-title mt-4">💌 رسالة الحب (Love Letter):</h4>
              <div className="form-group">
                <label>عنوان الرسالة (Heading):</label>
                <input
                  type="text"
                  value={formData.spread1.leftPage.letter.scriptHeading}
                  onChange={(e) => handleChange('spread1.leftPage.letter.scriptHeading', e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>الفقرة الأولى من الرسالة:</label>
                <textarea
                  rows="3"
                  value={formData.spread1.leftPage.letter.paragraphs[0] || ""}
                  onChange={(e) => {
                    const newPars = [...formData.spread1.leftPage.letter.paragraphs];
                    newPars[0] = e.target.value;
                    handleChange('spread1.leftPage.letter.paragraphs', newPars);
                  }}
                />
              </div>
              <div className="form-group">
                <label>الفقرة الثانية من الرسالة:</label>
                <textarea
                  rows="3"
                  value={formData.spread1.leftPage.letter.paragraphs[1] || ""}
                  onChange={(e) => {
                    const newPars = [...formData.spread1.leftPage.letter.paragraphs];
                    newPars[1] = e.target.value;
                    handleChange('spread1.leftPage.letter.paragraphs', newPars);
                  }}
                />
              </div>
              <div className="form-group">
                <label>التوقيع:</label>
                <input
                  type="text"
                  value={formData.spread1.leftPage.letter.signature}
                  onChange={(e) => handleChange('spread1.leftPage.letter.signature', e.target.value)}
                />
              </div>
            </div>
          )}

          {activeTab === 'spread2' && (
            <div className="tab-pane">
              <h4 className="pane-section-title">🎵 مشغل الأغنية (Music Player):</h4>
              <div className="form-row-2">
                <div className="form-group">
                  <label>اسم الأغنية (Song Title):</label>
                  <input
                    type="text"
                    value={formData.spread2.leftPage.song.title}
                    onChange={(e) => handleChange('spread2.leftPage.song.title', e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label>اسم الفنان (Artist):</label>
                  <input
                    type="text"
                    value={formData.spread2.leftPage.song.artist}
                    onChange={(e) => handleChange('spread2.leftPage.song.artist', e.target.value)}
                  />
                </div>
              </div>

              <div className="form-group">
                <label>رابط صورة الطابع البريدي (Stamp Photo URL):</label>
                <input
                  type="text"
                  value={formData.spread2.leftPage.song.stampImage}
                  onChange={(e) => handleChange('spread2.leftPage.song.stampImage', e.target.value)}
                />
              </div>

              <div className="form-group">
                <label>رابط ملف الصوت (Audio MP3 URL):</label>
                <input
                  type="text"
                  value={formData.spread2.leftPage.song.audioUrl}
                  onChange={(e) => handleChange('spread2.leftPage.song.audioUrl', e.target.value)}
                  placeholder="https://... أو مسار ملف mp3"
                />
              </div>

              <div className="form-group">
                <label>اقتباس رومانسي تحت المشغل:</label>
                <input
                  type="text"
                  value={formData.spread2.leftPage.song.quote}
                  onChange={(e) => handleChange('spread2.leftPage.song.quote', e.target.value)}
                />
              </div>

              <h4 className="pane-section-title mt-4">📸 صور البولارويد (Polaroids):</h4>
              <div className="form-group">
                <label>صورة البولارويد العلوية (URL):</label>
                <input
                  type="text"
                  value={formData.spread2.rightPage.polaroids[0].image}
                  onChange={(e) => {
                    const newPolaroids = [...formData.spread2.rightPage.polaroids];
                    newPolaroids[0].image = e.target.value;
                    handleChange('spread2.rightPage.polaroids', newPolaroids);
                  }}
                />
              </div>
              <div className="form-group">
                <label>صورة البولارويد السفلية (URL):</label>
                <input
                  type="text"
                  value={formData.spread2.rightPage.polaroids[1].image}
                  onChange={(e) => {
                    const newPolaroids = [...formData.spread2.rightPage.polaroids];
                    newPolaroids[1].image = e.target.value;
                    handleChange('spread2.rightPage.polaroids', newPolaroids);
                  }}
                />
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="customizer-footer">
          <button className="btn-secondary" onClick={handleCopyConfig} title="نسخ بيانات JSON">
            {copied ? <Check className="w-4 h-4 ml-1 inline text-green-600" /> : <Copy className="w-4 h-4 ml-1 inline" />}
            {copied ? 'تم النسخ بنجاح!' : 'نسخ كود JSON'}
          </button>

          <button
            className="btn-secondary"
            onClick={() => {
              onResetContent();
              setFormData(JSON.parse(JSON.stringify(currentContent)));
            }}
            title="إعادة التعيين للوضع الافتراضي"
          >
            <RotateCcw className="w-4 h-4 ml-1 inline" />
            استعادة الافتراضي
          </button>

          <button className="btn-primary" onClick={handleApply}>
            تطبيق المعاينة الآن ✓
          </button>
        </div>
      </div>
    </div>
  );
}

export default CustomizerModal;
