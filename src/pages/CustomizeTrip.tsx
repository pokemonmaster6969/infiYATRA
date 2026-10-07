import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import { SlidersHorizontal, MapPin, Calendar, Users, DollarSign, Plane, Sparkles, CheckCircle2, MessageCircle, ArrowRight, Compass } from 'lucide-react'
import { addCustomTrip } from '../lib/dataService'
import { getWhatsAppLink } from '../lib/data'
import { haptics } from '../lib/haptics'

const POPULAR_DESTINATIONS = [
  'Spiti Valley', 'Leh Ladakh', 'Kashmir', 'Bali', 'Goa & Lakshadweep Cruise', 'Kerala', 'Thailand', 'Maldives', 'Vietnam', 'Dubai', 'Himachal'
];

const CustomizeTrip = () => {
  const [formData, setFormData] = useState({
    destination: '',
    startDate: '',
    duration: '5-7 Days',
    travelers: 2,
    groupType: 'Couple / Friends',
    budget: '₹20,000 - ₹50,000',
    hotelTier: '4-Star Premium',
    flightsNeeded: true,
    fullName: '',
    email: '',
    phone: '',
    specialRequests: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const selectQuickDestination = (dest: string) => {
    haptics.light();
    setFormData(prev => ({ ...prev, destination: dest }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.destination || !formData.fullName || !formData.phone) {
      alert("Please fill in destination, name, and phone number.");
      return;
    }

    haptics.medium();
    setIsSubmitting(true);

    try {
      await addCustomTrip({
        destination: formData.destination,
        startDate: formData.startDate || 'Flexible',
        duration: formData.duration,
        travelers: formData.travelers,
        groupType: formData.groupType,
        budget: formData.budget,
        hotelTier: formData.hotelTier,
        flightsNeeded: formData.flightsNeeded,
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        specialRequests: formData.specialRequests
      });
    } catch (err) {
      console.error(err);
    }

    setIsSubmitting(false);
    setSubmitted(true);
  };

  const generateWhatsAppMessage = () => {
    const text = `Hi Infi Yatra! I'd like to book a custom trip:
📍 Destination: ${formData.destination}
📅 Travel Date: ${formData.startDate || 'Flexible'} (${formData.duration})
👥 Travelers: ${formData.travelers} (${formData.groupType})
💰 Budget: ${formData.budget}
🏨 Hotel Tier: ${formData.hotelTier}
✈️ Flights: ${formData.flightsNeeded ? 'Yes' : 'No'}
👤 Name: ${formData.fullName}
📱 Phone: ${formData.phone}
${formData.specialRequests ? `📝 Notes: ${formData.specialRequests}` : ''}`;
    return getWhatsAppLink(text);
  };

  return (
    <div className="min-h-screen bg-charcoal text-white pt-28 pb-24">
      <Helmet>
        <title>Customize Your Dream Trip — INFIYATRA Custom Planning</title>
        <meta name="description" content="Design your tailored itinerary with custom dates, destinations, hotels, and budget. Get your personalized plan within 2 hours." />
      </Helmet>

      <div className="max-w-4xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12 space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full liquid-glass border border-white/20"
          >
            <SlidersHorizontal size={14} className="text-secondary animate-spin" />
            <span className="text-[10px] font-black uppercase tracking-[0.35em] text-secondary">
              TAILOR-MADE JOURNEYS
            </span>
          </motion.div>

          <h1 className="text-4xl md:text-6xl font-display font-black uppercase italic tracking-tighter leading-none liquid-text">
            Customize Your <span className="text-primary" style={{ WebkitTextStroke: '1px white' }}>Adventures</span>
          </h1>
          <p className="text-white/60 font-medium text-base md:text-lg italic max-w-xl mx-auto">
            Short, simple, and tailored specifically to your vibe. Pick dates, destination, budget & let our Captains curate your journey.
          </p>
        </div>

        {/* Form Container */}
        <AnimatePresence mode="wait">
          {!submitted ? (
            <motion.form
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              onSubmit={handleSubmit}
              className="liquid-glass-dark p-8 md:p-12 rounded-[3.5rem] border border-white/10 space-y-10 shadow-2xl"
            >
              {/* Step 1: Destination */}
              <div className="space-y-4">
                <label className="text-xs font-black uppercase tracking-[0.3em] text-secondary flex items-center gap-2">
                  <MapPin size={16} /> 1. Where would you like to go?
                </label>

                <input
                  type="text"
                  required
                  placeholder="e.g. Spiti Valley, Kashmir, Bali, Goa Cruise..."
                  value={formData.destination}
                  onChange={e => setFormData({ ...formData, destination: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl p-5 text-white font-bold placeholder-white/20 focus:border-secondary outline-none transition-all text-lg"
                />

                {/* Popular Quick Chips */}
                <div className="space-y-2 pt-1">
                  <span className="text-[10px] font-black text-white/30 uppercase tracking-widest block">Quick Suggestions:</span>
                  <div className="flex flex-wrap gap-2">
                    {POPULAR_DESTINATIONS.map(dest => (
                      <button
                        key={dest}
                        type="button"
                        onClick={() => selectQuickDestination(dest)}
                        className={`text-[10px] font-black uppercase tracking-wider px-4 py-2 rounded-full border transition-all ${
                          formData.destination === dest
                            ? 'bg-secondary border-secondary text-white shadow-lg shadow-secondary/30'
                            : 'bg-white/5 border-white/10 text-white/60 hover:border-white/30 hover:text-white'
                        }`}
                      >
                        + {dest}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Step 2: Dates & Duration */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-white/5">
                <div className="space-y-2">
                  <label className="text-xs font-black uppercase tracking-[0.3em] text-secondary flex items-center gap-2">
                    <Calendar size={16} /> 2. Expected Travel Date
                  </label>
                  <input
                    type="date"
                    value={formData.startDate}
                    onChange={e => setFormData({ ...formData, startDate: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-white font-bold focus:border-secondary outline-none transition-all"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-black uppercase tracking-[0.3em] text-secondary flex items-center gap-2">
                    Duration
                  </label>
                  <select
                    value={formData.duration}
                    onChange={e => setFormData({ ...formData, duration: e.target.value })}
                    className="w-full bg-charcoal border border-white/10 rounded-2xl p-4 text-white font-bold focus:border-secondary outline-none transition-all"
                  >
                    <option value="3-4 Days">3-4 Days (Weekend Escape)</option>
                    <option value="5-7 Days">5-7 Days (Classic Trip)</option>
                    <option value="8-10 Days">8-10 Days (Deep Explorer)</option>
                    <option value="12+ Days">12+ Days (Grand Expedition)</option>
                  </select>
                </div>
              </div>

              {/* Step 3: Travelers & Group Type */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-white/5">
                <div className="space-y-2">
                  <label className="text-xs font-black uppercase tracking-[0.3em] text-secondary flex items-center gap-2">
                    <Users size={16} /> 3. Number of Travelers
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="100"
                    value={formData.travelers}
                    onChange={e => setFormData({ ...formData, travelers: parseInt(e.target.value) || 1 })}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-white font-bold focus:border-secondary outline-none transition-all"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-black uppercase tracking-[0.3em] text-secondary flex items-center gap-2">
                    Group Style
                  </label>
                  <select
                    value={formData.groupType}
                    onChange={e => setFormData({ ...formData, groupType: e.target.value })}
                    className="w-full bg-charcoal border border-white/10 rounded-2xl p-4 text-white font-bold focus:border-secondary outline-none transition-all"
                  >
                    <option value="Solo Traveler">Solo Traveler</option>
                    <option value="Couple / Honeymoon">Couple / Honeymoon</option>
                    <option value="Family with Kids">Family with Kids</option>
                    <option value="Friends Tribe">Friends Tribe</option>
                    <option value="Corporate Offsite">Corporate Offsite</option>
                  </select>
                </div>
              </div>

              {/* Step 4: Budget & Preferences */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 border-t border-white/5">
                <div className="space-y-2">
                  <label className="text-xs font-black uppercase tracking-[0.3em] text-secondary flex items-center gap-2">
                    <DollarSign size={16} /> Budget / Person
                  </label>
                  <select
                    value={formData.budget}
                    onChange={e => setFormData({ ...formData, budget: e.target.value })}
                    className="w-full bg-charcoal border border-white/10 rounded-2xl p-4 text-white font-bold focus:border-secondary outline-none transition-all"
                  >
                    <option value="₹10,000 - ₹20,000">₹10,000 - ₹20,000 (Pocket-Friendly)</option>
                    <option value="₹20,000 - ₹50,000">₹20,000 - ₹50,000 (Standard Comfort)</option>
                    <option value="₹50,000 - ₹1,000,000">₹50,000 - ₹1 Lakh (Premium)</option>
                    <option value="₹1 Lakh+">₹1 Lakh+ (Ultra Luxury)</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-black uppercase tracking-[0.3em] text-secondary flex items-center gap-2">
                    Hotel Tier
                  </label>
                  <select
                    value={formData.hotelTier}
                    onChange={e => setFormData({ ...formData, hotelTier: e.target.value })}
                    className="w-full bg-charcoal border border-white/10 rounded-2xl p-4 text-white font-bold focus:border-secondary outline-none transition-all"
                  >
                    <option value="3-Star Cozy Stay">3-Star Cozy Homestays</option>
                    <option value="4-Star Premium">4-Star Premium Resorts</option>
                    <option value="5-Star Luxury">5-Star Luxury Villas</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-black uppercase tracking-[0.3em] text-secondary flex items-center gap-2">
                    <Plane size={16} /> Include Flights?
                  </label>
                  <div className="flex gap-3 pt-1">
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, flightsNeeded: true })}
                      className={`flex-1 py-3.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all ${
                        formData.flightsNeeded ? 'bg-secondary text-white shadow-lg' : 'bg-white/5 text-white/40'
                      }`}
                    >
                      Yes Include
                    </button>
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, flightsNeeded: false })}
                      className={`flex-1 py-3.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all ${
                        !formData.flightsNeeded ? 'bg-secondary text-white shadow-lg' : 'bg-white/5 text-white/40'
                      }`}
                    >
                      No Need
                    </button>
                  </div>
                </div>
              </div>

              {/* Step 5: Contact Info */}
              <div className="space-y-6 pt-4 border-t border-white/5">
                <label className="text-xs font-black uppercase tracking-[0.3em] text-secondary block">
                  5. Contact Information
                </label>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <input
                    type="text"
                    required
                    placeholder="Full Name *"
                    value={formData.fullName}
                    onChange={e => setFormData({ ...formData, fullName: e.target.value })}
                    className="bg-white/5 border border-white/10 rounded-2xl p-4 text-white font-bold placeholder-white/20 focus:border-secondary outline-none transition-all"
                  />
                  <input
                    type="tel"
                    required
                    placeholder="Phone / WhatsApp Number *"
                    value={formData.phone}
                    onChange={e => setFormData({ ...formData, phone: e.target.value })}
                    className="bg-white/5 border border-white/10 rounded-2xl p-4 text-white font-bold placeholder-white/20 focus:border-secondary outline-none transition-all"
                  />
                  <input
                    type="email"
                    placeholder="Email Address"
                    value={formData.email}
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                    className="bg-white/5 border border-white/10 rounded-2xl p-4 text-white font-bold placeholder-white/20 focus:border-secondary outline-none transition-all"
                  />
                </div>

                <textarea
                  placeholder="Special requests, specific places you want to visit, food preferences..."
                  value={formData.specialRequests}
                  onChange={e => setFormData({ ...formData, specialRequests: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-white font-medium placeholder-white/20 focus:border-secondary outline-none transition-all min-h-[100px]"
                />
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-secondary text-white py-5 rounded-2xl font-black text-xs uppercase tracking-[0.3em] hover:bg-white hover:text-charcoal transition-all shadow-2xl shadow-secondary/40 flex items-center justify-center gap-3 active:scale-98"
              >
                {isSubmitting ? "Submitting Request..." : "Submit Custom Request"} <ArrowRight size={18} />
              </button>
            </motion.form>
          ) : (
            /* Confirmation Card */
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="liquid-glass p-8 md:p-14 rounded-[3.5rem] border border-white/20 text-center space-y-8 shadow-2xl"
            >
              <div className="w-20 h-20 bg-secondary/20 text-secondary rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 size={48} />
              </div>

              <div className="space-y-3">
                <h2 className="text-3xl md:text-4xl font-display font-black uppercase italic tracking-tighter text-white">
                  Trip Request Received!
                </h2>
                <p className="text-white/60 font-medium text-base italic max-w-md mx-auto">
                  Thank you, <span className="text-white font-bold">{formData.fullName}</span>! Our Expedition Captains are preparing your custom itinerary for <span className="text-secondary font-bold">{formData.destination}</span>.
                </p>
              </div>

              {/* Summary Box */}
              <div className="liquid-glass-dark p-6 rounded-3xl border border-white/10 text-left max-w-lg mx-auto space-y-2 text-xs font-medium text-white/70">
                <div className="flex justify-between"><span>Destination:</span> <span className="font-bold text-white">{formData.destination}</span></div>
                <div className="flex justify-between"><span>Dates & Duration:</span> <span className="font-bold text-white">{formData.startDate || 'Flexible'} ({formData.duration})</span></div>
                <div className="flex justify-between"><span>Travelers:</span> <span className="font-bold text-white">{formData.travelers} ({formData.groupType})</span></div>
                <div className="flex justify-between"><span>Budget:</span> <span className="font-bold text-white">{formData.budget}</span></div>
                <div className="flex justify-between"><span>Hotel Tier:</span> <span className="font-bold text-white">{formData.hotelTier}</span></div>
              </div>

              <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
                <a
                  href={generateWhatsAppMessage()}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => haptics.medium()}
                  className="px-8 py-4 bg-emerald-500 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-emerald-400 transition-all flex items-center justify-center gap-2 shadow-xl shadow-emerald-500/20"
                >
                  <MessageCircle size={18} /> Chat Directly on WhatsApp
                </a>

                <button
                  onClick={() => setSubmitted(false)}
                  className="px-8 py-4 bg-white/10 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-white/20 transition-all"
                >
                  Create Another Request
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

export default CustomizeTrip
