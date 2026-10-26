import React from 'react'
import { Heart } from 'lucide-react'

export default function TestimonialsSection() {
  const testimonials = [
    { name: 'Karan Shah', text: "Infi Yatra transformed my solo trip to Spiti into a lifetime memory. Their local captains are true gems, ensuring every detail is perfect.", role: 'Photographer' },
    { name: 'Aditi Patel', text: "The WhatsApp integration is a game-changer. I could chat directly with the person who was going to lead the trek before even booking.", role: 'Trekker' },
    { name: 'Rajiv Mehta', text: "Best travel community in Ahmedabad. No corporate vibes, just pure passion for exploration and storytelling.", role: 'Expeditionist' }
  ];

  return (
    <section className="relative overflow-hidden bg-charcoal py-16 sm:py-20 lg:py-24">
      <div className="relative z-10 mx-auto max-w-[1320px] px-5 sm:px-8 lg:px-12">
        <div className="mb-8 flex items-end justify-between gap-4 sm:mb-10">
          <div className="space-y-3">
          <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-secondary-light">Notes from the road</p>
          <h2 className="font-display text-3xl font-black uppercase italic leading-none tracking-tight text-white sm:text-4xl">
            Stories that <span className="text-secondary-light">travel</span>
          </h2>
          </div>
          <Heart className="hidden text-secondary sm:block" size={25} />
        </div>

        <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
          {testimonials.map((test) => (
            <div
              key={test.name}
              className="rounded-lg border border-white/10 bg-white/[0.025] p-6 transition-colors hover:border-white/20 sm:p-7"
            >
              <p className="mb-6 text-base font-medium leading-relaxed text-white/80">“{test.text}”</p>
              <div className="flex items-center gap-4 border-t border-white/10 pt-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/30 text-sm font-bold text-[#b6e2d1]">
                  <span>{test.name[0]}</span>
                </div>
                <div>
                  <h3 className="font-display text-sm font-bold uppercase tracking-tight text-white">{test.name}</h3>
                  <p className="mt-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-white/75">{test.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
