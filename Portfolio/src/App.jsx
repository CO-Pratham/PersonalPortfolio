import { Canvas } from '@react-three/fiber';
import React, { Suspense, useEffect } from 'react';
import { useStore } from './store/useStore';
import BootSequence from './components/BootSequence';
import NeuralInterface from './components/NeuralInterface';
import AILab from './components/AILab';
import ProjectViewer from './components/ProjectViewer';
import ExperienceTimeline from './components/ExperienceTimeline';
import ContactTerminal from './components/ContactTerminal';
import { OrbitControls, Stars, PerspectiveCamera } from '@react-three/drei';
import { EffectComposer, Bloom, Vignette, Noise } from '@react-three/postprocessing';
import { AnimatePresence, motion } from 'framer-motion';

import AboutProfile from './components/AboutProfile';
import PrathamConsole from './components/PrathamConsole';
import IntroSequence from './components/IntroSequence';

function App() {
  const { currentScene, setScene, isSystemReady } = useStore();

  return (
    <div className="w-screen h-screen bg-black text-white relative overflow-hidden font-sans selection:bg-neon-green selection:text-black">
      
      {/* 0. Intro Sequence - Controls Startup Overlay */}
      <IntroSequence />

      {/* 1. Global Background Effects - Rich Ambient Gradient */}
      <div className="fixed inset-0 pointer-events-none z-0 bg-[radial-gradient(circle_at_50%_50%,_#111827_0%,_#000000_100%)]"></div>
      <div className="fixed inset-0 pointer-events-none z-0 bg-gradient-to-b from-transparent via-black/50 to-black"></div>
      <div className="scanline z-50 pointer-events-none"></div>

      {/* 2. 3D Scene Layer - Only Visible if System Ready */}
      {/* UPDATED: Added cursor-grab styles for better dragging feedback */}
      <div className={`absolute inset-0 transition-opacity duration-1000 ${isSystemReady ? 'opacity-100 cursor-grab active:cursor-grabbing' : 'opacity-0 pointer-events-none'} z-0`}>
        <Canvas gl={{ antialias: false, pixelRatio: 1 }}> {/* Performance optimization for postprocessing */}
          <PerspectiveCamera makeDefault position={[0, 0, 12]} fov={50} />
          
          <Suspense fallback={null}>
            {/* Environment */}
            <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={0.5} />
            <fog attach="fog" args={['#050505', 5, 30]} />
            
            <AnimatePresence mode="wait">
               {/* Always mount Neural Interface if compiled, unless specific scene replaces it */}
               {(currentScene === 'neural' || currentScene === 'about') && isSystemReady && <NeuralInterface key="neural" />}
               
               {/* Other 3D Scenes */}
               {currentScene === 'ai-lab' && isSystemReady && <AILab key="ai-lab" />}
               {currentScene === 'experience' && isSystemReady && <ExperienceTimeline key="experience" />}
               
               {/* Background Neural for Overlays */}
               {(currentScene === 'contact' || currentScene === 'project') && isSystemReady && (
                  <NeuralInterface key="neural-bg" /> 
               )}
            </AnimatePresence>

            {/* Post Processing for Cyberpunk Glow */}
             <EffectComposer disableNormalPass>
                <Bloom luminanceThreshold={0.2} luminanceSmoothing={0.9} height={300} intensity={1.5} />
                <Noise opacity={0.05} />
                <Vignette eskil={false} offset={0.1} darkness={1.1} />
             </EffectComposer>

            {/* UPDATED: Optimized Controls for Map-like Navigation */}
            <OrbitControls 
              enableZoom={true} 
              enablePan={true} 
              enableRotate={true}
              
              // Smooth physics
              enableDamping={true}
              dampingFactor={0.1}
              
              // Responsiveness
              rotateSpeed={0.8}
              panSpeed={2}
              screenSpacePanning={true} // True = Pan moves like a 2D map (Left/Right/Up/Down) matches mouse
              
              // Limits
              minDistance={2}
              maxDistance={200}
              minPolarAngle={0}
              maxPolarAngle={Math.PI}
              
              enabled={isSystemReady} 
            />
          </Suspense>
        </Canvas>
      </div>

      {/* 3. HTML Overlay Layer */}
      <main className="fixed inset-0 z-[60] pointer-events-none overflow-hidden">
        <div className="w-full h-full relative">
           <PrathamConsole />
           
           {/* Only show other interfaces if system is ready */}
           {isSystemReady && (
            <AnimatePresence>
                {currentScene === 'about' && <AboutProfile />}

                {currentScene === 'project' && (
                <motion.div 
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    className="absolute inset-0 z-20 pointer-events-auto"
                >
                    <ProjectViewer />
                </motion.div>
                )}
                
                {currentScene === 'contact' && (
                <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
                    className="absolute inset-0 z-20 pointer-events-auto"
                >
                    <ContactTerminal />
                </motion.div>
                )}
            </AnimatePresence>
           )}
        </div>
      </main>

      {/* 4. Global UI / HUD - Only after compile */}
      {isSystemReady && currentScene !== 'boot' && currentScene !== 'project' && currentScene !== 'contact' && currentScene !== 'about' && (
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
              className="fixed top-6 left-6 z-50 px-4 py-2 bg-black/50 border border-white/20 hover:border-neon-blue text-white text-xs font-mono backdrop-blur-md pointer-events-auto transition-colors"
           >
             &lt; RETURN_ROOT
           </button>
      )}

    </div>
  );
}

export default App;
