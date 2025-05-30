
import React, { useState } from 'react';
import { User, Award, Twitter, FileText, Check, Crown, Shield } from 'lucide-react';
import { getUserUID } from '../utils/userUtils';

interface ProfileTabProps {
  userBio?: string;
  userTwitter?: string;
}

const ProfileTab = ({ userBio, userTwitter }: ProfileTabProps) => {
  const [showAllAchievements, setShowAllAchievements] = useState(false);
  const [showUpgradeMenu, setShowUpgradeMenu] = useState(false);
  const userUID = getUserUID();

  // No achievements unlocked by default
  const achievements: any[] = [];

  const allAchievements = [
    { name: 'First Transaction', description: 'Complete your first crypto transaction', unlocked: false },
    { name: 'Crypto Explorer', description: 'Explore 5 different cryptocurrencies', unlocked: false },
    { name: 'Dark Mode Lover', description: 'Use dark mode for 7 days straight', unlocked: false },
    { name: 'Whale Spotter', description: 'Track a transaction over $1M', unlocked: false },
    { name: 'NFT Collector', description: 'Own 10 or more NFTs', unlocked: false },
    { name: 'DeFi Master', description: 'Use 5 different DeFi protocols', unlocked: false },
    { name: 'Portfolio Builder', description: 'Maintain a portfolio over $50k for 30 days', unlocked: false },
    { name: 'Speed Trader', description: 'Execute 100 trades in a single day', unlocked: false },
    { name: 'Diamond Hands', description: 'Hold a position for over 1 year', unlocked: false },
    { name: 'Network Pioneer', description: 'Use a new blockchain within 24h of launch', unlocked: false },
  ];

  return (
    <div className="p-3 space-y-4 relative">
      {/* User Info */}
      <div className="bg-gray-900/50 border border-green-500/20 rounded p-3">
        <div className="flex items-center gap-2 text-green-400 text-sm font-semibold mb-2">
          <User className="w-4 h-4" />
          User Profile
        </div>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-green-400/70 text-xs">UID:</span>
            <span className="text-green-400 text-xs font-mono">{userUID}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-green-400/70 text-xs">Nickname:</span>
            <span className="text-green-300 text-xs">CryptoTitan</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-green-400/70 text-xs">Role:</span>
            <div className="relative">
              <button 
                onClick={() => setShowUpgradeMenu(!showUpgradeMenu)}
                className="flex items-center gap-1 px-2 py-1 bg-gray-700/50 border border-green-500/20 rounded text-green-400 text-xs hover:bg-green-500/20 hover:border-green-500/40 transition-all duration-200"
              >
                <Shield className="w-3 h-3" />
                User
              </button>
              
              {showUpgradeMenu && (
                <div className="absolute top-full right-0 mt-1 w-64 bg-gray-900/95 border border-green-500/30 rounded p-3 z-50 backdrop-blur-sm">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-green-400 font-semibold text-sm">
                      <Crown className="w-4 h-4 text-yellow-400" />
                      Upgrade to Dark Elite
                    </div>
                    
                    <div className="text-green-400/80 text-xs">
                      Unlock premium features and advanced neural capabilities
                    </div>
                    
                    <div className="space-y-2">
                      <div className="text-green-400 text-xs font-medium">Requirements:</div>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-xs">
                          <div className="w-1.5 h-1.5 bg-red-400 rounded-full"></div>
                          <span className="text-green-400/70">Complete 10 transactions</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs">
                          <div className="w-1.5 h-1.5 bg-red-400 rounded-full"></div>
                          <span className="text-green-400/70">Hold portfolio for 30 days</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs">
                          <div className="w-1.5 h-1.5 bg-red-400 rounded-full"></div>
                          <span className="text-green-400/70">Use neural core 100 times</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="border-t border-green-500/20 pt-2">
                      <div className="text-green-400/60 text-xs mb-2">Alternative:</div>
                      <button className="w-full bg-gradient-to-r from-yellow-600/80 to-yellow-500/80 hover:from-yellow-600 hover:to-yellow-500 border border-yellow-500/30 text-black font-medium text-xs py-1.5 px-3 rounded transition-all duration-200">
                        Premium Access - $9.99/month
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
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
            <div className="space-y-2 max-h-40 overflow-y-auto pr-2" style={{
              scrollbarWidth: 'thin',
              scrollbarColor: 'rgba(34, 197, 94, 0.3) rgba(17, 24, 39, 1)'
            }}>
              {allAchievements.map((achievement, index) => (
                <div key={index} className="flex items-start gap-2 p-2 bg-black/30 rounded border border-green-500/10">
                  <div className={`w-2 h-2 rounded-full mt-1 ${achievement.unlocked ? 'bg-green-400' : 'bg-gray-500'}`}></div>
                  <div className="flex-1">
                    <div className={`text-xs font-medium ${achievement.unlocked ? 'text-green-400' : 'text-gray-400'}`}>
                      {achievement.name}
                    </div>
                    <div className="text-xs text-gray-500">{achievement.description}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {achievements.length === 0 ? (
          <div className="bg-gray-900/50 border border-green-500/20 rounded p-3">
            <div className="text-green-400/50 text-xs text-center">No achievements unlocked yet</div>
          </div>
        ) : (
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
        )}
      </div>

      {/* Twitter */}
      <div className="bg-gray-900/50 border border-green-500/20 rounded p-3">
        <div className="flex items-center gap-2 text-green-400 text-sm font-semibold mb-2">
          <Twitter className="w-4 h-4" />
          Twitter Account
        </div>
        <div className="flex items-center justify-between">
          <span className="text-green-400 text-xs">
            {userTwitter || 'Not set - use "settwitter @username"'}
          </span>
          <div className={`w-2 h-2 rounded-full ${userTwitter ? 'bg-green-400' : 'bg-gray-500'}`}></div>
        </div>
      </div>

      {/* Bio */}
      <div className="bg-gray-900/50 border border-green-500/20 rounded p-3">
        <div className="flex items-center gap-2 text-green-400 text-sm font-semibold mb-2">
          <FileText className="w-4 h-4" />
          Bio
        </div>
        <div className="text-green-400/80 text-xs leading-relaxed">
          {userBio || 'No bio set - use "setbio your bio text"'}
        </div>
      </div>

      {/* Click outside to close upgrade menu */}
      {showUpgradeMenu && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setShowUpgradeMenu(false)}
        />
      )}
    </div>
  );
};

export default ProfileTab;
