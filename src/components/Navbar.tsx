import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { MapPin, Search, Menu, Phone, User, Heart, X, Plane, Anchor, Building2, SlidersHorizontal, Compass } from 'lucide-react'
import { getWhatsAppLink } from '../lib/data'
import { haptics } from '../lib/haptics'

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false)
  const [visible, setVisible] = useState(true)
  const [isOpen, setIsOpen] = useState(false)
  const [lastScrollY, setLastScrollY] = useState(0)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      setScrolled(currentScrollY > 60)
      setLastScrollY(currentScrollY)
    }
    
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [lastScrollY])

  // Close menu on route change
  useEffect(() => {
    setIsOpen(false)
  }, [location])

  const navLinks = [
    { name: 'Explore All', path: '/discover' },
    { name: 'Cruise Voyages', path: '/cruise' },
    { name: 'Customize Trip', path: '/customize' },
    { name: 'Corporate Tours', path: '/corporate' },
    { name: 'About Us', path: '/about' }
  ]

  return (
    <>
      <nav className={`fixed left-0 right-0 z-50 transition-all duration-700 transform flex justify-center w-full px-4 md:px-8 pt-4 md:pt-6 safe-area-padding ${
        visible ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
      }`}>
        <div className={`w-full max-w-[1920px] mx-auto rounded-full liquid-glass shadow-2xl transition-all duration-500 relative group/nav ${scrolled ? 'py-1.5 scale-[0.98]' : 'py-2.5 md:py-3'}`}>
          
          <div className="flex justify-between items-center h-10 relative z-10 px-4 md:px-8">
            <Link to="/" onClick={() => haptics.light()} className="flex items-center space-x-2 group">
              <span className="text-2xl font-display font-black tracking-tighter text-white liquid-text">
                INFI<span className="text-secondary tracking-tighter uppercase text-base ml-0.5">Yatra</span>
              </span>
            </Link>

            {/* Desktop Nav Links */}
            <div className="hidden lg:flex items-center space-x-8">
              <div className="flex items-center space-x-8">
                {navLinks.map((link) => (
                  <Link 
                    key={link.name}
                    to={link.path} 
                    onClick={() => haptics.light()}
                    className={`transition-all duration-500 font-bold text-[9px] uppercase tracking-[0.2em] relative group drop-shadow-md ${
                      location.pathname === link.path ? 'text-secondary' : 'text-white hover:text-secondary'
                    }`}
                  >
                    {link.name}
                    <span className={`absolute -bottom-1.5 left-0 h-0.5 bg-secondary transition-all duration-500 ${location.pathname === link.path ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
                  </Link>
                ))}
              </div>
              
              <div className="h-4 w-px bg-white/20"></div>
              
              <div className="flex items-center space-x-5">
                <Link to="/dashboard" title="User Dashboard" onClick={() => haptics.light()} className="transition-colors duration-500 text-white hover:text-secondary">
                  <User size={18} />
                </Link>
                <Link to="/wishlist" title="Wishlist" onClick={() => haptics.light()} className="transition-colors duration-500 text-white hover:text-secondary">
                  <Heart size={18} />
                </Link>
                <Link 
                  to="/customize"
                  onClick={() => haptics.medium()}
                  className="bg-secondary text-white px-5 py-2 rounded-full font-black text-[8px] uppercase tracking-widest hover:bg-white hover:text-charcoal transition-all duration-500 shadow-xl shadow-secondary/20 transform hover:scale-105 active:scale-95 border border-transparent hover:border-white/20"
                >
                  Book / Customize
                </Link>
              </div>
            </div>

            {/* Mobile Menu Toggle */}
            <div className="lg:hidden flex items-center gap-3">
              <Link to="/customize" onClick={() => haptics.light()} className="text-[9px] font-black uppercase tracking-wider bg-secondary text-white px-3.5 py-1.5 rounded-full">
                Customize
              </Link>
              <button 
                onClick={() => {
                  haptics.light();
                  setIsOpen(true);
                }}
                className="p-2 transition-colors duration-500 text-white"
              >
                <Menu size={24} />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Modern Mobile Hub Overlay */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[60] lg:hidden">
            <motion.div 
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               exit={{ opacity: 0 }}
               onClick={() => setIsOpen(false)}
               className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            />
            <motion.div 
               initial={{ opacity: 0, scale: 0.9, x: '-50%', y: '-45%' }}
               animate={{ opacity: 1, scale: 1, x: '-50%', y: '-50%' }}
               exit={{ opacity: 0, scale: 0.9, x: '-50%', y: '-45%' }}
               transition={{ type: 'spring', damping: 25, stiffness: 200 }}
               className="absolute top-1/2 left-1/2 w-[90%] max-w-[360px] liquid-glass shadow-2xl p-8 rounded-[3rem] flex flex-col max-h-[88vh] overflow-y-auto"
            >
              {/* Internal Glass Depth */}
              <div className="absolute inset-0 bg-charcoal/80 backdrop-blur-2xl rounded-[3rem] pointer-events-none"></div>
              
              <div className="flex justify-between items-center mb-8 relative z-10">
                 <span className="text-2xl font-display font-black text-white tracking-tight liquid-text">
                    INFI<span className="text-secondary text-xl ml-1">Yatra</span>
                 </span>
                 <button 
                   onClick={() => {
                     haptics.light();
                     setIsOpen(false);
                   }}
                   className="p-2 liquid-glass rounded-xl text-white hover:bg-white/10 transition-colors border border-white/10"
                 >
                   <X size={22} />
                 </button>
              </div>

              <div className="flex flex-col space-y-6 flex-grow relative z-10">
                 {navLinks.map((link, idx) => (
                   <motion.div
                     key={link.name}
                     initial={{ opacity: 0, x: 20 }}
                     animate={{ opacity: 1, x: 0 }}
                     transition={{ delay: idx * 0.08 }}
                   >
                     <Link 
                       to={link.path}
                       onClick={() => setIsOpen(false)}
                       className="text-xl font-display font-black text-white hover:text-secondary transition-colors uppercase italic drop-shadow-lg block"
                     >
                       {link.name}
                     </Link>
                   </motion.div>
                 ))}
                 
                 <div className="h-px bg-white/20 w-full my-2"></div>
                 
                 <div className="flex items-center space-x-6">
                   <Link to="/dashboard" onClick={() => setIsOpen(false)} className="text-white p-3 liquid-glass border border-white/20 rounded-2xl hover:bg-white/10 transition-all flex items-center gap-2 text-xs font-bold">
                      <User size={18} /> Account
                   </Link>
                   <Link to="/admin/login" onClick={() => setIsOpen(false)} className="text-white p-3 liquid-glass border border-white/20 rounded-2xl hover:bg-white/10 transition-all text-xs font-bold">
                      Admin
                   </Link>
                 </div>
              </div>

              <Link 
                to="/customize" 
                onClick={() => setIsOpen(false)}
                className="w-full bg-secondary text-white py-4 rounded-2xl flex items-center justify-center font-black text-xs uppercase tracking-[0.25em] shadow-xl shadow-secondary/30 mt-8 active:scale-95 transition-all outline-none relative z-10"
              >
                 Customize Trip
              </Link>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  )
}

export default Navbar
