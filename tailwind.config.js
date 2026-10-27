/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
        "./*.{js,ts,jsx,tsx}",
    ],
    theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#0A1C60',
          light: '#1E3A8A',
          dark: '#061038',
        },
        secondary: {
          DEFAULT: '#FF5B00',
          light: '#FF7A29',
          dark: '#D64B00',
        },
        accent: {
          DEFAULT: '#F59E0B',
          light: '#FBBF24',
          dark: '#D97706',
        },
        charcoal: '#0A0E1A',
      },
      fontFamily: {
        sans: ['Outfit', 'sans-serif'],
        serif: ['Lora', 'serif'],
        display: ['Outfit', 'sans-serif'],
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out forwards',
        'slide-up': 'slideUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'float': 'float 3s ease-in-out infinite',
      },
    },
  },
    plugins: [],
}
