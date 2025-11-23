import { useEffect, useState } from 'react';
import { type LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string;
  trend: string;
  trendUp: boolean;
  icon: LucideIcon;
}

export function StatCard({ title, value, trend, trendUp, icon: Icon }: StatCardProps) {
  const [isSyndicate, setIsSyndicate] = useState(false);

  // 1. Check Identity to determine Theme
  useEffect(() => {
    const user = localStorage.getItem('username');
    if (user === 'crimson_dawn') setIsSyndicate(true);
  }, []);

  // 2. Define Theme Classes based on Identity
  const theme = isSyndicate ? {
    // 🔴 CRIMSON DAWN THEME
    container: 'bg-crimson-dark/20 border-crimson-light/30 hover:border-syndicate-gold/50 shadow-[0_0_15px_rgba(255,0,51,0.1)]',
    glow: 'bg-crimson-light/10 group-hover:bg-crimson-light/20',
    title: 'text-crimson-light/70',
    value: 'text-white drop-shadow-[0_0_8px_rgba(255,0,51,0.8)]', // Glowing red text
    iconBox: 'bg-crimson-light/10 border-crimson-light/30 text-crimson-light group-hover:text-syndicate-gold group-hover:border-syndicate-gold',
    trendPositive: 'text-syndicate-gold', // Gold for profits
    trendNegative: 'text-red-500'
  } : {
    // 🔵 STANDARD EMPIRE THEME
    container: 'bg-empire-black/40 border-white/10 hover:border-hologram-blue/50',
    glow: 'bg-hologram-blue/5 group-hover:bg-hologram-blue/10',
    title: 'text-gray-500',
    value: 'text-white',
    iconBox: 'bg-white/5 border-white/10 text-hologram-blue group-hover:text-white group-hover:border-hologram-blue',
    trendPositive: 'text-emerald-400',
    trendNegative: 'text-red-500'
  };

  return (
    <div className={`${theme.container} backdrop-blur-md border p-6 rounded-lg relative overflow-hidden group transition-all duration-300`}>
      
      {/* Background Glow Effect (Top Right) */}
      <div className={`absolute -right-6 -top-6 w-24 h-24 rounded-full blur-2xl transition-all duration-500 ${theme.glow}`}></div>

      <div className="flex justify-between items-start mb-4 relative z-10">
        <div>
          <h3 className={`font-mono text-[10px] md:text-xs uppercase tracking-[0.2em] mb-1 ${theme.title}`}>
            {title}
          </h3>
          <div className={`text-xl md:text-2xl font-death-star tracking-wider ${theme.value}`}>
            {value}
          </div>
        </div>
        
        {/* Icon Container */}
        <div className={`p-2 rounded border transition-colors duration-300 ${theme.iconBox}`}>
          <Icon size={20} />
        </div>
      </div>

      {/* Trend Line */}
      <div className="flex items-center gap-2 font-mono text-xs relative z-10">
        <span className={trendUp ? theme.trendPositive : theme.trendNegative}>
          {trend}
        </span>
        <span className="text-gray-600 uppercase text-[10px] tracking-wider opacity-70">
          vs last cycle
        </span>
      </div>

    </div>
  );
}