import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, MessageCircle } from 'lucide-react'
import { getWhatsAppLink } from '../../lib/data'
import { haptics } from '../../lib/haptics'

export default function NewsletterSection() {
  return (
    <section className="bg-[#102522] py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-[1320px] px-5 sm:px-8 lg:px-12">
        <div className="relative overflow-hidden rounded-xl border border-white/15 bg-[#193431] p-6 sm:p-10 lg:p-14">
          <div className="absolute inset-0 -z-0 bg-[radial-gradient(ellipse_at_100%_0%,rgba(54,166,157,0.2),transparent_55%)]" />
          <div className="relative z-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl space-y-3">
              <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-secondary">Your next story starts here</span>
              <h2 className="font-display text-3xl font-black uppercase italic leading-[1.02] tracking-tight text-white sm:text-4xl lg:text-5xl">
                Tell us where <span className="text-primary-light">you want to go.</span>
              </h2>
              <p className="max-w-xl text-sm leading-relaxed text-white/60 sm:text-base">Our Ahmedabad-based trip planners will help you find the right route, dates, and people to go with.</p>
            </div>
            <div className="flex flex-col gap-2 sm:flex-row">
              <Link to="/customize" onClick={() => haptics.medium()} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-secondary px-5 text-xs font-bold uppercase tracking-wider text-white transition-colors hover:bg-secondary-light">
                Plan my trip <ArrowRight size={15} />
              </Link>
              <a href={getWhatsAppLink('Hi INFIYATRA, I would like help planning a trip.')} target="_blank" rel="noopener noreferrer" onClick={() => haptics.medium()} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg liquid-glass px-5 text-xs font-semibold text-white transition-colors hover:bg-white/20">
                <MessageCircle size={15} /> Talk to our team
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
