import React, { useEffect } from 'react';
import { bookContent } from './data/bookContent';
import BookContainer from './components/BookContainer';

// All images used across the interactive book
const ALL_BOOK_IMAGES = [
  bookContent.cover?.image,
  bookContent.messagePage?.topImage,
  ...(bookContent.memoriesPage?.photos?.map(p => p.url) || []),
  bookContent.musicPage?.song?.stampImage,
  ...(bookContent.lovePage?.polaroids?.map(p => p.image) || []),
  bookContent.backPage?.image,
  '/images/cat.jpg',
  '/images/cat-preview.jpg',
  '/images/burgundy-texture.jpg'
].filter(Boolean);

function preloadBookAssets() {
  ALL_BOOK_IMAGES.forEach((url) => {
    const img = new Image();
    img.src = url;
    if (img.decode) {
      img.decode().catch(() => {});
    }
  });
}

function App() {
  useEffect(() => {
    preloadBookAssets();
  }, []);

  return (
    <div className="love-book-app">
      <BookContainer content={bookContent} />
    </div>
  );
}

export default App;
