import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '../store/useStore';

const BootSequence = () => {
  const setScene = useStore((state) => state.setScene);
  const [lines, setLines] = useState([]);
  const [isReady, setIsReady] = useState(false);
  const initialized = useRef(false);
  const bottomRef = useRef(null);

  const bootLines = [
    { text: "Initializing kernel modules...", delay: 200 },
    { text: "Loading neural architecture...", delay: 400 },
    { text: "Verifying cognitive file system...", delay: 600 },
    { text: "Mounting memory blocks...", delay: 400 },
    { text: "Establishing secure uplink...", delay: 500 },
    { text: "Accessing Pratham's consciousness...", delay: 700 },
    { text: "System Integrity: 100%", delay: 300, color: "text-neon-green" },
    { text: "Boot sequence complete.", delay: 300 }
  ];

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;

    let currentDelay = 0;
    
    // Clear lines initially just in case
    setLines([]);

    bootLines.forEach((line, index) => {
      currentDelay += line.delay;
      setTimeout(() => {
        setLines((prev) => [...prev, line]);
        if (index === bootLines.length - 1) {
          setIsReady(true);
        }
      }, currentDelay);
    });
  }, []);

  // Auto-scroll
  useEffect(() => {
     if (bottomRef.current) {
         bottomRef.current.scrollIntoView({ behavior: 'smooth' });
     }
  }, [lines]);

  const handleStart = () => {
    setScene('neural');
  };

  useEffect(() => {
    const handleKeyPress = () => {
      if (isReady) handleStart();
    };
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [isReady]);

  return (
    <div 
      className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center font-mono text-white overflow-hidden cursor-pointer" 
      onClick={isReady ? handleStart : undefined}
    >
        {/* Retro Monitor Background */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#222_0%,_#000_100%)] pointer-events-none"></div>
        <div className="absolute inset-0 opacity-20 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%] bg-repeat"></div>

      <div className="w-full max-w-2xl p-8 relative z-10 flex flex-col h-full justify-center">
        <div className="border border-gray-800 bg-black/80 p-6 rounded-lg shadow-[0_0_50px_rgba(0,243,255,0.1)] min-h-[50vh] flex flex-col">
          <div className="border-b border-gray-800 pb-2 mb-4 flex justify-between items-center text-xs text-gray-500 uppercase tracking-widest">
              <span>Terminal_v2.0</span>
              <span>Secure_Connection</span>
          </div>
          
          <div className="flex-1 overflow-y-auto font-mono text-sm md:text-base space-y-2 custom-scrollbar">
            {lines.map((line, i) => (
              <div 
                key={i}
                className={`tracking-wide ${line.color || 'text-gray-300'}`}
              >
                <span className="text-gray-600 mr-3">[{new Date().toLocaleTimeString('en-US', {hour12: false})}]</span>
                <span className="text-neon-blue mr-2">$</span>
                {line.text}
              </div>
            ))}
            <div ref={bottomRef} />
          </div>

          <div className="mt-6 h-12 flex items-center justify-center">
            <AnimatePresence>
                {isReady && (
                <motion.div 
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
                    className="text-neon-green font-bold tracking-widest uppercase text-sm border border-neon-green/50 px-4 py-2 bg-neon-green/5 shadow-[0_0_15px_rgba(0,255,157,0.2)]"
                >
                    &gt; Press any key to Initialize System _
                </motion.div>
                )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BootSequence;
