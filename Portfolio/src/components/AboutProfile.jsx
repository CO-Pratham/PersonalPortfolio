import React from 'react';
import { motion } from 'framer-motion';
import { useStore } from '../store/useStore';
import { portfolioData } from '../data/portfolioData';
import { FaGithub, FaLinkedin, FaTwitter, FaEnvelope, FaMapMarkerAlt, FaPhone } from 'react-icons/fa';

const AboutProfile = () => {
    const setScene = useStore((state) => state.setScene);
    const { personal } = portfolioData;

    return (
        <div className="fixed inset-0 z-[10000] bg-black/80 flex items-center justify-center p-4 backdrop-blur-sm pointer-events-auto">
            <motion.div 
                initial={{ opacity: 0, scale: 0.9 }} 
                animate={{ opacity: 1, scale: 1 }} 
                exit={{ opacity: 0, scale: 0.95 }}
                className="w-full max-w-5xl border border-neon-blue bg-black/95 shadow-[0_0_50px_rgba(0,243,255,0.1)] relative overflow-hidden flex flex-col md:flex-row max-h-[90vh]"
            >
                {/* Visual Flair: Corner Accents */}
                <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-neon-blue"></div>
                <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-neon-blue"></div>
                <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-neon-blue"></div>
                <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-neon-blue"></div>

                {/* Left Panel: Image & Stats */}
                <div className="w-full md:w-1/3 bg-gray-900/50 border-r border-gray-800 p-8 flex flex-col items-center text-center relative overflow-hidden">
                    {/* Scanline effect for image */}
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-0 pointer-events-none bg-[length:100%_4px,3px_100%]"></div>
                    
                    <div className="relative z-10 w-48 h-48 mb-6 group">
                        <div className="absolute inset-0 rounded-full border-2 border-neon-blue/30 group-hover:border-neon-blue/80 transition-colors animate-spin-slow"></div>
                         <div className="absolute inset-2 rounded-full border border-neon-blue/50 group-hover:border-white transition-colors"></div>
                        <img 
                            src="/profile.png" 
                            alt={personal.name} 
                            className="w-full h-full object-cover rounded-full p-3 grayscale hover:grayscale-0 transition-all duration-500"
                        />
                    </div>

                    <h2 className="text-2xl font-bold text-white uppercase tracking-wider mb-2 relative z-10">{personal.name}</h2>
                    <p className="text-neon-blue font-mono text-xs mb-6 relative z-10">{personal.role}</p>

                    <div className="w-full space-y-4 relative z-10 text-left pl-4">
                        <div className="flex items-center gap-3 text-gray-400 text-sm hover:text-white transition-colors">
                            <FaMapMarkerAlt className="text-neon-blue" />
                            <span>{personal.location}</span>
                        </div>
                        <div className="flex items-center gap-3 text-gray-400 text-sm hover:text-white transition-colors">
                            <FaEnvelope className="text-neon-blue" />
                            <a href={`mailto:${personal.email}`} className="truncate hover:underline">{personal.email}</a>
                        </div>
                         <div className="flex items-center gap-3 text-gray-400 text-sm hover:text-white transition-colors">
                            <FaPhone className="text-neon-blue" />
                            <span>{personal.phone}</span>
                        </div>
                    </div>

                    <div className="mt-auto flex gap-4 pt-8 relative z-10">
                        <a href={personal.socials.github} target="_blank" rel="noreferrer" className="text-gray-400 hover:text-white hover:scale-110 transition-all"><FaGithub size={20} /></a>
                        <a href={personal.socials.linkedin} target="_blank" rel="noreferrer" className="text-gray-400 hover:text-neon-blue hover:scale-110 transition-all"><FaLinkedin size={20} /></a>
                        <a href={personal.socials.twitter} target="_blank" rel="noreferrer" className="text-gray-400 hover:text-pink-500 hover:scale-110 transition-all"><FaTwitter size={20} /></a>
                    </div>
                </div>

                {/* Right Panel: Bio & Content */}
                <div className="flex-1 p-8 md:p-12 font-mono flex flex-col relative">
                     {/* Close Button */}
                    <button 
                        onClick={() => setScene('neural')}
                        className="absolute top-4 right-4 text-gray-500 hover:text-white border border-transparent hover:border-gray-700 px-3 py-1 text-xs uppercase tracking-widest transition-all"
                    >
                        Close_Module [X]
                    </button>

                    <div className="mb-8">
                        <div className="text-neon-green text-xs mb-2 tracking-widest">/// IDENTITY_VERIFIED</div>
                        <h3 className="text-3xl md:text-4xl font-bold text-white mb-6">ABOUT_ME</h3>
                        <p className="text-gray-300 leading-relaxed text-sm md:text-base border-l-2 border-neon-blue pl-6 italic">
                            "{personal.bio}"
                        </p>
                    </div>

                    <div className="grid grid-cols-2 gap-6 mb-8">
                        <div className="bg-gray-900/40 p-4 border border-gray-800 hover:border-neon-blue/50 transition-colors">
                            <div className="text-neon-blue text-2xl font-bold mb-1">04+</div>
                            <div className="text-gray-500 text-xs uppercase tracking-wider">Months Experience</div>
                        </div>
                        <div className="bg-gray-900/40 p-4 border border-gray-800 hover:border-neon-blue/50 transition-colors">
                            <div className="text-pink-500 text-2xl font-bold mb-1">{portfolioData.projects.length}+</div>
                            <div className="text-gray-500 text-xs uppercase tracking-wider">Projects Completed</div>
                        </div>
                         <div className="bg-gray-900/40 p-4 border border-gray-800 hover:border-neon-blue/50 transition-colors">
                            <div className="text-yellow-500 text-2xl font-bold mb-1">05+</div>
                            <div className="text-gray-500 text-xs uppercase tracking-wider">Hackathons</div>
                        </div>
                        <div className="bg-gray-900/40 p-4 border border-gray-800 hover:border-neon-blue/50 transition-colors">
                            <div className="text-green-500 text-2xl font-bold mb-1">100%</div>
                            <div className="text-gray-500 text-xs uppercase tracking-wider">Commitment</div>
                        </div>
                    </div>

                    <div className="mt-auto">
                        <h4 className="text-white text-sm uppercase tracking-widest mb-4 border-b border-gray-800 pb-2">Core Competencies</h4>
                         <div className="flex flex-wrap gap-2">
                            {['Problem Solving', 'System Design', 'UI/UX Architecture', 'Agile Methodology', 'Neural Networks'].map(skill => (
                                <span key={skill} className="text-xs bg-gray-800 text-gray-400 px-3 py-1 rounded-full border border-gray-700 hover:border-white hover:text-white transition-colors cursor-default">
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>

            </motion.div>
        </div>
    );
};

export default AboutProfile;
