import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MapPin, MessageCircle } from 'lucide-react'

const MOCK_TRIPS = [
  {
    id: 1,
    title: 'Mystical Manali & Spiti Valley',
    location: 'Himachal Pradesh',
    price: '₹14,999',
    days: '6 Days',
    type: 'Domestic',
    image: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 2,
    title: 'Kerala: God\'s Own Country',
    location: 'Munnar & Alleppey',
    price: '₹18,499',
    days: '5 Days',
    type: 'Domestic',
    image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 3,
    title: 'Western Ghats Expedition',
    location: 'Coorg & Chikmagalur',
    price: '₹12,499',
    days: '4 Days',
    type: 'Domestic',
    image: 'https://images.unsplash.com/photo-1593181629936-11c609b8db9b?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 4,
    title: 'Azure Bali Escape',
    location: 'Ubud & Seminyak',
    price: '₹54,999',
    days: '8 Days',
    type: 'International',
    image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 5,
    title: 'Thai Island Perfection',
    location: 'Phuket & Krabi',
    price: '₹48,999',
    days: '7 Days',
    type: 'International',
    image: 'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 6,
    title: 'Seychelles Paradise',
    location: 'Mahé & Praslin',
    price: '₹1,24,999',
    days: '9 Days',
    type: 'International',
    image: '/assets/seychelles.jpg'
  }
];

export default function FeaturedPackages() {
  const [category, setCategory] = useState<'Domestic' | 'International'>('Domestic')

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl md:text-6xl font-display font-black text-charcoal tracking-tighter uppercase italic leading-none">
            Explore Our <span className="text-primary">Masterpieces</span>
          </h2>
          <p className="text-gray-400 font-medium text-lg max-w-xl mx-auto italic">Authentic journeys curated for the Ahmedabad explorer.</p>
        </div>

        <div className="flex justify-center mb-20">
          <div className="bg-gray-50/80 backdrop-blur-md p-1.5 rounded-full border border-gray-100 shadow-inner flex">
            {['Domestic', 'International'].map((tab) => (
              <button
                key={tab}
                onClick={() => setCategory(tab as 'Domestic' | 'International')}
                className={`px-10 py-3.5 rounded-full text-xs font-black uppercase tracking-widest transition-all duration-500 ${category === tab
                  ? 'bg-primary text-white shadow-xl shadow-primary/30'
                  : 'text-gray-400 hover:text-charcoal'
                  }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          <AnimatePresence mode="wait">
            {MOCK_TRIPS.filter(t => t.type === category).map((trip) => (
              <motion.div
                key={trip.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="group relative bg-white rounded-[2.5rem] overflow-hidden shadow-2xl shadow-gray-200/50 border border-gray-100 transition-all duration-500"
              >
                <div className="relative h-[480px] overflow-hidden">
                  <img
                    src={trip.image}
                    alt={trip.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

                  <div className="absolute top-6 left-6">
                    <span className="bg-white/90 backdrop-blur-md text-charcoal text-[10px] font-black uppercase px-4 py-2 rounded-full tracking-widest shadow-lg">{trip.days}</span>
                  </div>

                  <div className="absolute bottom-8 left-8 right-8 space-y-4">
                    <div className="flex items-center space-x-2 text-secondary/90">
                      <MapPin size={14} className="fill-secondary/20" />
                      <span className="text-[10px] font-black uppercase tracking-[0.2em]">{trip.location}</span>
                    </div>
                    <h3 className="text-2xl font-display font-black text-white uppercase tracking-tighter leading-[0.9] italic group-hover:text-secondary transition-all duration-500">{trip.title}</h3>

                    <div className="pt-6 flex justify-between items-center border-t border-white/10">
                      <div className="flex flex-col">
                        <span className="text-[10px] font-black text-white/40 uppercase tracking-widest mb-1">Starts At</span>
                        <span className="text-2xl font-display font-black text-white tracking-tighter">{trip.price}</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <a
                          href={`https://wa.me/919601793485?text=${encodeURIComponent(`Hi Infi Yatra! I'm interested in the ${trip.title} package.`)}`}
                          target="_blank"
                          className="bg-green-500/20 backdrop-blur-md text-green-500 p-3.5 rounded-2xl hover:bg-green-500 hover:text-white transition-all transform hover:scale-105 border border-green-500/20 shadow-lg"
                        >
                          <MessageCircle size={18} />
                        </a>
                        <button className="bg-white text-charcoal px-8 py-3.5 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-secondary hover:text-white transition-all shadow-xl">Details</button>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <div className="mt-20 text-center">
          <button className="text-primary font-black uppercase tracking-[0.3em] text-xs border-b-2 border-primary/20 pb-2 hover:border-primary transition-all">View All Adventures Hub</button>
        </div>
      </div>
    </section>
  )
}
