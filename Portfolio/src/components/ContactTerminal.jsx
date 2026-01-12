import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '../store/useStore';
import { portfolioData } from '../data/portfolioData';

const ContactTerminal = () => {
  const setScene = useStore((state) => state.setScene);
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('idle');
  const [showAbortWarning, setShowAbortWarning] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus('sending');
    setTimeout(() => {
      setStatus('success');
    }, 2000);
  };

  const handleAbort = () => {
      if (formState.name || formState.email || formState.message) {
          setShowAbortWarning(true);
      } else {
          setScene('neural');
      }
  };

  const confirmAbort = () => {
      setScene('neural');
      setShowAbortWarning(false);
  }

  return (
    <div className="fixed inset-0 z-[10000] bg-black/80 flex items-center justify-center p-4 backdrop-blur-sm pointer-events-auto">
      <div className="w-full max-w-2xl border border-neon-green bg-black/95 shadow-[0_0_50px_rgba(0,255,157,0.1)] relative overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Terminal Header */}
        <div className="bg-gray-900 border-b border-gray-700 p-2 flex justify-between items-center select-none">
            <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500 cursor-pointer hover:bg-red-400" onClick={handleAbort}></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500 cursor-pointer hover:bg-yellow-400"></div>
                <div className="w-3 h-3 rounded-full bg-green-500 cursor-pointer hover:bg-green-400"></div>
            </div>
            <div className="text-gray-400 text-xs font-mono">user@pratham-os:~</div>
            <div className="w-10"></div>
        </div>
        
        <div className="p-6 md:p-8 flex-1 overflow-y-auto custom-scrollbar font-mono">
            {/* Connection Logs */}
            <div className="mb-6 space-y-1 text-xs md:text-sm">
                <div className="text-gray-400">Initializing secure uplink...</div>
                <div className="text-gray-400">Resolving host: <span className="text-neon-blue">prathamgupta.xyz</span></div>
                <div className="text-neon-green">{'>'} CONNECTION_ESTABLISHED</div>
                <div className="text-gray-500 mt-2">Target Recipient: <span className="text-white">{portfolioData.personal.email}</span></div>
            </div>

            {/* Abort Warning Modal */}
            <AnimatePresence>
                {showAbortWarning && (
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        className="absolute inset-0 z-50 bg-black/90 flex flex-col items-center justify-center p-6 text-center"
                    >
                        <div className="border border-red-500 p-6 bg-red-900/20 max-w-sm">
                            <h3 className="text-red-500 font-bold text-xl mb-2">⚠ WARNING: DATA LOSS</h3>
                            <p className="text-gray-300 text-sm mb-6">Aborting transmission will discard un-sent packets. Reference to input stream will be lost.</p>
                            <div className="flex justify-center gap-4">
                                <button onClick={() => setShowAbortWarning(false)} className="px-4 py-2 border border-gray-500 text-gray-300 hover:bg-white/10 text-xs">RESUME</button>
                                <button onClick={confirmAbort} className="px-4 py-2 bg-red-600 text-white hover:bg-red-500 text-xs font-bold">ABORT ANYWAY</button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {status === 'success' ? (
            <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-12 border border-neon-green/30 bg-neon-green/5"
            >
                <div className="text-6xl mb-4">✅</div>
                <div className="text-xl mb-2 text-neon-green font-bold tracking-widest">TRANSMISSION_COMPLETE</div>
                <p className="text-gray-400 text-sm mb-6">Packet 0x4F2A successfully delivered to Pratham's inbox.</p>
                <button 
                onClick={() => setScene('neural')}
                className="px-8 py-3 bg-neon-green text-black font-bold hover:bg-white transition-colors uppercase tracking-widest text-sm"
                >
                Return to Network
                </button>
            </motion.div>
            ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="group">
                <label className="block text-xs uppercase text-gray-500 mb-1 group-focus-within:text-neon-green transition-colors">
                    <span className="text-neon-blue mr-2">$</span> var Sender_Name
                </label>
                <input 
                    type="text" 
                    required
                    value={formState.name}
                    onChange={e => setFormState({...formState, name: e.target.value})}
                    className="w-full bg-gray-900/50 border border-gray-700 focus:border-neon-green outline-none p-3 text-white transition-all font-mono placeholder-gray-700 text-sm"
                    placeholder="Enter identification..."
                />
                </div>

                <div className="group">
                <label className="block text-xs uppercase text-gray-500 mb-1 group-focus-within:text-neon-green transition-colors">
                    <span className="text-neon-blue mr-2">$</span> var Return_Address
                </label>
                <input 
                    type="email" 
                    required
                    value={formState.email}
                    onChange={e => setFormState({...formState, email: e.target.value})}
                    className="w-full bg-gray-900/50 border border-gray-700 focus:border-neon-green outline-none p-3 text-white transition-all font-mono placeholder-gray-700 text-sm"
                    placeholder="name@domain.com"
                />
                </div>

                <div className="group">
                <label className="block text-xs uppercase text-gray-500 mb-1 group-focus-within:text-neon-green transition-colors">
                    <span className="text-neon-blue mr-2">$</span> const Message_Body
                </label>
                <textarea 
                    rows={5}
                    required
                    value={formState.message}
                    onChange={e => setFormState({...formState, message: e.target.value})}
                    className="w-full bg-gray-900/50 border border-gray-700 focus:border-neon-green outline-none p-3 text-white transition-all font-mono resize-none placeholder-gray-700 text-sm leading-relaxed"
                    placeholder="Input message stream data..."
                />
                </div>

                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-800">
                    <div className="text-xs text-gray-600 flex flex-col justify-center">
                        <div>LOCATION: {portfolioData.personal.location}</div>
                        <div>ENC: 256-BIT SSL</div>
                    </div>
                    <button 
                    type="submit" 
                    disabled={status === 'sending'}
                    className="w-full bg-neon-green text-black hover:bg-white hover:shadow-[0_0_15px_rgba(255,255,255,0.5)] transition-all py-3 font-bold uppercase tracking-widest text-sm disabled:opacity-50 disabled:cursor-wait"
                    >
                    {status === 'sending' ? (
                        <span className="animate-pulse">Transmitting...</span>
                    ) : (
                        <span>Execute_Send [Enter]</span>
                    )}
                    </button>
                </div>
            </form>
            )}

            {/* Footer details */}
            {!status && (
             <div className="mt-8 pt-4 border-t border-gray-800 grid grid-cols-3 gap-2 text-[10px] text-gray-600 uppercase text-center">
                 {Object.entries(portfolioData.personal.socials).map(([key, url]) => (
                     <a key={key} href={url} target="_blank" className="hover:text-neon-blue hover:underline cursor-pointer">
                         external_link::{key}
                     </a>
                 ))}
             </div>
            )}
        </div>
      </div>
    </div>
  );
};

export default ContactTerminal;
