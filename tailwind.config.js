/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        alabaster: '#FAF9F6',
        charcoal: {
          900: '#1C1917',
          800: '#292524',
          700: '#44403C',
        },
        slatewarm: {
          600: '#57534E',
          500: '#78716C',
          400: '#A8A29E',
          200: '#E7E5E4',
          100: '#F5F5F4',
        },
        teal: {
          700: '#0F766E', // Primary Forest Teal
          800: '#115E59',
          900: '#134E4A',
          50: '#F0FDFA',
          100: '#CCFBF1',
        },
        terracotta: {
          600: '#EA580C', // Warm Terracotta
          700: '#C2410C',
          50: '#FFF7ED',
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter Tight', 'system-ui', 'sans-serif'],
        display: ['Plus Jakarta Sans', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      boxShadow: {
        'xs': '0 1px 2px 0 rgba(0, 0, 0, 0.04)',
        'soft': '0 2px 8px -2px rgba(28, 25, 23, 0.05), 0 1px 3px -1px rgba(28, 25, 23, 0.03)',
        'md-soft': '0 8px 24px -4px rgba(28, 25, 23, 0.07), 0 2px 6px -2px rgba(28, 25, 23, 0.04)',
      }
    },
  },
  plugins: [],
}
