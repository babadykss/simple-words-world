
import React, { useState } from 'react';
import { Image, Activity, Search, TrendingUp, TrendingDown, BarChart3 } from 'lucide-react';

const DashboardTab = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showRestriction, setShowRestriction] = useState(false);

  const cryptoData = [
    { symbol: 'BTC', name: 'Bitcoin', price: '$43,250.00', change: '+2.45%', isUp: true },
    { symbol: 'ETH', name: 'Ethereum', price: '$2,680.50', change: '+1.82%', isUp: true },
    { symbol: 'SOL', name: 'Solana', price: '$98.75', change: '-0.65%', isUp: false },
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const query = searchQuery.toLowerCase();
    
    // Check if it's a wallet address (starts with 0x and has 42 characters)
    if (query.startsWith('0x') && query.length === 42) {
      setShowRestriction(true);
      setTimeout(() => setShowRestriction(false), 3000);
      return;
    }
    
    if (query.includes('sol') || query.includes('eth') || query.includes('btc') || query.includes('эфир')) {
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
            placeholder="Search tokens or paste wallet address..."
            className="flex-1 bg-transparent text-green-400 text-xs outline-none placeholder-green-400/50"
          />
        </form>
        {showRestriction && (
          <div className="mt-2 p-3 bg-red-500/10 border border-red-500/30 rounded">
            <div className="text-red-400 text-sm font-semibold mb-1">⚠️ Only for Dark Users</div>
            <div className="text-red-300 text-xs mb-2">This feature requires Dark access level</div>
            <div className="text-green-400 text-xs font-mono bg-black/30 p-1 rounded">
              Premium Feature Locked
            </div>
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

      {/* NFT Collection */}
      <div>
        <div className="flex items-center gap-2 text-green-400 text-sm font-semibold mb-2">
          <Image className="w-4 h-4" />
          NFT Collection
        </div>
        <div className="bg-gray-900/50 border border-green-500/20 rounded p-3">
          <div className="text-green-400/50 text-xs text-center">No NFTs found</div>
        </div>
      </div>

      {/* Recent Transactions */}
      <div>
        <div className="flex items-center gap-2 text-green-400 text-sm font-semibold mb-2">
          <Activity className="w-4 h-4" />
          Recent Transactions
        </div>
        <div className="bg-gray-900/50 border border-green-500/20 rounded p-3">
          <div className="text-green-400/50 text-xs text-center">No recent transactions</div>
        </div>
      </div>

      {/* On-Chain Metrics */}
      <div>
        <div className="flex items-center gap-2 text-green-400 text-sm font-semibold mb-2">
          <BarChart3 className="w-4 h-4" />
          On-Chain Metrics
        </div>
        <div className="bg-gray-900/50 border border-green-500/20 rounded p-3">
          <div className="text-green-400/50 text-xs text-center">No metrics available</div>
        </div>
      </div>
    </div>
  );
};

export default DashboardTab;
