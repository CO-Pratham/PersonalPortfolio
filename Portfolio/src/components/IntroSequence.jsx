import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const IntroSequence = () => {
    const [step, setStep] = useState('black'); // States: black, start, welcome, complete

    useEffect(() => {
        // Timeline:
        // 0.0s: Mount (Black)
        // 2.0s: Show Start Screen
        // 5.0s: Show Welcome
        // 8.0s: Complete (Reveal Terminal)
        
        const t1 = setTimeout(() => setStep('start'), 2000);
        const t2 = setTimeout(() => setStep('welcome'), 5000);
        const t3 = setTimeout(() => setStep('complete'), 8000);

        return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
    }, []);

    if (step === 'complete') return null;

    return (
        <div className="fixed inset-0 z-[100000] bg-black flex items-center justify-center font-mono select-none pointer-events-auto">
            <AnimatePresence mode="wait">
                
                {/* Visual Content for 'Black' - Wait message */}
                {step === 'black' && (
                    <motion.div
                        key="black"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}
                        className="text-gray-500 text-xs tracking-widest uppercase animate-pulse"
                    >
                        Wait...
                    </motion.div>
                )}

                {/* Visual Content for 'Start' */}
                {step === 'start' && (
                    <motion.div
                        key="start"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 1.1, filter: 'blur(10px)' }}
                        transition={{ duration: 1, ease: 'easeOut' }}
                        className="text-center"
                    >
                        <motion.div 
                            initial={{ width: 0 }} 
                            animate={{ width: '100%' }} 
                            transition={{ duration: 1.5, delay: 0.2 }}
                            className="h-1 bg-neon-blue mb-6 mx-auto"
                        />
                        <h1 className="text-4xl md:text-7xl font-bold text-white tracking-widest drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]">
                            PRATHAM GUPTA
                        </h1>
                        <p className="text-neon-green mt-4 tracking-[0.5em] text-xs md:text-sm uppercase animate-pulse">
                            Initializing Kernel...
                        </p>
                    </motion.div>
                )}

                {/* Visual Content for 'Welcome' */}
                {step === 'welcome' && (
                    <motion.div
                        key="welcome"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 1 }}
                        className="text-center"
                    >
                        <h1 className="text-3xl md:text-5xl text-white font-light tracking-[0.2em]">
                            WELCOME
                        </h1>
                        <div className="mt-4 flex items-center justify-center gap-2">
                            <span className="w-2 h-2 bg-neon-green rounded-full animate-bounce"></span>
                            <span className="w-2 h-2 bg-neon-green rounded-full animate-bounce delay-75"></span>
                            <span className="w-2 h-2 bg-neon-green rounded-full animate-bounce delay-150"></span>
                        </div>
                    </motion.div>
                )}

            </AnimatePresence>
        </div>
    );
};

export default IntroSequence;
