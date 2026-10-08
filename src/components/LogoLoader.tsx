import React from 'react'
import { motion } from 'framer-motion'

interface LogoLoaderProps {
  fullScreen?: boolean
  message?: string
  size?: 'sm' | 'md' | 'lg'
}

export const LogoLoader: React.FC<LogoLoaderProps> = ({
  fullScreen = false,
  message = 'Crafting Your Next Journey...',
  size = 'md'
}) => {
  const logoDimensions = {
    sm: 'w-24 h-12',
    md: 'w-40 h-20 md:w-56 md:h-28',
    lg: 'w-56 h-28 md:w-72 md:h-36'
  }

  const ringDimensions = {
    sm: 'w-28 h-16',
    md: 'w-48 h-24 md:w-64 md:h-32',
    lg: 'w-64 h-32 md:w-80 md:h-40'
  }

  const containerContent = (
    <div className="flex flex-col items-center justify-center p-6 text-center select-none relative z-10">
      {/* Animated Logo Container */}
      <div className="relative flex items-center justify-center mb-6">
        {/* Outer glowing pulsing aura */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.35, 0.75, 0.35],
          }}
          transition={{
            duration: 2.2,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
          className={`absolute rounded-3xl bg-gradient-to-r from-primary via-secondary to-orange-500 blur-2xl pointer-events-none ${ringDimensions[size]}`}
        />

        {/* Pulsing Logo Card */}
        <motion.div
          animate={{
            scale: [0.95, 1.05, 0.95],
          }}
          transition={{
            duration: 1.8,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
          className={`relative z-10 flex items-center justify-center p-4 bg-black/50 backdrop-blur-2xl rounded-3xl border border-white/15 shadow-[0_0_30px_rgba(0,0,0,0.8)] ${logoDimensions[size]}`}
        >
          <img
            src="/infilogo.png"
            alt="INFI YATRA Loading..."
            className="w-full h-full object-contain filter drop-shadow-[0_0_20px_rgba(249,115,22,0.7)] brightness-110 contrast-125"
          />
        </motion.div>
      </div>

      {/* Loading message with animated pulse */}
      {message && (
        <motion.p
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          className="text-xs md:text-sm text-gray-300 font-semibold tracking-wider max-w-xs drop-shadow-md"
        >
          {message}
        </motion.p>
      )}
    </div>
  )

  if (fullScreen) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-charcoal/95 backdrop-blur-2xl"
      >
        {containerContent}
      </motion.div>
    )
  }

  return containerContent
}

export default LogoLoader
