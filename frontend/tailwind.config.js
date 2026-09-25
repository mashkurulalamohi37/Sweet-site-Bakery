/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        butter: '#FFF8F3',
        ivory: '#FDEFD9',
        blush: '#F8D6E1',
        'blush-2': '#EFB9CC',
        lav: '#EADCF3',
        'lav-2': '#C9A8DB',
        'lav-deep': '#6E4A86',
        plum: '#8B62A3',
        'plum-2': '#7A4F95',
        gold: '#F2A516',
        'gold-deep': '#9A6200',
        cocoa: '#3B1A10',
        choc: '#4B2418',
        muted: '#6F4F55',
        wa: '#1F7A4A',
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Garamond', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 4px 20px rgba(59, 26, 16, 0.06)',
        'elevated': '0 12px 32px rgba(59, 26, 16, 0.12)',
        'glow': '0 0 20px rgba(242, 165, 22, 0.35)',
      },
      borderRadius: {
        'arch': '200px 200px 18px 18px',
      }
    },
  },
  plugins: [],
}
