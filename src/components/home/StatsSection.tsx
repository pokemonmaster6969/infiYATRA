import React from 'react'
import { Users, TrendingUp, Heart, MapPin } from 'lucide-react'

export default function StatsSection() {
  const stats = [
    { label: 'Travelers', value: '100+', icon: Users },
    { label: 'Tours', value: '40+', icon: TrendingUp },
    { label: 'Rating', value: '4.1★', icon: Heart },
    { label: 'Destinations', value: '15+', icon: MapPin },
  ];

  return (
    <section className="relative overflow-hidden border-y border-white/[0.08] bg-[#102522] py-12 sm:py-16">
      <div className="relative z-10 mx-auto max-w-[1320px] px-5 sm:px-8 lg:px-12">
        <div className="grid grid-cols-2 gap-y-8 sm:grid-cols-4 sm:gap-6">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="group flex min-w-0 flex-col items-center text-center"
            >
              <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-full liquid-glass text-[#9bd3c6] transition-colors group-hover:bg-white/20 sm:mb-4">
                <stat.icon size={19} />
              </div>
              <div className="text-center">
                <p className="mb-1 font-display text-2xl font-bold leading-none text-white sm:text-3xl">{stat.value}</p>
                <p className="text-[9px] font-semibold uppercase tracking-[0.16em] text-white/75">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
