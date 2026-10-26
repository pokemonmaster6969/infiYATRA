import React, { useEffect, useState } from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Save,
  ArrowLeft,
  ExternalLink,
  Image as ImageIcon,
  MapPin,
  Clock,
  Trash2,
  Plus,
  Info,
  List,
  Sparkles,
  Ship,
  Calendar,
  CheckCircle2,
  DollarSign,
  ShieldCheck,
  ShieldAlert,
  Layers,
  ChevronRight
} from 'lucide-react'
import { getTripById, updateTrip, addTrip, addAuditLog } from '../../lib/dataService'
import { Trip, CATEGORIES, CruiseCabin, DepartureDate } from '../../lib/trips'
import { haptics } from '../../lib/haptics'

type TabType = 'general' | 'cruise' | 'itinerary' | 'inclusions' | 'departures' | 'gallery'

const DEFAULT_CABINS: CruiseCabin[] = [
  { type: 'Interior Stateroom', price: '₹29,999', description: 'Cozy climate-controlled private cabin with smart TV and en-suite bath.', perks: ['All Meals Included', '24/7 Room Service'] },
  { type: 'Oceanview Stateroom', price: '₹38,999', description: 'Private picture window framing unobstructed Arabian Sea / Ocean vistas.', perks: ['Window Sea View', 'Priority Embarkation'] },
  { type: 'Balcony Suite', price: '₹54,999', description: 'Expansive private walkout veranda with deck chairs and champagne on arrival.', perks: ['Private Veranda', 'Complimentary Minibar', 'Lounge Access'] },
  { type: 'Chairman Luxury Suite', price: '₹95,000', description: 'Palatial penthouse with dedicated private butler, whirlpool tub, and VIP access.', perks: ['Personal Butler', 'VIP Lounge', 'Bridge Tour'] }
]

const COMMON_INCLUSIONS = [
  'All meals as specified in itinerary',
  '5-Star or luxury boutique hotel stays',
  'Port charges, fuel surcharges & harbor taxes',
  'Private AC transfers for all sightseeing',
  'English-speaking certified expedition guides',
  'Access to all onboard swimming pools & fitness center',
  'Curated evening cultural shows & live entertainment'
]

const COMMON_EXCLUSIONS = [
  'Domestic or international flight tickets',
  'Personal expenses, tips and porterage',
  'Alcoholic beverages and specialty a la carte dining',
  'Mandatory comprehensive travel & medical insurance',
  'Optional adventure sports and scuba diving gear rental',
  'Any entry fees not explicitly stated in itinerary'
]

const EditTrip: React.FC = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState<TabType>('general')
  const [saving, setSaving] = useState(false)
  const [saveSuccess, setSaveSuccess] = useState(false)

  const [formData, setFormData] = useState<Partial<Trip>>({
    title: '',
    location: '',
    price: '',
    duration: '',
    category: 'Adventure',
    type: 'Domestic',
    featured: false,
    status: 'Published',
    badge: null,
    image: '',
    rating: 4.8,
    reviews: 120,
    link: '#',
    description: '',
    images: [],
    highlights: [],
    inclusions: [],
    exclusions: [],
    departures: [],
    nextBatch: '',
    groupSize: '10-15 Persons',
    captain: {
      name: 'Captain Rohan Shah',
      role: 'Lead Expedition Specialist',
      bio: 'Expert in high-altitude trekking and local storytelling.',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200',
      rating: 5.0,
      trips: 45
    },
    itinerary: [],
    cruiseLine: '',
    shipName: '',
    embarkationPort: '',
    disembarkationPort: '',
    portsOfCall: [],
    cabins: []
  })

  const [newImageUrl, setNewImageUrl] = useState('')
  const [newHighlight, setNewHighlight] = useState('')
  const [newInclusion, setNewInclusion] = useState('')
  const [newExclusion, setNewExclusion] = useState('')

  // New departure date input state
  const [newDepDate, setNewDepDate] = useState('')
  const [newDepSeats, setNewDepSeats] = useState(25)
  const [newDepPrice, setNewDepPrice] = useState('')

  useEffect(() => {
    if (sessionStorage.getItem('isAdmin') !== 'true') {
      navigate('/admin/login')
    }
    if (id && id !== 'new') {
      getTripById(parseInt(id)).then(trip => {
        if (trip) {
          setFormData({
            ...trip,
            status: trip.status || 'Published',
            inclusions: trip.inclusions || [],
            exclusions: trip.exclusions || [],
            departures: trip.departures || [],
            portsOfCall: trip.portsOfCall || [],
            cabins: trip.cabins && trip.cabins.length > 0 ? trip.cabins : (trip.category === 'Cruise' ? DEFAULT_CABINS : [])
          })
        }
      })
    }
  }, [id, navigate])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    haptics.medium()
    setSaving(true)

    // Ensure cover image is in gallery
    const imagesList = formData.images && formData.images.length > 0
      ? formData.images
      : (formData.image ? [formData.image] : ['https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=1200'])

    const finalData: Trip = {
      id: id && id !== 'new' ? parseInt(id) : Date.now(),
      title: formData.title || 'Untitled Journey',
      location: formData.location || 'Multiple Destinations',
      price: formData.price || '24,999',
      duration: formData.duration || '5 Days / 4 Nights',
      category: formData.category || 'Adventure',
      type: formData.type || 'Domestic',
      featured: !!formData.featured,
      status: formData.status || 'Published',
      badge: formData.badge || null,
      image: formData.image || imagesList[0],
      images: imagesList,
      rating: formData.rating || 4.9,
      reviews: formData.reviews || 85,
      link: formData.link || '#',
      description: formData.description || '',
      highlights: formData.highlights || [],
      inclusions: formData.inclusions || [],
      exclusions: formData.exclusions || [],
      departures: formData.departures || [],
      nextBatch: formData.nextBatch || (formData.departures && formData.departures[0]?.date) || 'Upcoming dates open',
      groupSize: formData.groupSize || '10-15 Persons',
      captain: formData.captain || {
        name: 'Captain Rohan Shah',
        role: 'Lead Expedition Specialist',
        bio: 'Expert in high-altitude trekking and local storytelling.',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200',
        rating: 5.0,
        trips: 45
      },
      itinerary: formData.itinerary || [],
      cruiseLine: formData.cruiseLine,
      shipName: formData.shipName,
      embarkationPort: formData.embarkationPort,
      disembarkationPort: formData.disembarkationPort,
      portsOfCall: formData.portsOfCall,
      cabins: formData.category === 'Cruise' ? (formData.cabins && formData.cabins.length > 0 ? formData.cabins : DEFAULT_CABINS) : undefined
    }

    try {
      if (id && id !== 'new') {
        await updateTrip(finalData)
        await addAuditLog({
          user: 'Admin',
          action: 'Updated Package',
          details: `Modified package #${finalData.id} (${finalData.title})`
        })
      } else {
        await addTrip(finalData)
        await addAuditLog({
          user: 'Admin',
          action: 'Created Package',
          details: `Added new package "${finalData.title}"`
        })
      }

      setSaveSuccess(true)
      setTimeout(() => {
        navigate('/admin/dashboard')
      }, 700)
    } catch (err) {
      console.error('Failed to save trip:', err)
      setSaving(false)
    }
  }

  // Gallery helpers
  const addGalleryImage = () => {
    if (!newImageUrl.trim()) return
    haptics.light()
    setFormData(prev => ({
      ...prev,
      images: [...(prev.images || []), newImageUrl.trim()]
    }))
    setNewImageUrl('')
  }

  const removeGalleryImage = (index: number) => {
    haptics.light()
    setFormData(prev => {
      const list = [...(prev.images || [])]
      list.splice(index, 1)
      return { ...prev, images: list }
    })
  }

  // Highlight helpers
  const addHighlightItem = () => {
    if (!newHighlight.trim()) return
    haptics.light()
    setFormData(prev => ({
      ...prev,
      highlights: [...(prev.highlights || []), newHighlight.trim()]
    }))
    setNewHighlight('')
  }

  const removeHighlightItem = (index: number) => {
    haptics.light()
    setFormData(prev => {
      const list = [...(prev.highlights || [])]
      list.splice(index, 1)
      return { ...prev, highlights: list }
    })
  }

  // Inclusions & Exclusions helpers
  const addInclusionItem = (text?: string) => {
    const val = (text || newInclusion).trim()
    if (!val) return
    haptics.light()
    if (!formData.inclusions?.includes(val)) {
      setFormData(prev => ({
        ...prev,
        inclusions: [...(prev.inclusions || []), val]
      }))
    }
    if (!text) setNewInclusion('')
  }

  const removeInclusionItem = (index: number) => {
    haptics.light()
    setFormData(prev => {
      const list = [...(prev.inclusions || [])]
      list.splice(index, 1)
      return { ...prev, inclusions: list }
    })
  }

  const addExclusionItem = (text?: string) => {
    const val = (text || newExclusion).trim()
    if (!val) return
    haptics.light()
    if (!formData.exclusions?.includes(val)) {
      setFormData(prev => ({
        ...prev,
        exclusions: [...(prev.exclusions || []), val]
      }))
    }
    if (!text) setNewExclusion('')
  }

  const removeExclusionItem = (index: number) => {
    haptics.light()
    setFormData(prev => {
      const list = [...(prev.exclusions || [])]
      list.splice(index, 1)
      return { ...prev, exclusions: list }
    })
  }

  // Departures helpers
  const addDepartureDate = () => {
    if (!newDepDate) return
    haptics.light()
    const newEntry: DepartureDate = {
      id: 'dep-' + Date.now(),
      date: newDepDate,
      seatsTotal: newDepSeats,
      seatsAvailable: newDepSeats,
      priceOverride: newDepPrice ? `₹${newDepPrice.replace(/[^\d]/g, '')}` : undefined,
      status: 'Open'
    }
    setFormData(prev => ({
      ...prev,
      departures: [...(prev.departures || []), newEntry]
    }))
    setNewDepDate('')
    setNewDepPrice('')
  }

  const removeDepartureDate = (index: number) => {
    haptics.light()
    setFormData(prev => {
      const list = [...(prev.departures || [])]
      list.splice(index, 1)
      return { ...prev, departures: list }
    })
  }

  const isCruise = formData.category === 'Cruise'

  const tabs: { key: TabType; label: string; icon: any; count?: number; badge?: string }[] = [
    { key: 'general', label: 'Basic Info & Pricing', icon: Info },
    ...(isCruise ? [{ key: 'cruise' as TabType, label: 'Cruise Details & Cabins', icon: Ship, badge: 'Cruise' }] : []),
    { key: 'itinerary', label: 'Itinerary Builder', icon: List, count: formData.itinerary?.length || 0 },
    { key: 'inclusions', label: 'Inclusions & Exclusions', icon: ShieldCheck, count: (formData.inclusions?.length || 0) + (formData.exclusions?.length || 0) },
    { key: 'departures', label: 'Departures & Batches', icon: Calendar, count: formData.departures?.length || 0 },
    { key: 'gallery', label: 'Photos & Highlights', icon: ImageIcon, count: formData.images?.length || 0 },
  ]

  return (
    <div className="min-h-screen bg-[#071311] text-white p-4 sm:p-6 md:p-12 pb-36">
      <div className="max-w-6xl mx-auto">
        {/* Navigation Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <Link
            to="/admin/dashboard"
            onClick={() => haptics.light()}
            className="inline-flex items-center gap-2 rounded-xl bg-white/5 px-4 py-2 text-xs font-bold text-white/80 hover:bg-white/10 hover:text-white transition-all border border-white/10"
          >
            <ArrowLeft size={16} /> Back to Inventory
          </Link>

          <div className="flex items-center gap-3">
            {id && id !== 'new' && (
              <a
                href={`/trip/${id}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-xl bg-emerald-500/10 px-4 py-2 text-xs font-bold text-emerald-400 hover:bg-emerald-500/20 transition-all border border-emerald-500/20"
              >
                <ExternalLink size={14} /> Preview Live Page
              </a>
            )}

            {/* Status Selector */}
            <div className="flex items-center gap-1 bg-white/5 p-1 rounded-xl border border-white/10">
              {(['Published', 'Draft', 'Archived'] as const).map(st => (
                <button
                  key={st}
                  type="button"
                  onClick={() => {
                    haptics.light()
                    setFormData({ ...formData, status: st })
                  }}
                  className={`px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all ${
                    formData.status === st
                      ? st === 'Published'
                        ? 'bg-emerald-500 text-white shadow-sm'
                        : st === 'Draft'
                        ? 'bg-amber-500 text-white shadow-sm'
                        : 'bg-white/20 text-white'
                      : 'text-white/50 hover:text-white'
                  }`}
                >
                  {st}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Page Header */}
        <header className="mb-8">
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-secondary px-3 py-1 rounded-full bg-secondary/10 border border-secondary/20">
              {id === 'new' ? 'New Package' : `ID #${id}`}
            </span>
            {formData.featured && (
              <span className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-300 bg-amber-400/10 border border-amber-400/20 px-2.5 py-0.5 rounded-full">
                <Sparkles size={12} /> Showcased on Home
              </span>
            )}
          </div>
          <h1 className="mt-2 text-3xl sm:text-4xl font-display font-black tracking-tight text-white">
            {formData.title || (id === 'new' ? 'Create New Journey' : 'Edit Package')}
          </h1>
          <p className="mt-1 text-sm text-white/60">
            Configure package metadata, cabin pricing, itinerary schedules, departure dates, and photo assets.
          </p>
        </header>

        {/* Tabs Bar */}
        <div className="flex overflow-x-auto no-scrollbar gap-2 pb-2 mb-8 border-b border-white/10">
          {tabs.map(tab => {
            const Icon = tab.icon
            const isActive = activeTab === tab.key
            return (
              <button
                key={tab.key}
                type="button"
                onClick={() => {
                  haptics.light()
                  setActiveTab(tab.key)
                }}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-secondary text-white shadow-lg shadow-secondary/25'
                    : 'bg-white/5 text-white/70 hover:bg-white/10 hover:text-white border border-white/5'
                }`}
              >
                <Icon size={14} />
                <span>{tab.label}</span>
                {typeof tab.count === 'number' && (
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${isActive ? 'bg-white/30 text-white' : 'bg-white/10 text-white/60'}`}>
                    {tab.count}
                  </span>
                )}
                {tab.badge && (
                  <span className="text-[9px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-blue-500/20 text-blue-300">
                    {tab.badge}
                  </span>
                )}
              </button>
            )
          })}
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* TAB 1: GENERAL & PRICING */}
          {activeTab === 'general' && (
            <div className="space-y-6">
              <div className="rounded-3xl liquid-glass p-6 sm:p-8 space-y-6">
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <Info size={18} className="text-secondary" /> Package Essentials
                  </h3>
                  <label className="flex items-center gap-2 cursor-pointer bg-white/5 hover:bg-white/10 px-3 py-1.5 rounded-xl border border-white/10 transition-colors">
                    <input
                      type="checkbox"
                      checked={!!formData.featured}
                      onChange={e => setFormData({ ...formData, featured: e.target.checked })}
                      className="w-4 h-4 accent-secondary rounded"
                    />
                    <span className="text-xs font-bold text-white flex items-center gap-1.5">
                      <Sparkles size={14} className="text-amber-400" /> Showcase on Homepage
                    </span>
                  </label>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[11px] uppercase font-bold text-white/50 tracking-wider">Package Title *</label>
                    <input
                      type="text"
                      value={formData.title}
                      onChange={e => setFormData({ ...formData, title: e.target.value })}
                      placeholder="e.g. Goa & Lakshadweep Luxury Cruise"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/30 focus:border-secondary outline-none font-semibold"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-[11px] uppercase font-bold text-white/50 tracking-wider">Destination / Location *</label>
                    <input
                      type="text"
                      value={formData.location}
                      onChange={e => setFormData({ ...formData, location: e.target.value })}
                      placeholder="e.g. Goa, Agatti Island, Kadmat"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/30 focus:border-secondary outline-none font-semibold"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="space-y-2">
                    <label className="text-[11px] uppercase font-bold text-white/50 tracking-wider">Base Price (₹) *</label>
                    <input
                      type="text"
                      value={formData.price}
                      onChange={e => setFormData({ ...formData, price: e.target.value })}
                      placeholder="29,999"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/30 focus:border-secondary outline-none font-semibold"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-[11px] uppercase font-bold text-white/50 tracking-wider">Duration *</label>
                    <input
                      type="text"
                      value={formData.duration}
                      onChange={e => setFormData({ ...formData, duration: e.target.value })}
                      placeholder="5 Days / 4 Nights"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/30 focus:border-secondary outline-none font-semibold"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-[11px] uppercase font-bold text-white/50 tracking-wider">Territory Type</label>
                    <select
                      value={formData.type}
                      onChange={e => setFormData({ ...formData, type: e.target.value as any })}
                      className="w-full bg-[#122321] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:border-secondary outline-none font-semibold"
                    >
                      <option value="Domestic">Domestic</option>
                      <option value="International">International</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[11px] uppercase font-bold text-white/50 tracking-wider">Category</label>
                    <select
                      value={formData.category}
                      onChange={e => {
                        const newCat = e.target.value
                        setFormData({
                          ...formData,
                          category: newCat,
                          cabins: newCat === 'Cruise' && (!formData.cabins || formData.cabins.length === 0) ? DEFAULT_CABINS : formData.cabins
                        })
                      }}
                      className="w-full bg-[#122321] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:border-secondary outline-none font-semibold"
                    >
                      {CATEGORIES.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <label className="text-[11px] uppercase font-bold text-white/50 tracking-wider">Highlight Badge</label>
                    <select
                      value={formData.badge || ''}
                      onChange={e => setFormData({ ...formData, badge: (e.target.value as any) || null })}
                      className="w-full bg-[#122321] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:border-secondary outline-none font-semibold"
                    >
                      <option value="">None</option>
                      <option value="Popular">Popular</option>
                      <option value="Trending">Trending</option>
                      <option value="Best Seller">Best Seller</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[11px] uppercase font-bold text-white/50 tracking-wider">Group Size</label>
                    <input
                      type="text"
                      value={formData.groupSize}
                      onChange={e => setFormData({ ...formData, groupSize: e.target.value })}
                      placeholder="e.g. 10-15 Persons or 2-4 Persons"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/30 focus:border-secondary outline-none font-semibold"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-[11px] uppercase font-bold text-white/50 tracking-wider">Next Departure Tag</label>
                    <input
                      type="text"
                      value={formData.nextBatch}
                      onChange={e => setFormData({ ...formData, nextBatch: e.target.value })}
                      placeholder="e.g. Nov 20, 2026 or Available Year Round"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/30 focus:border-secondary outline-none font-semibold"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[11px] uppercase font-bold text-white/50 tracking-wider">Package Description</label>
                  <textarea
                    value={formData.description}
                    onChange={e => setFormData({ ...formData, description: e.target.value })}
                    rows={4}
                    placeholder="Provide a rich, alluring narrative of the travel experience..."
                    className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-sm text-white placeholder-white/30 focus:border-secondary outline-none font-normal"
                    required
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: CRUISE DETAILS (Only visible or active if Cruise) */}
          {(activeTab === 'cruise' || isCruise) && activeTab === 'cruise' && (
            <div className="space-y-6">
              <div className="rounded-3xl liquid-glass p-6 sm:p-8 space-y-6">
                <div className="border-b border-white/10 pb-4">
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <Ship size={18} className="text-secondary" /> Cruise Ship & Port Logistics
                  </h3>
                  <p className="text-xs text-white/50 mt-1">Configure ship operator, embarkation, and ports of call</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[11px] uppercase font-bold text-white/50 tracking-wider">Cruise Line</label>
                    <input
                      type="text"
                      value={formData.cruiseLine || ''}
                      onChange={e => setFormData({ ...formData, cruiseLine: e.target.value })}
                      placeholder="e.g. Cordelia Cruises, Royal Caribbean, Costa Cruises"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/30 focus:border-secondary outline-none font-semibold"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-[11px] uppercase font-bold text-white/50 tracking-wider">Ship Name</label>
                    <input
                      type="text"
                      value={formData.shipName || ''}
                      onChange={e => setFormData({ ...formData, shipName: e.target.value })}
                      placeholder="e.g. MV Empress, Symphony of the Seas"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/30 focus:border-secondary outline-none font-semibold"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[11px] uppercase font-bold text-white/50 tracking-wider">Embarkation Port</label>
                    <input
                      type="text"
                      value={formData.embarkationPort || ''}
                      onChange={e => setFormData({ ...formData, embarkationPort: e.target.value })}
                      placeholder="e.g. Mormugao Port, Goa or Marina Bay, Singapore"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/30 focus:border-secondary outline-none font-semibold"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-[11px] uppercase font-bold text-white/50 tracking-wider">Disembarkation Port</label>
                    <input
                      type="text"
                      value={formData.disembarkationPort || ''}
                      onChange={e => setFormData({ ...formData, disembarkationPort: e.target.value })}
                      placeholder="e.g. Mormugao Port, Goa or Marina Bay, Singapore"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/30 focus:border-secondary outline-none font-semibold"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[11px] uppercase font-bold text-white/50 tracking-wider">Ports of Call (Comma-separated)</label>
                  <input
                    type="text"
                    value={formData.portsOfCall?.join(', ') || ''}
                    onChange={e => setFormData({
                      ...formData,
                      portsOfCall: e.target.value.split(',').map(s => s.trim()).filter(Boolean)
                    })}
                    placeholder="e.g. Goa, Kadmat Island, Agatti Island, Kochi"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/30 focus:border-secondary outline-none font-semibold"
                  />
                </div>
              </div>

              {/* Cabins Category Manager */}
              <div className="rounded-3xl liquid-glass p-6 sm:p-8 space-y-6">
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <div>
                    <h3 className="text-base font-bold text-white flex items-center gap-2">
                      <Layers size={18} className="text-secondary" /> Cabin Categories & Tiered Pricing
                    </h3>
                    <p className="text-xs text-white/50 mt-1">Interior, Oceanview, Balcony, and Suite pricing options</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      haptics.light()
                      const newCabin: CruiseCabin = {
                        type: 'Custom Suite',
                        price: '₹45,000',
                        description: 'Comfortable stateroom with private amenities.',
                        perks: ['Complimentary Breakfast']
                      }
                      setFormData({
                        ...formData,
                        cabins: [...(formData.cabins || []), newCabin]
                      })
                    }}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/15 text-xs font-bold text-white transition-colors"
                  >
                    <Plus size={14} /> Add Cabin Tier
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {(formData.cabins || DEFAULT_CABINS).map((cabin, idx) => (
                    <div key={idx} className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-3 relative group">
                      <button
                        type="button"
                        onClick={() => {
                          haptics.light()
                          const list = [...(formData.cabins || DEFAULT_CABINS)]
                          list.splice(idx, 1)
                          setFormData({ ...formData, cabins: list })
                        }}
                        className="absolute top-3 right-3 text-white/40 hover:text-red-400 transition-colors"
                        title="Remove cabin tier"
                      >
                        <Trash2 size={16} />
                      </button>

                      <div className="grid grid-cols-2 gap-3 pr-6">
                        <div>
                          <label className="text-[10px] uppercase font-bold text-white/40">Cabin Name</label>
                          <input
                            type="text"
                            value={cabin.type}
                            onChange={e => {
                              const list = [...(formData.cabins || DEFAULT_CABINS)]
                              list[idx].type = e.target.value
                              setFormData({ ...formData, cabins: list })
                            }}
                            className="w-full bg-white/5 border border-white/10 rounded-lg px-2.5 py-1.5 text-xs font-bold text-white outline-none focus:border-secondary"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] uppercase font-bold text-white/40">Price / Person</label>
                          <input
                            type="text"
                            value={cabin.price}
                            onChange={e => {
                              const list = [...(formData.cabins || DEFAULT_CABINS)]
                              list[idx].price = e.target.value
                              setFormData({ ...formData, cabins: list })
                            }}
                            className="w-full bg-white/5 border border-white/10 rounded-lg px-2.5 py-1.5 text-xs font-bold text-secondary outline-none focus:border-secondary"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="text-[10px] uppercase font-bold text-white/40">Description</label>
                        <input
                          type="text"
                          value={cabin.description}
                          onChange={e => {
                            const list = [...(formData.cabins || DEFAULT_CABINS)]
                            list[idx].description = e.target.value
                            setFormData({ ...formData, cabins: list })
                          }}
                          className="w-full bg-white/5 border border-white/10 rounded-lg px-2.5 py-1.5 text-xs text-white/80 outline-none focus:border-secondary"
                        />
                      </div>

                      <div>
                        <label className="text-[10px] uppercase font-bold text-white/40">Perks (Comma-separated)</label>
                        <input
                          type="text"
                          value={cabin.perks?.join(', ') || ''}
                          onChange={e => {
                            const list = [...(formData.cabins || DEFAULT_CABINS)]
                            list[idx].perks = e.target.value.split(',').map(p => p.trim()).filter(Boolean)
                            setFormData({ ...formData, cabins: list })
                          }}
                          placeholder="e.g. Sea View, Butler Service"
                          className="w-full bg-white/5 border border-white/10 rounded-lg px-2.5 py-1.5 text-xs text-white/70 outline-none focus:border-secondary"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: ITINERARY BUILDER */}
          {activeTab === 'itinerary' && (
            <div className="space-y-6">
              <div className="rounded-3xl liquid-glass p-6 sm:p-8 space-y-6">
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <div>
                    <h3 className="text-base font-bold text-white flex items-center gap-2">
                      <List size={18} className="text-secondary" /> Day-by-Day Itinerary Schedule
                    </h3>
                    <p className="text-xs text-white/50 mt-1">Include port arrival/departure times for cruise packages</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      haptics.light()
                      const newDay = {
                        day: (formData.itinerary?.length || 0) + 1,
                        title: '',
                        description: '',
                        meals: 'Breakfast & Dinner Included',
                        stay: 'Luxury Accommodation',
                        port: isCruise ? 'At Sea / Port' : undefined,
                        arrival: isCruise ? '08:00 AM' : undefined,
                        departure: isCruise ? '06:00 PM' : undefined
                      }
                      setFormData({
                        ...formData,
                        itinerary: [...(formData.itinerary || []), newDay]
                      })
                    }}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-secondary text-white text-xs font-bold hover:bg-secondary-light transition-colors"
                  >
                    <Plus size={14} /> Add Day
                  </button>
                </div>

                {(!formData.itinerary || formData.itinerary.length === 0) ? (
                  <div className="text-center py-12 border border-dashed border-white/10 rounded-2xl">
                    <p className="text-sm text-white/50">No itinerary days configured yet.</p>
                    <button
                      type="button"
                      onClick={() => {
                        setFormData({
                          ...formData,
                          itinerary: [
                            { day: 1, title: 'Arrival & Welcome', description: 'Arrive at destination, transfer to resort/ship, and relax.', meals: 'Dinner', stay: 'Deluxe Resort' }
                          ]
                        })
                      }}
                      className="mt-3 px-4 py-2 rounded-xl bg-white/10 text-xs font-bold text-white hover:bg-white/15"
                    >
                      Add Day 1
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {formData.itinerary.map((item, index) => (
                      <div key={index} className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-4 relative group">
                        <button
                          type="button"
                          onClick={() => {
                            haptics.light()
                            const list = [...(formData.itinerary || [])]
                            list.splice(index, 1)
                            list.forEach((it, i) => it.day = i + 1)
                            setFormData({ ...formData, itinerary: list })
                          }}
                          className="absolute top-4 right-4 text-white/40 hover:text-red-400 transition-colors"
                          title="Delete Day"
                        >
                          <Trash2 size={16} />
                        </button>

                        <div className="flex items-center gap-3">
                          <span className="flex items-center justify-center h-8 w-16 rounded-lg bg-secondary/20 text-secondary font-mono font-bold text-xs border border-secondary/30">
                            Day {item.day}
                          </span>
                          <input
                            type="text"
                            value={item.title}
                            onChange={e => {
                              const list = [...(formData.itinerary || [])]
                              list[index].title = e.target.value
                              setFormData({ ...formData, itinerary: list })
                            }}
                            placeholder="Day Title (e.g. Boarding Goa Mormugao Port & Sailing)"
                            className="flex-grow bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm font-bold text-white placeholder-white/30 focus:border-secondary outline-none"
                          />
                        </div>

                        {/* Cruise Port & Time Fields */}
                        {isCruise && (
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-3 rounded-xl bg-black/20 border border-white/5">
                            <div>
                              <label className="text-[10px] uppercase font-bold text-white/40">Port of Call</label>
                              <input
                                type="text"
                                value={item.port || ''}
                                onChange={e => {
                                  const list = [...(formData.itinerary || [])]
                                  list[index].port = e.target.value
                                  setFormData({ ...formData, itinerary: list })
                                }}
                                placeholder="e.g. Kadmat Island or At Sea"
                                className="w-full bg-white/5 border border-white/10 rounded-lg px-2.5 py-1.5 text-xs text-white outline-none focus:border-secondary"
                              />
                            </div>
                            <div>
                              <label className="text-[10px] uppercase font-bold text-white/40">Arrival Time</label>
                              <input
                                type="text"
                                value={item.arrival || ''}
                                onChange={e => {
                                  const list = [...(formData.itinerary || [])]
                                  list[index].arrival = e.target.value
                                  setFormData({ ...formData, itinerary: list })
                                }}
                                placeholder="e.g. 08:00 AM"
                                className="w-full bg-white/5 border border-white/10 rounded-lg px-2.5 py-1.5 text-xs text-white outline-none focus:border-secondary"
                              />
                            </div>
                            <div>
                              <label className="text-[10px] uppercase font-bold text-white/40">Departure Time</label>
                              <input
                                type="text"
                                value={item.departure || ''}
                                onChange={e => {
                                  const list = [...(formData.itinerary || [])]
                                  list[index].departure = e.target.value
                                  setFormData({ ...formData, itinerary: list })
                                }}
                                placeholder="e.g. 06:00 PM"
                                className="w-full bg-white/5 border border-white/10 rounded-lg px-2.5 py-1.5 text-xs text-white outline-none focus:border-secondary"
                              />
                            </div>
                          </div>
                        )}

                        <textarea
                          value={item.description}
                          onChange={e => {
                            const list = [...(formData.itinerary || [])]
                            list[index].description = e.target.value
                            setFormData({ ...formData, itinerary: list })
                          }}
                          placeholder="Detailed description of the day's experiences, sights, and activities..."
                          rows={3}
                          className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-xs text-white/80 placeholder-white/30 focus:border-secondary outline-none font-normal"
                        />

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div>
                            <label className="text-[10px] uppercase font-bold text-white/40">Meals</label>
                            <input
                              type="text"
                              value={item.meals || ''}
                              onChange={e => {
                                const list = [...(formData.itinerary || [])]
                                list[index].meals = e.target.value
                                setFormData({ ...formData, itinerary: list })
                              }}
                              placeholder="e.g. Breakfast, Lunch & Dinner"
                              className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-xs text-white/70 outline-none focus:border-secondary"
                            />
                          </div>
                          <div>
                            <label className="text-[10px] uppercase font-bold text-white/40">Overnight Stay</label>
                            <input
                              type="text"
                              value={item.stay || ''}
                              onChange={e => {
                                const list = [...(formData.itinerary || [])]
                                list[index].stay = e.target.value
                                setFormData({ ...formData, itinerary: list })
                              }}
                              placeholder="e.g. Premium Oceanview Cabin / Luxury Tent"
                              className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-xs text-white/70 outline-none focus:border-secondary"
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 4: INCLUSIONS & EXCLUSIONS */}
          {activeTab === 'inclusions' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Inclusions */}
              <div className="rounded-3xl liquid-glass p-6 sm:p-8 space-y-6">
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <h3 className="text-base font-bold text-emerald-400 flex items-center gap-2">
                    <ShieldCheck size={18} /> Inclusions ({formData.inclusions?.length || 0})
                  </h3>
                </div>

                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newInclusion}
                    onChange={e => setNewInclusion(e.target.value)}
                    onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); addInclusionItem(); } }}
                    placeholder="Type inclusion and hit Add..."
                    className="flex-grow bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs text-white placeholder-white/30 outline-none focus:border-emerald-400"
                  />
                  <button
                    type="button"
                    onClick={() => addInclusionItem()}
                    className="px-4 py-2 rounded-xl bg-emerald-500/20 text-emerald-300 hover:bg-emerald-500/30 font-bold text-xs transition-colors"
                  >
                    Add
                  </button>
                </div>

                {/* Quick Presets */}
                <div>
                  <p className="text-[10px] uppercase font-bold tracking-wider text-white/40 mb-2">Quick Presets</p>
                  <div className="flex flex-wrap gap-1.5">
                    {COMMON_INCLUSIONS.map((preset, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => addInclusionItem(preset)}
                        className="text-[10px] font-medium px-2.5 py-1 rounded-lg bg-white/5 hover:bg-emerald-500/20 hover:text-emerald-300 text-white/70 transition-colors border border-white/5"
                      >
                        + {preset}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Current Inclusions */}
                <div className="space-y-2">
                  {formData.inclusions?.map((inc, idx) => (
                    <div key={idx} className="flex items-center justify-between p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-xs text-white/90">
                      <span className="flex items-center gap-2">
                        <CheckCircle2 size={14} className="text-emerald-400 shrink-0" />
                        {inc}
                      </span>
                      <button
                        type="button"
                        onClick={() => removeInclusionItem(idx)}
                        className="text-white/40 hover:text-red-400 transition-colors ml-2"
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Exclusions */}
              <div className="rounded-3xl liquid-glass p-6 sm:p-8 space-y-6">
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <h3 className="text-base font-bold text-red-400 flex items-center gap-2">
                    <ShieldAlert size={18} /> Exclusions ({formData.exclusions?.length || 0})
                  </h3>
                </div>

                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newExclusion}
                    onChange={e => setNewExclusion(e.target.value)}
                    onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); addExclusionItem(); } }}
                    placeholder="Type exclusion and hit Add..."
                    className="flex-grow bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs text-white placeholder-white/30 outline-none focus:border-red-400"
                  />
                  <button
                    type="button"
                    onClick={() => addExclusionItem()}
                    className="px-4 py-2 rounded-xl bg-red-500/20 text-red-300 hover:bg-red-500/30 font-bold text-xs transition-colors"
                  >
                    Add
                  </button>
                </div>

                {/* Quick Presets */}
                <div>
                  <p className="text-[10px] uppercase font-bold tracking-wider text-white/40 mb-2">Quick Presets</p>
                  <div className="flex flex-wrap gap-1.5">
                    {COMMON_EXCLUSIONS.map((preset, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => addExclusionItem(preset)}
                        className="text-[10px] font-medium px-2.5 py-1 rounded-lg bg-white/5 hover:bg-red-500/20 hover:text-red-300 text-white/70 transition-colors border border-white/5"
                      >
                        + {preset}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Current Exclusions */}
                <div className="space-y-2">
                  {formData.exclusions?.map((exc, idx) => (
                    <div key={idx} className="flex items-center justify-between p-2.5 rounded-xl bg-red-500/10 border border-red-500/20 text-xs text-white/90">
                      <span className="flex items-center gap-2">
                        <span className="text-red-400 font-bold shrink-0">✕</span>
                        {exc}
                      </span>
                      <button
                        type="button"
                        onClick={() => removeExclusionItem(idx)}
                        className="text-white/40 hover:text-red-400 transition-colors ml-2"
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: DEPARTURES & BATCHES */}
          {activeTab === 'departures' && (
            <div className="space-y-6">
              <div className="rounded-3xl liquid-glass p-6 sm:p-8 space-y-6">
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <div>
                    <h3 className="text-base font-bold text-white flex items-center gap-2">
                      <Calendar size={18} className="text-secondary" /> Fixed Departure Batches
                    </h3>
                    <p className="text-xs text-white/50 mt-1">Manage departure dates, remaining seats, and optional price overrides</p>
                  </div>
                </div>

                {/* Add Departure Row */}
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 p-4 rounded-2xl bg-white/5 border border-white/10">
                  <div>
                    <label className="text-[10px] uppercase font-bold text-white/40">Date</label>
                    <input
                      type="date"
                      value={newDepDate}
                      onChange={e => setNewDepDate(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs text-white outline-none focus:border-secondary"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] uppercase font-bold text-white/40">Total Seats</label>
                    <input
                      type="number"
                      value={newDepSeats}
                      onChange={e => setNewDepSeats(parseInt(e.target.value) || 20)}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs text-white outline-none focus:border-secondary"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] uppercase font-bold text-white/40">Price Override (Optional)</label>
                    <input
                      type="text"
                      value={newDepPrice}
                      onChange={e => setNewDepPrice(e.target.value)}
                      placeholder="e.g. 34,999"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs text-white outline-none focus:border-secondary"
                    />
                  </div>
                  <div className="flex items-end">
                    <button
                      type="button"
                      onClick={addDepartureDate}
                      className="w-full py-2 rounded-xl bg-secondary hover:bg-secondary-light font-bold text-xs text-white transition-colors"
                    >
                      + Add Batch
                    </button>
                  </div>
                </div>

                {/* Departure List */}
                {(!formData.departures || formData.departures.length === 0) ? (
                  <div className="text-center py-10 border border-dashed border-white/10 rounded-2xl text-xs text-white/50">
                    No departure dates added. Package will show as "Available Year Round / On Request".
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {formData.departures.map((dep, idx) => (
                      <div key={idx} className="p-4 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between">
                        <div>
                          <p className="text-xs font-bold text-white font-mono">{dep.date}</p>
                          <p className="text-[11px] text-white/60">
                            Seats: <span className="text-secondary font-bold">{dep.seatsAvailable}</span> / {dep.seatsTotal}
                          </p>
                          {dep.priceOverride && (
                            <p className="text-[10px] text-amber-300 font-bold">Override: {dep.priceOverride}</p>
                          )}
                        </div>
                        <div className="flex items-center gap-2">
                          <select
                            value={dep.status}
                            onChange={e => {
                              const list = [...(formData.departures || [])]
                              list[idx].status = e.target.value as any
                              setFormData({ ...formData, departures: list })
                            }}
                            className="bg-[#122321] border border-white/10 text-[10px] font-bold rounded-lg px-2 py-1 text-white"
                          >
                            <option value="Open">Open</option>
                            <option value="Filling Fast">Filling Fast</option>
                            <option value="Sold Out">Sold Out</option>
                          </select>
                          <button
                            type="button"
                            onClick={() => removeDepartureDate(idx)}
                            className="text-white/40 hover:text-red-400 transition-colors p-1"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 6: PHOTOS & HIGHLIGHTS */}
          {activeTab === 'gallery' && (
            <div className="space-y-6">
              <div className="rounded-3xl liquid-glass p-6 sm:p-8 space-y-6">
                <div className="border-b border-white/10 pb-4">
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <ImageIcon size={18} className="text-secondary" /> Cover Image & Multi-Photo Gallery
                  </h3>
                  <p className="text-xs text-white/50 mt-1">Provide high-resolution visual assets for card thumbnails and hero galleries</p>
                </div>

                {/* Main Cover Photo */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
                  <div className="aspect-[16/10] rounded-2xl overflow-hidden bg-white/5 border border-white/10 flex items-center justify-center">
                    {formData.image ? (
                      <img src={formData.image} alt="Cover Preview" className="w-full h-full object-cover" />
                    ) : (
                      <span className="text-xs text-white/40">No Cover Preview</span>
                    )}
                  </div>
                  <div className="md:col-span-2 space-y-2">
                    <label className="text-[11px] uppercase font-bold text-white/50 tracking-wider">Primary Cover Image URL *</label>
                    <input
                      type="text"
                      value={formData.image}
                      onChange={e => setFormData({ ...formData, image: e.target.value })}
                      placeholder="https://images.unsplash.com/... or /assets/spiti.jpg"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-xs text-white placeholder-white/30 focus:border-secondary outline-none font-mono"
                      required
                    />
                  </div>
                </div>

                {/* Additional Gallery Photos */}
                <div className="pt-6 border-t border-white/10 space-y-4">
                  <label className="text-[11px] uppercase font-bold text-white/50 tracking-wider">Add Additional Gallery Photos</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={newImageUrl}
                      onChange={e => setNewImageUrl(e.target.value)}
                      placeholder="Enter photo URL and click Add Photo..."
                      className="flex-grow bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white placeholder-white/30 focus:border-secondary outline-none font-mono"
                    />
                    <button
                      type="button"
                      onClick={addGalleryImage}
                      className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white font-bold text-xs transition-colors shrink-0 flex items-center gap-1.5"
                    >
                      <Plus size={14} /> Add Photo
                    </button>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 pt-2">
                    {formData.images?.map((url, idx) => (
                      <div key={idx} className="relative group aspect-[4/3] rounded-xl overflow-hidden bg-white/5 border border-white/10">
                        <img src={url} alt={`Gallery ${idx}`} className="w-full h-full object-cover" />
                        <button
                          type="button"
                          onClick={() => removeGalleryImage(idx)}
                          className="absolute top-2 right-2 bg-red-500/80 hover:bg-red-500 text-white p-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Feature Highlights Chips */}
                <div className="pt-6 border-t border-white/10 space-y-4">
                  <label className="text-[11px] uppercase font-bold text-white/50 tracking-wider">Package Highlights Chips</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={newHighlight}
                      onChange={e => setNewHighlight(e.target.value)}
                      onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); addHighlightItem(); } }}
                      placeholder="e.g. Scuba Snorkeling, Luxury Ocean Balcony, All Meals Included"
                      className="flex-grow bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white placeholder-white/30 focus:border-secondary outline-none font-semibold"
                    />
                    <button
                      type="button"
                      onClick={addHighlightItem}
                      className="px-5 py-2.5 rounded-xl bg-secondary text-white font-bold text-xs transition-colors shrink-0 flex items-center gap-1.5"
                    >
                      <Plus size={14} /> Add Chip
                    </button>
                  </div>

                  <div className="flex flex-wrap gap-2 pt-1">
                    {formData.highlights?.map((hl, idx) => (
                      <span key={idx} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/10 text-xs font-semibold text-white/90 border border-white/10">
                        {hl}
                        <button
                          type="button"
                          onClick={() => removeHighlightItem(idx)}
                          className="text-white/40 hover:text-red-400 transition-colors"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Sticky Bottom Action Bar */}
          <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-4xl p-4 rounded-2xl liquid-glass-dark border border-white/15 shadow-2xl flex items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => navigate('/admin/dashboard')}
                className="px-4 py-2.5 rounded-xl text-xs font-bold text-white/60 hover:text-white transition-colors"
              >
                Cancel
              </button>
              <span className="hidden sm:inline-block text-[11px] text-white/40">
                Status: <span className="text-white font-bold">{formData.status}</span>
              </span>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="submit"
                disabled={saving}
                className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-secondary text-white font-bold text-xs shadow-lg shadow-secondary/30 hover:bg-secondary-light active:scale-95 transition-all disabled:opacity-50"
              >
                {saving ? (
                  <span>Saving package...</span>
                ) : saveSuccess ? (
                  <>
                    <CheckCircle2 size={16} className="text-white" />
                    <span>Saved!</span>
                  </>
                ) : (
                  <>
                    <Save size={16} />
                    <span>Save Changes</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default EditTrip
