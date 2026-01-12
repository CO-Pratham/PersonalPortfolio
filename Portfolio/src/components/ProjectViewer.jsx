import React, { useState } from 'react';
import { useStore } from '../store/useStore';

const ProjectViewer = () => {
  const selectedProject = useStore((state) => state.selectedProject);
  const setScene = useStore((state) => state.setScene);
  const [activeTab, setActiveTab] = useState('details');

  if (!selectedProject) return null;

  return (
    <div className="fixed inset-0 z-[10000] bg-black/95 text-white font-mono flex flex-col p-6 md:p-12 overflow-y-auto pointer-events-auto">
      <div className="flex justify-between items-end border-b border-neon-blue/30 pb-4 mb-8 relative">
        <button 
             onClick={() => setScene('ai-lab')}
             className="absolute top-0 right-0 text-white hover:text-red-500 z-50 p-2 transition-colors"
        >
             <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                 <line x1="18" y1="6" x2="6" y2="18"></line>
                 <line x1="6" y1="6" x2="18" y2="18"></line>
             </svg>
        </button>
        <div>
          <div className="text-xs text-neon-blue mb-1">EXECUTING_MODULE: {selectedProject.id.toUpperCase()}</div>
          <h1 className="text-3xl md:text-5xl font-bold uppercase tracking-wider text-white glow-text">{selectedProject.label}</h1>
        </div>
        <button 
          onClick={() => setScene('ai-lab')}
          className="px-4 py-2 border border-neon-blue/50 text-neon-blue hover:bg-neon-blue/10 transition-colors uppercase text-xs"
        >
          [ TERMINATE_PROCESS ]
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left Column: Context */}
        <div className="md:col-span-1 space-y-6">
           <div className="bg-white/5 p-6 border-l-2 border-neon-blue">
              <h3 className="text-neon-blue text-sm mb-2 font-bold">DESCRIPTION</h3>
              <p className="text-sm text-gray-300 leading-relaxed">
                {selectedProject.desc}
              </p>
           </div>
           
           <div>
             <h3 className="text-gray-500 text-xs mb-3 uppercase">TECH_STACK_TRACE</h3>
             <div className="flex flex-wrap gap-2">
               {selectedProject.tech.map(tech => (
                 <span key={tech} className="px-2 py-1 bg-white/10 border border-white/5 text-xs rounded text-neon-green">{tech}</span>
               ))}
             </div>
           </div>

           {selectedProject.link && (
               <a href={selectedProject.link} target="_blank" rel="noopener noreferrer" className="block text-center py-3 bg-neon-blue text-black font-bold uppercase hover:bg-white transition-colors">
                   Launch Live Deployment
               </a>
           )}
        </div>

        {/* Right Column: Dynamic Visuals */}
        <div className="md:col-span-2 bg-black border border-white/10 p-6 relative">
          <div className="absolute inset-0 bg-[url('/grid.png')] opacity-10 pointer-events-none"></div>
          
          <div className="flex space-x-4 mb-6 relative z-10">
             <button onClick={() => setActiveTab('details')} className={`text-xs uppercase px-3 py-1 ${activeTab === 'details' ? 'bg-neon-blue text-black' : 'text-gray-500'}`}>System Architecture</button>
             <button onClick={() => setActiveTab('metrics')} className={`text-xs uppercase px-3 py-1 ${activeTab === 'metrics' ? 'bg-neon-blue text-black' : 'text-gray-500'}`}>Performance Metrics</button>
          </div>

          <div className="h-64 border border-white/5 bg-black/50 p-6 font-mono text-xs overflow-y-auto">
            {activeTab === 'details' && (
              <div className="space-y-4">
                  <div>
                      <span className="text-neon-green block mb-1">&gt; PROBLEM_DEFINITION:</span>
                      <p className="text-gray-400 pl-4 border-l border-gray-700">{selectedProject.details.problem}</p>
                  </div>
                  <div>
                      <span className="text-neon-blue block mb-1">&gt; SOLUTION_IMPLEMENTATION:</span>
                      <p className="text-gray-400 pl-4 border-l border-gray-700">{selectedProject.details.solution}</p>
                  </div>
              </div>
            )}
            
            {activeTab === 'metrics' && (
               <div className="space-y-4 mt-2">
                 {selectedProject.details.metrics.map((m, i) => (
                     <div key={i}>
                         <div className="flex justify-between mb-1">
                             <span className="text-white">{m.label}</span>
                             <span className="text-neon-green font-bold">{m.value}</span>
                         </div>
                         <div className="w-full bg-gray-800 h-1"><div className="bg-neon-green h-full" style={{width: '80%'}}></div></div>
                     </div>
                 ))}
                 {selectedProject.details.metrics.length === 0 && <div className="text-gray-500 text-center mt-10">NO_METRICS_AVAILABLE</div>}
               </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectViewer;
