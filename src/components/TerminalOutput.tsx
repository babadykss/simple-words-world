
import React, { useRef, useEffect } from 'react';

interface TerminalOutputProps {
  history: string[];
  isProcessing: boolean;
}

const TerminalOutput = ({ history, isProcessing }: TerminalOutputProps) => {
  const terminalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history]);

  const formatLine = (line: string, index: number) => {
    if (line.includes('Welcome to Titan Terminal v1.0.0')) {
      return (
        <div key={index} className="mb-1">
          <span className="text-green-300 font-bold bg-gradient-to-r from-green-900/40 via-cyan-900/40 to-green-900/40 px-3 py-2 rounded-lg border-2 border-green-500/50 shadow-lg animate-pulse bg-[length:200%_100%] animate-[gradient_3s_ease-in-out_infinite]">
            {line}
          </span>
        </div>
      );
    }
    
    if (line.startsWith('$')) {
      return (
        <div key={index} className="mb-1">
          <span className="text-green-300">{line}</span>
        </div>
      );
    }
    
    return (
      <div key={index} className="mb-1">
        <span className="text-green-400/80">{line}</span>
      </div>
    );
  };

  return (
    <div 
      ref={terminalRef}
      className="flex-1 p-3 bg-black text-green-400 text-xs leading-relaxed overflow-y-auto scrollbar-thin scrollbar-track-gray-900 scrollbar-thumb-green-500/30"
    >
      <style jsx>{`
        @keyframes gradient {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }
      `}</style>
      {history.map((line, index) => formatLine(line, index))}
      {isProcessing && (
        <div className="flex items-center gap-2 text-green-300">
          <span>Processing</span>
          <div className="flex gap-1">
            <div className="w-1 h-1 bg-green-400 rounded-full animate-bounce"></div>
            <div className="w-1 h-1 bg-green-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
            <div className="w-1 h-1 bg-green-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TerminalOutput;
