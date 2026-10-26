import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { haptics } from '../lib/haptics'
import Logo from './Logo'
import { getWhatsAppLink } from '../lib/data'

const Footer = () => {
  const location = useLocation()
  if (location.pathname.startsWith('/admin')) {
    return null
  }
  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-[#0C1D1B] pb-6 pt-12 text-white sm:pt-16">
      <div className="pointer-events-none absolute inset-0 liquid-glass-grain" />
      <div className="relative z-10 mx-auto grid max-w-[1320px] grid-cols-2 gap-x-6 gap-y-10 px-5 sm:grid-cols-4 sm:gap-8 sm:px-8 lg:px-12">
        <div className="col-span-2 space-y-4 sm:col-span-1">
          <Link to="/" onClick={() => haptics.light()} className="inline-flex rounded-lg liquid-glass px-3 py-1">
            <Logo size="sm" />
          </Link>
          <p className="max-w-xs text-xs leading-relaxed text-white/55">
            Meaningful journeys, thoughtfully planned in Ahmedabad and made for wherever you want to go.
          </p>
        </div>

        <div>
          <h2 className="mb-4 text-[10px] font-bold uppercase tracking-[0.18em] text-[#9bd3c6]">Explore</h2>
          <ul className="space-y-3 text-xs font-medium text-white/60">
            <li><Link to="/discover" onClick={() => haptics.light()} className="transition-colors hover:text-white">All journeys</Link></li>
            <li><Link to="/cruise" onClick={() => haptics.light()} className="transition-colors hover:text-white">Cruise holidays</Link></li>
            <li><Link to="/customize" onClick={() => haptics.light()} className="transition-colors hover:text-white">Plan a custom trip</Link></li>
            <li><Link to="/corporate" onClick={() => haptics.light()} className="transition-colors hover:text-white">Corporate travel</Link></li>
          </ul>
        </div>

        <div>
          <h2 className="mb-4 text-[10px] font-bold uppercase tracking-[0.18em] text-[#9bd3c6]">INFIYATRA</h2>
          <ul className="space-y-3 text-xs font-medium text-white/60">
            <li><Link to="/about" onClick={() => haptics.light()} className="transition-colors hover:text-white">Our story</Link></li>
            <li><Link to="/community" onClick={() => haptics.light()} className="transition-colors hover:text-white">Travel community</Link></li>
            <li><Link to="/wishlist" onClick={() => haptics.light()} className="transition-colors hover:text-white">Wishlist</Link></li>
            <li><Link to="/dashboard" onClick={() => haptics.light()} className="transition-colors hover:text-white">My account</Link></li>
            <li><Link to="/credits" onClick={() => haptics.light()} className="transition-colors hover:text-white">Photo credits</Link></li>
          </ul>
        </div>

        <div className="col-span-2 sm:col-span-1">
          <h2 className="mb-4 text-[10px] font-bold uppercase tracking-[0.18em] text-[#9bd3c6]">Talk to a person</h2>
          <p className="mb-4 text-xs leading-relaxed text-white/55">Not sure where to begin? Our trip team is a message away.</p>
          <a href={getWhatsAppLink('Hi INFIYATRA, I would like help choosing a trip.')} target="_blank" rel="noopener noreferrer" onClick={() => haptics.medium()} className="inline-flex min-h-10 items-center gap-2 rounded-lg liquid-glass px-3 text-xs font-semibold text-white transition-colors hover:bg-white/20">
            WhatsApp our team <span aria-hidden="true">→</span>
          </a>
        </div>
      </div>

      <div className="relative z-10 mx-auto mt-10 flex max-w-[1320px] flex-col gap-2 border-t border-white/10 px-5 pt-5 text-[10px] font-medium text-white/35 sm:flex-row sm:items-center sm:justify-between sm:px-8 lg:px-12">
          <p className="text-white/75">© {new Date().getFullYear()} INFIYATRA Travels. All rights reserved.</p>
          <p className="text-white/75">Proudly rooted in Ahmedabad.</p>
      </div>
    </footer>
  )
}

export default Footer
