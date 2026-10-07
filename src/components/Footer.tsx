import React from 'react'
import { Link } from 'react-router-dom'
import { haptics } from '../lib/haptics'

const Footer = () => {
  return (
    <footer className="bg-charcoal text-white pt-20 pb-8 relative overflow-hidden border-t border-white/10">
      <div className="absolute inset-0 liquid-glass-grain pointer-events-none"></div>
      <div className="max-w-[1920px] mx-auto px-6 md:px-12 lg:px-20 grid grid-cols-1 md:grid-cols-4 gap-12 relative z-10">
        <div className="space-y-6">
          <h3 className="text-3xl font-display font-black text-white tracking-tighter liquid-text">
            INFI<span className="text-secondary text-2xl uppercase ml-1">Yatra</span>
          </h3>
          <p className="text-white/40 leading-relaxed text-xs italic font-medium">
            Ahmedabad's premier community travel platform. Connecting curious travelers with authentic local, cruise, and international experiences.
          </p>
        </div>

        <div>
          <h4 className="text-[10px] font-black uppercase tracking-[0.3em] mb-6 text-secondary drop-shadow-md">Quick Navigation</h4>
          <ul className="space-y-3 text-white/50 text-xs font-bold uppercase tracking-widest">
            <li><Link to="/discover" onClick={() => haptics.light()} className="hover:text-white transition-colors flex items-center gap-2 group"><span className="w-0 h-px bg-secondary group-hover:w-3 transition-all duration-300"></span>Explore All Packages</Link></li>
            <li><Link to="/cruise" onClick={() => haptics.light()} className="hover:text-white transition-colors flex items-center gap-2 group"><span className="w-0 h-px bg-secondary group-hover:w-3 transition-all duration-300"></span>Cruise Voyages</Link></li>
            <li><Link to="/customize" onClick={() => haptics.light()} className="hover:text-white transition-colors flex items-center gap-2 group"><span className="w-0 h-px bg-secondary group-hover:w-3 transition-all duration-300"></span>Customize Trip</Link></li>
            <li><Link to="/corporate" onClick={() => haptics.light()} className="hover:text-white transition-colors flex items-center gap-2 group"><span className="w-0 h-px bg-secondary group-hover:w-3 transition-all duration-300"></span>Corporate Tours</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-[10px] font-black uppercase tracking-[0.3em] mb-6 text-secondary drop-shadow-md">Community & Support</h4>
          <ul className="space-y-3 text-white/50 text-xs font-bold uppercase tracking-widest">
            <li><Link to="/about" onClick={() => haptics.light()} className="hover:text-white transition-colors flex items-center gap-2 group"><span className="w-0 h-px bg-secondary group-hover:w-3 transition-all duration-300"></span>About Infi Yatra</Link></li>
            <li><Link to="/community" onClick={() => haptics.light()} className="hover:text-white transition-colors flex items-center gap-2 group"><span className="w-0 h-px bg-secondary group-hover:w-3 transition-all duration-300"></span>Traveler Elite Tribe</Link></li>
            <li><Link to="/admin/login" onClick={() => haptics.light()} className="hover:text-white transition-colors flex items-center gap-2 group"><span className="w-0 h-px bg-secondary group-hover:w-3 transition-all duration-300"></span>Admin Dashboard</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-[10px] font-black uppercase tracking-[0.3em] mb-6 text-secondary drop-shadow-md">Join the Community</h4>
          <p className="text-white/40 text-xs mb-4 italic font-medium">Subscribe for secret package deals and trip alerts.</p>
          <div className="flex liquid-glass-dark rounded-full p-1 border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.5)]">
            <input type="email" placeholder="YOUR EMAIL" className="bg-transparent border-none focus:ring-0 text-[10px] font-black uppercase tracking-widest px-4 flex-grow text-white placeholder-white/20" />
            <button className="bg-secondary px-5 py-2.5 rounded-full text-[9px] font-black uppercase tracking-[0.2em] hover:bg-white hover:text-charcoal transition-all shadow-xl shadow-secondary/30">Join</button>
          </div>
        </div>
      </div>

      <div className="max-w-[1920px] mx-auto px-6 md:px-12 lg:px-20 mt-16 pt-6 border-t border-white/5 text-center relative z-10">
        <p className="text-white/30 text-[9px] font-black uppercase tracking-[0.3em]">© 2026 INFIYATRA Travels. All rights reserved. <span className="text-secondary/50">Designed for Ahmedabad, Built for the World.</span></p>
      </div>
    </footer>
  )
}

export default Footer
