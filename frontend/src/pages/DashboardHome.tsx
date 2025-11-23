import { useEffect, useState } from 'react';
import { StatCard } from '../components/dashboard/StatCard'; // The stat card component
import { RevenueChart } from '../components/dashboard/RevenueChart'; // The new chart
// Icons
import { CreditCard, Box, Target, Activity, Skull, Flame, ShieldAlert, Coins } from 'lucide-react';

export function DashboardHome() {
  const [isSyndicate, setIsSyndicate] = useState(false);

  // Check if we are Crimson Dawn
  useEffect(() => {
    const user = localStorage.getItem('username');
    if (user === 'crimson_dawn') setIsSyndicate(true);
  }, []);

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      
      {/* 1. Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-white/10 pb-6 gap-4">
        <div>
          <h1 className={`text-3xl font-death-star tracking-widest ${isSyndicate ? 'text-crimson-light' : 'text-white'}`}>
            {isSyndicate ? 'SYNDICATE COMMAND' : 'COCKPIT OVERVIEW'}
          </h1>
          <div className="flex items-center gap-2 mt-2">
            <span className={`w-2 h-2 rounded-full animate-pulse ${isSyndicate ? 'bg-crimson-light' : 'bg-emerald-500'}`}></span>
            <p className={`font-mono text-xs tracking-[0.2em] ${isSyndicate ? 'text-crimson-light' : 'text-hologram-blue'}`}>
              {isSyndicate ? ':: ENCRYPTION: QUANTUM-LOCKED' : 'SYSTEM ONLINE // TATOOINE SERVER'}
            </p>
          </div>
        </div>
        
        {/* Date Display */}
        <div className={`text-left md:text-right p-3 rounded border ${isSyndicate ? 'bg-crimson-dark/30 border-crimson-light/20' : 'bg-white/5 border-white/10'}`}>
          <div className="text-gray-500 font-mono text-[10px] uppercase tracking-widest">Galactic Date</div>
          <div className={`font-mono font-bold ${isSyndicate ? 'text-syndicate-gold' : 'text-tatooine-sand'}`}>3 ABY</div>
        </div>
      </div>

      {/* 2. Stat Cards (Red vs Blue Logic) */}
      {isSyndicate ? (
        // 🔴 CRIMSON DAWN CARDS
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard title="Laundered Credits" value="8.2M CR" trend="+12%" trendUp={true} icon={Coins} />
          <StatCard title="Heat Index" value="CRITICAL" trend="+85%" trendUp={false} icon={Flame} />
          <StatCard title="Active Contracts" value="12 HITS" trend="+3" trendUp={true} icon={Skull} />
          <StatCard title="Route Integrity" value="64%" trend="BLOCKADED" trendUp={false} icon={ShieldAlert} />
        </div>
      ) : (
        // 🔵 STANDARD CARDS
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard title="Total Revenue" value="45,200 CR" trend="+12.5%" trendUp={true} icon={CreditCard} />
          <StatCard title="Active Cargo" value="1,240 TONS" trend="+4.2%" trendUp={true} icon={Box} />
          <StatCard title="Open Bounties" value="8 TARGETS" trend="-2" trendUp={false} icon={Target} />
          <StatCard title="Fleet Health" value="98.2%" trend="STABLE" trendUp={true} icon={Activity} />
        </div>
      )}

      {/* 3. The Analytics Chart */}
      <RevenueChart />

    </div>
  );
}