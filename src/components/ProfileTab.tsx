
import React from 'react';
import { User, Award, Twitter, FileText, Zap, Star, Moon } from 'lucide-react';

const ProfileTab = () => {
  const achievements = [
    { name: 'First Transaction', date: '2024-01-15', icon: Zap },
    { name: 'Crypto Explorer', date: '2024-02-20', icon: Star },
    { name: 'Dark Mode Lover', date: '2024-03-10', icon: Moon },
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
        <div className="flex items-center gap-2 text-green-400 text-sm font-semibold mb-2">
          <Award className="w-4 h-4" />
          Achievements
        </div>
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
          <span className="text-green-400 text-xs">@crypto_titan_2024</span>
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
          Neural network enthusiast exploring the depths of blockchain technology. 
          Building the future one transaction at a time. 🚀
        </div>
      </div>
    </div>
  );
};

export default ProfileTab;
