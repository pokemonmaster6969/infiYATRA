import React, { useState, useEffect } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import { Filter, Search, MapPin, Calendar, Star, CheckCircle2, MessageCircle, ShieldCheck, ArrowUpRight, Clock, SlidersHorizontal, Anchor, Building2 } from 'lucide-react'
import { CATEGORIES, getTripWhatsAppLink } from '../lib/trips'
import { getTrips, optimizeImageUrl } from '../lib/dataService'
import { haptics } from '../lib/haptics'

const Discover = () => {
  const [trips, setTrips] = useState<any[]>([])
  const [activeFilters, setActiveFilters] = useState<string[]>([])
  const [isFiltersOpen, setIsFiltersOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [activeType, setActiveType] = useState<'All' | 'Domestic' | 'International' | 'Cruise' | 'Corporate'>('All')

  const [searchParams] = useSearchParams()

  useEffect(() => {
    getTrips().then(setTrips)
    const categoryParam = searchParams.get('category')
    if (categoryParam) {
      setActiveFilters([categoryParam])
    }
  }, [searchParams])

  const toggleFilter = (cat: string) => {
    setActiveFilters(prev =>
      prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]
    )
  }

  const filteredTrips = trips.filter(trip => {
    const matchesSearch = trip.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      trip.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      trip.category.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = activeFilters.length === 0 || activeFilters.includes(trip.category)
    
    let matchesType = true
    if (activeType === 'Domestic') matchesType = trip.type === 'Domestic'
    else if (activeType === 'International') matchesType = trip.type === 'International'
    else if (activeType === 'Cruise') matchesType = trip.category === 'Cruise'
    else if (activeType === 'Corporate') matchesType = trip.category === 'Corporate'

    return matchesSearch && matchesFilter && matchesType
  })

  return (
    <div className="min-h-screen bg-charcoal text-white pt-28 pb-20">
      <Helmet>
        <title>Explore All Travel Packages — INFIYATRA Expedition Catalog</title>
        <meta name="description" content="Browse curated domestic, international, cruise, and corporate packages. Find your next adventure with Infi Yatra." />
      </Helmet>
      
      <div className="max-w-[1920px] mx-auto px-6 md:px-12 lg:px-20">
        {/* Cinematic Header */}
        <div className="mb-10 space-y-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full liquid-glass border border-white/20">
                <SlidersHorizontal size={12} className="text-secondary" />
                <span className="text-secondary font-black uppercase tracking-[0.4em] text-[9px]">EXPEDITIONS HUB 2026</span>
              </div>
              <h1 className="text-4xl md:text-6xl font-display font-black tracking-tighter uppercase italic leading-none liquid-text">
                Explore All <span className="text-primary" style={{ WebkitTextStroke: '1px white' }}>Packages</span>
              </h1>
              <p className="text-white/50 font-medium text-sm md:text-base max-w-xl italic leading-relaxed">
                From Himalayan treks to luxury ocean cruises and corporate offsites. Discover your next journey.
              </p>
            </div>

            {/* Search - Liquid Glass */}
            <div className="liquid-glass p-2 rounded-full flex items-center max-w-lg w-full border-white/20 group hover:shadow-[0_0_50px_rgba(255,107,53,0.15)] transition-all duration-700">
              <div className="w-12 h-12 rounded-full flex items-center justify-center text-secondary group-hover:scale-110 transition-transform">
                <Search size={20} />
              </div>
              <input
                type="text"
                placeholder="Search Spiti, Cruise, Bali, Kashmir..."
                className="bg-transparent border-none focus:ring-0 w-full text-base font-black uppercase tracking-tighter py-3 px-4 placeholder:text-white/20"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {/* Quick Category Filter Pills */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-white/5">
            <div className="flex flex-wrap gap-2">
              {[
                { label: 'All', icon: null },
                { label: 'Domestic', icon: null },
                { label: 'International', icon: null },
                { label: 'Cruise', icon: Anchor },
                { label: 'Corporate', icon: Building2 }
              ].map((item) => (
                <button
                  key={item.label}
                  onClick={() => {
                    haptics.light();
                    setActiveType(item.label as any);
                  }}
                  className={`px-6 py-2.5 rounded-full text-[9px] font-black uppercase tracking-[0.25em] transition-all duration-500 flex items-center gap-1.5 ${
                    activeType === item.label
                      ? 'bg-secondary text-white shadow-xl shadow-secondary/40 scale-105'
                      : 'liquid-glass text-white/50 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {item.icon && <item.icon size={12} className={activeType === item.label ? 'text-white' : 'text-secondary'} />}
                  {item.label}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-3">
              <Link
                to="/customize"
                onClick={() => haptics.medium()}
                className="px-6 py-2.5 rounded-full text-[9px] font-black uppercase tracking-[0.25em] bg-primary text-white hover:bg-white hover:text-charcoal transition-all shadow-lg flex items-center gap-1.5"
              >
                <SlidersHorizontal size={13} /> Customize Trip
              </Link>

              <button
                onClick={() => {
                  haptics.light();
                  setIsFiltersOpen(!isFiltersOpen);
                }}
                className={`flex items-center gap-2 px-6 py-2.5 rounded-full text-[9px] font-black uppercase tracking-[0.25em] transition-all duration-500 ${
                  isFiltersOpen ? 'bg-white text-charcoal' : 'liquid-glass text-white/50 hover:text-white'
                }`}
              >
                <Filter size={14} className={isFiltersOpen ? 'text-charcoal' : 'text-secondary'} />
                {isFiltersOpen ? 'Hide Filters' : 'Refine Filters'}
              </button>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Collapsible Filter Sidebar */}
          <AnimatePresence>
            {isFiltersOpen && (
              <motion.aside
                initial={{ width: 0, opacity: 0, x: -20 }}
                animate={{ width: 'auto', opacity: 1, x: 0 }}
                exit={{ width: 0, opacity: 0, x: -20 }}
                className="lg:w-64 flex-shrink-0 space-y-6 overflow-hidden"
              >
                <div className="liquid-glass-dark p-6 rounded-[2rem] border-white/10 sticky top-32 min-w-[256px]">
                  <div className="flex justify-between items-center mb-6">
                    <div className="flex items-center space-x-3">
                      <Filter className="text-secondary" size={20} />
                      <h2 className="text-xl font-display font-black uppercase italic tracking-tighter">Categories</h2>
                    </div>
                    {activeFilters.length > 0 && (
                      <button
                        onClick={() => { haptics.light(); setActiveFilters([]); }}
                        className="text-[10px] font-black uppercase tracking-widest text-white/30 hover:text-secondary transition-colors underline"
                      >
                        RESET
                      </button>
                    )}
                  </div>

                  <div className="space-y-4">
                    {CATEGORIES.map(cat => (
                      <label key={cat} className="flex items-center group cursor-pointer">
                        <input
                          type="checkbox"
                          className="hidden"
                          checked={activeFilters.includes(cat)}
                          onChange={() => {
                            haptics.light();
                            toggleFilter(cat);
                          }}
                        />
                        <div className={`w-5 h-5 rounded-lg border-2 mr-3 flex items-center justify-center transition-all ${
                          activeFilters.includes(cat) ? 'bg-secondary border-secondary scale-110' : 'border-white/20 group-hover:border-secondary'
                        }`}>
                          {activeFilters.includes(cat) && <CheckCircle2 className="text-white" size={12} />}
                        </div>
                        <span className={`text-xs font-black uppercase tracking-wider transition-colors ${
                          activeFilters.includes(cat) ? 'text-white' : 'text-white/40 group-hover:text-white'
                        }`}>{cat}</span>
                      </label>
                    ))}
                  </div>

                  <div className="pt-8 border-t border-white/10 mt-8">
                    <div className="flex items-center space-x-3 text-secondary">
                      <ShieldCheck size={18} />
                      <span className="text-[9px] font-black uppercase tracking-[0.2em] leading-relaxed">Verified Captain Trips Only</span>
                    </div>
                  </div>
                </div>
              </motion.aside>
            )}
          </AnimatePresence>

          {/* Grid of All Packages */}
          <div className="flex-grow">
            <div className={`grid grid-cols-1 md:grid-cols-2 ${isFiltersOpen ? 'lg:grid-cols-2 xl:grid-cols-3' : 'lg:grid-cols-3 xl:grid-cols-4'} gap-6 transition-all duration-700`}>
              <AnimatePresence mode="popLayout">
                {filteredTrips.map((trip, idx) => (
                  <motion.div
                    key={trip.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9, y: 30 }}
                    animate={{ opacity: 1, scale: 1, y: 0, transition: { duration: 0.5, delay: idx * 0.04 } }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    whileHover={{ y: -6 }}
                    className="group relative liquid-glass-dark rounded-[2.5rem] overflow-hidden border border-white/10 hover:border-secondary/50 transition-all duration-500 h-auto flex flex-col shadow-2xl"
                  >
                    <div className="relative h-52 overflow-hidden">
                      <img
                        src={optimizeImageUrl(trip.image, 600, 80)}
                        alt={trip.title}
                        loading="lazy"
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[2s]"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-transparent to-transparent" />

                      <div className="absolute top-4 left-4">
                        <div className="liquid-glass text-white text-[9px] font-black uppercase px-3.5 py-1.5 rounded-full tracking-[0.2em] border-white/20 flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse" />
                          {trip.category}
                        </div>
                      </div>

                      {trip.featured && (
                        <div className="absolute top-4 right-4">
                          <span className="bg-secondary text-white text-[8px] font-black uppercase px-3 py-1 rounded-full shadow-lg">
                            ★ Featured
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="p-6 flex-grow flex flex-col space-y-4">
                      <div className="space-y-1">
                        <h3 className="text-xl font-display font-black text-white uppercase italic tracking-tighter leading-tight group-hover:text-secondary transition-colors line-clamp-1">
                          {trip.title}
                        </h3>
                        <div className="flex items-center space-x-2 text-white/40 text-[10px] font-black uppercase tracking-[0.2em]">
                          <MapPin size={12} className="text-secondary" />
                          <span className="line-clamp-1">{trip.location}</span>
                          <span>•</span>
                          <Clock size={12} className="text-secondary" />
                          <span>{trip.duration}</span>
                        </div>
                      </div>

                      <p className="text-white/40 text-xs font-medium italic leading-relaxed line-clamp-2">
                        {trip.description}
                      </p>

                      <div className="pt-4 border-t border-white/10 flex justify-between items-end mt-auto">
                        <div>
                          <span className="text-[8px] font-black text-white/30 uppercase tracking-[0.3em]">Rates From</span>
                          <div className="text-2xl font-display font-black text-white tracking-tighter">₹{trip.price}</div>
                        </div>

                        <div className="flex items-center gap-2">
                          <a
                            href={getTripWhatsAppLink(trip.title)}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={() => haptics.medium()}
                            className="liquid-glass text-white p-3 rounded-2xl hover:bg-secondary transition-all"
                          >
                            <MessageCircle size={16} />
                          </a>
                          <Link
                            to={`/trip/${trip.id}`}
                            onClick={() => haptics.medium()}
                            className="bg-white text-charcoal px-6 py-3 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-secondary hover:text-white transition-all shadow-xl"
                          >
                            Details
                          </Link>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {filteredTrips.length === 0 && (
              <div className="flex flex-col items-center justify-center py-32 text-center space-y-4">
                <Search size={40} className="text-white/20" />
                <h3 className="text-2xl font-display font-black text-white/30 uppercase italic">No matching packages found</h3>
                <button
                  onClick={() => {
                    haptics.light();
                    setActiveFilters([]);
                    setActiveType('All');
                    setSearchTerm('');
                  }}
                  className="text-secondary font-black uppercase tracking-widest text-xs border-b border-secondary/40 pb-1"
                >
                  Reset Search & Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Discover
