import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { useStore } from '../store/useStore';
import { portfolioData } from '../data/portfolioData';

const ExperienceTimeline = () => {
    const setScene = useStore((state) => state.setScene);

    return (
        <div className="fixed inset-0 z-[10000] bg-black/80 flex items-center justify-center p-4 backdrop-blur-sm pointer-events-auto">
            <div className="w-full max-w-4xl border border-neon-blue bg-black/95 shadow-[0_0_50px_rgba(0,243,255,0.1)] relative overflow-hidden flex flex-col max-h-[90vh]">
                
                 {/* Terminal Header */}
                 <div className="bg-gray-900 border-b border-gray-700 p-2 flex justify-between items-center select-none shrink-0">
                    <div className="flex gap-2">
                        <div className="w-3 h-3 rounded-full bg-red-500 cursor-pointer hover:bg-red-400" onClick={() => setScene('neural')}></div>
                        <div className="w-3 h-3 rounded-full bg-yellow-500 cursor-pointer hover:bg-yellow-400"></div>
                        <div className="w-3 h-3 rounded-full bg-green-500 cursor-pointer hover:bg-green-400"></div>
                    </div>
                    <div className="text-gray-400 text-xs font-mono">user@pratham-os:~/timeline_logs</div>
                    <div className="w-10"></div>
                </div>

                <div className="p-6 md:p-10 flex-1 overflow-y-auto custom-scrollbar font-mono">
                    <div className="mb-10 text-center">
                        <h2 className="text-3xl font-bold text-white mb-2 tracking-widest uppercase">Chronicles</h2>
                        <div className="w-24 h-1 bg-neon-blue mx-auto mb-4"></div>
                        <p className="text-gray-400 text-sm">Initializing memory banks... Accessing historical logs.</p>
                    </div>

                    <div className="relative border-l-2 border-gray-800 ml-4 md:ml-10 space-y-12 pb-10">
                        {portfolioData.experience.map((item, index) => {
                            const isPresent = item.year.toLowerCase().includes('present');
                            
                            return (
                                <motion.div 
                                    key={index}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.2 }}
                                    className="relative pl-8 md:pl-12 group"
                                >
                                    {/* Timeline Dot */}
                                    <div className={`absolute -left-[9px] top-0 w-4 h-4 rounded-full border-2 bg-black transition-all duration-300 group-hover:scale-125
                                        ${item.type === 'work' ? 'border-neon-green group-hover:bg-neon-green' : 
                                        item.type === 'education' ? 'border-neon-blue group-hover:bg-neon-blue' : 'border-pink-500 group-hover:bg-pink-500'}
                                        ${isPresent ? 'animate-pulse shadow-[0_0_10px_#00ff9d]' : ''}
                                    `}></div>

                                    <div className={`border bg-gray-900/40 p-6 rounded-r-lg transition-all hover:bg-gray-900/60 relative overflow-hidden
                                        ${isPresent ? 'border-neon-green/50 shadow-[0_0_20px_rgba(0,255,157,0.1)]' : 'border-gray-800 hover:border-gray-600'}
                                    `}>
                                        {/* Background decoration */}
                                        <div className={`absolute top-0 right-0 p-2 text-[10px] font-bold uppercase tracking-widest opacity-20
                                            ${item.type === 'work' ? 'text-neon-green' : 
                                            item.type === 'education' ? 'text-neon-blue' : 'text-pink-500'}
                                        `}>
                                            {item.type}
                                        </div>

                                        <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                                            <h3 className={`text-xl font-bold uppercase ${item.type === 'work' ? 'text-neon-green' : 'text-white'}`}>
                                                {item.title}
                                                {isPresent && <span className="inline-block w-2 h-2 bg-neon-green rounded-full ml-2 animate-ping"></span>}
                                            </h3>
                                            <span className={`text-sm font-mono px-2 py-1 rounded inline-block w-fit mt-2 md:mt-0 
                                                ${isPresent ? 'bg-neon-green/10 text-neon-green border border-neon-green/30' : 'bg-gray-800/50 text-gray-400'}
                                            `}>
                                                {item.year}
                                            </span>
                                        </div>
                                        <p className="text-gray-300 text-sm leading-relaxed mb-4">{item.desc}</p>
                                        
                                        {/* Dynamic Tags */}
                                        {item.tags && item.tags.length > 0 && (
                                            <div className="flex gap-2 flex-wrap">
                                                {item.tags.map((tag, i) => (
                                                    <span key={i} className="text-[10px] uppercase border border-gray-700 px-2 py-1 text-gray-500 hover:border-neon-blue hover:text-neon-blue transition-colors cursor-default">
                                                        {tag}
                                                    </span>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>

                    <div className="mt-8 pt-4 border-t border-gray-800 text-center">
                        <button 
                            onClick={() => setScene('neural')}
                            className="text-xs text-gray-500 hover:text-white uppercase tracking-widest border border-gray-800 px-4 py-2 hover:bg-white/5 hover:border-gray-500 transition-all"
                        >
                            Close_Logs [ESC]
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ExperienceTimeline;
