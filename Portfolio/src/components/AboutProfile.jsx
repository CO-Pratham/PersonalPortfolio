import React from 'react';
import { motion } from 'framer-motion';
import { useStore } from '../store/useStore';
import { portfolioData } from '../data/portfolioData';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';

const AboutProfile = () => {
  const setScene = useStore((state) => state.setScene);

  return (
    <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm pointer-events-auto">
       <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          className="bg-black/90 border border-white/20 p-8 max-w-2xl w-full relative shadow-[0_0_50px_rgba(255,255,255,0.1)] rounded-xl"
       >
          <button 
             onClick={() => setScene('neural')}
             className="absolute top-4 right-4 text-white hover:text-red-500 z-50 p-2 transition-colors"
          >
             <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                 <line x1="18" y1="6" x2="6" y2="18"></line>
                 <line x1="6" y1="6" x2="18" y2="18"></line>
             </svg>
          </button>

          <div className="flex flex-col md:flex-row items-center gap-8">
             {/* Avatar Glitch Effect */}
             <div className="relative w-32 h-32 md:w-40 md:h-40 shrink-0">
                 <div className="absolute inset-0 bg-gradient-to-tr from-neon-blue to-neon-green rounded-full blur opacity-50 animate-pulse"></div>
                 <div className="absolute inset-0.5 bg-black rounded-full flex items-center justify-center overflow-hidden border-2 border-white/20">
                     <span className="text-4xl">👨‍💻</span>
                 </div>
             </div>

             <div className="text-center md:text-left">
                 <h2 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-neon-blue to-neon-green mb-2">
                     {portfolioData.personal.name}
                 </h2>
                 <div className="text-white/60 font-mono text-sm mb-4 tracking-wider">
                     {portfolioData.personal.role}
                 </div>
                 <p className="text-gray-300 leading-relaxed mb-6 border-l-2 border-neon-blue/30 pl-4">
                     {portfolioData.personal.bio}
                 </p>

                 <div className="flex justify-center md:justify-start gap-4">
                    {/* Social Icons */}
                    <a href={portfolioData.personal.socials.github} target="_blank" className="p-2 bg-white/5 rounded-full hover:bg-white/20 hover:text-white text-gray-400 transition-all">
                        <FaGithub size={20} />
                    </a>
                    <a href={portfolioData.personal.socials.linkedin} target="_blank" className="p-2 bg-white/5 rounded-full hover:bg-neon-blue/20 hover:text-neon-blue text-gray-400 transition-all">
                        <FaLinkedin size={20} />
                    </a>
                    <a href={portfolioData.personal.socials.twitter} target="_blank" className="p-2 bg-white/5 rounded-full hover:bg-neon-blue/20 hover:text-neon-blue text-gray-400 transition-all">
                        <FaTwitter size={20} />
                    </a>
                 </div>
             </div>
          </div>
          
          <div className="mt-8 flex gap-4 md:justify-end justify-center relative z-50">
             <button onClick={() => setScene('contact')} className="px-6 py-2 bg-neon-blue text-black font-bold uppercase text-xs tracking-widest hover:bg-white transition-colors">
                 Hire Me
             </button>
             <button onClick={() => setScene('ai-lab')} className="px-6 py-2 border border-white/20 text-white uppercase text-xs tracking-widest hover:border-neon-green hover:text-neon-green transition-colors">
                 View Projects
             </button>
          </div>
       </motion.div>
    </div>
  );
};

export default AboutProfile;
