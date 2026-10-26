import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { User, Mail, Lock, ArrowRight, Github, Chrome, Shield, Compass } from 'lucide-react'
import { haptics } from '../lib/haptics'
import ResponsiveImage from '../components/ResponsiveImage'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLogin, setIsLogin] = useState(true)
  const [mode, setMode] = useState<'user' | 'admin'>('user')
  const navigate = useNavigate()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (mode === 'admin') {
      if (password === 'admin123') {
        haptics.success()
        sessionStorage.setItem('isAdmin', 'true')
        navigate('/admin/dashboard')
      } else {
        haptics.error()
        alert('Invalid Admin Credentials')
      }
      return
    }
    // Prototype user auth
    haptics.success()
    localStorage.setItem('user', JSON.stringify({ email, name: email.split('@')[0] }))
    navigate('/dashboard')
  }

  return (
    <div className="relative flex min-h-[100svh] items-center justify-center overflow-hidden bg-charcoal px-4 py-24 text-white sm:px-6">
      {/* Immersive Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <ResponsiveImage
          src="https://images.unsplash.com/photo-1506461883276-594a12b11cf3?auto=format&fit=crop&q=80&w=2000" 
          alt="Travel Background" 
          sizes="100vw"
          loading="eager"
          fetchPriority="high"
          className="h-full w-full object-cover opacity-25"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0c1d1b]/90 via-[#0c1d1b]/72 to-[#0c1d1b]/60"></div>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-lg relative z-10"
      >
        {/* Mode Switcher Tabs */}
        <div className="mb-3 flex justify-start">
          <div className="flex gap-1 rounded-lg liquid-glass-dark p-1">
            <button 
              onClick={() => {
                haptics.light();
                setMode('user');
              }}
              className={`flex min-h-10 items-center gap-2 rounded-md px-4 text-[10px] font-semibold uppercase tracking-wider transition-colors ${mode === 'user' ? 'bg-secondary text-white' : 'text-white/55 hover:text-white'}`}
            >
              <Compass size={12} /> Explorer
            </button>
            <button 
              onClick={() => {
                haptics.light();
                setMode('admin');
              }}
              className={`flex min-h-10 items-center gap-2 rounded-md px-4 text-[10px] font-semibold uppercase tracking-wider transition-colors ${mode === 'admin' ? 'bg-primary text-white' : 'text-white/55 hover:text-white'}`}
            >
              <Shield size={12} /> Admin
            </button>
          </div>
        </div>

        <div className="travel-form rounded-xl border border-white/10 bg-[#0c1d1b]/85 p-5 shadow-2xl backdrop-blur-xl sm:p-8">
          <div className="mb-6 text-left">
            <motion.div
              key={mode}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="mb-2 font-display text-2xl font-black uppercase italic tracking-tight text-white sm:text-3xl">
                {mode === 'admin' ? (
                  <>Admin <span className="text-primary">Basecamp</span></>
                ) : (
                  <>{isLogin ? 'Welcome' : 'Join the'} <span className="text-secondary">Community</span></>
                )}
              </h1>
              <p className="text-xs leading-relaxed text-white/55">
                {mode === 'admin' 
                  ? 'Authorized access for organizers' 
                  : (isLogin ? 'Sign in to your curated expeditions' : 'Ahmedabad\'s premier travel collective')}
              </p>
            </motion.div>
          </div>

          <form onSubmit={handleSubmit} className="travel-form space-y-4">
            {mode === 'user' && !isLogin && (
              <div className="space-y-1">
                <label className="text-[10px] font-semibold uppercase tracking-wider text-white/60">Full name</label>
                <div className="relative">
                  <User className="absolute left-5 top-1/2 -translate-y-1/2 text-white/20" size={16} />
                  <input 
                    type="text" 
                    placeholder="Your Name"
                    className="w-full bg-white/5 border border-white/10 p-4 pl-12 rounded-2xl text-white focus:border-secondary outline-none transition-all placeholder:text-white/10 text-sm"
                  />
                </div>
              </div>
            )}

            {mode === 'user' && (
              <div className="space-y-1">
                <label className="text-[10px] font-semibold uppercase tracking-wider text-white/60">Email address</label>
                <div className="relative">
                  <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-white/20" size={16} />
                  <input 
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="hello@example.com"
                    className="w-full bg-white/5 border border-white/10 p-4 pl-12 rounded-2xl text-white focus:border-secondary outline-none transition-all placeholder:text-white/10 text-sm"
                    required
                  />
                </div>
              </div>
            )}

            <div className="space-y-1">
              <label className="text-[10px] font-semibold uppercase tracking-wider text-white/60">
                {mode === 'admin' ? 'Access Key' : 'Password'}
              </label>
              <div className="relative">
                <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-white/20" size={16} />
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className={`w-full bg-white/5 border border-white/10 p-4 pl-12 rounded-2xl text-white outline-none transition-all placeholder:text-white/10 text-sm ${mode === 'admin' ? 'focus:border-primary' : 'focus:border-secondary'}`}
                  required
                />
              </div>
            </div>

            <button 
              type="submit"
              className={`flex min-h-12 w-full items-center justify-center rounded-lg px-4 text-xs font-bold uppercase tracking-wider text-white transition-colors ${mode === 'admin' ? 'bg-primary hover:bg-primary-light' : 'bg-secondary hover:bg-secondary-light'}`}
            >
              {mode === 'admin' ? 'Authorize' : (isLogin ? 'Sign In' : 'Join')} 
              <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={14} />
            </button>
          </form>

          {mode === 'user' && (
            <>
              <div className="mt-8 text-center">
                <p className="text-white/40 text-[8px] font-black uppercase tracking-[0.2em] mb-4">Or continue with</p>
                <div className="flex justify-center gap-4">
                  <button 
                    onClick={() => haptics.light()}
                    aria-label="Continue with Google"
                    className="flex h-11 w-11 items-center justify-center rounded-lg liquid-glass text-white transition-colors hover:bg-white/20"
                  >
                    <Chrome size={18} />
                  </button>
                  <button 
                    onClick={() => haptics.light()}
                    aria-label="Continue with GitHub"
                    className="flex h-11 w-11 items-center justify-center rounded-lg liquid-glass text-white transition-colors hover:bg-white/20"
                  >
                    <Github size={18} />
                  </button>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-white/5 text-center">
                <button 
                  onClick={() => {
                    haptics.light();
                    setIsLogin(!isLogin);
                  }}
                  className="text-white/60 hover:text-secondary text-[9px] font-black uppercase tracking-[0.2em] transition-colors"
                >
                  {isLogin ? "Join the community" : "Already a member?"}
                </button>
              </div>
            </>
          )}

          {mode === 'admin' && (
            <div className="mt-8 pt-6 border-t border-white/5 text-center">
              <p className="text-white/20 text-[9px] font-black uppercase tracking-[0.4em] flex items-center justify-center gap-2">
                <Shield size={10} /> SECURE BASECAMP
              </p>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  )
}

export default Login
