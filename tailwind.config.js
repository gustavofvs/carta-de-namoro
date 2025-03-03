/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'love-pink': '#ff66b2',
        'love-purple': '#b266ff',
        'love-red': '#ff3366',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      animation: {
        'float': 'float 15s linear infinite',
        'float-reverse': 'floatReverse 20s linear infinite',
        'spin-slow': 'spin 3s linear infinite',
        'spin-reverse': 'spin 4s linear reverse infinite',
        'scale-in': 'scaleIn 1s ease-out forwards',
        'gradient-x': 'gradient-x 15s ease infinite',
        'heartbeat': 'heartbeat 1.5s ease-in-out infinite',
        'sparkle': 'sparkle 2s ease-in-out infinite',
        'blush': 'blush 3s ease-in-out infinite',
        'love-letter': 'loveLetter 0.5s ease-out forwards',
        'fade-up': 'fadeUp 1s ease-out forwards',
      },
      keyframes: {
        float: {
          '0%': { transform: 'translateY(0) rotate(0deg)', opacity: 0 },
          '10%': { opacity: 1 },
          '100%': { transform: 'translateY(100vh) rotate(720deg)', opacity: 0 },
        },
        floatReverse: {
          '0%': { transform: 'translateY(100vh) rotate(0deg)', opacity: 0 },
          '10%': { opacity: 1 },
          '100%': { transform: 'translateY(0) rotate(-720deg)', opacity: 0 },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.5)', opacity: 0 },
          '100%': { transform: 'scale(1)', opacity: 1 },
        },
        'gradient-x': {
          '0%, 100%': {
            'background-size': '200% 200%',
            'background-position': 'left center'
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'right center'
          }
        },
        heartbeat: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.15)' },
        },
        sparkle: {
          '0%, 100%': { opacity: 0.2, filter: 'blur(1px)' },
          '50%': { opacity: 1, filter: 'blur(2px) brightness(1.5)' },
        },
        blush: {
          '0%, 100%': { opacity: 0.7 },
          '50%': { opacity: 1 },
        },
        loveLetter: {
          '0%': { transform: 'translateY(20px) scale(0.8)', opacity: 0 },
          '70%': { transform: 'translateY(-10px) scale(1.05)', opacity: 1 },
          '100%': { transform: 'translateY(0) scale(1)', opacity: 1 },
        },
        fadeUp: {
          '0%': { transform: 'translateY(20px)', opacity: 0 },
          '100%': { transform: 'translateY(0)', opacity: 1 },
        },
      },
      boxShadow: {
        'love': '0 0 15px rgba(255, 105, 180, 0.7)',
      },
      dropShadow: {
        'love': '0 0 10px rgba(255, 0, 128, 0.5)',
      },
    },
  },
  plugins: [],
}