import React from 'react'
import { motion } from 'framer-motion'
import { CheckCircle2, ShieldCheck, MapPin, Star, UserCheck, MessageCircle, Heart, Users, Share2, Compass } from 'lucide-react'

const PageLayout = ({ children, title, subtitle, className = "" }: { children: React.ReactNode, title: React.ReactNode, subtitle?: string, className?: string }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className={`min-h-screen pt-32 pb-24 bg-charcoal text-white ${className}`}
  >
    <div className="max-w-[1800px] mx-auto px-6 md:px-12 lg:px-20">
      <div className="mb-24 space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="liquid-glass inline-block px-6 py-2 rounded-full border-white/10"
        >
          <span className="text-secondary font-black uppercase tracking-[0.4em] text-[10px]">CRAFTING MEMORIES</span>
        </motion.div>
        <motion.h1
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-6xl md:text-[9rem] font-display font-black text-white tracking-tighter uppercase leading-[0.8] liquid-text italic"
        >
          {title}
        </motion.h1>
        {subtitle && (
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-white/40 mt-10 font-medium max-w-3xl italic leading-relaxed"
          >
            {subtitle}
          </motion.p>
        )}
      </div>
      {children}
    </div>
  </motion.div>
)

const About = () => (
  <PageLayout
    title={<>THE INFI<br /><span className="text-primary px-4 drop-shadow-2xl" style={{ WebkitTextStroke: '2px white' }}>YATRA</span> SPIRIT</>}
    subtitle="Infi Yatra is Ahmedabad's premier authentic travel community. We don't just book tours; we craft soul-stirring memories that resonate for a lifetime."
  >
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className="space-y-12"
      >
        <div className="space-y-6">
          <h2 className="text-4xl font-display font-black uppercase italic tracking-tighter text-secondary">Our Manifest</h2>
          <p className="text-lg text-white/60 leading-relaxed font-medium italic">
            Born from a simple desire: to make travel meaningful, accessible, and deeply community-driven for the people of Ahmedabad. We believe that every journey should be an exploration of both the world and the inner self.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {[
            { icon: UserCheck, title: "Verified Captains", desc: "Led by Ahmedabad-local experts who live and breathe the terrain." },
            { icon: ShieldCheck, title: "Safety First", desc: "Rigorous safety protocols and 24/7 SOS support for peace of mind." },
            { icon: Users, title: "Community First", desc: "Not just travelers, but a tribe of explorers bound by curiosity." },
            { icon: Compass, title: "Pure Discovery", desc: "Uncovering hidden trails and authentic local stories." }
          ].map((item, i) => (
            <div key={i} className="liquid-glass p-8 rounded-[2.5rem] border-white/5 space-y-4 hover:bg-white/5 transition-all group">
              <div className="bg-secondary/20 p-4 rounded-2xl w-fit group-hover:scale-110 transition-transform">
                <item.icon className="text-secondary" size={24} />
              </div>
              <h4 className="font-display font-black text-xl uppercase italic tracking-tighter group-hover:text-secondary transition-all">{item.title}</h4>
              <p className="text-xs text-white/30 font-black uppercase tracking-widest leading-loose">{item.desc}</p>
            </div>
          ))}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="relative rounded-[5rem] overflow-hidden group shadow-2xl h-[700px] border-white/10"
      >
        <img src="/assets/LBK.jpeg" className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-[3s]" />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-black/20 to-transparent"></div>
        <div className="absolute bottom-16 left-16 right-16">
          <div className="liquid-glass p-8 rounded-[3rem] border-white/20 text-center">
            <p className="text-5xl font-display font-black text-white italic drop-shadow-xl tracking-tighter">"100+ Journeys Crafted"</p>
            <p className="text-[10px] text-white/40 uppercase font-black tracking-[0.4em] mt-4">Founded for the Ahmedabad Spirit</p>
          </div>
        </div>
      </motion.div>
    </div>
  </PageLayout>
)

const Community = () => (
  <PageLayout
    title={<>TRAVELER<br /><span className="text-secondary italic px-4 drop-shadow-2xl" style={{ WebkitTextStroke: '2px white' }}>ELITE</span> HUB</>}
    subtitle="The digital campfire for our global tribe. Connect with fellow explorers, share road-side epiphanies, and find your next expedition partner."
  >
    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-24">
      {[
        { title: "Tribe Chat", icon: MessageCircle, color: "bg-blue-500/10", desc: "Instant connectivity with travelers on your upcoming voyage." },
        { title: "Memory Share", icon: Share2, color: "bg-orange-500/10", desc: "A cinematic gallery of stories told through raw adventurer lenses." },
        { title: "Local Intel", icon: MapPin, color: "bg-teal-500/10", desc: "Crowdsourced secret spots and authentic local experiences." }
      ].map((card, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 }}
          whileHover={{ y: -15 }}
          className="liquid-glass-dark p-12 rounded-[4rem] border border-white/5 flex flex-col items-center justify-center text-center space-y-8 h-[500px] group overflow-hidden relative shadow-2xl"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/5 blur-3xl rounded-full"></div>
          <div className={`${card.color} p-8 rounded-[2.5rem] group-hover:scale-125 transition-all duration-700 shadow-xl shadow-black/20`}>
            <card.icon className="text-secondary" size={48} />
          </div>
          <div className="space-y-4 relative z-10">
            <h3 className="text-3xl font-display font-black uppercase italic tracking-tighter group-hover:text-secondary transition-all">{card.title}</h3>
            <p className="text-sm text-white/40 font-black uppercase tracking-widest leading-loose max-w-[240px] px-2">{card.desc}</p>
          </div>
          <button className="bg-white/5 text-white/20 px-8 py-3 rounded-full text-[9px] font-black uppercase tracking-widest group-hover:bg-secondary group-hover:text-white transition-all">ENTER HUB</button>
        </motion.div>
      ))}
    </div>

    {/* Community Impact Section */}
    <div className="liquid-glass p-20 rounded-[5rem] border-white/10 text-center space-y-12">
      <h2 className="text-4xl md:text-6xl font-display font-black uppercase italic tracking-tighter text-white">Our Shared <span className="text-primary">Legacy</span></h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
        {[
          { value: "45k+", label: "ACTIVE TRIBE" },
          { value: "180+", label: "EXPEDITIONS" },
          { value: "92%", label: "RETURNING SOULS" },
          { value: " Ahmedabad's #1", label: "RATED COMMUNITY" }
        ].map((stat, i) => (
          <div key={i} className="space-y-2">
            <p className="text-4xl md:text-5xl font-display font-black text-secondary tracking-tighter italic">{stat.value}</p>
            <p className="text-[10px] text-white/40 font-black uppercase tracking-[0.4em]">{stat.label}</p>
          </div>
        ))}
      </div>
    </div>
  </PageLayout>
)

const Wishlist = () => (
  <PageLayout
    title={<>YOUR<br /><span className="text-primary italic px-4 drop-shadow-2xl" style={{ WebkitTextStroke: '2px white' }}>DREAMS</span></>}
    subtitle="The vault of adventures awaiting your signal. Keep track of the soul-stirring voyages you're planning to conquer."
  >
    <div className="liquid-glass-dark py-40 rounded-[5rem] border-white/5 text-center shadow-2xl">
      <div className="relative inline-block mb-12">
        <Heart size={100} className="mx-auto text-white/5 fill-white/5 group-hover:fill-secondary/20 transition-all scale-110" />
        <Star size={40} className="absolute -top-4 -right-4 text-secondary animate-pulse" />
      </div>
      <h3 className="text-4xl font-display font-black uppercase italic tracking-tighter text-white/20 mb-10">Your Expedition Vault is Empty</h3>
      <a
        href="/discover"
        className="inline-block bg-white text-charcoal px-16 py-6 rounded-2xl font-black text-xs uppercase tracking-[0.4em] hover:bg-secondary hover:text-white transition-all shadow-2xl shadow-black/40 active:scale-95 duration-500"
      >
        UNCOVER DESTINATIONS
      </a>
    </div>
  </PageLayout>
)

export { About, Community, Wishlist }
