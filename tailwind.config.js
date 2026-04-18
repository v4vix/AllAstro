/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        void: '#000511',
        cosmos: '#020B18',
        nebula: '#061628',
        saffron: '#FF6B00',
        gold: '#FFB347',
        goldenrod: '#DAA520',
        aurora: '#00FFCC',
      },
      fontFamily: {
        cinzel: ['Cinzel', 'Georgia', 'serif'],
        cormorant: ['"Cormorant Garamond"', 'Georgia', 'serif'],
      },
      animation: {
        'gradient-x': 'gradient-x 5s ease infinite',
        float: 'float 6s ease-in-out infinite',
        'float-delayed': 'float 6s ease-in-out 2s infinite',
        glow: 'glow 2s ease-in-out infinite alternate',
        twinkle: 'twinkle 3s ease-in-out infinite',
        'spin-slow': 'spin 20s linear infinite',
        'pulse-ring': 'pulse-ring 2.5s cubic-bezier(0.215,0.61,0.355,1) infinite',
      },
      keyframes: {
        'gradient-x': {
          '0%,100%': { 'background-position': '0% 50%' },
          '50%': { 'background-position': '100% 50%' },
        },
        float: {
          '0%,100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-16px)' },
        },
        glow: {
          from: { 'box-shadow': '0 0 20px rgba(255,179,71,0.2)' },
          to: { 'box-shadow': '0 0 50px rgba(255,179,71,0.55)' },
        },
        twinkle: {
          '0%,100%': { opacity: '1' },
          '50%': { opacity: '0.3' },
        },
        'pulse-ring': {
          '0%': { transform: 'scale(0.8)', opacity: '0.8' },
          '100%': { transform: 'scale(2)', opacity: '0' },
        },
      },
    },
  },
  plugins: [],
}
