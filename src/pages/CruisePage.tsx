import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import { Anchor, ShieldCheck, MapPin, Clock, Star, MessageCircle, ArrowUpRight, Compass, Sparkles, Utensils, Waves, Music, Tv } from 'lucide-react'
import { getTrips } from '../lib/dataService'
import { getTripWhatsAppLink } from '../lib/trips'
import { haptics } from '../lib/haptics'
import ResponsiveImage from '../components/ResponsiveImage'

const CruisePage = () => {
  const [cruises, setCruises] = useState<any[]>([])

  useEffect(() => {
    getTrips().then(allTrips => {
      const filtered = allTrips.filter(t => t.category === 'Cruise')
      setCruises(filtered)
    })
  }, [])

  return (
    <div className="min-h-screen bg-charcoal pb-16 pt-24 text-white sm:pb-20 sm:pt-28">
      <Helmet>
        <title>Luxury Ocean & Coastal Cruise Packages — INFIYATRA Voyages</title>
        <meta name="description" content="Sail through Goa, Lakshadweep, Singapore, and Thailand on 5-star luxury cruise liners. Book your dream cruise holiday today with Infi Yatra." />
      </Helmet>

      {/* Hero Header */}
      <div className="mx-auto mb-12 max-w-[1320px] px-5 sm:px-8 lg:px-12">
        <div className="relative min-h-[380px] overflow-hidden rounded-xl border border-white/10 bg-[#193431] p-6 sm:min-h-[440px] sm:p-10 lg:p-14">
          <div className="absolute inset-0 z-0">
            <ResponsiveImage
              src="/assets/dubai.jpg"
              alt="Cruise Background"
              sizes="100vw"
              className="h-full w-full object-cover opacity-35"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0c1d1b]/95 via-[#0c1d1b]/65 to-[#0c1d1b]/20" />
          </div>

          <div className="relative z-10 space-y-6 max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 rounded-full liquid-glass px-4 py-2"
            >
              <Anchor size={14} className="text-secondary animate-bounce" />
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-secondary">
                LUXURY CRUISE COLLECTION 2026
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="font-display text-3xl font-black uppercase italic leading-[1.02] tracking-tight text-white sm:text-5xl lg:text-6xl"
            >
              Set Sail Into <br />
              <span className="text-[#9bd3c6]">The horizon</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="max-w-2xl text-sm leading-relaxed text-white/70 sm:text-base lg:text-lg"
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
                className="inline-flex min-h-12 items-center gap-2 rounded-lg bg-secondary px-5 text-xs font-bold uppercase tracking-wider text-white transition-colors hover:bg-secondary-light"
              >
                <Compass size={16} />
                Customize Cruise Itinerary
              </Link>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Cruise Inclusions Highlights Bar */}
      <div className="mx-auto mb-14 max-w-[1320px] px-5 sm:px-8 lg:px-12">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
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
              className="rounded-lg border border-white/10 bg-white/[0.025] p-4 transition-colors hover:border-white/20 sm:p-5"
            >
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full liquid-glass text-[#f2b898]">
                <item.icon size={19} />
              </div>
              <h3 className="font-display text-sm font-bold uppercase leading-tight tracking-tight text-white sm:text-base">
                {item.title}
              </h3>
              <p className="mt-1 text-[11px] leading-relaxed text-white/50 sm:text-xs">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Featured Cruise Packages Section */}
      <div className="mx-auto mb-16 max-w-[1320px] px-5 sm:px-8 lg:px-12">
        <div className="mb-7 flex items-end justify-between gap-3 sm:mb-9">
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

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence>
            {cruises.map((trip, idx) => (
              <motion.div
                key={trip.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -6 }}
                className="group relative flex flex-col overflow-hidden rounded-lg border border-white/10 bg-white/[0.025] transition-colors hover:border-white/20"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-[#193431]">
                  <ResponsiveImage
                    src={trip.image}
                    alt={trip.title}
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0c1d1b]/70 via-transparent to-transparent" />
                  <div className="absolute top-4 left-4">
                    <span className="liquid-glass text-white text-[10px] font-black uppercase px-4 py-1.5 rounded-full tracking-[0.2em] border-white/20 flex items-center gap-1.5">
                      <Anchor size={12} className="text-secondary" />
                      {trip.duration}
                    </span>
                  </div>
                </div>

                  <div className="flex flex-grow flex-col space-y-3 p-4 sm:p-5">
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2 text-secondary">
                      <MapPin size={12} />
                      <span className="text-[10px] font-black uppercase tracking-[0.2em]">{trip.location}</span>
                    </div>
                    <h3 className="font-display text-xl font-bold uppercase leading-tight tracking-tight text-white transition-colors group-hover:text-secondary">
                      {trip.title}
                    </h3>
                  </div>

                  <p className="line-clamp-3 text-xs leading-relaxed text-white/55">
                    {trip.description}
                  </p>

                  {/* Highlights Pill list */}
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {trip.highlights?.slice(0, 3).map((hl: string, hIdx: number) => (
                      <span key={hIdx} className="rounded-md border border-white/10 bg-white/[0.04] px-2 py-1 text-[9px] font-medium text-white/65">
                        ✓ {hl}
                      </span>
                    ))}
                  </div>

                  <div className="mt-auto flex items-end justify-between gap-2 border-t border-white/10 pt-3">
                    <div>
                      <span className="text-[9px] font-semibold uppercase tracking-wider text-white/45">From / person</span>
                      <div className="font-display text-2xl font-bold tracking-tight text-white">₹{trip.price}</div>
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
      <div className="mx-auto mb-16 max-w-[1320px] px-5 sm:px-8 lg:px-12">
        <div className="rounded-xl liquid-glass p-5 sm:p-8 lg:p-10">
          <div className="mb-6 space-y-2 text-left sm:mb-8">
          <h2 className="font-display text-2xl font-black uppercase italic tracking-tight text-white sm:text-4xl">
            Choose Your Floating <span className="text-secondary">Stateroom</span>
          </h2>
          <p className="max-w-xl text-sm leading-relaxed text-white/60">
            From oceanview staterooms to expansive royal penthouses with private Jacuzzi balconies.
          </p>

          </div>
          <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
            {[
              { name: "Oceanview Cabin", desc: "Panoramic ocean window, king plush bed, 24/7 cabin room service", price: "Included in standard package" },
              { name: "Private Balcony Suite", desc: "Private open-air veranda, ocean breeze lounge chairs, VIP priority boarding", price: "+ ₹8,500 upgrade" },
              { name: "Royal Penthouse Suite", desc: "2-Story suite, private butler service, jacuzzi balcony, complimentary champagne", price: "+ ₹24,000 upgrade" }
            ].map((cabin, cIdx) => (
              <div key={cIdx} className="rounded-lg border border-white/10 bg-[#0c1d1b]/30 p-4">
                <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-full liquid-glass text-sm font-bold text-[#9bd3c6]">
                  0{cIdx + 1}
                </div>
                <h3 className="font-display text-base font-bold uppercase text-white">{cabin.name}</h3>
                <p className="mt-2 text-xs leading-relaxed text-white/55">{cabin.desc}</p>
                <div className="mt-3 border-t border-white/10 pt-3 text-[10px] font-semibold uppercase tracking-wider text-secondary">
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
