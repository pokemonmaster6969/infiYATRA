import React from 'react'

interface LogoProps {
  className?: string
  imgClassName?: string
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'custom'
  showText?: boolean
  light?: boolean
}

export const Logo: React.FC<LogoProps> = ({
  className = '',
  imgClassName = '',
  size = 'md',
  showText = false,
  light = true
}) => {
  const sizeClasses = {
    sm: 'h-8 md:h-9 w-auto',
    md: 'h-11 md:h-14 w-auto',
    lg: 'h-16 md:h-20 w-auto',
    xl: 'h-24 md:h-28 w-auto',
    custom: ''
  }

  return (
    <div className={`inline-flex items-center select-none ${className}`}>
      <img
        src="/infilogo.png"
        alt="INFI YATRA Logo"
        className={`object-contain transition-transform duration-300 group-hover:scale-105 filter drop-shadow-[0_2px_12px_rgba(255,255,255,0.25)] brightness-110 contrast-125 ${sizeClasses[size]} ${imgClassName}`}
      />
      {showText && (
        <span className={`font-display font-black tracking-tighter uppercase ${light ? 'text-white' : 'text-gray-900'} text-lg md:text-xl ml-2`}>
          INFI<span className="text-secondary ml-0.5">YATRA</span>
        </span>
      )}
    </div>
  )
}

export default Logo
