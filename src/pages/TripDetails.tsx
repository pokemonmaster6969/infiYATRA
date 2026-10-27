import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  MapPin, Calendar, Users, Star, ArrowLeft, 
  CheckCircle2, Clock, ShieldCheck, ShieldAlert, ChevronDown, 
  ChevronUp, PlayCircle, Instagram, MessageCircle,
  Hotel, HelpCircle, Luggage, AlertCircle, Compass, 
  ExternalLink, Sparkles, Send, Check
} from 'lucide-react'
import { Helmet } from 'react-helmet-async'
import { getWhatsAppLink } from '../lib/data'
import { getTripById, addLead } from '../lib/dataService'
import { haptics } from '../lib/haptics'
import ResponsiveImage from '../components/ResponsiveImage'

const TripDetails = () => {
  const { id } = useParams()
  const [trip, setTrip] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [activeImage, setActiveImage] = useState(0)
  const [expandedDay, setExpandedDay] = useState<number | null>(1)
  const [expandedFaq, setExpandedFaq] = useState<number | null>(0)
  const [selectedCabin, setSelectedCabin] = useState<number>(0)
  const [selectedDeparture, setSelectedDeparture] = useState<string>('')

  // Quick inquiry form
  const [inquiryName, setInquiryName] = useState('')
  const [inquiryPhone, setInquiryPhone] = useState('')
  const [inquiryEmail, setInquiryEmail] = useState('')
  const [inquiryDate, setInquiryDate] = useState('')
  const [inquiryGuests, setInquiryGuests] = useState('2')
  const [inquirySubmitted, setInquirySubmitted] = useState(false)

  useEffect(() => {
    if (id) {
      getTripById(parseInt(id)).then(t => {
        setTrip(t || null)
        if (t?.departures && t.departures.length > 0) {
          setSelectedDeparture(t.departures[0].date)
        }
        setLoading(false)
      })
    }
  }, [id])

  if (loading) {
    return <div className="flex min-h-[70svh] items-center justify-center bg-charcoal px-5 text-center text-sm font-semibold uppercase tracking-[0.16em] text-white/50">Loading your journey...</div>
  }

  if (!trip) {
    return (
      <div className="flex min-h-[70svh] flex-col items-center justify-center gap-4 bg-charcoal px-5 text-center">
        <h1 className="font-display text-3xl font-bold uppercase text-white">Journey not found</h1>
        <Link to="/discover" className="rounded-lg liquid-glass px-4 py-3 text-sm font-semibold text-white">Browse all journeys</Link>
      </div>
    )
  }

  // Active displayed price based on cabin or single package rate
  const formattedPrice = typeof trip.price === 'number'
    ? `₹${trip.price.toLocaleString('en-IN')}`
    : typeof trip.price === 'string' && trip.price.startsWith('₹')
    ? trip.price
    : `₹${trip.price}`

  const currentPrice = trip.cabins && trip.cabins[selectedCabin]
    ? trip.cabins[selectedCabin].price
    : formattedPrice

  const handleInquirySubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    haptics.medium()
    if (!inquiryName.trim() || !inquiryPhone.trim()) return

    try {
      await addLead({
        type: trip.category === 'Cruise' ? 'cruise' : 'package',
        status: 'New',
        fullName: inquiryName,
        phone: inquiryPhone,
        email: inquiryEmail || '',
        destination: trip.title,
        travelDate: inquiryDate || selectedDeparture || trip.nextBatch,
        travelers: parseInt(inquiryGuests) || 2,
        notes: `Inquiry submitted for ${trip.title} (${currentPrice})`
      })
      setInquirySubmitted(true)
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <div className="min-h-screen bg-charcoal pb-24 pt-24 text-white sm:pt-28 lg:pb-16">
      <Helmet>
        <title>{trip.seo?.title || `${trip.title} | INFIYATRA`}</title>
        <meta name="description" content={trip.seo?.description || trip.description.substring(0, 160)} />
      </Helmet>

      {/* Navigation & Header */}
      <div className="mx-auto max-w-[1320px] px-5 py-6 sm:px-8 sm:py-8 lg:px-12">
        <Link 
          to="/discover" 
          onClick={() => haptics.light()}
          className="mb-6 inline-flex min-h-10 items-center gap-2 rounded-lg liquid-glass px-3 text-xs font-semibold text-white/85 transition-colors hover:bg-white/20"
        >
          <ArrowLeft size={16} className="mr-2" /> Back to Discover
        </Link>
        
        <div className="mb-6 flex flex-col items-start justify-between gap-5 sm:mb-8 sm:flex-row sm:items-end">
          <div>
            <div className="mb-3 flex flex-wrap items-center gap-2">
              <span className="rounded-md liquid-glass px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-white">{trip.category}</span>
              {trip.badge && (
                <span className="rounded-md bg-secondary/20 border border-secondary/40 text-secondary px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider flex items-center gap-1">
                  <Sparkles size={12} /> {trip.badge}
                </span>
              )}
              {trip.cruiseLine && (
                <span className="rounded-md bg-secondary/20 border border-secondary/40 text-secondary px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider">
                  ⚓ {trip.cruiseLine} • {trip.shipName}
                </span>
              )}
              {trip.portsOfCall && (
                <span className="rounded-md bg-white/[0.06] border border-white/10 text-white/70 px-3 py-1.5 text-[10px] font-medium">
                  Ports: {trip.portsOfCall.join(' → ')}
                </span>
              )}
              <div className="flex items-center rounded-md bg-white/[0.06] px-3 py-1.5 text-accent">
                <Star size={14} fill="currentColor" />
                <span className="ml-1.5 text-xs font-black text-white">{trip.rating} ({trip.reviews} reviews)</span>
              </div>
            </div>
            <h1 className="max-w-4xl font-display text-3xl font-black uppercase italic leading-[1.02] tracking-tight text-white sm:text-4xl lg:text-6xl">{trip.title}</h1>
            {trip.tagline && (
              <p className="mt-2 text-sm sm:text-base font-medium text-white/70 italic max-w-3xl">{trip.tagline}</p>
            )}
            <div className="mt-3 flex items-center text-sm font-medium text-white/65">
              <MapPin size={16} className="mr-2 text-secondary" /> {trip.location}
            </div>
          </div>
          <div className="flex gap-2 sm:gap-3">
            <button 
              onClick={() => haptics.light()}
              aria-label="Share trip on Instagram"
              className="flex h-11 w-11 items-center justify-center rounded-lg liquid-glass transition-colors hover:bg-white/20"
            >
              <Instagram size={20} className="text-white/80" />
            </button>
            <a 
              href={getWhatsAppLink(`Hi! I'm interested in the ${trip.title}`)}
              target="_blank" rel="noopener noreferrer"
              onClick={() => haptics.medium()}
              aria-label={`Ask about ${trip.title} on WhatsApp`}
              className="flex h-11 w-11 items-center justify-center rounded-lg liquid-glass text-[#91d5a7] transition-colors hover:bg-green-700 hover:text-white"
            >
              <MessageCircle size={20} className="text-secondary group-hover:text-white transition-colors" />
            </a>
          </div>
        </div>
      </div>

      {/* Gallery Section */}
      <section className="mx-auto mb-12 grid max-w-[1320px] grid-cols-1 gap-5 px-5 sm:mb-16 sm:gap-6 sm:px-8 lg:grid-cols-12 lg:gap-8 lg:px-12">
        <div className="space-y-3 lg:col-span-8 sm:space-y-4">
          <motion.div 
            layoutId="main-image"
            className="relative aspect-[4/3] max-h-[560px] overflow-hidden rounded-lg border border-white/10 bg-[#193431] sm:aspect-[16/10]"
          >
            <ResponsiveImage
              src={trip.images[activeImage] || trip.image}
              alt="Main Trip" 
              sizes="(max-width: 1024px) 100vw, 66vw"
              loading="eager"
              fetchPriority="high"
              className="w-full h-full object-cover transition-transform duration-[2s] hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 via-transparent to-transparent"></div>
            <div className="absolute top-8 right-8">
              <button 
                onClick={() => haptics.light()}
                aria-label="Play trip video"
                className="flex h-12 w-12 items-center justify-center rounded-full liquid-glass transition-colors hover:bg-white/20 sm:h-14 sm:w-14"
              >
                <PlayCircle size={32} className="text-white" />
              </button>
            </div>
          </motion.div>

          {/* Photographer Attribution & Caption */}
          {trip.galleryDetailed && trip.galleryDetailed[activeImage] && (
            <div className="flex flex-wrap items-center justify-between gap-2 px-1 text-[11px] text-white/55">
              <span>{trip.galleryDetailed[activeImage].caption}</span>
              <span>
                Photo by{' '}
                <a
                  href={trip.galleryDetailed[activeImage].creditUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold text-secondary hover:underline inline-flex items-center gap-1"
                >
                  {trip.galleryDetailed[activeImage].credit} <ExternalLink size={11} />
                </a>{' '}
                on {trip.galleryDetailed[activeImage].source}
              </span>
            </div>
          )}
          
          <div className="flex gap-2 overflow-x-auto pb-1">
            {(trip.images.length > 0 ? trip.images : [trip.image]).map((img: string, idx: number) => (
              <button 
                key={idx}
                onClick={() => {
                  haptics.light();
                  setActiveImage(idx);
                }}
                className={`h-16 w-20 shrink-0 overflow-hidden rounded-md border transition-opacity sm:h-20 sm:w-28 ${activeImage === idx ? 'border-secondary' : 'border-white/10 opacity-60 hover:opacity-100'}`}
              >
                <ResponsiveImage src={img} alt={`Trip gallery image ${idx + 1}`} sizes="112px" loading="lazy" className="h-full w-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Desktop Booking & Pricing Widget */}
        <div className="lg:col-span-4">
          <div className="space-y-5 rounded-lg liquid-glass-dark p-5 sm:p-6 lg:sticky lg:top-28 lg:space-y-6 lg:p-7">
            <div className="border-b border-white/10 pb-5">
              <span className="text-[10px] font-bold uppercase tracking-wider text-secondary">
                {trip.category === 'Cruise' ? 'Stateroom Rate per Guest' : 'All-Inclusive Tour Package'}
              </span>
              <div className="mt-1 flex items-baseline justify-between gap-2">
                <div className="font-display text-4xl font-black tracking-tight text-white">
                  {currentPrice}
                </div>
                <div className="rounded-lg liquid-glass px-3 py-1.5 text-center">
                  <span className="text-sm font-bold text-white">{trip.duration.split(' ')[0]}</span>
                  <span className="ml-1 text-[9px] font-semibold uppercase tracking-wider text-white/60">Days</span>
                </div>
              </div>
              <p className="mt-1 text-[11px] text-white/60 leading-relaxed">
                Per person on twin-sharing basis • Handpicked 4-star stays, daily meals & private sightseeing included
              </p>
            </div>

            {/* Quick Inclusions Highlights */}
            <div className="grid grid-cols-2 gap-2 text-[11px] font-medium text-white/75 bg-white/5 p-3 rounded-xl border border-white/5">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 size={13} className="text-secondary shrink-0" />
                <span>4★ Verified Stays</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 size={13} className="text-secondary shrink-0" />
                <span>Daily Breakfast & Dinner</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 size={13} className="text-secondary shrink-0" />
                <span>Private Cab & Transfers</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 size={13} className="text-secondary shrink-0" />
                <span>24x7 Trip Captain</span>
              </div>
            </div>

            {/* Cabin Selector for Cruises */}
            {trip.cabins && trip.cabins.length > 0 && (
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-wider text-white/60 block">
                  Select Stateroom Cabin Category
                </label>
                <div className="space-y-1.5">
                  {trip.cabins.map((cabin: any, cIdx: number) => (
                    <button
                      key={cIdx}
                      type="button"
                      onClick={() => { haptics.light(); setSelectedCabin(cIdx); }}
                      className={`w-full p-2.5 rounded-lg border text-left text-xs transition-all ${
                        selectedCabin === cIdx
                          ? 'border-secondary bg-secondary/15 text-white shadow-sm'
                          : 'border-white/10 bg-white/5 text-white/70 hover:border-white/25'
                      }`}
                    >
                      <div className="flex justify-between items-center">
                        <span className="font-bold">{cabin.type}</span>
                        <span className="font-extrabold text-secondary">{cabin.price}</span>
                      </div>
                      <p className="text-[10px] text-white/50 mt-0.5 line-clamp-1">{cabin.description}</p>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Departure Dates Selector */}
            {trip.departures && trip.departures.length > 0 ? (
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold uppercase tracking-wider text-white/60 block">
                  Upcoming Departure Batches
                </label>
                <select
                  value={selectedDeparture}
                  onChange={e => setSelectedDeparture(e.target.value)}
                  className="w-full bg-[#0F172A] border border-white/15 rounded-lg p-2.5 text-xs font-semibold text-white outline-none focus:border-secondary"
                >
                  {trip.departures.map((dep: any) => (
                    <option key={dep.id || dep.date} value={dep.date}>
                      {dep.date} — {dep.seatsAvailable || dep.seatsLeft || 10} seats left ({dep.status})
                    </option>
                  ))}
                </select>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex min-h-12 items-center justify-between gap-2 rounded-lg liquid-glass px-3 py-2.5">
                  <div className="flex items-center text-xs font-semibold text-white/70">
                    <Calendar size={18} className="mr-3 text-secondary" /> Next Batch
                  </div>
                  <span className="text-right text-xs font-semibold text-white">{trip.nextBatch}</span>
                </div>
                
                <div className="flex min-h-12 items-center justify-between gap-2 rounded-lg liquid-glass px-3 py-2.5">
                  <div className="flex items-center text-xs font-semibold text-white/70">
                    <Users size={18} className="mr-3 text-secondary" /> Group Size
                  </div>
                  <span className="text-right text-xs font-semibold text-white">{trip.groupSize}</span>
                </div>
              </div>
            )}

            <div className="space-y-2 pt-2">
              <a 
                href={getWhatsAppLink(`Hi Infi Yatra! I'd like to book ${trip.title} (Rate: ${currentPrice}) for date ${selectedDeparture || trip.nextBatch}`)}
                target="_blank" rel="noopener noreferrer"
                onClick={() => haptics.medium()}
                className="flex min-h-12 w-full items-center justify-center rounded-lg bg-secondary px-4 text-xs font-bold uppercase tracking-wider text-white transition-colors hover:bg-secondary-light shadow-lg shadow-secondary/20"
              >
                Book Your Slot
              </a>

              <Link
                to={`/customize?destination=${encodeURIComponent(trip.destination || trip.location || trip.title)}`}
                onClick={() => haptics.light()}
                className="flex min-h-11 w-full items-center justify-center gap-2 rounded-lg border border-white/20 bg-white/10 px-4 text-xs font-bold uppercase tracking-wider text-white transition-colors hover:bg-white/20"
              >
                Customize This {trip.category === 'Cruise' ? 'Cruise' : 'Package'}
              </Link>
            </div>

            <p className="text-center text-[10px] leading-relaxed text-white/45">No cancellation fee up to 15 days before departure</p>
            
            <div className="pt-6 space-y-4 border-t border-white/10">
              <div className="flex items-center gap-2 text-xs font-medium text-white/65">
                <ShieldCheck size={18} className="text-secondary mr-3 shrink-0" /> Verified Captains & Guides
              </div>
              <div className="flex items-center gap-2 text-xs font-medium text-white/65">
                <CheckCircle2 size={18} className="text-secondary mr-3 shrink-0" /> Secure Protected Bookings
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Details Grid */}
      <section className="max-w-[1320px] mx-auto px-5 sm:px-8 lg:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 pb-24">
        <div className="lg:col-span-8 space-y-16">
          {/* Overview */}
          <div>
            <h2 className="text-2xl sm:text-4xl font-display font-black text-white tracking-tight uppercase italic mb-6">
              Trip Overview
            </h2>
            <p className="text-base sm:text-lg text-white/70 leading-relaxed font-normal">
              {trip.description}
            </p>

            {/* Best Time & Visa Callout if available */}
            {trip.bestTime && (
              <div className="mt-6 p-5 rounded-2xl liquid-glass border border-white/10 space-y-2">
                <div className="flex items-center gap-2 text-secondary text-xs font-bold uppercase tracking-wider">
                  <Compass size={16} /> Best Season to Visit
                </div>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {trip.bestTime.months.map((m: string) => (
                    <span key={m} className="px-2.5 py-0.5 rounded-full bg-white/10 text-white text-[11px] font-semibold">
                      {m}
                    </span>
                  ))}
                </div>
                <p className="text-xs text-white/60 leading-relaxed pt-1">{trip.bestTime.notes}</p>
              </div>
            )}
            
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
              {trip.highlights.map((highlight: string, idx: number) => (
                <div key={idx} className="flex items-center gap-3 p-4 liquid-glass-dark border border-white/10 rounded-xl">
                  <CheckCircle2 className="text-secondary shrink-0" size={18} />
                  <span className="text-white font-semibold text-xs sm:text-sm tracking-wide">{highlight}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Itinerary */}
          <div>
            <div className="flex justify-between items-end mb-8">
              <div>
                <h2 className="text-2xl sm:text-4xl font-display font-black text-white tracking-tight uppercase italic">
                  The Day-by-Day Journey
                </h2>
                <p className="text-xs text-white/50 mt-1">Thoughtfully paced with realistic timings and transfers</p>
              </div>
              <button 
                onClick={() => {
                  haptics.light();
                  setExpandedDay(expandedDay === null ? 1 : null);
                }}
                className="text-secondary font-black text-[10px] uppercase tracking-[0.2em] border-b border-secondary/30 pb-1 hover:border-secondary transition-all"
              >
                {expandedDay === null ? 'Expand All' : 'Collapse All'}
              </button>
            </div>

            <div className="space-y-4">
              {trip.itinerary.map((item: any) => (
                <div 
                  key={item.day}
                  className={`border rounded-2xl transition-all duration-300 overflow-hidden ${
                    expandedDay === item.day ? 'border-secondary/50 liquid-glass-dark shadow-2xl' : 'border-white/10 liquid-glass hover:border-white/30 cursor-pointer'
                  }`}
                  onClick={() => {
                    haptics.light();
                    setExpandedDay(expandedDay === item.day ? null : item.day);
                  }}
                >
                  <div className="p-5 sm:p-6 flex items-center justify-between">
                    <div className="flex items-center gap-4 sm:gap-6">
                      <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-xl flex flex-col items-center justify-center font-display transition-colors duration-300 ${
                        expandedDay === item.day ? 'bg-secondary text-white shadow-lg shadow-secondary/30' : 'bg-white/5 text-white/50'
                      }`}>
                        <span className="text-[9px] font-black uppercase tracking-widest">Day</span>
                        <span className="text-lg sm:text-xl font-black italic">0{item.day}</span>
                      </div>
                      <div>
                        <h3 className="text-base sm:text-lg font-bold text-white tracking-tight">{item.title}</h3>
                        {item.stay && (
                          <p className="text-[11px] text-white/50 flex items-center gap-1.5 mt-0.5">
                            <Hotel size={12} className="text-secondary" /> Stay: {item.stay}
                          </p>
                        )}
                      </div>
                    </div>
                    {expandedDay === item.day ? <ChevronUp className="text-secondary shrink-0" size={20} /> : <ChevronDown className="text-white/30 shrink-0" size={20} />}
                  </div>
                  
                  {expandedDay === item.day && (
                    <div className="px-5 sm:px-6 pb-6 pt-1 border-t border-white/10 space-y-4 animate-fade-in">
                      {item.port && (
                        <div className="inline-flex items-center gap-2 rounded-lg bg-secondary/10 border border-secondary/20 px-3 py-1.5 text-xs font-bold text-secondary">
                          <MapPin size={13} /> Port: {item.port} {item.arrival && item.arrival !== 'Sea Day' ? `| Arr: ${item.arrival}` : ''} {item.departure && item.departure !== 'Sea Day' ? `| Dep: ${item.departure}` : ''}
                        </div>
                      )}

                      <p className="text-white/70 text-sm leading-relaxed font-normal">
                        {item.description}
                      </p>

                      {/* Day Badges: Meals, Transfer, Activities */}
                      <div className="flex flex-wrap items-center gap-2 pt-2">
                        {item.meals && (
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-[11px] font-semibold text-white/80">
                            🍽️ {item.meals}
                          </span>
                        )}
                        {item.transferInfo && (
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-[11px] font-semibold text-white/80">
                            🚐 {item.transferInfo}
                          </span>
                        )}
                      </div>

                      {item.activities && item.activities.length > 0 && (
                        <div className="pt-2">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-white/40 block mb-1.5">Key Sights & Experiences</span>
                          <div className="flex flex-wrap gap-1.5">
                            {item.activities.map((act: string, aIdx: number) => (
                              <span key={aIdx} className="px-2.5 py-1 rounded-lg bg-secondary/15 text-secondary-light text-[11px] font-semibold border border-secondary/20">
                                • {act}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Inclusions & Exclusions */}
          {((trip.inclusions && trip.inclusions.length > 0) || (trip.exclusions && trip.exclusions.length > 0)) && (
            <div className="space-y-6">
              <h2 className="text-2xl sm:text-4xl font-display font-black text-white tracking-tight uppercase italic">
                Inclusions & Exclusions
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Inclusions */}
                {trip.inclusions && trip.inclusions.length > 0 && (
                  <div className="p-6 rounded-3xl liquid-glass border border-secondary/30 space-y-4">
                    <h3 className="text-base font-bold text-secondary flex items-center gap-2">
                      <ShieldCheck size={20} /> What's Included
                    </h3>
                    <ul className="space-y-2.5">
                      {trip.inclusions.map((inc: string, idx: number) => (
                        <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-white/80">
                          <CheckCircle2 size={16} className="text-secondary shrink-0 mt-0.5" />
                          <span>{inc}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Exclusions */}
                {trip.exclusions && trip.exclusions.length > 0 && (
                  <div className="p-6 rounded-3xl liquid-glass border border-red-500/20 space-y-4">
                    <h3 className="text-base font-bold text-red-400 flex items-center gap-2">
                      <ShieldAlert size={20} /> What's Excluded
                    </h3>
                    <ul className="space-y-2.5">
                      {trip.exclusions.map((exc: string, idx: number) => (
                        <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-white/80">
                          <span className="text-red-400 font-bold shrink-0 mt-0.5">✕</span>
                          <span>{exc}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Accommodations / Hotels Section */}
          {trip.hotels && trip.hotels.length > 0 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl sm:text-4xl font-display font-black text-white tracking-tight uppercase italic">
                  Handpicked Stays & Resorts
                </h2>
                <p className="text-xs text-white/50 mt-1">Carefully vetted for cleanliness, location, hospitality, and comfort</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {trip.hotels.map((hotel: any, idx: number) => (
                  <div key={idx} className="p-5 rounded-2xl liquid-glass border border-white/10 flex items-start gap-4">
                    <div className="h-10 w-10 rounded-xl bg-secondary/20 flex items-center justify-center shrink-0 text-secondary">
                      <Hotel size={20} />
                    </div>
                    <div className="space-y-1">
                      <span className="text-[10px] uppercase font-bold tracking-wider text-secondary">
                        {hotel.city} • {hotel.nights} {hotel.nights === 1 ? 'Night' : 'Nights'}
                      </span>
                      <h4 className="text-sm font-bold text-white">{hotel.name}</h4>
                      <p className="text-xs text-white/60">{hotel.category}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Trip Essentials (Things to Carry, Tips, Visa, Cancellation) */}
          <div className="space-y-6">
            <h2 className="text-2xl sm:text-4xl font-display font-black text-white tracking-tight uppercase italic">
              Travel Essentials & Practical Info
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {trip.visaInfo && (
                <div className="p-5 rounded-2xl liquid-glass border border-white/10 space-y-2">
                  <div className="flex items-center gap-2 text-secondary text-xs font-bold uppercase tracking-wider">
                    <Compass size={16} /> Visa & Identification
                  </div>
                  <p className="text-xs text-white/70 leading-relaxed">{trip.visaInfo}</p>
                </div>
              )}

              {trip.transport && (
                <div className="p-5 rounded-2xl liquid-glass border border-white/10 space-y-2">
                  <div className="flex items-center gap-2 text-secondary text-xs font-bold uppercase tracking-wider">
                    <Luggage size={16} /> Transport & Chauffeur
                  </div>
                  <p className="text-xs text-white/70 leading-relaxed">{trip.transport.details}</p>
                </div>
              )}
            </div>

            {/* Things to Carry Chips */}
            {trip.thingsToCarry && trip.thingsToCarry.length > 0 && (
              <div className="p-5 rounded-2xl liquid-glass border border-white/10 space-y-3">
                <span className="text-xs font-bold uppercase tracking-wider text-white/80 block">What to Pack</span>
                <div className="flex flex-wrap gap-2">
                  {trip.thingsToCarry.map((item: string, idx: number) => (
                    <span key={idx} className="px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white/80">
                      ✓ {item}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Cancellation Policy */}
            {trip.cancellationPolicy && (
              <div className="p-5 rounded-2xl liquid-glass-dark border border-white/10 space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-white/80 block">Cancellation Policy</span>
                {Array.isArray(trip.cancellationPolicy) ? (
                  <ul className="space-y-1.5 text-xs text-white/60">
                    {trip.cancellationPolicy.map((slab: string, sIdx: number) => (
                      <li key={sIdx}>• {slab}</li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-xs text-white/60">{trip.cancellationPolicy}</p>
                )}
              </div>
            )}
          </div>

          {/* Frequently Asked Questions */}
          {trip.faqs && trip.faqs.length > 0 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl sm:text-4xl font-display font-black text-white tracking-tight uppercase italic">
                  Frequently Asked Questions
                </h2>
                <p className="text-xs text-white/50 mt-1">Real traveller answers from our verified destination specialists</p>
              </div>

              <div className="space-y-3">
                {trip.faqs.map((faq: any, fIdx: number) => (
                  <div 
                    key={fIdx} 
                    className="rounded-2xl liquid-glass border border-white/10 overflow-hidden"
                  >
                    <button
                      type="button"
                      onClick={() => {
                        haptics.light();
                        setExpandedFaq(expandedFaq === fIdx ? null : fIdx);
                      }}
                      className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 font-bold text-sm text-white hover:text-secondary transition-colors"
                    >
                      <span className="flex items-center gap-2.5">
                        <HelpCircle size={16} className="text-secondary shrink-0" />
                        {faq.q || faq.question}
                      </span>
                      {expandedFaq === fIdx ? <ChevronUp size={18} className="text-secondary shrink-0" /> : <ChevronDown size={18} className="text-white/40 shrink-0" />}
                    </button>

                    {expandedFaq === fIdx && (
                      <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-white/70 leading-relaxed border-t border-white/5 animate-fade-in">
                        {faq.a || faq.answer}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Captain Profile */}
          <div className="p-8 md:p-12 liquid-glass-dark border border-white/10 rounded-[2.5rem] text-white overflow-hidden relative group shadow-[0_15px_60px_rgba(0,0,0,0.4)]">
            <div className="absolute top-0 right-0 w-80 h-80 bg-secondary/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 transition-transform duration-1000 group-hover:scale-150"></div>
            
            <div className="relative z-10 flex flex-col md:flex-row gap-8 items-center md:items-start text-center md:text-left">
              <div className="relative shrink-0">
                <ResponsiveImage
                  src={trip.captain.avatar}
                  alt="Captain" 
                  sizes="160px"
                  loading="lazy"
                  className="w-28 h-28 md:w-36 md:h-36 rounded-2xl object-cover border-2 border-white/20 shadow-2xl group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute -bottom-2 -right-2 bg-secondary text-white px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-[0.2em] shadow-xl shadow-secondary/30 border border-white/20">
                  Top Rated
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <h3 className="text-2xl md:text-3xl font-display font-black italic tracking-tight text-white">{trip.captain.name}</h3>
                  <p className="text-secondary font-black text-[10px] uppercase tracking-[0.3em] mt-1">{trip.captain.role}</p>
                </div>
                <p className="text-white/60 font-medium leading-relaxed max-w-xl text-xs sm:text-sm italic">
                  {trip.captain.bio}
                </p>
                <div className="flex flex-wrap justify-center md:justify-start gap-3 pt-3 border-t border-white/10">
                  <div className="liquid-glass px-4 py-2 rounded-xl border border-white/10">
                    <span className="text-[9px] text-white/40 block font-black uppercase tracking-[0.2em]">Experience</span>
                    <span className="text-sm font-black tracking-tight">{trip.captain.trips}+ Trips</span>
                  </div>
                  <div className="liquid-glass px-4 py-2 rounded-xl border border-white/10">
                    <span className="text-[9px] text-white/40 block font-black uppercase tracking-[0.2em]">Rating</span>
                    <span className="text-sm font-black tracking-tight flex items-center gap-1.5">{trip.captain.rating} <Star size={14} fill="#FFD700" className="text-accent" /></span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Inquiry Form Box */}
          <div className="p-8 rounded-3xl liquid-glass border border-white/15 space-y-6">
            <div>
              <h3 className="text-xl sm:text-2xl font-display font-black uppercase italic tracking-tight text-white">
                Have Questions About This Journey?
              </h3>
              <p className="text-xs text-white/60 mt-1">Our dedicated travel designer will send you full PDF itineraries, custom pricing, and flight recommendations.</p>
            </div>

            {inquirySubmitted ? (
              <div className="p-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-center space-y-2">
                <CheckCircle2 size={32} className="text-emerald-400 mx-auto" />
                <h4 className="text-base font-bold text-white">Inquiry Received!</h4>
                <p className="text-xs text-white/70">Our travel concierge will reach out to you on WhatsApp within 15 minutes.</p>
              </div>
            ) : (
              <form onSubmit={handleInquirySubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input
                    type="text"
                    required
                    value={inquiryName}
                    onChange={e => setInquiryName(e.target.value)}
                    placeholder="Your Full Name *"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-xs text-white placeholder-white/40 outline-none focus:border-secondary font-medium"
                  />
                  <input
                    type="tel"
                    required
                    value={inquiryPhone}
                    onChange={e => setInquiryPhone(e.target.value)}
                    placeholder="WhatsApp Phone Number *"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-xs text-white placeholder-white/40 outline-none focus:border-secondary font-medium"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <input
                    type="email"
                    value={inquiryEmail}
                    onChange={e => setInquiryEmail(e.target.value)}
                    placeholder="Email Address (Optional)"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-xs text-white placeholder-white/40 outline-none focus:border-secondary font-medium"
                  />
                  <input
                    type="date"
                    value={inquiryDate}
                    onChange={e => setInquiryDate(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-xs text-white placeholder-white/40 outline-none focus:border-secondary font-medium"
                  />
                  <select
                    value={inquiryGuests}
                    onChange={e => setInquiryGuests(e.target.value)}
                    className="w-full bg-[#162725] border border-white/10 rounded-xl px-4 py-3 text-xs text-white outline-none focus:border-secondary font-medium"
                  >
                    <option value="1">1 Solo Traveler</option>
                    <option value="2">2 Guests (Couple/Duo)</option>
                    <option value="3">3-4 Guests (Family)</option>
                    <option value="5">5+ Guests (Group)</option>
                  </select>
                </div>

                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <button
                    type="submit"
                    className="px-6 py-3 rounded-xl bg-secondary hover:bg-secondary-light text-white text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow-lg shadow-secondary/20 transition-all active:scale-95"
                  >
                    <Send size={14} /> Send Free Inquiry
                  </button>
                  <a
                    href={getWhatsAppLink(`Hi! I'm inquiring about ${trip.title} for ${inquiryDate || 'upcoming dates'}`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-5 py-3 rounded-xl liquid-glass hover:bg-white/10 text-white/80 hover:text-white text-xs font-bold flex items-center gap-2 transition-all"
                  >
                    <MessageCircle size={15} className="text-emerald-400" /> Chat on WhatsApp Now
                  </a>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Mobile Sticky Booking Bar */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-[#0C1D1B]/95 px-4 pt-3 backdrop-blur-xl lg:hidden" style={{ paddingBottom: 'max(0.75rem, env(safe-area-inset-bottom))' }}>
        <div className="mx-auto flex max-w-lg items-center justify-between gap-3">
          <div className="min-w-0">
            <p className="text-[9px] font-semibold uppercase tracking-wider text-white/50">
              {trip.cabins && trip.cabins[selectedCabin] ? trip.cabins[selectedCabin].type : 'From / person'}
            </p>
            <p className="truncate font-display text-xl font-bold text-white">
              {currentPrice}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Link
              to={`/customize?destination=${encodeURIComponent(trip.destination || trip.location || trip.title)}`}
              onClick={() => haptics.light()}
              className="flex min-h-11 items-center justify-center rounded-lg border border-white/20 bg-white/10 px-3 text-[11px] font-bold uppercase tracking-wider text-white"
            >
              Customize
            </Link>
            <a
              href={getWhatsAppLink(`Hi Infi Yatra! I'd like to book ${trip.title} (Rate: ${currentPrice})`)}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => haptics.medium()}
              className="flex min-h-11 items-center justify-center gap-2 rounded-lg bg-secondary px-4 text-xs font-bold uppercase tracking-wider text-white transition-colors hover:bg-secondary-light"
            >
              <MessageCircle size={15} /> Book
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TripDetails
