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
    image: "/hero.png",
    title: "Droid Fleet Diagnostics",
    desc: "Automated diagnostic cycles for all service and protocol droids."
  },
  {
    image: "/cargo.png",
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
      <section id="hero" className="relative pt-20 pb-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Left: Content */}
          <motion.div 
            className="space-y-8 relative z-10"
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            
            {/* Badge */}
            <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-3 py-1 rounded-sm border border-hologram-blue/30 bg-hologram-blue/5">
              <span className="w-2 h-2 rounded-full bg-yoda-green animate-pulse"></span>
              <span className="text-xs font-mono text-yoda-green tracking-widest uppercase"> SECURE CONNECTION ESTABLISHED
</span>
            </motion.div>

            {/* Headline */}
            <motion.h1 variants={fadeInUp} className="text-2xl font-black tracking-[0.25em] text-white uppercase group-hover:text-hologram-blue transition-colors duration-300 font-death-star">
              HoloLab <br />
              <span className="text-2xl font-black tracking-[0.25em] text-white uppercase group-hover:text-hologram-blue transition-colors duration-300 font-death-star">
                Control Suite
              </span>
            </motion.h1>

            {/* Subtext */}
            <motion.p variants={fadeInUp} className="text-lg text-gray-400 max-w-xl leading-relaxed font-mono">
              The galaxy's most advanced inventory protocol. Track shipments, manage smuggler debts, and monitor supply levels with Imperial precision.
            </motion.p>

            {/* CTAs */}
            <motion.div variants={fadeInUp} className="flex flex-wrap gap-4">
              <Link 
                to="/login"
                className="relative group px-8 py-4 bg-hologram-blue/10 border border-hologram-blue text-hologram-blue font-bold uppercase tracking-widest hover:bg-hologram-blue hover:text-empire-black transition-all duration-300 [clip-path:polygon(10%_0,100%_0,100%_80%,90%_100%,0_100%,0_20%)] shadow-[0_0_20px_rgba(0,240,255,0.3)] hover:shadow-[0_0_40px_rgba(0,240,255,0.6)]"
              >
                <span className="relative z-10">Launch Terminal</span>
                <div className="absolute inset-0 bg-hologram-blue/20 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </Link>
            </motion.div>
          </motion.div>

          {/* Right: Visual */}
          <motion.div 
            className="relative group"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {/* Glow Effect */}
            <div className="absolute -inset-4 bg-hologram-blue/20 blur-3xl rounded-full opacity-50 animate-pulse"></div>
            
            {/* Image Container */}
            <div className="relative border border-hologram-blue/30 bg-gray-900/50 p-2 rounded-lg backdrop-blur-sm scale-130">
              {/* Corner Accents (The Tech Look) */}
              <div className="absolute -top-1 -left-1 w-6 h-6 border-t-2 border-l-2 border-hologram-blue"></div>
              <div className="absolute -bottom-1 -right-1 w-6 h-6 border-b-2 border-r-2 border-hologram-blue"></div>
              
              <img 
                src="/hero.png" 
                alt="Hololab Interface" 
                className="w-full h-auto rounded border border-white/5 shadow-2xl"
              />
              
              {/* Scanline Overlay */}
              <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,240,255,0.05)_50%)] bg-size-[100%_4px] pointer-events-none"></div>
            </div>
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