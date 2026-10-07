import React, { useEffect, useState } from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Save, ArrowLeft, Image as ImageIcon, MapPin, Tag, Clock, Star, Users, Trash2, Plus, Info, List, User, Sparkles } from 'lucide-react'
import { getTripById, updateTrip, addTrip } from '../../lib/dataService'
import { Trip, CATEGORIES } from '../../lib/trips'
import { haptics } from '../../lib/haptics'

const EditTrip = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [formData, setFormData] = useState<Partial<Trip>>({
    title: '',
    location: '',
    price: '',
    duration: '',
    category: 'Adventure',
    type: 'Domestic',
    featured: false,
    image: '',
    rating: 4.8,
    reviews: 120,
    link: '#',
    description: '',
    images: [],
    highlights: [],
    nextBatch: '',
    groupSize: '',
    captain: {
      name: 'Captain Rohan Shah',
      role: 'Lead Expedition Specialist',
      bio: 'Expert in high-altitude trekking and local storytelling.',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200',
      rating: 5.0,
      trips: 45
    },
    itinerary: []
  })

  const [newImageUrl, setNewImageUrl] = useState('')

  useEffect(() => {
    if (sessionStorage.getItem('isAdmin') !== 'true') {
      navigate('/admin/login')
    }
    if (id && id !== 'new') {
      getTripById(parseInt(id)).then(trip => {
        if (trip) setFormData(trip)
      })
    }
  }, [id, navigate])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    haptics.medium()
    
    // Ensure cover image is included in images gallery if not already present
    const imagesList = formData.images && formData.images.length > 0
      ? formData.images
      : (formData.image ? [formData.image] : [])

    const finalData = {
      ...formData,
      image: formData.image || imagesList[0] || '/assets/spiti.jpg',
      images: imagesList,
      highlights: formData.highlights || [],
      itinerary: formData.itinerary || []
    }

    if (id && id !== 'new') {
      await updateTrip(finalData as Trip)
    } else {
      await addTrip(finalData as Omit<Trip, 'id'>)
    }
    navigate('/admin/dashboard')
  }

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

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-12 pb-32">
      <div className="max-w-5xl mx-auto">
        <Link to="/admin/dashboard" className="inline-flex items-center text-primary font-bold hover:gap-2 transition-all mb-10">
          <ArrowLeft size={20} className="mr-2" /> Back to Inventory
        </Link>

        <header className="mb-12">
          <h2 className="text-4xl font-display font-black text-charcoal tracking-tighter uppercase italic">
            {id === 'new' ? 'Create New' : 'Edit'} <span className="text-primary">Expedition</span>
          </h2>
          <p className="text-gray-400 font-medium italic mt-1">Configure full package details, dates, showcasing options, itinerary & photo gallery</p>
        </header>

        <form onSubmit={handleSubmit} className="space-y-12">
          {/* Section: Basic Info & Showcasing */}
          <div className="bg-white p-8 md:p-12 rounded-[3.5rem] shadow-2xl shadow-gray-200/50 border border-gray-100 space-y-10">
            <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 border-b border-gray-100 pb-6">
              <h3 className="text-xl font-display font-black uppercase italic tracking-widest text-charcoal flex items-center">
                <Info size={20} className="mr-3 text-primary" /> Basic Information
              </h3>

              {/* Showcasing Featured Toggle */}
              <label className="inline-flex items-center gap-3 cursor-pointer bg-gray-50 px-5 py-3 rounded-2xl border border-gray-100">
                <input
                  type="checkbox"
                  checked={!!formData.featured}
                  onChange={e => setFormData({ ...formData, featured: e.target.checked })}
                  className="w-5 h-5 accent-secondary rounded"
                />
                <span className="text-xs font-black uppercase tracking-wider text-charcoal flex items-center gap-1.5">
                  <Sparkles size={14} className="text-secondary" /> Showcase on Homepage
                </span>
              </label>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-[10px] uppercase font-black text-gray-400 tracking-[0.2em] ml-4">Trip Title</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={e => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g. Goa & Lakshadweep Luxury Cruise"
                  className="w-full bg-gray-50 border border-gray-100 p-5 rounded-2xl text-charcoal focus:border-primary outline-none transition-all font-bold"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] uppercase font-black text-gray-400 tracking-[0.2em] ml-4">Location</label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={e => setFormData({ ...formData, location: e.target.value })}
                  placeholder="e.g. Goa, Agatti Island, Kadmat"
                  className="w-full bg-gray-50 border border-gray-100 p-5 rounded-2xl text-charcoal focus:border-primary outline-none transition-all font-bold"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] uppercase font-black text-gray-400 tracking-[0.2em] ml-4">₹ Base Price</label>
                <input
                  type="text"
                  value={formData.price}
                  onChange={e => setFormData({ ...formData, price: e.target.value })}
                  placeholder="29,999"
                  className="w-full bg-gray-50 border border-gray-100 p-5 rounded-2xl text-charcoal focus:border-primary outline-none transition-all font-bold"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] uppercase font-black text-gray-400 tracking-[0.2em] ml-4">Duration</label>
                <input
                  type="text"
                  value={formData.duration}
                  onChange={e => setFormData({ ...formData, duration: e.target.value })}
                  placeholder="5 Days / 4 Nights"
                  className="w-full bg-gray-50 border border-gray-100 p-5 rounded-2xl text-charcoal focus:border-primary outline-none transition-all font-bold"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] uppercase font-black text-gray-400 tracking-[0.2em] ml-4">Type</label>
                <select
                  value={formData.type}
                  onChange={e => setFormData({ ...formData, type: e.target.value as any })}
                  className="w-full bg-gray-50 border border-gray-100 p-5 rounded-2xl text-charcoal focus:border-primary outline-none font-bold"
                >
                  <option value="Domestic">Domestic</option>
                  <option value="International">International</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] uppercase font-black text-gray-400 tracking-[0.2em] ml-4">Category</label>
                <select
                  value={formData.category}
                  onChange={e => setFormData({ ...formData, category: e.target.value })}
                  className="w-full bg-gray-50 border border-gray-100 p-5 rounded-2xl text-charcoal focus:border-primary outline-none font-bold"
                >
                  {CATEGORIES.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] uppercase font-black text-gray-400 tracking-[0.2em] ml-4">Description</label>
              <textarea
                value={formData.description}
                onChange={e => setFormData({ ...formData, description: e.target.value })}
                placeholder="Immersive package summary..."
                className="w-full bg-gray-50 border border-gray-100 p-5 rounded-2xl text-charcoal focus:border-primary outline-none font-medium min-h-[140px]"
                required
              />
            </div>
          </div>

          {/* Section: Dates & Logistics */}
          <div className="bg-white p-8 md:p-12 rounded-[3.5rem] shadow-2xl shadow-gray-200/50 border border-gray-100 space-y-10">
            <h3 className="text-xl font-display font-black uppercase italic tracking-widest text-charcoal flex items-center">
              <Clock size={20} className="mr-3 text-primary" /> Departure Dates & Group Size
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-[10px] uppercase font-black text-gray-400 tracking-[0.2em] ml-4">Next Departure Batch Date</label>
                <input
                  type="text"
                  value={formData.nextBatch}
                  onChange={e => setFormData({ ...formData, nextBatch: e.target.value })}
                  placeholder="e.g. Nov 18, 2026 or Available Year Round"
                  className="w-full bg-gray-50 border border-gray-100 p-5 rounded-2xl text-charcoal focus:border-primary outline-none font-bold"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] uppercase font-black text-gray-400 tracking-[0.2em] ml-4">Max Group Size</label>
                <input
                  type="text"
                  value={formData.groupSize}
                  onChange={e => setFormData({ ...formData, groupSize: e.target.value })}
                  placeholder="e.g. 10-15 Persons or 2-6 Persons"
                  className="w-full bg-gray-50 border border-gray-100 p-5 rounded-2xl text-charcoal focus:border-primary outline-none font-bold"
                />
              </div>
            </div>
          </div>

          {/* Section: Media & Photo Gallery Management */}
          <div className="bg-white p-8 md:p-12 rounded-[3.5rem] shadow-2xl shadow-gray-200/50 border border-gray-100 space-y-10">
            <h3 className="text-xl font-display font-black uppercase italic tracking-widest text-charcoal flex items-center">
              <ImageIcon size={20} className="mr-3 text-primary" /> Cover Photo & Gallery Management
            </h3>

            {/* Cover Image */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
              <div className="h-40 rounded-3xl overflow-hidden bg-gray-100 border border-gray-200">
                {formData.image ? (
                  <img src={formData.image} alt="Cover Preview" className="w-full h-full object-cover" />
                ) : (
                  <div className="flex items-center justify-center h-full text-gray-400 text-xs italic">No Cover Image</div>
                )}
              </div>

              <div className="md:col-span-2 space-y-2">
                <label className="text-[10px] uppercase font-black text-gray-400 tracking-[0.2em] ml-2">Main Cover Image URL</label>
                <input
                  type="text"
                  value={formData.image}
                  onChange={e => setFormData({ ...formData, image: e.target.value })}
                  placeholder="/assets/goa.jpg or https://..."
                  className="w-full bg-gray-50 border border-gray-100 p-5 rounded-2xl text-charcoal focus:border-primary outline-none font-medium text-sm"
                  required
                />
              </div>
            </div>

            {/* Multi Photo Gallery */}
            <div className="space-y-4 pt-4 border-t border-gray-100">
              <label className="text-[10px] uppercase font-black text-gray-400 tracking-[0.2em] ml-2">Package Gallery Images</label>

              <div className="flex gap-3">
                <input
                  type="text"
                  value={newImageUrl}
                  onChange={e => setNewImageUrl(e.target.value)}
                  placeholder="Enter Image URL (e.g. /assets/andaman.jpg or https://...)"
                  className="flex-grow bg-gray-50 border border-gray-100 p-4 rounded-2xl text-sm font-medium outline-none focus:border-primary"
                />
                <button
                  type="button"
                  onClick={addGalleryImage}
                  className="bg-charcoal text-white px-6 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-primary transition-all flex items-center"
                >
                  <Plus size={16} className="mr-1" /> Add Photo
                </button>
              </div>

              {/* Gallery Thumbnails List */}
              <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-4 pt-2">
                {formData.images?.map((url, idx) => (
                  <div key={idx} className="relative group aspect-square rounded-2xl overflow-hidden bg-gray-100 border border-gray-200">
                    <img src={url} alt={`Gallery ${idx}`} className="w-full h-full object-cover" />
                    <button
                      type="button"
                      onClick={() => removeGalleryImage(idx)}
                      className="absolute top-1.5 right-1.5 bg-red-500 text-white w-7 h-7 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
                    >
                      <Trash2 size={12} />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Highlights */}
            <div className="space-y-2 pt-4 border-t border-gray-100">
              <label className="text-[10px] uppercase font-black text-gray-400 tracking-[0.2em] ml-4">Highlights (Comma separated)</label>
              <textarea
                value={formData.highlights?.join(', ')}
                onChange={e => setFormData({ ...formData, highlights: e.target.value.split(',').map(h => h.trim()).filter(Boolean) })}
                placeholder="Oceanview Stateroom, Coral Snorkeling, Fine Dining"
                className="w-full bg-gray-50 border border-gray-100 p-5 rounded-2xl text-charcoal focus:border-primary outline-none font-bold text-sm min-h-[90px]"
              />
            </div>
          </div>

          {/* Section: Itinerary */}
          <div className="bg-white p-8 md:p-12 rounded-[3.5rem] shadow-2xl shadow-gray-200/50 border border-gray-100 space-y-8">
            <div className="flex justify-between items-center border-b border-gray-100 pb-4">
              <h3 className="text-xl font-display font-black uppercase italic tracking-widest text-charcoal flex items-center">
                <List size={20} className="mr-3 text-primary" /> Day-by-Day Itinerary
              </h3>
              <button
                type="button"
                onClick={() => setFormData({
                  ...formData,
                  itinerary: [...(formData.itinerary || []), { day: (formData.itinerary?.length || 0) + 1, title: '', description: '' }]
                })}
                className="text-[10px] text-primary bg-primary/10 px-4 py-2 rounded-full uppercase font-black tracking-widest flex items-center hover:bg-primary/20 transition-colors"
              >
                <Plus size={14} className="mr-1" /> Add Day
              </button>
            </div>

            <div className="space-y-6">
              {formData.itinerary?.map((item, index) => (
                <div key={index} className="p-6 bg-gray-50 rounded-3xl border border-gray-100 relative group space-y-4">
                  <button
                    type="button"
                    onClick={() => {
                      const list = [...(formData.itinerary || [])]
                      list.splice(index, 1)
                      list.forEach((it, i) => it.day = i + 1)
                      setFormData({ ...formData, itinerary: list })
                    }}
                    className="absolute -top-3 -right-3 bg-red-100 text-red-500 w-8 h-8 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-md hover:bg-red-200"
                  >
                    <Trash2 size={14} />
                  </button>

                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shrink-0 font-bold text-charcoal shadow-sm border">
                      Day {item.day}
                    </div>
                    <input
                      type="text"
                      value={item.title}
                      onChange={e => {
                        const list = [...(formData.itinerary || [])]
                        list[index].title = e.target.value
                        setFormData({ ...formData, itinerary: list })
                      }}
                      placeholder="Day Title (e.g. Boarding Goa Port)"
                      className="flex-grow bg-white border border-gray-200 p-4 rounded-xl font-bold text-charcoal outline-none focus:border-primary"
                    />
                  </div>

                  <textarea
                    value={item.description}
                    onChange={e => {
                      const list = [...(formData.itinerary || [])]
                      list[index].description = e.target.value
                      setFormData({ ...formData, itinerary: list })
                    }}
                    placeholder="Detailed description of the day's events..."
                    className="w-full bg-white border border-gray-200 p-4 rounded-xl text-charcoal font-medium outline-none focus:border-primary min-h-[90px]"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Sticky Bottom Bar */}
          <div className="flex justify-end gap-6 bg-white/80 backdrop-blur-3xl border border-white/20 p-6 rounded-[2.5rem] fixed bottom-8 left-1/2 -translate-x-1/2 z-50 shadow-2xl shadow-primary/20">
            <button
              type="button"
              onClick={() => navigate('/admin/dashboard')}
              className="px-8 py-4 rounded-xl font-black text-[10px] uppercase tracking-widest text-gray-400 hover:text-charcoal transition-all"
            >
              Discard
            </button>
            <button
              type="submit"
              className="bg-primary text-white px-10 py-4 rounded-xl font-black text-[10px] uppercase tracking-widest shadow-xl shadow-primary/20 hover:scale-105 active:scale-95 transition-all flex items-center"
            >
              <Save size={16} className="mr-2" /> Save Package
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default EditTrip
