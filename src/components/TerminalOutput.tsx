
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

  return (
    <div 
      ref={terminalRef}
      className="flex-1 p-3 bg-black text-green-400 text-xs leading-relaxed overflow-y-auto scrollbar-thin scrollbar-track-gray-900 scrollbar-thumb-green-500/30"
    >
      {history.map((line, index) => (
        <div key={index} className="mb-1">
          {line.startsWith('$') ? (
            <span className="text-green-300">{line}</span>
          ) : (
            <span className="text-green-400/80">{line}</span>
          )}
        </div>
      ))}
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
