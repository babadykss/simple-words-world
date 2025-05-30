
import React, { useState } from 'react';
import { User, Award, Twitter, FileText, Zap, Star, Moon, Check } from 'lucide-react';

interface ProfileTabProps {
  userBio?: string;
  userTwitter?: string;
}

const ProfileTab = ({ userBio, userTwitter }: ProfileTabProps) => {
  const [showAllAchievements, setShowAllAchievements] = useState(false);

  const achievements = [
    { name: 'First Transaction', date: '2024-01-15', icon: Zap },
    { name: 'Crypto Explorer', date: '2024-02-20', icon: Star },
    { name: 'Dark Mode Lover', date: '2024-03-10', icon: Moon },
  ];

  const allAchievements = [
    { name: 'First Transaction', description: 'Complete your first crypto transaction', unlocked: true, date: '2024-01-15' },
    { name: 'Crypto Explorer', description: 'Explore 5 different cryptocurrencies', unlocked: true, date: '2024-02-20' },
    { name: 'Dark Mode Lover', description: 'Use dark mode for 7 days straight', unlocked: true, date: '2024-03-10' },
    { name: 'Whale Spotter', description: 'Track a transaction over $1M', unlocked: false },
    { name: 'NFT Collector', description: 'Own 10 or more NFTs', unlocked: false },
    { name: 'DeFi Master', description: 'Use 5 different DeFi protocols', unlocked: false },
    { name: 'Portfolio Builder', description: 'Maintain a portfolio over $50k for 30 days', unlocked: false },
    { name: 'Speed Trader', description: 'Execute 100 trades in a single day', unlocked: false },
    { name: 'Diamond Hands', description: 'Hold a position for over 1 year', unlocked: false },
    { name: 'Network Pioneer', description: 'Use a new blockchain within 24h of launch', unlocked: false },
  ];

  return (
    <div className="p-3 space-y-4">
      {/* User Info */}
      <div className="bg-gray-900/50 border border-green-500/20 rounded p-3">
        <div className="flex items-center gap-2 text-green-400 text-sm font-semibold mb-2">
          <User className="w-4 h-4" />
          User Profile
        </div>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-green-400/70 text-xs">UID:</span>
            <span className="text-green-400 text-xs font-mono">TT-4A7B9C2E</span>
          </div>
          <div className="flex justify-between">
            <span className="text-green-400/70 text-xs">Nickname:</span>
            <span className="text-green-300 text-xs">CryptoTitan</span>
          </div>
        </div>
      </div>

      {/* Achievements */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2 text-green-400 text-sm font-semibold">
            <Award className="w-4 h-4" />
            Achievements
          </div>
          <button
            onClick={() => setShowAllAchievements(!showAllAchievements)}
            className="flex items-center gap-1 px-2 py-1 bg-green-500/20 border border-green-500/30 rounded text-green-400 text-xs hover:bg-green-500/30 transition-colors"
          >
            <Check className="w-3 h-3" />
            Check All
          </button>
        </div>

        {showAllAchievements && (
          <div className="mb-3 p-3 bg-gray-900/70 border border-green-500/30 rounded">
            <div className="text-green-400 text-xs font-semibold mb-2">All Available Achievements:</div>
            <div className="space-y-2 max-h-40 overflow-y-auto">
              {allAchievements.map((achievement, index) => (
                <div key={index} className="flex items-start gap-2 p-2 bg-black/30 rounded">
                  <div className={`w-2 h-2 rounded-full mt-1 ${achievement.unlocked ? 'bg-green-400' : 'bg-gray-500'}`}></div>
                  <div className="flex-1">
                    <div className={`text-xs font-medium ${achievement.unlocked ? 'text-green-400' : 'text-gray-400'}`}>
                      {achievement.name}
                    </div>
                    <div className="text-xs text-gray-500">{achievement.description}</div>
                    {achievement.unlocked && achievement.date && (
                      <div className="text-xs text-green-400/50">{achievement.date}</div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="space-y-2">
          {achievements.map((achievement, index) => {
            const IconComponent = achievement.icon;
            return (
              <div key={index} className="bg-gray-900/50 border border-green-500/20 rounded p-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <IconComponent className="w-4 h-4 text-green-400" />
                    <span className="text-green-400 text-xs">{achievement.name}</span>
                  </div>
                  <span className="text-green-400/70 text-xs">{achievement.date}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Twitter */}
      <div className="bg-gray-900/50 border border-green-500/20 rounded p-3">
        <div className="flex items-center gap-2 text-green-400 text-sm font-semibold mb-2">
          <Twitter className="w-4 h-4" />
          Twitter Account
        </div>
        <div className="flex items-center justify-between">
          <span className="text-green-400 text-xs">{userTwitter || '@crypto_titan_2024'}</span>
          <div className="w-2 h-2 bg-green-400 rounded-full"></div>
        </div>
      </div>

      {/* Bio */}
      <div className="bg-gray-900/50 border border-green-500/20 rounded p-3">
        <div className="flex items-center gap-2 text-green-400 text-sm font-semibold mb-2">
          <FileText className="w-4 h-4" />
          Bio
        </div>
        <div className="text-green-400/80 text-xs leading-relaxed">
          {userBio || 'Neural network enthusiast exploring the depths of blockchain technology. Building the future one transaction at a time. 🚀'}
        </div>
      </div>
    </div>
  );
};

export default ProfileTab;
