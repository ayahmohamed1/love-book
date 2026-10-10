import React from 'react';
import { bookContent } from './data/bookContent';
import BookContainer from './components/BookContainer';

function App() {
  return (
    <div className="love-book-app">
      <BookContainer content={bookContent} />
    </div>
  );
}

export default App;
