
import React from 'react';
import { Code } from 'lucide-react';

interface TerminalInputProps {
  input: string;
  onInputChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}

const TerminalInput = ({ input, onInputChange, onSubmit }: TerminalInputProps) => {
  return (
    <div className="border-t border-green-500/30 bg-gray-900/30 p-3">
      <form onSubmit={onSubmit} className="flex items-center gap-2">
        <Code className="w-4 h-4 text-green-400" />
        <span className="text-green-400 text-sm">$</span>
        <input
          type="text"
          value={input}
          onChange={(e) => onInputChange(e.target.value)}
          className="flex-1 bg-transparent text-green-400 text-sm outline-none placeholder-green-400/50"
          placeholder="Enter command..."
          autoFocus
        />
      </form>
    </div>
  );
};

export default TerminalInput;
