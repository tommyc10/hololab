import { useEffect, useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// Mock Data (In the future, we fetch this from Python)
const DATA_EMPIRE = [
  { name: 'Cycle 1', credits: 4000 },
  { name: 'Cycle 2', credits: 3000 },
  { name: 'Cycle 3', credits: 2000 },
  { name: 'Cycle 4', credits: 2780 },
  { name: 'Cycle 5', credits: 1890 },
  { name: 'Cycle 6', credits: 2390 },
  { name: 'Cycle 7', credits: 3490 },
];

const DATA_SYNDICATE = [
  { name: 'Cycle 1', credits: 12000 },
  { name: 'Cycle 2', credits: 18000 },
  { name: 'Cycle 3', credits: 15000 },
  { name: 'Cycle 4', credits: 25000 },
  { name: 'Cycle 5', credits: 42000 }, // The Spike
  { name: 'Cycle 6', credits: 38000 },
  { name: 'Cycle 7', credits: 55000 },
];

export function RevenueChart() {
  const [isSyndicate, setIsSyndicate] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem('username');
    if (user === 'crimson_dawn') setIsSyndicate(true);
  }, []);

  // CONFIGURATION
  const data = isSyndicate ? DATA_SYNDICATE : DATA_EMPIRE;
  const color = isSyndicate ? '#FF0033' : '#00F0FF'; // Crimson Light vs Hologram Blue
  const gradientId = isSyndicate ? 'colorSyndicate' : 'colorEmpire';

  return (
    <div className={`h-96 rounded-lg p-6 border transition-all duration-500 relative overflow-hidden group
      ${isSyndicate ? 'bg-crimson-dark/20 border-crimson-light/30' : 'bg-empire-black/40 border-white/10'}`}
    >
      
      {/* Header */}
      <div className="flex justify-between items-center mb-6 relative z-10">
        <div>
           <h3 className={`font-death-star tracking-widest text-lg ${isSyndicate ? 'text-crimson-light' : 'text-white'}`}>
             {isSyndicate ? 'LAUNDERING VELOCITY' : 'REVENUE ANALYTICS'}
           </h3>
           <p className="text-gray-500 font-mono text-xs tracking-widest mt-1">
             {isSyndicate ? ':: SHADOW NETWORK TRAFFIC' : ':: NET CREDIT FLOW'}
           </p>
        </div>
      </div>

      {/* The Chart */}
      <div className="w-full h-[80%] relative z-10">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={color} stopOpacity={0.3}/>
                <stop offset="95%" stopColor={color} stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke={isSyndicate ? 'rgba(255, 0, 51, 0.1)' : 'rgba(255, 255, 255, 0.05)'} />
            <XAxis 
              dataKey="name" 
              stroke="#666" 
              fontSize={10} 
              tickLine={false}
              axisLine={false}
              fontFamily="monospace"
            />
            <YAxis 
              stroke="#666" 
              fontSize={10} 
              tickLine={false}
              axisLine={false}
              fontFamily="monospace"
              tickFormatter={(value) => `${value / 1000}k`} 
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#050505', 
                borderColor: isSyndicate ? '#FF0033' : '#00F0FF',
                color: '#fff',
                fontFamily: 'monospace'
              }}
              itemStyle={{ color: color }}
            />
            <Area 
              type="monotone" 
              dataKey="credits" 
              stroke={color} 
              strokeWidth={2}
              fillOpacity={1} 
              fill={`url(#${gradientId})`} 
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Background Grid Texture */}
      <div className={`absolute inset-0 opacity-10 pointer-events-none 
        ${isSyndicate ? 'bg-[radial-gradient(circle_at_center,#FF0033_1px,transparent_1px)]' : 'bg-[radial-gradient(circle_at_center,#00F0FF_1px,transparent_1px)]'} 
        bg-size-[20px_20px]`} 
      ></div>

    </div>
  );
}