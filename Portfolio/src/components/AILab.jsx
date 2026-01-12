import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html, Float, Box } from '@react-three/drei';
import { useStore } from '../store/useStore';
import { portfolioData } from '../data/portfolioData';

const ProjectCapsule = ({ position, color, label, progress, onClick }) => {
  const meshRef = useRef();
  const [hovered, setHovered] = useState(false);

  useFrame(() => {
    if(meshRef.current) {
      meshRef.current.rotation.y += 0.005;
    }
  });

  return (
    <group position={position}>
      <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
        <mesh 
          ref={meshRef}
          onClick={onClick}
          onPointerOver={() => { document.body.style.cursor = 'pointer'; setHovered(true); }}
          onPointerOut={() => { document.body.style.cursor = 'auto'; setHovered(false); }}
        >
          <capsuleGeometry args={[0.5, 1.5, 4, 8]} />
          <meshPhysicalMaterial 
            color={hovered ? color : '#222'}
            emissive={hovered ? color : '#000'}
            emissiveIntensity={hovered ? 0.5 : 0.1}
            roughness={0.2}
            metalness={0.8}
            transparent
            opacity={0.9}
            wireframe={!hovered}
          />
        </mesh>

        <mesh rotation={[Math.PI / 2, 0, 0]}>
           <torusGeometry args={[0.7, 0.02, 16, 32]} />
           <meshBasicMaterial color={color} transparent opacity={0.5} />
        </mesh>

        <Html position={[0, 1.8, 0]} center transform sprite decoration className="pointer-events-none">
          <div className="flex flex-col items-center">
            <div className={`px-3 py-1 bg-black/80 border ${hovered ? 'border-neon-blue' : 'border-white/20'} rounded text-xs font-mono text-white mb-1 transition-colors whitespace-nowrap`}>
              {label}
            </div>
          </div>
        </Html>
      </Float>
    </group>
  )
}

const AILab = () => {
  const selectProject = useStore((state) => state.selectProject);
  
  // Arrange projects in a semi-circle or grid
  const projectsWithPos = portfolioData.projects.map((p, i) => ({
      ...p,
      pos: [(i - 1.5) * 2.5, 0, 0] // Simple horizontal spread
  }));

  return (
    <group>
      <ambientLight intensity={0.2} />
      
      {projectsWithPos.map((p) => (
        <ProjectCapsule 
          key={p.id}
          position={p.pos}
          color={p.color}
          label={p.label}
          onClick={() => selectProject(p)}
        />
      ))}

      <Html position={[-4, 4, 0]} transform>
        <div className="w-64 bg-black/80 border border-neon-blue p-4 font-mono text-xs text-neon-blue">
          <div className="mb-2 border-b border-neon-blue/30 pb-1">PROJECT_INDEX</div>
          <div className="text-gray-400">Select a capsule to initialize execution sequence.</div>
        </div>
      </Html>
    </group>
  );
};

export default AILab;
