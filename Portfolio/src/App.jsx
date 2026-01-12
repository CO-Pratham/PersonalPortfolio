import React, { Suspense, useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import { EffectComposer, Bloom, Noise, Vignette } from '@react-three/postprocessing';
import { AnimatePresence, motion } from 'framer-motion';

// Components
import NeuralInterface from './components/NeuralInterface';
import ProjectViewer from './components/ProjectViewer';
import ContactTerminal from './components/ContactTerminal';
import ExperienceTimeline from './components/ExperienceTimeline';
import AboutProfile from './components/AboutProfile';
import PrathamConsole from './components/PrathamConsole';
import IntroSequence from './components/IntroSequence';
import SkillsMatrix from './components/SkillsMatrix';

// Store
import { useStore } from './store/useStore';

function App() {
  const { currentScene, setScene, isSystemReady } = useStore();

  return (
    <div className="w-full h-screen bg-black text-white overflow-hidden relative selection:bg-neon-blue selection:text-white">
      
      {/* 0. Intro Sequence */}
      <IntroSequence />

      {/* 1. 3D Background Layer */}
      <div className={`absolute inset-0 z-0 transition-opacity duration-1000 ${isSystemReady ? 'opacity-100' : 'opacity-0'} cursor-grab active:cursor-grabbing`}>
        <Canvas camera={{ position: [0, 0, 18], fov: 45 }} gl={{ antialias: true, alpha: false }}>
            <color attach="background" args={['#050505']} />
            <fog attach="fog" args={['#050505', 10, 50]} />
            
            <Suspense fallback={null}>
                <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} intensity={1} color="#00f3ff" />
                <pointLight position={[-10, -10, -10]} intensity={0.5} color="#ff0055" />
                
                <NeuralInterface />
                
                <EffectComposer>
                    <Bloom luminanceThreshold={0.1} luminanceSmoothing={0.9} height={300} intensity={1.5} />
                    <Noise opacity={0.05} />
                    <Vignette eskil={false} offset={0.1} darkness={1.1} />
                </EffectComposer>
            </Suspense>

            <OrbitControls 
              enableZoom={true} 
              enablePan={true} 
              enableRotate={true}
              enableDamping={true}
              dampingFactor={0.1}
              rotateSpeed={0.8}
              panSpeed={2}
              screenSpacePanning={true} 
              minDistance={2}
              maxDistance={200}
              minPolarAngle={0}
              maxPolarAngle={Math.PI}
              enabled={isSystemReady} 
            />
        </Canvas>
      </div>

      {/* 2. Cyberpunk Scanline Overlay */}
      <div className="scanline z-10 pointer-events-none"></div>

      {/* 3. HTML Overlay Layer */}
      <main className="fixed inset-0 z-[60] pointer-events-none overflow-hidden">
        <div className="w-full h-full relative">
           <PrathamConsole />
           
           {/* Only show other interfaces if system is ready */}
           {/* Using AnimatePresence to handle transitions */}
           {isSystemReady && (
            <AnimatePresence>
                {/* ABOUT OVERLAY */}
                {currentScene === 'about' && <AboutProfile />}

                {/* PROJECT OVERLAY */}
                {(currentScene === 'project' || currentScene === 'ai-lab') && (
                <motion.div 
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    className="absolute inset-0 z-20 pointer-events-auto"
                >
                    <ProjectViewer />
                </motion.div>
                )}
                
                {/* CONTACT OVERLAY */}
                {currentScene === 'contact' && (
                <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
                    className="absolute inset-0 z-20 pointer-events-auto"
                >
                    <ContactTerminal />
                </motion.div>
                )}

                {/* EXPERIENCE OVERLAY - Explicitly outside Canvas */}
                {currentScene === 'experience' && (
                  <motion.div 
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    key="experience"
                    className="absolute inset-0 z-20 pointer-events-auto"
                  >
                    <ExperienceTimeline />
                  </motion.div>
                )}

                {/* SKILLS OVERLAY */}
                {currentScene === 'skills' && (
                     <motion.div 
                        initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
                        className="absolute inset-0 z-20 pointer-events-auto"
                    >
                        <SkillsMatrix />
                    </motion.div>
                )}
            </AnimatePresence>
           )}
        </div>
      </main>

      {/* 4. Global UI / HUD - Only after compile */}
      {isSystemReady && currentScene !== 'boot' && currentScene !== 'project' && currentScene !== 'contact' && currentScene !== 'about' && currentScene !== 'skills' && currentScene !== 'experience' && (
        <>
            <div className="fixed top-6 right-6 z-50 text-right pointer-events-none">
                <h1 className="text-xl font-bold tracking-widest text-white drop-shadow-lg">PRATHAM GUPTA</h1>
                <div className="text-[10px] text-neon-blue font-mono">FULL STACK DEVELOPER // AI ENGINEER</div>
            </div>

            <div className="fixed bottom-6 left-6 z-50 text-[10px] text-gray-400 font-mono pointer-events-none border-l-2 border-neon-blue pl-3 bg-black/20 backdrop-blur-sm p-2">
              SYSTEM_STATUS: <span className="text-neon-green">ONLINE</span><br/>
              MODULE: {currentScene.toUpperCase()}<br/>
              RENDER: POST_PROCESSING_ACTIVE
            </div>
        </>
      )}
      
      {isSystemReady && currentScene !== 'boot' && currentScene !== 'neural' && (
      <button 
        onClick={() => setScene('neural')}
        className="fixed top-4 right-4 z-50 p-2 bg-white/10 backdrop-blur-md rounded-full text-white/50 hover:text-white hover:bg-white/20 transition-all font-mono text-xs border border-white/5"
      >
        [ESC] NEURAL_VIEW
      </button>
      )}

    </div>
  );
}

export default App;
