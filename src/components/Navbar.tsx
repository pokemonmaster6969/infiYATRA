import React, { useState, useEffect } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { Anchor, BriefcaseBusiness, Compass, Heart, Menu, SlidersHorizontal, User, X } from 'lucide-react'
import { haptics } from '../lib/haptics'
import Logo from './Logo'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    setIsOpen(false)
  }, [location.pathname])

  useEffect(() => {
    if (!isOpen) return
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsOpen(false)
    }
    window.addEventListener('keydown', closeOnEscape)
    return () => window.removeEventListener('keydown', closeOnEscape)
  }, [isOpen])

  if (location.pathname.startsWith('/admin')) return null

  const navLinks = [
    { name: 'Explore', path: '/discover', icon: Compass },
    { name: 'Cruises', path: '/cruise', icon: Anchor },
    { name: 'Custom trips', path: '/customize', icon: SlidersHorizontal },
    { name: 'Corporate', path: '/corporate', icon: BriefcaseBusiness },
  ]

  return (
    <>
      <nav className="fixed inset-x-0 top-0 z-50 px-3 pt-3 md:px-6 md:pt-4" aria-label="Main navigation">
        <div className="mx-auto flex h-[60px] max-w-[1320px] items-center justify-between rounded-xl liquid-glass px-3 shadow-[0_12px_40px_rgba(5,23,21,0.25)] sm:px-5 md:h-[68px] md:px-6">
          <Link to="/" onClick={() => haptics.light()} className="group flex h-full items-center" aria-label="INFIYATRA home">
            <Logo size="sm" />
          </Link>

          <div className="hidden items-center gap-1 lg:flex">
            {navLinks.map(link => (
              <NavLink
                key={link.path}
                to={link.path}
                onClick={() => haptics.light()}
                className={({ isActive }) => `flex min-h-10 items-center gap-2 rounded-lg px-3.5 text-[11px] font-semibold transition-colors ${isActive ? 'bg-white/15 text-white' : 'text-white/70 hover:bg-white/10 hover:text-white'}`}
              >
                <link.icon size={14} /> {link.name}
              </NavLink>
            ))}
          </div>

          <div className="hidden items-center gap-2 lg:flex">
            <Link to="/about" className="px-3 text-xs font-medium text-white/60 transition-colors hover:text-white">Our story</Link>
            <Link to="/dashboard" aria-label="Your account" title="Your account" onClick={() => haptics.light()} className="flex h-10 w-10 items-center justify-center rounded-lg text-white/80 transition-colors hover:bg-white/10 hover:text-white"><User size={18} /></Link>
            <Link to="/wishlist" aria-label="Wishlist" title="Wishlist" onClick={() => haptics.light()} className="flex h-10 w-10 items-center justify-center rounded-lg text-white/80 transition-colors hover:bg-white/10 hover:text-white"><Heart size={18} /></Link>
            <Link to="/discover" onClick={() => haptics.medium()} className="ml-1 inline-flex min-h-10 items-center gap-2 rounded-lg bg-secondary px-4 text-[11px] font-bold text-white transition-colors hover:bg-secondary-light">Find a trip <Compass size={14} /></Link>
          </div>

          <div className="flex items-center gap-1 lg:hidden">
            <Link to="/wishlist" aria-label="Wishlist" className="flex h-10 w-10 items-center justify-center rounded-lg text-white/80 hover:bg-white/10"><Heart size={18} /></Link>
            <button
              type="button"
              onClick={() => { haptics.light(); setIsOpen(open => !open) }}
              className="flex h-10 w-10 items-center justify-center rounded-lg text-white transition-colors hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white"
              aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={isOpen}
              aria-controls="mobile-navigation"
            >
              {isOpen ? <X size={21} /> : <Menu size={21} />}
            </button>
          </div>
        </div>
      </nav>

      {isOpen && (
        <div className="fixed inset-0 z-[60] lg:hidden">
          <button
            type="button"
            aria-label="Close navigation menu"
            onClick={() => setIsOpen(false)}
            className="absolute inset-0 h-full w-full animate-[fadeIn_160ms_ease-out] bg-[#071311]/65 backdrop-blur-sm"
          />
          <div
            id="mobile-navigation"
            role="dialog"
            aria-modal="true"
            aria-label="Site navigation"
            className="absolute inset-x-3 top-[82px] max-h-[calc(100dvh-98px)] animate-[slideUp_180ms_ease-out] overflow-y-auto rounded-xl liquid-glass-dark p-5 shadow-2xl sm:inset-x-6 sm:p-6"
            style={{ paddingBottom: 'max(1.25rem, env(safe-area-inset-bottom))' }}
          >
              <div className="mb-4 flex items-center justify-between border-b border-white/10 pb-4">
                <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-white/45">Plan your next escape</p>
                <Link to="/dashboard" onClick={() => setIsOpen(false)} className="flex min-h-10 items-center gap-2 rounded-lg px-3 text-xs font-semibold text-white/80 hover:bg-white/10"><User size={16} /> Account</Link>
              </div>
              <div className="grid gap-1">
                {navLinks.map(link => (
                  <NavLink
                    key={link.path}
                    to={link.path}
                    onClick={() => { haptics.light(); setIsOpen(false) }}
                    className={({ isActive }) => `flex min-h-12 items-center gap-3 rounded-lg px-3 text-sm font-semibold ${isActive ? 'bg-white/12 text-white' : 'text-white/70 hover:bg-white/8 hover:text-white'}`}
                  >
                    <link.icon size={17} className="text-[#8fd0c4]" /> {link.name}
                  </NavLink>
                ))}
                <NavLink to="/about" onClick={() => setIsOpen(false)} className="flex min-h-12 items-center gap-3 rounded-lg px-3 text-sm font-semibold text-white/70 hover:bg-white/8 hover:text-white"><Compass size={17} className="text-[#8fd0c4]" /> Our story</NavLink>
              </div>
              <Link to="/discover" onClick={() => setIsOpen(false)} className="mt-4 flex min-h-12 items-center justify-center gap-2 rounded-lg bg-secondary px-4 text-sm font-bold text-white">Browse journeys <Compass size={16} /></Link>
          </div>
        </div>
      )}
    </>
  )
}

export default Navbar
