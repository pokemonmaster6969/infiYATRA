import React from 'react'
import { ShieldCheck, MessageCircle, Users } from 'lucide-react'

export default function WhyChooseUs() {
  const reasons = [
    { 
      title: "Verified Captains", 
      desc: "Every trip is led by an Ahmedabad-local expert who knows the terrain and culture like the back of their hand.", 
      icon: Users
    },
    { 
      title: "Direct Support", 
      desc: "Instant WhatsApp connectivity with our captains. No corporate bots, just real humans planning your dream escape.", 
      icon: MessageCircle
    },
    { 
      title: "Safety First", 
      desc: "24/7 emergency support and geo-locked SOS integration on every group adventure.", 
      icon: ShieldCheck
    }
  ];

  return (
    <section className="bg-charcoal py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-[1320px] px-5 sm:px-8 lg:px-12">
        <div className="mb-8 max-w-2xl space-y-3 sm:mb-10">
          <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-secondary-light">Good trips start with good people</p>
          <h2 className="font-display text-3xl font-black uppercase italic leading-none tracking-tight text-white sm:text-4xl">A little more <span className="text-primary-light">thoughtful</span></h2>
        </div>
        <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
          {reasons.map((reason) => (
            <div
              key={reason.title}
              className="group rounded-lg border border-white/10 bg-white/[0.025] p-6 transition-colors hover:border-white/20 sm:p-7"
            >
              <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-full liquid-glass text-[#9bd3c6] transition-colors group-hover:bg-white/20">
                <reason.icon size={21} />
              </div>
              <h3 className="mb-2 font-display text-xl font-bold uppercase tracking-tight text-white">{reason.title}</h3>
              <p className="text-sm leading-relaxed text-white/55">{reason.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
