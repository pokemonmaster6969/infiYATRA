import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import { Anchor, ShieldCheck, MapPin, Clock, Star, MessageCircle, ArrowUpRight, Compass, Sparkles, Utensils, Waves, Music, Tv } from 'lucide-react'
import { getTrips, optimizeImageUrl } from '../lib/dataService'
import { getTripWhatsAppLink } from '../lib/trips'
import { haptics } from '../lib/haptics'

const CruisePage = () => {
  const [cruises, setCruises] = useState<any[]>([])

  useEffect(() => {
    getTrips().then(allTrips => {
      const filtered = allTrips.filter(t => t.category === 'Cruise')
      setCruises(filtered)
    })
  }, [])

  return (
    <div className="min-h-screen bg-charcoal text-white pt-28 pb-20">
      <Helmet>
        <title>Luxury Ocean & Coastal Cruise Packages — INFIYATRA Voyages</title>
        <meta name="description" content="Sail through Goa, Lakshadweep, Singapore, and Thailand on 5-star luxury cruise liners. Book your dream cruise holiday today with Infi Yatra." />
      </Helmet>

      {/* Hero Header */}
      <div className="max-w-[1920px] mx-auto px-6 md:px-12 lg:px-20 mb-16">
        <div className="relative rounded-[3.5rem] overflow-hidden border border-white/10 p-8 md:p-16 lg:p-24 shadow-2xl bg-gradient-to-r from-blue-950/80 via-charcoal to-black">
          <div className="absolute inset-0 z-0">
            <img
              src="/assets/dubai.jpg"
              alt="Cruise Background"
              className="w-full h-full object-cover opacity-20"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/60 to-transparent" />
          </div>

          <div className="relative z-10 space-y-6 max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-5 py-2 rounded-full liquid-glass border border-white/20"
            >
              <Anchor size={14} className="text-secondary animate-bounce" />
              <span className="text-[10px] font-black uppercase tracking-[0.35em] text-secondary">
                LUXURY CRUISE COLLECTION 2026
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-6xl lg:text-7xl font-display font-black uppercase italic tracking-tighter leading-none liquid-text"
            >
              Set Sail Into <br />
              <span className="text-primary" style={{ WebkitTextStroke: '1px white' }}>The Horizon</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-white/60 text-lg md:text-xl font-medium italic max-w-2xl leading-relaxed"
            >
              Experience 5-star floating resorts across the Arabian Sea & Indian Ocean. Fine dining, oceanview suites, coral island landings, and unforgettable entertainment on deck.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-wrap gap-4 pt-4"
            >
              <Link
                to="/customize"
                onClick={() => haptics.medium()}
                className="px-8 py-4 bg-secondary text-white rounded-full font-black text-xs uppercase tracking-widest hover:bg-white hover:text-charcoal transition-all shadow-2xl shadow-secondary/30 flex items-center gap-2"
              >
                <Compass size={16} />
                Customize Cruise Itinerary
              </Link>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Cruise Inclusions Highlights Bar */}
      <div className="max-w-[1920px] mx-auto px-6 md:px-12 lg:px-20 mb-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { icon: Utensils, title: "5-Star Deck Dining", desc: "Unlimited multi-cuisine buffets & specialty chef dining" },
            { icon: Waves, title: "Ocean Infinity Pools", desc: "Jacuzzis, sun decks, water slides & seaside lounges" },
            { icon: Music, title: "Broadway Shows", desc: "Live music, comedy clubs, musicals & casino nights" },
            { icon: Sparkles, title: "Island Shore Tours", desc: "Snorkeling, coral reef landings & tender boat trips" }
          ].map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="liquid-glass-dark p-6 rounded-[2.5rem] border border-white/10 space-y-3 hover:border-secondary/40 transition-all shadow-xl group"
            >
              <div className="w-12 h-12 rounded-2xl bg-secondary/20 flex items-center justify-center text-secondary group-hover:scale-110 transition-transform">
                <item.icon size={22} />
              </div>
              <h3 className="font-display font-black text-lg uppercase italic tracking-tighter text-white group-hover:text-secondary transition-colors">
                {item.title}
              </h3>
              <p className="text-white/40 text-xs font-medium italic leading-relaxed">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Featured Cruise Packages Section */}
      <div className="max-w-[1920px] mx-auto px-6 md:px-12 lg:px-20 mb-24">
        <div className="flex justify-between items-end mb-12">
          <div>
            <span className="text-secondary font-black uppercase tracking-[0.4em] text-[10px]">CURATED OCEAN VOYAGES</span>
            <h2 className="text-3xl md:text-5xl font-display font-black uppercase italic tracking-tighter text-white mt-1">
              Top Cruise <span className="text-primary">Expeditions</span>
            </h2>
          </div>
          <Link
            to="/discover"
            onClick={() => haptics.light()}
            className="hidden md:flex items-center gap-2 text-xs font-black uppercase tracking-widest text-secondary hover:text-white transition-colors"
          >
            View All Packages <ArrowUpRight size={16} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence>
            {cruises.map((trip, idx) => (
              <motion.div
                key={trip.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -6 }}
                className="group relative liquid-glass-dark rounded-[2.5rem] overflow-hidden border border-white/10 hover:border-secondary/50 transition-all duration-500 flex flex-col shadow-2xl"
              >
                <div className="relative h-60 overflow-hidden">
                  <img
                    src={optimizeImageUrl(trip.image, 800, 80)}
                    alt={trip.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[2s]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-transparent to-transparent" />
                  <div className="absolute top-4 left-4">
                    <span className="liquid-glass text-white text-[10px] font-black uppercase px-4 py-1.5 rounded-full tracking-[0.2em] border-white/20 flex items-center gap-1.5">
                      <Anchor size={12} className="text-secondary" />
                      {trip.duration}
                    </span>
                  </div>
                </div>

                <div className="p-6 flex-grow flex flex-col space-y-4">
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2 text-secondary">
                      <MapPin size={12} />
                      <span className="text-[10px] font-black uppercase tracking-[0.2em]">{trip.location}</span>
                    </div>
                    <h3 className="text-2xl font-display font-black text-white uppercase italic tracking-tighter leading-tight group-hover:text-secondary transition-colors">
                      {trip.title}
                    </h3>
                  </div>

                  <p className="text-white/50 text-xs font-medium italic leading-relaxed line-clamp-3">
                    {trip.description}
                  </p>

                  {/* Highlights Pill list */}
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {trip.highlights?.slice(0, 3).map((hl: string, hIdx: number) => (
                      <span key={hIdx} className="text-[9px] font-black uppercase tracking-wider bg-white/5 border border-white/10 px-3 py-1 rounded-full text-white/70">
                        ✓ {hl}
                      </span>
                    ))}
                  </div>

                  <div className="pt-6 border-t border-white/10 flex justify-between items-end mt-auto">
                    <div>
                      <span className="text-[8px] font-black text-white/30 uppercase tracking-[0.3em]">All Inclusive From</span>
                      <div className="text-3xl font-display font-black text-white tracking-tighter">₹{trip.price}</div>
                    </div>

                    <div className="flex items-center gap-2">
                      <a
                        href={getTripWhatsAppLink(trip.title)}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => haptics.medium()}
                        className="liquid-glass text-white p-3 rounded-2xl hover:bg-secondary transition-all"
                      >
                        <MessageCircle size={18} />
                      </a>
                      <Link
                        to={`/trip/${trip.id}`}
                        onClick={() => haptics.medium()}
                        className="bg-white text-charcoal px-6 py-3 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-secondary hover:text-white transition-all shadow-xl"
                      >
                        View Cruise
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Cabin Staterooms Showcase */}
      <div className="max-w-[1920px] mx-auto px-6 md:px-12 lg:px-20 mb-20">
        <div className="liquid-glass p-8 md:p-16 rounded-[3.5rem] border border-white/10 text-center space-y-8 shadow-2xl">
          <h2 className="text-3xl md:text-5xl font-display font-black uppercase italic tracking-tighter text-white">
            Choose Your Floating <span className="text-secondary">Stateroom</span>
          </h2>
          <p className="text-white/50 text-sm max-w-xl mx-auto italic">
            From oceanview staterooms to expansive royal penthouses with private Jacuzzi balconies.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left pt-4">
            {[
              { name: "Oceanview Cabin", desc: "Panoramic ocean window, king plush bed, 24/7 cabin room service", price: "Included in standard package" },
              { name: "Private Balcony Suite", desc: "Private open-air veranda, ocean breeze lounge chairs, VIP priority boarding", price: "+ ₹8,500 upgrade" },
              { name: "Royal Penthouse Suite", desc: "2-Story suite, private butler service, jacuzzi balcony, complimentary champagne", price: "+ ₹24,000 upgrade" }
            ].map((cabin, cIdx) => (
              <div key={cIdx} className="liquid-glass-dark p-6 rounded-[2.5rem] border border-white/10 space-y-4 hover:border-secondary transition-all">
                <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center text-primary font-bold text-lg">
                  0{cIdx + 1}
                </div>
                <h3 className="font-display font-black text-xl text-white uppercase italic">{cabin.name}</h3>
                <p className="text-xs text-white/50 italic leading-relaxed">{cabin.desc}</p>
                <div className="text-[10px] font-black text-secondary uppercase tracking-widest pt-2 border-t border-white/10">
                  {cabin.price}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default CruisePage
