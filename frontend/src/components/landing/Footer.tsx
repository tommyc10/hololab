import React from 'react';
import { Link } from 'react-router-dom';

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-empire-black pt-16 pb-8 relative z-10">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Col 1: Brand & Status */}
          <div className="space-y-6">
            <Link to="/" className="block">
              <span className="text-2xl font-death-star text-white uppercase tracking-widest hover:text-hologram-blue transition-colors">
                Hololab
              </span>
            </Link>
            
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-yoda-green/30 bg-yoda-green/5">
              <span className="w-2 h-2 rounded-full bg-yoda-green animate-pulse shadow-[0_0_8px_#33FF57]"></span>
              <span className="text-[10px] font-mono text-yoda-green tracking-widest uppercase">
                System Status: Operational
              </span>
            </div>
          </div>

          {/* Col 2: Modules */}
          <div>
            <h4 className="text-gray-600 font-mono text-xs uppercase tracking-[0.2em] mb-6">Modules</h4>
            <ul className="space-y-3">
              <FooterLink to="/inventory">Inventory</FooterLink>
              <FooterLink to="/#features">Bounties</FooterLink>
              <FooterLink to="/#features">Hyperlanes</FooterLink>
              <FooterLink to="/#features">Droids</FooterLink>
            </ul>
          </div>

          {/* Col 3: Company */}
          <div>
            <h4 className="text-gray-600 font-mono text-xs uppercase tracking-[0.2em] mb-6">The Guild</h4>
            <ul className="space-y-3">
              <FooterLink to="#">About The Guild</FooterLink>
              <FooterLink to="#">Careers (Empire)</FooterLink>
              <FooterLink to="#">Contact Support</FooterLink>
            </ul>
          </div>

          {/* Col 4: Legal */}
          <div>
            <h4 className="text-gray-600 font-mono text-xs uppercase tracking-[0.2em] mb-6">Legal Protocols</h4>
            <ul className="space-y-3">
              <FooterLink to="#">Terms of Service</FooterLink>
              <FooterLink to="#">Imperial Compliance</FooterLink>
              <FooterLink to="#">Report Rebel Activity</FooterLink>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-600 font-mono text-[10px] uppercase tracking-widest text-center md:text-left">
            © 2025 Hololab Systems. Authorized by the Galactic Empire.
          </p>
          
          {/* Decorative ID */}
          <span className="text-gray-800 font-mono text-[10px]">
            ID: TK-421-AA
          </span>
        </div>

      </div>
    </footer>
  );
}

function FooterLink({ to, children }: { to: string; children: React.ReactNode }) {
  return (
    <li>
      <Link 
        to={to} 
        className="text-sm font-mono text-gray-500 hover:text-hologram-blue transition-colors duration-300 flex items-center gap-2 group"
      >
        <span className="w-0 h-px bg-hologram-blue transition-all duration-300 group-hover:w-2"></span>
        {children}
      </Link>
    </li>
  );
}
