'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';
import Loader from '@/components/Loader';
import ProposalButtons from '@/components/ProposalButtons';
import Celebration from '@/components/Celebration';
import Image from 'next/image';

type Stage = 'loading' | 'intro' | 'memories' | 'gallery' | 'proposal' | 'celebration';

export default function Home() {
  const [stage, setStage] = useState<Stage>('loading');
  const [showIntroContent, setShowIntroContent] = useState(false);
  const [memories, setMemories] = useState<number[]>([]);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const [showPhotoCaption, setShowPhotoCaption] = useState(false);
  const [showQuote, setShowQuote] = useState(false);
  const [currentQuote, setCurrentQuote] = useState('');
  const timelineRef = useRef<HTMLDivElement>(null);
  const controls = useAnimation();

  const allMemories = [
    {
      text: 'Nosso primeiro encontro',
      date: '10/03/2025',
      emoji: '💖',
      detail: 'Quando nos vimos pela primeira vez, soube que seria especial.'
    },
    {
      text: 'Aquele passeio no parque',
      date: '25/02/2025',
      emoji: '🌳',
      detail: 'As risadas e conversas que tivemos naquele dia ficaram gravadas em mim.'
    },
    {
      text: 'Nossa primeira viagem juntos',
      date: '15/03/2025',
      emoji: '✈️',
      detail: 'Descobrir novos lugares ao seu lado foi mágico.'
    },
    {
      text: 'Quando você me fez rir até chorar',
      date: '02/04/2025',
      emoji: '😂',
      detail: 'Seu senso de humor é uma das coisas que mais amo em você.'
    },
    {
      text: 'Aquele jantar romântico à luz de velas',
      date: '20/05/2025',
      emoji: '🕯️',
      detail: 'A forma como seus olhos brilhavam na luz das velas me encantou.'
    },
    {
      text: 'Quando dançamos sob as estrelas',
      date: '15/06/2025',
      emoji: '🌟',
      detail: 'Naquele momento, o mundo parou só para nós dois.'
    },
    {
      text: 'O dia que você me surpreendeu com flores',
      date: '10/07/2025',
      emoji: '💐',
      detail: 'Seu gesto de carinho aqueceu meu coração.'
    },
    {
      text: 'Quando assistimos ao pôr do sol na praia',
      date: '05/08/2025',
      emoji: '🌅',
      detail: 'Ver o horizonte com você me fez sonhar com nosso futuro juntos.'
    }
  ];

  const romanticQuotes = [
    "Amar não é olhar um para o outro, é olhar juntos na mesma direção.",
    "Cada batida do meu coração tem seu nome.",
    "Você é o sonho que eu não sabia que tinha.",
    "O amor não se vê com os olhos, mas com o coração.",
    "Meu lugar favorito no mundo é ao seu lado."
  ];

  useEffect(() => {
    const loadingTimer = setTimeout(() => {
      setStage('intro');
      
      setTimeout(() => {
        setShowIntroContent(true);
      }, 500);
      
      controls.start({
        scale: [1, 1.05, 1],
        transition: { duration: 1.5, repeat: Infinity }
      });
      
      setTimeout(() => {
        setCurrentQuote(romanticQuotes[Math.floor(Math.random() * romanticQuotes.length)]);
        setShowQuote(true);
      }, 2000);
      
    }, 3000); 

    return () => clearTimeout(loadingTimer);
  }, []); 

  useEffect(() => {
    if (stage === 'memories') {
      let index = 0;
      const memoryInterval = setInterval(() => {
        if (index < allMemories.length) {
          setMemories(prev => {
            if (!prev.includes(index)) {
              return [...prev, index];
            }
            return prev;
          });
          index++;
          
          if (timelineRef.current) {
            timelineRef.current.scrollTop = timelineRef.current.scrollHeight;
          }
        } else {
          clearInterval(memoryInterval);
        }
      }, 1200);
      
      return () => clearInterval(memoryInterval);
    }
  }, [stage, allMemories.length]);

  const handleAccept = () => {
    setStage('celebration');
  };

  const handleContinueToMemories = () => {
    setMemories([]);
    setStage('memories');
  };

  const handleContinueToGallery = () => {
    setStage('gallery');
  };

  const handleContinueToProposal = () => {
    setStage('proposal');
  };

  const renderGallerySection = () => (
    <motion.div
      key="gallery"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
      className="min-h-screen bg-gradient-to-br from-pink-300 via-purple-300 to-indigo-400 p-6 flex flex-col items-center justify-center"
    >
      <motion.div
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-8 z-10"
      >
        <h2 className="text-4xl font-dancing text-white mb-2 drop-shadow-md">
          Nossos Momentos Especiais
        </h2>
        <p className="text-lg text-white/80">
          Cada foto conta uma parte da nossa história...
        </p>
      </motion.div>

      <div className="w-full max-w-3xl bg-white/20 backdrop-blur-md rounded-xl p-6 shadow-xl z-10 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white/30 h-48 rounded-lg flex items-center justify-center">
            <p className="text-purple-700">Foto #1</p>
          </div>
          <div className="bg-white/30 h-48 rounded-lg flex items-center justify-center">
            <p className="text-purple-700">Foto #2</p>
          </div>
          <div className="bg-white/30 h-48 rounded-lg flex items-center justify-center">
            <p className="text-purple-700">Foto #3</p>
          </div>
          <div className="bg-white/30 h-48 rounded-lg flex items-center justify-center">
            <p className="text-purple-700">Foto #4</p>
          </div>
        </div>
      </div>

      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="relative z-10 mt-4"
      >
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleContinueToProposal}
          className="bg-pink-500 hover:bg-pink-600 text-white font-bold py-4 px-10 rounded-full text-xl shadow-xl transition-all"
        >
          Tenho Algo Para Te Perguntar ❤️
        </motion.button>
      </motion.div>

      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={`sparkle-${i}`}
            className="absolute text-white"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              fontSize: `${Math.random() * 1.5 + 0.5}rem`,
              opacity: 0.3,
            }}
            animate={{
              opacity: [0.3, 0.8, 0.3],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 2 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          >
            ✨
          </motion.div>
        ))}
      </div>
    </motion.div>
  );

  return (
    <main className="min-h-screen">
      <AnimatePresence mode="wait">
        {stage === 'loading' && (
          <motion.div
            key="loader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 z-50"
          >
            <Loader />
          </motion.div>
        )}

        {stage === 'intro' && (
          <motion.div
            key="intro"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="min-h-screen bg-gradient-to-br from-pink-300 via-purple-300 to-indigo-400 p-6 flex flex-col items-center justify-center relative overflow-hidden"
          >
            <div className="absolute inset-0">
              <div className="absolute inset-0 bg-[url('/heart-pattern.png')] opacity-5"></div>
              {Array.from({ length: 15 }).map((_, i) => (
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
                    y: [0, -20, 0],
                    x: [0, Math.random() * 10 - 5, 0],
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    duration: 5 + Math.random() * 5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              ))}
            </div>

            <AnimatePresence>
              {showIntroContent && (
                <>
                  <motion.div
                    initial={{ y: -50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    className="text-center mb-10 z-10"
                  >
                    <motion.h1 
                      className="text-5xl md:text-7xl font-dancing text-white mb-6 drop-shadow-lg"
                      animate={{ 
                        textShadow: [
                          "0 0 7px rgba(255,105,180,0.6)",
                          "0 0 10px rgba(255,105,180,0.8)",
                          "0 0 7px rgba(255,105,180,0.6)"
                        ]
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      Nossa História de Amor
                    </motion.h1>
                    <p className="text-xl text-white max-w-2xl mx-auto bg-pink-500/20 backdrop-blur-sm p-4 rounded-lg">
                      Cada momento ao seu lado tem sido especial. Vamos relembrar nossa jornada juntos...
                    </p>
                  </motion.div>

                  <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                    className="relative z-10 mt-8"
                  >
                    <motion.button
                      animate={controls}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleContinueToMemories}
                      className="bg-pink-500 hover:bg-pink-600 text-white font-bold py-4 px-10 rounded-full text-xl shadow-xl transition-all"
                    >
                      Começar Nossa Jornada ❤️
                    </motion.button>
                  </motion.div>

                  <AnimatePresence>
                    {showQuote && (
                      <motion.div
                        initial={{ y: 50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.8 }}
                        className="mt-12 text-center text-white text-lg z-10 max-w-md bg-purple-500/20 backdrop-blur-sm p-4 rounded-lg"
                      >
                        <p className="italic">"{currentQuote}"</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </>
              )}
            </AnimatePresence>

            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              {Array.from({ length: 15 }).map((_, i) => (
                <div
                  key={i}
                  className="absolute text-pink-500 opacity-20 animate-float"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    fontSize: `${Math.random() * 2 + 1}rem`,
                    animationDuration: `${Math.random() * 10 + 10}s`,
                    animationDelay: `${Math.random() * 5}s`,
                  }}
                >
                  ❤️
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {stage === 'memories' && (
          <motion.div
            key="memories"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="min-h-screen bg-gradient-to-br from-pink-300 via-purple-300 to-indigo-400 p-6 flex flex-col items-center justify-center"
          >
            <motion.div
              initial={{ y: -30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="text-center mb-8 z-10"
            >
              <h2 className="text-4xl font-dancing text-white mb-2 drop-shadow-md">
                Momentos Especiais
              </h2>
              <p className="text-lg text-white/80">
                Cada memória nos aproximou mais...
              </p>
            </motion.div>

            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="w-full max-w-3xl bg-white/20 backdrop-blur-md rounded-xl p-6 shadow-xl border border-white/30 z-10"
            >
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 rounded-full bg-pink-500 flex items-center justify-center text-white text-xl">
                  ❤️
                </div>
                <div className="ml-4">
                  <h2 className="text-2xl font-dancing text-pink-800">Nossa Linha do Tempo</h2>
                  <p className="text-purple-700">Momentos que construíram nosso amor</p>
                </div>
              </div>
              <div 
                ref={timelineRef}
                className="relative pl-10 border-l-2 border-pink-400 max-h-60 overflow-y-auto pr-4 py-2 no-scrollbar"
              >
                {memories.map((memoryIndex, arrayIndex) => {
                  if (memoryIndex >= 0 && memoryIndex < allMemories.length) {
                    const memoryData = allMemories[memoryIndex];
                    return (
                      <motion.div
                        key={`memory-${memoryIndex}-${arrayIndex}`}
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.5 }}
                        className="mb-6 relative"
                      >
                        <div className="absolute -left-[34px] w-6 h-6 rounded-full bg-pink-500 border-4 border-white flex items-center justify-center">
                          <span className="text-xs text-white">{memoryData.emoji}</span>
                        </div>
                        <div className="bg-white/30 backdrop-blur-sm p-4 rounded-lg shadow-sm">
                          <p className="text-purple-800 font-medium">{memoryData.text}</p>
                          <p className="text-sm text-purple-700 mt-2 italic">
                            "{memoryData.detail}"
                          </p>
                          <p className="text-xs text-pink-700 mt-1">
                            {memoryData.date}
                          </p>
                        </div>
                      </motion.div>
                    );
                  }
                  return null;
                })}
              </div>

              {memories.length === allMemories.length && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1 }}
                  className="mt-6 text-center"
                >
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleContinueToGallery}
                    className="bg-pink-500 hover:bg-pink-600 text-white font-bold py-3 px-8 rounded-full text-lg shadow-lg transition-all"
                  >
                    Ver Nossos Momentos ❤️
                  </motion.button>
                </motion.div>
              )}
            </motion.div>

            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 1 }}
              className="mt-8 text-center text-white text-sm"
            >
              <p>Deslize para ver mais memórias...</p>
            </motion.div>
          </motion.div>
        )}

        {stage === 'gallery' && renderGallerySection()}

        {stage === 'proposal' && (
          <motion.div
            key="proposal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="min-h-screen bg-gradient-to-br from-pink-300 via-purple-300 to-indigo-400 p-6 flex flex-col items-center justify-center relative overflow-hidden"
          >
            <motion.div
              initial={{ y: -30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="text-center mb-8 z-10"
            >
              <h2 className="text-5xl font-dancing text-white mb-4 drop-shadow-md">
                Tenho Uma Pergunta...
              </h2>
              <p className="text-xl text-white/90 max-w-lg mx-auto">
                Cada momento ao seu lado tem sido especial. Quero continuar construindo memórias juntos.
              </p>
            </motion.div>
            
            <div className="z-10 bg-white/20 backdrop-blur-md rounded-xl p-8 shadow-xl border border-white/30 max-w-md w-full">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="text-center"
              >
                <h3 className="text-3xl font-dancing text-pink-800 mb-6">
                  Quer namorar comigo?
                </h3>
                
                <div className="flex flex-col md:flex-row gap-4 justify-center mt-8">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleAccept}
                    className="bg-pink-500 hover:bg-pink-600 text-white font-bold py-4 px-8 rounded-full text-xl shadow-xl transition-all"
                  >
                    Sim! ❤️
                  </motion.button>
                  
                  <motion.button
                    whileHover={{ 
                      x: [0, -20, 20, -20, 20, 0],
                      transition: { duration: 0.5 }
                    }}
                    className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-4 px-8 rounded-full text-xl shadow-xl transition-all"
                    style={{ cursor: 'not-allowed' }}
                    onClick={(e) => {
                      e.preventDefault();
                      const button = e.target as HTMLButtonElement;
                      button.style.position = 'absolute';
                      button.style.left = `${Math.random() * 80}%`;
                      button.style.top = `${Math.random() * 80}%`;
                    }}
                  >
                    Não
                  </motion.button>
                </div>
              </motion.div>
            </div>
            
            <div className="absolute inset-0 pointer-events-none">
              {Array.from({ length: 30 }).map((_, i) => (
                <motion.div
                  key={`heart-${i}`}
                  className="absolute text-pink-500"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    fontSize: `${Math.random() * 2 + 1}rem`,
                    opacity: Math.random() * 0.5 + 0.2,
                  }}
                  animate={{
                    y: [0, -20, 0],
                    x: [0, Math.random() * 10 - 5, 0],
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.6, 0.3],
                  }}
                  transition={{
                    duration: 3 + Math.random() * 5,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: Math.random() * 2,
                  }}
                >
                  ❤️
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {stage === 'celebration' && (
          <motion.div
            key="celebration"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0"
          >
            <Celebration />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}