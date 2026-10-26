import React, { useCallback, useDeferredValue, useEffect, useMemo, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import {
  Anchor,
  ArrowRight,
  ArrowUpRight,
  Building2,
  Check,
  ChevronDown,
  Clock3,
  Compass,
  Heart,
  MapPin,
  MessageCircle,
  Search,
  SlidersHorizontal,
  Sparkles,
  Star,
  X,
} from 'lucide-react'
import { CATEGORIES, getTripWhatsAppLink, Trip } from '../lib/trips'
import { getTrips } from '../lib/dataService'
import { haptics } from '../lib/haptics'
import ResponsiveImage from '../components/ResponsiveImage'

const EXPLORE_TABS = [
  { label: 'All', icon: null },
  { label: 'Domestic', icon: null },
  { label: 'International', icon: null },
  { label: 'Honeymoon', icon: Heart },
  { label: 'Family', icon: Sparkles },
  { label: 'Adventure', icon: Compass },
  { label: 'Cruise', icon: Anchor },
  { label: 'Corporate', icon: Building2 },
] as const

const SORT_OPTIONS = [
  { label: 'Popular', value: 'popular' },
  { label: 'Price: Low to high', value: 'price-asc' },
  { label: 'Price: High to low', value: 'price-desc' },
  { label: 'Top rated', value: 'rating' },
  { label: 'Shortest first', value: 'duration' },
] as const

const BUDGET_OPTIONS = [
  { label: 'All budgets', value: 'all' },
  { label: 'Under ₹25,000', value: 'under-25k' },
  { label: '₹25,000 – ₹50,000', value: '25k-50k' },
  { label: '₹50,000 – ₹1,00,000', value: '50k-100k' },
  { label: 'Above ₹1,00,000', value: 'above-100k' },
] as const

const DURATION_OPTIONS = [
  { label: 'All durations', value: 'all' },
  { label: 'Weekend / Short (1-4 Days)', value: 'short' },
  { label: 'Standard (5-7 Days)', value: 'medium' },
  { label: 'Extended (8+ Days)', value: 'long' },
] as const

const parsePrice = (price: string) => parseInt(price.replace(/,/g, ''), 10) || 0

const parseDuration = (duration: string) => {
  const match = duration.match(/(\d+)/)
  return match ? parseInt(match[1], 10) : 0
}

const Discover = () => {
  const [trips, setTrips] = useState<Trip[]>([])
  const [searchParams, setSearchParams] = useSearchParams()

  const [searchTerm, setSearchTerm] = useState(searchParams.get('q') || '')
  const deferredSearchTerm = useDeferredValue(searchTerm)
  const [activeTab, setActiveTab] = useState<string>(searchParams.get('tab') || 'All')
  const [activeCategories, setActiveCategories] = useState<string[]>(
    searchParams.get('category') ? [searchParams.get('category')!] : []
  )
  const [budgetFilter, setBudgetFilter] = useState(searchParams.get('budget') || 'all')
  const [durationFilter, setDurationFilter] = useState(searchParams.get('duration') || 'all')
  const [sortBy, setSortBy] = useState(searchParams.get('sort') || 'popular')
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    let isActive = true

    const loadTrips = async () => {
      try {
        const data = await getTrips()
        if (isActive) {
          // Show only published or active packages
          const publicTrips = data.filter(t => t.status !== 'Draft' && t.status !== 'Archived')
          setTrips(publicTrips.length > 0 ? publicTrips : data)
        }
      } catch (error) {
        console.error('Unable to load travel packages.', error)
      } finally {
        if (isActive) setIsLoaded(true)
      }
    }

    void loadTrips()
    return () => {
      isActive = false
    }
  }, [])

  // Sync state to URL search parameters for shareability
  useEffect(() => {
    const params = new URLSearchParams()
    if (activeTab && activeTab !== 'All') params.set('tab', activeTab)
    if (searchTerm.trim()) params.set('q', searchTerm.trim())
    if (activeCategories.length > 0) params.set('category', activeCategories[0])
    if (budgetFilter !== 'all') params.set('budget', budgetFilter)
    if (durationFilter !== 'all') params.set('duration', durationFilter)
    if (sortBy !== 'popular') params.set('sort', sortBy)
    setSearchParams(params, { replace: true })
  }, [activeTab, searchTerm, activeCategories, budgetFilter, durationFilter, sortBy, setSearchParams])

  const toggleCategory = useCallback((category: string) => {
    haptics.light()
    setActiveCategories(current =>
      current.includes(category)
        ? current.filter(item => item !== category)
        : [...current, category]
    )
  }, [])

  const clearAll = useCallback(() => {
    haptics.light()
    setActiveCategories([])
    setActiveTab('All')
    setSearchTerm('')
    setBudgetFilter('all')
    setDurationFilter('all')
    setSortBy('popular')
  }, [])

  const filteredTrips = useMemo(() => {
    const term = deferredSearchTerm.trim().toLowerCase()
    const results = trips.filter(trip => {
      const matchesSearch = !term || [trip.title, trip.location, trip.category, trip.description]
        .some(value => value && value.toLowerCase().includes(term))
      const matchesCategory = activeCategories.length === 0 || activeCategories.includes(trip.category)

      // Tab filtering
      let matchesTab = true
      if (activeTab === 'Domestic' || activeTab === 'International') {
        matchesTab = trip.type === activeTab
      } else if (activeTab !== 'All') {
        matchesTab = trip.category.toLowerCase() === activeTab.toLowerCase()
      }

      // Budget filtering
      const priceNum = parsePrice(trip.price)
      let matchesBudget = true
      if (budgetFilter === 'under-25k') matchesBudget = priceNum < 25000
      else if (budgetFilter === '25k-50k') matchesBudget = priceNum >= 25000 && priceNum <= 50000
      else if (budgetFilter === '50k-100k') matchesBudget = priceNum > 50000 && priceNum <= 100000
      else if (budgetFilter === 'above-100k') matchesBudget = priceNum > 100000

      // Duration filtering
      const days = parseDuration(trip.duration)
      let matchesDuration = true
      if (durationFilter === 'short') matchesDuration = days <= 4
      else if (durationFilter === 'medium') matchesDuration = days >= 5 && days <= 7
      else if (durationFilter === 'long') matchesDuration = days >= 8

      return matchesSearch && matchesCategory && matchesTab && matchesBudget && matchesDuration
    })

    switch (sortBy) {
      case 'price-asc':
        results.sort((a, b) => parsePrice(a.price) - parsePrice(b.price))
        break
      case 'price-desc':
        results.sort((a, b) => parsePrice(b.price) - parsePrice(a.price))
        break
      case 'rating':
        results.sort((a, b) => b.rating - a.rating)
        break
      case 'duration':
        results.sort((a, b) => parseDuration(a.duration) - parseDuration(b.duration))
        break
      default:
        results.sort((a, b) => Number(Boolean(b.featured)) - Number(Boolean(a.featured)) || b.reviews - a.reviews)
    }

    return results
  }, [trips, deferredSearchTerm, activeTab, activeCategories, budgetFilter, durationFilter, sortBy])

  const spotlightTrip = filteredTrips[0]
  const visibleTrips = filteredTrips.slice(1)
  const activeFilterCount = activeCategories.length + (activeTab !== 'All' ? 1 : 0) + (searchTerm.trim() ? 1 : 0) + (budgetFilter !== 'all' ? 1 : 0) + (durationFilter !== 'all' ? 1 : 0)

  return (
    <div className="min-h-screen bg-charcoal pb-20 pt-24 text-white md:pt-28">
      <Helmet>
        <title>Explore All Travel Packages & Tours — INFIYATRA</title>
        <meta name="description" content="Browse curated domestic, international, cruise, and corporate travel packages with small groups and verified captains." />
      </Helmet>

      <div className="mx-auto max-w-[1600px] px-4 md:px-8 lg:px-12">
        <header className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="mb-2 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.24em] text-secondary">
              <Compass size={13} /> Thoughtfully planned, ready when you are
            </p>
            <h1 className="font-display text-4xl font-black uppercase italic leading-none tracking-tight sm:text-5xl">
              Find your <span className="text-primary-light">somewhere.</span>
            </h1>
          </div>
          <p className="max-w-xs text-sm leading-relaxed text-white/45 sm:text-right">
            Small groups, local captains, and the kind of stories you bring home forever.
          </p>
        </header>

        {spotlightTrip ? (
          <section className="group relative isolate mb-7 min-h-[340px] overflow-hidden rounded-lg border border-white/10 bg-[#243333] sm:min-h-[390px]" aria-label="Featured journey">
            <ResponsiveImage
              src={spotlightTrip.image}
              alt={spotlightTrip.location}
              sizes="100vw"
              fetchPriority="high"
              className="absolute inset-0 -z-20 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
              loading="eager"
            />
            <div className="absolute inset-0 -z-10 bg-gradient-to-r from-black/85 via-black/45 to-black/5" />
            <div className="flex min-h-[340px] max-w-2xl flex-col justify-end p-6 sm:min-h-[390px] sm:p-10 lg:p-12">
              <p className="mb-3 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.22em] text-[#ffc28b]">
                <span className="h-px w-7 bg-secondary" /> Your next great story
              </p>
              <p className="mb-2 flex items-center gap-1.5 text-xs font-medium text-white/75">
                <MapPin size={13} className="text-secondary" /> {spotlightTrip.location}
              </p>
              <h2 className="max-w-xl font-display text-3xl font-black uppercase italic leading-[1.02] sm:text-5xl">
                {spotlightTrip.title}
              </h2>
              <p className="mt-3 line-clamp-2 max-w-lg text-sm leading-relaxed text-white/70 sm:text-base">
                {spotlightTrip.description}
              </p>
              
              {/* Highlight chips */}
              {spotlightTrip.highlights && spotlightTrip.highlights.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-2">
                  {spotlightTrip.highlights.slice(0, 3).map((hl, hIdx) => (
                    <span key={hIdx} className="rounded-full bg-black/40 border border-white/20 px-3 py-1 text-[10px] font-bold text-white/85 backdrop-blur-sm">
                      ✓ {hl}
                    </span>
                  ))}
                </div>
              )}

              <div className="mt-6 flex flex-wrap items-center gap-3">
                <Link
                  to={`/trip/${spotlightTrip.id}`}
                  onClick={() => haptics.medium()}
                  className="inline-flex min-h-11 items-center gap-2 rounded-md bg-secondary px-5 text-xs font-bold uppercase tracking-wider text-white transition-colors hover:bg-secondary-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                >
                  Explore this trip <ArrowRight size={15} />
                </Link>
                <Link
                  to={`/customize?destination=${encodeURIComponent(spotlightTrip.location)}`}
                  onClick={() => haptics.light()}
                  className="inline-flex min-h-11 items-center gap-2 rounded-md border border-white/20 bg-white/10 px-4 text-xs font-bold uppercase tracking-wider text-white hover:bg-white/20"
                >
                  Customize
                </Link>
                <span className="flex items-center gap-1.5 text-xs font-semibold text-white/75">
                  <Clock3 size={13} /> {spotlightTrip.duration}
                </span>
                <span className="text-xs font-semibold text-white/75">
                  From <span className="text-base font-bold text-white">₹{spotlightTrip.price}</span>
                </span>
              </div>
            </div>
            <div className="absolute right-5 top-5 hidden items-center gap-1.5 rounded-md border border-white/20 bg-black/30 px-3 py-2 text-[10px] font-bold uppercase tracking-wider text-white backdrop-blur-sm sm:flex">
              <Star size={12} className="fill-secondary text-secondary" /> {spotlightTrip.rating} · {spotlightTrip.reviews} reviews
            </div>
          </section>
        ) : !isLoaded ? (
          <div className="mb-7 min-h-[340px] animate-pulse rounded-lg bg-white/[0.06] sm:min-h-[390px]" aria-label="Loading featured trip" />
        ) : null}

        {/* Filter & Tabs Control Bar */}
        <section className="mb-8 border-y border-white/10 py-4" aria-label="Search and filter trips">
          {/* Top Tabs (All, Domestic, International, Honeymoon, Family, Adventure, Cruise, Corporate) */}
          <div className="mb-4 flex min-w-0 items-center gap-2 overflow-x-auto pb-2 scrollbar-none" role="group" aria-label="Explore categories">
            {EXPLORE_TABS.map(item => (
              <button
                key={item.label}
                type="button"
                aria-pressed={activeTab === item.label}
                onClick={() => {
                  haptics.light()
                  setActiveTab(item.label)
                }}
                className={`inline-flex min-h-10 shrink-0 items-center gap-2 rounded-md px-4 text-[11px] font-bold uppercase tracking-wider transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary ${activeTab === item.label ? 'bg-primary text-white shadow-lg shadow-primary/20 scale-[1.02]' : 'bg-white/[0.06] text-white/60 hover:bg-white/10 hover:text-white'}`}
              >
                {item.icon && <item.icon size={13} />}
                {item.label}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {/* Search Input */}
            <label className="relative">
              <span className="sr-only">Search destinations and trips</span>
              <Search size={16} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-white/40" />
              <input
                type="search"
                placeholder="Where to? (e.g. Spiti, Cruise, Bali)"
                className="h-11 w-full rounded-md border border-white/10 bg-white/[0.06] pl-10 pr-10 text-xs font-semibold text-white placeholder:text-white/35 focus:border-primary-light focus:outline-none"
                value={searchTerm}
                onChange={event => setSearchTerm(event.target.value)}
              />
              {searchTerm && (
                <button
                  type="button"
                  aria-label="Clear search"
                  onClick={() => setSearchTerm('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/45 hover:text-white"
                >
                  <X size={15} />
                </button>
              )}
            </label>

            {/* Budget Range Filter */}
            <label className="relative">
              <span className="sr-only">Budget Range</span>
              <select
                value={budgetFilter}
                onChange={e => {
                  setBudgetFilter(e.target.value)
                  haptics.light()
                }}
                className="h-11 w-full appearance-none rounded-md border border-white/10 bg-[#292929] pl-3.5 pr-9 text-xs font-semibold text-white/80 focus:border-primary-light focus:outline-none"
              >
                {BUDGET_OPTIONS.map(opt => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
              <ChevronDown size={14} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-white/45" />
            </label>

            {/* Duration Filter */}
            <label className="relative">
              <span className="sr-only">Trip Duration</span>
              <select
                value={durationFilter}
                onChange={e => {
                  setDurationFilter(e.target.value)
                  haptics.light()
                }}
                className="h-11 w-full appearance-none rounded-md border border-white/10 bg-[#292929] pl-3.5 pr-9 text-xs font-semibold text-white/80 focus:border-primary-light focus:outline-none"
              >
                {DURATION_OPTIONS.map(opt => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
              <ChevronDown size={14} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-white/45" />
            </label>

            {/* Sort Dropdown */}
            <label className="relative">
              <span className="sr-only">Sort travel packages</span>
              <select
                value={sortBy}
                onChange={event => {
                  setSortBy(event.target.value)
                  haptics.light()
                }}
                className="h-11 w-full appearance-none rounded-md border border-white/10 bg-[#292929] pl-3.5 pr-9 text-xs font-semibold text-white/80 focus:border-primary-light focus:outline-none"
              >
                {SORT_OPTIONS.map(option => <option key={option.value} value={option.value}>{option.label}</option>)}
              </select>
              <ChevronDown size={14} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-white/45" />
            </label>
          </div>

          {/* Sub-categories Chips */}
          <div className="mt-3 flex items-center gap-2 overflow-x-auto pb-1" role="group" aria-label="Filter by style">
            <span className="shrink-0 pr-1 text-[10px] font-bold uppercase tracking-wider text-white/35">Style</span>
            {CATEGORIES.map(category => {
              const selected = activeCategories.includes(category)
              return (
                <button
                  key={category}
                  type="button"
                  aria-pressed={selected}
                  onClick={() => toggleCategory(category)}
                  className={`inline-flex min-h-8 shrink-0 items-center gap-1.5 rounded-md border px-3 text-[10px] font-semibold transition-colors ${selected ? 'border-secondary/60 bg-secondary/15 text-[#ffad8d]' : 'border-white/10 text-white/45 hover:border-white/25 hover:text-white/80'}`}
                >
                  {selected && <Check size={11} />}{category}
                </button>
              )
            })}
            {activeFilterCount > 0 && (
              <button type="button" onClick={clearAll} className="ml-auto inline-flex min-h-8 shrink-0 items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-secondary hover:text-white">
                <X size={12} /> Clear all filters
              </button>
            )}
          </div>
        </section>

        {/* Results Counter */}
        <div className="mb-4 flex items-end justify-between gap-3">
          <div>
            <h2 className="font-display text-xl font-bold uppercase tracking-tight text-white">The collection</h2>
            <p className="mt-1 text-xs text-white/40">
              {isLoaded ? `${filteredTrips.length} ${filteredTrips.length === 1 ? 'journey' : 'journeys'} to explore` : 'Finding your next journey...'}
            </p>
          </div>
          {deferredSearchTerm !== searchTerm && <span className="text-xs text-white/40" role="status">Updating results…</span>}
        </div>

        {/* Card Grid with Compact, Simple Cards & 2 Highlight Tags */}
        {!isLoaded ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }, (_, index) => (
              <div key={index} className="overflow-hidden rounded-lg border border-white/[0.06]" aria-hidden="true">
                <div className="aspect-[4/3] animate-pulse bg-white/[0.06]" />
                <div className="space-y-3 p-4">
                  <div className="h-4 w-2/3 animate-pulse rounded bg-white/[0.08]" />
                  <div className="h-3 w-1/2 animate-pulse rounded bg-white/[0.06]" />
                  <div className="h-8 w-full animate-pulse rounded bg-white/[0.06]" />
                </div>
              </div>
            ))}
          </div>
        ) : visibleTrips.length > 0 ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {visibleTrips.map((trip) => (
              <article key={trip.id} className="group flex flex-col overflow-hidden rounded-lg border border-white/[0.08] bg-white/[0.025] transition-colors hover:border-white/20">
                <Link to={`/trip/${trip.id}`} className="relative block aspect-[4/3] overflow-hidden bg-white/5">
                  <ResponsiveImage
                    src={trip.image}
                    alt={trip.title}
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-black/10" />
                  
                  <span className="absolute left-3 top-3 rounded-sm border border-white/15 bg-black/35 px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider text-white backdrop-blur-sm">
                    {trip.category}
                  </span>

                  {trip.featured && (
                    <span className="absolute right-3 top-3 rounded-sm bg-secondary px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider text-white">
                      Featured
                    </span>
                  )}

                  <span className="absolute bottom-3 right-3 flex items-center gap-1.5 text-xs font-semibold text-white">
                    <Clock3 size={13} /> {trip.duration}
                  </span>
                  <div className="absolute bottom-3 left-3 right-24 flex items-center gap-1.5 text-xs text-white/80">
                    <MapPin size={13} className="shrink-0 text-[#ffad8d]" />
                    <span className="truncate">{trip.location}</span>
                  </div>
                </Link>

                <div className="p-4 flex flex-col flex-grow">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <h3 className="truncate font-display text-lg font-bold uppercase leading-tight text-white transition-colors group-hover:text-[#ffad8d]">{trip.title}</h3>
                      <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-white/45">{trip.description}</p>
                    </div>
                    <span className="flex shrink-0 items-center gap-1 rounded-sm bg-secondary/10 px-2 py-1 text-xs font-bold text-[#ffad8d]">
                      <Star size={12} className="fill-current" /> {trip.rating}
                    </span>
                  </div>

                  {/* 2 Highlight Tags per acceptance criteria */}
                  {trip.highlights && trip.highlights.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {trip.highlights.slice(0, 2).map((tag, tIdx) => (
                        <span key={tIdx} className="rounded border border-white/10 bg-white/[0.04] px-2 py-0.5 text-[9px] font-medium text-white/65">
                          ✓ {tag}
                        </span>
                      ))}
                    </div>
                  )}

                  <div className="mt-auto pt-4 flex items-end justify-between gap-3 border-t border-white/[0.08]">
                    <p className="text-[10px] text-white/40">
                      From <span className="ml-1 text-lg font-bold text-white">₹{trip.price}</span>
                      <span className="ml-1">/ person</span>
                    </p>
                    <div className="flex items-center gap-2">
                      <a
                        href={getTripWhatsAppLink(trip.title)}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Ask about ${trip.title} on WhatsApp`}
                        onClick={() => haptics.medium()}
                        className="flex h-9 w-9 items-center justify-center rounded-md border border-white/10 text-white/60 transition-colors hover:border-green-400/40 hover:bg-green-500/10 hover:text-green-300"
                      >
                        <MessageCircle size={15} />
                      </a>
                      <Link
                        to={`/trip/${trip.id}`}
                        onClick={() => haptics.medium()}
                        className="inline-flex h-9 items-center gap-1.5 rounded-md bg-white px-3.5 text-[10px] font-bold uppercase tracking-wider text-charcoal transition-colors hover:bg-secondary hover:text-white"
                      >
                        Details <ArrowUpRight size={13} />
                      </Link>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : filteredTrips.length === 1 && spotlightTrip ? (
          <div className="rounded-lg border border-white/10 px-5 py-8 text-center text-sm text-white/50">
            That is the only journey matching your filters. Try another category or search.
          </div>
        ) : (
          <div className="flex flex-col items-center border-y border-white/10 py-16 text-center">
            <Search size={28} className="mb-4 text-white/30" />
            <h3 className="font-display text-xl font-bold uppercase text-white">No journeys found</h3>
            <p className="mt-2 max-w-sm text-sm text-white/45">Try a different destination or clear a filter to see more trips.</p>
            <button type="button" onClick={clearAll} className="mt-5 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-secondary hover:text-white">
              <X size={14} /> Reset filters
            </button>
          </div>
        )}

        <section className="mt-16 flex flex-col items-start justify-between gap-5 border-t border-white/10 pt-8 sm:flex-row sm:items-center">
          <div>
            <p className="font-display text-xl font-bold uppercase text-white">Have somewhere else in mind?</p>
            <p className="mt-1 text-sm text-white/45">We can customize any itinerary around your schedule and dates.</p>
          </div>
          <Link
            to="/customize"
            onClick={() => haptics.medium()}
            className="inline-flex min-h-11 items-center gap-2 rounded-md bg-primary px-5 text-xs font-bold uppercase tracking-wider text-white transition-colors hover:bg-primary-light"
          >
            <SlidersHorizontal size={14} /> Plan a custom trip <ArrowRight size={14} />
          </Link>
        </section>
      </div>
    </div>
  )
}

export default Discover