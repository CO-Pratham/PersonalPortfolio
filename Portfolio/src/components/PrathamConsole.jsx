import React, { useState, useEffect, useRef } from 'react';
import Draggable from 'react-draggable';
import { useStore } from '../store/useStore';
import { playSound } from '../utils/audioManager';

const PrathamConsole = () => {
  const { 
    isSystemReady, 
    setSystemReady, 
    consoleOutput, 
    addToLog, 
    clearLog, 
    setScene 
  } = useStore();
  
  const [input, setInput] = useState('');
  const [isMinimized, setIsMinimized] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);
  const bottomRef = useRef(null);
  const inputRef = useRef(null);

  // Auto-scroll to bottom of logs
  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [consoleOutput, isMinimized]);

  // Focus input on click or mount
  useEffect(() => {
      if(!isMinimized && inputRef.current) {
          inputRef.current.focus();
      }
  }, [isMinimized, isSystemReady]);

  const handleCommand = async (cmd) => {
    const command = cmd.trim().toLowerCase();
    
    // Echo command
    addToLog({ type: 'user', text: `> ${cmd}` });

    if (!isSystemReady) {
        if (command === 'compile') {
            await runCompileSequence();
        } else {
            addToLog({ type: 'error', text: 'Error: System not compiled. Type "compile" to initialize.' });
        }
        return;
    }

    // Normal Command Mode
    switch (command) {
        case 'help':
            addToLog({ type: 'info', text: 'Available Commands:' });
            addToLog({ type: 'info', text: '  about        - View developer profile' });
            addToLog({ type: 'info', text: '  projects     - Explore Project Vault' });
            addToLog({ type: 'info', text: '  experience   - View Timeline Logs' });
            addToLog({ type: 'info', text: '  contact      - Open Uplink Terminal' });
            addToLog({ type: 'info', text: '  clear        - Clear console logs' });
            addToLog({ type: 'info', text: '  exit         - Minimize console' });
            break;
        case 'about':
            setScene('about');
            addToLog({ type: 'success', text: 'Executing: ABOUT_ME_MODULE...' });
            break;
        case 'projects':
            setScene('ai-lab');
            addToLog({ type: 'success', text: 'Transitioning to PROJECT_VAULT...' });
            break;
        case 'experience':
            setScene('experience');
            addToLog({ type: 'success', text: 'Retrieving TIMELINE_LOGS...' });
            break;
        case 'contact':
            setScene('contact');
            addToLog({ type: 'success', text: 'Opening UPLINK_TERMINAL...' });
            break;
        case 'ai':
             setScene('neural'); // Stays on neural for now or custom AI scene
             addToLog({ type: 'info', text: 'Neural Interface: Active' });
             break;
        case 'clear':
            clearLog();
            break;
        case 'exit':
            setIsMinimized(true);
            addToLog({ type: 'info', text: 'Console minimized.' });
            break;
        default:
            if(command.startsWith('feedback')) {
                addToLog({ type: 'success', text: 'Feedback recorded locally. Thank you.' });
            } else if (command === '') {
                // do nothing
            } else {
                addToLog({ type: 'error', text: `Command not recognized: "${command}". Type "help".` });
            }
    }
  };

  const runCompileSequence = async () => {
      playSound('boot');
      const steps = [
          "Compiling Pratham OS...",
          "Initializing cognition engine...",
          "Loading AI modules...",
          "Mounting React systems...",
          "Establishing neural links...",
          "Compilation successful."
      ];

      for (let i = 0; i < steps.length; i++) {
          await new Promise(r => setTimeout(r, 600));
          playSound('type');
          addToLog({ type: 'system', text: steps[i] });
      }

      await new Promise(r => setTimeout(r, 500));
      playSound('success');
      setSystemReady(true);
      setScene('neural'); // Or triggers the BootSequence animation if we want
      addToLog({ type: 'success', text: "Welcome, User. System Interactive." });
  };

  const onSubmit = (e) => {
      e.preventDefault();
      playSound('click');
      handleCommand(input);
      setInput('');
  };

  const nodeRef = useRef(null);

  // UPDATED: Removed transition-all from draggable container to improve performance
  return (
    <Draggable 
        handle=".console-header" 
        nodeRef={nodeRef} 
        defaultPosition={{x: 50, y: 50}}
        position={isMaximized ? {x: 0, y: 0} : undefined}
        disabled={isMaximized}
    >
        <div 
          ref={nodeRef}
          className={`absolute z-[9999] pointer-events-auto font-mono shadow-[0_22px_70px_4px_rgba(0,0,0,0.56)] overflow-hidden ring-1 ring-white/10
            ${isMinimized 
                ? 'w-12 h-12 bg-[#2b2b2b] rounded-full flex items-center justify-center cursor-pointer hover:bg-gray-700 transition-all duration-300' 
                : isMaximized 
                    ? 'w-screen h-screen rounded-none bg-black/80 backdrop-blur-md' 
                    : 'w-[700px] h-[500px] rounded-lg bg-black/70 backdrop-blur-md'
            }
          `}
        >
            {isMinimized ? (
                <div onClick={() => setIsMinimized(false)} className="console-header w-full h-full flex items-center justify-center cursor-pointer hover:border-white/20 hover:bg-white/10 transition-all rounded-full" title="Click to Restore">
                    <span className="text-green-400 font-bold text-xl select-none">&gt;_</span>
                </div>
            ) : (
                <>
            {/* Header / Drag Handle */}
            <div className="console-header cursor-grab active:cursor-grabbing flex items-center px-4 py-3 bg-black/80 rounded-t-lg select-none backdrop-blur-md">
                {/* Mac Controls */}
                {/* Mac Controls - Authentic Interaction */}
                <div className="flex gap-2 absolute left-4 group/controls z-50">
                    <div 
                        onClick={(e) => { e.stopPropagation(); setIsMinimized(true); }} 
                        className="w-3 h-3 rounded-full bg-[#FF5F57] hover:bg-[#FF5F57]/80 active:bg-[#BF4C46] border border-black/10 cursor-pointer flex items-center justify-center transition-all active:scale-90"
                        title="Close (Minimize)"
                    >
                        <span className="opacity-0 group-hover/controls:opacity-100 text-[8px] font-bold text-black/60 pt-[1px]">✕</span>
                    </div>
                    <div 
                        onClick={(e) => { e.stopPropagation(); setIsMinimized(true); }} 
                        className="w-3 h-3 rounded-full bg-[#FEBC2E] hover:bg-[#FEBC2E]/80 active:bg-[#BF8E22] border border-black/10 cursor-pointer flex items-center justify-center transition-all active:scale-90"
                        title="Minimize"
                    >
                        <span className="opacity-0 group-hover/controls:opacity-100 text-[8px] font-bold text-black/60 pt-[1px]">−</span>
                    </div>
                    <div 
                        onClick={(e) => { e.stopPropagation(); setIsMaximized(!isMaximized); }} 
                        className="w-3 h-3 rounded-full bg-[#28C840] hover:bg-[#28C840]/80 active:bg-[#1D9730] border border-black/10 cursor-pointer flex items-center justify-center transition-all active:scale-90"
                        title={isMaximized ? "Restore" : "Fullscreen"}
                    >
                        <span className="opacity-0 group-hover/controls:opacity-100 text-[7px] font-bold text-black/60 pt-[1px]">{isMaximized ? '↙' : '+'}</span>
                    </div>
                </div>
                
                {/* Centered Title */}
                <div className="flex-1 text-center flex items-center justify-center gap-2 opacity-80">
                    <span className="text-[13px] text-gray-400 font-medium font-sans tracking-wide">prathamgupta — -zsh — 80x24</span>
                </div>
            </div>

            {/* Console Body */}
                    <div 
                        className="flex flex-col h-[calc(100%-44px)] p-3 text-[13px] leading-snug text-white/90 overflow-hidden" 
                        style={{ fontFamily: "Menlo, Monaco, 'Courier New', monospace" }}
                    >
                        <div 
                            className="flex-1 overflow-y-auto custom-scrollbar" 
                            style={{ overscrollBehavior: 'contain' }}
                            onClick={() => inputRef.current?.focus()} 
                        >
                            {/* Last Login Message */}
                            <div className="text-gray-500 mb-2">Last login: {new Date().toLocaleTimeString('en-US', { weekday: 'short', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false }).replace(',', '')} on ttys001</div>
                            
                            {consoleOutput.map((log, i) => (
                                <div key={i} className={`mb-1 leading-snug break-all
                                    ${log.type === 'error' ? 'text-red-400' : ''}
                                    ${log.type === 'success' ? 'text-gray-300' : ''}
                                    ${log.type === 'info' ? 'text-gray-300' : ''}
                                    ${log.type === 'user' ? 'text-white' : 'text-gray-300'}
                                    ${log.type === 'system' ? 'text-gray-400' : ''}
                                `}>
                                    {log.type === 'user' ? (
                                        <div className="flex">
                                            <span className="text-green-400 whitespace-nowrap">prathamgupta@macbook</span>
                                            <span className="text-cyan-400 ml-2 mr-2 whitespace-nowrap">~ %</span>
                                            <span>{log.text.replace('> ', '')}</span>
                                        </div>
                                    ) : (
                                        log.text
                                    )}
                                </div>
                            ))}
                            
                            {/* Input Form - Now inline with logs */}
                            <form onSubmit={onSubmit} className="flex items-center mt-1 group shrink-0">
                                <span className="text-green-400 whitespace-nowrap">prathamgupta@macbook</span>
                                <span className="text-cyan-400 ml-2 mr-2 whitespace-nowrap">~ %</span>
                                <input 
                                    ref={inputRef}
                                    type="text" 
                                    value={input}
                                    onChange={(e) => {
                                        setInput(e.target.value);
                                        playSound('type');
                                    }}
                                    className="flex-1 bg-transparent outline-none text-white font-mono placeholder-gray-700/50 text-sm"
                                    placeholder="try 'help' or 'compile'"
                                    autoFocus
                                    autoComplete="off"
                                />
                            </form>
                            <div ref={bottomRef} />
                        </div>
                    </div>
            </>
        )}
        </div>
    </Draggable>
  );
};

export default PrathamConsole;
