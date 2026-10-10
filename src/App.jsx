import React, { useState } from 'react';
import { bookContent as defaultContent } from './data/bookContent';
import BookContainer from './components/BookContainer';
import CustomizerModal from './components/CustomizerModal';

function App() {
  const [content, setContent] = useState(() => {
    // Check if user saved custom data in localStorage
    try {
      const saved = localStorage.getItem('love_book_custom_data');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      // fallback
    }
    return defaultContent;
  });

  const [isCustomizerOpen, setIsCustomizerOpen] = useState(false);

  const handleUpdateContent = (newContent) => {
    setContent(newContent);
    try {
      localStorage.setItem('love_book_custom_data', JSON.stringify(newContent));
    } catch (e) {}
  };

  const handleResetContent = () => {
    setContent(defaultContent);
    try {
      localStorage.removeItem('love_book_custom_data');
    } catch (e) {}
  };

  return (
    <div className="love-book-app">
      <BookContainer
        content={content}
        onOpenCustomizer={() => setIsCustomizerOpen(true)}
      />

      <CustomizerModal
        isOpen={isCustomizerOpen}
        onClose={() => setIsCustomizerOpen(false)}
        currentContent={content}
        onUpdateContent={handleUpdateContent}
        onResetContent={handleResetContent}
      />
    </div>
  );
}

export default App;
