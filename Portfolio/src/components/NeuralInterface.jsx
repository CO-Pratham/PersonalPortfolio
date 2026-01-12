import React, { useRef, useState, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html, Float, Line } from '@react-three/drei';
import * as THREE from 'three';
import { useStore } from '../store/useStore';
import { portfolioData } from '../data/portfolioData';
import { FaTerminal } from 'react-icons/fa';

const NeuralNode = ({ node, onClick }) => {
  const meshRef = useRef();
  const wireframeRef = useRef();
  const [hovered, setHovered] = useState(false);
  
  // Size logic based on hierarchy type
  const getSize = () => {
      switch(node.type) {
          case 'core': return { core: 1.2, wire: 1.6, label: 1.8 };
          case 'section': return { core: 0.8, wire: 1.1, label: 1.4 };
          case 'category': return { core: 0.5, wire: 0.7, label: 1.0 };
          case 'item': return { core: 0.3, wire: 0.5, label: 0.7 };
          default: return { core: 0.5, wire: 0.7, label: 1.0 };
      }
  };
  const size = getSize();

  // Icon handling - Icon is passed as a component in node.icon from data
  // Fallback to Terminal if missing or if serialization failed
  const IconComponent = node.icon || FaTerminal;

  useFrame((state) => {
    if (meshRef.current) {
        const t = state.clock.getElapsedTime();
        // Differential rotation speeds based on type for variety
        const speed = node.type === 'core' ? 0.2 : 0.5;
        meshRef.current.rotation.x = t * speed;
        meshRef.current.rotation.y = t * (speed * 0.5);
        
        if (wireframeRef.current) {
             wireframeRef.current.rotation.x = -t * speed;
             wireframeRef.current.rotation.z = t * (speed * 0.5);
        }
    }
  });

  return (
    <group position={node.pos}>
      <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
        
        {/* Hit Box */}
        <mesh 
            onClick={(e) => { e.stopPropagation(); onClick(node); }}
            onPointerOver={(e) => { e.stopPropagation(); document.body.style.cursor = 'pointer'; setHovered(true); }}
            onPointerOut={() => { document.body.style.cursor = 'auto'; setHovered(false); }}
            visible={false} 
        >
            <sphereGeometry args={[size.wire * 1.5, 16, 16]} />
        </mesh>

        {/* Solid Core */}
        <mesh ref={meshRef} scale={hovered ? 1.1 : 1}>
          <octahedronGeometry args={[size.core, 0]} />
          <meshStandardMaterial 
            color="#111" 
            emissive={node.color}
            emissiveIntensity={hovered ? 2 : 0.5}
            roughness={0.2}
            metalness={0.8}
            wireframe={false}
          />
        </mesh>
        
        {/* Wireframe Shield */}
        <mesh ref={wireframeRef} scale={hovered ? 1.2 : 1}>
           <icosahedronGeometry args={[size.wire, 1]} />
           <meshBasicMaterial 
             color={node.color} 
             wireframe 
             transparent 
             opacity={hovered ? 0.6 : 0.15} 
           />
        </mesh>

        {/* HUD Label */}
        {(hovered || node.type === 'core' || node.type === 'section') && (
            <Html position={[0, size.label, 0]} center distanceFactor={15} className="pointer-events-none z-10">
            <div 
                className={`
                    flex flex-col items-center gap-1
                    transition-all duration-300 transform select-none
                    ${hovered ? 'scale-110 opacity-100' : 'opacity-80 scale-95'}
                `}
            >
                {/* Icon Box */}
                <div 
                    className={`
                        flex items-center justify-center 
                        border border-white/20 bg-black/60 backdrop-blur-md rounded-md
                        shadow-[0_0_10px_rgba(0,0,0,0.5)]
                    `}
                    style={{
                        borderColor: node.color,
                        width: node.type === 'item' ? '24px' : '32px',
                        height: node.type === 'item' ? '24px' : '32px',
                        boxShadow: hovered ? `0 0 15px ${node.color}40` : '0 0 5px rgba(0,0,0,0.5)'
                    }}
                >
                    <IconComponent 
                        size={node.type === 'item' ? 12 : 16} 
                        color={hovered ? '#fff' : node.color} 
                    />
                </div>

                {/* Text Label - Hide smaller ones unless hovered */}
                <span 
                    className={`
                        text-[8px] font-bold font-mono tracking-widest whitespace-nowrap 
                        bg-black/40 px-1.5 py-0.5 rounded border border-white/10
                        ${!hovered && node.type === 'item' ? 'hidden' : 'block'}
                    `}
                    style={{ color: hovered ? '#fff' : node.color }}
                >
                {node.label}
                </span>
            </div>
            </Html>
        )}
      </Float>
    </group>
  );
};

// Advanced Connections drawing lines to parents
const SynapseLines = ({ nodes }) => {
  const lines = useMemo(() => {
    const connections = [];
    nodes.forEach(node => {
        if (node.parent) {
            const parent = nodes.find(n => n.id === node.parent);
            if (parent) {
                connections.push({
                    start: new THREE.Vector3(...node.pos),
                    end: new THREE.Vector3(...parent.pos),
                    color: node.color
                });
            }
        }
    });
    return connections;
  }, [nodes]);

  return (
    <group>
        {lines.map((line, i) => (
            <Line 
                key={i} 
                points={[line.start, line.end]} 
                color={line.color} 
                opacity={0.2} 
                transparent 
                lineWidth={1} 
            />
        ))}
    </group>
  );
}

const NeuralInterface = () => {
  const { setScene, selectProject } = useStore();
  const groupRef = useRef();
  
  const nodes = portfolioData.nodes;

  useFrame((state) => {
    if (groupRef.current) {
       // Slow overall rotation for the whole galaxy
       groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.02) * 0.05;
    }
  });

  const handleNodeClick = (node) => {
      console.log("Clicked:", node.id, node.type);
      
      // Project Item Click -> Open Project Viewer
      if (node.type === 'item' && node.parent === 'projects' && node.projectId) {
          const project = portfolioData.projects.find(p => p.id === node.projectId);
          if (project) {
              selectProject(project);
          }
          return;
      }
      
      // Section Navigation
      switch(node.id) {
          case 'about': setScene('about'); break;
          // case 'projects': setScene('ai-lab'); break; 
          // case 'experience': setScene('experience'); break; // Stay on Neural Map for now as we have the timeline nodes there
          case 'contact': setScene('contact'); break;
          default:
              break;
      }
  };

  return (
    <group ref={groupRef}>
      <ambientLight intensity={0.5} />
      
      <SynapseLines nodes={nodes} />
      
      {nodes.map((node) => (
        <NeuralNode key={node.id} node={node} onClick={handleNodeClick} />
      ))}
      
      <pointLight position={[0, 0, 0]} intensity={2} color="#ffffff" distance={20} decay={2} />
    </group>
  );
};

export default NeuralInterface;
