'use client';

import { useState, useEffect } from 'react';

const messages = [
  "Preparando algo especial para você...",
  "Reunindo todo meu amor...",
  "Você é incrível, sabia?",
  "Quase pronto...",
  "Meu coração bate mais forte por você..."
];

export default function Loader() {
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % messages.length);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-pink-500 mx-auto mb-8"></div>
        <p className="text-2xl text-pink-800 font-semibold animate-pulse">
          {messages[messageIndex]}
        </p>
      </div>
    </div>
  );
}