'use client';

import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

// Define the heart type
interface Heart {
  id: number;
  left: number;
  size: number;
  animationDuration: number;
  delay: number;
  type: string;
}

// Define the message type
interface LoveMessage {
  id: number;
  text: string;
  delay: number;
}

// Define the firework type
interface Firework {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
}

export default function Celebration() {
  const [hearts, setHearts] = useState<Heart[]>([]);
  const [showMessage, setShowMessage] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [currentPhase, setCurrentPhase] = useState(0);
  const [loveMessages, setLoveMessages] = useState<LoveMessage[]>([]);
  const [fireworks, setFireworks] = useState<Firework[]>([]);
  const [showFireworks, setShowFireworks] = useState(false);
  // Removed confettiCanvasRef
  const audioRef = useRef<HTMLAudioElement | null>(null);
  
  const messages = [
    "Cada dia ao seu lado é uma nova aventura...",
    "Seu sorriso ilumina meu mundo inteiro...",
    "Você é o sonho que eu não sabia que tinha...",
    "Meu coração bate mais forte quando estou com você...",
    "Nosso amor é como uma estrela: brilha eternamente...",
    "Você é a melhor parte dos meus dias...",
    "Meu amor por você cresce a cada momento..."
  ];
  
  useEffect(() => {
    setIsMounted(true);
    
    // Removed confetti import and function
    
    // Create fireworks effect with fewer elements
    const createFireworks = () => {
      const newFireworks = [];
      const colors = ['#ff3366', '#ff66b2', '#ffccdd', '#b266ff'];
      
      for (let i = 0; i < 6; i++) { 
        newFireworks.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: 5 + Math.random() * 10,
          color: colors[Math.floor(Math.random() * colors.length)]
        });
      }
      
      setFireworks(newFireworks);
      setShowFireworks(true);
      
      setTimeout(() => {
        setShowFireworks(false);
      }, 5000);
    };
    
    const createHearts = () => {
      const newHearts = [];
      const heartTypes = ['❤️', '💖', '💕', '💘', '✨'];
      
      for (let i = 0; i < 20; i++) { // Reduced from 80 to 20
        newHearts.push({
          id: i,
          left: Math.random() * 100,
          size: 0.5 + Math.random() * 1.5, // Reduced max size
          animationDuration: 5 + Math.random() * 10, // Reduced max duration
          delay: Math.random() * 5, // Reduced max delay
          type: heartTypes[Math.floor(Math.random() * heartTypes.length)]
        });
      }
      setHearts(newHearts);
    };
    
    // Create love messages that appear sequentially
    const createLoveMessages = () => {
      const newMessages: LoveMessage[] = messages.map((text, index) => ({
        id: index,
        text,
        delay: index * 4000
      }));
      setLoveMessages(newMessages);
    };
    
    let confettiInterval: ReturnType<typeof setInterval> | null = null;
    if (isMounted) {
      // Remove confetti code and just show message directly
      setTimeout(() => {
        setShowMessage(true);
      }, 1500);
      
      // Show fireworks with delay
      setTimeout(() => {
        createFireworks();
      }, 3000);
      
      createHearts();
      createLoveMessages();
      
      // Change phases with increased interval
      const phaseInterval = setInterval(() => {
        setCurrentPhase(prev => (prev + 1) % 5);
      }, 8000); // Increased from 6000 to 8000
      
      return () => {
        if (confettiInterval) {
          clearInterval(confettiInterval);
        }
        clearInterval(phaseInterval);
        // Certifique-se de limpar todos os timeouts
        document.querySelectorAll('canvas').forEach(canvas => {
          const context = canvas.getContext('2d');
          if (context) context.clearRect(0, 0, canvas.width, canvas.height);
        });
      };
    }
  }, [isMounted]); // Removi messages da dependência para evitar re-renderizações
  
  // Get background gradient based on current phase
  const getBackgroundGradient = () => {
    const gradients = [
      "bg-gradient-to-br from-pink-400 via-purple-300 to-indigo-400",
      "bg-gradient-to-tr from-purple-400 via-pink-400 to-red-300",
      "bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400",
      "bg-gradient-to-bl from-pink-300 via-purple-400 to-indigo-300",
      "bg-gradient-to-b from-red-300 via-pink-400 to-purple-500",
    ];
    
    return `${gradients[currentPhase]} transition-colors duration-3000`;
  };
  // Corrigido: Animações de fundo mais leves e estáveis
  return (
    <div className={`min-h-screen flex flex-col items-center justify-center text-center p-4 relative overflow-hidden ${getBackgroundGradient()}`}>
      {/* Removed canvas for confetti */}
      {/* Floating hearts com animação simplificada */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {isMounted && hearts.slice(0, 10).map((heart) => (
          <motion.div
            key={heart.id}
            className="absolute"
            style={{
              left: `${heart.left}%`,
              fontSize: `${heart.size}rem`,
            }}
            initial={{ 
              y: heart.id % 2 === 0 ? -50 : window.innerHeight,
              opacity: 0 
            }}
            animate={{ 
              y: heart.id % 2 === 0 ? window.innerHeight : -50,
              opacity: [0, 0.7, 0]
            }}
            transition={{ 
              duration: heart.animationDuration,
              delay: heart.delay,
              repeat: 1, // Limitado a uma repetição
              ease: "linear"
            }}
          >
            {heart.type}
          </motion.div>
        ))}
      </div>
      {/* Resto do código... */}
      {/* Animated bubbles - reduzido e simplificado */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 3 }).map((_, i) => (
          <motion.div
            key={`bubble-${i}`}
            className="absolute rounded-full bg-white/10"
            style={{
              width: `${50 + i * 30}px`,
              height: `${50 + i * 30}px`,
              left: `${20 + i * 30}%`,
              top: `${20 + i * 20}%`,
            }}
            animate={{
              y: [0, -10, 0],
            }}
            transition={{
              duration: 4 + i,
              repeat: Infinity,
              ease: "easeInOut",
              repeatType: "reverse"
            }}
          />
        ))}
      </div>
      <AnimatePresence>
        {isMounted && showFireworks && fireworks.map((firework) => (
          <motion.div
            key={`firework-${firework.id}`}
            className="fixed pointer-events-none"
            style={{
              left: `${firework.x}%`,
              top: `${firework.y}%`,
            }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ 
              scale: [0, 1.2, 0],
              opacity: [0, 1, 0]
              // Removed complex filter animations
            }}
            transition={{ 
              duration: 1.5, // Reduced from 2+random
              delay: Math.random() * 3, // Reduced max delay
              ease: "easeOut"
            }}
          >
            <div 
              className="rounded-full"
              style={{
                width: `${firework.size}px`,
                height: `${firework.size}px`,
                background: firework.color
                // Removed complex box-shadow
              }}
            />
          </motion.div>
        ))}
      </AnimatePresence>
      {/* Romantic background elements - removed some elements for performance */}
      {isMounted && (
        <>
          <div className="absolute inset-0 bg-pink-100/10 backdrop-blur-sm"></div>
          {/* Removed heart pattern background */}
          
          {/* Animated bubbles - reduced count */}
          <div className="absolute inset-0 overflow-hidden">
            {Array.from({ length: 5 }).map((_, i) => ( // Reduced from 15 to 5
              <motion.div
                key={`bubble-${i}`}
                className="absolute rounded-full bg-white/20 backdrop-blur-sm"
                style={{
                  width: `${Math.random() * 100 + 50}px`,
                  height: `${Math.random() * 100 + 50}px`,
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  y: [0, -10, 0], // Reduced movement
                  scale: [1, 1.05, 1], // Reduced scale change
                }}
                transition={{
                  duration: 5 + Math.random() * 3, // Reduced max duration
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            ))}
          </div>
        </>
      )}
      {/* Main content */}
      <AnimatePresence>
        {isMounted && showMessage && (
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1, type: "spring" }}
            className="z-10 max-w-3xl relative"
          >
            <div className="backdrop-blur-md bg-white/10 p-10 rounded-2xl shadow-xl border border-pink-300/30 overflow-hidden">
              {/* Decorative corner elements */}
              <div className="absolute top-0 left-0 w-20 h-20 border-t-4 border-l-4 border-pink-400/70 rounded-tl-xl"></div>
              <div className="absolute top-0 right-0 w-20 h-20 border-t-4 border-r-4 border-pink-400/70 rounded-tr-xl"></div>
              <div className="absolute bottom-0 left-0 w-20 h-20 border-b-4 border-l-4 border-pink-400/70 rounded-bl-xl"></div>
              <div className="absolute bottom-0 right-0 w-20 h-20 border-b-4 border-r-4 border-pink-400/70 rounded-br-xl"></div>
              
              <motion.div 
                initial={{ scale: 0.5 }}
                animate={{ scale: [1, 1.05, 1] }} // Reduced scale animation
                transition={{ duration: 3, repeat: Infinity, repeatType: "reverse" }}
                className="text-white text-6xl font-bold mb-6 drop-shadow-lg"
              >
                ❤️ Meu Amor ❤️
              </motion.div>
              
              <motion.h1 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-4xl font-bold text-pink-200 mb-8 drop-shadow-love"
              >
                Você me fez a pessoa mais feliz do mundo!
              </motion.h1>
              
              <motion.p 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1 }}
                className="text-2xl text-purple-200 mb-8"
              >
                Cada momento ao seu lado é um presente. Seu sorriso ilumina meus dias, 
                e seu amor aquece meu coração.
              </motion.p>
              
              {/* Animated love messages - simplified */}
              <div className="h-20 overflow-hidden relative my-8 border-t border-b border-pink-300/30 py-4">
                <AnimatePresence mode="wait">
                  {loveMessages.map((message) => (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, y: 20 }} // Reduced movement
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }} // Reduced movement
                      transition={{ duration: 0.8 }} // Reduced duration
                      className={`text-xl text-pink-200 italic absolute inset-0 flex items-center justify-center ${
                        message.id === currentPhase % loveMessages.length ? 'block' : 'hidden'
                      }`}
                    >
                      "{message.text}"
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
              
              <motion.div 
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 1.5, duration: 0.5 }}
                className="text-3xl font-semibold text-white"
              >
                <motion.span
                  animate={{ 
                    textShadow: [
                      "0 0 7px rgba(255,105,180,0.6)",
                      "0 0 10px rgba(255,105,180,0.8)",
                      "0 0 7px rgba(255,105,180,0.6)"
                    ]
                  }}
                  transition={{ duration: 3, repeat: Infinity }} // Slowed down
                >
                  Agora somos oficialmente namorados!
                </motion.span>
              </motion.div>
              
              {/* Simplified heart animations */}
              <div className="mt-8 flex justify-center space-x-8">
                <motion.div 
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
                  className="text-7xl"
                >
                  💖
                </motion.div>
                <motion.div 
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2.5, repeat: Infinity, repeatType: "reverse" }}
                  className="text-7xl"
                >
                  💘
                </motion.div>
                <motion.div 
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 3, repeat: Infinity, repeatType: "reverse" }}
                  className="text-7xl"
                >
                  💖
                </motion.div>
              </div>
              
              <motion.div 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 2 }}
                className="mt-8 text-xl text-purple-200"
              >
                Este é apenas o começo da nossa linda história de amor...
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      {/* Animated rings - reduced count and complexity */}
      <div className="fixed inset-0 pointer-events-none">
        {Array.from({ length: 2 }).map((_, i) => ( // Reduced from 3 to 2
          <motion.div
            key={`ring-${i}`}
            className="absolute rounded-full border-2 border-pink-300/30"
            style={{
              left: '50%',
              top: '50%',
              width: `${(i + 1) * 20}%`,
              height: `${(i + 1) * 20}%`,
            }}
            initial={{ opacity: 0, x: '-50%', y: '-50%', scale: 0.8 }}
            animate={{ 
              opacity: [0, 0.4, 0],
              scale: [0.9, 1.1, 1.3], // Reduced scale animation
              x: '-50%',
              y: '-50%'
            }}
            transition={{
              duration: 6, // Increased from 4 to slow down
              delay: i * 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>
      {/* Animated stars - reduced count */}
      <div className="fixed inset-0 pointer-events-none">
        {Array.from({ length: 10 }).map((_, i) => ( // Reduced from 20 to 10
          <motion.div
            key={`star-${i}`}
            className="absolute text-yellow-200"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              fontSize: `${Math.random() * 0.8 + 0.5}rem`, // Reduced max size
            }}
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: [0, 0.7, 0],
              scale: [0.8, 1.1, 0.8], // Reduced scale change
            }}
            transition={{
              duration: 3 + Math.random() * 2, // Reduced max duration
              delay: Math.random() * 5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            ✨
          </motion.div>
        ))}
      </div>
      {/* Bottom message */}
      <AnimatePresence>
        {isMounted && showMessage && (
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 3, duration: 1 }}
            className="mt-10 text-center z-10"
          >
            <div className="inline-block backdrop-blur-md bg-white/20 px-8 py-4 rounded-full shadow-lg border border-pink-300/30">
              <p className="text-xl text-white font-dancing">
                <motion.span
                  animate={{ 
                    textShadow: [
                      "0 0 5px rgba(255,105,180,0.6)",
                      "0 0 8px rgba(255,105,180,0.8)",
                      "0 0 5px rgba(255,105,180,0.6)"
                    ]
                  }}
                  transition={{ duration: 3, repeat: Infinity }} // Slowed down
                >
                  Feliz Início de Namoro! ❤️
                </motion.span>
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}