
import React, { useState, useEffect, useRef } from 'react';
import { Terminal, Zap, Code, Activity, ChevronDown } from 'lucide-react';
import TerminalTabs from '../components/TerminalTabs';
import ProfileTab from '../components/ProfileTab';
import DashboardTab from '../components/DashboardTab';
import SettingsTab from '../components/SettingsTab';

const Index = () => {
  const [activeTab, setActiveTab] = useState('terminal');
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<string[]>([
    'Welcome to Titan Terminal v1.0.0',
    'Neural network interface initialized...',
    'Type "help" for available commands',
  ]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showCoreMenu, setShowCoreMenu] = useState(false);
  const [userBio, setUserBio] = useState('Neural network enthusiast exploring the depths of blockchain technology. Building the future one transaction at a time. 🚀');
  const [userTwitter, setUserTwitter] = useState('@crypto_titan_2024');
  const terminalRef = useRef<HTMLDivElement>(null);

  const commands = {
    help: 'Available commands: help, clear, status, neural, scan, deploy, profile, dashboard, setbio, settwitter',
    clear: () => setHistory([]),
    status: 'System: Online | Neural Core: Active | Memory: 2.4GB/4GB',
    neural: 'Neural network processing... [████████████] 100%',
    scan: 'Scanning network... Found 3 active nodes',
    deploy: 'Deploying to production... ✓ Success',
    profile: () => setActiveTab('profile'),
    dashboard: () => setActiveTab('dashboard'),
    setbio: (args: string) => {
      const newBio = args || 'No bio provided';
      setUserBio(newBio);
      return `Bio updated: ${newBio}`;
    },
    settwitter: (args: string) => {
      const newTwitter = args.startsWith('@') ? args : `@${args}`;
      setUserTwitter(newTwitter);
      return `Twitter updated: ${newTwitter}`;
    },
  };

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const newHistory = [...history, `$ ${input}`];
    const [command, ...args] = input.split(' ');
    
    if (commands[command as keyof typeof commands]) {
      const result = commands[command as keyof typeof commands];
      if (typeof result === 'function') {
        if (command === 'setbio' || command === 'settwitter') {
          const response = result(args.join(' '));
          newHistory.push(response);
        } else {
          result();
          setInput('');
          return;
        }
      } else {
        newHistory.push(result);
      }
    } else {
      newHistory.push(`Command not found: ${command}`);
    }

    setHistory(newHistory);
    setInput('');
    
    setIsProcessing(true);
    setTimeout(() => setIsProcessing(false), 500);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'profile':
        return <ProfileTab userBio={userBio} userTwitter={userTwitter} />;
      case 'dashboard':
        return <DashboardTab />;
      case 'settings':
        return <SettingsTab />;
      default:
        return (
          <>
            {/* Terminal Output */}
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

            {/* Input Area */}
            <div className="border-t border-green-500/30 bg-gray-900/30 p-3">
              <form onSubmit={handleSubmit} className="flex items-center gap-2">
                <Code className="w-4 h-4 text-green-400" />
                <span className="text-green-400 text-sm">$</span>
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  className="flex-1 bg-transparent text-green-400 text-sm outline-none placeholder-green-400/50"
                  placeholder="Enter command..."
                  autoFocus
                />
              </form>
            </div>
          </>
        );
    }
  };

  return (
    <div className="w-[400px] h-[600px] bg-black border border-green-500/30 flex flex-col overflow-hidden font-mono">
      {/* Header */}
      <div className="bg-gradient-to-r from-black to-gray-900 border-b border-green-500/30 p-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Terminal className="w-4 h-4 text-green-400" />
          <span className="text-green-400 font-semibold text-sm">Titan Terminal</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          <Activity className="w-4 h-4 text-green-400" />
        </div>
      </div>

      {/* Neural Network Visualization */}
      <div className="bg-gray-900/50 border-b border-green-500/20 p-2 relative">
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center gap-2 text-green-400">
            <Zap className="w-3 h-3" />
            <button 
              onClick={() => setShowCoreMenu(!showCoreMenu)}
              className="flex items-center gap-1 hover:text-green-300 transition-colors"
            >
              <span>Neural Core</span>
              <ChevronDown className="w-3 h-3" />
            </button>
          </div>
          <div className="flex gap-1">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className={`w-1 h-3 bg-green-400 rounded-sm ${
                  isProcessing ? 'animate-pulse' : ''
                }`}
                style={{
                  opacity: Math.random() * 0.7 + 0.3,
                  animationDelay: `${i * 100}ms`
                }}
              />
            ))}
          </div>
        </div>
        
        {showCoreMenu && (
          <div className="absolute top-full left-2 mt-1 bg-gray-900 border border-green-500/30 rounded p-2 z-10">
            <div className="space-y-1">
              <button className="block w-full text-left text-xs text-green-400/50 hover:text-green-400/70 transition-colors cursor-not-allowed">
                Dark Core (Locked)
              </button>
              <button className="block w-full text-left text-xs text-green-400/50 hover:text-green-400/70 transition-colors cursor-not-allowed">
                Light Core (Locked)
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Tabs Navigation */}
      <TerminalTabs activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Content Area */}
      <div className="flex-1 overflow-hidden flex flex-col">
        {renderContent()}
      </div>

      {/* Status Bar */}
      <div className="bg-gradient-to-r from-gray-900 to-black border-t border-green-500/20 px-3 py-1 flex items-center justify-between text-xs">
        <div className="flex items-center gap-2 text-green-400/70">
          <div className="w-2 h-2 bg-green-400 rounded-full"></div>
          <span>Online</span>
        </div>
        <div className="text-green-400/50">
          Neural AI Ready
        </div>
      </div>
    </div>
  );
};

export default Index;
