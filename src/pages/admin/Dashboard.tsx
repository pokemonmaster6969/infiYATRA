import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Edit2, Trash2, LayoutDashboard, LogOut, MapPin, Image as ImageIcon, Star, Calendar, Users, MessageSquare, CheckCircle, Sparkles, MessageCircle } from 'lucide-react'
import { getTrips, deleteTrip, updateTrip, getCustomTrips, deleteCustomTrip, CustomTripInquiry } from '../../lib/dataService'
import { Trip } from '../../lib/trips'
import { getWhatsAppLink } from '../../lib/data'
import { haptics } from '../../lib/haptics'

const AdminDashboard = () => {
  const [trips, setTrips] = useState<Trip[]>([])
  const [customTrips, setCustomTrips] = useState<CustomTripInquiry[]>([])
  const [activeTab, setActiveTab] = useState<'inventory' | 'inquiries'>('inventory')
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    if (sessionStorage.getItem('isAdmin') !== 'true') {
      navigate('/admin/login')
    }
    loadData()
  }, [navigate])

  const loadData = () => {
    getTrips().then(setTrips)
    getCustomTrips().then(setCustomTrips)
  }

  const handleDeleteTrip = async (id: number) => {
    if (window.confirm('Are you sure you want to remove this expedition package?')) {
      haptics.medium()
      await deleteTrip(id)
      loadData()
    }
  }

  const handleDeleteInquiry = async (id: number) => {
    if (window.confirm('Delete this custom trip inquiry?')) {
      haptics.medium()
      await deleteCustomTrip(id)
      loadData()
    }
  }

  const toggleFeatured = async (trip: Trip) => {
    haptics.light()
    const updated = { ...trip, featured: !trip.featured }
    await updateTrip(updated)
    setTrips(prev => prev.map(t => t.id === trip.id ? updated : t))
  }

  const handleLogout = () => {
    sessionStorage.removeItem('isAdmin')
    navigate('/admin/login')
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="w-80 bg-charcoal text-white p-8 hidden lg:flex flex-col border-r border-gray-800">
        <div className="mb-12">
          <Link to="/" className="text-2xl font-display font-black uppercase italic tracking-tighter">
            Infi <span className="text-primary">Admin</span>
          </Link>
          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1">Expedition Control Center</p>
        </div>

        <nav className="flex-grow space-y-4">
          <button
            onClick={() => { haptics.light(); setActiveTab('inventory'); }}
            className={`w-full flex items-center justify-between p-4 rounded-2xl font-bold transition-all ${activeTab === 'inventory' ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'text-white/60 hover:text-white hover:bg-white/5'}`}
          >
            <div className="flex items-center space-x-3">
              <LayoutDashboard size={20} />
              <span>Package Inventory</span>
            </div>
            <span className="text-[10px] bg-white/20 px-2.5 py-1 rounded-full">{trips.length}</span>
          </button>

          <button
            onClick={() => { haptics.light(); setActiveTab('inquiries'); }}
            className={`w-full flex items-center justify-between p-4 rounded-2xl font-bold transition-all ${activeTab === 'inquiries' ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'text-white/60 hover:text-white hover:bg-white/5'}`}
          >
            <div className="flex items-center space-x-3">
              <MessageSquare size={20} />
              <span>Custom Inquiries</span>
            </div>
            {customTrips.length > 0 && (
              <span className="text-[10px] bg-secondary text-white font-black px-2.5 py-1 rounded-full animate-pulse">{customTrips.length}</span>
            )}
          </button>

          <Link to="/admin/hero" className={`flex items-center space-x-3 p-4 rounded-2xl font-bold transition-all text-white/60 hover:text-white hover:bg-white/5`}>
            <ImageIcon size={20} />
            <span>Homepage Hero</span>
          </Link>

          <Link to="/admin/new" className="flex items-center space-x-3 p-4 text-white/60 hover:text-white hover:bg-white/5 transition-all font-bold">
            <Plus size={20} />
            <span>New Package</span>
          </Link>
        </nav>

        <button
          onClick={handleLogout}
          className="flex items-center space-x-3 p-4 text-red-400 hover:text-red-300 transition-all font-bold mt-auto"
        >
          <LogOut size={20} />
          <span>Exit Basecamp</span>
        </button>
      </aside>

      {/* Main Content Area */}
      <main className="flex-grow p-6 md:p-12 overflow-y-auto">
        {/* Mobile Header Tabs */}
        <div className="lg:hidden flex items-center gap-2 mb-8 bg-white p-2 rounded-2xl shadow-sm border border-gray-100">
          <button
            onClick={() => setActiveTab('inventory')}
            className={`flex-1 py-3 text-xs font-bold rounded-xl transition-all ${activeTab === 'inventory' ? 'bg-primary text-white' : 'text-gray-500'}`}
          >
            Packages ({trips.length})
          </button>
          <button
            onClick={() => setActiveTab('inquiries')}
            className={`flex-1 py-3 text-xs font-bold rounded-xl transition-all ${activeTab === 'inquiries' ? 'bg-primary text-white' : 'text-gray-500'}`}
          >
            Inquiries ({customTrips.length})
          </button>
        </div>

        {activeTab === 'inventory' && (
          <div>
            <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
              <div>
                <h2 className="text-3xl md:text-4xl font-display font-black text-charcoal tracking-tighter uppercase italic">
                  Package Inventory & <span className="text-primary">Showcasing</span>
                </h2>
                <p className="text-gray-400 font-medium italic mt-1">Manage active tours, edit departure dates, showcase featured trips & gallery images</p>
              </div>
              <Link
                to="/admin/new"
                className="bg-primary text-white px-8 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl shadow-primary/20 hover:scale-105 transition-all flex items-center"
              >
                <Plus size={16} className="mr-2" /> Add Expedition
              </Link>
            </header>

            <div className="grid grid-cols-1 gap-6">
              {trips.map((trip) => (
                <motion.div
                  key={trip.id}
                  layout
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white p-6 rounded-[2.5rem] border border-gray-100 shadow-xl shadow-gray-200/40 flex flex-col md:flex-row items-center gap-6 group hover:border-primary/20 transition-all"
                >
                  <div className="w-full md:w-36 h-36 rounded-3xl overflow-hidden shrink-0 relative bg-gray-100">
                    <img src={trip.image} alt={trip.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                    {trip.featured && (
                      <span className="absolute top-2 left-2 bg-secondary text-white text-[8px] font-black uppercase px-2.5 py-1 rounded-full shadow-md">
                        ★ Showcased
                      </span>
                    )}
                  </div>

                  <div className="flex-grow space-y-2 text-center md:text-left w-full">
                    <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
                      <span className={`text-[8px] font-black uppercase tracking-widest px-3 py-1 rounded-full ${trip.type === 'International' ? 'bg-secondary/10 text-secondary' : 'bg-primary/10 text-primary'}`}>
                        {trip.type}
                      </span>
                      <span className="text-[8px] font-black uppercase tracking-widest px-3 py-1 bg-gray-100 text-gray-600 rounded-full">
                        {trip.category}
                      </span>
                      <span className="text-[8px] font-bold text-gray-400 bg-gray-50 px-2.5 py-1 rounded-full">
                        📷 {trip.images?.length || 1} Photos
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-charcoal">{trip.title}</h3>

                    <div className="flex flex-wrap items-center justify-center md:justify-start text-gray-500 text-xs font-medium gap-4">
                      <span className="flex items-center"><MapPin size={13} className="mr-1 text-primary" /> {trip.location}</span>
                      <span className="flex items-center"><Calendar size={13} className="mr-1 text-secondary" /> Next: {trip.nextBatch || 'Flexible'}</span>
                      <span className="flex items-center"><Users size={13} className="mr-1 text-gray-400" /> {trip.groupSize || 'Standard Group'}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-6 px-6 border-x border-gray-100 hidden lg:grid text-center">
                    <div>
                      <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest block mb-1">Rates From</span>
                      <span className="text-lg font-black text-secondary tracking-tighter italic">₹{trip.price}</span>
                    </div>
                    <div>
                      <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest block mb-1">Duration</span>
                      <span className="text-lg font-black text-charcoal tracking-tighter italic">{trip.duration}</span>
                    </div>
                  </div>

                  {/* Actions & Featured Toggle */}
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => toggleFeatured(trip)}
                      title="Toggle Showcased on Homepage"
                      className={`px-4 py-3.5 rounded-2xl text-[9px] font-black uppercase tracking-wider transition-all flex items-center gap-1.5 ${
                        trip.featured
                          ? 'bg-secondary text-white shadow-lg shadow-secondary/30'
                          : 'bg-gray-100 text-gray-400 hover:bg-gray-200'
                      }`}
                    >
                      <Sparkles size={14} />
                      {trip.featured ? 'Showcased' : 'Showcase'}
                    </button>

                    <Link
                      to={`/admin/edit/${trip.id}`}
                      className="p-3.5 bg-gray-100 text-gray-500 hover:text-primary hover:bg-primary/10 rounded-2xl transition-all"
                      title="Edit Tour"
                    >
                      <Edit2 size={18} />
                    </Link>

                    <button
                      onClick={() => handleDeleteTrip(trip.id)}
                      className="p-3.5 bg-gray-100 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-2xl transition-all"
                      title="Delete Tour"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'inquiries' && (
          <div>
            <header className="mb-10">
              <h2 className="text-3xl md:text-4xl font-display font-black text-charcoal tracking-tighter uppercase italic">
                Custom Trip <span className="text-primary">Inquiries</span>
              </h2>
              <p className="text-gray-400 font-medium italic mt-1">Inquiries submitted by travelers looking for custom itineraries & corporate tours</p>
            </header>

            {customTrips.length === 0 ? (
              <div className="bg-white p-16 rounded-[3rem] text-center border border-gray-100 space-y-4">
                <MessageSquare size={48} className="text-gray-300 mx-auto" />
                <h3 className="text-xl font-bold text-gray-400 uppercase">No Inquiries Yet</h3>
                <p className="text-sm text-gray-400 italic">User custom trip submissions will appear here automatically.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-6">
                {customTrips.map((inquiry) => (
                  <motion.div
                    key={inquiry.id || inquiry.createdAt}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white p-6 md:p-8 rounded-[2.5rem] border border-gray-100 shadow-xl space-y-4 relative group"
                  >
                    <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 border-b border-gray-100 pb-4">
                      <div>
                        <span className="text-[9px] font-black uppercase tracking-widest text-primary bg-primary/10 px-3 py-1 rounded-full">
                          📍 {inquiry.destination}
                        </span>
                        <h3 className="text-xl font-bold text-charcoal mt-2">{inquiry.fullName}</h3>
                        <p className="text-xs text-gray-400 font-medium">
                          📞 {inquiry.phone} {inquiry.email ? `• ✉️ ${inquiry.email}` : ''}
                        </p>
                      </div>

                      <div className="flex items-center gap-3">
                        <a
                          href={getWhatsAppLink(`Hi ${inquiry.fullName}! Received your custom trip inquiry for ${inquiry.destination}. Let's design your itinerary!`)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-emerald-500 text-white px-5 py-3 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-emerald-600 transition-all flex items-center gap-2 shadow-lg shadow-emerald-500/20"
                        >
                          <MessageCircle size={16} /> Reply WhatsApp
                        </a>

                        <button
                          onClick={() => inquiry.id && handleDeleteInquiry(inquiry.id)}
                          className="p-3 bg-gray-100 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-2xl transition-all"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-gray-50 p-4 rounded-2xl text-xs">
                      <div>
                        <span className="text-gray-400 font-bold block text-[9px] uppercase">Travel Date</span>
                        <span className="font-bold text-charcoal">{inquiry.startDate} ({inquiry.duration})</span>
                      </div>
                      <div>
                        <span className="text-gray-400 font-bold block text-[9px] uppercase">Group Size</span>
                        <span className="font-bold text-charcoal">{inquiry.travelers} ({inquiry.groupType})</span>
                      </div>
                      <div>
                        <span className="text-gray-400 font-bold block text-[9px] uppercase">Budget</span>
                        <span className="font-bold text-secondary">{inquiry.budget}</span>
                      </div>
                      <div>
                        <span className="text-gray-400 font-bold block text-[9px] uppercase">Hotel & Flights</span>
                        <span className="font-bold text-charcoal">{inquiry.hotelTier} {inquiry.flightsNeeded ? '• Flights Included' : ''}</span>
                      </div>
                    </div>

                    {inquiry.specialRequests && (
                      <p className="text-xs text-gray-500 italic bg-amber-50/60 p-4 rounded-2xl border border-amber-100">
                        💬 <span className="font-bold text-amber-900">Notes:</span> {inquiry.specialRequests}
                      </p>
                    )}
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  )
}

export default AdminDashboard
