import React, { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { MapPin, Calendar, Heart, Package, LogOut, User, Compass, Star, Shield } from 'lucide-react'

const UserDashboard = () => {
  const [user, setUser] = useState<any>(null)
  const [isAdmin, setIsAdmin] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const savedUser = localStorage.getItem('user')
    if (!savedUser) {
      navigate('/login')
    } else {
      setUser(JSON.parse(savedUser))
      // Check if user has admin privileges (prototype check)
      setIsAdmin(sessionStorage.getItem('isAdmin') === 'true')
    }
  }, [navigate])

  const handleLogout = () => {
    localStorage.removeItem('user')
    sessionStorage.removeItem('isAdmin')
    navigate('/login')
  }

  if (!user) return null

  return (
    <div className="min-h-screen bg-charcoal px-5 pb-16 pt-24 text-white sm:px-8 sm:pb-20 sm:pt-28 lg:px-12">
      <div className="mx-auto max-w-[1320px]">
        <header className="mb-8 flex flex-col items-start justify-between gap-5 sm:mb-10 sm:flex-row sm:items-end">
          <div className="space-y-3">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-secondary">Welcome back, explorer</span>
            <h1 className="font-display text-3xl font-black uppercase italic leading-none tracking-tight text-white sm:text-4xl lg:text-5xl">
              {user.name}'s <span className="text-primary-light">basecamp</span>
            </h1>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            {isAdmin && (
              <Link 
                to="/admin/dashboard"
                className="flex min-h-10 items-center gap-2 rounded-lg liquid-glass px-3 text-xs font-semibold text-white transition-colors hover:bg-white/20"
              >
                <Shield size={14} className="text-secondary" />
                <span>Admin Panel</span>
              </Link>
            )}
            <button 
              onClick={handleLogout}
              className="flex min-h-10 items-center gap-2 rounded-lg px-3 text-xs font-semibold text-white/55 transition-colors hover:bg-white/10 hover:text-white"
            >
              <LogOut size={16} />
              <span>Sign Out</span>
            </button>
          </div>
        </header>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 lg:gap-8">
          {/* Main Content Area */}
          <div className="space-y-7 lg:col-span-2">
            {/* Quick Stats */}
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              {[
                { label: 'Expeditions', value: '02', icon: Compass, color: 'bg-primary' },
                { label: 'Wishlist', value: '12', icon: Heart, color: 'bg-secondary' },
                { label: 'Community XP', value: '850', icon: Star, color: 'bg-accent' }
              ].map((stat, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-center gap-4 rounded-lg border border-white/10 bg-white/[0.035] p-4 sm:p-5"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full liquid-glass text-[#9bd3c6]">
                    <stat.icon size={19} />
                  </div>
                  <div>
                    <p className="text-[9px] font-semibold uppercase tracking-wider text-white/50">{stat.label}</p>
                    <p className="font-display text-2xl font-bold text-white">{stat.value}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Upcoming Trips */}
            <div className="space-y-6">
              <h2 className="flex items-center font-display text-xl font-bold uppercase tracking-tight text-white sm:text-2xl">
                <Calendar className="mr-2 text-primary-light" /> Upcoming journeys
              </h2>
              <div className="space-y-4 rounded-lg border border-white/10 bg-white/[0.025] px-5 py-8 text-left sm:px-7">
                <div className="flex h-11 w-11 items-center justify-center rounded-full liquid-glass text-white/60">
                   <Package size={20} />
                </div>
                <div>
                  <h3 className="font-display text-lg font-bold uppercase text-white">No active bookings</h3>
                  <p className="mt-1 text-sm text-white/50">Your next great story is waiting to be written.</p>
                </div>
                <button 
                  onClick={() => navigate('/discover')}
                  className="inline-flex min-h-11 items-center rounded-lg bg-primary px-4 text-xs font-bold uppercase tracking-wider text-white transition-colors hover:bg-primary-light"
                >
                  Explore Packages
                </button>
              </div>
            </div>
          </div>

          {/* Sidebar Area */}
          <div className="space-y-4">
            {/* Profile Card */}
            <div className="relative overflow-hidden rounded-lg liquid-glass-dark p-5 sm:p-6">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 blur-3xl rounded-full"></div>
              <div className="relative z-10 space-y-8">
                <div className="flex h-14 w-14 items-center justify-center rounded-full liquid-glass text-[#9bd3c6]">
                  <User size={22} />
                </div>
                <div>
                  <h3 className="font-display text-xl font-bold tracking-tight">{user.name}</h3>
                  <p className="text-white/40 text-xs font-medium italic mt-1">{user.email}</p>
                </div>
                <button className="min-h-11 w-full rounded-lg border border-white/15 px-4 text-xs font-semibold text-white/80 transition-colors hover:bg-white/10">
                  Edit Explorer Profile
                </button>
              </div>
            </div>

            {/* Community Feed Preview */}
            <div className="space-y-4 rounded-lg border border-white/10 bg-white/[0.025] p-5">
              <h3 className="font-display text-base font-bold uppercase tracking-tight text-white">Community feed</h3>
              <div className="space-y-6">
                {[1, 2].map((_, i) => (
                  <div key={i} className="flex space-x-4 group cursor-pointer">
                    <div className="w-12 h-12 rounded-2xl bg-gray-100 shrink-0 overflow-hidden">
                      <img src={`https://i.pravatar.cc/150?u=${i}`} alt="User" className="w-full h-full object-cover" />
                    </div>
                    <div className="min-w-0 space-y-1">
                      <p className="text-xs font-semibold text-white/80 transition-colors group-hover:text-primary-light">Shared a new memory from Spiti</p>
                      <p className="text-[10px] font-medium text-white/40">2 hours ago</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserDashboard
