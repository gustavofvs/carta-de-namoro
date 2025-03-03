'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

export default function ProposalButtons({ onAccept }: { onAccept: () => void }) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isMounted, setIsMounted] = useState(false);
  const [escapeCount, setEscapeCount] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [showHearts, setShowHearts] = useState(false);
  const [messageIndex, setMessageIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const yesButtonRef = useRef<HTMLButtonElement>(null);
  
  const messages = [
    "Tem certeza?",
    "Pense bem...",
    "Vai perder essa chance?",
    "Olha o botão 'Sim' ali!",
    "Não vai se arrepender!",
    "Último aviso!",
    "Ok, você quem sabe...",
    "Tá difícil, hein?",
    "Vou facilitar pra você..."
  ];

  useEffect(() => {
    setIsMounted(true);
    
    // Show hint after 5 seconds if user hasn't clicked yes
    const hintTimer = setTimeout(() => {
      setShowHint(true);
    }, 5000);
    
    return () => clearTimeout(hintTimer);
  }, []);
  
  const moveButton = () => {
    if (!isMounted || !containerRef.current) return;
    
    const containerRect = containerRef.current.getBoundingClientRect();
    const buttonWidth = 120;
    const buttonHeight = 50;
    
    // Calculate new random position within visible viewport
    const maxX = window.innerWidth - buttonWidth - 40; // 40px margin
    const maxY = window.innerHeight - buttonHeight - 40; // 40px margin
    
    // Ensure button stays within visible area
    const x = Math.min(Math.max(20, Math.random() * maxX), maxX);
    const y = Math.min(Math.max(20, Math.random() * maxY), maxY);
    
    setPosition({ x, y });
    setEscapeCount(prev => prev + 1);
    setMessageIndex(prev => (prev + 1) % messages.length);
  };
  
  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 flex flex-col items-center justify-center p-4 bg-gradient-to-br from-pink-400 via-purple-300 to-indigo-400"
    >
      {/* Optimize background particles */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 10 }).map((_, i) => ( // Reduced from 20 to 10
          <motion.div
            key={`particle-${i}`}
            className="absolute rounded-full bg-white/30"
            style={{
              width: `${Math.random() * 10 + 5}px`, // Reduced size
              height: `${Math.random() * 10 + 5}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              x: [0, Math.random() * 50 - 25], // Reduced movement range
              y: [0, Math.random() * 50 - 25],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: 5 + Math.random() * 5, // Reduced duration
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}
      </div>
  {/* Optimize floating hearts */}
      <AnimatePresence>
        {showHearts && (
          <>
            {Array.from({ length: 15 }).map((_, i) => ( // Reduced from 30 to 15
              <motion.div
                key={i}
                initial={{ y: '100vh', x: `${Math.random() * 100}vw`, opacity: 0 }}
                animate={{ y: '-10vh', opacity: 0.8 }}
                exit={{ opacity: 0 }}
                transition={{ 
                  duration: 2 + Math.random() * 3, // Reduced duration
                  delay: Math.random()
                }}
                className="absolute text-3xl pointer-events-none"
              >
                {['❤️', '💖', '💕'][Math.floor(Math.random() * 3)]}
              </motion.div>
            ))}
          </>
        )}
      </AnimatePresence>
      {/* Rest of the component remains the same */}
    </div>
  );
}