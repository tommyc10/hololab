
const TIERS = [
  {
    name: "The Drifter",
    price: "2500 Credits",
    features: ["Cargo Tracking", "Basic Logs", "Standard Comms", "1 User Access"],
    highlight: false
  },
  {
    name: "The Syndicate",
    price: "5000 Credits",
    features: ["Hyperlane Routes", "Bounty Alerts", "Encrypted Comms", "5 User Access", "Priority Support"],
    highlight: true
  },
  {
    name: "The Admiral",
    price: "10000 Credits",
    features: ["Fleet Management", "Audit Immunity", "24/7 Droid Support", "Unlimited Access", "Imperial Clearance"],
    highlight: false
  }
];

export function Pricing() {
  return (
    <section id="pricing" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="mb-16 text-center">
          <h2 className="text-hologram-blue font-mono text-sm tracking-[0.5em] uppercase mb-4">Access Levels</h2>
          <h3 className="text-4xl text-white font-death-star font-bold uppercase tracking-wide">Choose Your Allegiance</h3>
        </div>

        {/* Pricing Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {TIERS.map((tier, index) => (
            <div 
              key={index}
              className={`
                relative p-8 rounded-lg border backdrop-blur-sm transition-all duration-300 group flex flex-col h-full
                ${tier.highlight 
                  ? 'bg-hologram-blue/5 border-hologram-blue shadow-[0_0_30px_rgba(0,240,255,0.1)] scale-105 z-10' 
                  : 'bg-empire-black/50 border-white/10 hover:border-hologram-blue/30 hover:bg-empire-black/80'
                }
              `}
            >
              {/* Most Popular Badge */}
              {tier.highlight && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-hologram-blue text-empire-black text-xs font-bold font-mono py-1 px-4 rounded-full uppercase tracking-widest shadow-[0_0_10px_#00F0FF]">
                  Most Popular
                </div>
              )}

              {/* Header */}
              <div className="text-center mb-8">
                <h4 className={`text-xl font-death-star uppercase tracking-wider mb-2 ${tier.highlight ? 'text-hologram-blue' : 'text-white'}`}>
                  {tier.name}
                </h4>
                <div className="text-3xl font-mono font-bold text-white">
                  {tier.price}
                  {tier.price !== "Free" && <span className="text-sm text-gray-500 font-normal ml-1">/mo</span>}
                </div>
              </div>

              {/* Features List */}
              <ul className="space-y-4 mb-8">
                {tier.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm font-mono text-gray-400">
                    <span className={`w-1.5 h-1.5 rounded-full ${tier.highlight ? 'bg-hologram-blue shadow-[0_0_5px_#00F0FF]' : 'bg-gray-600'}`} />
                    {feature}
                  </li>
                ))}
              </ul>

              {/* Action Button */}
              <button 
                className={`
                  w-full py-3 font-bold uppercase tracking-[0.2em] text-xs transition-all duration-300 border mt-auto
                  ${tier.highlight
                    ? 'bg-hologram-blue text-empire-black border-hologram-blue hover:bg-white hover:border-white'
                    : 'bg-transparent text-white border-gray-700 hover:border-hologram-blue hover:text-hologram-blue'
                  }
                `}
              >
                Initialize
              </button>

              {/* Corner Accents for Tech Feel */}
              <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-white/20 group-hover:border-hologram-blue/50 transition-colors" />
              <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-white/20 group-hover:border-hologram-blue/50 transition-colors" />

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
