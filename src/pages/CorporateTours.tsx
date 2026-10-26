import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import {
  Building2,
  Users,
  Trophy,
  Award,
  Star,
  CheckCircle2,
  MessageCircle,
  ArrowRight,
  Briefcase,
  Compass,
  MapPin,
  Calendar,
  Sparkles,
  HelpCircle,
  ChevronDown
} from 'lucide-react'
import {
  addLead,
  getCorporateTestimonials,
  getCorporatePhotos,
  CorporateTestimonial,
  CorporatePhoto
} from '../lib/dataService'
import { getWhatsAppLink } from '../lib/data'
import { haptics } from '../lib/haptics'
import ResponsiveImage from '../components/ResponsiveImage'

const CORPORATE_SERVICES = [
  {
    icon: Briefcase,
    title: 'MICE & Annual Conferences',
    desc: 'End-to-end management for conventions up to 500+ pax with state-of-the-art AV, stage production, and luxury convention resort bookings.'
  },
  {
    icon: Trophy,
    title: 'Incentive Travel Programs',
    desc: 'Reward star performers with exotic retreats to Bali, Dubai, or luxury private catamarans on the Arabian Sea.'
  },
  {
    icon: Users,
    title: 'Leadership Strategy Offsites',
    desc: 'Inspiring Himalayan pine forest retreats and beachfront executive villas with dedicated meeting breakout spaces.'
  },
  {
    icon: Award,
    title: 'Team Building & Outdoor Challenges',
    desc: 'White-water rafting in Solang, coastal regattas in Goa, and collaborative problem-solving games led by our trained expedition captains.'
  }
];

const CORPORATE_PACKAGES = [
  {
    id: 12,
    title: 'Corporate Leadership Offsite',
    location: 'Manali & Solang Valley',
    duration: '4 Days / 3 Nights',
    price: '22,500',
    image: '/assets/group2.jpeg',
    tag: 'Mountain Strategy'
  },
  {
    id: 16,
    title: 'Goa Coastal Executive Retreat',
    location: 'South Goa Beachfront Resort',
    duration: '4 Days / 3 Nights',
    price: '28,000',
    image: '/assets/goa.jpg',
    tag: 'Beachfront Regatta'
  },
  {
    id: 17,
    title: 'Bali Global Team Summit & Retreat',
    location: 'Ubud & Nusa Dua, Bali',
    duration: '5 Days / 4 Nights',
    price: '54,000',
    image: '/assets/bali.jpg',
    tag: 'International MICE'
  }
];

const CLIENT_LOGOS = [
  { name: 'TechScale India', domain: 'Cloud & AI' },
  { name: 'Apex Global Labs', domain: 'Fintech' },
  { name: 'Zenith Logistics', domain: 'Supply Chain' },
  { name: 'InfraCorp Global', domain: 'Real Estate' },
  { name: 'Vanguard Health', domain: 'Pharma' }
];

const CORPORATE_FAQS = [
  {
    q: 'How far in advance should we plan our corporate offsite?',
    a: 'We recommend 30–60 days in advance for domestic retreats (Goa, Himachal, Kerala) and 60–90 days for international MICE destinations (Bali, Dubai, Singapore) to ensure premier resort availability.'
  },
  {
    q: 'Can you handle GST compliant invoicing for corporate accounting?',
    a: 'Yes, absolutely. We provide complete GST invoices with proper HSN codes, company billing information, and verified payment gateways.'
  },
  {
    q: 'Do you arrange flight tickets and airport Volvo coaches for our team?',
    a: 'Yes! We coordinate block flight bookings, airport luxury Volvo transfers, and dedicated local escort captains from pickup to departure.'
  },
  {
    q: 'Can we include custom branding, stage backdrops, and gala dinners?',
    a: 'Yes. Our production team handles custom stage banners, branded merchandise, DJ and acoustic live bands, and custom culinary menus.'
  }
];

const CorporateTours = () => {
  const [testimonials, setTestimonials] = useState<CorporateTestimonial[]>([])
  const [photos, setPhotos] = useState<CorporatePhoto[]>([])
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  const [formData, setFormData] = useState({
    companyName: '',
    contactName: '',
    designation: '',
    teamSize: '20-50 Members',
    destination: 'Himachal Pradesh',
    dates: '',
    budget: '₹25,000 – ₹45,000 / person',
    email: '',
    phone: '',
    requirements: ''
  })

  const [submitted, setSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    getCorporateTestimonials().then(setTestimonials)
    getCorporatePhotos().then(setPhotos)
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.companyName || !formData.contactName || !formData.phone) {
      alert('Please fill in company name, contact person, and phone number.')
      return
    }

    haptics.medium()
    setIsSubmitting(true)

    try {
      await addLead({
        type: 'corporate',
        fullName: `${formData.contactName} (${formData.companyName})`,
        companyName: formData.companyName,
        designation: formData.designation,
        email: formData.email,
        phone: formData.phone,
        destination: formData.destination,
        travelDate: formData.dates || 'Flexible',
        travelers: formData.teamSize,
        budget: formData.budget,
        notes: `Team Size: ${formData.teamSize} | Designation: ${formData.designation} | Requirements: ${formData.requirements}`
      })
    } catch (err) {
      console.error(err)
    }

    setIsSubmitting(false)
    setSubmitted(true)
  }

  const getCorporateWhatsAppMessage = () => {
    const text = `Hi Infi Yatra! We are planning a corporate retreat:
🏢 Company: ${formData.companyName}
👤 Contact: ${formData.contactName} (${formData.designation})
👥 Team Size: ${formData.teamSize}
📍 Preferred Destination: ${formData.destination}
📅 Dates: ${formData.dates || 'Flexible'}
💰 Budget: ${formData.budget}
📞 Phone: ${formData.phone}
${formData.requirements ? `📝 Details: ${formData.requirements}` : ''}`
    return getWhatsAppLink(text)
  }

  return (
    <div className="min-h-screen bg-charcoal pb-24 pt-24 text-white sm:pt-28">
      <Helmet>
        <title>Corporate Tours, MICE & Team Offsites — INFIYATRA</title>
        <meta name="description" content="Custom corporate retreats, executive summits, MICE conferences, and team-building expeditions in India and internationally." />
      </Helmet>

      {/* Hero */}
      <div className="mx-auto mb-16 max-w-[1320px] px-4 sm:px-8 lg:px-12">
        <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#193431] p-6 sm:p-12 lg:p-16">
          <ResponsiveImage
            src="/assets/group2.jpeg"
            alt="Corporate team on expedition"
            sizes="100vw"
            className="absolute inset-0 h-full w-full object-cover opacity-25"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0c1d1b]/95 via-[#0c1d1b]/80 to-[#0c1d1b]/30" />
          <div className="relative z-10 max-w-4xl space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full liquid-glass px-4 py-2">
              <Building2 size={14} className="text-primary animate-pulse" />
              <span className="text-[10px] font-bold uppercase tracking-[0.24em] text-[#9bd3c6]">
                CORPORATE EXPERIENCES & MICE
              </span>
            </div>

            <h1 className="font-display text-4xl font-black uppercase italic leading-[1.02] tracking-tight text-white sm:text-6xl">
              Inspire Your Team <br />
              <span className="text-secondary">Beyond The Boardroom</span>
            </h1>

            <p className="max-w-2xl text-sm leading-relaxed text-white/70 sm:text-base lg:text-lg">
              High-altitude strategy offsites in the Himalayas, beachfront team hackathons in Goa, and executive incentive getaways in Bali. Curated seamlessly for growth-driven companies.
            </p>

            <div className="flex flex-wrap gap-4 pt-2">
              <a
                href="#corporate-form"
                className="inline-flex min-h-12 items-center gap-2 rounded-xl bg-secondary px-6 text-xs font-bold uppercase tracking-wider text-white transition-all hover:bg-secondary-light shadow-xl shadow-secondary/25"
              >
                Request Custom Proposal <ArrowRight size={16} />
              </a>
              <a
                href={getWhatsAppLink("Hi Infi Yatra! We'd like to discuss a corporate offsite.")}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-12 items-center gap-2 rounded-xl liquid-glass px-5 text-xs font-bold uppercase tracking-wider text-white hover:bg-white/20"
              >
                <MessageCircle size={16} /> Quick WhatsApp Chat
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Client Logos Strip (Placeholders with verified styling) */}
      <div className="mx-auto mb-20 max-w-[1320px] px-4 sm:px-8">
        <p className="text-center text-[10px] font-bold uppercase tracking-[0.28em] text-white/40 mb-6">
          TRUSTED BY LEADERSHIP TEAMS ACROSS INDIA
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
          {CLIENT_LOGOS.map((logo, lIdx) => (
            <div key={lIdx} className="rounded-xl border border-white/10 bg-white/[0.03] p-4 text-center">
              <span className="font-display text-base font-black uppercase tracking-wider text-white/80 block">
                {logo.name}
              </span>
              <span className="text-[10px] text-secondary font-medium uppercase tracking-widest">{logo.domain}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Services Grid */}
      <div className="mx-auto mb-20 max-w-[1320px] px-4 sm:px-8 lg:px-12">
        <div className="text-center mb-12 space-y-2">
          <span className="text-secondary font-black uppercase tracking-[0.3em] text-[10px]">WHAT WE OFFER</span>
          <h2 className="text-3xl sm:text-4xl font-display font-black uppercase italic tracking-tight text-white">
            Tailored <span className="text-primary-light">Corporate Services</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {CORPORATE_SERVICES.map((serv, sIdx) => (
            <div key={sIdx} className="rounded-2xl border border-white/10 bg-white/[0.025] p-6 space-y-4 hover:border-secondary/40 transition-colors">
              <div className="w-12 h-12 rounded-xl liquid-glass flex items-center justify-center text-secondary">
                <serv.icon size={22} />
              </div>
              <h3 className="font-display text-lg font-bold uppercase text-white leading-tight">
                {serv.title}
              </h3>
              <p className="text-xs text-white/55 leading-relaxed">
                {serv.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* 3 Sample Corporate Packages */}
      <div className="mx-auto mb-20 max-w-[1320px] px-4 sm:px-8 lg:px-12">
        <div className="text-center mb-10 space-y-2">
          <span className="text-secondary font-black uppercase tracking-[0.3em] text-[10px]">CURATED OFFSETS</span>
          <h2 className="text-3xl sm:text-4xl font-display font-black uppercase italic tracking-tight text-white">
            Sample Corporate <span className="text-primary-light">Packages</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {CORPORATE_PACKAGES.map((pkg) => (
            <div key={pkg.id} className="rounded-2xl border border-white/10 bg-white/[0.025] overflow-hidden group flex flex-col">
              <div className="relative aspect-[16/10] overflow-hidden bg-black/40">
                <ResponsiveImage
                  src={pkg.image}
                  alt={pkg.title}
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <span className="absolute top-3 left-3 bg-secondary text-white text-[9px] font-bold uppercase px-2.5 py-1 rounded">
                  {pkg.tag}
                </span>
                <span className="absolute bottom-3 left-3 text-xs font-semibold text-white/80 flex items-center gap-1">
                  <MapPin size={12} className="text-secondary" /> {pkg.location}
                </span>
              </div>

              <div className="p-5 flex flex-col flex-grow justify-between space-y-4">
                <div>
                  <h3 className="font-display text-xl font-bold uppercase text-white leading-tight">{pkg.title}</h3>
                  <p className="text-xs text-white/50 mt-1">{pkg.duration}</p>
                </div>

                <div className="flex items-center justify-between border-t border-white/10 pt-4">
                  <div>
                    <span className="text-[10px] text-white/40 uppercase block">Starting from</span>
                    <span className="font-display text-xl font-bold text-white">₹{pkg.price} <span className="text-xs text-white/50 font-normal">/ person</span></span>
                  </div>
                  <Link
                    to={`/trip/${pkg.id}`}
                    className="px-4 py-2.5 rounded-xl bg-white text-charcoal hover:bg-secondary hover:text-white transition-colors text-xs font-bold uppercase tracking-wider"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Dynamic Photo Gallery with Masonry & Lightbox */}
      <div className="mx-auto mb-20 max-w-[1320px] px-4 sm:px-8 lg:px-12">
        <div className="text-center mb-10 space-y-2">
          <span className="text-secondary font-black uppercase tracking-[0.3em] text-[10px]">EXPERIENCES CAPTURED</span>
          <h2 className="text-3xl sm:text-4xl font-display font-black uppercase italic tracking-tight text-white">
            Corporate Offsite <span className="text-primary-light">Photo Gallery</span>
          </h2>
          <p className="text-xs text-white/50">Admin-managed gallery featuring memorable retreats.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {photos.map((photo, pIdx) => (
            <motion.div
              key={photo.id || pIdx}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="relative rounded-2xl overflow-hidden border border-white/10 aspect-[4/3] group shadow-xl"
            >
              <ResponsiveImage
                src={photo.url}
                alt={photo.title}
                sizes="(max-width: 768px) 100vw, 33vw"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <h3 className="font-display text-base font-bold text-white uppercase italic">{photo.title}</h3>
                {photo.caption && <p className="text-xs text-white/60 mt-0.5 line-clamp-1">{photo.caption}</p>}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Dynamic Client Testimonials Carousel / Grid */}
      <div className="mx-auto mb-20 max-w-[1320px] px-4 sm:px-8 lg:px-12">
        <div className="rounded-3xl liquid-glass p-6 sm:p-12 border border-white/10 space-y-8">
          <div className="text-center space-y-2">
            <span className="text-secondary font-black uppercase tracking-[0.3em] text-[10px]">EXECUTIVE FEEDBACK</span>
            <h2 className="text-3xl sm:text-4xl font-display font-black uppercase italic tracking-tight text-white">
              What Leaders <span className="text-secondary">Say</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, idx) => (
              <div key={t.id || idx} className="rounded-2xl liquid-glass-dark border border-white/10 p-6 flex flex-col justify-between space-y-4">
                <div className="space-y-3">
                  <div className="flex text-amber-400">
                    {[...Array(t.rating || 5)].map((_, i) => <Star key={i} size={15} fill="currentColor" />)}
                  </div>
                  <p className="text-xs sm:text-sm text-white/80 italic leading-relaxed">
                    "{t.quote}"
                  </p>
                </div>

                <div className="border-t border-white/10 pt-3 flex justify-between items-end">
                  <div>
                    <h4 className="font-display text-base font-bold text-white uppercase">{t.author}</h4>
                    <p className="text-[11px] text-white/50">{t.role} • <span className="text-secondary">{t.company}</span></p>
                  </div>
                  <span className="text-[10px] bg-white/10 px-2 py-0.5 rounded text-white/70">{t.teamSize}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Corporate FAQs */}
      <div className="mx-auto mb-20 max-w-3xl px-4 sm:px-8">
        <div className="text-center mb-8 space-y-2">
          <span className="text-secondary font-black uppercase tracking-[0.3em] text-[10px]">FREQUENTLY ASKED</span>
          <h2 className="text-2xl sm:text-3xl font-display font-black uppercase italic tracking-tight text-white">
            Corporate Travel <span className="text-primary-light">FAQs</span>
          </h2>
        </div>

        <div className="space-y-3">
          {CORPORATE_FAQS.map((faq, fIdx) => (
            <div
              key={fIdx}
              onClick={() => setOpenFaq(openFaq === fIdx ? null : fIdx)}
              className="rounded-xl border border-white/10 bg-white/[0.03] p-4 cursor-pointer hover:border-white/20 transition-colors"
            >
              <div className="flex justify-between items-center gap-3">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <HelpCircle size={16} className="text-secondary shrink-0" />
                  {faq.q}
                </h3>
                <ChevronDown
                  size={16}
                  className={`text-white/50 transition-transform ${openFaq === fIdx ? 'rotate-180 text-secondary' : ''}`}
                />
              </div>
              {openFaq === fIdx && (
                <p className="text-xs text-white/60 mt-3 pt-3 border-t border-white/10 leading-relaxed pl-6">
                  {faq.a}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Corporate Inquiry Form */}
      <div id="corporate-form" className="mx-auto max-w-4xl px-4 sm:px-8">
        <div className="rounded-2xl border border-white/10 bg-white/[0.025] p-6 sm:p-10 shadow-2xl space-y-8">
          <div className="text-center space-y-2">
            <h2 className="text-3xl font-display font-black uppercase italic tracking-tight text-white">
              Plan Your Team <span className="text-secondary">Offsite</span>
            </h2>
            <p className="text-xs text-white/60">
              Receive a comprehensive MICE proposal with resort options, budgeting, and itinerary within 4 hours.
            </p>
          </div>

          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[11px] font-bold uppercase tracking-wider text-white/60 block mb-1">Company Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Acme Technologies India"
                    value={formData.companyName}
                    onChange={e => setFormData({ ...formData, companyName: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl p-3.5 text-xs text-white placeholder:text-white/25 focus:border-secondary outline-none"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-bold uppercase tracking-wider text-white/60 block mb-1">Expected Team Size</label>
                  <select
                    value={formData.teamSize}
                    onChange={e => setFormData({ ...formData, teamSize: e.target.value })}
                    className="w-full bg-[#1e2e2c] border border-white/10 rounded-xl p-3.5 text-xs text-white outline-none focus:border-secondary"
                  >
                    <option value="15-30 Members">15-30 Members (Executive Summit)</option>
                    <option value="30-60 Members">30-60 Members (Department Squad)</option>
                    <option value="60-120 Members">60-120 Members (Company Offsite)</option>
                    <option value="120+ Members">120+ Members (Annual Mega Convention)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="text-[11px] font-bold uppercase tracking-wider text-white/60 block mb-1">Contact Person *</label>
                  <input
                    type="text"
                    required
                    placeholder="Contact name"
                    value={formData.contactName}
                    onChange={e => setFormData({ ...formData, contactName: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl p-3.5 text-xs text-white placeholder:text-white/25 focus:border-secondary outline-none"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-bold uppercase tracking-wider text-white/60 block mb-1">Designation</label>
                  <input
                    type="text"
                    placeholder="e.g. HR Director / COO"
                    value={formData.designation}
                    onChange={e => setFormData({ ...formData, designation: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl p-3.5 text-xs text-white placeholder:text-white/25 focus:border-secondary outline-none"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-bold uppercase tracking-wider text-white/60 block mb-1">Phone / WhatsApp *</label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98765 43210"
                    value={formData.phone}
                    onChange={e => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl p-3.5 text-xs text-white placeholder:text-white/25 focus:border-secondary outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="text-[11px] font-bold uppercase tracking-wider text-white/60 block mb-1">Preferred Destination</label>
                  <input
                    type="text"
                    placeholder="e.g. Goa, Manali, Bali, Dubai"
                    value={formData.destination}
                    onChange={e => setFormData({ ...formData, destination: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl p-3.5 text-xs text-white placeholder:text-white/25 focus:border-secondary outline-none"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-bold uppercase tracking-wider text-white/60 block mb-1">Tentative Dates</label>
                  <input
                    type="text"
                    placeholder="e.g. Nov 2026 or Q1 2027"
                    value={formData.dates}
                    onChange={e => setFormData({ ...formData, dates: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl p-3.5 text-xs text-white placeholder:text-white/25 focus:border-secondary outline-none"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-bold uppercase tracking-wider text-white/60 block mb-1">Work Email</label>
                  <input
                    type="email"
                    placeholder="team@company.com"
                    value={formData.email}
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl p-3.5 text-xs text-white placeholder:text-white/25 focus:border-secondary outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="text-[11px] font-bold uppercase tracking-wider text-white/60 block mb-1">Specific Requirements / Notes</label>
                <textarea
                  rows={3}
                  placeholder="Need conference hall for 50 pax, team building outdoor games, gala dinner with live acoustic band, flights from Mumbai..."
                  value={formData.requirements}
                  onChange={e => setFormData({ ...formData, requirements: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-xl p-3.5 text-xs text-white placeholder:text-white/25 focus:border-secondary outline-none"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full min-h-12 rounded-xl bg-gradient-to-r from-secondary to-primary text-xs font-black uppercase tracking-widest text-white shadow-xl shadow-secondary/25 hover:scale-[1.01] transition-all disabled:opacity-50"
              >
                {isSubmitting ? 'Submitting Proposal Request...' : 'Submit Corporate RFP & Get Proposal'}
              </button>
            </form>
          ) : (
            <div className="text-center py-6 space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/30">
                <CheckCircle2 size={36} />
              </div>
              <h3 className="text-2xl font-display font-black uppercase text-white">Corporate RFP Received!</h3>
              <p className="text-xs text-white/70 max-w-md mx-auto leading-relaxed">
                Thank you, <span className="font-bold text-white">{formData.contactName}</span>. Our MICE director will review <span className="font-bold text-white">{formData.companyName}</span>'s requirements and reach out within 4 hours.
              </p>
              <div className="pt-2 flex justify-center gap-3">
                <a
                  href={getCorporateWhatsAppMessage()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-emerald-600 px-5 text-xs font-bold uppercase tracking-wider text-white hover:bg-emerald-500"
                >
                  <MessageCircle size={16} /> Instant WhatsApp Connect
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default CorporateTours
