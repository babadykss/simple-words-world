
import React, { useState } from 'react';
import { Volume2, Bell, Zap, Shield } from 'lucide-react';

const SettingsTab = () => {
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [notifications, setNotifications] = useState(true);
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [secureMode, setSecureMode] = useState(false);

  const ToggleSwitch = ({ enabled, onChange, label, icon: Icon }: any) => (
    <div className="bg-gray-900/50 border border-green-500/20 rounded p-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Icon className="w-4 h-4 text-green-400" />
          <span className="text-green-400 text-sm">{label}</span>
        </div>
        <button
          onClick={() => onChange(!enabled)}
          className={`w-10 h-6 rounded-sm border-2 transition-all duration-200 ${
            enabled 
              ? 'bg-green-500/20 border-green-500 shadow-lg shadow-green-500/20' 
              : 'bg-gray-700/50 border-gray-600'
          }`}
        >
          <div
            className={`w-4 h-4 rounded-sm transition-all duration-200 ${
              enabled 
                ? 'translate-x-4 bg-green-400 shadow-md shadow-green-400/50' 
                : 'translate-x-0 bg-gray-500'
            }`}
          />
        </button>
      </div>
    </div>
  );

  return (
    <div className="p-3 space-y-3">
      <div className="text-green-400 text-sm font-semibold mb-3">Chat Settings</div>
      
      <ToggleSwitch
        enabled={soundEnabled}
        onChange={setSoundEnabled}
        label="Sound Effects"
        icon={Volume2}
      />
      
      <ToggleSwitch
        enabled={notifications}
        onChange={setNotifications}
        label="Notifications"
        icon={Bell}
      />
      
      <ToggleSwitch
        enabled={autoRefresh}
        onChange={setAutoRefresh}
        label="Auto Refresh"
        icon={Zap}
      />
      
      <ToggleSwitch
        enabled={secureMode}
        onChange={setSecureMode}
        label="Secure Mode"
        icon={Shield}
      />

      <div className="mt-4 p-3 bg-green-500/10 border border-green-500/30 rounded">
        <div className="text-green-400 text-xs mb-2">Neural Network Status</div>
        <div className="text-green-400/70 text-xs">
          • Core: Active<br/>
          • Memory: 2.4GB/4GB<br/>
          • Latency: 12ms<br/>
          • Sync: Real-time
        </div>
      </div>
    </div>
  );
};

export default SettingsTab;
