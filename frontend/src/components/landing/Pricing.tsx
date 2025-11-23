import { motion } from 'framer-motion';
import { Ship, Skull, ShieldAlert, } from 'lucide-react'; // <--- NEW ICONS

const TIERS = [
  {
    name: "The Freelancer",
    price: "2,500",
    description: "For independent captains jumping hyperlanes.",
    features: [
      "Standard Cargo Manifest", 
      "Public Bounty Board", 
      "Hyperlane Navigation", 
      "Single Ship License"
    ],
    theme: "neutral",
    icon: Ship, // <--- Icon
    buttonText: "INITIALIZE",
    highlight: false
  },
  {
    name: "The Syndicate",
    price: "8,000",
    description: "For organizations operating in the shadows.",
    features: [
      "Contraband Tracking (Class A)", 
      "Assassination Contracts", 
      "Credit Laundering Ledger", 
      "Sleeper Spy Network", 
      "Protocol: Uprising Access"
    ],
    theme: "syndicate",
    icon: Skull, // <--- Icon
    buttonText: "JOIN THE DAWN",
    highlight: true
  },
  {
    name: "High Command",
    price: "25,000",
    description: "For sector governors demanding total control.",
    features: [
      "Sector Heat Maps (Real-time)", 
      "Treasury Oversight", 
      "Fleet Admiral Clearance", 
      "Audit Immunity", 
      "Orbital Bombardment Auth"
    ],
    theme: "empire",
    icon: ShieldAlert, // <--- Icon
    buttonText: "COMMAND SECTOR",
    highlight: false
  }
];

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 }
  }
};

export function Pricing() {
  
  const getThemeStyles = (theme: string) => {
    switch (theme) {
      case 'syndicate':
        return {
          card: 'bg-red-950/10 border-red-900 shadow-[0_0_30px_rgba(220,38,38,0.15)] hover:shadow-red-900/40',
          text: 'text-red-500',
          priceColor: 'text-red-500', // Red Price
          badge: 'bg-red-600 text-black shadow-red-900/50',
          button: 'bg-red-600 text-black border-red-600 hover:bg-red-500 hover:border-red-500',
          iconColor: 'text-red-500'
        };
      case 'empire':
        return {
          card: 'bg-slate-900/50 border-cyan-900 shadow-[0_0_30px_rgba(6,182,212,0.15)] hover:shadow-cyan-900/40',
          text: 'text-cyan-400',
          priceColor: 'text-cyan-400', // Cyan Price
          badge: 'bg-cyan-500 text-black',
          button: 'bg-cyan-600 text-white border-cyan-600 hover:bg-cyan-500 hover:border-cyan-500',
          iconColor: 'text-cyan-400'
        };
      default: // neutral
        return {
          card: 'bg-empire-black/50 border-white/10 hover:border-white/30',
          text: 'text-gray-300',
          priceColor: 'text-white', // White Price
          badge: 'bg-gray-500',
          button: 'bg-transparent text-white border-gray-700 hover:border-white hover:bg-white/5',
          iconColor: 'text-gray-500'
        };
    }
  };

  return (
    <section id="pricing" className="py-24 relative bg-black">
      {/* Optional Background Grid Effect for entire section */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-size-[40px_40px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="mb-16 text-center">
          <h2 className="text-gray-500 font-mono text-sm tracking-[0.5em] uppercase mb-4">Access Levels</h2>
          <h3 className="text-4xl text-white font-black uppercase tracking-wide">Choose Your Allegiance</h3>
        </div>

        {/* Pricing Grid */}
        <motion.div 
          className="grid md:grid-cols-3 gap-8 items-start"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          {TIERS.map((tier, index) => {
            const styles = getThemeStyles(tier.theme);
            
            return (
              <motion.div 
                key={index}
                variants={fadeInUp}
                className={`
                  relative p-8 rounded-xl border backdrop-blur-md transition-all duration-300 group flex flex-col h-full
                  ${styles.card}
                  ${tier.highlight ? 'scale-105 z-10 ring-1 ring-offset-0' : 'hover:-translate-y-2'}
                `}
                // Add subtle grid background to individual cards
                style={{
                  backgroundImage: tier.theme === 'neutral' ? 'none' : 
                    `linear-gradient(${tier.theme === 'syndicate' ? 'rgba(239,68,68,0.05)' : 'rgba(6,182,212,0.05)'} 1px, transparent 1px), 
                     linear-gradient(90deg, ${tier.theme === 'syndicate' ? 'rgba(239,68,68,0.05)' : 'rgba(6,182,212,0.05)'} 1px, transparent 1px)`,
                  backgroundSize: '20px 20px'
                }}
              >
                {/* Badge */}
                {tier.highlight && (
                  <div className={`absolute -top-4 left-1/2 -translate-x-1/2 text-[10px] font-bold font-mono py-1 px-4 rounded-full uppercase tracking-widest shadow-lg ${styles.badge}`}>
                    Recommended Clearance
                  </div>
                )}

                {/* Header */}
                <div className="text-center mb-8 pt-2">
                  <h4 className={`text-xl font-black uppercase tracking-widest mb-4 ${styles.text}`}>
                    {tier.name}
                  </h4>
                  <div className={`text-4xl font-mono font-bold mb-2 ${styles.priceColor}`}>
                    {tier.price}
                    <span className="text-sm text-gray-500 font-normal ml-1"> CR/mo</span>
                  </div>
                  <p className="text-xs text-gray-500 font-mono">{tier.description}</p>
                </div>

                {/* Features List */}
                <ul className="space-y-4 mb-8 flex-1">
                  {tier.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm font-mono text-gray-300">
                      {/* Replaced Dot with Icon */}
                      <tier.icon size={16} className={`mt-0.5 shrink-0 ${styles.iconColor}`} />
                      {feature}
                    </li>
                  ))}
                </ul>

                {/* Action Button */}
                <button 
                  className={`
                    w-full py-4 font-bold uppercase tracking-[0.2em] text-xs transition-all duration-300 border rounded
                    ${styles.button}
                  `}
                >
                  {tier.buttonText}
                </button>

                {/* Corner Tech Accents */}
                <div className={`absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-white/10 group-hover:border-white/30 transition-colors`} />
                <div className={`absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-white/10 group-hover:border-white/30 transition-colors`} />

              </motion.div>
            );
          })}
        </motion.div>

      </div>
    </section>
  );
}