/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './app/**/*.{js,ts,jsx,tsx}',
    './src/**/*.{js,ts,jsx,tsx}', // se você usar a pasta src
  ],
  theme: {
    extend: {
      fontFamily: {
        nunito: ['Nunito', 'sans-serif'],
        roboto: ['Roboto', 'sans-serif'],
      },
      colors: {
        brand: {
          primary: '#000000',
          white: '#ffffff',
          border: '#e5e7eb',
          sixteen: '#4B5563',
          seven: '#374151',
          eight: '#1F2937',
          muted: '#f3f4f6',
          gray: '#6b7280',
          accent: '#3b82f6',
          50: '#f2f0f1',
          55: '#f0f0f0',
          60: '#D1D5DB',
          100: '#1D4ED8',
          200: '#DC2626',
          199: '#EF4444',
          400: '#9CA3AF',
          black60: 'rgba(0, 0, 0, 0.6)',
          black10: 'rgba(0, 0, 0, 0.1)',
          discont: '#F44336',
          old: '#a0aec0',
          select: 'hsla(0, 0%, 0%, 0.6)',
        },
      },
    },
  },
  plugins: [],
};
