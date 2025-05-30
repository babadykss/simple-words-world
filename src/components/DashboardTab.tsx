
import React, { useState } from 'react';
import { Wallet, Image, Activity, Search, TrendingUp, TrendingDown, Wifi } from 'lucide-react';

const DashboardTab = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showRestriction, setShowRestriction] = useState(false);

  const cryptoData = [
    { symbol: 'BTC', name: 'Bitcoin', price: '$43,250.00', change: '+2.45%', isUp: true },
    { symbol: 'ETH', name: 'Ethereum', price: '$2,680.50', change: '+1.82%', isUp: true },
    { symbol: 'SOL', name: 'Solana', price: '$98.75', change: '-0.65%', isUp: false },
  ];

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

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const query = searchQuery.toLowerCase();
    if (query.includes('sol') || query.includes('eth') || query.includes('btc')) {
      setShowRestriction(true);
      setTimeout(() => setShowRestriction(false), 3000);
    }
  };

  return (
    <div className="p-3 space-y-4">
      {/* Search Bar */}
      <div className="bg-gray-900/50 border border-green-500/20 rounded p-3">
        <form onSubmit={handleSearch} className="flex items-center gap-2">
          <Search className="w-4 h-4 text-green-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search tokens (BTC, ETH, SOL...)"
            className="flex-1 bg-transparent text-green-400 text-xs outline-none placeholder-green-400/50"
          />
        </form>
        {showRestriction && (
          <div className="mt-2 p-2 bg-red-500/10 border border-red-500/30 rounded">
            <div className="text-red-400 text-xs">Only for Dark Titan Users</div>
          </div>
        )}
      </div>

      {/* Crypto Prices */}
      <div>
        <div className="text-green-400 text-sm font-semibold mb-2">Live Crypto Prices</div>
        <div className="space-y-2">
          {cryptoData.map((crypto) => (
            <div key={crypto.symbol} className="bg-gray-900/50 border border-green-500/20 rounded p-2">
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-2">
                  <span className="text-green-400 font-semibold text-xs">{crypto.symbol}</span>
                  <span className="text-green-400/70 text-xs">{crypto.name}</span>
                </div>
                <div className="flex items-center gap-1">
                  {crypto.isUp ? (
                    <TrendingUp className="w-3 h-3 text-green-400" />
                  ) : (
                    <TrendingDown className="w-3 h-3 text-red-400" />
                  )}
                  <span className={`text-xs ${crypto.isUp ? 'text-green-400' : 'text-red-400'}`}>
                    {crypto.change}
                  </span>
                </div>
              </div>
              <div className="text-green-300 font-mono text-xs">{crypto.price}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Real-time Data Feed */}
      <div>
        <div className="flex items-center gap-2 text-green-400 text-sm font-semibold mb-2">
          <Wifi className="w-4 h-4" />
          Real-time data feed active
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
