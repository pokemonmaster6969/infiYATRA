import React, { useState, useEffect } from 'react'
import { MapPin, MessageCircle } from 'lucide-react'
import { getTripWhatsAppLink } from '../../lib/trips'
import { getTrips } from '../../lib/dataService'
import { Link } from 'react-router-dom'
import { haptics } from '../../lib/haptics'
import ResponsiveImage from '../ResponsiveImage'

export default function FeaturedPackages() {
  const [category, setCategory] = useState<'Domestic' | 'International'>('Domestic')
  const [trips, setTrips] = useState<any[]>([])
  const visibleTrips = trips
    .filter(trip => trip.type === category && trip.status !== 'Draft' && trip.status !== 'Archived')
    .sort((a, b) => Number(Boolean(b.featured)) - Number(Boolean(a.featured)))
    .slice(0, 3)

  useEffect(() => {
    getTrips().then(setTrips);
  }, []);

  return (
    <section className="bg-charcoal py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-[1320px] px-5 sm:px-8 lg:px-12">
        <div className="mb-8 flex flex-col gap-4 sm:mb-10 sm:flex-row sm:items-end sm:justify-between">
          <div className="space-y-3">
            <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-secondary-light">Curated by people who go</p>
            <h2 className="font-display text-3xl font-black uppercase italic leading-none tracking-tight text-white sm:text-4xl lg:text-5xl">
              Journeys with <span className="text-primary-light">meaning</span>
            </h2>
            <p className="max-w-xl text-sm leading-relaxed text-white/55 sm:text-base">Small-group escapes and faraway places, thoughtfully planned from Ahmedabad.</p>
          </div>
          <Link to="/discover" onClick={() => haptics.light()} className="hidden min-h-11 items-center gap-2 rounded-lg liquid-glass px-4 text-xs font-semibold text-white transition-colors hover:bg-white/20 sm:inline-flex">All journeys <span aria-hidden="true">→</span></Link>
        </div>

        <div className="mb-6 flex justify-start sm:mb-8">
          <div className="inline-flex rounded-lg liquid-glass-dark p-1">
            {['Domestic', 'International'].map((tab) => (
              <button
                key={tab}
                onClick={() => {
                  haptics.light();
                  setCategory(tab as 'Domestic' | 'International');
                }}
                className={`min-h-10 rounded-md px-4 text-[11px] font-semibold transition-colors sm:px-5 ${category === tab
                  ? 'bg-primary text-white'
                  : 'text-white/55 hover:bg-white/10 hover:text-white'
                  }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {visibleTrips.length === 0 ? (
            Array.from({ length: 3 }, (_, index) => (
              <div key={`package-skeleton-${index}`} className="h-[390px] animate-pulse rounded-lg border border-white/10 bg-white/[0.04] sm:h-[420px]" aria-hidden="true" />
            ))
          ) : (
            visibleTrips.map((trip) => (
              <div
                key={trip.id}
                className="group relative h-[390px] overflow-hidden rounded-lg border border-white/10 bg-[#193431] shadow-xl transition-colors hover:border-white/25 sm:h-[420px]"
              >
                <div className="relative h-full w-full overflow-hidden">
                  <ResponsiveImage
                    src={trip.image}
                    alt={trip.title}
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#081411]/95 via-[#081411]/20 to-transparent"></div>

                  <div className="absolute left-4 top-4">
                    <span className="rounded-md liquid-glass px-3 py-1.5 text-[10px] font-semibold text-white">{trip.duration}</span>
                  </div>

                  <div className="absolute bottom-5 left-5 right-5 space-y-3 sm:bottom-6 sm:left-6 sm:right-6">
                    <div className="flex items-center gap-2 text-[#f2b898]">
                      <MapPin size={14} className="fill-secondary/20" />
                      <span className="truncate text-[10px] font-semibold uppercase tracking-[0.12em] drop-shadow-md">{trip.location}</span>
                    </div>
                    <h3 className="line-clamp-2 font-display text-2xl font-bold uppercase italic leading-[1.02] tracking-tight text-white transition-colors group-hover:text-[#f2b898]">{trip.title}</h3>

                    <div className="flex items-end justify-between gap-2 border-t border-white/15 pt-3">
                      <div className="flex flex-col">
                        <span className="mb-1 text-[9px] font-semibold uppercase tracking-wider text-white/55">From / person</span>
                        <span className="font-display text-2xl font-bold tracking-tight text-white">₹{trip.price}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <a
                          href={getTripWhatsAppLink(trip.title)}
                          target="_blank" rel="noopener noreferrer"
                          onClick={() => haptics.medium()}
                          aria-label={`Ask about ${trip.title} on WhatsApp`}
                          className="flex h-10 w-10 items-center justify-center rounded-md liquid-glass text-white transition-colors hover:bg-green-600"
                        >
                          <MessageCircle size={18} />
                        </a>
                        <Link
                          to={`/trip/${trip.id}`}
                          onClick={() => haptics.medium()}
                          className="inline-flex min-h-10 items-center rounded-md bg-white px-4 text-[10px] font-bold uppercase tracking-wider text-charcoal transition-colors hover:bg-secondary hover:text-white"
                        >
                          Details
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="mt-7 text-center sm:hidden">
          <Link
            to="/discover"
            onClick={() => haptics.light()}
            className="inline-flex min-h-11 items-center gap-2 text-xs font-semibold text-secondary-light"
          >
            View All Adventures Hub
          </Link>
        </div>
      </div>
    </section>
  )
}
