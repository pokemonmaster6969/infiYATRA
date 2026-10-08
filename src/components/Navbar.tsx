import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, User, Heart, X, Sparkles } from 'lucide-react'
import { haptics } from '../lib/haptics'
import Logo from './Logo'

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40)
    }
    
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close mobile menu on route change
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
      <nav className="fixed top-0 left-0 right-0 z-50 transition-all duration-500 flex justify-center w-full px-4 md:px-8 pt-3 md:pt-4 pointer-events-none">
        <div className={`w-full max-w-[1720px] mx-auto rounded-full liquid-glass shadow-2xl transition-all duration-500 pointer-events-auto ${
          scrolled ? 'py-2 px-6 scale-[0.99] bg-black/60' : 'py-2.5 px-6 md:px-8'
        }`}>
          
          <div className="flex justify-between items-center h-12 md:h-14">
            {/* Logo */}
            <Link to="/" onClick={() => haptics.light()} className="flex items-center group py-1">
              <Logo size="md" />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-7">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.path
                return (
                  <Link 
                    key={link.name}
                    to={link.path} 
                    onClick={() => haptics.light()}
                    className={`transition-all duration-300 font-bold text-[10px] uppercase tracking-[0.2em] relative group py-1 ${
                      isActive ? 'text-secondary' : 'text-white/80 hover:text-white'
                    }`}
                  >
                    {link.name}
                    <span className={`absolute bottom-0 left-0 h-0.5 bg-secondary transition-all duration-300 ${
                      isActive ? 'w-full' : 'w-0 group-hover:w-full'
                    }`} />
                  </Link>
                )
              })}
            </div>

            {/* Right Action Icons */}
            <div className="hidden lg:flex items-center space-x-5">
              <Link to="/dashboard" title="User Dashboard" onClick={() => haptics.light()} className="transition-colors duration-300 text-white/80 hover:text-secondary">
                <User size={18} />
              </Link>
              <Link to="/wishlist" title="Wishlist" onClick={() => haptics.light()} className="transition-colors duration-300 text-white/80 hover:text-secondary">
                <Heart size={18} />
              </Link>
            </div>

            {/* Mobile Menu Toggle */}
            <div className="lg:hidden flex items-center gap-3">
              <button 
                onClick={() => {
                  haptics.light();
                  setIsOpen(true);
                }}
                className="p-1.5 transition-colors duration-300 text-white"
                aria-label="Open Navigation Menu"
              >
                <Menu size={24} />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[60] lg:hidden">
            <motion.div 
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               exit={{ opacity: 0 }}
               onClick={() => setIsOpen(false)}
               className="absolute inset-0 bg-black/60 backdrop-blur-md"
            />
            <motion.div 
               initial={{ opacity: 0, scale: 0.9, x: '-50%', y: '-45%' }}
               animate={{ opacity: 1, scale: 1, x: '-50%', y: '-50%' }}
               exit={{ opacity: 0, scale: 0.9, x: '-50%', y: '-45%' }}
               transition={{ type: 'spring', damping: 25, stiffness: 200 }}
               className="absolute top-1/2 left-1/2 w-[90%] max-w-[360px] liquid-glass shadow-2xl p-8 rounded-[3rem] flex flex-col max-h-[85vh] overflow-y-auto"
            >
              <div className="flex justify-between items-center mb-8 relative z-10">
                 <Link to="/" onClick={() => { haptics.light(); setIsOpen(false); }}>
                   <Logo size="md" showText={true} />
                 </Link>
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

              <div className="flex flex-col space-y-5 flex-grow relative z-10">
                 {navLinks.map((link, idx) => (
                   <motion.div
                     key={link.name}
                     initial={{ opacity: 0, x: 20 }}
                     animate={{ opacity: 1, x: 0 }}
                     transition={{ delay: idx * 0.06 }}
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
                 
                 <div className="h-px bg-white/20 w-full my-2" />
                 
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
                className="w-full bg-secondary text-white py-4 rounded-2xl flex items-center justify-center font-black text-xs uppercase tracking-[0.25em] shadow-xl shadow-secondary/30 mt-6 active:scale-95 transition-all outline-none relative z-10"
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
