import React from 'react'
import { motion } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import { MapPin, Calendar, Users, ShieldCheck, MessageCircle, ArrowRight, Star } from 'lucide-react'
import { getWhatsAppLink } from '../lib/data'
import ResponsiveImage from '../components/ResponsiveImage'

export default function HimachalPage() {
  const itinerary = [
    { day: "01", title: "Arrival in Manali", desc: "Acclimatization and local café exploration in Old Manali." },
    { day: "02", title: "Rohtang Pass Expedition", desc: "Breathtaking snow views and high-altitude photography." },
    { day: "03", title: "Kasol & Parvati Valley", desc: "Riverside camping and mystical vibes in the heart of the valley." },
    { day: "04", title: "Trek to Kheerganga", desc: "A spiritual journey to natural hot springs under the stars." },
    { day: "05", title: "The Return Journey", desc: "Shopping for local artifacts and departure for Ahmedabad." }
  ];

  return (
    <div className="bg-charcoal min-h-screen text-white">
      <Helmet>
        <title>Himachal Mystique — 6 Day Expedition | INFIYATRA</title>
        <meta name="description" content="Explore the rugged Himalayas with INFIYATRA. 6-day expedition through Manali, Kasol, and Kheerganga starting at ₹14,999." />
      </Helmet>
      <section className="relative h-[78svh] min-h-[580px] max-h-[860px] overflow-hidden">
        <ResponsiveImage
          src="/assets/himalayas-bg.jpg"
          alt="Himachal" 
          sizes="100vw"
          fetchPriority="high"
          loading="eager"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0c1d1b]/80 via-[#0c1d1b]/35 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-transparent to-black/25"></div>
        
        <div className="absolute inset-0 flex items-center pt-20">
          <div className="mx-auto w-full max-w-[1320px] px-5 text-left sm:px-8 lg:px-12">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-5 inline-flex rounded-full liquid-glass px-4 py-2"
            >
              <span className="text-secondary font-black uppercase tracking-[0.4em] text-[10px]">ULTIMATE EXPEDITION</span>
            </motion.div>
            <motion.h1 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="mb-6 font-display text-5xl font-black uppercase italic leading-[0.92] tracking-tight text-white drop-shadow-2xl sm:text-7xl lg:text-8xl"
            >
              HIMACHAL<br />
              <span className="text-[#9bd3c6]">MYSTIQUE</span>
            </motion.h1>
            
            <div className="flex flex-wrap justify-start gap-x-5 gap-y-3 border-b border-white/15 pb-5 sm:gap-x-7">
              {[
                { icon: MapPin, text: "Manali & Kasol" },
                { icon: Calendar, text: "6 DAYS / 5 NIGHTS" },
                { icon: Star, text: "4.9 RATING" }
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-wider text-white/80 sm:text-xs">
                  <item.icon className="text-secondary" size={16} />
                  <span>{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Trip Overview Content */}
      <section className="mx-auto grid max-w-6xl grid-cols-1 gap-8 px-5 py-14 sm:px-8 sm:py-20 lg:grid-cols-3 lg:gap-12 lg:px-12">
        <div className="lg:col-span-2 space-y-16">
          <div className="space-y-6">
            <h2 className="font-display text-2xl font-bold uppercase italic tracking-tight text-[#9bd3c6] sm:text-3xl">The adventure calling</h2>
            <p className="text-sm leading-relaxed text-white/65 sm:text-base">
              Join the Infi Yatra community as we venture into the rugged heart of the Himalayas. This isn't just a sightseeing tour; it's a soul-stirring journey through pine forests, snow-clad peaks, and the mystical Parvati Valley. Experience the authentic "Old Manali" lifestyle curated specifically for the Ahmedabad explorer.
            </p>
          </div>

          {/* Itinerary Timeline */}
          <div className="space-y-8">
            <h3 className="border-l-2 border-secondary pl-4 font-display text-xl font-bold uppercase tracking-tight">Detailed itinerary</h3>
            <div className="space-y-4">
              {itinerary.map((day, i) => (
                <motion.div 
                  key={i}
                  whileInView={{ opacity: 1, x: 0 }}
                  initial={{ opacity: 0, x: -20 }}
                  className="flex items-start gap-4 rounded-lg border border-white/10 liquid-glass p-4 transition-colors hover:bg-white/15 sm:items-center sm:gap-6 sm:p-5"
                >
                  <span className="font-display text-2xl font-bold text-secondary sm:text-3xl">{day.day}</span>
                  <div>
                    <h4 className="mb-1 font-display text-base font-bold uppercase tracking-tight sm:text-lg">{day.title}</h4>
                    <p className="text-xs leading-relaxed text-white/55 sm:text-sm">{day.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Sticky Booking Widget */}
        <div className="lg:col-span-1">
          <div className="rounded-lg liquid-glass p-5 shadow-xl sm:p-6 lg:sticky lg:top-28">
            <div className="mb-6">
              <span className="text-[10px] font-semibold uppercase tracking-wider text-white/50">Package from / person</span>
              <p className="mt-1 font-display text-4xl font-bold tracking-tight text-white">₹14,999</p>
            </div>
            
            <div className="mb-6 space-y-4">
              <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-white/65">
                <span>Inclusions</span>
                <span className="text-secondary text-[10px]">ALL INCLUSIVE</span>
              </div>
              <ul className="space-y-4">
                {["Luxury Transport", "Standard Stay", "Breakfast & Dinner", "Professional Captain"].map((inc, i) => (
                  <li key={i} className="flex items-center gap-3 text-xs font-medium text-white/80">
                    <ShieldCheck size={14} className="text-green-500" />
                    <span>{inc}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-4">
              <a href={getWhatsAppLink('Hi! I want to book the Himachal Mystique trip.')} target="_blank" rel="noopener noreferrer" className="flex min-h-12 w-full items-center justify-center rounded-lg bg-secondary px-4 text-xs font-bold uppercase tracking-wider text-white transition-colors hover:bg-secondary-light">
                Book My Adventure
              </a>
              <a 
                href={getWhatsAppLink("Hi! I want to book the Himachal Mystique trip.")}
                target="_blank"
                className="flex min-h-12 w-full items-center justify-center gap-2 rounded-lg liquid-glass text-sm text-white transition-colors hover:bg-white/20"
              >
                <MessageCircle size={18} className="text-green-500" />
                <span className="text-[10px] font-black uppercase tracking-[0.2em]">Contact Captain</span>
              </a>
            </div>

            <div className="mt-8 text-center px-4">
              <p className="text-[9px] text-white/20 font-black uppercase tracking-widest leading-relaxed">Secured booking guaranteed with verified community badges.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Destinations CTA */}
      <section className="border-t border-white/10 bg-[#102522] py-14 sm:py-20">
        <div className="mx-auto max-w-6xl px-5 sm:px-8 lg:px-12">
          <h2 className="mb-6 font-display text-3xl font-black uppercase italic tracking-tight sm:text-4xl">Looking for <span className="text-secondary">more?</span></h2>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
             {["Spiti", "Ladakh", "Srinagar", "Shimla"].map((place, i) => (
               <div key={i} className="rounded-lg liquid-glass p-4 text-center sm:p-5">
                 <h4 className="font-display text-base font-bold uppercase sm:text-lg">{place}</h4>
               </div>
             ))}
          </div>
        </div>
      </section>
    </div>
  )
}
