import React from 'react'
import { motion } from 'framer-motion'
import { ShieldCheck, MessageCircle, MapPin, Search, Users, TrendingUp } from 'lucide-react'

export default function WhyChooseUs() {
  const reasons = [
    { 
      title: "Verified Captains", 
      desc: "Every trip is led by an Ahmedabad-local expert who knows the terrain and culture like the back of their hand.", 
      icon: Users,
      color: "bg-teal-50"
    },
    { 
      title: "Direct Support", 
      desc: "Instant WhatsApp connectivity with our captains. No corporate bots, just real humans planning your dream escape.", 
      icon: MessageCircle,
      color: "bg-orange-50"
    },
    { 
      title: "Safety First", 
      desc: "24/7 emergency support and geo-locked SOS integration on every group adventure.", 
      icon: ShieldCheck,
      color: "bg-blue-50"
    }
  ];

  return (
    <section className="py-24 bg-[#F9FAFB]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {reasons.map((reason, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className={`${reason.color} p-12 rounded-[3.5rem] border border-black/5 hover:shadow-2xl hover:shadow-black/5 transition-all duration-700 group`}
            >
              <div className="bg-white p-6 rounded-[2rem] w-fit mb-8 shadow-xl group-hover:scale-110 transition-transform duration-500">
                <reason.icon className="text-charcoal group-hover:text-primary transition-colors" size={32} />
              </div>
              <h3 className="text-3xl font-display font-black text-charcoal uppercase tracking-tighter mb-4 italic">{reason.title}</h3>
              <p className="text-gray-500 font-medium leading-relaxed">{reason.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
