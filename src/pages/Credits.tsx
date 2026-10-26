import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, Camera, ExternalLink, Heart } from 'lucide-react'
import { Helmet } from 'react-helmet-async'
import { haptics } from '../lib/haptics'

interface MediaAsset {
  id: string
  packageSlug: string
  packageTitle: string
  title: string
  caption: string
  credit: string
  creditUrl: string
  source: string
  url: string
}

const Credits: React.FC = () => {
  const [assets, setAssets] = useState<MediaAsset[]>([])

  useEffect(() => {
    fetch('/images.manifest.json')
      .then(res => res.json())
      .then(data => setAssets(data))
      .catch(() => {
        // Fallback default credits
        setAssets([
          {
            id: '1',
            packageSlug: 'kashmir-paradise-on-earth',
            packageTitle: 'Enchanting Kashmir',
            title: 'Dal Lake Shikara',
            caption: 'Tranquil sunset Shikara voyage on mirror-calm Dal Lake',
            credit: 'Aaqib Bhat',
            creditUrl: 'https://unsplash.com/@aaqibbhat',
            source: 'Unsplash',
            url: 'https://images.unsplash.com/photo-1595815771614-ade9d652a65d?auto=format&fit=crop&q=80&w=600'
          },
          {
            id: '2',
            packageSlug: 'goa-sun-sand-heritage',
            packageTitle: 'Vibrant Goa',
            title: 'Candolim Beach',
            caption: 'Golden dusk unfolding over palm-lined beaches',
            credit: 'Ashwin Kumar',
            creditUrl: 'https://unsplash.com/@ashwin_kumar',
            source: 'Unsplash',
            url: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&q=80&w=600'
          },
          {
            id: '3',
            packageSlug: 'kerala-backwaters-and-misty-hills',
            packageTitle: "God's Own Country Kerala",
            title: 'Alleppey Houseboat',
            caption: 'Traditional thatch-roofed houseboat gliding along backwaters',
            credit: 'Naveen Annam',
            creditUrl: 'https://unsplash.com/@naveenannam',
            source: 'Unsplash',
            url: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&q=80&w=600'
          },
          {
            id: '4',
            packageSlug: 'dubai-glamour-and-desert-safari',
            packageTitle: 'Dazzling Dubai',
            title: 'Burj Khalifa Skyline',
            caption: 'Burj Khalifa presiding over Downtown Dubai at twilight',
            credit: 'ZQ Lee',
            creditUrl: 'https://unsplash.com/@zqlee',
            source: 'Unsplash',
            url: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&q=80&w=600'
          },
          {
            id: '5',
            packageSlug: 'thailand-islands-and-city-lights',
            packageTitle: 'Exotic Thailand',
            title: 'Wat Arun Bangkok',
            caption: 'Porcelain spires of Wat Arun illuminated at dusk',
            credit: 'Mathew Schwartz',
            creditUrl: 'https://unsplash.com/@cadop',
            source: 'Unsplash',
            url: 'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?auto=format&fit=crop&q=80&w=600'
          }
        ])
      })
  }, [])

  return (
    <div className="min-h-screen bg-charcoal text-white pt-24 pb-24 sm:pt-28 px-4 sm:px-8">
      <Helmet>
        <title>Photographer Credits & Attributions | INFIYATRA</title>
        <meta name="description" content="Attribution and licensing credits for brilliant landscape and travel photographers on Unsplash and Pexels featured on INFIYATRA." />
      </Helmet>

      <div className="max-w-5xl mx-auto space-y-8">
        <div>
          <Link
            to="/"
            onClick={() => haptics.light()}
            className="inline-flex items-center gap-2 text-xs font-semibold text-white/70 hover:text-white mb-6 liquid-glass px-3 py-2 rounded-lg"
          >
            <ArrowLeft size={16} /> Back to Home
          </Link>
          <div className="flex items-center gap-2 text-secondary text-xs font-bold uppercase tracking-widest mb-2">
            <Camera size={16} /> Visual Credits & Licensing
          </div>
          <h1 className="text-3xl sm:text-5xl font-display font-black tracking-tight text-white uppercase italic">
            Photographer <span className="text-primary-light">Attributions</span>
          </h1>
          <p className="mt-2 text-sm text-white/60 max-w-2xl leading-relaxed">
            INFIYATRA is profoundly grateful to the extraordinary global community of photographers on Unsplash and Pexels. All imagery is used under free commercial creative licenses with full attribution.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-4">
          {assets.map(asset => (
            <div
              key={asset.id}
              className="group rounded-2xl liquid-glass overflow-hidden border border-white/10 flex flex-col justify-between"
            >
              <div className="aspect-[16/10] overflow-hidden bg-white/5 relative">
                <img
                  src={asset.url}
                  alt={asset.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <span className="absolute top-2 left-2 text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded bg-black/60 backdrop-blur-md text-white/80">
                  {asset.packageTitle}
                </span>
              </div>
              <div className="p-4 space-y-2 flex-grow flex flex-col justify-between">
                <div>
                  <h3 className="text-sm font-bold text-white line-clamp-1">{asset.title}</h3>
                  <p className="text-xs text-white/50 line-clamp-2 mt-0.5">{asset.caption}</p>
                </div>
                <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs">
                  <span className="text-white/60">
                    Photo by{' '}
                    <a
                      href={asset.creditUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-bold text-secondary hover:underline inline-flex items-center gap-1"
                    >
                      {asset.credit} <ExternalLink size={11} />
                    </a>
                  </span>
                  <span className="text-[10px] font-mono uppercase text-white/40">{asset.source}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 p-6 rounded-2xl liquid-glass-dark border border-white/10 text-center space-y-2">
          <p className="text-xs text-white/60 flex items-center justify-center gap-1.5">
            Made with <Heart size={14} className="text-red-400 fill-red-400" /> by infiYATRA for travellers who seek authentic journeys.
          </p>
          <p className="text-[11px] text-white/40">
            Are you a photographer featured here and would like to update your attribution or link? Please contact concierge@infiyatra.com.
          </p>
        </div>
      </div>
    </div>
  )
}

export default Credits
