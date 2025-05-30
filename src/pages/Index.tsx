
import React, { useState, useEffect } from 'react';
import TerminalTabs from '../components/TerminalTabs';
import ProfileTab from '../components/ProfileTab';
import DashboardTab from '../components/DashboardTab';
import SettingsTab from '../components/SettingsTab';
import TerminalHeader from '../components/TerminalHeader';
import NeuralCore from '../components/NeuralCore';
import TerminalOutput from '../components/TerminalOutput';
import TerminalInput from '../components/TerminalInput';
import StatusBar from '../components/StatusBar';
import { createCommands, executeCommand } from '../utils/terminalCommands';
import { soundManager } from '../utils/soundUtils';

// Declare global chrome types for extension environment
declare global {
  interface Window {
    chrome?: {
      storage?: {
        local?: {
          get: (keys: string[]) => Promise<any>;
        };
      };
    };
  }
}

const Index = () => {
  const [activeTab, setActiveTab] = useState('terminal');
  const [input, setInput] = useState('');
  const [userNickname, setUserNickname] = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showCoreMenu, setShowCoreMenu] = useState(false);
  const [userBio, setUserBio] = useState('');
  const [userTwitter, setUserTwitter] = useState('');
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [soundVolume, setSoundVolume] = useState(50);

  // Load user data and initialize history
  useEffect(() => {
    const loadUserData = async () => {
      try {
        if (typeof window !== 'undefined' && window.chrome && window.chrome.storage) {
          const result = await window.chrome.storage.local!.get(['userNickname']);
          const nickname = result.userNickname || '';
          setUserNickname(nickname);
          
          const welcomeMessage = nickname 
            ? `Welcome ${nickname.toUpperCase()} to Titan Terminal v1.0.0`
            : 'Welcome to Titan Terminal v1.0.0';
          
          setHistory([
            welcomeMessage,
            'Neural network interface initialized...',
            'Type "help" for available commands',
          ]);
        } else {
          // Fallback for non-extension environment
          setHistory([
            'Welcome to Titan Terminal v1.0.0',
            'Neural network interface initialized...',
            'Type "help" for available commands',
          ]);
        }
      } catch (error) {
        console.error('Error loading user data:', error);
        setHistory([
          'Welcome to Titan Terminal v1.0.0',
          'Neural network interface initialized...',
          'Type "help" for available commands',
        ]);
      }
    };

    loadUserData();
  }, []);

  useEffect(() => {
    soundManager.setEnabled(soundEnabled);
  }, [soundEnabled]);

  useEffect(() => {
    soundManager.setVolume(soundVolume);
  }, [soundVolume]);

  const commands = createCommands(setHistory, setActiveTab, setUserBio, setUserTwitter, userNickname);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    soundManager.playCommand();

    const newHistory = [...history, `$ ${input}`];
    const [command, ...args] = input.split(' ');
    
    const result = executeCommand(command, args, commands);
    
    if (result !== null) {
      newHistory.push(result);
      if (result.includes('Error') || result.includes('Unknown')) {
        soundManager.playError();
      } else {
        soundManager.playSuccess();
      }
    }

    setHistory(newHistory);
    setInput('');
    
    setIsProcessing(true);
    soundManager.playProcessing();
    setTimeout(() => setIsProcessing(false), 500);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'profile':
        return <ProfileTab userBio={userBio} userTwitter={userTwitter} />;
      case 'dashboard':
        return <DashboardTab />;
      case 'settings':
        return (
          <SettingsTab 
            soundEnabled={soundEnabled} 
            onSoundChange={setSoundEnabled}
            soundVolume={soundVolume}
            onVolumeChange={setSoundVolume}
          />
        );
      default:
        return (
          <>
            <TerminalOutput history={history} isProcessing={isProcessing} />
            <TerminalInput 
              input={input}
              onInputChange={setInput}
              onSubmit={handleSubmit}
              soundEnabled={soundEnabled}
            />
          </>
        );
    }
  };

  return (
    <div className="w-[400px] h-[600px] bg-black border border-green-500/30 flex flex-col overflow-hidden font-mono">
      <TerminalHeader />
      <NeuralCore 
        isProcessing={isProcessing}
        showCoreMenu={showCoreMenu}
        onToggleMenu={() => setShowCoreMenu(!showCoreMenu)}
      />
      <TerminalTabs activeTab={activeTab} onTabChange={setActiveTab} />
      <div className="flex-1 overflow-hidden flex flex-col">
        {renderContent()}
      </div>
      <StatusBar />
    </div>
  );
};

export default Index;
