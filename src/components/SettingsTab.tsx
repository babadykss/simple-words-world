
import React, { useState } from 'react';
import { Volume2, Bell, Zap, Shield } from 'lucide-react';
import { Slider } from '@/components/ui/slider';

const SettingsTab = () => {
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [notifications, setNotifications] = useState(true);
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [secureMode, setSecureMode] = useState(false);
  const [soundVolume, setSoundVolume] = useState([75]);
  const [refreshRate, setRefreshRate] = useState([30]);
  const [securityLevel, setSecurityLevel] = useState([85]);

  const ToggleSwitch = ({ enabled, onChange, label, icon: Icon }: any) => (
    <div className="bg-gray-900/50 border border-green-500/20 rounded p-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Icon className="w-4 h-4 text-green-400" />
          <span className="text-green-400 text-sm">{label}</span>
        </div>
        <button
          onClick={() => onChange(!enabled)}
          className={`w-8 h-4 rounded-full transition-colors ${
            enabled ? 'bg-green-500' : 'bg-gray-600'
          }`}
        >
          <div
            className={`w-3 h-3 bg-white rounded-full transition-transform ${
              enabled ? 'translate-x-4' : 'translate-x-0.5'
            }`}
          />
        </button>
      </div>
    </div>
  );

  const SliderControl = ({ value, onChange, label, icon: Icon, unit, min = 0, max = 100 }: any) => (
    <div className="bg-gray-900/50 border border-green-500/20 rounded p-3">
      <div className="flex items-center gap-2 mb-3">
        <Icon className="w-4 h-4 text-green-400" />
        <span className="text-green-400 text-sm">{label}</span>
        <span className="text-green-400/70 text-xs ml-auto">{value[0]}{unit}</span>
      </div>
      <Slider
        value={value}
        onValueChange={onChange}
        max={max}
        min={min}
        step={1}
        className="w-full"
      />
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

      {soundEnabled && (
        <SliderControl
          value={soundVolume}
          onChange={setSoundVolume}
          label="Volume Level"
          icon={Volume2}
          unit="%"
        />
      )}
      
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

      {autoRefresh && (
        <SliderControl
          value={refreshRate}
          onChange={setRefreshRate}
          label="Refresh Rate"
          icon={Zap}
          unit="s"
          min={5}
          max={120}
        />
      )}
      
      <ToggleSwitch
        enabled={secureMode}
        onChange={setSecureMode}
        label="Secure Mode"
        icon={Shield}
      />

      {secureMode && (
        <SliderControl
          value={securityLevel}
          onChange={setSecurityLevel}
          label="Security Level"
          icon={Shield}
          unit="%"
        />
      )}

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
