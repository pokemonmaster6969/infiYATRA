<<<<<<< HEAD
import React, { useState, useEffect } from 'react'
=======
import React, { useState } from 'react'
>>>>>>> 2c9a9e5 (initial commit with large files)
import { useParams, Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  MapPin, Calendar, Users, Star, ArrowLeft, 
  CheckCircle2, Clock, ShieldCheck, ChevronDown, 
  ChevronUp, PlayCircle, Instagram, MessageCircle 
} from 'lucide-react'
<<<<<<< HEAD
import { Helmet } from 'react-helmet-async'
import { getWhatsAppLink } from '../lib/data'
import { getTripById } from '../lib/dataService'

const TripDetails = () => {
  const { id } = useParams()
  const [trip, setTrip] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [activeImage, setActiveImage] = useState(0)
  const [expandedDay, setExpandedDay] = useState<number | null>(1)

  useEffect(() => {
    if (id) {
      getTripById(parseInt(id)).then(t => {
        setTrip(t || null)
        setLoading(false)
      })
    }
  }, [id])

  if (loading) {
     return <div className="min-h-screen flex items-center justify-center bg-charcoal uppercase font-black tracking-widest text-white/40">Loading Expedition...</div>
  }

  if (!trip) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-charcoal uppercase font-black text-4xl tracking-tighter text-white/30 liquid-text">
        Expedition Not Found
      </div>
    )
  }

  return (
    <div className="bg-charcoal min-h-screen pt-28 pb-12">
      <Helmet>
        <title>{trip.title} — INFIYATRA</title>
        <meta name="description" content={trip.description.substring(0, 160)} />
      </Helmet>
      {/* Navigation & Header */}
      <div className="max-w-[1920px] mx-auto px-6 md:px-12 lg:px-20 py-8">
        <Link to="/discover" className="inline-flex items-center text-secondary font-black tracking-widest text-xs uppercase hover:gap-3 transition-all mb-8 drop-shadow-md">
          <ArrowLeft size={16} className="mr-2" /> Back to Discover
        </Link>
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-8">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="liquid-glass text-white px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border border-white/20">Most Popular</span>
              <div className="flex items-center text-accent bg-black/20 px-3 py-1.5 rounded-full border border-white/5">
                <Star size={14} fill="currentColor" />
                <span className="ml-1.5 text-xs font-black text-white">{trip.rating} ({trip.reviews} reviews)</span>
              </div>
            </div>
            <h1 className="text-4xl md:text-6xl font-display font-black text-white liquid-text italic uppercase tracking-tighter">{trip.title}</h1>
            <div className="flex items-center text-white/60 mt-4 font-black uppercase tracking-widest text-xs">
              <MapPin size={16} className="mr-2 text-secondary" /> {trip.location}
            </div>
          </div>
          <div className="flex gap-3">
            <button className="liquid-glass-dark p-4 border border-white/10 rounded-2xl hover:bg-white/10 transition-colors shadow-xl">
              <Instagram size={20} className="text-white/80" />
            </button>
            <a 
              href={getWhatsAppLink(`Hi! I'm interested in the ${trip.title}`)}
              target="_blank" rel="noopener noreferrer"
              className="liquid-glass-dark p-4 border border-white/10 rounded-2xl hover:bg-secondary hover:border-secondary transition-colors flex items-center justify-center shadow-xl group"
            >
              <MessageCircle size={20} className="text-secondary group-hover:text-white transition-colors" />
            </a>
=======

// Mock Data for a single trip
const MOCK_TRIP = {
  id: 1,
  title: 'Mystical Manali & Spiti Valley Adventure',
  location: 'Himachal Pradesh, India',
  price: 14999,
  duration: '6 Days / 5 Nights',
  rating: 4.9,
  reviews: 124,
  groupSize: '12-15 Persons',
  nextBatch: 'Oct 15, 2026',
  description: 'Embark on an unforgettable journey through the heart of the Himalayas. Discover the ancient monasteries of Spiti, the lush valleys of Manali, and cross high-altitude passes that will take your breath away. This curated expedition is designed for those who seek both solace and spectacle.',
  images: [
    'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&q=80&w=1200',
    'https://images.unsplash.com/photo-1596753100642-1264c8f0017a?auto=format&fit=crop&q=80&w=800',
    'https://images.unsplash.com/photo-1587574293340-e0011c4e8ecf?auto=format&fit=crop&q=80&w=800',
    'https://images.unsplash.com/photo-1544085311-11a028465b03?auto=format&fit=crop&q=80&w=800'
  ],
  videoThumbnail: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&q=80&w=800',
  captain: {
    name: 'Captain Rohan Shah',
    role: 'Lead Expedition Specialist',
    bio: 'With over 10 years of experience in high-altitude trekking, Rohan has led 50+ successful Spiti expeditions. He is a certified mountaineer and an avid storyteller.',
    rating: 5.0,
    trips: 45,
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200'
  },
  itinerary: [
    {
      day: 1,
      title: 'Arrival in Manali & Orientation',
      description: 'Check-in to our boutique campsite. Evening orientation with Captain Rohan and fellow travelers. Gear check and local explore.'
    },
    {
      day: 2,
      title: 'The Gateway: Rohtang Pass to Kaza',
      description: 'A scenic drive crossing the mighty Rohtang Pass. Enter the Lahaul Valley and witness the landscape change from green to golden brown.'
    },
    {
      day: 3,
      title: 'Monasteries & Mysticism',
      description: 'Visit the 1000-year-old Key Monastery. Later, drive to Kibber, one of the world\'s highest inhabited villages.'
    },
    {
      day: 4,
      title: 'The High Altitude Lake: Chandratal',
      description: 'Trek to the pristine Moon Lake (Chandratal). Spent the night under a billion stars in our luxury camps.'
    },
    {
      day: 5,
      title: 'The Return Journey to Manali',
      description: 'Drive back through Kunzum Pass. Evening farewell dinner in Manali with live music and shared memories.'
    },
    {
      day: 6,
      title: 'Departure with Memories',
      description: 'Breakfast at the campsite and drop-off to the bus stand. Trip ends with lifelong friendships.'
    }
  ],
  highlights: [
    'Traditional Spitian Homestay Experience',
    'Professional Photography Sessions',
    'Stargazing at Chandratal Lake',
    'Expert-led Local Culture Walks',
    'All Meals & High-land Gear Included'
  ]
}

const TripDetails = () => {
  const { id } = useParams()
  const [activeImage, setActiveImage] = useState(0)
  const [expandedDay, setExpandedDay] = useState<number | null>(1)

  return (
    <div className="bg-white min-h-screen pt-20">
      {/* Navigation & Header */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <Link to="/discover" className="inline-flex items-center text-primary font-bold hover:gap-2 transition-all mb-6">
          <ArrowLeft size={20} className="mr-2" /> Back to Discover
        </Link>
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="bg-secondary/10 text-secondary px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">Most Popular</span>
              <div className="flex items-center text-accent">
                <Star size={16} fill="currentColor" />
                <span className="ml-1 text-sm font-bold text-charcoal">{MOCK_TRIP.rating} ({MOCK_TRIP.reviews} reviews)</span>
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-display font-extrabold text-charcoal">{MOCK_TRIP.title}</h1>
            <div className="flex items-center text-gray-500 mt-2 font-medium">
              <MapPin size={18} className="mr-1 text-primary" /> {MOCK_TRIP.location}
            </div>
          </div>
          <div className="flex gap-3">
            <button className="p-3 border border-gray-200 rounded-2xl hover:bg-gray-50 transition-colors">
              <Instagram size={20} className="text-gray-600" />
            </button>
            <button className="p-3 border border-gray-200 rounded-2xl hover:bg-gray-50 transition-colors">
              <MessageCircle size={20} className="text-primary" />
            </button>
>>>>>>> 2c9a9e5 (initial commit with large files)
          </div>
        </div>
      </div>

      {/* Gallery Section */}
<<<<<<< HEAD
      <section className="max-w-[1920px] mx-auto px-6 md:px-12 lg:px-20 grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
        <div className="lg:col-span-8 space-y-6">
          <motion.div 
            layoutId="main-image"
            className="relative h-[400px] md:h-[600px] rounded-[3rem] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-white/10"
          >
            <img 
              src={trip.images[activeImage] || trip.image} 
              alt="Main Trip" 
              className="w-full h-full object-cover transition-transform duration-[2s] hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 via-transparent to-transparent"></div>
            <div className="absolute top-8 right-8">
              <button className="liquid-glass p-5 rounded-full shadow-2xl hover:scale-110 hover:bg-secondary/20 transition-all border border-white/20">
                <PlayCircle size={32} className="text-white" />
=======
      <section className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-12 gap-6 mb-12">
        <div className="lg:col-span-8 space-y-4">
          <motion.div 
            layoutId="main-image"
            className="relative h-[400px] md:h-[550px] rounded-[2.5rem] overflow-hidden shadow-2xl"
          >
            <img 
              src={MOCK_TRIP.images[activeImage]} 
              alt="Main Trip" 
              className="w-full h-full object-cover"
            />
            <div className="absolute top-6 right-6">
              <button className="bg-white/90 backdrop-blur-md p-4 rounded-full shadow-lg hover:scale-110 transition-transform">
                <PlayCircle size={32} className="text-secondary" />
>>>>>>> 2c9a9e5 (initial commit with large files)
              </button>
            </div>
          </motion.div>
          
          <div className="grid grid-cols-4 gap-4">
<<<<<<< HEAD
            {(trip.images.length > 0 ? trip.images : [trip.image]).map((img: string, idx: number) => (
              <button 
                key={idx}
                onClick={() => setActiveImage(idx)}
                className={`h-24 md:h-32 rounded-[2rem] overflow-hidden border-2 transition-all duration-500 ${activeImage === idx ? 'border-secondary scale-95 shadow-xl shadow-secondary/20' : 'border-white/10 opacity-50 hover:opacity-100 hover:scale-105'}`}
=======
            {MOCK_TRIP.images.map((img, idx) => (
              <button 
                key={idx}
                onClick={() => setActiveImage(idx)}
                className={`h-24 md:h-32 rounded-3xl overflow-hidden border-4 transition-all ${activeImage === idx ? 'border-primary' : 'border-transparent opacity-70 hover:opacity-100'}`}
>>>>>>> 2c9a9e5 (initial commit with large files)
              >
                <img src={img} alt={`Thumb ${idx}`} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Desktop Booking Widget */}
        <div className="lg:col-span-4">
<<<<<<< HEAD
          <div className="sticky top-32 liquid-glass-dark border border-white/10 rounded-[3rem] p-8 md:p-10 shadow-[0_15px_60px_rgba(0,0,0,0.5)] space-y-8">
            <div className="flex justify-between items-center pb-8 border-b border-white/10">
              <div>
                <span className="text-[10px] text-white/40 font-black uppercase tracking-[0.3em] drop-shadow-sm">Price per person</span>
                <div className="text-5xl font-display font-black text-white tracking-tighter mt-2 liquid-text italic">₹{trip.price}</div>
              </div>
              <div className="liquid-glass p-4 rounded-2xl text-center min-w-[100px] border border-white/5">
                <div className="text-white font-black text-2xl drop-shadow-md">{trip.duration.split(' ')[0]}</div>
                <div className="text-[9px] text-white/60 font-black uppercase tracking-[0.2em] mt-1">Days</div>
=======
          <div className="sticky top-32 bg-white border border-gray-100 rounded-[2.5rem] p-8 shadow-2xl shadow-primary/5 space-y-6">
            <div className="flex justify-between items-center pb-6 border-b border-gray-50">
              <div>
                <span className="text-sm text-gray-400 font-bold uppercase truncate">Price per person</span>
                <div className="text-4xl font-display font-extrabold text-secondary">₹{MOCK_TRIP.price.toLocaleString()}</div>
              </div>
              <div className="bg-primary/5 p-3 rounded-2xl text-center min-w-[100px]">
                <div className="text-primary font-extrabold text-lg">{MOCK_TRIP.duration.split('/')[0]}</div>
                <div className="text-[10px] text-primary/60 font-bold uppercase tracking-tighter">Expedition</div>
>>>>>>> 2c9a9e5 (initial commit with large files)
              </div>
            </div>

            <div className="space-y-4">
<<<<<<< HEAD
              <div className="flex items-center justify-between p-5 liquid-glass rounded-2xl border border-white/10 hover:border-white/20 transition-colors">
                <div className="flex items-center text-white/80 font-black uppercase tracking-widest text-xs">
                  <Calendar size={18} className="mr-3 text-secondary" /> Next Batch
                </div>
                <span className="text-white font-black">{trip.nextBatch}</span>
              </div>
              
              <div className="flex items-center justify-between p-5 liquid-glass rounded-2xl border border-white/10 hover:border-white/20 transition-colors">
                <div className="flex items-center text-white/80 font-black uppercase tracking-widest text-xs">
                  <Users size={18} className="mr-3 text-secondary" /> Group Size
                </div>
                <span className="text-white font-black">{trip.groupSize}</span>
              </div>
            </div>

            <a 
              href={getWhatsAppLink(`Hi! I'm interested in booking the ${trip.title}`)}
              target="_blank" rel="noopener noreferrer"
              className="w-full bg-secondary text-white py-6 rounded-2xl font-black text-xs uppercase tracking-[0.3em] transition-all shadow-2xl shadow-secondary/30 block text-center transform hover:scale-105 active:scale-95 border border-transparent hover:border-white/20"
            >
              Book Your Slot
            </a>
            <p className="text-center text-[10px] text-white/40 font-bold uppercase tracking-widest">No cancellation fee up to 15 days before departure</p>
            
            <div className="pt-6 space-y-4 border-t border-white/10">
              <div className="flex items-center text-xs font-black tracking-widest uppercase text-white/60">
                <ShieldCheck size={18} className="text-green-400 mr-3" /> Verified Captains
              </div>
              <div className="flex items-center text-xs font-black tracking-widest uppercase text-white/60">
                <CheckCircle2 size={18} className="text-green-400 mr-3" /> Secure Payments
=======
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl border border-gray-100">
                <div className="flex items-center text-charcoal font-bold">
                  <Calendar size={18} className="mr-3 text-primary" /> Next Batch
                </div>
                <span className="text-primary font-bold">{MOCK_TRIP.nextBatch}</span>
              </div>
              
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl border border-gray-100">
                <div className="flex items-center text-charcoal font-bold">
                  <Users size={18} className="mr-3 text-primary" /> Group Size
                </div>
                <span className="text-primary font-bold">{MOCK_TRIP.groupSize}</span>
              </div>
            </div>

            <button className="w-full bg-primary hover:bg-primary-dark text-white py-5 rounded-2xl font-extrabold text-lg transition-all shadow-xl shadow-primary/20">
              Book Your Slot
            </button>
            <p className="text-center text-xs text-gray-400 font-medium">No cancellation fee up to 15 days before departure</p>
            
            <div className="pt-4 space-y-3">
              <div className="flex items-center text-sm font-semibold text-gray-600">
                <ShieldCheck size={16} className="text-green-500 mr-2" /> Verified Captains
              </div>
              <div className="flex items-center text-sm font-semibold text-gray-600">
                <CheckCircle2 size={16} className="text-green-500 mr-2" /> Secure Payments
>>>>>>> 2c9a9e5 (initial commit with large files)
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Details Grid */}
<<<<<<< HEAD
      <section className="max-w-[1920px] mx-auto px-6 md:px-12 lg:px-20 grid grid-cols-1 lg:grid-cols-12 gap-12 pb-24">
        <div className="lg:col-span-8 space-y-20">
          {/* Overview */}
          <div>
            <h2 className="text-3xl md:text-5xl font-display font-black text-white tracking-tighter uppercase italic mb-8 liquid-text">Trip Overview</h2>
            <p className="text-lg text-white/60 leading-relaxed font-medium italic">
              {trip.description}
            </p>
            
            <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-4">
              {trip.highlights.map((highlight: string, idx: number) => (
                <div key={idx} className="flex items-center gap-4 p-5 liquid-glass-dark border border-white/10 rounded-2xl shadow-lg">
                  <CheckCircle2 className="text-secondary shrink-0" size={20} />
                  <span className="text-white font-bold text-sm tracking-wide">{highlight}</span>
=======
      <section className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-12 gap-12 pb-24">
        <div className="lg:col-span-8 space-y-16">
          {/* Overview */}
          <div>
            <h2 className="text-3xl font-display font-extrabold text-charcoal mb-6">Trip Overview</h2>
            <p className="text-lg text-gray-600 leading-relaxed font-medium">
              {MOCK_TRIP.description}
            </p>
            
            <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-4">
              {MOCK_TRIP.highlights.map((highlight, idx) => (
                <div key={idx} className="flex items-center gap-3 p-4 bg-primary/5 rounded-2xl">
                  <CheckCircle2 className="text-primary shrink-0" size={20} />
                  <span className="text-charcoal font-semibold text-sm">{highlight}</span>
>>>>>>> 2c9a9e5 (initial commit with large files)
                </div>
              ))}
            </div>
          </div>

          {/* Itinerary */}
          <div>
<<<<<<< HEAD
            <div className="flex justify-between items-end mb-10">
              <h2 className="text-3xl md:text-5xl font-display font-black text-white tracking-tighter uppercase italic liquid-text">The Itinerary</h2>
              <button 
                onClick={() => setExpandedDay(expandedDay === null ? 1 : null)}
                className="text-secondary font-black text-[10px] uppercase tracking-[0.2em] border-b border-secondary/30 pb-1 hover:border-secondary transition-all"
=======
            <div className="flex justify-between items-end mb-8">
              <h2 className="text-3xl font-display font-extrabold text-charcoal">The Itinerary</h2>
              <button 
                onClick={() => setExpandedDay(expandedDay === null ? 1 : null)}
                className="text-primary font-bold text-sm"
>>>>>>> 2c9a9e5 (initial commit with large files)
              >
                {expandedDay === null ? 'Expand All' : 'Collapse All'}
              </button>
            </div>

            <div className="space-y-4">
<<<<<<< HEAD
              {trip.itinerary.map((item: any) => (
                <div 
                  key={item.day}
                  className={`border rounded-3xl transition-all duration-500 overflow-hidden ${expandedDay === item.day ? 'border-secondary/50 liquid-glass-dark shadow-2xl' : 'border-white/10 liquid-glass hover:border-white/30 cursor-pointer'}`}
                  onClick={() => setExpandedDay(expandedDay === item.day ? null : item.day)}
                >
                  <div className="p-6 md:p-8 flex items-center justify-between">
                    <div className="flex items-center gap-6">
                      <div className={`w-16 h-16 rounded-2xl flex flex-col items-center justify-center font-display transition-colors duration-500 ${expandedDay === item.day ? 'bg-secondary text-white shadow-lg shadow-secondary/30' : 'bg-white/5 text-white/40'}`}>
                        <span className="text-[10px] font-black uppercase tracking-widest">Day</span>
                        <span className="text-2xl font-black italic">0{item.day}</span>
                      </div>
                      <h3 className="text-xl md:text-2xl font-bold text-white tracking-tight">{item.title}</h3>
                    </div>
                    {expandedDay === item.day ? <ChevronUp className="text-secondary" size={24} /> : <ChevronDown className="text-white/30" size={24} />}
=======
              {MOCK_TRIP.itinerary.map((item) => (
                <div 
                  key={item.day}
                  className={`border-2 rounded-3xl transition-all ${expandedDay === item.day ? 'border-primary bg-primary/[0.02]' : 'border-gray-100 hover:border-gray-200 cursor-pointer'}`}
                  onClick={() => setExpandedDay(expandedDay === item.day ? null : item.day)}
                >
                  <div className="p-6 flex items-center justify-between">
                    <div className="flex items-center gap-6">
                      <div className={`w-14 h-14 rounded-2xl flex flex-col items-center justify-center font-display transition-colors ${expandedDay === item.day ? 'bg-primary text-white' : 'bg-gray-100 text-gray-500'}`}>
                        <span className="text-[10px] font-bold uppercase tracking-tighter">Day</span>
                        <span className="text-xl font-black">0{item.day}</span>
                      </div>
                      <h3 className="text-xl font-bold text-charcoal">{item.title}</h3>
                    </div>
                    {expandedDay === item.day ? <ChevronUp className="text-primary" /> : <ChevronDown className="text-gray-300" />}
>>>>>>> 2c9a9e5 (initial commit with large files)
                  </div>
                  
                  <AnimatePresence>
                    {expandedDay === item.day && (
                      <motion.div 
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
<<<<<<< HEAD
                        transition={{ duration: 0.4, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 md:px-8 pb-8 pl-[6.5rem] md:pl-[7.5rem] pr-6">
                          <div className="w-full h-px bg-white/10 mb-6"></div>
                          <p className="text-white/60 font-medium leading-relaxed italic">
                            {item.description}
                          </p>
                          <div className="mt-8 flex items-center text-xs text-secondary font-black uppercase tracking-widest bg-secondary/10 w-fit px-4 py-2 rounded-full border border-secondary/20">
                            <Clock size={14} className="mr-2" /> Typical Activity: 4-6 Hours
=======
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-8 pl-24 pr-12">
                          <p className="text-gray-500 font-medium leading-relaxed">
                            {item.description}
                          </p>
                          <div className="mt-6 flex items-center text-sm text-primary font-bold">
                            <Clock size={16} className="mr-2" /> Typical Activity: 4-6 Hours
>>>>>>> 2c9a9e5 (initial commit with large files)
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </div>

          {/* Captain Profile */}
<<<<<<< HEAD
          <div className="p-8 md:p-12 liquid-glass-dark border border-white/10 rounded-[3rem] text-white overflow-hidden relative group shadow-[0_15px_60px_rgba(0,0,0,0.4)]">
            <div className="absolute top-0 right-0 w-80 h-80 bg-secondary/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 transition-transform duration-1000 group-hover:scale-150"></div>
            
            <div className="relative z-10 flex flex-col md:flex-row gap-10 items-center md:items-start text-center md:text-left">
              <div className="relative shrink-0">
                <img 
                  src={trip.captain.avatar} 
                  alt="Captain" 
                  className="w-32 h-32 md:w-40 md:h-40 rounded-[2rem] object-cover border-2 border-white/20 shadow-2xl group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute -bottom-3 -right-3 bg-secondary text-white px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-[0.2em] shadow-xl shadow-secondary/30 border border-white/20">
=======
          <div className="p-8 md:p-12 bg-charcoal rounded-[3rem] text-white overflow-hidden relative group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
            
            <div className="relative z-10 flex flex-col md:flex-row gap-8 items-center md:items-start text-center md:text-left">
              <div className="relative shrink-0">
                <img 
                  src={MOCK_TRIP.captain.avatar} 
                  alt="Captain" 
                  className="w-32 h-32 md:w-40 md:h-40 rounded-[2rem] object-cover border-4 border-white/10"
                />
                <div className="absolute -bottom-2 -right-2 bg-secondary text-white px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg">
>>>>>>> 2c9a9e5 (initial commit with large files)
                  Top Rated
                </div>
              </div>
              
<<<<<<< HEAD
              <div className="space-y-5">
                <div>
                  <h3 className="text-3xl md:text-4xl font-display font-black italic tracking-tighter liquid-text">{trip.captain.name}</h3>
                  <p className="text-secondary font-black text-[10px] uppercase tracking-[0.3em] mt-2">{trip.captain.role}</p>
                </div>
                <p className="text-white/50 font-medium leading-relaxed max-w-xl italic">
                  {trip.captain.bio}
                </p>
                <div className="flex flex-wrap justify-center md:justify-start gap-4 pt-4 border-t border-white/10">
                  <div className="liquid-glass px-5 py-3 rounded-2xl border border-white/10">
                    <span className="text-[9px] text-white/40 block font-black uppercase tracking-[0.2em] mb-1">Experience</span>
                    <span className="text-lg font-black tracking-tighter">{trip.captain.trips}+ Trips</span>
                  </div>
                  <div className="liquid-glass px-5 py-3 rounded-2xl border border-white/10">
                    <span className="text-[9px] text-white/40 block font-black uppercase tracking-[0.2em] mb-1">Rating</span>
                    <span className="text-lg font-black tracking-tighter flex items-center gap-1.5">{trip.captain.rating} <Star size={16} fill="#FFD700" className="text-accent" /></span>
=======
              <div className="space-y-4">
                <div>
                  <h3 className="text-3xl font-display font-extrabold">{MOCK_TRIP.captain.name}</h3>
                  <p className="text-secondary font-bold text-sm uppercase tracking-widest">{MOCK_TRIP.captain.role}</p>
                </div>
                <p className="text-gray-400 font-medium leading-relaxed max-w-xl">
                  {MOCK_TRIP.captain.bio}
                </p>
                <div className="flex flex-wrap justify-center md:justify-start gap-4 pt-4">
                  <div className="bg-white/5 backdrop-blur-sm px-4 py-2 rounded-2xl border border-white/10">
                    <span className="text-xs text-gray-500 block font-bold uppercase tracking-tighter">Experience</span>
                    <span className="text-lg font-bold">{MOCK_TRIP.captain.trips}+ Trips</span>
                  </div>
                  <div className="bg-white/5 backdrop-blur-sm px-4 py-2 rounded-2xl border border-white/10">
                    <span className="text-xs text-gray-500 block font-bold uppercase tracking-tighter">Rating</span>
                    <span className="text-lg font-bold flex items-center gap-1">{MOCK_TRIP.captain.rating} <Star size={16} fill="#FFD700" className="text-accent" /></span>
>>>>>>> 2c9a9e5 (initial commit with large files)
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default TripDetails
