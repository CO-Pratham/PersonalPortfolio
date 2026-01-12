import React from 'react';
import { motion } from 'framer-motion';
import { useStore } from '../store/useStore';
import { portfolioData } from '../data/portfolioData';

const SkillsMatrix = () => {
  const setScene = useStore((state) => state.setScene);

  // Helper to get skills by category
  const getSkills = (categoryId) => {
    return portfolioData.nodes.filter(n => n.parent === categoryId);
  };

  const categories = ['frontend', 'backend', 'ai', 'tools'];

  return (
    <div className="fixed inset-0 z-[10000] bg-black/80 flex items-center justify-center p-4 backdrop-blur-sm pointer-events-auto">
      <div className="w-full max-w-5xl border border-neon-blue bg-black/95 shadow-[0_0_50px_rgba(0,243,255,0.1)] relative overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Terminal Header */}
        <div className="bg-gray-900 border-b border-gray-700 p-2 flex justify-between items-center select-none">
            <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500 cursor-pointer hover:bg-red-400" onClick={() => setScene('neural')}></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500 cursor-pointer hover:bg-yellow-400"></div>
                <div className="w-3 h-3 rounded-full bg-green-500 cursor-pointer hover:bg-green-400"></div>
            </div>
            <div className="text-gray-400 text-xs font-mono">user@pratham-os:~/skills_matrix</div>
            <div className="w-10"></div>
        </div>
        
        <div className="p-6 md:p-8 flex-1 overflow-y-auto custom-scrollbar font-mono">
            {/* Header Logs */}
            <div className="mb-8 space-y-1 text-xs md:text-sm border-b border-gray-800 pb-4">
                <div className="text-gray-400">Loading module: <span className="text-neon-blue">SKILLS_MATRIX_V2.1</span></div>
                <div className="text-neon-green">{'>'} ABILITIES_LOADED_SUCCESSFULLY</div>
                <div className="text-gray-500">Scanning legacy archives... [COMPLETE]</div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {categories.map((catId, index) => (
                    <motion.div 
                        key={catId}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 * index }}
                        className="border border-gray-800 bg-gray-900/30 p-4 rounded-lg hover:border-neon-blue/50 transition-colors group"
                    >
                        <h3 className="text-neon-blue font-bold uppercase mb-4 text-center tracking-widest border-b border-gray-800 pb-2 flex items-center justify-center gap-2 text-sm">
                            {catId === 'ai' ? 'AI / ML' : catId === 'tools' ? 'DEV_OPS' : catId}
                        </h3>
                        
                        <div className="space-y-3">
                            {getSkills(catId).map((skill) => (
                                <div key={skill.id} className="relative">
                                    <div className="flex justify-between text-[10px] md:text-xs text-gray-400 mb-1 uppercase tracking-wider">
                                        <span className="flex items-center gap-2">
                                            {skill.icon && <skill.icon className={`
                                                ${catId === 'ai' ? 'text-pink-500' : ''}
                                                ${catId === 'backend' ? 'text-green-500' : ''}
                                                ${catId === 'frontend' ? 'text-cyan-500' : ''}
                                                ${catId === 'tools' ? 'text-orange-500' : ''}
                                            `} />}
                                            {skill.label}
                                        </span>
                                        <span className="text-gray-600">v{Math.floor(Math.random() * 5) + 1}.0</span>
                                    </div>
                                    <div className="h-1 w-full bg-gray-800 rounded-full overflow-hidden">
                                        <motion.div 
                                            initial={{ width: 0 }}
                                            animate={{ width: `${Math.floor(Math.random() * 30) + 70}%` }}
                                            transition={{ duration: 1, delay: 0.2 + (Math.random() * 0.5) }}
                                            className={`h-full 
                                                ${catId === 'ai' ? 'bg-pink-500 shadow-[0_0_10px_#ec4899]' : ''}
                                                ${catId === 'backend' ? 'bg-green-500 shadow-[0_0_10px_#22c55e]' : ''}
                                                ${catId === 'frontend' ? 'bg-cyan-500 shadow-[0_0_10px_#06b6d4]' : ''}
                                                ${catId === 'tools' ? 'bg-orange-500 shadow-[0_0_10px_#f97316]' : ''}
                                            `}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                ))}
            </div>
            
             {/* Footer details */}
             <div className="mt-8 pt-4 border-t border-gray-800 text-center">
                 <button 
                    onClick={() => setScene('neural')}
                    className="text-xs text-gray-500 hover:text-white uppercase tracking-widest border border-gray-800 px-4 py-2 hover:bg-white/5 hover:border-gray-500 transition-all"
                 >
                     Close_Module [ESC]
                 </button>
             </div>
        </div>
      </div>
    </div>
  );
};

export default SkillsMatrix;
