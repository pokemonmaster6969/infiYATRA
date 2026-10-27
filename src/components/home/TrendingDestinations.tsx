import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import ResponsiveImage from '../ResponsiveImage'

export default function TrendingDestinations() {
  const destinations = [
    { title: 'Iceland', link: '/discover?search=Iceland', img: 'https://images.unsplash.com/photo-1504109586057-7a2ae83d1338?auto=format&fit=crop&q=80&w=800', badge: 'Wild landscapes' },
    { title: 'Switzerland', link: '/discover?search=Switzerland', img: 'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&q=80&w=800', badge: 'Alpine escapes' },
    { title: 'Japan', link: '/discover?search=Japan', img: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&q=80&w=800', badge: 'Culture & craft' }
  ];

  return (
    <section className="bg-[#070B14] py-16 sm:py-20 lg:py-24 border-t border-white/5">
      <div className="mx-auto max-w-[1320px] px-5 sm:px-8 lg:px-12">
        <div className="mb-8 flex flex-col gap-4 sm:mb-10 sm:flex-row sm:items-end sm:justify-between">
          <div className="space-y-3">
            <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-secondary">The world, a little closer</span>
            <h2 className="font-display text-3xl font-black uppercase italic leading-none tracking-tight text-white sm:text-4xl lg:text-5xl">
              Places that <span className="text-secondary">stay with you</span>
            </h2>
          </div>
          <Link to="/discover" className="inline-flex min-h-11 items-center gap-2 self-start rounded-lg liquid-glass px-4 text-xs font-semibold text-white transition-colors hover:bg-white/20 sm:self-auto">Browse all destinations <ArrowUpRight size={15} /></Link>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-12 md:grid-rows-2">
          {destinations.map((dest, i) => (
            <div
              key={i}
              className={`${i === 0 ? 'md:col-span-7 md:row-span-2' : 'md:col-span-5'} group relative h-[300px] overflow-hidden rounded-2xl border border-white/10 bg-[#0F172A] sm:h-[360px] ${i === 0 ? 'md:h-full md:min-h-[520px]' : 'md:h-[258px]'}`}
            >
              <Link to={dest.link} className="absolute inset-0">
                <ResponsiveImage src={dest.img} alt={dest.title} sizes="(max-width: 768px) 100vw, 58vw" loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.035]" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#070B14]/90 via-[#070B14]/25 to-transparent" />
                <span className="absolute left-4 top-4 rounded-md liquid-glass px-3 py-1.5 text-[9px] font-semibold uppercase tracking-wider text-white sm:left-5 sm:top-5">{dest.badge}</span>
                <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between sm:bottom-6 sm:left-6 sm:right-6">
                  <div>
                    <h3 className="font-display text-3xl font-bold uppercase italic leading-none tracking-tight text-white sm:text-4xl">{dest.title}</h3>
                    <p className="mt-2 text-[10px] font-medium uppercase tracking-[0.16em] text-white/65">Discover the unexplored</p>
                  </div>
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full liquid-glass text-white transition-transform group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:bg-secondary"><ArrowUpRight size={17} /></span>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
