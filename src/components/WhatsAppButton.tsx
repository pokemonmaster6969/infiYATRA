import React from 'react'
import { MessageCircle } from 'lucide-react'
import { useLocation } from 'react-router-dom'
import { getWhatsAppLink } from '../lib/data'
import { haptics } from '../lib/haptics'

const WhatsAppButton = () => {
  const location = useLocation()
  if (location.pathname.startsWith('/admin') || location.pathname.startsWith('/trip/')) return null

  const message = "Hi Infi Yatra! I'm interested in booking a trip. Could you please help me with the details?"
  const whatsappUrl = getWhatsAppLink(message)

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => haptics.medium()}
      aria-label="Chat with INFIYATRA on WhatsApp"
      className="group fixed right-4 z-[40] transition-transform hover:scale-105 active:scale-95 sm:right-6"
      style={{ bottom: 'calc(env(safe-area-inset-bottom, 0px) + 1rem)' }}
    >
      {/* Pulse Effect */}
      <div className="absolute inset-0 rounded-full bg-green-500 opacity-20 transition-opacity group-hover:opacity-35 motion-safe:animate-ping"></div>

      {/* Button Body */}
      <div className="relative flex h-12 w-12 items-center justify-center rounded-full liquid-glass border border-white/25 text-green-300 shadow-xl transition-colors group-hover:bg-green-600 sm:h-14 sm:w-14">
        <MessageCircle size={22} className="transition-colors group-hover:text-white sm:h-6 sm:w-6" />
      </div>

      {/* Label Tooltip */}
      <div className="absolute right-full top-1/2 mr-3 -translate-y-1/2 whitespace-nowrap rounded-lg bg-charcoal px-3 py-2 text-[10px] font-bold uppercase tracking-widest text-white opacity-0 transition-opacity group-hover:opacity-100 hidden md:block">
        Chat with us
      </div>
    </a>
  )
}

export default WhatsAppButton
