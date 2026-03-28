import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Filter, Search, MapPin, Calendar, Star, ChevronDown, CheckCircle2, MessageCircle, ShieldCheck } from 'lucide-react'

// Comprehensive Catalog
const ALL_TRIPS = [
  {
    id: 1,
    title: 'Mystical Manali & Spiti Valley',
    location: 'Himachal Pradesh',
    price: '14,999',
    rating: 4.8,
    reviews: 124,
    duration: '6 Days',
    category: 'Adventure',
    type: 'Domestic',
    image: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&q=80&w=1200',
    link: '/himachal'
  },
  {
    id: 2,
    title: 'Bali Essence Escape',
    location: 'Indonesia',
    price: '54,999',
    rating: 4.9,
    reviews: 350,
    duration: '8 Days',
    category: 'Honeymoon',
    type: 'International',
    image: '/assets/bali.jpg',
    link: '/bali'
  },
  {
    id: 3,
    title: 'Kerala: God\'s Own Country',
    location: 'Munnar & Alleppey',
    price: '18,499',
    rating: 4.9,
    reviews: 210,
    duration: '5 Days',
    category: 'Nature',
    type: 'Domestic',
    image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&q=80&w=1200',
    link: '#'
  },
  {
    id: 4,
    title: 'Thai Island Perfection',
    location: 'Phuket & Krabi',
    price: '48,999',
    rating: 4.8,
    reviews: 156,
    duration: '7 Days',
    category: 'Beach',
    type: 'International',
    image: '/assets/thai.jpg',
    link: '#'
  },
  {
    id: 5,
    title: 'Western Ghats Expedition',
    location: 'Coorg & Chikmagalur',
    price: '12,499',
    rating: 4.7,
    reviews: 94,
    duration: '4 Days',
    category: 'Backpacking',
    type: 'Domestic',
    image: 'https://images.unsplash.com/photo-1593181629936-11c609b8db9b?auto=format&fit=crop&q=80&w=1200',
    link: '#'
  },
  {
    id: 6,
    title: 'Seychelles Paradise',
    location: 'Mahé & Praslin',
    price: '1,24,999',
    rating: 5.0,
    reviews: 42,
    duration: '9 Days',
    category: 'Luxury',
    type: 'International',
    image: '/assets/seychelles.jpg',
    link: '#'
  }
];

const CATEGORIES = ['Adventure', 'Beach', 'Luxury', 'Nature', 'Honeymoon', 'Backpacking'];

const Discover = () => {
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeType, setActiveType] = useState<'All' | 'Domestic' | 'International'>('All');

  const toggleFilter = (cat: string) => {
    setActiveFilters(prev =>
      prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]
    )
  }

  const filteredTrips = ALL_TRIPS.filter(trip => {
    const matchesSearch = trip.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      trip.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = activeFilters.length === 0 || activeFilters.includes(trip.category);
    const matchesType = activeType === 'All' || trip.type === activeType;
    return matchesSearch && matchesFilter && matchesType;
  })

  return (
    <div className="min-h-screen bg-charcoal text-white pt-32 pb-24">
      <div className="max-w-[1800px] mx-auto px-6 md:px-12">

        {/* Cinematic Header */}
        <div className="mb-20 space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-10">
            <div className="space-y-4">
              <span className="text-secondary font-black uppercase tracking-[0.4em] text-[10px] drop-shadow-lg">COLLECTIONS 2024</span>
              <h1 className="text-5xl md:text-8xl font-display font-black tracking-tighter uppercase italic leading-none liquid-text">
                The <span className="text-primary" style={{ WebkitTextStroke: '2px white' }}>Adventures</span> Hub
              </h1>
              <p className="text-white/40 font-medium text-lg max-w-xl italic leading-relaxed">Curated escapes for the Ahmedabad spirit. From the rugged north to tropical islands.</p>
            </div>

            {/* Search - Liquid Glass */}
            <div className="liquid-glass p-2 rounded-full flex items-center max-w-lg w-full border-white/20 group hover:shadow-[0_0_50px_rgba(255,107,53,0.15)] transition-all duration-700">
              <div className="w-12 h-12 rounded-full flex items-center justify-center text-secondary group-hover:scale-110 transition-transform">
                <Search size={20} />
              </div>
              <input
                type="text"
                placeholder="Search destinations, Captains..."
                className="bg-transparent border-none focus:ring-0 w-full text-base font-black uppercase tracking-tighter py-3 px-4 placeholder:text-white/20"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {/* Type Filters */}
          <div className="flex flex-wrap gap-4 pt-10 border-t border-white/5">
            {['All', 'Domestic', 'International'].map((type) => (
              <button
                key={type}
                onClick={() => setActiveType(type as any)}
                className={`px-10 py-4 rounded-full text-[10px] font-black uppercase tracking-[0.3em] transition-all duration-500 ${activeType === type
                  ? 'bg-secondary text-white shadow-2xl shadow-secondary/40'
                  : 'liquid-glass text-white/40 hover:text-white hover:bg-white/10'}`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-16">

          {/* Refined Sidebar */}
          <aside className="lg:w-80 flex-shrink-0 space-y-10">
            <div className="liquid-glass-dark p-10 rounded-[3.5rem] border-white/10 sticky top-32">
              <div className="flex justify-between items-center mb-10">
                <div className="flex items-center space-x-3">
                  <Filter className="text-secondary" size={20} />
                  <h2 className="text-xl font-display font-black uppercase italic tracking-tighter">Filters</h2>
                </div>
                {activeFilters.length > 0 && (
                  <button onClick={() => setActiveFilters([])} className="text-[10px] font-black uppercase tracking-widest text-white/30 hover:text-secondary transition-colors underline">RESET</button>
                )}
              </div>

              <div className="space-y-12">
                <div>
                  <h3 className="text-[10px] uppercase tracking-[0.4em] text-white/40 font-black mb-6">Experience</h3>
                  <div className="space-y-4">
                    {CATEGORIES.map(cat => (
                      <label key={cat} className="flex items-center group cursor-pointer">
                        <input type="checkbox" className="hidden" checked={activeFilters.includes(cat)} onChange={() => toggleFilter(cat)} />
                        <div className={`w-6 h-6 rounded-xl border-2 mr-4 flex items-center justify-center transition-all ${activeFilters.includes(cat) ? 'bg-secondary border-secondary scale-110 shadow-lg shadow-secondary/40' : 'border-white/10 group-hover:border-secondary'}`}>
                          {activeFilters.includes(cat) && <CheckCircle2 className="text-white" size={14} />}
                        </div>
                        <span className={`text-xs font-black uppercase tracking-widest transition-colors ${activeFilters.includes(cat) ? 'text-white' : 'text-white/30 group-hover:text-white'}`}>{cat}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-[10px] uppercase tracking-[0.4em] text-white/40 font-black mb-6">Refractive Price</h3>
                  <div className="space-y-6">
                    <input type="range" className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-secondary" />
                    <div className="flex justify-between text-[10px] font-black text-white/20 uppercase tracking-widest leading-none">
                      <span>MIN 5K</span>
                      <span>MAX 200K+</span>
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t border-white/5">
                  <div className="flex items-center space-x-4 text-secondary/40">
                    <ShieldCheck size={18} />
                    <span className="text-[9px] font-black uppercase tracking-[0.2em] leading-relaxed">Verified Captain Trips Only</span>
                  </div>
                </div>
              </div>
            </div>
          </aside>

          {/* Cinematic Wide Grid */}
          <div className="flex-grow">
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-12">
              <AnimatePresence mode="popLayout">
                {filteredTrips.map((trip) => (
                  <motion.div
                    key={trip.id}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    whileHover={{ y: -10 }}
                    className="group relative bg-charcoal rounded-[3.5rem] overflow-hidden border border-white/10 hover:border-secondary/20 transition-all duration-700 h-[650px] shadow-2xl"
                  >
                    {/* Image Visual */}
                    <div className="absolute inset-0 overflow-hidden">
                      <img src={trip.image} alt={trip.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[3s]" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"></div>

                      {/* Floating Tags */}
                      <div className="absolute top-10 left-10 flex gap-3">
                        <div className="liquid-glass text-white text-[10px] font-black uppercase px-6 py-2 rounded-full tracking-[0.2em] shadow-xl border-white/20">{trip.duration}</div>
                        <div className="bg-secondary text-white text-[10px] font-black uppercase px-6 py-2 rounded-full tracking-[0.2em] shadow-xl shadow-secondary/30">{trip.type}</div>
                      </div>

                      {/* Heart Toggle */}
                      <div className="absolute top-10 right-10 liquid-glass-dark w-12 h-12 rounded-2xl flex items-center justify-center border-white/10 hover:bg-secondary transition-all cursor-pointer">
                        <Star size={18} className="text-white opacity-40 hover:opacity-100" />
                      </div>
                    </div>

                    {/* Content Overlay */}
                    <div className="absolute bottom-0 left-0 right-0 p-12 space-y-6">
                      <div className="flex items-center space-x-3 text-secondary">
                        <MapPin size={16} />
                        <span className="text-[11px] font-black uppercase tracking-[0.4em] drop-shadow-md">{trip.location}</span>
                      </div>

                      <h3 className="text-4xl md:text-5xl font-display font-black text-white uppercase italic tracking-tighter leading-[0.8] mb-8 drop-shadow-2xl">
                        {trip.title}
                      </h3>

                      <div className="pt-10 flex flex-col md:flex-row justify-between items-end md:items-center border-t border-white/10 gap-8">
                        <div className="flex flex-col">
                          <span className="text-[9px] font-black text-white/30 uppercase tracking-[0.3em] mb-2">Total Expedition cost</span>
                          <div className="flex items-baseline space-x-2">
                            <span className="text-4xl font-display font-black text-white tracking-tighter">₹{trip.price}</span>
                            <span className="text-[10px] text-white/20 font-black uppercase">Individual</span>
                          </div>
                        </div>

                        <div className="flex items-center space-x-4 w-full md:w-auto">
                          <a
                            href={`https://wa.me/919601793485?text=${encodeURIComponent(`Hi Infi Yatra! I'm interested in the ${trip.title} package.`)}`}
                            target="_blank"
                            className="liquid-glass-dark p-5 rounded-2xl hover:bg-secondary text-white transition-all transform hover:scale-105 border border-white/10"
                          >
                            <MessageCircle size={24} />
                          </a>
                          <a
                            href={trip.link}
                            className="flex-grow md:flex-grow-0 bg-white text-charcoal px-12 py-5 rounded-2xl font-black text-[10px] uppercase tracking-[0.3em] hover:bg-secondary hover:text-white transition-all shadow-2xl transform hover:scale-105 active:scale-95 duration-500 text-center"
                          >
                            View Experience
                          </a>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {filteredTrips.length === 0 && (
              <div className="flex flex-col items-center justify-center py-40 text-center space-y-6">
                <div className="liquid-glass-dark w-24 h-24 rounded-[2rem] flex items-center justify-center text-white/10 border-white/5">
                  <Search size={40} />
                </div>
                <h3 className="text-3xl font-display font-black text-white/20 uppercase tracking-tighter italic">No matching adventures found...</h3>
                <button onClick={() => { setActiveFilters([]); setActiveType('All'); }} className="text-secondary font-black uppercase tracking-widest text-xs border-b-2 border-secondary/20 pb-1 hover:border-secondary transition-all">REVEAL ALL VOYAGES</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Discover
