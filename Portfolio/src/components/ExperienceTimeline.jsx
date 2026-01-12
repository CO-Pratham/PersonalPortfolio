import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html, ScrollControls, Scroll } from '@react-three/drei';
import { useStore } from '../store/useStore';
import { portfolioData } from '../data/portfolioData';

const TimelineItem = ({ year, title, desc, position, type }) => {
  return (
    <group position={position}>
       <mesh>
         <planeGeometry args={[3.5, 2]} />
         <meshBasicMaterial color="#000" wireframe transparent opacity={0} />
       </mesh>
       <Html position={[0, 0, 0]} transform center>
          <div className={`w-80 bg-black/90 border-l-4 p-5 backdrop-blur-md ${type === 'education' ? 'border-neon-blue' : 'border-neon-green'}`}>
             <div className="text-xs font-bold text-gray-500 mb-1 font-mono tracking-widest">{year}</div>
             <div className="text-white font-bold text-lg mb-2 uppercase">{title}</div>
             <p className="text-gray-400 text-xs leading-relaxed">{desc}</p>
             <div className={`text-[10px] mt-2 uppercase font-bold ${type === 'education' ? 'text-neon-blue' : 'text-neon-green'}`}>[{type}_MODULE]</div>
          </div>
       </Html>
    </group>
  );
}

const ExperienceTimeline = () => {
  const setScene = useStore((state) => state.setScene);

  return (
    <group>
       <ambientLight intensity={0.5} />
       <ScrollControls pages={3} damping={0.3}>
          <Scroll>
             {portfolioData.experience.map((ev, i) => (
                <TimelineItem 
                    key={i}
                    {...ev}
                    position={[i % 2 === 0 ? -2.5 : 2.5, -i * 3.5 + 1.5, 0]}
                />
             ))}
          </Scroll>
          <Scroll html>
            <div className="w-screen h-screen pointer-events-none">
               <div className="fixed bottom-10 right-10 pointer-events-auto z-50">
                   <button 
                    className="px-6 py-3 bg-neon-blue text-black font-bold uppercase hover:bg-white transition-colors tracking-widest text-sm shadow-lg hover:shadow-neon-blue/50"
                    onClick={() => setScene('contact')}
                   >
                     Proceed to Uplink &rarr;
                   </button>
               </div>
            </div>
          </Scroll>
       </ScrollControls>
    </group>
  );
};

export default ExperienceTimeline;
