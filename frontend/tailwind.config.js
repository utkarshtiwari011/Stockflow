/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bgBase: '#0a0a0f',
        bgSurface: '#111118',
        bgCard: '#16161f',
        borderDefault: '#1e1e2e',
        borderSubtle: '#161622',
        primary: '#6366f1',
        primaryHover: '#818cf8',
        primaryGlow: 'rgba(99, 102, 241, 0.15)',
        success: '#22c55e',
        warning: '#f59e0b',
        danger: '#ef4444',
        textPrimary: '#f1f5f9',
        textSecondary: '#94a3b8',
        textMuted: '#475569',
      },
      fontFamily: {
        syne: ['"Plus Jakarta Sans"', 'sans-serif'],
        dm: ['Inter', 'sans-serif'],
      },
      animation: {
        fadeIn: 'fadeIn 0.3s ease-out forwards',
        slideUp: 'slideUp 0.3s ease-out forwards',
        pulseSlow: 'pulseSlow 2s infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(12px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        pulseSlow: {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '1', transform: 'scale(1.05)' },
        }
      },
      boxShadow: {
        cardGlow: '0 0 20px rgba(99, 102, 241, 0.08)',
        modalGlow: '0 10px 40px rgba(0, 0, 0, 0.5), 0 0 30px rgba(99, 102, 241, 0.05)',
      }
    },
  },
  plugins: [],
}
