import React, { useState, useEffect } from 'react';

const QuoteGenerator = () => {
  const fallbackQuotes = [
    { content: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
    { content: "Life is what happens when you're busy making other plans.", author: "John Lennon" },
    { content: "Be the change you wish to see in the world.", author: "Mahatma Gandhi" },
    { content: "Success is not final, failure is not fatal: It is the courage to continue that counts.", author: "Winston Churchill" }
  ];

  const [quoteData, setQuoteData] = useState({
    content: '',
    author: ''
  });

  const getRandomQuote = () => {
    const random = fallbackQuotes[Math.floor(Math.random() * fallbackQuotes.length)];
    setQuoteData(random);
  };

  useEffect(() => {
    getRandomQuote();

    const interval = setInterval(getRandomQuote, 14400000); // Refresh every 4 hours

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  return (
    <div className="bg-transparent rounded-lg shadow-md p-6 max-w-sm w-full">

      <div className="min-h-20 flex flex-col justify-center mb-4">
        <blockquote className="text-lg italic text-gray-700">
          "{quoteData.content}"
        </blockquote>
        <p className="text-gray-600 font-medium mt-2">
          — {quoteData.author}
        </p>
      </div>

    </div>
  );
};

export default QuoteGenerator;
