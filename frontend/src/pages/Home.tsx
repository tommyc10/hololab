import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { GridBackground } from '../components/layout/GridBackground';
import { TrustedBy } from '../components/landing/TrustedBy';
import { Pricing } from '../components/landing/Pricing';
import { Footer } from '../components/landing/Footer';

// Animation Variants
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

// 1. DATA: We define our content outside the component.
const FEATURES = [
  {
    image: "/cargo.png",
    title: "Cargo Logistics",
    desc: "Real-time monitoring of all incoming shipments from Corellia to Tatooine."
  },
  {
    image: "/image.png",
    title: "Credit Analytics",
    desc: "Advanced financial projections to keep your establishment profitable."
  },
  {
    image: "/povview.png",
    title: "Secure Logs",
    desc: "Encrypted database to protect sensitive client information from bounty hunters."
  },
  {
    image: "/droidfleet.png",
    title: "Droid Fleet Diagnostics",
    desc: "Automated diagnostic cycles for all service and protocol droids."
  },
  {
    image: "/hyperlaneroutes.png",
    title: "Hyperlane Routes",
    desc: "Optimized navigation paths avoiding Imperial blockades and asteroid fields."
  },
  {
    image: "/bounty.png",
    title: "Bounty Board",
    desc: "Live feed of local bounties and reputation tracking for patrons."
  }
];

export function Home() {
  return (
    <GridBackground>
      
      {/* --- HERO SECTION --- */}
      <section id="hero" className="relative h-screen w-full flex items-center overflow-hidden">
        
        {/* Background Image */}
        <div className="absolute inset-0">
          <img 
            src="/hero.png" 
            alt="Hololab Interface" 
            className="w-full h-full object-cover"
          />
          
          {/* Dark Overlay for Text Readability */}
          <div className="absolute inset-0 bg-empire-black/70"></div>
          
          {/* Left Shadow Gradient - Darkens text area */}
          <div className="absolute inset-y-0 left-0 w-2/3 bg-linear-to-r from-empire-black via-empire-black/90 to-transparent"></div>
          
          {/* Top Gradient Blend */}
          <div className="absolute top-0 left-0 right-0 h-32 bg-linear-to-b from-empire-black to-transparent"></div>
          
          {/* Bottom Gradient Blend */}
          <div className="absolute bottom-0 left-0 right-0 h-64 bg-linear-to-t from-empire-black via-empire-black/80 to-transparent"></div>
          
          {/* Hologram Scanlines */}
          <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,240,255,0.02)_50%)] bg-size-[100%_4px] pointer-events-none"></div>
        </div>

        {/* Content */}
        <div className="relative z-20 max-w-7xl mx-auto px-6 w-full">
          <motion.div 
            className="max-w-4xl space-y-10"
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            
            {/* System ID Eyebrow */}
            <motion.div 
              variants={fadeInUp}
              className="font-mono text-xs md:text-sm text-hologram-blue tracking-widest uppercase"
            >
              :: SYSTEM ID: T-882 // CORELLIA SECTOR
            </motion.div>

            {/* Headline */}
            <motion.div variants={fadeInUp} className="space-y-4">
              
              {/* Line 1: GALACTIC */}
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white uppercase leading-none tracking-[0.2em] font-death-star select-none drop-shadow-[0_0_15px_rgba(0,0,0,0.8)]">
                GALACTIC
              </h1>
              
              {/* Line 2: OPERATIONS */}
              <h2 className="text-5xl md:text-7xl lg:text-8xl font-black uppercase leading-none tracking-[0.2em] font-death-star text-transparent [-webkit-text-stroke:1px_#00F0FF] [text-stroke:1px_#00F0FF] select-none opacity-90">
                OPERATIONS
              </h2>
              
            </motion.div>

            {/* Description */}
            <motion.p 
              variants={fadeInUp}
              className="text-lg md:text-xl text-gray-400 max-w-2xl leading-relaxed font-mono border-l-2 border-hologram-blue pl-6"
            >
              The galaxy's premier inventory protocol. Track shipments, manage smuggler debts, and monitor supply levels with Imperial precision.
            </motion.p>

            {/* CTAs */}
            <motion.div 
              variants={fadeInUp}
              className="flex flex-wrap gap-4 pt-8"
            >
              <Link 
                to="/login"
                className="group px-8 py-4 bg-hologram-blue text-empire-black font-bold uppercase tracking-widest hover:bg-white transition-all duration-300"
              >
                <span className="flex items-center gap-2">
                  Launch Terminal
                  <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
              </Link>
              
              <button className="px-8 py-4 border-2 border-white/20 bg-black/40 backdrop-blur-md text-white font-mono text-sm uppercase tracking-widest hover:bg-white/10 hover:border-white/40 transition-all duration-300">
                View Documentation
              </button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* --- FEATURES GRID --- */}
      <section id="features" className="py-24 border-t border-white/5 relative">
        <div className="max-w-7xl mx-auto px-6">
          
          {/* Section Header */}
          <div className="mb-16 text-center">
             <h2 className="text-hologram-blue font-mono text-sm tracking-[0.5em] uppercase mb-4">Command Protocols</h2>
             <h3 className="text-4xl text-white font-death-star font-bold uppercase tracking-wide">Operational Directives</h3>
          </div>

          {/* The Loop: Modern Star Wars Cards */}
          <motion.div 
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            {FEATURES.map((feature, index) => (
              <motion.div 
                key={index} 
                variants={fadeInUp}
                className="group relative bg-empire-black border border-white/10 hover:border-hologram-blue/50 transition-all duration-300 overflow-hidden rounded-lg"
              >
                
                {/* Image Section with Overlay */}
                <div className="relative h-48 overflow-hidden border-b border-white/5">
                  <div className="absolute inset-0 bg-hologram-blue/10 group-hover:bg-transparent transition-colors duration-300 z-10"></div>
                  <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.5)_50%)] bg-size-[100%_4px] z-20 pointer-events-none opacity-50"></div>
                  <img 
                    src={feature.image} 
                    alt={feature.title}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 grayscale-30 group-hover:grayscale-0"
                  />
                  
                  {/* Corner Tech Accents */}
                  <div className="absolute top-2 right-2 w-2 h-2 bg-hologram-blue/50 z-30"></div>
                  <div className="absolute bottom-2 left-2 w-2 h-2 bg-hologram-blue/50 z-30"></div>
                </div>

                {/* Content Section */}
                <div className="p-6 relative">
                  {/* Decorative Line */}
                  <div className="absolute top-0 left-6 right-6 h-px bg-linear-to-r from-transparent via-hologram-blue/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                  <h3 className="text-xl text-white font-bold mb-3 uppercase tracking-wider font-death-star group-hover:text-hologram-blue transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed font-mono group-hover:text-gray-400">
                    {feature.desc}
                  </p>
                  
                  {/* Hover Action Indicator */}
                  <div className="mt-4 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-2 group-hover:translate-y-0">
                    <span className="h-px w-4 bg-hologram-blue"></span>
                    <span className="text-[10px] uppercase tracking-widest text-hologram-blue font-mono">Access Module</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

        </div>
      </section>

      {/* --- TRUSTED BY --- */}
      <TrustedBy />

      {/* --- PRICING --- */}
      <Pricing />

      {/* --- FOOTER --- */}
      <Footer />

    </GridBackground>
  );
}