import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Plus,
  Edit2,
  Trash2,
  LayoutDashboard,
  LogOut,
  MapPin,
  Image as ImageIcon,
  Star,
  Calendar,
  Users,
  MessageSquare,
  CheckCircle,
  Sparkles,
  MessageCircle,
  Globe,
  ArrowLeft,
  Copy,
  Download,
  Filter,
  Search,
  Anchor,
  Briefcase,
  Shield,
  Clock,
  ExternalLink,
  ChevronRight,
  TrendingUp,
  X,
  FileText
} from 'lucide-react'
import {
  getTrips,
  deleteTrip,
  updateTrip,
  addTrip,
  getLeads,
  updateLead,
  deleteLead,
  Lead,
  LeadStatus,
  LeadType,
  getCorporateTestimonials,
  saveCorporateTestimonials,
  getCorporatePhotos,
  saveCorporatePhotos,
  CorporateTestimonial,
  CorporatePhoto,
  getAuditLogs,
  AuditLogItem,
  getMediaAssets,
  addMediaAsset,
  deleteMediaAsset,
  MediaAsset
} from '../../lib/dataService'
import { Trip, CATEGORIES } from '../../lib/trips'
import { getWhatsAppLink } from '../../lib/data'
import { haptics } from '../../lib/haptics'
import Logo from '../../components/Logo'

type AdminTab = 'overview' | 'inventory' | 'leads' | 'departures' | 'corporate' | 'media' | 'audit'

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState<AdminTab>('overview')
  const [role, setRole] = useState<'Super Admin' | 'Editor' | 'Sales / Viewer'>('Super Admin')
  const [trips, setTrips] = useState<Trip[]>([])
  const [leads, setLeads] = useState<Lead[]>([])
  const [corporateTestimonials, setCorporateTestimonials] = useState<CorporateTestimonial[]>([])
  const [corporatePhotos, setCorporatePhotos] = useState<CorporatePhoto[]>([])
  const [auditLogs, setAuditLogs] = useState<AuditLogItem[]>([])
  const [mediaAssets, setMediaAssets] = useState<MediaAsset[]>([])

  // Search & filter states
  const [tripSearch, setTripSearch] = useState('')
  const [tripCategoryFilter, setTripCategoryFilter] = useState('All')
  const [tripStatusFilter, setTripStatusFilter] = useState('All')

  const [leadSearch, setLeadSearch] = useState('')
  const [leadStatusFilter, setLeadStatusFilter] = useState('All')
  const [leadTypeFilter, setLeadTypeFilter] = useState('All')
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null)

  // Quick media add form
  const [newMediaUrl, setNewMediaUrl] = useState('')
  const [newMediaTitle, setNewMediaTitle] = useState('')
  const [newMediaAlt, setNewMediaAlt] = useState('')

  // Quick departure date form
  const [depTripId, setDepTripId] = useState<number>(0)
  const [depDate, setDepDate] = useState('')
  const [depSeats, setDepSeats] = useState(25)
  const [depPrice, setDepPrice] = useState('')

  const navigate = useNavigate()

  useEffect(() => {
    if (sessionStorage.getItem('isAdmin') !== 'true') {
      navigate('/admin/login')
    }
    loadData()
  }, [navigate])

  const loadData = async () => {
    const [t, l, ct, cp, logs, media] = await Promise.all([
      getTrips(),
      getLeads(),
      getCorporateTestimonials(),
      getCorporatePhotos(),
      getAuditLogs(),
      getMediaAssets()
    ])
    setTrips(t)
    setLeads(l)
    setCorporateTestimonials(ct)
    setCorporatePhotos(cp)
    setAuditLogs(logs)
    setMediaAssets(media)
    if (t.length > 0 && depTripId === 0) setDepTripId(t[0].id)
  }

  const handleDeleteTrip = async (id: number) => {
    if (role === 'Sales / Viewer') {
      alert('Your role does not permit modifying packages.')
      return
    }
    if (window.confirm('Are you sure you want to remove this expedition package?')) {
      haptics.medium()
      await deleteTrip(id)
      loadData()
    }
  }

  const handleDuplicateTrip = async (trip: Trip) => {
    if (role === 'Sales / Viewer') return
    haptics.medium()
    const copy: Omit<Trip, 'id'> = {
      ...trip,
      title: `${trip.title} (Duplicate)`,
      featured: false,
      status: 'Draft'
    }
    const created = await addTrip(copy)
    await loadData()
    alert(`Duplicated "${trip.title}" as new Draft package #${created.id}`)
  }

  const toggleFeatured = async (trip: Trip) => {
    if (role === 'Sales / Viewer') return
    haptics.light()
    const updated = { ...trip, featured: !trip.featured }
    await updateTrip(updated)
    setTrips(prev => prev.map(t => t.id === trip.id ? updated : t))
  }

  const toggleStatus = async (trip: Trip) => {
    if (role === 'Sales / Viewer') return
    haptics.light()
    const nextStatus: 'Published' | 'Draft' | 'Archived' =
      trip.status === 'Draft' ? 'Published' : trip.status === 'Published' ? 'Draft' : 'Published'
    const updated = { ...trip, status: nextStatus }
    await updateTrip(updated)
    setTrips(prev => prev.map(t => t.id === trip.id ? updated : t))
  }

  const handleLeadStatusChange = async (lead: Lead, newStatus: LeadStatus) => {
    haptics.light()
    const updated = { ...lead, status: newStatus }
    await updateLead(updated)
    setLeads(prev => prev.map(l => l.id === lead.id ? updated : l))
    if (selectedLead && selectedLead.id === lead.id) setSelectedLead(updated)
  }

  const handleDeleteLead = async (id: number) => {
    if (window.confirm('Delete this lead inquiry?')) {
      haptics.medium()
      await deleteLead(id)
      if (selectedLead?.id === id) setSelectedLead(null)
      loadData()
    }
  }

  const handleAddMedia = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newMediaUrl.trim()) return
    haptics.light()
    await addMediaAsset({
      url: newMediaUrl.trim(),
      title: newMediaTitle.trim() || 'Travel Photo',
      altText: newMediaAlt.trim() || 'INFIYATRA journey destination'
    })
    setNewMediaUrl('')
    setNewMediaTitle('')
    setNewMediaAlt('')
    const m = await getMediaAssets()
    setMediaAssets(m)
  }

  const handleAddDeparture = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!depDate.trim()) return
    const targetTrip = trips.find(t => t.id === depTripId)
    if (!targetTrip) return
    haptics.light()

    const newDep = {
      id: `dep-${Date.now()}`,
      date: depDate.trim(),
      priceOverride: depPrice.trim() || targetTrip.price,
      seatsTotal: depSeats,
      seatsAvailable: depSeats,
      status: 'Open' as const
    }

    const currentDeps = targetTrip.departures || []
    const updatedTrip: Trip = {
      ...targetTrip,
      departures: [newDep, ...currentDeps]
    }
    await updateTrip(updatedTrip)
    await loadData()
    setDepDate('')
    setDepPrice('')
    alert(`Added departure batch for "${targetTrip.title}" on ${newDep.date}!`)
  }

  const exportLeadsToCSV = () => {
    haptics.medium()
    const headers = ['ID', 'Date', 'Type', 'Status', 'Full Name', 'Phone', 'Email', 'Company', 'Destination', 'Travel Date', 'Travelers', 'Budget', 'Notes']
    const rows = leads.map(l => [
      l.id,
      new Date(l.createdAt).toLocaleDateString(),
      l.type,
      l.status,
      `"${(l.fullName || '').replace(/"/g, '""')}"`,
      `"${l.phone || ''}"`,
      `"${l.email || ''}"`,
      `"${(l.companyName || '').replace(/"/g, '""')}"`,
      `"${(l.destination || '').replace(/"/g, '""')}"`,
      `"${(l.travelDate || '').replace(/"/g, '""')}"`,
      `"${l.travelers || ''}"`,
      `"${(l.budget || '').replace(/"/g, '""')}"`,
      `"${(l.notes || '').replace(/"/g, '""')}"`
    ])
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n')
    const encodedUri = encodeURI(csvContent)
    const link = document.createElement('a')
    link.setAttribute('href', encodedUri)
    link.setAttribute('download', `infiyatra_leads_${new Date().toISOString().slice(0, 10)}.csv`)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const handleLogout = () => {
    sessionStorage.removeItem('isAdmin')
    navigate('/admin/login')
  }

  // Filtered trips
  const filteredTrips = trips.filter(t => {
    const matchesSearch = !tripSearch || [t.title, t.location, t.category].some(s => s?.toLowerCase().includes(tripSearch.toLowerCase()))
    const matchesCategory = tripCategoryFilter === 'All' || t.category === tripCategoryFilter
    const matchesStatus = tripStatusFilter === 'All' || (tripStatusFilter === 'Draft' ? t.status === 'Draft' : t.status !== 'Draft')
    return matchesSearch && matchesCategory && matchesStatus
  })

  // Filtered leads
  const filteredLeads = leads.filter(l => {
    const matchesSearch = !leadSearch || [l.fullName, l.phone, l.email, l.destination, l.companyName].some(s => s?.toLowerCase().includes(leadSearch.toLowerCase()))
    const matchesStatus = leadStatusFilter === 'All' || l.status === leadStatusFilter
    const matchesType = leadTypeFilter === 'All' || l.type === leadTypeFilter
    return matchesSearch && matchesStatus && matchesType
  })

  // KPIs
  const totalPackages = trips.length
  const activePackages = trips.filter(t => t.status !== 'Draft' && t.status !== 'Archived').length
  const totalLeads = leads.length
  const newLeadsCount = leads.filter(l => l.status === 'New').length
  const allDeparturesCount = trips.reduce((acc, t) => acc + (t.departures?.length || 0), 0)

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar Navigation */}
      <aside className="w-80 bg-charcoal text-white p-6 hidden lg:flex flex-col border-r border-gray-800 shrink-0">
        <div className="mb-8">
          <Link to="/" className="flex items-center gap-2 mb-2">
            <Logo size="md" />
            <span className="text-[10px] bg-primary/20 text-primary px-2 py-0.5 rounded font-black tracking-widest uppercase">
              Admin CMS
            </span>
          </Link>
          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1">
            Expedition Operations Center
          </p>

          {/* Role Indicator & Switcher */}
          <div className="mt-4 bg-white/5 border border-white/10 p-3 rounded-xl flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Shield size={14} className="text-secondary" />
              <span className="text-xs font-bold text-white/90">{role}</span>
            </div>
            <select
              value={role}
              onChange={e => setRole(e.target.value as any)}
              className="bg-transparent text-[10px] font-bold text-secondary outline-none cursor-pointer"
            >
              <option value="Super Admin" className="bg-charcoal text-white">Super Admin</option>
              <option value="Editor" className="bg-charcoal text-white">Editor</option>
              <option value="Sales / Viewer" className="bg-charcoal text-white">Sales / Viewer</option>
            </select>
          </div>
        </div>

        <nav className="flex-grow space-y-2">
          {/* Overview */}
          <button
            onClick={() => { haptics.light(); setActiveTab('overview'); }}
            className={`w-full flex items-center justify-between p-3.5 rounded-xl font-bold transition-all text-xs uppercase tracking-wider ${
              activeTab === 'overview' ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'text-white/60 hover:text-white hover:bg-white/5'
            }`}
          >
            <div className="flex items-center space-x-3">
              <TrendingUp size={16} />
              <span>KPI Overview</span>
            </div>
          </button>

          {/* Inventory */}
          <button
            onClick={() => { haptics.light(); setActiveTab('inventory'); }}
            className={`w-full flex items-center justify-between p-3.5 rounded-xl font-bold transition-all text-xs uppercase tracking-wider ${
              activeTab === 'inventory' ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'text-white/60 hover:text-white hover:bg-white/5'
            }`}
          >
            <div className="flex items-center space-x-3">
              <LayoutDashboard size={16} />
              <span>Package Inventory</span>
            </div>
            <span className="text-[10px] bg-white/20 px-2 py-0.5 rounded-full">{trips.length}</span>
          </button>

          {/* Leads Inbox */}
          <button
            onClick={() => { haptics.light(); setActiveTab('leads'); }}
            className={`w-full flex items-center justify-between p-3.5 rounded-xl font-bold transition-all text-xs uppercase tracking-wider ${
              activeTab === 'leads' ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'text-white/60 hover:text-white hover:bg-white/5'
            }`}
          >
            <div className="flex items-center space-x-3">
              <MessageSquare size={16} />
              <span>Leads & Enquiries</span>
            </div>
            {newLeadsCount > 0 && (
              <span className="text-[10px] bg-secondary text-white font-black px-2 py-0.5 rounded-full animate-pulse">
                {newLeadsCount} New
              </span>
            )}
          </button>

          {/* Departures */}
          <button
            onClick={() => { haptics.light(); setActiveTab('departures'); }}
            className={`w-full flex items-center justify-between p-3.5 rounded-xl font-bold transition-all text-xs uppercase tracking-wider ${
              activeTab === 'departures' ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'text-white/60 hover:text-white hover:bg-white/5'
            }`}
          >
            <div className="flex items-center space-x-3">
              <Calendar size={16} />
              <span>Departure Batches</span>
            </div>
            <span className="text-[10px] bg-white/20 px-2 py-0.5 rounded-full">{allDeparturesCount}</span>
          </button>

          {/* Corporate Content */}
          <button
            onClick={() => { haptics.light(); setActiveTab('corporate'); }}
            className={`w-full flex items-center justify-between p-3.5 rounded-xl font-bold transition-all text-xs uppercase tracking-wider ${
              activeTab === 'corporate' ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'text-white/60 hover:text-white hover:bg-white/5'
            }`}
          >
            <div className="flex items-center space-x-3">
              <Briefcase size={16} />
              <span>Corporate CMS</span>
            </div>
          </button>

          {/* Media Library */}
          <button
            onClick={() => { haptics.light(); setActiveTab('media'); }}
            className={`w-full flex items-center justify-between p-3.5 rounded-xl font-bold transition-all text-xs uppercase tracking-wider ${
              activeTab === 'media' ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'text-white/60 hover:text-white hover:bg-white/5'
            }`}
          >
            <div className="flex items-center space-x-3">
              <ImageIcon size={16} />
              <span>Media Assets</span>
            </div>
            <span className="text-[10px] bg-white/20 px-2 py-0.5 rounded-full">{mediaAssets.length}</span>
          </button>

          {/* Audit Logs */}
          <button
            onClick={() => { haptics.light(); setActiveTab('audit'); }}
            className={`w-full flex items-center justify-between p-3.5 rounded-xl font-bold transition-all text-xs uppercase tracking-wider ${
              activeTab === 'audit' ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'text-white/60 hover:text-white hover:bg-white/5'
            }`}
          >
            <div className="flex items-center space-x-3">
              <FileText size={16} />
              <span>Audit Log</span>
            </div>
          </button>

          {/* Hero Slides */}
          <Link
            to="/admin/hero"
            className="flex items-center space-x-3 p-3.5 rounded-xl font-bold transition-all text-white/60 hover:text-white hover:bg-white/5 text-xs uppercase tracking-wider"
          >
            <Sparkles size={16} />
            <span>Homepage Hero</span>
          </Link>
        </nav>

        {/* Footer actions */}
        <div className="pt-6 border-t border-gray-800 space-y-2">
          <Link
            to="/"
            className="flex items-center space-x-3 p-3 text-secondary hover:text-white hover:bg-white/5 transition-all font-bold rounded-xl text-xs"
          >
            <Globe size={16} />
            <span>View Live Website</span>
          </Link>

          <button
            onClick={handleLogout}
            className="w-full flex items-center space-x-3 p-3 text-red-400 hover:text-red-300 transition-all font-bold text-xs"
          >
            <LogOut size={16} />
            <span>Log Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-grow p-4 md:p-8 lg:p-10 overflow-y-auto">
        {/* Mobile Header Tabs */}
        <div className="lg:hidden flex items-center gap-1 mb-6 bg-white p-1.5 rounded-xl shadow-sm border border-gray-200 overflow-x-auto">
          {(['overview', 'inventory', 'leads', 'departures', 'corporate', 'media', 'audit'] as AdminTab[]).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`py-2 px-3 text-[11px] font-bold uppercase rounded-lg shrink-0 transition-all ${
                activeTab === tab ? 'bg-primary text-white' : 'text-gray-500'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* ─── TAB 1: OVERVIEW & KPIS ─────────────────────────────────── */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h1 className="text-3xl font-display font-black text-charcoal tracking-tight uppercase italic">
                  Operations <span className="text-primary">Dashboard</span>
                </h1>
                <p className="text-gray-400 font-medium text-xs mt-1">Real-time status of packages, inquiries, departures, and conversion pipeline.</p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={exportLeadsToCSV}
                  className="bg-white border border-gray-200 text-charcoal px-4 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 hover:bg-gray-50 shadow-sm"
                >
                  <Download size={14} /> Export Leads CSV
                </button>
                <Link
                  to="/admin/new"
                  className="bg-primary text-white px-5 py-2.5 rounded-xl font-black text-xs uppercase tracking-wider shadow-lg shadow-primary/20 hover:scale-105 transition-all flex items-center gap-1.5"
                >
                  <Plus size={15} /> Add Expedition
                </Link>
              </div>
            </header>

            {/* KPI Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-2">
                <span className="text-[10px] font-black uppercase tracking-wider text-gray-400 block">Total Packages</span>
                <div className="flex items-baseline justify-between">
                  <span className="text-3xl font-display font-black text-charcoal">{totalPackages}</span>
                  <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                    {activePackages} Active
                  </span>
                </div>
                <p className="text-[11px] text-gray-400">{totalPackages - activePackages} Drafts / Archived</p>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-2">
                <span className="text-[10px] font-black uppercase tracking-wider text-gray-400 block">Total Inbound Leads</span>
                <div className="flex items-baseline justify-between">
                  <span className="text-3xl font-display font-black text-secondary">{totalLeads}</span>
                  <span className="text-xs font-bold text-secondary bg-secondary/10 px-2 py-0.5 rounded">
                    {newLeadsCount} New
                  </span>
                </div>
                <p className="text-[11px] text-gray-400">Custom trips, Corporate, Cruises</p>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-2">
                <span className="text-[10px] font-black uppercase tracking-wider text-gray-400 block">Upcoming Departures</span>
                <div className="flex items-baseline justify-between">
                  <span className="text-3xl font-display font-black text-charcoal">{allDeparturesCount}</span>
                  <span className="text-xs font-bold text-primary bg-primary/10 px-2 py-0.5 rounded">
                    Live
                  </span>
                </div>
                <p className="text-[11px] text-gray-400">Scheduled batches across tours</p>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-2">
                <span className="text-[10px] font-black uppercase tracking-wider text-gray-400 block">Conversion Status</span>
                <div className="flex items-baseline justify-between">
                  <span className="text-3xl font-display font-black text-emerald-600">
                    {leads.filter(l => l.status === 'Confirmed').length}
                  </span>
                  <span className="text-xs font-bold text-gray-500">
                    {leads.filter(l => l.status === 'Quote Sent').length} Quoted
                  </span>
                </div>
                <p className="text-[11px] text-gray-400">{leads.filter(l => l.status === 'Contacted').length} Contacted / In Progress</p>
              </div>
            </div>

            {/* Recent Leads Widget */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="font-display font-bold text-lg text-charcoal uppercase">Recent Leads & Enquiries</h3>
                <button
                  onClick={() => setActiveTab('leads')}
                  className="text-xs font-bold text-primary hover:underline flex items-center gap-1"
                >
                  View All ({leads.length}) <ChevronRight size={14} />
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-gray-100 text-gray-400 uppercase text-[10px] tracking-wider">
                      <th className="pb-3">Traveler / Company</th>
                      <th className="pb-3">Destination</th>
                      <th className="pb-3">Type</th>
                      <th className="pb-3">Status</th>
                      <th className="pb-3 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {leads.slice(0, 5).map(lead => (
                      <tr key={lead.id} className="hover:bg-gray-50/50">
                        <td className="py-3 font-bold text-charcoal">
                          {lead.fullName}
                          <span className="block text-[11px] font-normal text-gray-400">{lead.phone}</span>
                        </td>
                        <td className="py-3 text-gray-600">{lead.destination}</td>
                        <td className="py-3">
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-gray-100 text-gray-700">
                            {lead.type.replace('_', ' ')}
                          </span>
                        </td>
                        <td className="py-3">
                          <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                            lead.status === 'New' ? 'bg-secondary/15 text-secondary' :
                            lead.status === 'Confirmed' ? 'bg-emerald-100 text-emerald-700' :
                            lead.status === 'Quote Sent' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-600'
                          }`}>
                            {lead.status}
                          </span>
                        </td>
                        <td className="py-3 text-right">
                          <a
                            href={getWhatsAppLink(`Hi ${lead.fullName}! Reaching out regarding your ${lead.destination} inquiry with INFIYATRA.`)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-600 hover:underline"
                          >
                            <MessageCircle size={13} /> Reply
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ─── TAB 2: PACKAGE INVENTORY ───────────────────────────────── */}
        {activeTab === 'inventory' && (
          <div className="space-y-6">
            <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h1 className="text-3xl font-display font-black text-charcoal tracking-tight uppercase italic">
                  Package <span className="text-primary">Inventory & Showcasing</span>
                </h1>
                <p className="text-gray-400 font-medium text-xs mt-1">Manage active tours, duplicate packages, toggle homepage showcase & edit itineraries.</p>
              </div>

              <Link
                to="/admin/new"
                className="bg-primary text-white px-6 py-3 rounded-xl font-black text-xs uppercase tracking-wider shadow-lg shadow-primary/20 hover:scale-105 transition-all flex items-center gap-2"
              >
                <Plus size={16} /> Add New Package
              </Link>
            </header>

            {/* Filter controls */}
            <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex flex-wrap gap-3 items-center justify-between">
              <div className="flex flex-wrap gap-2 items-center flex-grow">
                {/* Search */}
                <div className="relative min-w-[200px]">
                  <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    value={tripSearch}
                    onChange={e => setTripSearch(e.target.value)}
                    placeholder="Search packages by title/location..."
                    className="w-full pl-9 pr-3 py-2 text-xs border border-gray-200 rounded-lg outline-none focus:border-primary"
                  />
                </div>

                {/* Status Filter */}
                <select
                  value={tripStatusFilter}
                  onChange={e => setTripStatusFilter(e.target.value)}
                  className="px-3 py-2 text-xs border border-gray-200 rounded-lg outline-none text-charcoal font-medium"
                >
                  <option value="All">All Statuses</option>
                  <option value="Published">Published Only</option>
                  <option value="Draft">Drafts Only</option>
                </select>

                {/* Category Filter */}
                <select
                  value={tripCategoryFilter}
                  onChange={e => setTripCategoryFilter(e.target.value)}
                  className="px-3 py-2 text-xs border border-gray-200 rounded-lg outline-none text-charcoal font-medium"
                >
                  <option value="All">All Categories</option>
                  {CATEGORIES.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                </select>
              </div>

              <span className="text-xs text-gray-400 font-bold">
                Showing {filteredTrips.length} of {trips.length} tours
              </span>
            </div>

            {/* Trips List */}
            <div className="grid grid-cols-1 gap-4">
              {filteredTrips.map(trip => (
                <div
                  key={trip.id}
                  className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm hover:border-gray-200 transition-all flex flex-col md:flex-row items-center gap-5"
                >
                  <div className="w-full md:w-32 h-28 rounded-xl overflow-hidden shrink-0 relative bg-gray-100">
                    <img src={trip.image} alt={trip.title} className="w-full h-full object-cover" />
                    {trip.featured && (
                      <span className="absolute top-2 left-2 bg-secondary text-white text-[8px] font-black uppercase px-2 py-0.5 rounded">
                        ★ Featured
                      </span>
                    )}
                  </div>

                  <div className="flex-grow space-y-1.5 w-full text-center md:text-left">
                    <div className="flex flex-wrap items-center justify-center md:justify-start gap-1.5">
                      <span className={`text-[8px] font-black uppercase px-2 py-0.5 rounded ${
                        trip.type === 'International' ? 'bg-secondary/10 text-secondary' : 'bg-primary/10 text-primary'
                      }`}>
                        {trip.type}
                      </span>
                      <span className="text-[8px] font-black uppercase px-2 py-0.5 bg-gray-100 text-gray-600 rounded">
                        {trip.category}
                      </span>
                      <button
                        onClick={() => toggleStatus(trip)}
                        className={`text-[8px] font-black uppercase px-2.5 py-0.5 rounded transition-colors ${
                          trip.status === 'Draft' ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-800'
                        }`}
                        title="Click to toggle Published / Draft"
                      >
                        {trip.status === 'Draft' ? 'Draft (Hidden)' : 'Published (Live)'}
                      </button>
                    </div>

                    <h3 className="text-base font-bold text-charcoal">{trip.title}</h3>

                    <div className="flex flex-wrap items-center justify-center md:justify-start text-gray-500 text-xs gap-3">
                      <span className="flex items-center gap-1"><MapPin size={12} className="text-primary" /> {trip.location}</span>
                      <span className="flex items-center gap-1"><Calendar size={12} className="text-secondary" /> {trip.nextBatch || 'Flexible'}</span>
                      <span className="font-bold text-charcoal">₹{trip.price}</span>
                    </div>
                  </div>

                  {/* Action buttons */}
                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      type="button"
                      onClick={() => toggleFeatured(trip)}
                      className={`px-3 py-2 rounded-xl text-[10px] font-bold uppercase transition-all flex items-center gap-1 ${
                        trip.featured ? 'bg-secondary text-white' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                      }`}
                      title="Showcase on Homepage"
                    >
                      <Sparkles size={12} /> {trip.featured ? 'Featured' : 'Feature'}
                    </button>

                    <button
                      type="button"
                      onClick={() => handleDuplicateTrip(trip)}
                      className="p-2.5 bg-gray-100 text-gray-600 hover:text-charcoal hover:bg-gray-200 rounded-xl"
                      title="Duplicate Package"
                    >
                      <Copy size={15} />
                    </button>

                    <Link
                      to={`/trip/${trip.id}`}
                      target="_blank"
                      className="p-2.5 bg-gray-100 text-gray-600 hover:text-charcoal hover:bg-gray-200 rounded-xl"
                      title="Live Preview"
                    >
                      <ExternalLink size={15} />
                    </Link>

                    <Link
                      to={`/admin/edit/${trip.id}`}
                      className="p-2.5 bg-primary/10 text-primary hover:bg-primary hover:text-white transition-all rounded-xl"
                      title="Edit Package"
                    >
                      <Edit2 size={15} />
                    </Link>

                    <button
                      onClick={() => handleDeleteTrip(trip.id)}
                      className="p-2.5 bg-gray-100 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-xl"
                      title="Delete Package"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ─── TAB 3: LEADS & ENQUIRIES INBOX ─────────────────────────── */}
        {activeTab === 'leads' && (
          <div className="space-y-6">
            <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h1 className="text-3xl font-display font-black text-charcoal tracking-tight uppercase italic">
                  Unified <span className="text-primary">Leads & Enquiries</span>
                </h1>
                <p className="text-gray-400 font-medium text-xs mt-1">Manage inbound inquiries from Custom Trips, Corporate RFPs, Cruises, and Packages.</p>
              </div>

              <button
                onClick={exportLeadsToCSV}
                className="bg-emerald-600 hover:bg-emerald-500 text-white px-5 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow-lg shadow-emerald-600/20"
              >
                <Download size={14} /> Export Leads CSV
              </button>
            </header>

            {/* Filter bar */}
            <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex flex-wrap gap-3 items-center justify-between">
              <div className="flex flex-wrap gap-2 items-center flex-grow">
                <div className="relative min-w-[200px]">
                  <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    value={leadSearch}
                    onChange={e => setLeadSearch(e.target.value)}
                    placeholder="Search by name, phone, destination..."
                    className="w-full pl-9 pr-3 py-2 text-xs border border-gray-200 rounded-lg outline-none focus:border-primary"
                  />
                </div>

                <select
                  value={leadTypeFilter}
                  onChange={e => setLeadTypeFilter(e.target.value)}
                  className="px-3 py-2 text-xs border border-gray-200 rounded-lg outline-none text-charcoal font-medium"
                >
                  <option value="All">All Inquiries</option>
                  <option value="custom_trip">Custom Trip</option>
                  <option value="corporate">Corporate RFP</option>
                  <option value="cruise">Cruise Booking</option>
                  <option value="package">Package Lead</option>
                </select>

                <select
                  value={leadStatusFilter}
                  onChange={e => setLeadStatusFilter(e.target.value)}
                  className="px-3 py-2 text-xs border border-gray-200 rounded-lg outline-none text-charcoal font-medium"
                >
                  <option value="All">All Statuses</option>
                  <option value="New">New</option>
                  <option value="Contacted">Contacted</option>
                  <option value="Quote Sent">Quote Sent</option>
                  <option value="Confirmed">Confirmed</option>
                  <option value="Lost">Lost</option>
                </select>
              </div>

              <span className="text-xs text-gray-400 font-bold">
                {filteredLeads.length} Inquiries
              </span>
            </div>

            {/* Leads Table */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-gray-50 border-b border-gray-100 text-gray-500 uppercase text-[10px] tracking-wider">
                    <tr>
                      <th className="p-4">Traveler / Contact</th>
                      <th className="p-4">Inquiry Type</th>
                      <th className="p-4">Destination & Dates</th>
                      <th className="p-4">Group & Budget</th>
                      <th className="p-4">Status</th>
                      <th className="p-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {filteredLeads.map(lead => (
                      <tr key={lead.id} className="hover:bg-gray-50/60">
                        <td className="p-4">
                          <button
                            onClick={() => setSelectedLead(lead)}
                            className="font-bold text-charcoal hover:text-primary text-left"
                          >
                            {lead.fullName}
                          </button>
                          <div className="text-[11px] text-gray-400 font-medium">
                            {lead.phone} {lead.email ? `• ${lead.email}` : ''}
                          </div>
                        </td>

                        <td className="p-4">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                            lead.type === 'corporate' ? 'bg-purple-100 text-purple-700' :
                            lead.type === 'cruise' ? 'bg-blue-100 text-blue-700' : 'bg-primary/10 text-primary'
                          }`}>
                            {lead.type.replace('_', ' ')}
                          </span>
                        </td>

                        <td className="p-4">
                          <div className="font-semibold text-charcoal">{lead.destination}</div>
                          <div className="text-[11px] text-gray-400">{lead.travelDate || 'Flexible'} ({lead.duration || 'Standard'})</div>
                        </td>

                        <td className="p-4">
                          <div className="font-medium text-charcoal">{lead.travelers || 2} Pax ({lead.groupType || 'Travelers'})</div>
                          <div className="text-[11px] text-secondary font-bold">{lead.budget || 'Custom'}</div>
                        </td>

                        <td className="p-4">
                          <select
                            value={lead.status}
                            onChange={e => handleLeadStatusChange(lead, e.target.value as LeadStatus)}
                            className={`px-2 py-1 rounded-lg text-[10px] font-bold outline-none cursor-pointer border ${
                              lead.status === 'New' ? 'bg-secondary/10 border-secondary text-secondary' :
                              lead.status === 'Confirmed' ? 'bg-emerald-50 border-emerald-500 text-emerald-700' :
                              lead.status === 'Quote Sent' ? 'bg-blue-50 border-blue-500 text-blue-700' : 'bg-gray-50 border-gray-300 text-gray-600'
                            }`}
                          >
                            <option value="New">New</option>
                            <option value="Contacted">Contacted</option>
                            <option value="Quote Sent">Quote Sent</option>
                            <option value="Confirmed">Confirmed</option>
                            <option value="Lost">Lost</option>
                          </select>
                        </td>

                        <td className="p-4 text-right space-x-2">
                          <a
                            href={getWhatsAppLink(`Hi ${lead.fullName}! Reaching out regarding your ${lead.destination} inquiry with INFIYATRA.`)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex p-2 rounded-lg bg-emerald-50 text-emerald-600 hover:bg-emerald-100 transition-colors"
                            title="Reply on WhatsApp"
                          >
                            <MessageCircle size={15} />
                          </a>

                          <button
                            onClick={() => setSelectedLead(lead)}
                            className="inline-flex p-2 rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors"
                            title="View Full Details"
                          >
                            <ChevronRight size={15} />
                          </button>

                          <button
                            onClick={() => handleDeleteLead(lead.id)}
                            className="inline-flex p-2 rounded-lg bg-red-50 text-red-500 hover:bg-red-100 transition-colors"
                            title="Delete Lead"
                          >
                            <Trash2 size={15} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Lead Detail Modal Drawer */}
            {selectedLead && (
              <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-6 max-h-[90vh] overflow-y-auto shadow-2xl"
                >
                  <div className="flex justify-between items-start border-b border-gray-100 pb-4">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-primary bg-primary/10 px-2.5 py-0.5 rounded">
                        {selectedLead.type.replace('_', ' ')} Inquiry #{selectedLead.id}
                      </span>
                      <h2 className="text-2xl font-bold text-charcoal mt-1">{selectedLead.fullName}</h2>
                    </div>
                    <button onClick={() => setSelectedLead(null)} className="text-gray-400 hover:text-charcoal p-1">
                      <X size={20} />
                    </button>
                  </div>

                  <div className="space-y-4 text-xs">
                    <div className="grid grid-cols-2 gap-3 bg-gray-50 p-4 rounded-xl">
                      <div>
                        <span className="text-gray-400 font-bold block text-[10px] uppercase">Phone / WhatsApp</span>
                        <span className="font-bold text-charcoal">{selectedLead.phone}</span>
                      </div>
                      <div>
                        <span className="text-gray-400 font-bold block text-[10px] uppercase">Email</span>
                        <span className="font-bold text-charcoal">{selectedLead.email || 'None provided'}</span>
                      </div>
                      <div>
                        <span className="text-gray-400 font-bold block text-[10px] uppercase">Destination</span>
                        <span className="font-bold text-charcoal">{selectedLead.destination}</span>
                      </div>
                      <div>
                        <span className="text-gray-400 font-bold block text-[10px] uppercase">Travel Date / Length</span>
                        <span className="font-bold text-charcoal">{selectedLead.travelDate} ({selectedLead.duration})</span>
                      </div>
                      <div>
                        <span className="text-gray-400 font-bold block text-[10px] uppercase">Group Composition</span>
                        <span className="font-bold text-charcoal">{selectedLead.travelers} Pax ({selectedLead.groupType})</span>
                      </div>
                      <div>
                        <span className="text-gray-400 font-bold block text-[10px] uppercase">Budget & Hotel</span>
                        <span className="font-bold text-secondary">{selectedLead.budget} • {selectedLead.hotelTier}</span>
                      </div>
                    </div>

                    {selectedLead.notes && (
                      <div className="p-4 bg-amber-50 rounded-xl border border-amber-100">
                        <span className="text-amber-900 font-bold uppercase text-[10px] block mb-1">Traveler Notes / RFP</span>
                        <p className="text-gray-700 leading-relaxed">{selectedLead.notes}</p>
                      </div>
                    )}

                    <div>
                      <label className="text-[10px] font-bold uppercase tracking-wider text-gray-400 block mb-1">Status Pipeline</label>
                      <select
                        value={selectedLead.status}
                        onChange={e => handleLeadStatusChange(selectedLead, e.target.value as LeadStatus)}
                        className="w-full p-3 border border-gray-200 rounded-xl font-bold text-xs text-charcoal outline-none"
                      >
                        <option value="New">New</option>
                        <option value="Contacted">Contacted</option>
                        <option value="Quote Sent">Quote Sent</option>
                        <option value="Confirmed">Confirmed</option>
                        <option value="Lost">Lost</option>
                      </select>
                    </div>
                  </div>

                  <div className="pt-2 flex justify-end gap-3 border-t border-gray-100">
                    <a
                      href={getWhatsAppLink(`Hi ${selectedLead.fullName}! Reaching out regarding your ${selectedLead.destination} inquiry with INFIYATRA.`)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-emerald-600 hover:bg-emerald-500 text-white px-5 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 shadow-md shadow-emerald-600/20"
                    >
                      <MessageCircle size={15} /> Chat WhatsApp
                    </a>
                  </div>
                </motion.div>
              </div>
            )}
          </div>
        )}

        {/* ─── TAB 4: DEPARTURE BATCHES MANAGER ──────────────────────── */}
        {activeTab === 'departures' && (
          <div className="space-y-6">
            <header>
              <h1 className="text-3xl font-display font-black text-charcoal tracking-tight uppercase italic">
                Dates & <span className="text-primary">Departures Manager</span>
              </h1>
              <p className="text-gray-400 font-medium text-xs mt-1">Manage scheduled departure batches, availability seats, and price overrides.</p>
            </header>

            {/* Add Departure Batch Form */}
            <form onSubmit={handleAddDeparture} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-4">
              <h3 className="text-sm font-bold text-charcoal uppercase">Schedule New Departure Batch</h3>
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-xs">
                <div>
                  <label className="text-gray-400 font-bold block text-[10px] uppercase mb-1">Select Tour Package</label>
                  <select
                    value={depTripId}
                    onChange={e => setDepTripId(parseInt(e.target.value))}
                    className="w-full p-2.5 border border-gray-200 rounded-xl outline-none"
                  >
                    {trips.map(t => <option key={t.id} value={t.id}>{t.title} ({t.category})</option>)}
                  </select>
                </div>

                <div>
                  <label className="text-gray-400 font-bold block text-[10px] uppercase mb-1">Departure Date</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Nov 15, 2026"
                    value={depDate}
                    onChange={e => setDepDate(e.target.value)}
                    className="w-full p-2.5 border border-gray-200 rounded-xl outline-none"
                  />
                </div>

                <div>
                  <label className="text-gray-400 font-bold block text-[10px] uppercase mb-1">Total Seats</label>
                  <input
                    type="number"
                    min={1}
                    value={depSeats}
                    onChange={e => setDepSeats(parseInt(e.target.value) || 1)}
                    className="w-full p-2.5 border border-gray-200 rounded-xl outline-none"
                  />
                </div>

                <div>
                  <label className="text-gray-400 font-bold block text-[10px] uppercase mb-1">Price Override (Optional)</label>
                  <input
                    type="text"
                    placeholder="e.g. 29,999"
                    value={depPrice}
                    onChange={e => setDepPrice(e.target.value)}
                    className="w-full p-2.5 border border-gray-200 rounded-xl outline-none"
                  />
                </div>
              </div>

              <div className="flex justify-end pt-2">
                <button
                  type="submit"
                  className="bg-primary text-white px-6 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider shadow-md shadow-primary/20 hover:scale-105 transition-all"
                >
                  + Add Departure Date
                </button>
              </div>
            </form>

            {/* Scheduled Departures by Tour */}
            <div className="space-y-4">
              {trips.filter(t => t.departures && t.departures.length > 0).map(trip => (
                <div key={trip.id} className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm space-y-3">
                  <div className="flex justify-between items-center">
                    <h4 className="font-bold text-sm text-charcoal">{trip.title} ({trip.category})</h4>
                    <span className="text-xs text-gray-400">{trip.departures?.length} Scheduled Batches</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {trip.departures?.map((dep: any, dIdx: number) => (
                      <div key={dIdx} className="p-3 bg-gray-50 rounded-xl border border-gray-100 text-xs flex justify-between items-center">
                        <div>
                          <span className="font-bold text-charcoal block">{dep.date}</span>
                          <span className="text-gray-500 text-[11px]">{dep.seatsAvailable} seats available</span>
                        </div>
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          dep.status === 'Open' ? 'bg-emerald-100 text-emerald-800' : 'bg-secondary/15 text-secondary'
                        }`}>
                          {dep.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ─── TAB 5: CORPORATE CMS ──────────────────────────────────── */}
        {activeTab === 'corporate' && (
          <div className="space-y-8">
            <header>
              <h1 className="text-3xl font-display font-black text-charcoal tracking-tight uppercase italic">
                Corporate <span className="text-primary">Content Manager</span>
              </h1>
              <p className="text-gray-400 font-medium text-xs mt-1">Manage corporate client testimonials and offsite photo gallery.</p>
            </header>

            {/* Testimonials */}
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-4">
              <h3 className="text-sm font-bold text-charcoal uppercase">Corporate Testimonials ({corporateTestimonials.length})</h3>
              <div className="space-y-3">
                {corporateTestimonials.map((item, idx) => (
                  <div key={item.id} className="p-4 bg-gray-50 rounded-xl border border-gray-100 text-xs space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-charcoal">{item.author} — {item.role} ({item.company})</span>
                      <button
                        onClick={async () => {
                          const filtered = corporateTestimonials.filter(t => t.id !== item.id)
                          await saveCorporateTestimonials(filtered)
                          setCorporateTestimonials(filtered)
                        }}
                        className="text-red-500 hover:text-red-700 font-bold"
                      >
                        Remove
                      </button>
                    </div>
                    <p className="italic text-gray-600">"{item.quote}"</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Gallery Photos */}
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-4">
              <h3 className="text-sm font-bold text-charcoal uppercase">Corporate Gallery Photos ({corporatePhotos.length})</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {corporatePhotos.map((photo, idx) => (
                  <div key={photo.id || idx} className="relative group rounded-xl overflow-hidden aspect-[4/3] bg-gray-100 border border-gray-200">
                    <img src={photo.url} alt={photo.title} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity p-2 flex flex-col justify-between text-white text-[10px]">
                      <span className="font-bold truncate">{photo.title}</span>
                      <button
                        onClick={async () => {
                          const filtered = corporatePhotos.filter(p => p.id !== photo.id)
                          await saveCorporatePhotos(filtered)
                          setCorporatePhotos(filtered)
                        }}
                        className="bg-red-500 text-white py-1 rounded text-center font-bold"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ─── TAB 6: MEDIA LIBRARY ──────────────────────────────────── */}
        {activeTab === 'media' && (
          <div className="space-y-6">
            <header>
              <h1 className="text-3xl font-display font-black text-charcoal tracking-tight uppercase italic">
                Media <span className="text-primary">Assets Library</span>
              </h1>
              <p className="text-gray-400 font-medium text-xs mt-1">Centralized media library with image URLs, captions, and responsive web assets.</p>
            </header>

            {/* Add Media Form */}
            <form onSubmit={handleAddMedia} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-4">
              <h3 className="text-sm font-bold text-charcoal uppercase">Add New Media Asset</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                <div>
                  <label className="text-gray-400 font-bold block text-[10px] uppercase mb-1">Image URL *</label>
                  <input
                    type="text"
                    required
                    placeholder="/assets/goa.jpg or https://..."
                    value={newMediaUrl}
                    onChange={e => setNewMediaUrl(e.target.value)}
                    className="w-full p-2.5 border border-gray-200 rounded-xl outline-none"
                  />
                </div>
                <div>
                  <label className="text-gray-400 font-bold block text-[10px] uppercase mb-1">Asset Title</label>
                  <input
                    type="text"
                    placeholder="e.g. Lakshadweep Coral Reef"
                    value={newMediaTitle}
                    onChange={e => setNewMediaTitle(e.target.value)}
                    className="w-full p-2.5 border border-gray-200 rounded-xl outline-none"
                  />
                </div>
                <div>
                  <label className="text-gray-400 font-bold block text-[10px] uppercase mb-1">Alt Text</label>
                  <input
                    type="text"
                    placeholder="Accessibility description"
                    value={newMediaAlt}
                    onChange={e => setNewMediaAlt(e.target.value)}
                    className="w-full p-2.5 border border-gray-200 rounded-xl outline-none"
                  />
                </div>
              </div>

              <div className="flex justify-end pt-2">
                <button
                  type="submit"
                  className="bg-primary text-white px-6 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider shadow-md shadow-primary/20 hover:scale-105 transition-all"
                >
                  + Add Asset
                </button>
              </div>
            </form>

            {/* Media Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-4">
              {mediaAssets.map(asset => (
                <div key={asset.id} className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm group">
                  <div className="aspect-square bg-gray-100 relative overflow-hidden">
                    <img src={asset.url} alt={asset.altText} className="w-full h-full object-cover" />
                    <button
                      onClick={async () => {
                        await deleteMediaAsset(asset.id)
                        const m = await getMediaAssets()
                        setMediaAssets(m)
                      }}
                      className="absolute top-2 right-2 p-1.5 rounded-full bg-red-500 text-white opacity-0 group-hover:opacity-100 transition-opacity shadow"
                    >
                      <Trash2 size={12} />
                    </button>
                  </div>
                  <div className="p-2.5 text-[11px]">
                    <span className="font-bold text-charcoal truncate block">{asset.title}</span>
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(asset.url)
                        alert('Copied URL to clipboard: ' + asset.url)
                      }}
                      className="text-primary hover:underline text-[10px] font-bold mt-1 inline-flex items-center gap-1"
                    >
                      <Copy size={10} /> Copy Link
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ─── TAB 7: AUDIT LOG ──────────────────────────────────────── */}
        {activeTab === 'audit' && (
          <div className="space-y-6">
            <header>
              <h1 className="text-3xl font-display font-black text-charcoal tracking-tight uppercase italic">
                Admin <span className="text-primary">Audit Log</span>
              </h1>
              <p className="text-gray-400 font-medium text-xs mt-1">Audit trail recording all content modifications, lead status transitions, and user actions.</p>
            </header>

            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              <table className="w-full text-left text-xs">
                <thead className="bg-gray-50 border-b border-gray-100 text-gray-500 uppercase text-[10px] tracking-wider">
                  <tr>
                    <th className="p-4">Timestamp</th>
                    <th className="p-4">User</th>
                    <th className="p-4">Action</th>
                    <th className="p-4">Details</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {auditLogs.map(item => (
                    <tr key={item.id} className="hover:bg-gray-50/60">
                      <td className="p-4 text-gray-400 font-mono text-[11px]">
                        {new Date(item.timestamp).toLocaleString()}
                      </td>
                      <td className="p-4 font-bold text-charcoal">
                        <span className="px-2 py-0.5 rounded bg-gray-100 text-[10px]">
                          {item.user}
                        </span>
                      </td>
                      <td className="p-4 font-semibold text-primary">{item.action}</td>
                      <td className="p-4 text-gray-600">{item.details}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}

export default AdminDashboard
