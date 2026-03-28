import React from 'react'

const Footer = () => {
  return (
    <footer className="bg-charcoal text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="space-y-4">
          <h3 className="text-2xl font-display font-bold text-primary-light">INFIYATRA Travels</h3>
          <p className="text-gray-400 leading-relaxed text-sm">
            Ahmedabad's premier community travel platform. Connecting curious travelers with authentic local and international experiences since 2024.
          </p>
        </div>
        <div>
          <h4 className="text-lg font-bold mb-6">Quick Links</h4>
          <ul className="space-y-3 text-gray-400 text-sm">
            <li><a href="#" className="hover:text-primary-light transition-colors">Domestic Tours</a></li>
            <li><a href="#" className="hover:text-primary-light transition-colors">International Escapes</a></li>
            <li><a href="#" className="hover:text-primary-light transition-colors">Group Adventures</a></li>
            <li><a href="#" className="hover:text-primary-light transition-colors">Custom Planning</a></li>
          </ul>
        </div>
        <div>
          <h4 className="text-lg font-bold mb-6">Support & Safety</h4>
          <ul className="space-y-3 text-gray-400 text-sm">
            <li><a href="#" className="hover:text-primary-light transition-colors">24/7 Helpline</a></li>
            <li><a href="#" className="hover:text-primary-light transition-colors">Safety Protocols</a></li>
            <li><a href="#" className="hover:text-primary-light transition-colors">Refund Policy</a></li>
            <li><a href="#" className="hover:text-primary-light transition-colors">FAQs</a></li>
          </ul>
        </div>
        <div>
          <h4 className="text-lg font-bold mb-6">Join the Community</h4>
          <p className="text-gray-400 text-sm mb-4">Subscribe to get secret deals and trip updates.</p>
          <div className="flex bg-white/10 rounded-lg p-1">
            <input type="email" placeholder="Email address" className="bg-transparent border-none focus:ring-0 text-sm px-3 flex-grow" />
            <button className="bg-secondary px-4 py-2 rounded-md text-sm font-bold hover:bg-secondary-dark transition-colors">Join</button>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 pt-8 border-t border-white/10 text-center text-gray-500 text-xs">
        <p>© 2026 INFIYATRA Travels. All rights reserved. Designed for Ahmedabad, Built for the World.</p>
      </div>
    </footer>
  )
}

export default Footer
