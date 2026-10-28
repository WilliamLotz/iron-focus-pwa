/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: '#0A0A0A',
        surface: '#141414',
        surfaceLight: '#1C1C1C',
        border: '#262626',
        primary: '#EF4444',
        primaryDark: '#DC2626',
        success: '#22C55E',
        textMuted: '#A3A3A3',
      },
      fontFamily: {
        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'monospace'],
        brutal: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      borderRadius: {
        none: '0px',
      }
    },
  },
  plugins: [],
}
