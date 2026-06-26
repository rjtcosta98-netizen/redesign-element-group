import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bg:        '#0E0E0E',
        'bg-card': '#141414',
        white:     '#FFFFFF',
        accent:    'rgb(var(--accent-rgb) / <alpha-value>)',
        link:      '#0000EE',
        'btn-light': '#D5D5D5',
        muted:     '#ACACB9',
        dark:      '#606165',
        'strip-bg': '#B8B8B8',
      },
      fontFamily: {
        heading: ['var(--font-inter-tight)', 'sans-serif'],
        body:    ['var(--font-inter-tight)', 'sans-serif'],
        display: ['var(--font-instrument)', 'sans-serif'],
      },
      fontSize: {
        'h1': ['70px', { lineHeight: '1.1', letterSpacing: '-1.4px', fontWeight: '500' }],
        'h2': ['48px', { lineHeight: '1.1', letterSpacing: '-0.96px', fontWeight: '500' }],
        'h3': ['40px', { lineHeight: '1.2', letterSpacing: '-0.80px', fontWeight: '500' }],
        'h4': ['24px', { lineHeight: '1.3', letterSpacing: '-0.48px', fontWeight: '500' }],
      },
      borderRadius: {
        none: '0px',
        pill: '47px',
        'pill-sm': '42px',
      },
      keyframes: {
        ticker: {
          '0%':   { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'fade-in-up': {
          '0%':   { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        spin: {
          to: { transform: 'rotate(360deg)' },
        },
      },
      animation: {
        ticker:      'ticker 25s linear infinite',
        'fade-in-up': 'fade-in-up 0.6s ease forwards',
      },
    },
  },
  plugins: [],
}
export default config
