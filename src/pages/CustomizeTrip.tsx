import React, { useState, useEffect } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import {
  SlidersHorizontal,
  MapPin,
  Calendar,
  Users,
  Compass,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  MessageCircle,
  Sparkles,
  ShieldCheck,
  Phone,
  Mail,
  User,
  Clock,
  Building,
  HeartHandshake
} from 'lucide-react'
import { addLead } from '../lib/dataService'
import { getWhatsAppLink } from '../lib/data'
import { haptics } from '../lib/haptics'

const POPULAR_DESTINATIONS = [
  'Spiti Valley',
  'Leh Ladakh',
  'Kashmir Paradise',
  'Goa & Lakshadweep Cruise',
  'Bali Island',
  'Singapore & Phuket Cruise',
  'Kerala Backwaters',
  'Meghalaya',
  'Dubai & Abu Dhabi',
  'Vietnam',
  'Himachal Pradesh'
]

const INTEREST_TAGS = [
  'Beaches & Islands',
  'Mountain Trekking',
  'Culture & Temples',
  'Street Food & Fine Dining',
  'Local Shopping & Souvenirs',
  'Ayurveda & Spa Wellness',
  'Wildlife & Bird Watching',
  'Scenic Road Trips',
  'Luxury Stays & Villas',
  'Stargazing & Camping'
]

const BUDGET_TIERS = [
  { label: 'Budget Friendly', range: '₹15,000 – ₹25,000 / person', desc: 'Hostels, cozy homestays, public transfers' },
  { label: 'Comfort Standard', range: '₹25,000 – ₹45,000 / person', desc: '3/4-star verified hotels, private cabs' },
  { label: 'Premium Luxury', range: '₹45,000 – ₹80,000 / person', desc: '4/5-star boutique resorts, guided tours' },
  { label: 'Ultra Luxury / Suite', range: '₹80,000+ / person', desc: '5-star heritage palaces, oceanview suites' },
]

const CustomizeTrip = () => {
  const [searchParams] = useSearchParams()
  const initialDestination = searchParams.get('destination') || searchParams.get('package') || ''

  const [step, setStep] = useState<1 | 2 | 3>(1)
  const [errors, setErrors] = useState<Record<string, string>>({})

  // Form State
  const [selectedDestinations, setSelectedDestinations] = useState<string[]>(
    initialDestination ? [initialDestination] : ['Spiti Valley']
  )
  const [customDestination, setCustomDestination] = useState('')
  const [startDate, setStartDate] = useState('')
  const [flexibleDates, setFlexibleDates] = useState(true)
  const [tripNights, setTripNights] = useState(6)

  // Step 2: Who & What
  const [adults, setAdults] = useState(2)
  const [children, setChildren] = useState(0)
  const [childrenAges, setChildrenAges] = useState<number[]>([])
  const [rooms, setRooms] = useState(1)
  const [budgetTier, setBudgetTier] = useState('Comfort Standard')
  const [hotelTier, setHotelTier] = useState('4-Star Premium')
  const [selectedInterests, setSelectedInterests] = useState<string[]>(['Beaches & Islands', 'Local Shopping & Souvenirs'])
  const [specialNotes, setSpecialNotes] = useState('')

  // Step 3: Contact
  const [fullName, setFullName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [contactMethod, setContactMethod] = useState<'WhatsApp' | 'Phone Call' | 'Email'>('WhatsApp')
  const [contactTime, setContactTime] = useState<'Morning' | 'Afternoon' | 'Evening'>('Morning')
  const [honeypot, setHoneypot] = useState('') // Spam protection

  const [submitted, setSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Sync destination if query param changes
  useEffect(() => {
    if (initialDestination && !selectedDestinations.includes(initialDestination)) {
      setSelectedDestinations(prev => [initialDestination, ...prev])
    }
  }, [initialDestination])

  const toggleDestination = (dest: string) => {
    haptics.light()
    setSelectedDestinations(prev =>
      prev.includes(dest) ? prev.filter(d => d !== dest) : [...prev, dest]
    )
  }

  const addCustomDest = () => {
    if (!customDestination.trim()) return
    haptics.light()
    if (!selectedDestinations.includes(customDestination.trim())) {
      setSelectedDestinations(prev => [...prev, customDestination.trim()])
    }
    setCustomDestination('')
  }

  const toggleInterest = (interest: string) => {
    haptics.light()
    setSelectedInterests(prev =>
      prev.includes(interest) ? prev.filter(i => i !== interest) : [...prev, interest]
    )
  }

  const handleChildrenCountChange = (count: number) => {
    const valid = Math.max(0, count)
    setChildren(valid)
    setChildrenAges(prev => {
      const copy = [...prev]
      if (valid > copy.length) {
        while (copy.length < valid) copy.push(5)
      } else {
        copy.splice(valid)
      }
      return copy
    })
  }

  const validateStep1 = () => {
    const err: Record<string, string> = {}
    if (selectedDestinations.length === 0) {
      err.destination = 'Please pick at least one destination.'
    }
    if (tripNights < 1) {
      err.nights = 'Trip length must be at least 1 night.'
    }
    setErrors(err)
    return Object.keys(err).length === 0
  }

  const validateStep2 = () => {
    const err: Record<string, string> = {}
    if (adults < 1) {
      err.adults = 'At least 1 adult traveler is required.'
    }
    if (rooms < 1) {
      err.rooms = 'At least 1 room is required.'
    }
    setErrors(err)
    return Object.keys(err).length === 0
  }

  const validateStep3 = () => {
    const err: Record<string, string> = {}
    if (!fullName.trim()) {
      err.name = 'Please provide your full name.'
    }
    if (!phone.trim() || phone.trim().length < 8) {
      err.phone = 'Please enter a valid phone number with country code.'
    }
    setErrors(err)
    return Object.keys(err).length === 0
  }

  const nextStep = () => {
    haptics.medium()
    if (step === 1 && validateStep1()) {
      setStep(2)
      window.scrollTo({ top: 150, behavior: 'smooth' })
    } else if (step === 2 && validateStep2()) {
      setStep(3)
      window.scrollTo({ top: 150, behavior: 'smooth' })
    }
  }

  const prevStep = () => {
    haptics.light()
    if (step === 2) setStep(1)
    if (step === 3) setStep(2)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (honeypot) return // Bot submission trapped

    if (!validateStep3()) return

    haptics.medium()
    setIsSubmitting(true)

    const destinationSummary = selectedDestinations.join(', ')
    const selectedBudgetObj = BUDGET_TIERS.find(b => b.label === budgetTier)
    const budgetStr = selectedBudgetObj ? `${budgetTier} (${selectedBudgetObj.range})` : budgetTier

    const notesSummary = [
      specialNotes ? `Notes: ${specialNotes}` : '',
      `Children Ages: ${children > 0 ? childrenAges.join(', ') : 'None'}`,
      `Rooms: ${rooms}`,
      `Interests: ${selectedInterests.join(', ')}`,
      `Flexible Dates: ${flexibleDates ? 'Yes (+/- 3 days)' : 'Exact'}`,
      `Preferred Contact: ${contactMethod} during ${contactTime}`
    ].filter(Boolean).join(' | ')

    try {
      await addLead({
        type: 'custom_trip',
        fullName,
        email,
        phone,
        destination: destinationSummary,
        travelDate: startDate || 'Flexible',
        duration: `${tripNights} Nights`,
        travelers: adults + children,
        groupType: children > 0 ? 'Family with Kids' : adults === 2 ? 'Couple' : 'Group',
        budget: budgetStr,
        hotelTier,
        interests: selectedInterests,
        notes: notesSummary,
        preferredContactMethod: contactMethod,
        preferredContactTime: contactTime
      })
    } catch (err) {
      console.error(err)
    }

    setIsSubmitting(false)
    setSubmitted(true)
    haptics.success()
  }

  const generateWhatsAppMessage = () => {
    const text = `Hi Infi Yatra! I designed a custom trip plan:
📍 Destinations: ${selectedDestinations.join(', ')}
📅 When: ${startDate || 'Flexible'} (${tripNights} Nights${flexibleDates ? ', flexible dates' : ''})
👥 Travelers: ${adults} Adults${children > 0 ? `, ${children} Children (ages: ${childrenAges.join(', ')})` : ''} (${rooms} Room${rooms > 1 ? 's' : ''})
💰 Budget: ${budgetTier}
🏨 Hotel: ${hotelTier}
✨ Interests: ${selectedInterests.join(', ')}
👤 Name: ${fullName}
📞 Phone: ${phone}
⏰ Preferred contact: ${contactMethod} in the ${contactTime}
${specialNotes ? `📝 Requests: ${specialNotes}` : ''}`
    return getWhatsAppLink(text)
  }

  return (
    <div className="min-h-screen bg-charcoal pb-24 pt-24 text-white sm:pt-28">
      <Helmet>
        <title>Customize Your Dream Trip — INFIYATRA</title>
        <meta name="description" content="Design your personalized holiday in 3 easy steps. Destinations, dates, hotels, and group size tailored just for you." />
      </Helmet>

      <div className="mx-auto max-w-4xl px-4 sm:px-8">
        {/* Header */}
        <div className="mb-8 text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 rounded-full liquid-glass px-4 py-1.5 shadow-lg">
            <Sparkles size={14} className="text-secondary" />
            <span className="text-[10px] font-bold uppercase tracking-[0.24em] text-secondary">
              TAILORED EXPEDITIONS
            </span>
          </div>
          <h1 className="font-display text-3xl font-black uppercase italic leading-none tracking-tight sm:text-5xl">
            Design Your <span className="text-primary-light">Journey</span>
          </h1>
          <p className="text-xs sm:text-sm text-white/60 leading-relaxed">
            Tell us where you want to go and how you like to travel. We’ll craft a personalized itinerary within 2 hours.
          </p>
        </div>

        {/* Progress Bar (3 Steps) */}
        {!submitted && (
          <div className="mb-8 bg-white/[0.03] border border-white/10 rounded-2xl p-4 sm:p-5">
            <div className="flex items-center justify-between mb-3 text-xs font-bold uppercase tracking-wider">
              <span className={step >= 1 ? 'text-secondary' : 'text-white/40'}>
                1. Where & When
              </span>
              <span className={step >= 2 ? 'text-secondary' : 'text-white/40'}>
                2. Who & What
              </span>
              <span className={step >= 3 ? 'text-secondary' : 'text-white/40'}>
                3. Contact Info
              </span>
            </div>
            <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-secondary to-primary"
                initial={{ width: '33%' }}
                animate={{ width: step === 1 ? '33%' : step === 2 ? '66%' : '100%' }}
                transition={{ duration: 0.35 }}
              />
            </div>
          </div>
        )}

        {/* Wizard Card */}
        <div className="rounded-2xl liquid-glass-dark border border-white/10 p-6 sm:p-10 shadow-2xl">
          {!submitted ? (
            <form onSubmit={handleSubmit}>
              {/* Spam Honeypot (hidden from humans) */}
              <input
                type="text"
                name="user_secret_trap"
                value={honeypot}
                onChange={e => setHoneypot(e.target.value)}
                tabIndex={-1}
                autoComplete="off"
                className="sr-only"
                aria-hidden="true"
              />

              <AnimatePresence mode="wait">
                {/* ─── STEP 1: WHERE & WHEN ───────────────────────────── */}
                {step === 1 && (
                  <motion.div
                    key="step-1"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-8"
                  >
                    <div>
                      <h2 className="text-xl font-bold uppercase tracking-tight text-white flex items-center gap-2">
                        <MapPin size={20} className="text-secondary" />
                        Step 1: Where do you want to explore?
                      </h2>
                      <p className="text-xs text-white/50 mt-1">
                        Select one or more destinations, or add your custom dream place.
                      </p>
                    </div>

                    {/* Destination Chips */}
                    <div className="space-y-3">
                      <div className="flex flex-wrap gap-2">
                        {POPULAR_DESTINATIONS.map(dest => {
                          const isSelected = selectedDestinations.includes(dest)
                          return (
                            <button
                              key={dest}
                              type="button"
                              onClick={() => toggleDestination(dest)}
                              className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 ${
                                isSelected
                                  ? 'bg-secondary text-white shadow-md shadow-secondary/30 scale-[1.02]'
                                  : 'bg-white/5 border border-white/10 text-white/70 hover:bg-white/10 hover:text-white'
                              }`}
                            >
                              {isSelected && <CheckCircle2 size={13} />}
                              {dest}
                            </button>
                          )
                        })}
                      </div>

                      {/* Add Custom Destination */}
                      <div className="flex gap-2 pt-2">
                        <input
                          type="text"
                          value={customDestination}
                          onChange={e => setCustomDestination(e.target.value)}
                          onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); addCustomDest(); } }}
                          placeholder="Other destination (e.g. Iceland, Bhutan, Seychelles)..."
                          className="flex-grow bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-xs font-medium text-white placeholder:text-white/30 focus:border-secondary focus:outline-none"
                        />
                        <button
                          type="button"
                          onClick={addCustomDest}
                          className="px-4 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-bold uppercase tracking-wider text-white transition-colors"
                        >
                          + Add
                        </button>
                      </div>

                      {errors.destination && (
                        <p className="text-xs text-red-400 font-medium">{errors.destination}</p>
                      )}
                    </div>

                    {/* Travel Dates & Trip Length */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-white/10">
                      {/* Start Date */}
                      <div className="space-y-2">
                        <label className="text-[11px] font-bold uppercase tracking-wider text-white/60 block">
                          Estimated Travel Date
                        </label>
                        <div className="relative">
                          <input
                            type="date"
                            value={startDate}
                            onChange={e => setStartDate(e.target.value)}
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-xs font-medium text-white focus:border-secondary focus:outline-none"
                          />
                        </div>
                        <label className="flex items-center gap-2 pt-1 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={flexibleDates}
                            onChange={e => setFlexibleDates(e.target.checked)}
                            className="w-4 h-4 rounded accent-secondary"
                          />
                          <span className="text-xs text-white/60">My dates are flexible (+/- 3 days)</span>
                        </label>
                      </div>

                      {/* Nights Duration Counter */}
                      <div className="space-y-2">
                        <label className="text-[11px] font-bold uppercase tracking-wider text-white/60 block">
                          Trip Length ({tripNights} Nights)
                        </label>
                        <div className="flex items-center gap-3">
                          <button
                            type="button"
                            onClick={() => { haptics.light(); setTripNights(n => Math.max(1, n - 1)); }}
                            className="h-11 w-11 rounded-xl bg-white/10 hover:bg-white/20 flex items-center justify-center font-bold text-lg text-white"
                          >
                            -
                          </button>
                          <div className="flex-grow text-center font-display text-xl font-bold bg-white/5 border border-white/10 py-2.5 rounded-xl text-secondary">
                            {tripNights} Nights
                          </div>
                          <button
                            type="button"
                            onClick={() => { haptics.light(); setTripNights(n => n + 1); }}
                            className="h-11 w-11 rounded-xl bg-white/10 hover:bg-white/20 flex items-center justify-center font-bold text-lg text-white"
                          >
                            +
                          </button>
                        </div>
                        <div className="flex gap-2 pt-1">
                          {[3, 5, 7, 10, 14].map(n => (
                            <button
                              key={n}
                              type="button"
                              onClick={() => { haptics.light(); setTripNights(n); }}
                              className={`flex-1 py-1 rounded-lg text-[10px] font-bold uppercase transition-colors ${
                                tripNights === n ? 'bg-secondary text-white' : 'bg-white/5 text-white/50 hover:bg-white/10'
                              }`}
                            >
                              {n}N
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="pt-6 flex justify-end">
                      <button
                        type="button"
                        onClick={nextStep}
                        className="inline-flex min-h-12 items-center gap-2 rounded-xl bg-secondary px-8 text-xs font-bold uppercase tracking-wider text-white transition-all hover:bg-secondary-light shadow-lg shadow-secondary/20"
                      >
                        Next: Who & What <ArrowRight size={16} />
                      </button>
                    </div>
                  </motion.div>
                )}

                {/* ─── STEP 2: WHO & WHAT ─────────────────────────────── */}
                {step === 2 && (
                  <motion.div
                    key="step-2"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-8"
                  >
                    <div>
                      <h2 className="text-xl font-bold uppercase tracking-tight text-white flex items-center gap-2">
                        <Users size={20} className="text-secondary" />
                        Step 2: Who is traveling & what do you enjoy?
                      </h2>
                      <p className="text-xs text-white/50 mt-1">
                        Tell us your group composition and preferred travel style.
                      </p>
                    </div>

                    {/* Adults, Children, Rooms Counters */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      {/* Adults */}
                      <div className="bg-white/5 border border-white/10 rounded-xl p-4 space-y-2">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-white/50 block">Adults (12+ yrs)</span>
                        <div className="flex items-center justify-between">
                          <button
                            type="button"
                            onClick={() => { haptics.light(); setAdults(a => Math.max(1, a - 1)); }}
                            className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center font-bold text-white hover:bg-white/20"
                          >
                            -
                          </button>
                          <span className="font-display text-xl font-bold text-white">{adults}</span>
                          <button
                            type="button"
                            onClick={() => { haptics.light(); setAdults(a => a + 1); }}
                            className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center font-bold text-white hover:bg-white/20"
                          >
                            +
                          </button>
                        </div>
                      </div>

                      {/* Children */}
                      <div className="bg-white/5 border border-white/10 rounded-xl p-4 space-y-2">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-white/50 block">Children (0-11 yrs)</span>
                        <div className="flex items-center justify-between">
                          <button
                            type="button"
                            onClick={() => { haptics.light(); handleChildrenCountChange(children - 1); }}
                            className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center font-bold text-white hover:bg-white/20"
                          >
                            -
                          </button>
                          <span className="font-display text-xl font-bold text-white">{children}</span>
                          <button
                            type="button"
                            onClick={() => { haptics.light(); handleChildrenCountChange(children + 1); }}
                            className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center font-bold text-white hover:bg-white/20"
                          >
                            +
                          </button>
                        </div>
                      </div>

                      {/* Rooms */}
                      <div className="bg-white/5 border border-white/10 rounded-xl p-4 space-y-2">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-white/50 block">Hotel Rooms</span>
                        <div className="flex items-center justify-between">
                          <button
                            type="button"
                            onClick={() => { haptics.light(); setRooms(r => Math.max(1, r - 1)); }}
                            className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center font-bold text-white hover:bg-white/20"
                          >
                            -
                          </button>
                          <span className="font-display text-xl font-bold text-white">{rooms}</span>
                          <button
                            type="button"
                            onClick={() => { haptics.light(); setRooms(r => r + 1); }}
                            className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center font-bold text-white hover:bg-white/20"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Children Age Fields */}
                    {children > 0 && (
                      <div className="p-4 bg-white/[0.03] border border-white/10 rounded-xl space-y-3">
                        <span className="text-xs font-bold text-secondary uppercase tracking-wider">
                          Children Ages (required for accurate hotel beds & permits)
                        </span>
                        <div className="flex flex-wrap gap-3">
                          {childrenAges.map((age, cIdx) => (
                            <div key={cIdx} className="flex items-center gap-2 bg-white/5 px-3 py-2 rounded-lg border border-white/10">
                              <span className="text-xs text-white/60">Child {cIdx + 1}:</span>
                              <input
                                type="number"
                                min={0}
                                max={11}
                                value={age}
                                onChange={e => {
                                  const val = parseInt(e.target.value) || 0
                                  setChildrenAges(prev => {
                                    const copy = [...prev]
                                    copy[cIdx] = val
                                    return copy
                                  })
                                }}
                                className="w-14 bg-white/10 border border-white/20 rounded px-2 py-1 text-xs text-center font-bold text-white"
                              />
                              <span className="text-[10px] text-white/40">yrs</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Budget per Person Selector */}
                    <div className="space-y-3 pt-2">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-white/60 block">
                        Estimated Budget per Person
                      </span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {BUDGET_TIERS.map(b => {
                          const isSelected = budgetTier === b.label
                          return (
                            <button
                              key={b.label}
                              type="button"
                              onClick={() => { haptics.light(); setBudgetTier(b.label); }}
                              className={`p-4 rounded-xl border text-left transition-all ${
                                isSelected
                                  ? 'border-secondary bg-secondary/15 shadow-md shadow-secondary/20'
                                  : 'border-white/10 bg-white/5 hover:border-white/20'
                              }`}
                            >
                              <div className="flex items-center justify-between">
                                <span className={`text-xs font-bold ${isSelected ? 'text-secondary' : 'text-white'}`}>
                                  {b.label}
                                </span>
                                <span className="text-[10px] font-bold text-white/70">{b.range}</span>
                              </div>
                              <p className="text-[11px] text-white/45 mt-1">{b.desc}</p>
                            </button>
                          )
                        })}
                      </div>
                    </div>

                    {/* Hotel Category */}
                    <div className="space-y-3 pt-2">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-white/60 block">
                        Preferred Hotel Tier
                      </span>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                        {['3-Star Comfort', '4-Star Premium', '5-Star Luxury', 'Heritage / Boutique'].map(tier => (
                          <button
                            key={tier}
                            type="button"
                            onClick={() => { haptics.light(); setHotelTier(tier); }}
                            className={`py-3 px-2 rounded-xl text-xs font-semibold border transition-all text-center ${
                              hotelTier === tier
                                ? 'border-primary bg-primary text-white shadow-md'
                                : 'border-white/10 bg-white/5 text-white/60 hover:text-white'
                            }`}
                          >
                            {tier}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Travel Interests Chips */}
                    <div className="space-y-3 pt-2">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-white/60 block">
                        Trip Interests & Experiences
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {INTEREST_TAGS.map(tag => {
                          const isSelected = selectedInterests.includes(tag)
                          return (
                            <button
                              key={tag}
                              type="button"
                              onClick={() => toggleInterest(tag)}
                              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                                isSelected
                                  ? 'bg-secondary text-white'
                                  : 'bg-white/5 border border-white/10 text-white/60 hover:text-white'
                              }`}
                            >
                              {tag}
                            </button>
                          )
                        })}
                      </div>
                    </div>

                    {/* Special Requests */}
                    <div className="space-y-2 pt-2">
                      <label className="text-[11px] font-bold uppercase tracking-wider text-white/60 block">
                        Any specific requests, flights, or dietary requirements?
                      </label>
                      <textarea
                        value={specialNotes}
                        onChange={e => setSpecialNotes(e.target.value)}
                        placeholder="e.g. Vegetarian food, celebrating an anniversary, need airport pickup in private SUV..."
                        rows={3}
                        className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-xs text-white placeholder:text-white/30 focus:border-secondary focus:outline-none"
                      />
                    </div>

                    <div className="pt-6 flex justify-between items-center">
                      <button
                        type="button"
                        onClick={prevStep}
                        className="inline-flex min-h-12 items-center gap-2 rounded-xl bg-white/10 px-6 text-xs font-bold uppercase tracking-wider text-white hover:bg-white/20"
                      >
                        <ArrowLeft size={16} /> Back
                      </button>
                      <button
                        type="button"
                        onClick={nextStep}
                        className="inline-flex min-h-12 items-center gap-2 rounded-xl bg-secondary px-8 text-xs font-bold uppercase tracking-wider text-white transition-all hover:bg-secondary-light shadow-lg shadow-secondary/20"
                      >
                        Next: Contact Info <ArrowRight size={16} />
                      </button>
                    </div>
                  </motion.div>
                )}

                {/* ─── STEP 3: CONTACT & SUBMISSION ──────────────────── */}
                {step === 3 && (
                  <motion.div
                    key="step-3"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-8"
                  >
                    <div>
                      <h2 className="text-xl font-bold uppercase tracking-tight text-white flex items-center gap-2">
                        <HeartHandshake size={20} className="text-secondary" />
                        Step 3: Where should we send your custom proposal?
                      </h2>
                      <p className="text-xs text-white/50 mt-1">
                        Our trip planning expert will review your destinations and reach out.
                      </p>
                    </div>

                    <div className="space-y-4">
                      {/* Name */}
                      <div>
                        <label className="text-[11px] font-bold uppercase tracking-wider text-white/60 block mb-1.5">
                          Full Name *
                        </label>
                        <div className="relative">
                          <User size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/40" />
                          <input
                            type="text"
                            value={fullName}
                            onChange={e => setFullName(e.target.value)}
                            placeholder="e.g. Siddharth Patel"
                            className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-3.5 text-xs font-medium text-white placeholder:text-white/30 focus:border-secondary focus:outline-none"
                            required
                          />
                        </div>
                        {errors.name && <p className="text-xs text-red-400 mt-1">{errors.name}</p>}
                      </div>

                      {/* Phone & Country Code */}
                      <div>
                        <label className="text-[11px] font-bold uppercase tracking-wider text-white/60 block mb-1.5">
                          Phone / WhatsApp Number *
                        </label>
                        <div className="relative">
                          <Phone size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/40" />
                          <input
                            type="tel"
                            value={phone}
                            onChange={e => setPhone(e.target.value)}
                            placeholder="+91 98765 43210"
                            className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-3.5 text-xs font-medium text-white placeholder:text-white/30 focus:border-secondary focus:outline-none"
                            required
                          />
                        </div>
                        {errors.phone && <p className="text-xs text-red-400 mt-1">{errors.phone}</p>}
                      </div>

                      {/* Email */}
                      <div>
                        <label className="text-[11px] font-bold uppercase tracking-wider text-white/60 block mb-1.5">
                          Email Address (Optional)
                        </label>
                        <div className="relative">
                          <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/40" />
                          <input
                            type="email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            placeholder="siddharth@example.com"
                            className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-3.5 text-xs font-medium text-white placeholder:text-white/30 focus:border-secondary focus:outline-none"
                          />
                        </div>
                      </div>

                      {/* Preferred Contact Method & Timing */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                        <div>
                          <label className="text-[11px] font-bold uppercase tracking-wider text-white/60 block mb-1.5">
                            Preferred Contact Method
                          </label>
                          <div className="flex gap-2">
                            {(['WhatsApp', 'Phone Call', 'Email'] as const).map(method => (
                              <button
                                key={method}
                                type="button"
                                onClick={() => { haptics.light(); setContactMethod(method); }}
                                className={`flex-1 py-2.5 rounded-xl text-xs font-semibold border transition-colors ${
                                  contactMethod === method
                                    ? 'bg-secondary text-white border-secondary'
                                    : 'bg-white/5 text-white/60 border-white/10 hover:text-white'
                                }`}
                              >
                                {method}
                              </button>
                            ))}
                          </div>
                        </div>

                        <div>
                          <label className="text-[11px] font-bold uppercase tracking-wider text-white/60 block mb-1.5">
                            Best Time to Connect
                          </label>
                          <div className="flex gap-2">
                            {(['Morning', 'Afternoon', 'Evening'] as const).map(time => (
                              <button
                                key={time}
                                type="button"
                                onClick={() => { haptics.light(); setContactTime(time); }}
                                className={`flex-1 py-2.5 rounded-xl text-xs font-semibold border transition-colors ${
                                  contactTime === time
                                    ? 'bg-primary text-white border-primary'
                                    : 'bg-white/5 text-white/60 border-white/10 hover:text-white'
                                }`}
                              >
                                {time}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Summary Preview Box */}
                    <div className="bg-white/[0.03] border border-white/10 rounded-xl p-4 text-xs space-y-2">
                      <div className="flex justify-between text-white/70">
                        <span>Destinations:</span>
                        <span className="font-bold text-white text-right">{selectedDestinations.join(', ')}</span>
                      </div>
                      <div className="flex justify-between text-white/70">
                        <span>Duration & Timing:</span>
                        <span className="font-bold text-white">{startDate || 'Flexible dates'} ({tripNights} Nights)</span>
                      </div>
                      <div className="flex justify-between text-white/70">
                        <span>Group Size & Rooms:</span>
                        <span className="font-bold text-white">{adults} Adults{children > 0 ? `, ${children} Kids` : ''} • {rooms} Room{rooms > 1 ? 's' : ''}</span>
                      </div>
                      <div className="flex justify-between text-white/70">
                        <span>Budget & Tier:</span>
                        <span className="font-bold text-secondary">{budgetTier} • {hotelTier}</span>
                      </div>
                    </div>

                    <div className="pt-6 flex justify-between items-center">
                      <button
                        type="button"
                        onClick={prevStep}
                        className="inline-flex min-h-12 items-center gap-2 rounded-xl bg-white/10 px-6 text-xs font-bold uppercase tracking-wider text-white hover:bg-white/20"
                      >
                        <ArrowLeft size={16} /> Back
                      </button>
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="inline-flex min-h-12 items-center gap-2 rounded-xl bg-gradient-to-r from-secondary to-primary px-9 text-xs font-black uppercase tracking-widest text-white transition-all hover:scale-[1.02] shadow-xl shadow-secondary/30 disabled:opacity-50"
                      >
                        {isSubmitting ? 'Submitting...' : 'Submit Custom Plan'} <Sparkles size={16} />
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
          ) : (
            /* ─── SUCCESS SCREEN ────────────────────────────────────────── */
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-6 space-y-6"
            >
              <div className="w-16 h-16 mx-auto rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/30">
                <CheckCircle2 size={36} />
              </div>

              <div>
                <h2 className="font-display text-2xl sm:text-3xl font-black uppercase italic text-white tracking-tight">
                  Your Journey Request is Confirmed!
                </h2>
                <p className="text-sm text-white/70 mt-2 max-w-md mx-auto leading-relaxed">
                  Thank you, <span className="font-bold text-white">{fullName}</span>! Our Ahmedabad expedition expert will review your itinerary and contact you within <span className="text-secondary font-bold">2 hours</span>.
                </p>
              </div>

              {/* Plan Summary Card */}
              <div className="max-w-lg mx-auto bg-white/5 border border-white/10 rounded-2xl p-5 text-left text-xs space-y-3">
                <div className="flex justify-between border-b border-white/10 pb-2">
                  <span className="text-white/50 uppercase text-[10px] font-bold">Destinations</span>
                  <span className="font-bold text-white">{selectedDestinations.join(', ')}</span>
                </div>
                <div className="flex justify-between border-b border-white/10 pb-2">
                  <span className="text-white/50 uppercase text-[10px] font-bold">Duration</span>
                  <span className="font-bold text-white">{tripNights} Nights ({startDate || 'Flexible dates'})</span>
                </div>
                <div className="flex justify-between border-b border-white/10 pb-2">
                  <span className="text-white/50 uppercase text-[10px] font-bold">Group</span>
                  <span className="font-bold text-white">{adults} Adults{children > 0 ? `, ${children} Children` : ''} • {rooms} Room{rooms > 1 ? 's' : ''}</span>
                </div>
                <div className="flex justify-between border-b border-white/10 pb-2">
                  <span className="text-white/50 uppercase text-[10px] font-bold">Selected Tier</span>
                  <span className="font-bold text-secondary">{budgetTier} ({hotelTier})</span>
                </div>
                {selectedInterests.length > 0 && (
                  <div className="flex justify-between">
                    <span className="text-white/50 uppercase text-[10px] font-bold">Interests</span>
                    <span className="font-bold text-white/80">{selectedInterests.slice(0, 3).join(', ')}</span>
                  </div>
                )}
              </div>

              {/* Instant WhatsApp Action */}
              <div className="pt-2 flex flex-col sm:flex-row justify-center gap-3">
                <a
                  href={generateWhatsAppMessage()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 px-6 text-xs font-bold uppercase tracking-wider text-white transition-all shadow-lg shadow-emerald-600/30"
                >
                  <MessageCircle size={17} /> Connect on WhatsApp Now
                </a>
                <Link
                  to="/packages"
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-white/10 hover:bg-white/20 px-6 text-xs font-bold uppercase tracking-wider text-white transition-all"
                >
                  <Compass size={17} /> Explore All Packages
                </Link>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  )
}

export default CustomizeTrip
