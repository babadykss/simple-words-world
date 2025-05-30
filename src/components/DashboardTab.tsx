
import React from 'react';
import { Wallet, Image, Activity } from 'lucide-react';

const DashboardTab = () => {
  const walletData = [
    { network: 'Ethereum', balance: '2.45 ETH', usd: '$6,567.23' },
    { network: 'Solana', balance: '125.30 SOL', usd: '$12,373.48' },
    { network: 'Bitcoin', balance: '0.0823 BTC', usd: '$3,559.58' },
  ];

  const nftData = [
    { name: 'Bored Ape #1234', floor: '45.2 ETH' },
    { name: 'Pudgy Penguin #567', floor: '8.7 ETH' },
    { name: 'Sol Monkey #890', floor: '12.5 SOL' },
  ];

  const recentActivity = [
    { action: 'Received', amount: '0.5 ETH', time: '2m ago', network: 'ETH' },
    { action: 'Sent', amount: '100 USDC', time: '15m ago', network: 'SOL' },
    { action: 'Swapped', amount: '0.01 BTC', time: '1h ago', network: 'BTC' },
  ];

  return (
    <div className="p-3 space-y-4">
      {/* Balances */}
      <div>
        <div className="flex items-center gap-2 text-green-400 text-sm font-semibold mb-2">
          <Wallet className="w-4 h-4" />
          Portfolio Balance
        </div>
        <div className="space-y-2">
          {walletData.map((wallet) => (
            <div key={wallet.network} className="bg-gray-900/50 border border-green-500/20 rounded p-2">
              <div className="flex justify-between items-center">
                <span className="text-green-400 text-xs">{wallet.network}</span>
                <span className="text-green-300 text-xs font-mono">{wallet.usd}</span>
              </div>
              <div className="text-green-400/70 text-xs">{wallet.balance}</div>
            </div>
          ))}
        </div>
      </div>

      {/* NFTs */}
      <div>
        <div className="flex items-center gap-2 text-green-400 text-sm font-semibold mb-2">
          <Image className="w-4 h-4" />
          NFT Collection
        </div>
        <div className="space-y-2">
          {nftData.map((nft) => (
            <div key={nft.name} className="bg-gray-900/50 border border-green-500/20 rounded p-2">
              <div className="text-green-400 text-xs">{nft.name}</div>
              <div className="text-green-400/70 text-xs">Floor: {nft.floor}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div>
        <div className="flex items-center gap-2 text-green-400 text-sm font-semibold mb-2">
          <Activity className="w-4 h-4" />
          Recent Activity
        </div>
        <div className="space-y-2">
          {recentActivity.map((activity, index) => (
            <div key={index} className="bg-gray-900/50 border border-green-500/20 rounded p-2">
              <div className="flex justify-between items-center">
                <span className="text-green-400 text-xs">{activity.action} {activity.amount}</span>
                <span className="text-green-400/70 text-xs">{activity.time}</span>
              </div>
              <div className="text-green-400/70 text-xs">{activity.network}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardTab;
