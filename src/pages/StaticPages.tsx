import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import { CheckCircle2, ShieldCheck, MapPin, Star, UserCheck, MessageCircle, Heart, Users, Share2, Compass } from 'lucide-react'
import ResponsiveImage from '../components/ResponsiveImage'

const PageLayout = ({ children, title, subtitle, seoTitle, seoDescription, className = "" }: { children: React.ReactNode, title: React.ReactNode, subtitle?: string, seoTitle?: string, seoDescription?: string, className?: string }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className={`min-h-screen bg-charcoal pb-16 pt-24 text-white sm:pb-20 sm:pt-28 ${className}`}
  >
    {seoTitle && (
      <Helmet>
        <title>{seoTitle}</title>
        {seoDescription && <meta name="description" content={seoDescription} />}
      </Helmet>
    )}
    <div className="mx-auto max-w-[1320px] px-5 sm:px-8 lg:px-12">
      <div className="mb-10 max-w-4xl space-y-4 sm:mb-14">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex rounded-full liquid-glass px-4 py-2"
        >
          <span className="text-secondary font-black uppercase tracking-[0.4em] text-[9px]">CRAFTING MEMORIES</span>
        </motion.div>
        <motion.h1
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="font-display text-4xl font-black uppercase italic leading-[0.95] tracking-tight text-white sm:text-6xl lg:text-7xl"
        >
          {title}
        </motion.h1>
        {subtitle && (
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="mt-3 max-w-2xl text-sm leading-relaxed text-white/60 sm:text-base"
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
    seoTitle="About INFIYATRA — Ahmedabad's Premier Travel Community"
    seoDescription="Learn about Infi Yatra's mission to make travel meaningful, accessible, and community-driven for Ahmedabad."
    title={<>THE INFI<br /><span className="text-primary px-4 drop-shadow-2xl" style={{ WebkitTextStroke: '2px white' }}>YATRA</span> SPIRIT</>}
    subtitle="Infi Yatra is Ahmedabad's premier authentic travel community. We don't just book tours; we craft soul-stirring memories that resonate for a lifetime."
  >
    <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-12">
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[
            { icon: UserCheck, title: "Verified Captains", desc: "Led by Ahmedabad-local experts who live and breathe the terrain." },
            { icon: ShieldCheck, title: "Safety First", desc: "Rigorous safety protocols and 24/7 SOS support for peace of mind." },
            { icon: Users, title: "Community First", desc: "Not just travelers, but a tribe of explorers bound by curiosity." },
            { icon: Compass, title: "Pure Discovery", desc: "Uncovering hidden trails and authentic local stories." }
          ].map((item, i) => (
            <div key={i} className="liquid-glass-dark p-8 rounded-[2.5rem] border border-white/10 space-y-4 hover:border-secondary/30 transition-all shadow-xl group">
              <div className="bg-secondary/20 p-4 rounded-2xl w-fit group-hover:scale-110 transition-transform">
                <item.icon className="text-secondary" size={24} />
              </div>
              <h4 className="font-display font-black text-xl uppercase italic tracking-tighter text-white group-hover:text-secondary transition-all">{item.title}</h4>
              <p className="text-[10px] text-white/40 font-black uppercase tracking-widest leading-loose">{item.desc}</p>
            </div>
          ))}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="group relative h-[360px] overflow-hidden rounded-xl border border-white/10 shadow-xl sm:h-[480px] lg:h-[600px]"
      >
        <ResponsiveImage src="/assets/LBK.jpeg" alt="Travelers exploring a mountain destination" sizes="(max-width: 1024px) 100vw, 50vw" loading="lazy" className="absolute inset-0 h-full w-full object-cover group-hover:scale-105 transition-transform duration-[3s]" />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-black/20 to-transparent"></div>
        <div className="absolute bottom-12 left-12 right-12">
          <div className="rounded-lg liquid-glass p-5 text-left shadow-xl sm:p-7">
            <p className="font-display text-2xl font-bold text-white sm:text-3xl">“100+ journeys crafted”</p>
            <p className="mt-2 text-[10px] font-semibold uppercase tracking-wider text-white/60">Founded for the Ahmedabad spirit</p>
          </div>
        </div>
      </motion.div>
    </div>
  </PageLayout>
)

const Community = () => (
  <PageLayout
    seoTitle="Community & Socials — Join the INFIYATRA Tribe"
    seoDescription="Connect with 45K+ fellow travelers. Share stories, find expedition partners, and access local intel."
    title={<>TRAVELER<br /><span className="text-secondary italic px-4 drop-shadow-2xl" style={{ WebkitTextStroke: '2px white' }}>ELITE</span> HUB</>}
    subtitle="The digital campfire for our global tribe. Connect with fellow explorers, share road-side epiphanies, and find your next expedition partner."
  >
    {/* Moments / Group Images Section */}
    <div className="mb-14">
      <div className="mb-7">
        <h2 className="font-display text-2xl font-black uppercase italic tracking-tight text-white sm:text-4xl">Moments <span className="text-primary-light">captured</span></h2>
        <p className="mt-2 text-sm text-white/50">Real smiles, real connections.</p>
      </div>
      <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="group relative h-[300px] overflow-hidden rounded-lg border border-white/10 shadow-xl sm:h-[400px]"
        >
          <ResponsiveImage src="/assets/group.jpeg" alt="Travel group sharing a journey" sizes="(max-width: 1024px) 100vw, 50vw" loading="lazy" className="absolute inset-0 h-full w-full object-cover group-hover:scale-105 transition-transform duration-[3s]" />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-black/20 to-transparent"></div>
          <div className="absolute bottom-10 left-10">
            <p className="text-3xl font-display font-black text-white italic drop-shadow-xl tracking-tighter">The First Step</p>
            <p className="text-[10px] text-secondary uppercase font-black tracking-[0.3em] mt-2">Shared Journeys</p>
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="group relative h-[300px] overflow-hidden rounded-lg border border-white/10 shadow-xl sm:h-[400px]"
        >
          <ResponsiveImage src="/assets/group2.jpeg" alt="Travelers at an outdoor group gathering" sizes="(max-width: 1024px) 100vw, 50vw" loading="lazy" className="absolute inset-0 h-full w-full object-cover group-hover:scale-105 transition-transform duration-[3s]" />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-black/20 to-transparent"></div>
          <div className="absolute bottom-10 left-10">
            <p className="text-3xl font-display font-black text-white italic drop-shadow-xl tracking-tighter">Bonds Forged</p>
            <p className="text-[10px] text-secondary uppercase font-black tracking-[0.3em] mt-2">Lifelong Connections</p>
          </div>
        </motion.div>
      </div>
    </div>

    {/* Community Features Section */}
    <div className="mb-14 grid grid-cols-1 gap-3 md:grid-cols-3">
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
          whileHover={{ y: -10 }}
          className="relative flex min-h-[260px] flex-col items-start justify-between gap-5 overflow-hidden rounded-lg border border-white/10 bg-white/[0.025] p-5 transition-colors hover:border-white/20 sm:min-h-[300px] sm:p-6"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/5 blur-3xl rounded-full"></div>
          <div className="flex h-11 w-11 items-center justify-center rounded-full liquid-glass text-[#9bd3c6]">
            <card.icon size={21} />
          </div>
          <div className="relative z-10 space-y-2">
            <h3 className="font-display text-lg font-bold uppercase tracking-tight text-white">{card.title}</h3>
            <p className="max-w-sm text-xs leading-relaxed text-white/55">{card.desc}</p>
          </div>
          <button className="bg-white/5 text-white/40 px-8 py-3 rounded-full text-[9px] font-black uppercase tracking-[0.2em] group-hover:bg-secondary group-hover:text-white transition-all shadow-lg border border-white/10">ENTER HUB</button>
        </motion.div>
      ))}
    </div>

    {/* Community Impact Section */}
    <div className="relative overflow-hidden rounded-xl liquid-glass p-5 sm:p-8 lg:p-10">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-primary/5 blur-[100px] rounded-full z-0"></div>
      <div className="relative z-10">
        <h2 className="mb-7 font-display text-2xl font-black uppercase italic tracking-tight text-white sm:text-4xl">Our shared <span className="text-primary-light">legacy</span></h2>
        <div className="grid grid-cols-2 gap-5 md:grid-cols-4">
          {[
            { value: "45k+", label: "ACTIVE TRIBE" },
            { value: "180+", label: "EXPEDITIONS" },
            { value: "92%", label: "RETURNING SOULS" },
            { value: " #1", label: "RATED IN AHMEDABAD" }
          ].map((stat, i) => (
            <div key={i} className="space-y-3">
              <p className="font-display text-2xl font-bold text-secondary sm:text-3xl">{stat.value}</p>
              <p className="mt-1 text-[9px] font-semibold uppercase tracking-wider text-white/50">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  </PageLayout>
)

const Wishlist = () => (
  <PageLayout
    seoTitle="Your Wishlist — Future Expeditions with INFIYATRA"
    seoDescription="Your personal vault of saved travel adventures. Keep track of trips you want to conquer."
    title={<>YOUR<br /><span className="text-primary italic px-4 drop-shadow-2xl" style={{ WebkitTextStroke: '2px white' }}>DREAMS</span></>}
    subtitle="The vault of adventures awaiting your signal. Keep track of the soul-stirring voyages you're planning to conquer."
  >
    <div className="rounded-xl border border-white/10 bg-white/[0.025] px-5 py-12 text-left sm:px-8 sm:py-16">
      <div className="relative mb-5 inline-flex">
        <Heart size={34} className="text-secondary" />
      </div>
      <h3 className="mb-3 font-display text-2xl font-bold uppercase tracking-tight text-white sm:text-3xl">Your wishlist is ready for its first trip</h3>
      <p className="mb-6 max-w-lg text-sm leading-relaxed text-white/55">Save a journey you love and come back when you’re ready to make it happen.</p>
      <Link
        to="/discover"
        className="inline-flex min-h-11 items-center gap-2 rounded-lg bg-secondary px-4 text-xs font-bold uppercase tracking-wider text-white transition-colors hover:bg-secondary-light"
      >
        Explore journeys <Compass size={14} />
      </Link>
    </div>
  </PageLayout>
)

export { About, Community, Wishlist }
