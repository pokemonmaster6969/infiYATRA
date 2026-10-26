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
          DEFAULT: '#0D7377',
          light: '#36A69D',
          dark: '#095C5F',
        },
        secondary: {
          DEFAULT: '#B34A34',
          light: '#F29375',
          dark: '#943926',
        },
        accent: {
          DEFAULT: '#E5BD78',
          light: '#F0D49C',
          dark: '#B78D4D',
        },
        charcoal: '#142A28',
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
