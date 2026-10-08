import React, { useState, useEffect, useMemo, useCallback } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import { Search, MapPin, Calendar, Star, MessageCircle, ArrowUpRight, Clock, SlidersHorizontal, Anchor, Building2, X, ChevronDown, IndianRupee, Users } from 'lucide-react'
import { CATEGORIES, getTripWhatsAppLink } from '../lib/trips'
import { getTrips, optimizeImageUrl } from '../lib/dataService'
import { haptics } from '../lib/haptics'

const TYPE_TABS = [
  { label: 'All', icon: null },
  { label: 'Domestic', icon: null },
  { label: 'International', icon: null },
  { label: 'Cruise', icon: Anchor },
  { label: 'Corporate', icon: Building2 }
] as const;

const SORT_OPTIONS = [
  { label: 'Popular', value: 'popular' },
  { label: 'Price: Low', value: 'price-asc' },
  { label: 'Price: High', value: 'price-desc' },
  { label: 'Rating', value: 'rating' },
  { label: 'Duration', value: 'duration' },
] as const;

const Discover = () => {
  const [trips, setTrips] = useState<any[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [activeType, setActiveType] = useState<string>('All')
  const [activeCategories, setActiveCategories] = useState<string[]>([])
  const [sortBy, setSortBy] = useState('popular')
  const [showSortDropdown, setShowSortDropdown] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)

  const [searchParams] = useSearchParams()

  useEffect(() => {
    getTrips().then(data => {
      setTrips(data)
      setIsLoaded(true)
    })
    const categoryParam = searchParams.get('category')
    if (categoryParam) {
      setActiveCategories([categoryParam])
    }
  }, [searchParams])

  const toggleCategory = useCallback((cat: string) => {
    haptics.light()
    setActiveCategories(prev =>
      prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]
    )
  }, [])

  const clearAll = useCallback(() => {
    haptics.light()
    setActiveCategories([])
    setActiveType('All')
    setSearchTerm('')
    setSortBy('popular')
  }, [])

  const parsePrice = (price: string) => {
    return parseInt(price.replace(/,/g, ''), 10) || 0
  }

  const parseDuration = (duration: string) => {
    const match = duration.match(/(\d+)/)
    return match ? parseInt(match[1], 10) : 0
  }

  const filteredTrips = useMemo(() => {
    let result = trips.filter(trip => {
      const term = searchTerm.toLowerCase()
      const matchesSearch = !term || 
        trip.title.toLowerCase().includes(term) ||
        trip.location.toLowerCase().includes(term) ||
        trip.category.toLowerCase().includes(term) ||
        trip.description?.toLowerCase().includes(term)

      const matchesCategory = activeCategories.length === 0 || activeCategories.includes(trip.category)

      let matchesType = true
      if (activeType === 'Domestic') matchesType = trip.type === 'Domestic'
      else if (activeType === 'International') matchesType = trip.type === 'International'
      else if (activeType === 'Cruise') matchesType = trip.category === 'Cruise'
      else if (activeType === 'Corporate') matchesType = trip.category === 'Corporate'

      return matchesSearch && matchesCategory && matchesType
    })

    // Sort
    switch (sortBy) {
      case 'price-asc':
        result = [...result].sort((a, b) => parsePrice(a.price) - parsePrice(b.price))
        break
      case 'price-desc':
        result = [...result].sort((a, b) => parsePrice(b.price) - parsePrice(a.price))
        break
      case 'rating':
        result = [...result].sort((a, b) => b.rating - a.rating)
        break
      case 'duration':
        result = [...result].sort((a, b) => parseDuration(a.duration) - parseDuration(b.duration))
        break
      default: // popular — featured first, then by reviews
        result = [...result].sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0) || b.reviews - a.reviews)
    }

    return result
  }, [trips, searchTerm, activeType, activeCategories, sortBy])

  const activeFilterCount = activeCategories.length + (activeType !== 'All' ? 1 : 0) + (searchTerm ? 1 : 0)

  return (
    <div className="min-h-screen bg-charcoal text-white pt-24 pb-20">
      <Helmet>
        <title>Explore All Travel Packages — INFIYATRA</title>
        <meta name="description" content="Browse 20+ curated domestic, international, cruise, and corporate travel packages. Kashmir, Rajasthan, Kerala, Ladakh, Goa, Bali and more." />
      </Helmet>
      
      <div className="max-w-[1920px] mx-auto px-4 md:px-10 lg:px-16">
        {/* ── Header ── */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-5 mb-6">
            <div>
              <p className="text-secondary font-black uppercase tracking-[0.4em] text-[9px] mb-2">
                {filteredTrips.length} {filteredTrips.length === 1 ? 'PACKAGE' : 'PACKAGES'} FOUND
              </p>
              <h1 className="text-3xl md:text-5xl font-display font-black tracking-tighter uppercase italic leading-none liquid-text">
                Explore <span className="text-primary">Packages</span>
              </h1>
            </div>

            {/* Search Bar */}
            <div className="relative max-w-md w-full">
              <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" />
              <input
                type="text"
                placeholder="Search destination, trip..."
                className="w-full bg-white/5 border border-white/10 rounded-2xl py-3.5 pl-11 pr-10 text-sm font-medium placeholder:text-white/25 focus:outline-none focus:border-secondary/50 focus:bg-white/8 transition-all"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              {searchTerm && (
                <button onClick={() => setSearchTerm('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white">
                  <X size={16} />
                </button>
              )}
            </div>
          </div>

          {/* ── Type Tabs + Sort ── */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-5 border-b border-white/5">
            <div className="flex flex-wrap gap-1.5">
              {TYPE_TABS.map((item) => (
                <button
                  key={item.label}
                  onClick={() => {
                    haptics.light();
                    setActiveType(item.label as string);
                  }}
                  className={`px-5 py-2 rounded-xl text-[10px] font-bold uppercase tracking-wider transition-all duration-300 flex items-center gap-1.5 ${
                    activeType === item.label
                      ? 'bg-secondary text-white shadow-lg shadow-secondary/30'
                      : 'bg-white/5 text-white/40 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {item.icon && <item.icon size={12} />}
                  {item.label}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2">
              {/* Category Pills (inline, scrollable) */}
              <div className="hidden md:flex flex-wrap gap-1.5">
                {CATEGORIES.filter(c => c !== 'Cruise' && c !== 'Corporate').map(cat => (
                  <button
                    key={cat}
                    onClick={() => toggleCategory(cat)}
                    className={`px-3.5 py-1.5 rounded-lg text-[9px] font-bold uppercase tracking-wider transition-all duration-200 ${
                      activeCategories.includes(cat)
                        ? 'bg-primary/20 text-primary border border-primary/40'
                        : 'bg-white/5 text-white/30 hover:text-white/60 border border-transparent'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Sort Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setShowSortDropdown(!showSortDropdown)}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-[10px] font-bold uppercase tracking-wider bg-white/5 text-white/40 hover:text-white transition-all"
                >
                  Sort: {SORT_OPTIONS.find(s => s.value === sortBy)?.label}
                  <ChevronDown size={12} className={`transition-transform ${showSortDropdown ? 'rotate-180' : ''}`} />
                </button>
                {showSortDropdown && (
                  <div className="absolute right-0 top-full mt-1 bg-charcoal border border-white/10 rounded-xl overflow-hidden z-50 shadow-2xl min-w-[140px]">
                    {SORT_OPTIONS.map(opt => (
                      <button
                        key={opt.value}
                        onClick={() => { setSortBy(opt.value); setShowSortDropdown(false); haptics.light(); }}
                        className={`block w-full text-left px-4 py-2.5 text-[10px] font-bold uppercase tracking-wider transition-colors ${
                          sortBy === opt.value ? 'bg-secondary/20 text-secondary' : 'text-white/50 hover:bg-white/5 hover:text-white'
                        }`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Clear All */}
              {activeFilterCount > 0 && (
                <button
                  onClick={clearAll}
                  className="px-4 py-2 rounded-xl text-[10px] font-bold uppercase tracking-wider text-white/30 hover:text-secondary border border-white/10 hover:border-secondary/30 transition-all"
                >
                  Clear ({activeFilterCount})
                </button>
              )}
            </div>
          </div>
        </div>

        {/* ── Trip Grid ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          <AnimatePresence mode="popLayout">
            {filteredTrips.map((trip, idx) => (
              <motion.div
                key={trip.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0, transition: { duration: 0.35, delay: Math.min(idx * 0.03, 0.3) } }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="group relative bg-white/[0.03] rounded-2xl overflow-hidden border border-white/[0.06] hover:border-white/15 transition-all duration-300 flex flex-col"
              >
                {/* Image */}
                <Link to={`/trip/${trip.id}`} className="relative h-48 overflow-hidden block">
                  <img
                    src={optimizeImageUrl(trip.image, 600, 75)}
                    alt={trip.title}
                    loading={idx < 8 ? "eager" : "lazy"}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                  {/* Category Badge */}
                  <div className="absolute top-3 left-3">
                    <span className="bg-black/50 backdrop-blur-sm text-white text-[9px] font-bold uppercase px-2.5 py-1 rounded-lg tracking-wider border border-white/10">
                      {trip.category}
                    </span>
                  </div>

                  {/* Featured Badge */}
                  {trip.featured && (
                    <div className="absolute top-3 right-3">
                      <span className="bg-secondary text-white text-[8px] font-bold uppercase px-2 py-1 rounded-md shadow-lg">
                        ★ Featured
                      </span>
                    </div>
                  )}

                  {/* Duration overlay */}
                  <div className="absolute bottom-3 right-3 flex items-center gap-1 bg-black/50 backdrop-blur-sm text-white/90 text-[9px] font-bold px-2 py-1 rounded-lg">
                    <Clock size={10} />
                    {trip.duration}
                  </div>
                </Link>

                {/* Content */}
                <div className="p-4 flex-grow flex flex-col">
                  <Link to={`/trip/${trip.id}`} className="group/title">
                    <h3 className="text-base font-display font-black text-white uppercase italic tracking-tight leading-tight group-hover/title:text-secondary transition-colors line-clamp-1 mb-1">
                      {trip.title}
                    </h3>
                  </Link>
                  
                  <div className="flex items-center gap-2 text-white/35 text-[10px] font-semibold mb-2">
                    <MapPin size={11} className="text-secondary flex-shrink-0" />
                    <span className="line-clamp-1">{trip.location}</span>
                  </div>

                  <p className="text-white/30 text-[11px] leading-relaxed line-clamp-2 mb-3 flex-grow">
                    {trip.description}
                  </p>

                  {/* Rating + Reviews */}
                  <div className="flex items-center gap-2 mb-3">
                    <div className="flex items-center gap-1 bg-secondary/10 text-secondary px-2 py-0.5 rounded-md">
                      <Star size={10} fill="currentColor" />
                      <span className="text-[10px] font-bold">{trip.rating}</span>
                    </div>
                    <span className="text-white/20 text-[10px]">{trip.reviews} reviews</span>
                    <span className="text-white/10 text-[10px] ml-auto">{trip.type}</span>
                  </div>

                  {/* Price + CTA */}
                  <div className="pt-3 border-t border-white/5 flex justify-between items-end">
                    <div>
                      <span className="text-[8px] font-bold text-white/20 uppercase tracking-widest block">From</span>
                      <span className="text-xl font-display font-black text-white tracking-tight">₹{trip.price}</span>
                      <span className="text-[9px] text-white/20 ml-0.5">/person</span>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <a
                        href={getTripWhatsAppLink(trip.title)}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => { e.stopPropagation(); haptics.medium(); }}
                        className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/40 hover:bg-green-500/20 hover:text-green-400 hover:border-green-400/30 transition-all"
                        title="WhatsApp Inquiry"
                      >
                        <MessageCircle size={14} />
                      </a>
                      <Link
                        to={`/trip/${trip.id}`}
                        onClick={() => haptics.medium()}
                        className="h-9 px-4 rounded-xl bg-white text-charcoal font-bold text-[10px] uppercase tracking-wider hover:bg-secondary hover:text-white transition-all flex items-center gap-1"
                      >
                        View
                        <ArrowUpRight size={12} />
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* ── Empty State ── */}
        {isLoaded && filteredTrips.length === 0 && (
          <div className="flex flex-col items-center justify-center py-24 text-center space-y-4">
            <Search size={36} className="text-white/15" />
            <h3 className="text-xl font-display font-black text-white/25 uppercase italic">No packages found</h3>
            <p className="text-white/15 text-sm max-w-md">Try adjusting your filters or search term</p>
            <button
              onClick={clearAll}
              className="text-secondary font-bold uppercase tracking-widest text-xs border-b border-secondary/40 pb-1 hover:border-secondary transition-colors"
            >
              Reset All Filters
            </button>
          </div>
        )}

        {/* ── Bottom CTA ── */}
        <div className="mt-16 text-center">
          <p className="text-white/25 text-sm mb-3 italic">Can't find what you're looking for?</p>
          <Link
            to="/customize"
            onClick={() => haptics.medium()}
            className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-white rounded-2xl font-bold text-xs uppercase tracking-widest hover:bg-white hover:text-charcoal transition-all shadow-lg shadow-primary/20"
          >
            <SlidersHorizontal size={15} />
            Customize Your Own Trip
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Discover
