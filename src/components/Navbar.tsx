import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { MapPin, Search, Menu, Phone, User, Heart, X, Plane } from 'lucide-react'
<<<<<<< HEAD
import { getWhatsAppLink } from '../lib/data'
=======
>>>>>>> 2c9a9e5 (initial commit with large files)

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false)
  const [visible, setVisible] = useState(true)
  const [isOpen, setIsOpen] = useState(false)
  const [lastScrollY, setLastScrollY] = useState(0)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      
      // Glassmorphism trigger
      setScrolled(currentScrollY > 60)

<<<<<<< HEAD
      // Navbar remains stable and visible always
=======
      // Hide/Show logic
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setVisible(false) // Scrolling down
      } else {
        setVisible(true) // Scrolling up
      }
>>>>>>> 2c9a9e5 (initial commit with large files)
      
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
    { name: 'Explore Trips', path: '/discover' },
    { name: 'Community', path: '/community' },
    { name: 'About Us', path: '/about' }
  ]

  return (
    <>
<<<<<<< HEAD
      <nav className={`fixed left-0 right-0 z-50 transition-all duration-700 transform flex justify-center w-full px-4 md:px-8 pt-4 md:pt-6 ${
        visible ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
      }`}>
        <div className={`w-full max-w-[1920px] mx-auto rounded-full liquid-glass-dark shadow-[0_8px_32px_rgba(0,0,0,0.5)] border border-white/20 px-6 lg:px-10 transition-all duration-500 ${scrolled ? 'py-2' : 'py-3'}`}>
          <div className="flex justify-between items-center h-12">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2 group">
              <span className="text-2xl font-display font-black tracking-tighter text-white liquid-text">
=======
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 transform ${
        visible ? 'translate-y-0' : '-translate-y-full'
      } ${
        scrolled 
          ? 'bg-white/80 backdrop-blur-3xl py-1.5 shadow-xl shadow-black/5 border-b border-gray-100' 
          : 'bg-transparent py-4'
      }`}>
        <div className="max-w-[1920px] mx-auto px-6 md:px-12 lg:px-20">
          <div className="flex justify-between items-center h-12">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2 group">
              <span className={`text-2xl font-display font-black tracking-tighter transition-colors duration-500 ${scrolled ? 'text-charcoal' : 'text-white'}`}>
>>>>>>> 2c9a9e5 (initial commit with large files)
                INFI<span className="text-secondary tracking-tighter uppercase text-base ml-0.5">Yatra</span>
              </span>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center space-x-10">
              <div className="flex items-center space-x-8">
                {navLinks.map((link) => (
                  <Link 
                    key={link.name}
                    to={link.path} 
<<<<<<< HEAD
                    className="transition-all duration-500 font-bold text-[9px] uppercase tracking-[0.25em] text-white hover:text-secondary relative group drop-shadow-md"
=======
                    className={`transition-all duration-500 font-bold text-[9px] uppercase tracking-[0.25em] hover:text-secondary relative group ${
                      scrolled ? 'text-charcoal' : 'text-white drop-shadow-md'
                    }`}
>>>>>>> 2c9a9e5 (initial commit with large files)
                  >
                    {link.name}
                    <span className="absolute -bottom-1.5 left-0 w-0 h-0.5 bg-secondary transition-all duration-500 group-hover:w-full"></span>
                  </Link>
                ))}
              </div>
              
<<<<<<< HEAD
              <div className="h-4 w-px bg-white/20"></div>
              
              <div className="flex items-center space-x-6">
                <Link to="/dashboard" className="transition-colors duration-500 text-white hover:text-secondary">
                  <User size={18} />
                </Link>
                <Link to="/wishlist" className="transition-colors duration-500 text-white hover:text-secondary">
                  <Heart size={18} />
                </Link>
                <a 
                  href={getWhatsAppLink("Hi Infi Yatra! I'd like to book an adventure.")} 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-secondary text-white px-6 py-2 rounded-full font-black text-[9px] uppercase tracking-widest hover:bg-white hover:text-charcoal transition-all duration-500 shadow-xl shadow-secondary/20 transform hover:scale-105 active:scale-95 border border-transparent hover:border-white/20"
=======
              <div className={`h-4 w-px transition-colors duration-500 ${scrolled ? 'bg-gray-200' : 'bg-white/20'}`}></div>
              
              <div className="flex items-center space-x-6">
                <Link to="/dashboard" className={`transition-colors duration-500 ${scrolled ? 'text-charcoal hover:text-primary' : 'text-white hover:text-secondary'}`}>
                  <User size={18} />
                </Link>
                <Link to="/wishlist" className={`transition-colors duration-500 ${scrolled ? 'text-charcoal hover:text-primary' : 'text-white hover:text-secondary'}`}>
                  <Heart size={18} />
                </Link>
                <a 
                  href="https://wa.me/919601793485?text=Hi Infi Yatra! I'd like to book an adventure." 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-secondary text-white px-6 py-2 rounded-full font-black text-[9px] uppercase tracking-widest hover:bg-white hover:text-charcoal transition-all duration-500 shadow-xl shadow-secondary/20 transform hover:scale-105 active:scale-95"
>>>>>>> 2c9a9e5 (initial commit with large files)
                >
                  Book Now
                </a>
              </div>
            </div>

            {/* Mobile Menu Toggle */}
            <div className="md:hidden flex items-center">
              <button 
                onClick={() => setIsOpen(true)}
<<<<<<< HEAD
                className="p-2 transition-colors duration-500 text-white"
=======
                className={`p-2 transition-colors duration-500 ${scrolled ? 'text-charcoal' : 'text-white'}`}
>>>>>>> 2c9a9e5 (initial commit with large files)
              >
                <Menu size={24} />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Modern Mobile Sidebar Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div 
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               exit={{ opacity: 0 }}
               onClick={() => setIsOpen(false)}
               className="fixed inset-0 bg-black/40 backdrop-blur-md z-[60]"
            />
            <motion.div 
               initial={{ x: '100%' }}
               animate={{ x: 0 }}
               exit={{ x: '100%' }}
               transition={{ type: 'spring', damping: 25, stiffness: 200 }}
<<<<<<< HEAD
               className="fixed top-0 right-0 h-full w-[80%] max-w-sm liquid-glass-dark border-l border-white/10 z-[70] shadow-2xl p-10 flex flex-col"
            >
              <div className="flex justify-between items-center mb-16">
                 <span className="text-2xl font-display font-black text-white tracking-tight liquid-text">
=======
               className="fixed top-0 right-0 h-full w-[80%] max-w-sm bg-white z-[70] shadow-2xl p-10 flex flex-col"
            >
              <div className="flex justify-between items-center mb-16">
                 <span className="text-2xl font-display font-black text-charcoal tracking-tight">
>>>>>>> 2c9a9e5 (initial commit with large files)
                    INFI<span className="text-secondary text-xl ml-1">Yatra</span>
                 </span>
                 <button 
                   onClick={() => setIsOpen(false)}
<<<<<<< HEAD
                   className="p-2 liquid-glass rounded-xl text-white hover:bg-white/10 transition-colors border border-white/10"
=======
                   className="p-2 bg-gray-50 rounded-xl text-charcoal hover:bg-gray-100 transition-colors"
>>>>>>> 2c9a9e5 (initial commit with large files)
                 >
                   <X size={24} />
                 </button>
              </div>

              <div className="flex flex-col space-y-8 flex-grow">
                 {navLinks.map((link, idx) => (
                   <motion.div
                     key={link.name}
                     initial={{ opacity: 0, x: 20 }}
                     animate={{ opacity: 1, x: 0 }}
                     transition={{ delay: idx * 0.1 + 0.2 }}
                   >
                     <Link 
                       to={link.path}
<<<<<<< HEAD
                       className="text-2xl font-display font-black text-white hover:text-secondary transition-colors uppercase italic"
=======
                       className="text-2xl font-display font-black text-charcoal hover:text-secondary transition-colors uppercase italic"
>>>>>>> 2c9a9e5 (initial commit with large files)
                     >
                       {link.name}
                     </Link>
                   </motion.div>
                 ))}
                 
<<<<<<< HEAD
                 <div className="h-px bg-white/10 w-full my-4"></div>
                 
                 <div className="flex items-center space-x-8">
                   <Link to="/dashboard" className="text-white p-2 hover:bg-white/10 rounded-xl transition-all">
                      <User size={24} />
                   </Link>
                   <Link to="/wishlist" className="text-white p-2 hover:bg-white/10 rounded-xl transition-all">
=======
                 <div className="h-px bg-gray-100 w-full my-4"></div>
                 
                 <div className="flex items-center space-x-8">
                   <Link to="/dashboard" className="text-charcoal p-2 hover:bg-gray-50 rounded-xl transition-all">
                      <User size={24} />
                   </Link>
                   <Link to="/wishlist" className="text-charcoal p-2 hover:bg-gray-50 rounded-xl transition-all">
>>>>>>> 2c9a9e5 (initial commit with large files)
                      <Heart size={24} />
                   </Link>
                 </div>
              </div>

              <a 
<<<<<<< HEAD
                href={getWhatsAppLink("Hi Infi Yatra! I'd like to book an adventure.")} 
=======
                href="https://wa.me/919601793485?text=Hi Infi Yatra! I'd like to book an adventure." 
>>>>>>> 2c9a9e5 (initial commit with large files)
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-secondary text-white py-6 rounded-2xl flex items-center justify-center font-black text-xs uppercase tracking-[0.3em] shadow-xl shadow-secondary/30 mt-10 active:scale-95 transition-all outline-none"
              >
                 Book My Adventure
              </a>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}

export default Navbar
