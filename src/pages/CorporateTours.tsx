import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import { Building2, Users, Trophy, Award, Star, CheckCircle2, MessageCircle, ArrowRight, Image as ImageIcon, Briefcase, Compass } from 'lucide-react'
import { addCustomTrip } from '../lib/dataService'
import { getWhatsAppLink } from '../lib/data'
import { haptics } from '../lib/haptics'

const CORPORATE_TESTIMONIALS = [
  {
    quote: "Infi Yatra planned our annual executive retreat to Himachal for 45 leaders. Flawless execution, high-altitude strategy sessions, and unbelievable team bonding.",
    author: "Rajesh Varma",
    role: "VP of People & Culture",
    company: "TechCorp India",
    rating: 5,
    teamSize: "45 Members"
  },
  {
    quote: "The Goa Coastal Cruise retreat for our engineering squad was the best corporate offsite in 8 years. Everything from private deck banquet to team rafting was curated to perfection.",
    author: "Ananya Mehta",
    role: "HR Director",
    company: "CloudScale Systems",
    rating: 5,
    teamSize: "80 Members"
  },
  {
    quote: "Professionalism at its finest! Captain Rohan and the Infi Yatra team handled our 120-person MICE trip to Bali seamlessly. 100% recommended for company retreats.",
    author: "Karan Patel",
    role: "Chief Operating Officer",
    company: "Apex Global Labs",
    rating: 5,
    teamSize: "120 Members"
  }
];

const CORPORATE_PHOTOS = [
  { url: '/assets/group2.jpeg', title: 'Mountain Summit Team Expedition' },
  { url: '/assets/group.jpeg', title: 'Bonfire & Acoustic Evening' },
  { url: '/assets/PFC.jpeg', title: 'Leadership Strategy Retreat' },
  { url: '/assets/himal.jpg', title: 'Solang Valley River Rafting' },
  { url: '/assets/beaut.jpg', title: 'Executive Sunrise Keynotes' },
  { url: '/assets/goa.jpg', title: 'Goa Coastal Cruise Banquet' }
];

const CorporateTours = () => {
  const [formData, setFormData] = useState({
    companyName: '',
    teamSize: '20-50 Members',
    destination: 'Himachal Pradesh',
    dates: '',
    contactName: '',
    email: '',
    phone: '',
    notes: ''
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.companyName || !formData.contactName || !formData.phone) {
      alert("Please fill in company name, contact person, and phone.");
      return;
    }

    haptics.medium();
    await addCustomTrip({
      destination: `[CORPORATE] ${formData.companyName} -> ${formData.destination}`,
      startDate: formData.dates || 'Flexible',
      duration: '3-5 Days Corporate Retreat',
      travelers: 50,
      groupType: 'Corporate Offsite',
      budget: 'Corporate Custom Tier',
      hotelTier: '5-Star Resort & Conference',
      flightsNeeded: true,
      fullName: `${formData.contactName} (${formData.companyName})`,
      email: formData.email,
      phone: formData.phone,
      specialRequests: `Team Size: ${formData.teamSize}. Notes: ${formData.notes}`
    });

    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-charcoal text-white pt-28 pb-24">
      <Helmet>
        <title>Corporate Tours & Team Offsites — INFIYATRA Corporate MICE</title>
        <meta name="description" content="Custom corporate retreats, leadership summits, team building trips, and MICE packages in India and abroad with Infi Yatra." />
      </Helmet>

      {/* Hero */}
      <div className="max-w-[1920px] mx-auto px-6 md:px-12 lg:px-20 mb-20">
        <div className="relative rounded-[3.5rem] overflow-hidden border border-white/10 p-8 md:p-16 lg:p-24 shadow-2xl bg-gradient-to-r from-slate-900 via-charcoal to-black">
          <div className="relative z-10 max-w-4xl space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-5 py-2 rounded-full liquid-glass border border-white/20"
            >
              <Building2 size={14} className="text-primary animate-pulse" />
              <span className="text-[10px] font-black uppercase tracking-[0.35em] text-primary">
                CORPORATE RETREATS & MICE
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-6xl lg:text-7xl font-display font-black uppercase italic tracking-tighter leading-none liquid-text"
            >
              Inspire Your Team <br />
              <span className="text-primary" style={{ WebkitTextStroke: '1px white' }}>Beyond The Boardroom</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-white/60 text-lg md:text-xl font-medium italic max-w-2xl leading-relaxed"
            >
              From high-altitude Himalayan strategy summits to Goa ocean cruise banquets. Re-energize your workforce with unforgettable team offsites.
            </motion.p>
          </div>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="max-w-[1920px] mx-auto px-6 md:px-12 lg:px-20 mb-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { value: "50+", label: "Corporate Retreats Delivered" },
            { value: "5,000+", label: "Employees Energized" },
            { value: "99.4%", label: "Corporate Satisfaction Rate" },
            { value: "24/7", label: "Dedicated On-site Captain Support" }
          ].map((stat, idx) => (
            <div key={idx} className="liquid-glass-dark p-8 rounded-[2.5rem] border border-white/10 text-center space-y-2">
              <span className="text-3xl md:text-5xl font-display font-black text-primary tracking-tighter italic">{stat.value}</span>
              <p className="text-[10px] font-black text-white/50 uppercase tracking-widest">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Photo Gallery Section */}
      <div className="max-w-[1920px] mx-auto px-6 md:px-12 lg:px-20 mb-24">
        <div className="text-center mb-12 space-y-3">
          <span className="text-secondary font-black uppercase tracking-[0.4em] text-[10px]">IN ACTION</span>
          <h2 className="text-3xl md:text-5xl font-display font-black uppercase italic tracking-tighter text-white">
            Corporate <span className="text-primary">Offsite Photo Gallery</span>
          </h2>
          <p className="text-white/40 italic text-sm">Real teams, real achievements, real camaraderie.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {CORPORATE_PHOTOS.map((photo, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="group relative rounded-[2.5rem] overflow-hidden border border-white/10 h-72 shadow-2xl"
            >
              <img
                src={photo.url}
                alt={photo.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[2s]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <span className="text-[10px] font-black text-secondary uppercase tracking-widest block mb-1">Corporate Moments</span>
                <h3 className="font-display font-black text-xl text-white uppercase italic leading-tight">{photo.title}</h3>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="max-w-[1920px] mx-auto px-6 md:px-12 lg:px-20 mb-24">
        <div className="liquid-glass p-8 md:p-16 rounded-[3.5rem] border border-white/10 space-y-12 shadow-2xl">
          <div className="text-center space-y-3">
            <span className="text-secondary font-black uppercase tracking-[0.4em] text-[10px]">CLIENT VOICES</span>
            <h2 className="text-3xl md:text-5xl font-display font-black uppercase italic tracking-tighter text-white">
              What Corporate <span className="text-secondary">Leaders Say</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {CORPORATE_TESTIMONIALS.map((t, idx) => (
              <div key={idx} className="liquid-glass-dark p-8 rounded-[2.5rem] border border-white/10 space-y-6 flex flex-col justify-between hover:border-secondary transition-all">
                <div className="space-y-4">
                  <div className="flex text-amber-400">
                    {[...Array(t.rating)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
                  </div>
                  <p className="text-white/80 text-sm font-medium italic leading-relaxed">
                    "{t.quote}"
                  </p>
                </div>

                <div className="pt-4 border-t border-white/10 flex justify-between items-end">
                  <div>
                    <h4 className="font-display font-black text-lg text-white uppercase italic">{t.author}</h4>
                    <p className="text-xs text-white/40 font-bold">{t.role} • <span className="text-secondary">{t.company}</span></p>
                  </div>
                  <span className="text-[9px] font-black text-white/30 uppercase tracking-widest">{t.teamSize}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Corporate Inquiry Form */}
      <div className="max-w-4xl mx-auto px-6">
        <div className="liquid-glass-dark p-8 md:p-12 rounded-[3.5rem] border border-white/10 space-y-8 shadow-2xl">
          <div className="text-center space-y-2">
            <h2 className="text-3xl font-display font-black uppercase italic tracking-tighter text-white">
              Plan Your Corporate <span className="text-primary">Offsite</span>
            </h2>
            <p className="text-white/50 text-xs font-medium italic">Get a customized corporate proposal within 4 hours.</p>
          </div>

          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <input
                  type="text"
                  required
                  placeholder="Company Name *"
                  value={formData.companyName}
                  onChange={e => setFormData({ ...formData, companyName: e.target.value })}
                  className="bg-white/5 border border-white/10 rounded-2xl p-4 text-white font-bold placeholder-white/20 focus:border-primary outline-none"
                />

                <select
                  value={formData.teamSize}
                  onChange={e => setFormData({ ...formData, teamSize: e.target.value })}
                  className="bg-charcoal border border-white/10 rounded-2xl p-4 text-white font-bold focus:border-primary outline-none"
                >
                  <option value="10-20 Members">10-20 Members</option>
                  <option value="20-50 Members">20-50 Members</option>
                  <option value="50-100 Members">50-100 Members</option>
                  <option value="100+ Members">100+ Members (Mega Convention)</option>
                </select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <input
                  type="text"
                  placeholder="Preferred Destination (e.g. Manali, Goa Cruise, Bali)"
                  value={formData.destination}
                  onChange={e => setFormData({ ...formData, destination: e.target.value })}
                  className="bg-white/5 border border-white/10 rounded-2xl p-4 text-white font-bold placeholder-white/20 focus:border-primary outline-none"
                />

                <input
                  type="text"
                  placeholder="Target Travel Month / Dates"
                  value={formData.dates}
                  onChange={e => setFormData({ ...formData, dates: e.target.value })}
                  className="bg-white/5 border border-white/10 rounded-2xl p-4 text-white font-bold placeholder-white/20 focus:border-primary outline-none"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <input
                  type="text"
                  required
                  placeholder="Contact Person Name *"
                  value={formData.contactName}
                  onChange={e => setFormData({ ...formData, contactName: e.target.value })}
                  className="bg-white/5 border border-white/10 rounded-2xl p-4 text-white font-bold placeholder-white/20 focus:border-primary outline-none"
                />

                <input
                  type="tel"
                  required
                  placeholder="Work Phone / WhatsApp *"
                  value={formData.phone}
                  onChange={e => setFormData({ ...formData, phone: e.target.value })}
                  className="bg-white/5 border border-white/10 rounded-2xl p-4 text-white font-bold placeholder-white/20 focus:border-primary outline-none"
                />

                <input
                  type="email"
                  placeholder="Work Email"
                  value={formData.email}
                  onChange={e => setFormData({ ...formData, email: e.target.value })}
                  className="bg-white/5 border border-white/10 rounded-2xl p-4 text-white font-bold placeholder-white/20 focus:border-primary outline-none"
                />
              </div>

              <textarea
                placeholder="Specific corporate requirements (Conference hall, team activities, flight requirements...)"
                value={formData.notes}
                onChange={e => setFormData({ ...formData, notes: e.target.value })}
                className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-white font-medium placeholder-white/20 focus:border-primary outline-none min-h-[100px]"
              />

              <button
                type="submit"
                className="w-full bg-primary text-white py-5 rounded-2xl font-black text-xs uppercase tracking-[0.3em] hover:bg-white hover:text-charcoal transition-all shadow-2xl flex items-center justify-center gap-2"
              >
                Submit Corporate Offsite Request <ArrowRight size={18} />
              </button>
            </form>
          ) : (
            <div className="text-center py-8 space-y-4">
              <CheckCircle2 size={48} className="text-emerald-400 mx-auto" />
              <h3 className="text-2xl font-display font-black uppercase text-white">Corporate Inquiry Received</h3>
              <p className="text-white/60 text-sm italic">Our corporate travel lead will get back to {formData.contactName} within 4 hours.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default CorporateTours
