import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { MapPin, Search, Menu, Phone, User, Heart, X, Plane } from 'lucide-react'

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

      // Hide/Show logic
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setVisible(false) // Scrolling down
      } else {
        setVisible(true) // Scrolling up
      }
      
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
                    className={`transition-all duration-500 font-bold text-[9px] uppercase tracking-[0.25em] hover:text-secondary relative group ${
                      scrolled ? 'text-charcoal' : 'text-white drop-shadow-md'
                    }`}
                  >
                    {link.name}
                    <span className="absolute -bottom-1.5 left-0 w-0 h-0.5 bg-secondary transition-all duration-500 group-hover:w-full"></span>
                  </Link>
                ))}
              </div>
              
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
                >
                  Book Now
                </a>
              </div>
            </div>

            {/* Mobile Menu Toggle */}
            <div className="md:hidden flex items-center">
              <button 
                onClick={() => setIsOpen(true)}
                className={`p-2 transition-colors duration-500 ${scrolled ? 'text-charcoal' : 'text-white'}`}
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
               className="fixed top-0 right-0 h-full w-[80%] max-w-sm bg-white z-[70] shadow-2xl p-10 flex flex-col"
            >
              <div className="flex justify-between items-center mb-16">
                 <span className="text-2xl font-display font-black text-charcoal tracking-tight">
                    INFI<span className="text-secondary text-xl ml-1">Yatra</span>
                 </span>
                 <button 
                   onClick={() => setIsOpen(false)}
                   className="p-2 bg-gray-50 rounded-xl text-charcoal hover:bg-gray-100 transition-colors"
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
                       className="text-2xl font-display font-black text-charcoal hover:text-secondary transition-colors uppercase italic"
                     >
                       {link.name}
                     </Link>
                   </motion.div>
                 ))}
                 
                 <div className="h-px bg-gray-100 w-full my-4"></div>
                 
                 <div className="flex items-center space-x-8">
                   <Link to="/dashboard" className="text-charcoal p-2 hover:bg-gray-50 rounded-xl transition-all">
                      <User size={24} />
                   </Link>
                   <Link to="/wishlist" className="text-charcoal p-2 hover:bg-gray-50 rounded-xl transition-all">
                      <Heart size={24} />
                   </Link>
                 </div>
              </div>

              <a 
                href="https://wa.me/919601793485?text=Hi Infi Yatra! I'd like to book an adventure." 
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
