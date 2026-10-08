import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Lock, ArrowRight, ArrowLeft, Sparkles, Globe } from 'lucide-react'
import Logo from '../../components/Logo'
import { haptics } from '../../lib/haptics'

const AdminLogin = () => {
  const [password, setPassword] = useState('admin123')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleLogin = (e?: React.FormEvent) => {
    if (e) e.preventDefault()
    // Simple prototype auth
    if (password === 'admin123' || password === '') {
      sessionStorage.setItem('isAdmin', 'true')
      haptics.success()
      navigate('/admin/dashboard')
    } else {
      haptics.error()
      setError('Invalid expedition credentials. (Hint: default key is admin123)')
    }
  }

  const handleQuickLogin = () => {
    sessionStorage.setItem('isAdmin', 'true')
    haptics.success()
    navigate('/admin/dashboard')
  }

  return (
    <div className="min-h-screen bg-charcoal flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/20 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/10 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/2 pointer-events-none"></div>

      {/* Top Bar Return Button */}
      <div className="absolute top-6 left-6 z-20">
        <Link 
          to="/"
          onClick={() => haptics.light()}
          className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-white/5 border border-white/10 text-white/80 hover:text-white hover:bg-white/10 transition-all font-bold text-xs uppercase tracking-wider backdrop-blur-md group shadow-lg"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          <span>Back to Main Website</span>
        </Link>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-white/5 backdrop-blur-3xl border border-white/10 p-8 md:p-10 rounded-[3rem] shadow-2xl relative z-10"
      >
        <div className="text-center mb-8">
          <div className="flex justify-center mb-5">
            <Logo size="lg" />
          </div>
          <div className="inline-flex p-3.5 bg-primary/10 rounded-2xl mb-4 border border-primary/20">
            <Lock className="text-primary" size={28} />
          </div>
          <h1 className="text-3xl font-display font-black text-white uppercase italic tracking-tighter">
            Admin <span className="text-primary">Basecamp</span>
          </h1>
          <p className="text-gray-400 font-medium text-xs mt-2 italic">Expedition & Package Management System</p>
        </div>

        {/* 1-Click Quick Demo Login */}
        <button
          onClick={handleQuickLogin}
          className="w-full mb-6 bg-gradient-to-r from-secondary via-orange-500 to-primary text-white py-4 px-6 rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-secondary/20 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2 border border-white/20"
        >
          <Sparkles size={16} className="animate-spin" />
          <span>⚡ 1-Click Instant Login</span>
        </button>

        <div className="relative flex py-2 items-center mb-6">
          <div className="flex-grow border-t border-white/10"></div>
          <span className="flex-shrink mx-4 text-[9px] font-black uppercase tracking-widest text-white/40">or enter password</span>
          <div className="flex-grow border-t border-white/10"></div>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
          <div className="space-y-2">
            <label className="text-[10px] uppercase font-black text-white/50 tracking-[0.2em] ml-4">Access Key</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter credentials..."
              className="w-full bg-white/5 border border-white/10 p-4 rounded-2xl text-white focus:border-primary outline-none transition-all placeholder:text-white/20 text-sm font-semibold"
            />
          </div>

          {error && (
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-red-400 text-xs font-bold text-center italic bg-red-500/10 p-3 rounded-xl border border-red-500/20"
            >
              {error}
            </motion.p>
          )}

          <button 
            type="submit"
            className="w-full bg-white/10 hover:bg-white/20 border border-white/15 text-white py-4 rounded-2xl font-black text-xs uppercase tracking-[0.2em] transition-all flex items-center justify-center group"
          >
            Authorize Access <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={16} />
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-white/5 text-center">
          <Link 
            to="/" 
            className="inline-flex items-center space-x-2 text-white/50 hover:text-white text-xs font-bold transition-colors"
          >
            <Globe size={14} />
            <span>Return to INFIYATRA Home</span>
          </Link>
        </div>
      </motion.div>
    </div>
  )
}

export default AdminLogin
