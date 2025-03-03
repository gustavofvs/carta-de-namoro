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
    return () => {
    };
  }, []);
  
  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 flex flex-col items-center justify-center p-4 bg-gradient-to-br from-pink-400 via-purple-300 to-indigo-400"
    >
    </div>
  );
}