import { motion } from 'framer-motion';

const PARTNERS = [
  "The Hutt Clan",
  "Crimson Dawn",
  "Mos Eisley",
  "Pyke Syndicate",
  "Bounty Hunters Guild",
];

export function TrustedBy() {
  return (
    <section id="partners" className="py-20 border-t border-white/5 relative overflow-hidden">
      <motion.div 
        className="max-w-7xl mx-auto px-6 text-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        
        {/* Header */}
        <h3 className="text-sith-red font-mono text-4xl tracking-[0.3em] uppercase mb-12 opacity-70">
          Operational Partners
        </h3>

        {/* Logos Container - Enforcing 3 Top, 2 Bottom */}
        <div className="flex flex-col items-center gap-12 md:gap-16">
          
          {/* Row 1 */}
          <div className="flex flex-wrap justify-center gap-12 md:gap-24">
            {PARTNERS.slice(0, 3).map((partner, index) => (
              <PartnerItem key={index} name={partner} />
            ))}
          </div>

          {/* Row 2 */}
          <div className="flex flex-wrap justify-center gap-12 md:gap-24">
            {PARTNERS.slice(3).map((partner, index) => (
              <PartnerItem key={index + 3} name={partner} />
            ))}
          </div>

        </div>

      </motion.div>
    </section>
  );
}

function PartnerItem({ name }: { name: string }) {
  return (
    <div className="group cursor-pointer transition-all duration-300">
      <span className="text-1xl md:text-2xl font-death-star text-gray-600 group-hover:text-sith-red group-hover:drop-shadow-[0_0_8px_rgba(255,51,51,0.8)] transition-colors duration-300 uppercase tracking-widest">
        {name}
      </span>
    </div>
  );
}
